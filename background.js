(() => {
  chrome.sidePanel
    ?.setPanelBehavior?.({ openPanelOnActionClick: true })
    .catch?.(() => {});
  var u = {
    PROGRESSIVE: "progressive",
    INDEPENDENT: "independent",
    REPEAT_CORRECTION: "repeat_correction",
  };
  var st = "ai_related_context",
    ot = "semantic-ai-dashed-arc",
    rt = "#DC2626";
  const AI_LAYER_CACHE_VERSION = 2;
  const AI_RELATION_MODEL = "gpt-5.3-codex",
    AI_RELATION_BASE_URL = "https://relay.nf.video/v1",
    AI_RELATION_API_KEY =
      "sk-ant-sid01--3357e5f859e0e9dde27f5228b7eae85d80c9b5875e555ac13acf95a3f54cb254";
  const AI_RELATION_SYSTEM_PROMPT = [
    "你是补充提问识别器。任务：判断每个当前提问相对于其全部前序节点是否为“补充提问”。",
    '输出要求：只输出 JSON 对象，不要输出任何额外文本。格式：{"supplementResults":[...]}',
    'supplementResults 的元素结构：{"questionId":"当前提问ID","decisions":[{"nodeId":"历史节点ID","nodeType":"question|answer","isSupplement":true|false,"score":0-1,"reason":"不超过20字"}]}',
    "必须输出全部前序节点的判定，不允许遗漏节点。",
    "不要在模型侧做阈值裁剪，只给出 isSupplement 与 score。",
    "判定原则：",
    "1) 主题、实体、约束、目标、时间条件有明显承接或引用，判为相关；",
    "2) 同义改写、补充条件、追问细节、纠错回指，判为相关；",
    "3) 仅词面偶然重合、主题跳转、泛泛寒暄，不相关。",
    "4) score 建议阈值：>=0.55 才输出到 related。",
  ].join("\n");
  function A(e, r = 96) {
    let n = String(e || "")
      .replace(/\s+/g, " ")
      .trim();
    return n
      ? n.length <= r
        ? n
        : `${n.slice(0, r - 3)}...`
      : "\u7B49\u5F85\u5185\u5BB9\u751F\u6210...";
  }
  function tt(e) {
    return String(e || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  function V(e) {
    return tt(e).split(" ").filter(Boolean);
  }
  function Y(e, r) {
    let n = new Set(V(e)),
      t = new Set(V(r));
    if (!n.size || !t.size) return 0;
    let o = 0;
    for (let s of n) t.has(s) && (o += 1);
    return o / new Set([...n, ...t]).size;
  }
  function M(e, r) {
    let n = Array.isArray(r)
        ? {
            questionNodes: r,
            previousQuestion: r[r.length - 1] || null,
            previousAnswer: null,
          }
        : r || {},
      t = n.previousQuestion || null,
      o = n.previousAnswer || null,
      s = Array.isArray(n.questionNodes) ? n.questionNodes : [];
    if (!t && !o && !s.length)
      return {
        patternType: u.INDEPENDENT,
        anchorQuestionId: null,
        visible: !0,
        score: 0,
      };
    let i = t ? Y(e, t.content) : 0,
      a = o ? Y(e, o.content) : 0;
    return t && i > 0.8
      ? {
          patternType: u.REPEAT_CORRECTION,
          anchorQuestionId: t.anchorQuestionId || t.id,
          visible: !1,
          score: i,
        }
      : o && a > 0.6
        ? {
            patternType: u.PROGRESSIVE,
            anchorQuestionId: t?.id || t?.anchorQuestionId || null,
            visible: !0,
            score: a,
          }
        : {
            patternType: u.INDEPENDENT,
            anchorQuestionId: null,
            visible: !0,
            score: i < 0.3 || !t ? 1 - i : 0.5,
          };
  }
  function D(e) {
    let r = String(e || "").trim(),
      n = r.replace(/\s+/g, " "),
      t = Math.min(n.length / 480, 1),
      o = n.split(/[\u3002\uff01\uff1f!?\.]/).filter(Boolean).length,
      s = /(\n[-*]|^\d+\.|\b1\.)/m.test(r) ? 1 : 0.55,
      i =
        /(\u53ef\u80fd|\u4e5f\u8bb8|\u4e0d\u786e\u5b9a|\u731c\u6d4b|\u65e0\u6cd5\u4fdd\u8bc1|maybe|might|unsure)/i.test(
          r,
        )
          ? 0.12
          : 0,
      a = /(.)\1{5,}/.test(r) ? 0.2 : 0,
      c = /[\u3002\uff01\uff1f!?\.]$/.test(n) ? 0.9 : 0.72,
      d = O(0.45 + t * 0.35 + c * 0.2 - i),
      l = O(0.3 + t * 0.4 + Math.min(o / 5, 1) * 0.3),
      y = O(0.45 + c * 0.3 + s * 0.25 - a),
      E = O(d * 0.4 + l * 0.35 + y * 0.25);
    return {
      accuracy: _(d),
      completeness: _(l),
      fluency: _(y),
      overall: _(E),
      level: E >= 0.75 ? "high" : E >= 0.5 ? "medium" : "low",
    };
  }
  function x(e) {
    return e.reduce(
      (r, n) => (
        n.type === "question" && (r[n.patternType || u.PROGRESSIVE] += 1),
        r
      ),
      { [u.PROGRESSIVE]: 0, [u.INDEPENDENT]: 0, [u.REPEAT_CORRECTION]: 0 },
    );
  }
  function O(e) {
    return Math.min(Math.max(e, 0), 1);
  }
  function B(e) {
    return e >= 75 ? "high" : e >= 50 ? "medium" : "low";
  }
  function z(e, r = 1) {
    let n = Math.max(0, r),
      t = {
        accuracy: Number(e?.accuracy || 0),
        completeness: Number(e?.completeness || 0),
        fluency: Number(e?.fluency || 0),
        overall: Number(e?.overall || 0),
      };
    if (!n) return { ...t, level: B(t.overall) };
    let o = n * 18,
      s = {
        accuracy: Math.max(20, t.accuracy - o),
        completeness: Math.max(20, t.completeness - o),
        fluency: Math.max(20, t.fluency - o),
        overall: Math.max(15, t.overall - o),
      };
    return { ...s, level: B(s.overall) };
  }
  function _(e) {
    return Math.round(O(e) * 100);
  }
  var et = "chatflow-extension-db",
    nt = 1,
    b = "sessions",
    $ = "session-index",
    G = "current-session-id",
    C = 182,
    Q = 452,
    w = 98,
    it = 142,
    at = 54;
  function m() {
    return `conv-${crypto.randomUUID()}`;
  }
  function ct(e) {
    let r = e.nodes.filter((i) => i.type === "question"),
      n = e.nodes.filter((i) => i.type === "answer"),
      t = n.filter((i) => i.scores);
    if (!r.length && !n.length) return 0;
    let o = Math.max(r.length + n.length, 1),
      s = r.length + n.length * 0.6 + t.length * 0.4;
    return Math.max(15, Math.min(100, Math.round((s / o) * 100)));
  }
  function W() {
    let e = new Date().toISOString();
    return {
      id: `session-${Date.now()}`,
      title: `Kimi \u81EA\u52A8\u6293\u53D6\u4F1A\u8BDD ${new Date().toLocaleString("zh-CN")}`,
      modelProvider: "Kimi \u7F51\u9875\u7248",
      createdAt: e,
      updatedAt: e,
      sourceUrl: "",
      snapshotDigest: "",
      nodes: [],
      edges: [],
      patternSummary: x([]),
      storageProgress: 0,
    };
  }
  function ut(e, r) {
    let n = String(e || "").trim(),
      t = String(r || "").trim();
    if (!n || !t) return !1;
    let o = Y(n, t);
    if (o >= 0.28) return !0;
    let s = new Set(n.replace(/\s+/g, "").slice(-120).split("")),
      i = t.replace(/\s+/g, "").slice(0, 120).split("").filter(Boolean);
    if (!s.size || !i.length) return !1;
    let a = 0;
    for (let c of i) s.has(c) && (a += 1);
    return a / Math.max(i.length, 1) >= 0.18;
  }
  function lt(e) {
    return "solid";
  }
  function P(e, r, n, t = lt(n), o = "") {
    return {
      id: `edge-${e}-${r}${o ? `-${o}` : ""}`,
      source: e,
      target: r,
      relationType: n,
      style: t,
    };
  }
  function X(e, r) {
    if (e) {
      let n = new Date(e);
      if (!Number.isNaN(n.getTime())) return n.toISOString();
    }
    if (r) {
      let n = new Date(r);
      if (!Number.isNaN(n.getTime())) return n.toISOString();
    }
    return new Date().toISOString();
  }
  function N(e, r) {
    e.edges.some((n) => n.id === r.id) || e.edges.push(r);
  }
  function wt(e, r) {
    let n = V(e),
      t = V(r);
    if (!n.length || !t.length) return 0;
    let o = new Set(n),
      s = 0;
    for (let i of t) o.has(i) && (s += 1);
    return s / Math.max(t.length, 1);
  }
  function Ct(e, r, n) {
    let t = Y(e, r),
      o = wt(e, r),
      s = ut(e, r),
      i = Math.max(t, o * 0.82 + (s ? 0.18 : 0));
    return {
      related: i >= n,
      score: Math.round(O(i) * 100) / 100,
      jaccard: Math.round(O(t) * 100) / 100,
      directional: Math.round(O(o) * 100) / 100,
      bridge: s,
    };
  }
  function Nt(e, r = null) {
    let n = String(e?.id || ""),
      t = r?.get(n) || n;
    return {
      id: t,
      type: e.type,
      content: String(e.content || ""),
    };
  }
  function Qt(e, r = null) {
    return (Array.isArray(e) ? e : []).map((n) => Nt(n, r));
  }
  function Xt(e) {
    let r = (Array.isArray(e) ? e : []).filter(
        (i) => i?.type === "question" || i?.type === "answer",
      ),
      n = r
        .filter((i) => i.type === "question")
        .sort((i, a) => bt(i) - bt(a) || String(i.id).localeCompare(String(a.id))),
      t = r
        .filter((i) => i.type === "answer")
        .sort((i, a) => bt(i) - bt(a) || String(i.id).localeCompare(String(a.id))),
      o = new Map(),
      s = new Map();
    return (
      n.forEach((i, a) => {
        let c = `q-${a + 1}`;
        (o.set(String(i.id), c), s.set(c, String(i.id)));
      }),
      t.forEach((i, a) => {
        let c = `a-${a + 1}`;
        (o.set(String(i.id), c), s.set(c, String(i.id)));
      }),
      { idToShort: o, shortToId: s }
    );
  }
  function Yt(e, r) {
    return (Array.isArray(e) ? e : []).map((n) => ({
      ...n,
      nodeId: r?.get(String(n?.nodeId || "")) || String(n?.nodeId || ""),
    }));
  }
  function Zt(e, r) {
    return (Array.isArray(e) ? e : []).map((n) => ({
      ...n,
      questionId:
        r?.get(String(n?.questionId || "")) || String(n?.questionId || ""),
      decisions: (Array.isArray(n?.decisions) ? n.decisions : []).map((t) => ({
        ...t,
        nodeId: r?.get(String(t?.nodeId || "")) || String(t?.nodeId || ""),
      })),
    }));
  }
  function Ut(e) {
    let r = e.filter((l) => l.visible !== !1).sort((l, y) => bt(l) - bt(y)),
      n = [],
      t = [],
      o = new Map();
    for (let l of r)
      if (l.type === "question") {
        let y = {
          previousQuestions: n.map((E) => Nt(E)),
          previousAnswers: t.map((E) => Nt(E)),
        };
        ((l.historyContext = y), o.set(l.id, y), n.push(l));
      } else l.type === "answer" && t.push(l);
    return o;
  }
  function Bt(e, r) {
    let n = { questionId: e.id, decisions: [] };
    return (
      r.previousQuestions.forEach((t) => {
        let o = Ct(e.content, t.content, 0.55);
        n.decisions.push({
          nodeId: t.id,
          nodeType: "question",
          isSupplement: o.related,
          score: o.score,
          reason: o.bridge ? "语义回指承接" : "主题约束承接",
        });
      }),
      r.previousAnswers.forEach((t) => {
        let o = Ct(e.content, t.content, 0.5);
        n.decisions.push({
          nodeId: t.id,
          nodeType: "answer",
          isSupplement: o.related,
          score: o.score,
          reason: o.bridge ? "引用上文答复" : "延续已答主题",
        });
      }),
      n.decisions.sort((t, o) => o.score - t.score),
      n
    );
  }
  function Gt(e, r, n = 0.6, t = 1) {
    if (!Number.isFinite(e)) return n;
    if (!Number.isFinite(r) || !Number.isFinite(t) || r === t) return 1;
    let o = O((e - r) / (t - r));
    return n + (1 - n) * o;
  }
  function Vt(e) {
    let r = Array.isArray(e?.nodes) ? e.nodes : [],
      n = r
        .filter((s) => s.type === "question" || s.type === "answer")
        .map((s) => ({
          id: String(s.id || ""),
          type: s.type,
          content: String(s.content || "").trim(),
          createdAt: s.createdAt || "",
          questionId: s.questionId || null,
          promptQuestionId: s.promptQuestionId || null,
          previousAnswerId: s.previousAnswerId || null,
          conversationId: s.conversationId || null,
          visible: s.visible !== !1,
        }))
        .sort((s, i) =>
          String(s.id).localeCompare(String(i.id)) ||
          String(s.createdAt).localeCompare(String(i.createdAt)),
        );
    return JSON.stringify(n);
  }
  function Mt(e) {
    if (!e || typeof e !== "object") return "";
    if (typeof e.output_text === "string" && e.output_text.trim())
      return e.output_text.trim();
    if (e?.output_text?.text && typeof e.output_text.text === "string")
      return e.output_text.text.trim();
    if (e?.output_text?.json) return JSON.stringify(e.output_text.json);
    let r = Array.isArray(e.output) ? e.output : [];
    for (let n of r) {
      let t = Array.isArray(n?.content) ? n.content : [];
      for (let o of t) {
        if (typeof o?.text === "string" && o.text.trim()) return o.text.trim();
        if (o?.json) return JSON.stringify(o.json);
      }
    }
    return "";
  }
  function Ot(e) {
    let r = String(e || "").trim();
    if (!r) return [];
    try {
      let n = JSON.parse(r);
      if (Array.isArray(n)) return n;
      if (Array.isArray(n?.supplementResults)) return n.supplementResults;
      if (Array.isArray(n?.relations)) return n.relations;
      return [];
    } catch {}
    let n = r.indexOf("["),
      t = r.lastIndexOf("]");
    if (n >= 0 && t > n)
      try {
        let o = JSON.parse(r.slice(n, t + 1));
        return Array.isArray(o) ? o : [];
      } catch {}
    return [];
  }
  function At(e) {
    if (!Array.isArray(e)) return [];
    return e
      .map((r) => ({
        questionId: String(r?.questionId || "").trim(),
        decisions: Array.isArray(r?.decisions || r?.related)
          ? (r.decisions || r.related)
              .map((n) => ({
                nodeId: String(n?.nodeId || "").trim(),
                nodeType: n?.nodeType === "answer" ? "answer" : "question",
                isSupplement: Boolean(n?.isSupplement),
                score: Math.max(0, Math.min(1, Number(n?.score || 0))),
                reason: String(n?.reason || "").trim().slice(0, 64),
              }))
              .filter((n) => n.nodeId)
          : [],
      }))
      .filter((r) => r.questionId);
  }
  async function Ft(e) {
    if (!AI_RELATION_API_KEY) {
      return {
        relations: null,
        responseText: "[AI调用未执行] 缺少 API Key。",
      };
    }
    let r = `${AI_RELATION_BASE_URL.replace(/\/$/, "")}/responses`,
      n = {
        model: AI_RELATION_MODEL,
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: AI_RELATION_SYSTEM_PROMPT }],
          },
          {
            role: "user",
            content: [{ type: "input_text", text: JSON.stringify(e) }],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "supplement_map",
            strict: !0,
            schema: {
              type: "object",
              properties: {
                supplementResults: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      questionId: { type: "string" },
                      decisions: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            nodeId: { type: "string" },
                            nodeType: {
                              type: "string",
                              enum: ["question", "answer"],
                            },
                            isSupplement: { type: "boolean" },
                            score: { type: "number" },
                            reason: { type: "string" },
                          },
                          required: [
                            "nodeId",
                            "nodeType",
                            "isSupplement",
                            "score",
                            "reason",
                          ],
                          additionalProperties: !1,
                        },
                      },
                    },
                    required: ["questionId", "decisions"],
                    additionalProperties: !1,
                  },
                },
              },
              required: ["supplementResults"],
              additionalProperties: !1,
            },
          },
        },
      };
    try {
      let t = await fetch(r, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_RELATION_API_KEY}`,
        },
        body: JSON.stringify(n),
      });
      if (!t.ok) {
        let o = await t.text();
        return {
          relations: null,
          responseText: `[AI调用失败] HTTP ${t.status} ${o || ""}`.trim(),
        };
      }
      let o = await t.json(),
        s = Mt(o),
        i = At(Ot(s)),
        a = s || JSON.stringify(o);
      return {
        relations: i.length ? i : null,
        responseText: a || "",
      };
    } catch (t) {
      console.warn("ai relation evaluate failed", t);
      return {
        relations: null,
        responseText: `[AI调用异常] ${t?.message || String(t)}`,
      };
    }
  }
  async function Pt(e, opts = {}) {
    (e.edges = e.edges.filter((o) => o.relationType !== st));
    let allowAi = opts.allowAi !== !1;
    let forceAi = opts.forceAi === !0;
    let selectedOnly = opts.selectedOnly === !0;
    let selectedSet = new Set(
      (Array.isArray(opts.selectedNodeIds) ? opts.selectedNodeIds : [])
        .map((o) => String(o || "").trim())
        .filter(Boolean),
    );
    let hasSelectedFilter = selectedSet.size > 0;
    let cacheKey = Vt(e),
      cached = e.aiQualityLayer;
    if (
      !forceAi &&
      cached &&
      cached.cacheVersion === AI_LAYER_CACHE_VERSION &&
      cached.cacheKey === cacheKey &&
      Array.isArray(cached.relations)
    ) {
      let nodeMap = new Map(e.nodes.map((o) => [o.id, o]));
      let scores = [];
      cached.relations.forEach((o) => {
        let i = Array.isArray(o?.decisions || o?.related)
          ? o.decisions || o.related
          : [];
        i.forEach((a) => {
          let c = Number(a?.score || 0);
          c > 0.6 && scores.push(c);
        });
      });
      let min = scores.length ? Math.min(...scores) : 0.6,
        max = scores.length ? Math.max(...scores) : 1;
      cached.relations.forEach((o) => {
        let t = String(o?.questionId || "").trim(),
          s = nodeMap.get(t);
        if (!s) return;
        let i = Array.isArray(o?.decisions || o?.related)
          ? o.decisions || o.related
          : [];
        ((s.aiRelationContext = {
          questionId: t,
          previousQuestions: s?.aiRelationContext?.previousQuestions || [],
          previousAnswers: s?.aiRelationContext?.previousAnswers || [],
          aiPrompt: {
            system: AI_RELATION_SYSTEM_PROMPT,
            input: s?.aiRelationContext?.aiPrompt?.input || null,
          },
          aiResult: o,
        }),
          i.forEach((a) => {
            let score = Number(a?.score || 0);
            if (!(score > 0.6)) return;
            let c = nodeMap.get(String(a?.nodeId || "").trim());
            if (!c) return;
            let d = P(c.id, s.id, st, ot, `ai-${s.id}-${c.id}`);
            let alpha = Gt(score, min, max, 0.2);
            ((d.__dashedColor = rt),
              (d.__solidColor = `rgba(220,38,38,${alpha.toFixed(3)})`),
              (d.__dashedWidth = 2),
              (d.aiScore = score),
              (d.aiKind = a?.nodeType === "answer" ? "q2a" : "q2q"),
              N(e, d));
          }));
      });
      return;
    }
    let { idToShort, shortToId } = Xt(e.nodes),
      r = e.nodes.filter(
        (o) =>
          o.type === "question" &&
          o.visible !== !1 &&
          (!hasSelectedFilter || selectedSet.has(String(o.id))),
      ),
      n = new Map(e.nodes.map((o) => [o.id, o])),
      t = Ut(e.nodes),
      o = [],
      s = [];
    for (let i of r) {
      let a = t.get(i.id) || { previousQuestions: [], previousAnswers: [] },
        p = a.previousQuestions,
        q = a.previousAnswers,
        c = {
          question: Nt(i, idToShort),
          previousQuestions: Qt(p, idToShort),
          previousAnswers: Qt(q, idToShort),
        },
        d = Bt(i, { previousQuestions: p, previousAnswers: q });
      (s.push({
        questionId: idToShort.get(String(i.id)) || i.id,
        question: c.question,
        previousQuestions: c.previousQuestions,
        previousAnswers: c.previousAnswers,
        localDecisions: Yt(d.decisions, idToShort),
      }),
        o.push(d));
    }
    let iPayload = {
        task: "q_relation_batch",
        scoring: {
          minScore: 0.55,
          note: "在 localRelated 基础上二次判断，可增删本地候选",
        },
        questions: s,
      },
      iResult = allowAi
        ? await Ft(iPayload)
        : {
            relations: null,
            responseText: "[AI未调用] 当前流程仅复用历史变量。",
          },
      i = Zt(iResult?.relations || null, shortToId),
      a = new Map((i || o).map((E) => [E.questionId, E]));
    if (
      hasSelectedFilter &&
      !selectedOnly &&
      cached &&
      Array.isArray(cached.relations)
    ) {
      let merged = new Map(cached.relations.map((E) => [E.questionId, E]));
      a.forEach((E, I) => merged.set(I, E));
      a = merged;
    }
    let scorePool = [];
    Array.from(a.values()).forEach((E) => {
      let I = Array.isArray(E?.decisions || E?.related)
        ? E.decisions || E.related
        : [];
      I.forEach((f) => {
        let p = Number(f?.score || 0);
        p > 0.6 && scorePool.push(p);
      });
    });
    let minScore = scorePool.length ? Math.min(...scorePool) : 0.6,
      maxScore = scorePool.length ? Math.max(...scorePool) : 1;
    a.forEach((y, questionId) => {
      let c = n.get(questionId);
      if (!c) return;
      let d = t.get(c.id) || { previousQuestions: [], previousAnswers: [] },
        l = {
          questionId: c.id,
          previousQuestions: d.previousQuestions.map((E) => E.id),
          previousAnswers: d.previousAnswers.map((E) => E.id),
        };
      ((c.aiRelationContext = {
        ...l,
        aiPrompt: {
          system: AI_RELATION_SYSTEM_PROMPT,
          input: {
            question: Nt(c, idToShort),
            previousQuestions: Qt(d.previousQuestions, idToShort),
            previousAnswers: Qt(d.previousAnswers, idToShort),
          },
        },
        aiResult: y,
      }),
        (Array.isArray(y?.decisions || y?.related)
          ? y.decisions || y.related
          : []
        ).forEach((E) => {
          let score = Number(E?.score || 0);
          if (!(score > 0.6)) return;
          let I = n.get(E.nodeId);
          if (!I) return;
          let f = P(I.id, c.id, st, ot, `ai-${c.id}-${E.nodeId}`);
          let alpha = Gt(score, minScore, maxScore, 0.2);
          ((f.__dashedColor = rt),
            (f.__solidColor = `rgba(220,38,38,${alpha.toFixed(3)})`),
            (f.__dashedWidth = 2),
            (f.aiScore = score),
            (f.aiKind = E?.nodeType === "answer" ? "q2a" : "q2q"),
            N(e, f));
        }));
    });
    e.aiQualityLayer = {
      systemPrompt: AI_RELATION_SYSTEM_PROMPT,
      provider: "relay.nf.video",
      model: AI_RELATION_MODEL,
      relations: Array.from(a.values()),
      requestText: JSON.stringify(iPayload),
      responseText:
        iResult?.responseText ||
        (allowAi ? "[AI返回为空]" : "[AI未调用] 当前流程仅复用历史变量。"),
      fallbackUsed: !i,
      cacheKey,
      cacheVersion: AI_LAYER_CACHE_VERSION,
      generatedAt: new Date().toISOString(),
    };
  }
  function dt(e) {
    let r = e.nodes.filter((t) => t.type === "answer");
    r.forEach((t) => {
      if (!t.content) return;
      let o = t.baseScores || D(t.content);
      ((t.baseScores = o),
        t.relationType !== u.REPEAT_CORRECTION &&
          ((t.scores = o), (t.quality = o.level)));
    });
    let n = new Map();
    (r
      .filter((t) => t.relationType === u.REPEAT_CORRECTION)
      .forEach((t) => {
        let o = `${t.conversationId || "default"}::${t.questionId || "root"}`,
          s = n.get(o) || [];
        (s.push(t), n.set(o, s));
      }),
      n.forEach((t) => {
        t.sort((o, s) => new Date(o.createdAt) - new Date(s.createdAt)).forEach(
          (o, s) => {
            let i = t.length - s - 1,
              a = z(o.baseScores, i);
            ((o.scores = {
              accuracy: a.accuracy,
              completeness: a.completeness,
              fluency: a.fluency,
              overall: a.overall,
            }),
              (o.quality = a.level));
          },
        );
      }));
  }
  function pt(e) {
    let r = new Map(e.edges.map((t) => [t.id, t]));
    e.edges.forEach((t) => {
      if (
        t.style === ot ||
        t.relationType === st
      ) {
        ((t.style = ot),
          (t.__dashedColor = t.__dashedColor || rt),
          (t.__dashedWidth = t.__dashedWidth || 2));
        return;
      }
      if (
        t.style === "semantic-wavy" ||
        t.relationType === "semantic_context"
      ) {
        t.style = "semantic-wavy";
        return;
      }
      t.relationType !== u.REPEAT_CORRECTION && (t.style = "solid");
    });
    let n = new Map();
    (e.nodes
      .filter(
        (t) => t.type === "answer" && t.relationType === u.REPEAT_CORRECTION,
      )
      .forEach((t) => {
        let o = `${t.conversationId || "default"}::${t.questionId || "root"}`,
          s = n.get(o) || [];
        (s.push(t), n.set(o, s));
      }),
      n.forEach((t) => {
        let o = t.sort((s, i) => new Date(s.createdAt) - new Date(i.createdAt));
        o.forEach((s, i) => {
          let a = r.get(`edge-${s.questionId}-${s.id}`);
          a && (a.style = i === o.length - 1 ? "dashed" : "dotted");
        });
      }));
  }
  function bt(e) {
    let r = Date.parse(e?.createdAt || "");
    return Number.isFinite(r) ? r : Number.MAX_SAFE_INTEGER;
  }
  async function yt(e, opts = {}) {
    (await Pt(e, opts), dt(e), pt(e));
    let r = e.nodes.filter((a) => a.visible !== !1),
      n = new Map(r.map((a, c) => [a.id, c])),
      t = (a, c) => {
        let d = bt(a) - bt(c);
        if (d !== 0) return d;
        let l = (n.get(a.id) ?? 0) - (n.get(c.id) ?? 0);
        return l !== 0 ? l : String(a.id).localeCompare(String(c.id));
      },
      o = r.filter((a) => a.type === "question").sort(t),
      s = r.filter((a) => a.type === "answer").sort(t),
      i = new Map(),
      a = w + 136,
      c = 44;
    return (
      o.forEach((d, l) => {
        let y = a + l * it;
        ((d.position = { x: Q, y: y }), i.set(d.id, d.position));
      }),
      s.forEach((d, l) => {
        let y = a + c + l * it;
        d.position = { x: C, y: y };
      }),
      e.nodes
        .filter((d) => d.type === "question" && d.visible === !1)
        .forEach((d) => {
          let l = i.get(d.anchorQuestionId) || i.get(d.id) || d.position;
          d.position = l || { x: Q, y: a };
        }),
      e.nodes
        .filter((d) => d.type === "answer" && !d.position)
        .forEach((d) => {
          d.position = { x: C, y: a + c };
        }),
      (e.patternSummary = x(e.nodes)),
      (e.storageProgress = ct(e)),
      (e.updatedAt = new Date().toISOString()),
      e
    );
  }
  function ft(e, r, n) {
    return {
      id: n?.id || `q-${crypto.randomUUID()}`,
      messageKey: e.key,
      locator: e.locator || n?.locator || null,
      type: "question",
      content: e.content,
      thumbnailText: A(e.content, 48),
      createdAt: X(e.timestamp, n?.createdAt),
      position: n?.position || { x: Q, y: w },
      tags: Array.isArray(n?.tags) ? n.tags : [],
      attachments: Array.isArray(n?.attachments) ? n.attachments : [],
      patternType: r.patternType,
      anchorQuestionId: r.anchorQuestionId || n?.anchorQuestionId,
      conversationId: n?.conversationId || m(),
      previousAnswerId: n?.previousAnswerId || null,
      visible: r.visible,
    };
  }
  function Et(e, r, n) {
    let t = D(e.content),
      o = r.questionId || r.id;
    return {
      id: n?.id || `a-${crypto.randomUUID()}`,
      messageKey: e.key,
      locator: e.locator || n?.locator || null,
      type: "answer",
      content: e.content,
      thumbnailText: A(e.content, 72),
      questionId: o,
      promptQuestionId: r.id,
      conversationId: n?.conversationId || r.conversationId || m(),
      relationType: r.patternType || u.INDEPENDENT,
      createdAt: X(e.timestamp, n?.createdAt),
      position: n?.position || { x: C, y: w },
      tags: Array.isArray(n?.tags) ? n.tags : [],
      quality: t.level,
      baseScores: t,
      scores: {
        accuracy: t.accuracy,
        completeness: t.completeness,
        fluency: t.fluency,
        overall: t.overall,
      },
      status: "final",
    };
  }
  function R(e, r) {
    return e.find((n) => n.id === r || n.anchorQuestionId === r);
  }
  function j(e, r, n, t) {
    if (r?.conversationId) return r.conversationId;
    let o = e.anchorQuestionId ? R(n, e.anchorQuestionId) : null;
    return (
      ((e.patternType === u.PROGRESSIVE ||
        e.patternType === u.REPEAT_CORRECTION) &&
        (o?.conversationId || t?.conversationId)) ||
      m()
    );
  }
  async function It(e, r, n = {}) {
    let t = new Map(
        e.nodes.filter((d) => d.messageKey).map((d) => [d.messageKey, d]),
      ),
      o = {
        ...e,
        title: n.pageTitle
          ? `Kimi \u81EA\u52A8\u6293\u53D6 \xB7 ${A(n.pageTitle, 28)}`
          : e.title,
        modelProvider: "Kimi \u7F51\u9875\u7248",
        sourceUrl: n.url || e.sourceUrl || "",
        snapshotDigest: n.digest || e.snapshotDigest || "",
        nodes: [],
        edges: [],
      },
      s = [],
      i = null,
      a = null,
      c = null;
    for (let d of r) {
      if (d.type === "question") {
        let h = a || s[s.length - 1] || null,
          v = M(d.content, {
            questionNodes: s,
            previousQuestion: i,
            previousAnswer: c,
          }),
          p = ft(d, v, t.get(d.key)),
          q = t.get(d.key);
        if (v.patternType === u.REPEAT_CORRECTION) {
          let U =
            R(s, v.anchorQuestionId) ||
            R(s, i?.anchorQuestionId || i?.id) ||
            a ||
            h;
          ((p.conversationId = U?.conversationId || j(v, q, s, h)),
            (p.anchorQuestionId = U?.anchorQuestionId || U?.id || p.id),
            (p.previousAnswerId = c?.id || null),
            (p.visible = !1));
        } else
          v.patternType === u.PROGRESSIVE
            ? ((p.conversationId = i?.conversationId || j(v, q, s, h)),
              (p.anchorQuestionId = p.id),
              (p.previousAnswerId =
                c?.conversationId === p.conversationId ? c.id : null),
              (p.visible = !0),
              p.previousAnswerId &&
                N(o, P(p.previousAnswerId, p.id, u.PROGRESSIVE, "solid")))
            : ((p.conversationId = q?.conversationId || m()),
              (p.anchorQuestionId = p.id),
              (p.previousAnswerId = null),
              (p.visible = !0));
        ((await ut(c?.content, p.content)) &&
          c?.id &&
          N(o, P(c.id, p.id, "semantic_context", "semantic-wavy", "semantic")),
          o.nodes.push(p),
          s.push(p),
          (i = p),
          p.visible !== !1 && (a = p));
        continue;
      }
      let l = i || a || s[s.length - 1];
      if (!l) return;
      let y = l.patternType === u.REPEAT_CORRECTION,
        E = (y && (R(s, l.anchorQuestionId) || a)) || l,
        I = {
          ...l,
          id: l.id,
          questionId: E.id,
          conversationId: E.conversationId || l.conversationId,
          patternType: y ? u.REPEAT_CORRECTION : l.patternType,
        },
        f = Et(d, I, t.get(d.key));
      (o.nodes.push(f),
        f.conversationId === I.conversationId &&
          N(
            o,
            P(
              f.questionId,
              f.id,
              f.relationType,
              f.relationType === u.REPEAT_CORRECTION ? "dashed" : "solid",
            ),
          ),
        (c = f));
    }
    return o;
  }
  function St() {
    return new Promise((e, r) => {
      let n = indexedDB.open(et, nt);
      ((n.onupgradeneeded = () => {
        let t = n.result;
        t.objectStoreNames.contains(b) ||
          t.createObjectStore(b, { keyPath: "id" });
      }),
        (n.onsuccess = () => e(n.result)),
        (n.onerror = () => r(n.error)));
    });
  }
  function H(e, r) {
    return St().then(
      (n) =>
        new Promise((t, o) => {
          let s = n.transaction(b, e),
            i = s.objectStore(b);
          (r(i, t, o),
            (s.onerror = () => o(s.error)),
            (s.oncomplete = () => n.close()));
        }),
    );
  }
  function J(e) {
    return H("readonly", (r, n, t) => {
      let o = r.get(e);
      ((o.onsuccess = () => n(o.result || null)),
        (o.onerror = () => t(o.error)));
    });
  }
  function L(e) {
    return H("readwrite", (r, n, t) => {
      let o = r.put(e);
      ((o.onsuccess = () => n(e)), (o.onerror = () => t(o.error)));
    });
  }
  async function Tt() {
    return (await chrome.storage.local.get(G))[G] || null;
  }
  async function k(e) {
    await chrome.storage.local.set({ [G]: e });
  }
  async function Z() {
    return (await chrome.storage.local.get($))[$] || [];
  }
  async function K(e) {
    let r = await Z(),
      n = [
        {
          id: e.id,
          title: e.title,
          modelProvider: e.modelProvider,
          updatedAt: e.updatedAt,
        },
        ...r.filter((t) => t.id !== e.id),
      ].slice(0, 24);
    (await chrome.storage.local.set({ [$]: n }),
      T({ type: "SESSION_INDEX_UPDATED", sessions: n }));
  }
  async function S() {
    let e = await Tt();
    if (e) {
      let n = await J(e);
      if (n) return n;
    }
    let r = W();
    return (await L(r), await k(r.id), await K(r), r);
  }
  async function vt() {
    await H("readwrite", (e, r, n) => {
      let t = e.clear();
      ((t.onsuccess = () => r(!0)), (t.onerror = () => n(t.error)));
    });
    await chrome.storage.local.set({ [$]: [], [G]: null });
    let e = W();
    return (
      await Promise.all([L(e), k(e.id), K(e)]),
      T({ type: "SESSION_UPDATED", session: e }),
      T({
        type: "STATUS_UPDATE",
        status: "本地会话存储已清空，并已创建新的空会话。",
      }),
      e
    );
  }
  function T(e) {
    try {
      chrome.runtime.sendMessage(e, () => {
        chrome.runtime.lastError;
      });
    } catch (r) {
      console.warn("\u5E7F\u64AD\u6D88\u606F\u5DF2\u8DF3\u8FC7", r);
    }
  }
  function qt(e, r = "") {
    T({
      type: "AI_ANALYSIS_STATE",
      active: Boolean(e),
      label: String(r || "").trim(),
      ts: Date.now(),
    });
  }
  async function g(e, opts = {}) {
    let allowAi = opts.allowAi === !0,
      notifyAi = opts.notifyAi === !0,
      forceAi = opts.forceAi === !0,
      selectedNodeIds = Array.isArray(opts.selectedNodeIds)
        ? opts.selectedNodeIds
        : [],
      selectedOnly = opts.selectedOnly === !0;
    notifyAi && allowAi && qt(!0, "姝ｅ湪杩涜 AI 鍒嗘瀽鍒ゅ埆...");
    try {
      let r = await yt(e, { allowAi, forceAi, selectedNodeIds, selectedOnly });
      return (
        T({ type: "SESSION_UPDATED", session: r }),
        await Promise.all([L(r), k(r.id), K(r)]),
        r
      );
    } finally {
      notifyAi &&
        allowAi &&
        qt(!1, "AI 鍒嗘瀽瀹屾垚锛屾鍦ㄥ埛鏂板叧绯诲浘...");
    }
  }
  async function Kt(e, opts = {}) {
    let allowAi = opts.allowAi === !0;
    if (!e) return e;
    if (e.aiQualityLayer?.responseText) return e;
    let r = await yt(e, { allowAi });
    return (await Promise.all([L(r), k(r.id), K(r)]), r);
  }
  function ht(e) {
    try {
      let r = new URL(e || "").hostname.toLowerCase();
      return [
        "kimi.moonshot.cn",
        "www.kimi.com",
        "kimi.com",
        "kimi.ai",
      ].includes(r);
    } catch {
      return !1;
    }
  }
  async function F(e) {
    let r = [];
    try {
      r = await chrome.tabs.query({ active: !0, currentWindow: !0 });
    } catch {}
    let n = r.find((t) => t?.id && ht(t.url));
    if (!n) {
      let t = await chrome.tabs.query({
        url: [
          "https://kimi.moonshot.cn/*",
          "https://www.kimi.com/*",
          "https://kimi.com/*",
          "https://kimi.ai/*",
        ],
      });
      n = t.find((o) => o?.id);
    }
    if (!n?.id)
      return {
        ok: !1,
        error: "请先打开受支持的 Kimi 页面，再使用扩展侧边栏。",
      };
    try {
      return (
        (await chrome.tabs.sendMessage(n.id, e)) || {
          ok: !0,
          tabId: n.id,
          url: n.url,
        }
      );
    } catch (t) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId: n.id },
          files: ["content.js"],
        });
        await new Promise((o) => setTimeout(o, 120));
        return (
          (await chrome.tabs.sendMessage(n.id, e)) || {
            ok: !0,
            tabId: n.id,
            url: n.url,
            injected: !0,
          }
        );
      } catch (o) {
        return {
          ok: !1,
          error: "未能连接到 Kimi 页面内容脚本，请刷新 Kimi 页面后重试。",
        };
      }
    }
  }
  async function gt(e) {
    let r = [];
    try {
      r = await chrome.tabs.query({ active: !0, currentWindow: !0 });
    } catch {}
    let n = r.find((t) => t?.id && ht(t.url));
    if (!n) {
      let t = await chrome.tabs.query({
        url: [
          "https://kimi.moonshot.cn/*",
          "https://www.kimi.com/*",
          "https://kimi.com/*",
          "https://kimi.ai/*",
        ],
      });
      n = t.find((o) => o?.id);
    }
    if (!n?.id)
      return {
        ok: !1,
        error: "请先打开受支持的 Kimi 页面，再使用节点联动定位。",
      };
    let t = async () => {
      try {
        return await chrome.tabs.sendMessage(n.id, e);
      } catch {
        return null;
      }
    };
    let o = await t();
    if (o?.ok) return o;
    try {
      await chrome.scripting.executeScript({
        target: { tabId: n.id },
        files: ["content.js"],
      });
      await new Promise((s) => setTimeout(s, 120));
      o = await t();
      if (o?.ok) return o;
    } catch {}
    return {
      ok: !1,
      error: "未能定位到页面中的对应问答，请先刷新 Kimi 页面后重试。",
    };
  }
  chrome.action.onClicked.addListener(async (e) => {
    if (e?.id)
      try {
        await chrome.tabs.sendMessage(e.id, { type: "TOGGLE_FLOATING_PANEL" });
      } catch (r) {
        console.warn("\u5207\u6362\u4FA7\u8FB9\u680F\u5931\u8D25", r);
      }
  });
  chrome.runtime.onMessage.addListener(
    (e, r, n) => (
      (async () => {
        switch (e.type) {
          case "GET_CURRENT_SESSION": {
            n({ ok: !0, session: await S() });
            return;
          }
          case "GET_SESSIONS": {
            n({ ok: !0, sessions: await Z() });
            return;
          }
          case "CREATE_NEW_SESSION": {
            let t = W();
            (await L(t),
              await k(t.id),
              await K(t),
              T({ type: "SESSION_UPDATED", session: t }),
              T({
                type: "STATUS_UPDATE",
                status:
                  "\u5DF2\u521B\u5EFA\u65B0\u7684\u81EA\u52A8\u6293\u53D6\u4F1A\u8BDD\u3002",
              }),
              n({ ok: !0, session: t }));
            return;
          }
          case "RESET_STORAGE": {
            let t = await vt();
            n({ ok: !0, session: t });
            return;
          }
          case "FOCUS_NODE_IN_PAGE": {
            let t = await gt({
              type: "HIGHLIGHT_CAPTURED_MESSAGE",
              payload: e.payload || {},
            });
            (t.ok || T({ type: "STATUS_UPDATE", status: t.error }), n(t));
            return;
          }
          case "REQUEST_PAGE_SYNC": {
            let t = await F({ type: "CAPTURE_PAGE_MESSAGES" });
            (t.ok || T({ type: "STATUS_UPDATE", status: t.error }), n(t));
            return;
          }
          case "SYNC_PAGE_MESSAGES": {
            let t = await S(),
              o = Array.isArray(e.payload?.messages)
                ? e.payload.messages.filter((l) => l?.type && l?.content)
                : [],
              s = String(e.payload?.digest || "");
            if (
              t.snapshotDigest &&
              s &&
              t.snapshotDigest === s &&
              t.sourceUrl === (e.payload?.url || t.sourceUrl || "")
            ) {
              n({ ok: !0, session: t });
              return;
            }
            let i = await It(t, o, {
                url: e.payload?.url,
                pageTitle: e.payload?.pageTitle,
                digest: s,
              }),
              a = await g(i),
              c = a.nodes.filter(
                (l) => l.type === "question" && l.visible !== !1,
              ).length,
              d = a.nodes.filter((l) => l.type === "answer").length;
            (T({
              type: "STATUS_UPDATE",
              status:
                d || c
                  ? `\u5DF2\u81EA\u52A8\u6293\u53D6 ${c} \u4E2A\u63D0\u95EE\u3001${d} \u4E2A\u56DE\u7B54\u3002`
                  : "\u7B49\u5F85 Kimi \u9875\u9762\u4EA7\u751F\u65B0\u7684\u95EE\u7B54\u5185\u5BB9\u3002",
            }),
              n({ ok: !0, session: a }));
            return;
          }
          case "ASK_SUBMIT": {
            let t = String(e.payload?.prompt || "").trim();
            if (!t) {
              n({
                ok: !1,
                error: "\u63D0\u95EE\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\u3002",
              });
              return;
            }
            let o = await S(),
              s = o.nodes.filter((f) => f.type === "question"),
              i =
                o.nodes
                  .filter((f) => f.type === "question")
                  .sort((f, h) => new Date(f.createdAt) - new Date(h.createdAt))
                  .at(-1) || null,
              a =
                o.nodes
                  .filter((f) => f.type === "answer")
                  .sort((f, h) => new Date(f.createdAt) - new Date(h.createdAt))
                  .at(-1) || null,
              c = M(t, {
                questionNodes: o.nodes.filter((f) => f.type === "question"),
                previousQuestion: i,
                previousAnswer: a,
              }),
              d =
                c.patternType === u.REPEAT_CORRECTION
                  ? R(s, c.anchorQuestionId) || i
                  : null,
              l =
                c.patternType === u.INDEPENDENT
                  ? m()
                  : d?.conversationId || i?.conversationId || m(),
              y = {
                id: `q-${crypto.randomUUID()}`,
                messageKey: `manual-question-${Date.now()}`,
                type: "question",
                content: t,
                thumbnailText: A(t, 48),
                createdAt: new Date().toISOString(),
                position: { x: Q, y: w },
                tags: [],
                attachments: [],
                patternType: c.patternType,
                conversationId: l,
                anchorQuestionId:
                  c.patternType === u.REPEAT_CORRECTION
                    ? d?.anchorQuestionId || d?.id
                    : void 0,
                previousAnswerId:
                  c.patternType === u.PROGRESSIVE && a?.conversationId === l
                    ? a.id
                    : null,
                visible: c.visible,
              };
            ((y.anchorQuestionId = y.anchorQuestionId || y.id),
              o.nodes.push(y),
              c.patternType === u.PROGRESSIVE &&
                y.previousAnswerId &&
                N(o, P(y.previousAnswerId, y.id, u.PROGRESSIVE, "solid")));
            let E = await g(o),
              I = await F({
                type: "CONTENT_SUBMIT_PROMPT",
                payload: {
                  prompt: t,
                  questionId: y.id,
                  anchorQuestionId: y.anchorQuestionId,
                  relationType: y.patternType,
                },
              });
            (I.ok || T({ type: "STATUS_UPDATE", status: I.error }),
              n({ ok: !0, session: E, delivery: I }));
            return;
          }
          case "ANSWER_STREAM": {
            let t = await S(),
              {
                questionId: o,
                anchorQuestionId: s,
                content: i,
                relationType: a,
              } = e.payload || {},
              c = t.nodes.find((I) => I.type === "question" && I.id === o),
              d = t.nodes.find(
                (I) => I.type === "question" && I.id === (s || o),
              ),
              l = c?.conversationId || d?.conversationId || m(),
              y = d?.conversationId === l ? d.id : c?.id || s || o,
              E = t.nodes.find(
                (I) =>
                  I.type === "answer" &&
                  I.promptQuestionId === o &&
                  I.status === "streaming",
              );
            (E
              ? ((E.content = i),
                (E.thumbnailText = A(i, 72)),
                (E.conversationId = l))
              : ((E = {
                  id: `a-${crypto.randomUUID()}`,
                  messageKey: `manual-answer-${Date.now()}`,
                  type: "answer",
                  content: i,
                  thumbnailText: A(i, 72),
                  questionId: y,
                  promptQuestionId: o,
                  conversationId: l,
                  relationType: a || u.PROGRESSIVE,
                  createdAt: new Date().toISOString(),
                  position: { x: C, y: w },
                  tags: [],
                  baseScores: i ? D(i) : null,
                  quality: "medium",
                  scores: null,
                  status: "streaming",
                }),
                t.nodes.push(E),
                (c?.conversationId || d?.conversationId || l) ===
                  E.conversationId && N(t, P(y, E.id, E.relationType))),
              n({ ok: !0, session: await g(t) }));
            return;
          }
          case "NODE_ANNOTATE": {
            let t = await S(),
              o = t.nodes.find((s) => s.id === e.payload?.nodeId);
            if (!o) {
              n({
                ok: !1,
                error: "\u672A\u627E\u5230\u76EE\u6807\u8282\u70B9\u3002",
              });
              return;
            }
            ((o.tags = Array.from(
              new Set(
                [
                  ...(o.tags || []),
                  String(e.payload?.label || "").trim(),
                ].filter(Boolean),
              ),
            )),
              n({ ok: !0, session: await g(t) }));
            return;
          }
          case "NODE_SET_TAGS": {
            let t = await S(),
              o = t.nodes.find((s) => s.id === e.payload?.nodeId);
            if (!o) {
              n({
                ok: !1,
                error: "\u672A\u627E\u5230\u76EE\u6807\u8282\u70B9\u3002",
              });
              return;
            }
            ((o.tags = Array.isArray(e.payload?.tags)
              ? e.payload.tags
                  .map((s) => String(s || "").trim())
                  .filter(Boolean)
              : []),
              n({ ok: !0, session: await g(t) }));
            return;
          }
          case "RESTORE_SESSION": {
            let t = await J(e.payload?.sessionId);
            if (!t) {
              n({
                ok: !1,
                error:
                  "\u672A\u627E\u5230\u6240\u9009\u5386\u53F2\u4F1A\u8BDD\u3002",
              });
              return;
            }
            (await k(t.id),
              T({
                type: "STATUS_UPDATE",
                status: "\u5386\u53F2\u4F1A\u8BDD\u5DF2\u6062\u590D\u3002",
              }),
              n({ ok: !0, session: t }));
            return;
          }
          case "EXPORT_SESSION": {
            n({ ok: !0, payload: await S() });
            return;
          }
          case "RESET_LAYOUT": {
            let t = await S();
            n({
              ok: !0,
              session: await g(await Kt(t, { allowAi: !1 }), {
                allowAi: !1,
                notifyAi: !1,
              }),
            });
            return;
          }
          case "RUN_AI_ANALYSIS": {
            let t = await S();
            n({
              ok: !0,
              session: await g(t, {
                allowAi: !0,
                notifyAi: !0,
                forceAi: !0,
              }),
            });
            return;
          }
          case "RUN_AI_ANALYSIS_SELECTED": {
            let t = await S(),
              o = Array.isArray(e.payload?.nodeIds)
                ? e.payload.nodeIds
                    .map((s) => String(s || "").trim())
                    .filter(Boolean)
                : [];
            if (!o.length) {
              n({ ok: !1, error: "请先圈选节点后再执行分析。" });
              return;
            }
            n({
              ok: !0,
              session: await g(t, {
                allowAi: !0,
                notifyAi: !0,
                forceAi: !0,
                selectedNodeIds: o,
                selectedOnly: !0,
              }),
            });
            return;
          }
          default:
            n({
              ok: !1,
              error: `\u672A\u77E5\u6D88\u606F\u7C7B\u578B\uFF1A${e.type}`,
            });
        }
      })().catch((t) => {
        (console.error(t),
          n({
            ok: !1,
            error:
              t?.message ||
              "\u540E\u53F0\u811A\u672C\u53D1\u751F\u672A\u9884\u671F\u9519\u8BEF\u3002",
          }));
      }),
      !0
    ),
  );
})();


