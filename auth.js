(function () {
  const STORAGE_KEYS = {
    device: "chatflow.user-auth.device.v1",
    users: "chatflow.user-auth.users.v1",
    userIndex: "chatflow.user-auth.user-index.v1",
    session: "chatflow.user-auth.session.v1",
    activeBucket: "chatflow.user-auth.active-bucket.v1"
  };
  const HISTORY_BUCKET_PREFIX = "chatflow.user-auth.history.v1.";
  const USER_RECORD_PREFIX = "chatflow.user-auth.user-record.v1.";
  const DEFAULT_BUCKET = "guest";
  const DB_NAME = "chatflow-extension-db";
  const DB_VERSION = 1;
  const STORE_NAME = "sessions";
  const META_KEY = "session-index";
  const CURRENT_SESSION_KEY = "current-session-id";

  const COPY = {
    launcher: "登录/注册",
    title: "账号中心",
    subtitle: "账号与质量评估历史仅保存在本地浏览器中，不接入远程服务。",
    login: "登录",
    register: "注册",
    username: "用户名",
    password: "密码",
    usernamePlaceholder: "3-20位字母、数字或下划线",
    passwordPlaceholder: "至少6位密码",
    loginSubmit: "立即登录",
    registerSubmit: "创建账号",
    close: "关闭",
    logout: "退出",
    loggedIn: "当前登录账号",
    invalidUsername: "用户名需为 3-20 位字母、数字或下划线。",
    invalidPassword: "密码至少 6 位。",
    duplicateUser: "该用户名已存在，请直接登录。",
    unknownUser: "账号不存在，请先注册。",
    wrongPassword: "密码不正确，请重试。",
    loginSuccess: "已恢复当前账号的本地历史记录。",
    registerSuccess: "注册成功，已切换到新账号。",
    logoutSuccess: "已退出当前账号，并恢复未登录历史。",
    loginSuccessNow: "登录成功，已切换到账号历史。",
    localOnly: "本地加密保存",
    historyBound: "质量评估历史已与当前账号绑定。"
  };

  const state = {
    open: false,
    mode: "login",
    status: "",
    error: false,
    session: null,
    users: [],
    syncTimer: null,
    syncing: false
  };

  const refs = {};
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  function init() {
    if (!document.body) {
      window.addEventListener("DOMContentLoaded", init, { once: true });
      return;
    }

    void bootstrap();
  }

  async function bootstrap() {
    buildUI();
    mountInlineLauncher();
    bindEvents();
    ensureDeviceSecret();
    render();

    try {
      state.users = await loadUsers();
      state.session = normalizeSession(await readEncryptedValue(STORAGE_KEYS.session, null));

      const desiredBucket = getBucketIdForSession(state.session);
      const mountedBucket = localStorage.getItem(STORAGE_KEYS.activeBucket) || DEFAULT_BUCKET;

      localStorage.setItem(STORAGE_KEYS.activeBucket, desiredBucket);
      startStorageSync();

      if (state.session) {
        setStatus(COPY.loginSuccess, false);
      }

      render();

      if (mountedBucket !== desiredBucket) {
        window.setTimeout(() => {
          void reconcileStartupBucket(mountedBucket, desiredBucket);
        }, 0);
      }
    } catch (error) {
      console.error("chatflow auth bootstrap failed", error);
    }
  }

  async function reconcileStartupBucket(mountedBucket, desiredBucket) {
    try {
      await persistHistoryBucket(mountedBucket);
      await restoreHistoryBucket(desiredBucket);
    } catch (error) {
      console.error("chatflow auth bucket reconcile failed", error);
    }
  }

  function buildUI() {
    const root = document.createElement("div");
    root.className = "chatflow-auth-root";
    root.innerHTML = [
      '<button type="button" class="chatflow-auth-launcher" aria-expanded="false">',
      '<svg class="chatflow-auth-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">',
      '<circle cx="8" cy="4.25" r="2.35" stroke="currentColor" stroke-width="1.35" />',
      '<path d="M3.25 13.15c.55-2.3 2.35-3.6 4.75-3.6s4.2 1.3 4.75 3.6" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" />',
      "</svg>",
      `<span class="chatflow-auth-launcher-label">${COPY.launcher}</span>`,
      "</button>",
      '<div class="chatflow-auth-backdrop chatflow-auth-hidden"></div>',
      '<section class="chatflow-auth-panel chatflow-auth-hidden" role="dialog" aria-modal="true">',
      '<div class="chatflow-auth-head">',
      "<div>",
      `<h2 class="chatflow-auth-title">${COPY.title}</h2>`,
      `<p class="chatflow-auth-subtitle">${COPY.subtitle}</p>`,
      "</div>",
      `<button type="button" class="chatflow-auth-close" aria-label="${COPY.close}">x</button>`,
      "</div>",
      '<div class="chatflow-auth-content"></div>',
      "</section>"
    ].join("");

    document.body.appendChild(root);

    refs.root = root;
    refs.launcher = root.querySelector(".chatflow-auth-launcher");
    refs.launcherLabel = root.querySelector(".chatflow-auth-launcher-label");
    refs.backdrop = root.querySelector(".chatflow-auth-backdrop");
    refs.panel = root.querySelector(".chatflow-auth-panel");
    refs.close = root.querySelector(".chatflow-auth-close");
    refs.content = root.querySelector(".chatflow-auth-content");
  }

  function mountInlineLauncher() {
    const inlineActions = document.querySelector(".capture-panel .capture-actions");
    if (!inlineActions || !refs.root) {
      return;
    }

    inlineActions.insertBefore(refs.root, inlineActions.firstChild || null);
  }

  function bindEvents() {
    refs.launcher.addEventListener("click", () => {
      state.open = !state.open;
      render();
    });

    refs.backdrop.addEventListener("click", closePanel);
    refs.close.addEventListener("click", closePanel);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.open) {
        closePanel();
      }
    });
  }

  function startStorageSync() {
    if (window.chrome?.runtime?.onMessage) {
      window.chrome.runtime.onMessage.addListener(handleRuntimeMessage);
    }

    window.addEventListener("pagehide", flushStorageSync);
    window.addEventListener("beforeunload", flushStorageSync);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        flushStorageSync();
      }
    });
  }

  function handleRuntimeMessage(message) {
    if (message?.type === "SESSION_UPDATED" || message?.type === "SESSION_INDEX_UPDATED") {
      scheduleStorageSync();
    }
  }

  function scheduleStorageSync() {
    if (state.syncTimer) {
      window.clearTimeout(state.syncTimer);
    }

    state.syncTimer = window.setTimeout(() => {
      state.syncTimer = null;
      void persistActiveHistoryBucket();
    }, 180);
  }

  function flushStorageSync() {
    if (state.syncTimer) {
      window.clearTimeout(state.syncTimer);
      state.syncTimer = null;
    }

    void persistActiveHistoryBucket();
  }

  async function persistActiveHistoryBucket() {
    if (state.syncing) {
      return;
    }

    state.syncing = true;
    try {
      const bucketId =
        localStorage.getItem(STORAGE_KEYS.activeBucket) || getBucketIdForSession(state.session);
      await persistHistoryBucket(bucketId);
    } finally {
      state.syncing = false;
    }
  }

  function render() {
    refs.launcher.setAttribute("aria-expanded", String(state.open));
    refs.launcherLabel.textContent = state.session ? state.session.username : COPY.launcher;
    refs.backdrop.classList.toggle("chatflow-auth-hidden", !state.open);
    refs.panel.classList.toggle("chatflow-auth-hidden", !state.open);

    if (state.session) {
      renderUserView();
      return;
    }

    renderGuestView();
  }

  function renderGuestView() {
    refs.content.innerHTML = [
      '<div class="chatflow-auth-tabs">',
      `<button type="button" class="chatflow-auth-tab${state.mode === "login" ? " is-active" : ""}" data-mode="login">${COPY.login}</button>`,
      `<button type="button" class="chatflow-auth-tab${state.mode === "register" ? " is-active" : ""}" data-mode="register">${COPY.register}</button>`,
      "</div>",
      '<form class="chatflow-auth-form">',
      '<div class="chatflow-auth-field">',
      `<label for="chatflow-auth-username">${COPY.username}</label>`,
      `<input id="chatflow-auth-username" class="chatflow-auth-input" name="username" maxlength="20" autocomplete="username" placeholder="${COPY.usernamePlaceholder}" />`,
      "</div>",
      '<div class="chatflow-auth-field">',
      `<label for="chatflow-auth-password">${COPY.password}</label>`,
      `<input id="chatflow-auth-password" class="chatflow-auth-input" name="password" type="password" maxlength="64" autocomplete="${state.mode === "login" ? "current-password" : "new-password"}" placeholder="${COPY.passwordPlaceholder}" />`,
      "</div>",
      `<div class="chatflow-auth-meta${state.error ? " is-error" : ""}">${escapeHtml(state.status || COPY.localOnly)}</div>`,
      '<div class="chatflow-auth-actions">',
      `<button type="submit" class="chatflow-auth-submit">${state.mode === "login" ? COPY.loginSubmit : COPY.registerSubmit}</button>`,
      `<button type="button" class="chatflow-auth-ghost" data-switch-mode="${state.mode === "login" ? "register" : "login"}">${state.mode === "login" ? COPY.register : COPY.login}</button>`,
      "</div>",
      "</form>"
    ].join("");

    refs.content.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        state.mode = button.getAttribute("data-mode") || "login";
        setStatus("", false);
        render();
      });
    });

    const switchButton = refs.content.querySelector("[data-switch-mode]");
    if (switchButton) {
      switchButton.addEventListener("click", () => {
        state.mode = switchButton.getAttribute("data-switch-mode") || "login";
        setStatus("", false);
        render();
      });
    }

    const form = refs.content.querySelector(".chatflow-auth-form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const username = String(formData.get("username") || "").trim();
        const password = String(formData.get("password") || "");

        if (state.mode === "register") {
          void handleRegister(username, password);
          return;
        }

        void handleLogin(username, password);
      });
    }
  }

  function renderUserView() {
    refs.content.innerHTML = [
      '<div class="chatflow-auth-user">',
      '<div class="chatflow-auth-user-card">',
      `<span class="chatflow-auth-user-label">${COPY.loggedIn}</span>`,
      `<div class="chatflow-auth-user-name">${escapeHtml(state.session.username)}</div>`,
      `<div class="chatflow-auth-user-time">${formatTime(state.session.loginAt)}</div>`,
      "</div>",
      `<div class="chatflow-auth-meta">${escapeHtml(state.status || COPY.historyBound)}</div>`,
      '<div class="chatflow-auth-actions">',
      `<button type="button" class="chatflow-auth-submit">${COPY.close}</button>`,
      `<button type="button" class="chatflow-auth-ghost">${COPY.logout}</button>`,
      "</div>",
      "</div>"
    ].join("");

    const buttons = refs.content.querySelectorAll(".chatflow-auth-actions button");
    if (buttons[0]) {
      buttons[0].addEventListener("click", closePanel);
    }
    if (buttons[1]) {
      buttons[1].addEventListener("click", () => {
        void handleLogout();
      });
    }
  }

  async function handleRegister(username, password) {
    const error = validateCredentials(username, password);
    if (error) {
      setStatus(error, true);
      render();
      return;
    }

    if (findUser(username)) {
      setStatus(COPY.duplicateUser, true);
      render();
      return;
    }

    const salt = randomBase64(16);
    const passwordHash = await hashPassword(password, salt);
    const user = {
      username,
      normalized: username.toLowerCase(),
      salt,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    state.users = [...state.users, user];
    await saveUsers(state.users);

    state.session = {
      username,
      loginAt: new Date().toISOString()
    };
    await writeEncryptedValue(STORAGE_KEYS.session, state.session);
    await switchHistoryBucket(getBucketIdForSession(state.session));

    setStatus(COPY.registerSuccess, false);
    render();
  }

  async function handleLogin(username, password) {
    const error = validateCredentials(username, password);
    if (error) {
      setStatus(error, true);
      render();
      return;
    }

    const user = findUser(username);
    if (!user) {
      setStatus(COPY.unknownUser, true);
      render();
      return;
    }

    const hash = await hashPassword(password, user.salt);
    if (hash !== user.passwordHash) {
      setStatus(COPY.wrongPassword, true);
      render();
      return;
    }

    state.session = {
      username: user.username,
      loginAt: new Date().toISOString()
    };
    await writeEncryptedValue(STORAGE_KEYS.session, state.session);
    await switchHistoryBucket(getBucketIdForSession(state.session));

    setStatus(COPY.loginSuccessNow, false);
    render();
  }

  async function handleLogout() {
    const currentBucket = getBucketIdForSession(state.session);
    await persistHistoryBucket(currentBucket);
    state.session = null;
    await clearEncryptedValue(STORAGE_KEYS.session);
    await switchHistoryBucket(DEFAULT_BUCKET);

    state.mode = "login";
    setStatus(COPY.logoutSuccess, false);
    render();
  }

  async function switchHistoryBucket(targetBucket) {
    const currentBucket = localStorage.getItem(STORAGE_KEYS.activeBucket) || DEFAULT_BUCKET;

    if (currentBucket !== targetBucket) {
      await persistHistoryBucket(currentBucket);
      await restoreHistoryBucket(targetBucket);
      localStorage.setItem(STORAGE_KEYS.activeBucket, targetBucket);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.activeBucket, targetBucket);
    await persistHistoryBucket(targetBucket);
  }

  async function persistHistoryBucket(bucketId) {
    try {
      const snapshot = await capturePluginStorage();
      await writeEncryptedValue(getHistoryStorageKey(bucketId), snapshot);
    } catch (error) {
      console.error("chatflow auth persist history failed", error);
    }
  }

  async function restoreHistoryBucket(bucketId) {
    try {
      const snapshot = await readEncryptedValue(getHistoryStorageKey(bucketId), null);
      await replacePluginStorage(snapshot);
    } catch (error) {
      console.error("chatflow auth restore history failed", error);
    }
  }

  async function capturePluginStorage() {
    const meta = await chromeStorageGet([CURRENT_SESSION_KEY, META_KEY]);
    const sessions = await readAllSessions();

    return {
      currentSessionId: meta[CURRENT_SESSION_KEY] || null,
      sessionIndex: Array.isArray(meta[META_KEY]) ? meta[META_KEY] : [],
      sessions
    };
  }

  async function replacePluginStorage(snapshot) {
    const sessionIndex = Array.isArray(snapshot?.sessionIndex) ? snapshot.sessionIndex : [];
    const sessions = Array.isArray(snapshot?.sessions) ? snapshot.sessions : [];
    const currentSessionId = snapshot?.currentSessionId || null;

    await writeAllSessions(sessions);
    await chromeStorageSet({
      [META_KEY]: sessionIndex
    });

    if (currentSessionId) {
      await chromeStorageSet({
        [CURRENT_SESSION_KEY]: currentSessionId
      });
      return;
    }

    await chromeStorageRemove([CURRENT_SESSION_KEY]);
  }

  async function readAllSessions() {
    return withStore("readonly", (store, resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(Array.isArray(request.result) ? request.result : []);
      request.onerror = () => reject(request.error);
    });
  }

  async function writeAllSessions(sessions) {
    return withStore("readwrite", (store, resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onerror = () => reject(clearRequest.error);
      clearRequest.onsuccess = () => {
        if (!sessions.length) {
          resolve();
          return;
        }

        let pending = sessions.length;
        sessions.forEach((session) => {
          const putRequest = store.put(session);
          putRequest.onerror = () => reject(putRequest.error);
          putRequest.onsuccess = () => {
            pending -= 1;
            if (pending === 0) {
              resolve();
            }
          };
        });
      };
    });
  }

  function withStore(mode, handler) {
    return openDatabase().then(
      (database) =>
        new Promise((resolve, reject) => {
          const transaction = database.transaction(STORE_NAME, mode);
          const store = transaction.objectStore(STORE_NAME);
          handler(store, resolve, reject);
          transaction.onerror = () => reject(transaction.error);
          transaction.oncomplete = () => database.close();
        })
    );
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function closePanel() {
    state.open = false;
    render();
  }

  function normalizeSession(session) {
    if (!session || typeof session.username !== "string") {
      return null;
    }

    const user = findUser(session.username);
    if (!user) {
      void clearEncryptedValue(STORAGE_KEYS.session);
      return null;
    }

    return {
      username: user.username,
      loginAt: session.loginAt || new Date().toISOString()
    };
  }

  function validateCredentials(username, password) {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return COPY.invalidUsername;
    }

    if (password.length < 6) {
      return COPY.invalidPassword;
    }

    return "";
  }

  function findUser(username) {
    const normalized = String(username || "").trim().toLowerCase();
    return state.users.find((item) => item.normalized === normalized) || null;
  }

  async function loadUsers() {
    const usernames = await readEncryptedValue(STORAGE_KEYS.userIndex, null);
    if (Array.isArray(usernames) && usernames.length) {
      const records = await Promise.all(
        usernames.map(async (username) => {
          return readEncryptedValue(getUserStorageKey(username), null);
        })
      );

      return records.filter(Boolean);
    }

    const legacyUsers = await readEncryptedValue(STORAGE_KEYS.users, []);
    if (!Array.isArray(legacyUsers) || !legacyUsers.length) {
      return [];
    }

    await saveUsers(legacyUsers);
    await clearEncryptedValue(STORAGE_KEYS.users);
    return legacyUsers;
  }

  async function saveUsers(users) {
    const dedupedUsers = Array.isArray(users)
      ? users.filter((user, index, list) => {
          return (
            user &&
            typeof user.username === "string" &&
            list.findIndex((item) => item?.normalized === user.normalized) === index
          );
        })
      : [];

    const usernames = dedupedUsers.map((user) => user.username);
    await writeEncryptedValue(STORAGE_KEYS.userIndex, usernames);

    await Promise.all(
      dedupedUsers.map((user) => {
        return writeEncryptedValue(getUserStorageKey(user.username), user);
      })
    );
  }

  function getBucketIdForSession(session) {
    if (!session?.username) {
      return DEFAULT_BUCKET;
    }

    return `user:${String(session.username).trim().toLowerCase()}`;
  }

  function getHistoryStorageKey(bucketId) {
    return `${HISTORY_BUCKET_PREFIX}${bucketId}`;
  }

  function getUserStorageKey(username) {
    return `${USER_RECORD_PREFIX}${String(username || "").trim().toLowerCase()}`;
  }

  function setStatus(message, error) {
    state.status = message;
    state.error = Boolean(error);
  }

  function formatTime(value) {
    if (!value) {
      return "";
    }

    try {
      return `登录时间 ${new Date(value).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })}`;
    } catch (error) {
      return "";
    }
  }

  function ensureDeviceSecret() {
    const existing = localStorage.getItem(STORAGE_KEYS.device);
    if (existing) {
      return existing;
    }

    const next = randomBase64(32);
    localStorage.setItem(STORAGE_KEYS.device, next);
    return next;
  }

  async function readEncryptedValue(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    try {
      return await decryptRecord(raw);
    } catch (error) {
      localStorage.removeItem(key);
      return fallback;
    }
  }

  async function writeEncryptedValue(key, value) {
    const encrypted = await encryptRecord(value);
    localStorage.setItem(key, encrypted);
  }

  async function clearEncryptedValue(key) {
    localStorage.removeItem(key);
  }

  async function chromeStorageGet(keys) {
    return new Promise((resolve) => {
      if (!window.chrome?.storage?.local) {
        resolve({});
        return;
      }

      window.chrome.storage.local.get(keys, (result) => {
        resolve(result || {});
      });
    });
  }

  async function chromeStorageSet(payload) {
    return new Promise((resolve) => {
      if (!window.chrome?.storage?.local) {
        resolve();
        return;
      }

      window.chrome.storage.local.set(payload, () => resolve());
    });
  }

  async function chromeStorageRemove(keys) {
    return new Promise((resolve) => {
      if (!window.chrome?.storage?.local) {
        resolve();
        return;
      }

      window.chrome.storage.local.remove(keys, () => resolve());
    });
  }

  async function encryptRecord(value) {
    const key = await getAesKey(ensureDeviceSecret());
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = encoder.encode(JSON.stringify(value));
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
    return JSON.stringify({
      iv: toBase64(iv),
      data: toBase64(new Uint8Array(encrypted))
    });
  }

  async function decryptRecord(record) {
    const parsed = JSON.parse(record);
    const key = await getAesKey(ensureDeviceSecret());
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fromBase64(parsed.iv) },
      key,
      fromBase64(parsed.data)
    );
    return JSON.parse(decoder.decode(decrypted));
  }

  async function getAesKey(secret) {
    const digest = await crypto.subtle.digest("SHA-256", encoder.encode(secret));
    return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, [
      "encrypt",
      "decrypt"
    ]);
  }

  async function hashPassword(password, saltBase64) {
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: fromBase64(saltBase64),
        iterations: 120000,
        hash: "SHA-256"
      },
      keyMaterial,
      256
    );
    return toBase64(new Uint8Array(bits));
  }

  function randomBase64(length) {
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return toBase64(bytes);
  }

  function toBase64(bytes) {
    let output = "";
    bytes.forEach((value) => {
      output += String.fromCharCode(value);
    });
    return btoa(output);
  }

  function fromBase64(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  init();
})();
