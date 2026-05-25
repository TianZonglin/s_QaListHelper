(() => {
  try {
    window.__chatflowCleanup?.();
  } catch {
    // Ignore stale cleanup hooks left by an invalidated extension context.
  }

  window.__chatflowContentLoaded = true;

  const SUPPORTED_HOSTS = [
    "kimi.moonshot.cn",
    "www.kimi.com",
    "kimi.com",
    "kimi.ai",
  ];
  const ROOT_ID = "chatflow-floating-root";
  const RETRY_DELAYS = [0, 160, 420, 900, 1600];

  const INPUT_SELECTORS = [
    "textarea",
    "[contenteditable='true']",
    "[role='textbox']",
    ".chat-input textarea",
  ];

  const SEND_BUTTON_SELECTORS = [
    "button[type='submit']",
    "button[aria-label*='发送']",
    "button[aria-label*='Send']",
    "button.send-button",
  ];

  const USER_SELECTORS = [
    ".chat-content-item-user",
    "[data-message-author-role='user']",
    "[data-role='user']",
    "[data-author='user']",
    "[data-testid*='user' i]",
    "[class*='user-message' i]",
    "[class*='message-user' i]",
    "[class*='human-message' i]",
    "[class*='query' i]",
    "[class*='question' i]",
  ];

  const ASSISTANT_SELECTORS = [
    ".chat-content-item-assistant",
    "[data-message-author-role='assistant']",
    "[data-role='assistant']",
    "[data-author='assistant']",
    "[data-testid*='assistant' i]",
    "[class*='assistant-message' i]",
    "[class*='message-assistant' i]",
    "[class*='bot-message' i]",
    "[class*='answer' i]",
    "[class*='response' i]",
  ];

  const MESSAGE_SELECTORS = [
    ".chat-content-item-user",
    ".chat-content-item-assistant",
    "main article",
    "main [role='article']",
    "main [role='listitem']",
    "main [data-message-id]",
    "main [data-testid*='message' i]",
    "main [class*='message' i]",
    "main [class*='chat-item' i]",
    "main [class*='conversation-item' i]",
    "main [class*='turn' i]",
  ];

  const CONTENT_SELECTORS = [
    ".chat-content-item-content",
    ".chat-content-item-text",
    "[data-message-content]",
    ".markdown",
    ".prose",
    ".message-content",
    ".chat-message-content",
    ".response-content",
  ];
  const DEFAULT_CAPTURE_PRESETS = {
    generic: {
      userSelectors: USER_SELECTORS,
      assistantSelectors: ASSISTANT_SELECTORS,
      messageSelectors: MESSAGE_SELECTORS,
      contentSelectors: CONTENT_SELECTORS,
      refSelector: "",
      excludeSelectors: [],
      scope: "all",
    },
    kimi: {
      userSelectors: [".chat-content-item-user"],
      assistantSelectors: [".chat-content-item-assistant"],
      messageSelectors: [
        ".chat-content-item-user",
        ".chat-content-item-assistant",
      ],
      contentSelectors: CONTENT_SELECTORS,
      refSelector: ".pua-ref-renderer--cite",
      excludeSelectors: [
        ".toolcall-container",
        ".chat-content-item-actions",
        ".chat-content-item-toolbar",
        ".chat-content-item-footer",
        "button",
        "[role='button']",
      ],
      scope: "latest-answer",
    },
  };
  if (!window.__CHATFLOW_CAPTURE_PRESETS__) {
    window.__CHATFLOW_CAPTURE_PRESETS__ = DEFAULT_CAPTURE_PRESETS;
  }
  if (!window.__CHATFLOW_CAPTURE_ACTIVE__) {
    window.__CHATFLOW_CAPTURE_ACTIVE__ = "kimi";
  }
  if (!window.__CHATFLOW_CAPTURE_OVERRIDES__) {
    window.__CHATFLOW_CAPTURE_OVERRIDES__ = {};
  }
  const HIGHLIGHT_STYLE_ID = "chatflow-message-highlight-style";
  const HIGHLIGHT_CLASS = "chatflow-message-highlight";

  let observer = null;
  let timer = null;
  let lastDigest = "";
  let forceNextCapture = false;
  let handleRuntimeMessage = null;
  let activeHighlightedElement = null;

  function isExtensionContextInvalidated(error) {
    return String(error?.message || error || "").includes(
      "Extension context invalidated",
    );
  }

  function runtimeAvailable() {
    try {
      return Boolean(window.chrome?.runtime?.id && chrome.runtime?.sendMessage);
    } catch {
      return false;
    }
  }

  function safeSendMessage(message) {
    if (!runtimeAvailable()) return false;
    try {
      chrome.runtime.sendMessage(message, () => {
        try {
          void chrome.runtime.lastError;
        } catch {
          // The context can be invalidated between send and callback.
        }
      });
      return true;
    } catch (error) {
      if (!isExtensionContextInvalidated(error)) {
        console.warn("chatflow content sendMessage failed", error);
      }
      return false;
    }
  }

  function safeGetExtensionUrl(path) {
    if (!runtimeAvailable()) return "";
    try {
      return chrome.runtime.getURL(path);
    } catch (error) {
      if (!isExtensionContextInvalidated(error)) {
        console.warn("chatflow content getURL failed", error);
      }
      return "";
    }
  }

  function isSupportedPage() {
    return SUPPORTED_HOSTS.includes(window.location.hostname);
  }

  function insidePanel(element) {
    return Boolean(element?.closest?.(`#${ROOT_ID}`));
  }

  function normalizeText(value) {
    return String(value || "")
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function stripUiActionText(value) {
    let text = String(value || "");
    text = text
      .replace(/(^|\s)(Edit|Copy|Share|Retry|Regenerate|Like|Dislike)(?=\s|$)/gi, " ")
      .replace(/编辑\s*复制\s*分享/g, " ")
      .replace(/(^|\s)(编辑|复制|分享|重试|重新生成|点赞|点踩|朗读|收藏)(?=\s|$)/g, " ");
    return normalizeText(text);
  }

  function toArray(value, fallback = []) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === "string" && value.trim()) return [value.trim()];
    return fallback.slice();
  }

  function resolveCaptureConfig() {
    const presets = window.__CHATFLOW_CAPTURE_PRESETS__ || DEFAULT_CAPTURE_PRESETS;
    const active = String(window.__CHATFLOW_CAPTURE_ACTIVE__ || "kimi").trim();
    const base =
      presets[active] || presets.generic || DEFAULT_CAPTURE_PRESETS.generic;
    const overrides = window.__CHATFLOW_CAPTURE_OVERRIDES__ || {};
    return {
      userSelectors: toArray(overrides.userSelectors, toArray(base.userSelectors)),
      assistantSelectors: toArray(
        overrides.assistantSelectors,
        toArray(base.assistantSelectors),
      ),
      messageSelectors: toArray(
        overrides.messageSelectors,
        toArray(base.messageSelectors),
      ),
      contentSelectors: toArray(
        overrides.contentSelectors,
        toArray(base.contentSelectors),
      ),
      excludeSelectors: toArray(
        overrides.excludeSelectors,
        toArray(base.excludeSelectors),
      ),
      refSelector: String(overrides.refSelector ?? base.refSelector ?? "").trim(),
      scope: String(overrides.scope ?? base.scope ?? "all").trim(),
    };
  }

  function isVisible(element) {
    if (!element || insidePanel(element)) return false;
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0"
    );
  }

  function removeExcludedNodes(root, excludeSelectors) {
    if (!root || !excludeSelectors?.length) return;
    for (const selector of excludeSelectors) {
      root.querySelectorAll(selector).forEach((node) => node.remove());
    }
  }

  function elementText(element, contentSelectors, excludeSelectors) {
    if (!element) return "";
    const source = element.cloneNode(true);
    removeExcludedNodes(source, excludeSelectors);
    for (const selector of contentSelectors) {
      const content = source.querySelector(selector);
      const text = stripUiActionText(content?.innerText || content?.textContent);
      if (text) return text;
    }
    return stripUiActionText(source.innerText || source.textContent);
  }

  function extractRefText(element, refSelector, excludeSelectors) {
    if (!element || !refSelector) return "";
    const source = element.cloneNode(true);
    removeExcludedNodes(source, excludeSelectors);
    const refs = Array.from(source.querySelectorAll(refSelector))
      .map((node) => stripUiActionText(node.innerText || node.textContent))
      .filter(Boolean);
    return Array.from(new Set(refs)).join("; ");
  }

  function signature(element) {
    const parts = [];
    let current = element;
    let depth = 0;
    while (current && current !== document.body && depth < 5) {
      parts.push(
        current.getAttribute?.("data-message-author-role"),
        current.getAttribute?.("data-role"),
        current.getAttribute?.("data-author"),
        current.getAttribute?.("data-testid"),
        current.getAttribute?.("aria-label"),
        current.id,
        typeof current.className === "string" ? current.className : "",
      );
      current = current.parentElement;
      depth += 1;
    }
    return normalizeText(parts.filter(Boolean).join(" ")).toLowerCase();
  }

  function classify(element) {
    const sig = signature(element);
    if (
      /\b(user|human|me|self|query|prompt|question|ask)\b|用户|提问|问题|我的/.test(
        sig,
      )
    ) {
      return "question";
    }
    if (
      /\b(assistant|kimi|moonshot|ai|bot|model|reply|response|answer)\b|助手|回答|回复|答复/.test(
        sig,
      )
    ) {
      return "answer";
    }
    if (
      element.querySelector(
        "button[aria-label*='复制'], button[aria-label*='重新生成'], button[aria-label*='点赞'], button[aria-label*='点踩']",
      )
    ) {
      return "answer";
    }
    return null;
  }

  function collectBySelectors(
    type,
    selectors,
    priority,
    config,
    latestAnswerElement = null,
  ) {
    const results = [];
    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach((element) => {
        if (!isVisible(element)) return;
        let text = elementText(
          element,
          config.contentSelectors,
          config.excludeSelectors,
        );
        if (
          type === "answer" &&
          config.refSelector &&
          (config.scope !== "latest-answer" || element === latestAnswerElement)
        ) {
          const refText = extractRefText(
            element,
            config.refSelector,
            config.excludeSelectors,
          );
          if (refText) {
            text = text ? `${text}\n\u53C2\u8003\uff1a${refText}` : `\u53C2\u8003\uff1a${refText}`;
          }
        }
        if (text.length < 2 || text.length > 12000) return;
        results.push({ type, element, text, priority, selector });
      });
    }
    return results;
  }

  function collectGeneric(config) {
    const results = [];
    for (const selector of config.messageSelectors) {
      document.querySelectorAll(selector).forEach((element) => {
        if (!isVisible(element)) return;
        if (
          element.matches("textarea, input, form") ||
          element.querySelector("textarea, input")
        ) {
          return;
        }
        const type = classify(element);
        if (!type) return;
        const text = elementText(
          element,
          config.contentSelectors,
          config.excludeSelectors,
        );
        if (text.length < 2 || text.length > 12000) return;
        results.push({ type, element, text, priority: 1, selector });
      });
    }
    return results;
  }

  function documentOrder(a, b) {
    if (a === b) return 0;
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1;
  }

  function dedupeCandidates(candidates) {
    const sorted = candidates.sort((a, b) => b.priority - a.priority);
    const kept = [];
    for (const item of sorted) {
      const duplicate = kept.some((existing) => {
        if (existing.type !== item.type) return false;
        if (existing.element === item.element) return true;
        if (
          existing.element.contains(item.element) ||
          item.element.contains(existing.element)
        ) {
          return true;
        }
        return normalizeText(existing.text) === normalizeText(item.text);
      });
      if (!duplicate) kept.push(item);
    }
    return kept.sort((a, b) => documentOrder(a.element, b.element));
  }

  function timestampOf(element) {
    const time =
      element.querySelector("time") ||
      element.querySelector("[datetime]") ||
      element.closest("article")?.querySelector("time");
    return time
      ? time.getAttribute("datetime") ||
          time.getAttribute("title") ||
          normalizeText(time.textContent)
      : null;
  }

  function cssEscapeValue(value) {
    let raw = String(value || "");
    if (!raw) return "";
    if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
      return CSS.escape(raw);
    }
    return raw.replace(/["\\]/g, "\\$&");
  }

  function selectorPathOf(element, maxDepth = 8) {
    if (!element || !(element instanceof Element)) return "";
    const parts = [];
    let current = element;
    let depth = 0;
    while (current && current !== document.body && depth < maxDepth) {
      if (current.id) {
        parts.unshift(`#${cssEscapeValue(current.id)}`);
        break;
      }
      let part = current.tagName.toLowerCase();
      const classToken = Array.from(current.classList || []).find(
        (token) => token && !token.startsWith("chatflow-"),
      );
      if (classToken) part += `.${cssEscapeValue(classToken)}`;
      const parent = current.parentElement;
      if (parent) {
        const sameTagSiblings = Array.from(parent.children).filter(
          (child) => child.tagName === current.tagName,
        );
        if (sameTagSiblings.length > 1) {
          const nth = sameTagSiblings.indexOf(current) + 1;
          part += `:nth-of-type(${nth})`;
        }
      }
      parts.unshift(part);
      current = parent;
      depth += 1;
    }
    return parts.join(" > ");
  }

  function buildLocator(item, explicitId, order, globalIndex) {
    return {
      explicitId: explicitId || "",
      type: item.type,
      order,
      globalIndex,
      selectorPath: selectorPathOf(item.element),
      sourceSelector: item.selector || "",
    };
  }

  function collectConfiguredCandidates(config) {
    const answerElements = [];
    for (const selector of config.assistantSelectors) {
      document.querySelectorAll(selector).forEach((element) => {
        if (isVisible(element)) answerElements.push(element);
      });
    }
    const latestAnswerElement = answerElements
      .sort((a, b) => documentOrder(a, b))
      .at(-1);
    return dedupeCandidates([
      ...collectBySelectors("question", config.userSelectors, 3, config),
      ...collectBySelectors(
        "answer",
        config.assistantSelectors,
        3,
        config,
        latestAnswerElement || null,
      ),
      ...collectGeneric(config),
    ]);
  }

  function extractMessages() {
    const config = resolveCaptureConfig();
    const candidates = collectConfiguredCandidates(config);
    const counters = { question: 0, answer: 0 };
    return candidates.map((item, globalIndex) => {
      const explicitId =
        item.element.getAttribute("data-message-id") ||
        item.element.getAttribute("data-id") ||
        item.element.dataset?.messageId ||
        item.element.dataset?.id;
      const order = counters[item.type];
      counters[item.type] += 1;
      return {
        key: explicitId
          ? `${item.type}:${explicitId}`
          : `${item.type}:${order}`,
        order,
        type: item.type,
        content: item.text,
        timestamp: timestampOf(item.element),
        locator: buildLocator(item, explicitId, order, globalIndex),
      };
    });
  }

  function ensureHighlightStyle() {
    if (document.getElementById(HIGHLIGHT_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = HIGHLIGHT_STYLE_ID;
    style.textContent = `
      .${HIGHLIGHT_CLASS} {
        outline: 3px solid #f59e0b !important;
        outline-offset: 2px !important;
        border-radius: 12px !important;
        box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.24) !important;
        background: rgba(251, 191, 36, 0.14) !important;
        transition: box-shadow 220ms ease, background-color 220ms ease;
      }
    `;
    document.documentElement.appendChild(style);
  }

  function collectMessageCandidates() {
    const config = resolveCaptureConfig();
    const candidates = collectConfiguredCandidates(config);
    const counters = { question: 0, answer: 0 };
    return candidates.map((item, globalIndex) => {
      const explicitId =
        item.element.getAttribute("data-message-id") ||
        item.element.getAttribute("data-id") ||
        item.element.dataset?.messageId ||
        item.element.dataset?.id;
      const order = counters[item.type];
      counters[item.type] += 1;
      return {
        element: item.element,
        type: item.type,
        content: item.text,
        key: explicitId
          ? `${item.type}:${explicitId}`
          : `${item.type}:${order}`,
        locator: buildLocator(item, explicitId, order, globalIndex),
      };
    });
  }

  function findCandidateByLocator(locator, candidates) {
    if (!locator || typeof locator !== "object") return null;
    const explicitId = String(locator.explicitId || "").trim();
    if (explicitId) {
      const escaped = cssEscapeValue(explicitId);
      const byId = document.querySelector(
        `[data-message-id="${escaped}"], [data-id="${escaped}"]`,
      );
      if (byId && isVisible(byId)) {
        const match = candidates.find(
          (item) =>
            item.element === byId ||
            item.element.contains(byId) ||
            byId.contains(item.element),
        );
        if (match) return match;
      }
      const byKey = candidates.find(
        (item) => item.locator?.explicitId === explicitId,
      );
      if (byKey) return byKey;
    }
    const selectorPath = String(locator.selectorPath || "").trim();
    if (selectorPath) {
      try {
        const element = document.querySelector(selectorPath);
        if (element && isVisible(element)) {
          const match = candidates.find(
            (item) =>
              item.element === element ||
              item.element.contains(element) ||
              element.contains(item.element),
          );
          if (match) return match;
        }
      } catch {
        // Ignore invalid selector path.
      }
    }
    const type = String(locator.type || "").trim();
    const order = Number(locator.order);
    if (type && Number.isInteger(order) && order >= 0) {
      const byOrder = candidates.filter((item) => item.type === type)[order];
      if (byOrder) return byOrder;
    }
    const globalIndex = Number(locator.globalIndex);
    if (Number.isInteger(globalIndex) && globalIndex >= 0) {
      return candidates[globalIndex] || null;
    }
    return null;
  }

  function findCandidateByPayload(payload = {}) {
    const candidates = collectMessageCandidates();
    if (!candidates.length) return null;
    const locator = payload.locator || null;
    const locatorMatch = findCandidateByLocator(locator, candidates);
    if (locatorMatch) return locatorMatch;
    const messageKey = String(payload.messageKey || "").trim();
    const messageType = String(payload.type || "").trim();
    const messageContent = normalizeText(payload.content || "");
    if (messageKey) {
      const exact = candidates.find((item) => item.key === messageKey);
      if (exact) return exact;
    }
    if (messageType && messageContent) {
      const exactContent = candidates.find(
        (item) =>
          item.type === messageType &&
          normalizeText(item.content) === messageContent,
      );
      if (exactContent) return exactContent;
      const includeContent = candidates.find((item) => {
        if (item.type !== messageType) return false;
        const normalized = normalizeText(item.content);
        if (!normalized) return false;
        return (
          normalized.includes(messageContent.slice(0, 120)) ||
          messageContent.includes(normalized.slice(0, 120))
        );
      });
      if (includeContent) return includeContent;
    }
    if (messageContent) {
      return (
        candidates.find(
          (item) => normalizeText(item.content) === messageContent,
        ) || null
      );
    }
    return null;
  }

  function focusAndHighlightMessage(payload = {}) {
    const candidate = findCandidateByPayload(payload);
    if (!candidate?.element) {
      return { ok: false, error: "未在当前页面定位到对应对话节点。" };
    }
    ensureHighlightStyle();
    if (
      activeHighlightedElement &&
      activeHighlightedElement !== candidate.element
    ) {
      activeHighlightedElement.classList.remove(HIGHLIGHT_CLASS);
    }
    activeHighlightedElement = candidate.element;
    candidate.element.classList.add(HIGHLIGHT_CLASS);
    candidate.element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    window.setTimeout(() => {
      candidate.element?.classList?.remove(HIGHLIGHT_CLASS);
      if (activeHighlightedElement === candidate.element) {
        activeHighlightedElement = null;
      }
    }, 2600);
    return { ok: true };
  }

  function digest(messages) {
    return messages
      .map((message) => {
        const locator = message.locator || {};
        return `${message.key}:${message.content}:${locator.explicitId || ""}:${locator.order ?? ""}:${locator.selectorPath || ""}`;
      })
      .join("||");
  }

  function publish(force = false) {
    if (!isSupportedPage() || !runtimeAvailable()) {
      return { ok: false, messages: [] };
    }
    const messages = extractMessages();
    const nextDigest = digest(messages);
    if (!force && nextDigest === lastDigest) {
      return { ok: true, messages, skipped: true };
    }
    lastDigest = nextDigest;
    safeSendMessage({
      type: "SYNC_PAGE_MESSAGES",
      payload: {
        url: window.location.href,
        pageTitle: document.title,
        digest: nextDigest,
        capturedAt: Date.now(),
        messages,
      },
    });
    return { ok: true, messages };
  }

  function flushCapture() {
    timer = null;
    const force = forceNextCapture;
    forceNextCapture = false;
    publish(force);
  }

  function scheduleCapture(delay = 120, force = false) {
    forceNextCapture = forceNextCapture || force;
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(flushCapture, Math.max(0, delay));
  }

  function startObserver() {
    if (!isSupportedPage() || observer || !document.body) return;
    observer = new MutationObserver(() => scheduleCapture(160, false));
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    window.addEventListener("load", () => scheduleCapture(0, true), {
      once: true,
    });
    window.addEventListener("focus", () => scheduleCapture(0, true));
    window.addEventListener("popstate", () => scheduleCapture(0, true));
    window.addEventListener("hashchange", () => scheduleCapture(0, true));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") scheduleCapture(0, true);
    });
    RETRY_DELAYS.forEach((delay) =>
      window.setTimeout(() => scheduleCapture(0, true), delay),
    );
  }

  function firstAvailable(selectors) {
    for (const selector of selectors) {
      for (const element of document.querySelectorAll(selector)) {
        if (!insidePanel(element) && isVisible(element)) return element;
      }
    }
    return null;
  }

  function setInputValue(element, value) {
    if (!element) return false;
    if (
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLInputElement
    ) {
      element.focus();
      element.value = value;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }
    if (element.isContentEditable) {
      element.focus();
      element.textContent = value;
      element.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          data: value,
          inputType: "insertText",
        }),
      );
      return true;
    }
    return false;
  }

  async function submitPrompt({
    prompt,
    questionId,
    anchorQuestionId,
    relationType,
  }) {
    if (!isSupportedPage()) {
      return { ok: false, error: "当前页面不是受支持的 Kimi 页面。" };
    }
    const input = firstAvailable(INPUT_SELECTORS);
    const sendButton = firstAvailable(SEND_BUTTON_SELECTORS);
    if (!input || !sendButton) {
      return { ok: false, error: "当前页面未找到 Kimi 输入框或发送按钮。" };
    }
    if (!setInputValue(input, prompt)) {
      return { ok: false, error: "无法将提问内容写入 Kimi 输入框。" };
    }
    sendButton.click();
    scheduleCapture(180, true);
    safeSendMessage({
      type: "ANSWER_STREAM",
      payload: {
        questionId,
        anchorQuestionId,
        relationType,
        content: "正在等待页面自动抓取回答内容...",
      },
    });
    return { ok: true };
  }

  function ensureFloatingPanel() {
    let root = document.getElementById(ROOT_ID);
    if (root) return root;
    const sidepanelUrl = safeGetExtensionUrl("sidepanel.html");
    if (!sidepanelUrl) {
      throw new Error("扩展上下文已失效，请刷新 Kimi 页面后重试。");
    }
    root = document.createElement("div");
    root.id = ROOT_ID;
    root.dataset.visible = "false";
    root.innerHTML = `
      <style>
        #${ROOT_ID} {
          position: fixed;
          top: 12px;
          right: 0;
          bottom: 12px;
          width: 375px;
          display: flex;
          justify-content: flex-end;
          z-index: 2147483646;
          pointer-events: none;
        }
        #${ROOT_ID}[data-visible="false"] {
          display: none;
        }
        #${ROOT_ID} .chatflow-frame {
          display: block;
          width: 375px;
          height: 100%;
          max-height: calc(100vh - 24px);
          border: 0;
          border-radius: 16px 0 0 16px;
          background: #ffffff;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
          pointer-events: auto;
        }
      </style>
      <iframe
        class="chatflow-frame"
        title="问答侧边栏面板"
        src="${sidepanelUrl}"
        allow="clipboard-write"
      ></iframe>
    `;
    document.documentElement.appendChild(root);
    return root;
  }

  function toggleFloatingPanel() {
    if (!isSupportedPage()) {
      return {
        ok: false,
        error: "请先打开受支持的 Kimi 页面，再使用扩展侧边栏。",
      };
    }
    startObserver();
    scheduleCapture(0, true);
    const panel = ensureFloatingPanel();
    const visible = panel.dataset.visible !== "true";
    panel.dataset.visible = visible ? "true" : "false";
    return { ok: true, visible };
  }

  handleRuntimeMessage = (message, _sender, sendResponse) => {
    if (message?.type === "TOGGLE_FLOATING_PANEL") {
      try {
        sendResponse(toggleFloatingPanel());
      } catch (error) {
        sendResponse({
          ok: false,
          error: error?.message || "切换侧边栏失败。",
        });
      }
      return false;
    }
    if (message?.type === "CAPTURE_PAGE_MESSAGES") {
      startObserver();
      const result = publish(true);
      sendResponse({
        ok: result.ok,
        count: result.messages.length,
        url: window.location.href,
      });
      return false;
    }
    if (message?.type === "CONTENT_SUBMIT_PROMPT") {
      submitPrompt(message.payload || {})
        .then(sendResponse)
        .catch((error) =>
          sendResponse({
            ok: false,
            error: error?.message || "内容脚本在发送提问时发生错误。",
          }),
        );
      return true;
    }
    if (message?.type === "HIGHLIGHT_CAPTURED_MESSAGE") {
      sendResponse(focusAndHighlightMessage(message.payload || {}));
      return false;
    }
    return false;
  };

  try {
    if (runtimeAvailable()) {
      chrome.runtime.onMessage.addListener(handleRuntimeMessage);
    }
  } catch (error) {
    if (!isExtensionContextInvalidated(error)) {
      console.warn("chatflow content listener registration failed", error);
    }
  }

  window.__chatflowCleanup = () => {
    if (timer) window.clearTimeout(timer);
    timer = null;
    if (observer) observer.disconnect();
    observer = null;
    try {
      if (handleRuntimeMessage && window.chrome?.runtime?.onMessage) {
        chrome.runtime.onMessage.removeListener(handleRuntimeMessage);
      }
    } catch {
      // Old listeners may already belong to an invalidated context.
    }
  };

  startObserver();
})();

