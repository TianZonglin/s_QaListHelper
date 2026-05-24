(() => {
  if (window.__chatflowContentLoaded) return;
  window.__chatflowContentLoaded = true;

  const SUPPORTED_HOSTS = ["kimi.moonshot.cn", "www.kimi.com", "kimi.com", "kimi.ai"];
  const ROOT_ID = "chatflow-floating-root";
  const RETRY_DELAYS = [0, 160, 420, 900, 1600];

  const INPUT_SELECTORS = [
    "textarea",
    "[contenteditable='true']",
    "[role='textbox']",
    ".chat-input textarea"
  ];

  const SEND_BUTTON_SELECTORS = [
    "button[type='submit']",
    "button[aria-label*='发送']",
    "button[aria-label*='Send']",
    "button.send-button"
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
    "[class*='question' i]"
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
    "[class*='response' i]"
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
    "main [class*='turn' i]"
  ];

  const CONTENT_SELECTORS = [
    ".chat-content-item-content",
    ".chat-content-item-text",
    "[data-message-content]",
    ".markdown",
    ".prose",
    ".message-content",
    ".chat-message-content",
    ".response-content"
  ];

  let observer = null;
  let timer = null;
  let lastDigest = "";
  let forceNextCapture = false;

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

  function elementText(element) {
    for (const selector of CONTENT_SELECTORS) {
      const content = element.querySelector(selector);
      const text = normalizeText(content?.innerText || content?.textContent);
      if (text) return text;
    }
    return normalizeText(element.innerText || element.textContent);
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
        typeof current.className === "string" ? current.className : ""
      );
      current = current.parentElement;
      depth += 1;
    }
    return normalizeText(parts.filter(Boolean).join(" ")).toLowerCase();
  }

  function classify(element) {
    const sig = signature(element);
    if (
      /\b(user|human|me|self|query|prompt|question|ask)\b|用户|提问|问题|我的/.test(sig)
    ) {
      return "question";
    }
    if (
      /\b(assistant|kimi|moonshot|ai|bot|model|reply|response|answer)\b|助手|回答|回复|答复/.test(sig)
    ) {
      return "answer";
    }
    if (
      element.querySelector(
        "button[aria-label*='复制'], button[aria-label*='重新生成'], button[aria-label*='点赞'], button[aria-label*='点踩']"
      )
    ) {
      return "answer";
    }
    return null;
  }

  function collectBySelectors(type, selectors, priority) {
    const results = [];
    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach((element) => {
        if (!isVisible(element)) return;
        const text = elementText(element);
        if (text.length < 2 || text.length > 12000) return;
        results.push({ type, element, text, priority });
      });
    }
    return results;
  }

  function collectGeneric() {
    const results = [];
    for (const selector of MESSAGE_SELECTORS) {
      document.querySelectorAll(selector).forEach((element) => {
        if (!isVisible(element)) return;
        if (element.matches("textarea, input, form") || element.querySelector("textarea, input")) {
          return;
        }
        const type = classify(element);
        if (!type) return;
        const text = elementText(element);
        if (text.length < 2 || text.length > 12000) return;
        results.push({ type, element, text, priority: 1 });
      });
    }
    return results;
  }

  function documentOrder(a, b) {
    if (a === b) return 0;
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  }

  function dedupeCandidates(candidates) {
    const sorted = candidates.sort((a, b) => b.priority - a.priority);
    const kept = [];
    for (const item of sorted) {
      const duplicate = kept.some((existing) => {
        if (existing.type !== item.type) return false;
        if (existing.element === item.element) return true;
        if (existing.element.contains(item.element) || item.element.contains(existing.element)) {
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
      ? time.getAttribute("datetime") || time.getAttribute("title") || normalizeText(time.textContent)
      : null;
  }

  function extractMessages() {
    const candidates = dedupeCandidates([
      ...collectBySelectors("question", USER_SELECTORS, 3),
      ...collectBySelectors("answer", ASSISTANT_SELECTORS, 3),
      ...collectGeneric()
    ]);
    const counters = { question: 0, answer: 0 };
    return candidates.map((item) => {
      const explicitId =
        item.element.getAttribute("data-message-id") ||
        item.element.getAttribute("data-id") ||
        item.element.dataset?.messageId ||
        item.element.dataset?.id;
      const order = counters[item.type];
      counters[item.type] += 1;
      return {
        key: explicitId ? `${item.type}:${explicitId}` : `${item.type}:${order}`,
        order,
        type: item.type,
        content: item.text,
        timestamp: timestampOf(item.element)
      };
    });
  }

  function digest(messages) {
    return messages.map((message) => `${message.key}:${message.content}`).join("||");
  }

  function publish(force = false) {
    if (!isSupportedPage() || !window.chrome?.runtime?.sendMessage) {
      return { ok: false, messages: [] };
    }
    const messages = extractMessages();
    const nextDigest = digest(messages);
    if (!force && nextDigest === lastDigest) {
      return { ok: true, messages, skipped: true };
    }
    lastDigest = nextDigest;
    chrome.runtime.sendMessage({
      type: "SYNC_PAGE_MESSAGES",
      payload: {
        url: window.location.href,
        pageTitle: document.title,
        digest: nextDigest,
        capturedAt: Date.now(),
        messages
      }
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
      characterData: true
    });
    window.addEventListener("load", () => scheduleCapture(0, true), { once: true });
    window.addEventListener("focus", () => scheduleCapture(0, true));
    window.addEventListener("popstate", () => scheduleCapture(0, true));
    window.addEventListener("hashchange", () => scheduleCapture(0, true));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") scheduleCapture(0, true);
    });
    RETRY_DELAYS.forEach((delay) => window.setTimeout(() => scheduleCapture(0, true), delay));
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
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
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
        new InputEvent("input", { bubbles: true, data: value, inputType: "insertText" })
      );
      return true;
    }
    return false;
  }

  async function submitPrompt({ prompt, questionId, anchorQuestionId, relationType }) {
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
    chrome.runtime?.sendMessage?.({
      type: "ANSWER_STREAM",
      payload: {
        questionId,
        anchorQuestionId,
        relationType,
        content: "正在等待页面自动抓取回答内容..."
      }
    });
    return { ok: true };
  }

  function ensureFloatingPanel() {
    let root = document.getElementById(ROOT_ID);
    if (root) return root;
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
        src="${chrome.runtime.getURL("sidepanel.html")}"
        allow="clipboard-write"
      ></iframe>
    `;
    document.documentElement.appendChild(root);
    return root;
  }

  function toggleFloatingPanel() {
    if (!isSupportedPage()) {
      return { ok: false, error: "请先打开受支持的 Kimi 页面，再使用扩展侧边栏。" };
    }
    startObserver();
    scheduleCapture(0, true);
    const panel = ensureFloatingPanel();
    const visible = panel.dataset.visible !== "true";
    panel.dataset.visible = visible ? "true" : "false";
    return { ok: true, visible };
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "TOGGLE_FLOATING_PANEL") {
      sendResponse(toggleFloatingPanel());
      return false;
    }
    if (message?.type === "CAPTURE_PAGE_MESSAGES") {
      startObserver();
      const result = publish(true);
      sendResponse({
        ok: result.ok,
        count: result.messages.length,
        url: window.location.href
      });
      return false;
    }
    if (message?.type === "CONTENT_SUBMIT_PROMPT") {
      submitPrompt(message.payload || {})
        .then(sendResponse)
        .catch((error) =>
          sendResponse({
            ok: false,
            error: error?.message || "内容脚本在发送提问时发生错误。"
          })
        );
      return true;
    }
    return false;
  });

  startObserver();
})();
