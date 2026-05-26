(() => {
  var $h = Object.create;
  var oa = Object.defineProperty;
  var Uh = Object.getOwnPropertyDescriptor;
  var Vh = Object.getOwnPropertyNames;
  var Bh = Object.getPrototypeOf,
    Hh = Object.prototype.hasOwnProperty;
  var Jt = (e, t) => () => (
    t || e((t = { exports: {} }).exports, t),
    t.exports
  );
  var jh = (e, t, n, r) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let i of Vh(t))
        !Hh.call(e, i) &&
          i !== n &&
          oa(e, i, {
            get: () => t[i],
            enumerable: !(r = Uh(t, i)) || r.enumerable,
          });
    return e;
  };
  var la = (e, t, n) => (
    (n = e != null ? $h(Bh(e)) : {}),
    jh(
      t || !e || !e.__esModule
        ? oa(n, "default", { value: e, enumerable: !0 })
        : n,
      e,
    )
  );
  var ga = Jt((A) => {
    "use strict";
    var tr = Symbol.for("react.element"),
      Qh = Symbol.for("react.portal"),
      Wh = Symbol.for("react.fragment"),
      Xh = Symbol.for("react.strict_mode"),
      Yh = Symbol.for("react.profiler"),
      Kh = Symbol.for("react.provider"),
      qh = Symbol.for("react.context"),
      Gh = Symbol.for("react.forward_ref"),
      Zh = Symbol.for("react.suspense"),
      Jh = Symbol.for("react.memo"),
      bh = Symbol.for("react.lazy"),
      ua = Symbol.iterator;
    function em(e) {
      return e === null || typeof e != "object"
        ? null
        : ((e = (ua && e[ua]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
    }
    var ca = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      fa = Object.assign,
      da = {};
    function xn(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = da),
        (this.updater = n || ca));
    }
    xn.prototype.isReactComponent = {};
    xn.prototype.setState = function (e, t) {
      if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, e, t, "setState");
    };
    xn.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function pa() {}
    pa.prototype = xn.prototype;
    function pl(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = da),
        (this.updater = n || ca));
    }
    var hl = (pl.prototype = new pa());
    hl.constructor = pl;
    fa(hl, xn.prototype);
    hl.isPureReactComponent = !0;
    var sa = Array.isArray,
      ha = Object.prototype.hasOwnProperty,
      ml = { current: null },
      ma = { key: !0, ref: !0, __self: !0, __source: !0 };
    function va(e, t, n) {
      var r,
        i = {},
        o = null,
        l = null;
      if (t != null)
        for (r in (t.ref !== void 0 && (l = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t))
          ha.call(t, r) && !ma.hasOwnProperty(r) && (i[r] = t[r]);
      var u = arguments.length - 2;
      if (u === 1) i.children = n;
      else if (1 < u) {
        for (var s = Array(u), a = 0; a < u; a++) s[a] = arguments[a + 2];
        i.children = s;
      }
      if (e && e.defaultProps)
        for (r in ((u = e.defaultProps), u)) i[r] === void 0 && (i[r] = u[r]);
      return {
        $$typeof: tr,
        type: e,
        key: o,
        ref: l,
        props: i,
        _owner: ml.current,
      };
    }
    function tm(e, t) {
      return {
        $$typeof: tr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function vl(e) {
      return typeof e == "object" && e !== null && e.$$typeof === tr;
    }
    function nm(e) {
      var t = { "=": "=0", ":": "=2" };
      return (
        "$" +
        e.replace(/[=:]/g, function (n) {
          return t[n];
        })
      );
    }
    var aa = /\/+/g;
    function dl(e, t) {
      return typeof e == "object" && e !== null && e.key != null
        ? nm("" + e.key)
        : t.toString(36);
    }
    function ci(e, t, n, r, i) {
      var o = typeof e;
      (o === "undefined" || o === "boolean") && (e = null);
      var l = !1;
      if (e === null) l = !0;
      else
        switch (o) {
          case "string":
          case "number":
            l = !0;
            break;
          case "object":
            switch (e.$$typeof) {
              case tr:
              case Qh:
                l = !0;
            }
        }
      if (l)
        return (
          (l = e),
          (i = i(l)),
          (e = r === "" ? "." + dl(l, 0) : r),
          sa(i)
            ? ((n = ""),
              e != null && (n = e.replace(aa, "$&/") + "/"),
              ci(i, t, n, "", function (a) {
                return a;
              }))
            : i != null &&
              (vl(i) &&
                (i = tm(
                  i,
                  n +
                    (!i.key || (l && l.key === i.key)
                      ? ""
                      : ("" + i.key).replace(aa, "$&/") + "/") +
                    e,
                )),
              t.push(i)),
          1
        );
      if (((l = 0), (r = r === "" ? "." : r + ":"), sa(e)))
        for (var u = 0; u < e.length; u++) {
          o = e[u];
          var s = r + dl(o, u);
          l += ci(o, t, n, s, i);
        }
      else if (((s = em(e)), typeof s == "function"))
        for (e = s.call(e), u = 0; !(o = e.next()).done; )
          ((o = o.value), (s = r + dl(o, u++)), (l += ci(o, t, n, s, i)));
      else if (o === "object")
        throw (
          (t = String(e)),
          Error(
            "Objects are not valid as a React child (found: " +
              (t === "[object Object]"
                ? "object with keys {" + Object.keys(e).join(", ") + "}"
                : t) +
              "). If you meant to render a collection of children, use an array instead.",
          )
        );
      return l;
    }
    function ai(e, t, n) {
      if (e == null) return e;
      var r = [],
        i = 0;
      return (
        ci(e, r, "", "", function (o) {
          return t.call(n, o, i++);
        }),
        r
      );
    }
    function rm(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()),
          t.then(
            function (n) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 1), (e._result = n));
            },
            function (n) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 2), (e._result = n));
            },
          ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var ye = { current: null },
      fi = { transition: null },
      im = {
        ReactCurrentDispatcher: ye,
        ReactCurrentBatchConfig: fi,
        ReactCurrentOwner: ml,
      };
    function ya() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    A.Children = {
      map: ai,
      forEach: function (e, t, n) {
        ai(
          e,
          function () {
            t.apply(this, arguments);
          },
          n,
        );
      },
      count: function (e) {
        var t = 0;
        return (
          ai(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          ai(e, function (t) {
            return t;
          }) || []
        );
      },
      only: function (e) {
        if (!vl(e))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return e;
      },
    };
    A.Component = xn;
    A.Fragment = Wh;
    A.Profiler = Yh;
    A.PureComponent = pl;
    A.StrictMode = Xh;
    A.Suspense = Zh;
    A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = im;
    A.act = ya;
    A.cloneElement = function (e, t, n) {
      if (e == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            e +
            ".",
        );
      var r = fa({}, e.props),
        i = e.key,
        o = e.ref,
        l = e._owner;
      if (t != null) {
        if (
          (t.ref !== void 0 && ((o = t.ref), (l = ml.current)),
          t.key !== void 0 && (i = "" + t.key),
          e.type && e.type.defaultProps)
        )
          var u = e.type.defaultProps;
        for (s in t)
          ha.call(t, s) &&
            !ma.hasOwnProperty(s) &&
            (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
      }
      var s = arguments.length - 2;
      if (s === 1) r.children = n;
      else if (1 < s) {
        u = Array(s);
        for (var a = 0; a < s; a++) u[a] = arguments[a + 2];
        r.children = u;
      }
      return {
        $$typeof: tr,
        type: e.type,
        key: i,
        ref: o,
        props: r,
        _owner: l,
      };
    };
    A.createContext = function (e) {
      return (
        (e = {
          $$typeof: qh,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (e.Provider = { $$typeof: Kh, _context: e }),
        (e.Consumer = e)
      );
    };
    A.createElement = va;
    A.createFactory = function (e) {
      var t = va.bind(null, e);
      return ((t.type = e), t);
    };
    A.createRef = function () {
      return { current: null };
    };
    A.forwardRef = function (e) {
      return { $$typeof: Gh, render: e };
    };
    A.isValidElement = vl;
    A.lazy = function (e) {
      return { $$typeof: bh, _payload: { _status: -1, _result: e }, _init: rm };
    };
    A.memo = function (e, t) {
      return { $$typeof: Jh, type: e, compare: t === void 0 ? null : t };
    };
    A.startTransition = function (e) {
      var t = fi.transition;
      fi.transition = {};
      try {
        e();
      } finally {
        fi.transition = t;
      }
    };
    A.unstable_act = ya;
    A.useCallback = function (e, t) {
      return ye.current.useCallback(e, t);
    };
    A.useContext = function (e) {
      return ye.current.useContext(e);
    };
    A.useDebugValue = function () {};
    A.useDeferredValue = function (e) {
      return ye.current.useDeferredValue(e);
    };
    A.useEffect = function (e, t) {
      return ye.current.useEffect(e, t);
    };
    A.useId = function () {
      return ye.current.useId();
    };
    A.useImperativeHandle = function (e, t, n) {
      return ye.current.useImperativeHandle(e, t, n);
    };
    A.useInsertionEffect = function (e, t) {
      return ye.current.useInsertionEffect(e, t);
    };
    A.useLayoutEffect = function (e, t) {
      return ye.current.useLayoutEffect(e, t);
    };
    A.useMemo = function (e, t) {
      return ye.current.useMemo(e, t);
    };
    A.useReducer = function (e, t, n) {
      return ye.current.useReducer(e, t, n);
    };
    A.useRef = function (e) {
      return ye.current.useRef(e);
    };
    A.useState = function (e) {
      return ye.current.useState(e);
    };
    A.useSyncExternalStore = function (e, t, n) {
      return ye.current.useSyncExternalStore(e, t, n);
    };
    A.useTransition = function () {
      return ye.current.useTransition();
    };
    A.version = "18.3.1";
  });
  var yl = Jt((Pg, wa) => {
    "use strict";
    wa.exports = ga();
  });
  var Pa = Jt((B) => {
    "use strict";
    function _l(e, t) {
      var n = e.length;
      e.push(t);
      e: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          i = e[r];
        if (0 < di(i, t)) ((e[r] = t), (e[n] = i), (n = r));
        else break e;
      }
    }
    function Xe(e) {
      return e.length === 0 ? null : e[0];
    }
    function hi(e) {
      if (e.length === 0) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        e: for (var r = 0, i = e.length, o = i >>> 1; r < o; ) {
          var l = 2 * (r + 1) - 1,
            u = e[l],
            s = l + 1,
            a = e[s];
          if (0 > di(u, n))
            s < i && 0 > di(a, u)
              ? ((e[r] = a), (e[s] = n), (r = s))
              : ((e[r] = u), (e[l] = n), (r = l));
          else if (s < i && 0 > di(a, n)) ((e[r] = a), (e[s] = n), (r = s));
          else break e;
        }
      }
      return t;
    }
    function di(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n !== 0 ? n : e.id - t.id;
    }
    typeof performance == "object" && typeof performance.now == "function"
      ? ((xa = performance),
        (B.unstable_now = function () {
          return xa.now();
        }))
      : ((gl = Date),
        (_a = gl.now()),
        (B.unstable_now = function () {
          return gl.now() - _a;
        }));
    var xa,
      gl,
      _a,
      rt = [],
      Tt = [],
      om = 1,
      Fe = null,
      de = 3,
      mi = !1,
      bt = !1,
      rr = !1,
      Ea = typeof setTimeout == "function" ? setTimeout : null,
      Na = typeof clearTimeout == "function" ? clearTimeout : null,
      Sa = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Sl(e) {
      for (var t = Xe(Tt); t !== null; ) {
        if (t.callback === null) hi(Tt);
        else if (t.startTime <= e)
          (hi(Tt), (t.sortIndex = t.expirationTime), _l(rt, t));
        else break;
        t = Xe(Tt);
      }
    }
    function kl(e) {
      if (((rr = !1), Sl(e), !bt))
        if (Xe(rt) !== null) ((bt = !0), Nl(El));
        else {
          var t = Xe(Tt);
          t !== null && Cl(kl, t.startTime - e);
        }
    }
    function El(e, t) {
      ((bt = !1), rr && ((rr = !1), Na(ir), (ir = -1)), (mi = !0));
      var n = de;
      try {
        for (
          Sl(t), Fe = Xe(rt);
          Fe !== null && (!(Fe.expirationTime > t) || (e && !za()));
        ) {
          var r = Fe.callback;
          if (typeof r == "function") {
            ((Fe.callback = null), (de = Fe.priorityLevel));
            var i = r(Fe.expirationTime <= t);
            ((t = B.unstable_now()),
              typeof i == "function"
                ? (Fe.callback = i)
                : Fe === Xe(rt) && hi(rt),
              Sl(t));
          } else hi(rt);
          Fe = Xe(rt);
        }
        if (Fe !== null) var o = !0;
        else {
          var l = Xe(Tt);
          (l !== null && Cl(kl, l.startTime - t), (o = !1));
        }
        return o;
      } finally {
        ((Fe = null), (de = n), (mi = !1));
      }
    }
    var vi = !1,
      pi = null,
      ir = -1,
      Ca = 5,
      Ta = -1;
    function za() {
      return !(B.unstable_now() - Ta < Ca);
    }
    function wl() {
      if (pi !== null) {
        var e = B.unstable_now();
        Ta = e;
        var t = !0;
        try {
          t = pi(!0, e);
        } finally {
          t ? nr() : ((vi = !1), (pi = null));
        }
      } else vi = !1;
    }
    var nr;
    typeof Sa == "function"
      ? (nr = function () {
          Sa(wl);
        })
      : typeof MessageChannel < "u"
        ? ((xl = new MessageChannel()),
          (ka = xl.port2),
          (xl.port1.onmessage = wl),
          (nr = function () {
            ka.postMessage(null);
          }))
        : (nr = function () {
            Ea(wl, 0);
          });
    var xl, ka;
    function Nl(e) {
      ((pi = e), vi || ((vi = !0), nr()));
    }
    function Cl(e, t) {
      ir = Ea(function () {
        e(B.unstable_now());
      }, t);
    }
    B.unstable_IdlePriority = 5;
    B.unstable_ImmediatePriority = 1;
    B.unstable_LowPriority = 4;
    B.unstable_NormalPriority = 3;
    B.unstable_Profiling = null;
    B.unstable_UserBlockingPriority = 2;
    B.unstable_cancelCallback = function (e) {
      e.callback = null;
    };
    B.unstable_continueExecution = function () {
      bt || mi || ((bt = !0), Nl(El));
    };
    B.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (Ca = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    B.unstable_getCurrentPriorityLevel = function () {
      return de;
    };
    B.unstable_getFirstCallbackNode = function () {
      return Xe(rt);
    };
    B.unstable_next = function (e) {
      switch (de) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = de;
      }
      var n = de;
      de = t;
      try {
        return e();
      } finally {
        de = n;
      }
    };
    B.unstable_pauseExecution = function () {};
    B.unstable_requestPaint = function () {};
    B.unstable_runWithPriority = function (e, t) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e = 3;
      }
      var n = de;
      de = e;
      try {
        return t();
      } finally {
        de = n;
      }
    };
    B.unstable_scheduleCallback = function (e, t, n) {
      var r = B.unstable_now();
      switch (
        (typeof n == "object" && n !== null
          ? ((n = n.delay), (n = typeof n == "number" && 0 < n ? r + n : r))
          : (n = r),
        e)
      ) {
        case 1:
          var i = -1;
          break;
        case 2:
          i = 250;
          break;
        case 5:
          i = 1073741823;
          break;
        case 4:
          i = 1e4;
          break;
        default:
          i = 5e3;
      }
      return (
        (i = n + i),
        (e = {
          id: om++,
          callback: t,
          priorityLevel: e,
          startTime: n,
          expirationTime: i,
          sortIndex: -1,
        }),
        n > r
          ? ((e.sortIndex = n),
            _l(Tt, e),
            Xe(rt) === null &&
              e === Xe(Tt) &&
              (rr ? (Na(ir), (ir = -1)) : (rr = !0), Cl(kl, n - r)))
          : ((e.sortIndex = i), _l(rt, e), bt || mi || ((bt = !0), Nl(El))),
        e
      );
    };
    B.unstable_shouldYield = za;
    B.unstable_wrapCallback = function (e) {
      var t = de;
      return function () {
        var n = de;
        de = t;
        try {
          return e.apply(this, arguments);
        } finally {
          de = n;
        }
      };
    };
  });
  var Oa = Jt((Og, Ma) => {
    "use strict";
    Ma.exports = Pa();
  });
  var Fd = Jt((De) => {
    "use strict";
    var lm = yl(),
      Ie = Oa();
    function S(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    var $c = new Set(),
      Cr = {};
    function pn(e, t) {
      (Bn(e, t), Bn(e + "Capture", t));
    }
    function Bn(e, t) {
      for (Cr[e] = t, e = 0; e < t.length; e++) $c.add(t[e]);
    }
    var yt = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      ql = Object.prototype.hasOwnProperty,
      um =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      Ia = {},
      La = {};
    function sm(e) {
      return ql.call(La, e)
        ? !0
        : ql.call(Ia, e)
          ? !1
          : um.test(e)
            ? (La[e] = !0)
            : ((Ia[e] = !0), !1);
    }
    function am(e, t, n, r) {
      if (n !== null && n.type === 0) return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean":
          return r
            ? !1
            : n !== null
              ? !n.acceptsBooleans
              : ((e = e.toLowerCase().slice(0, 5)),
                e !== "data-" && e !== "aria-");
        default:
          return !1;
      }
    }
    function cm(e, t, n, r) {
      if (t === null || typeof t > "u" || am(e, t, n, r)) return !0;
      if (r) return !1;
      if (n !== null)
        switch (n.type) {
          case 3:
            return !t;
          case 4:
            return t === !1;
          case 5:
            return isNaN(t);
          case 6:
            return isNaN(t) || 1 > t;
        }
      return !1;
    }
    function xe(e, t, n, r, i, o, l) {
      ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o),
        (this.removeEmptyString = l));
    }
    var ce = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (e) {
        ce[e] = new xe(e, 0, !1, e, null, !1, !1);
      });
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      ce[t] = new xe(t, 1, !1, e[1], null, !1, !1);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        ce[e] = new xe(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    );
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      ce[e] = new xe(e, 2, !1, e, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        ce[e] = new xe(e, 3, !1, e.toLowerCase(), null, !1, !1);
      });
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      ce[e] = new xe(e, 3, !0, e, null, !1, !1);
    });
    ["capture", "download"].forEach(function (e) {
      ce[e] = new xe(e, 4, !1, e, null, !1, !1);
    });
    ["cols", "rows", "size", "span"].forEach(function (e) {
      ce[e] = new xe(e, 6, !1, e, null, !1, !1);
    });
    ["rowSpan", "start"].forEach(function (e) {
      ce[e] = new xe(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var Bu = /[\-:]([a-z])/g;
    function Hu(e) {
      return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Bu, Hu);
        ce[t] = new xe(t, 1, !1, e, null, !1, !1);
      });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Bu, Hu);
        ce[t] = new xe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      });
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(Bu, Hu);
      ce[t] = new xe(
        t,
        1,
        !1,
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        !1,
      );
    });
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      ce[e] = new xe(e, 1, !1, e.toLowerCase(), null, !1, !1);
    });
    ce.xlinkHref = new xe(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    );
    ["src", "href", "action", "formAction"].forEach(function (e) {
      ce[e] = new xe(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function ju(e, t, n, r) {
      var i = ce.hasOwnProperty(t) ? ce[t] : null;
      (i !== null
        ? i.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (cm(t, n, i, r) && (n = null),
        r || i === null
          ? sm(t) &&
            (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
          : i.mustUseProperty
            ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
            : ((t = i.attributeName),
              (r = i.attributeNamespace),
              n === null
                ? e.removeAttribute(t)
                : ((i = i.type),
                  (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
                  r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    var _t = lm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      yi = Symbol.for("react.element"),
      kn = Symbol.for("react.portal"),
      En = Symbol.for("react.fragment"),
      Qu = Symbol.for("react.strict_mode"),
      Gl = Symbol.for("react.profiler"),
      Uc = Symbol.for("react.provider"),
      Vc = Symbol.for("react.context"),
      Wu = Symbol.for("react.forward_ref"),
      Zl = Symbol.for("react.suspense"),
      Jl = Symbol.for("react.suspense_list"),
      Xu = Symbol.for("react.memo"),
      Pt = Symbol.for("react.lazy"),
      Bc = Symbol.for("react.offscreen"),
      Da = Symbol.iterator;
    function or(e) {
      return e === null || typeof e != "object"
        ? null
        : ((e = (Da && e[Da]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
    }
    var q = Object.assign,
      Tl;
    function pr(e) {
      if (Tl === void 0)
        try {
          throw Error();
        } catch (n) {
          var t = n.stack.trim().match(/\n( *(at )?)/);
          Tl = (t && t[1]) || "";
        }
      return (
        `
` +
        Tl +
        e
      );
    }
    var zl = !1;
    function Pl(e, t) {
      if (!e || zl) return "";
      zl = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t)
          if (
            ((t = function () {
              throw Error();
            }),
            Object.defineProperty(t.prototype, "props", {
              set: function () {
                throw Error();
              },
            }),
            typeof Reflect == "object" && Reflect.construct)
          ) {
            try {
              Reflect.construct(t, []);
            } catch (a) {
              var r = a;
            }
            Reflect.construct(e, [], t);
          } else {
            try {
              t.call();
            } catch (a) {
              r = a;
            }
            e.call(t.prototype);
          }
        else {
          try {
            throw Error();
          } catch (a) {
            r = a;
          }
          e();
        }
      } catch (a) {
        if (a && r && typeof a.stack == "string") {
          for (
            var i = a.stack.split(`
`),
              o = r.stack.split(`
`),
              l = i.length - 1,
              u = o.length - 1;
            1 <= l && 0 <= u && i[l] !== o[u];
          )
            u--;
          for (; 1 <= l && 0 <= u; l--, u--)
            if (i[l] !== o[u]) {
              if (l !== 1 || u !== 1)
                do
                  if ((l--, u--, 0 > u || i[l] !== o[u])) {
                    var s =
                      `
` + i[l].replace(" at new ", " at ");
                    return (
                      e.displayName &&
                        s.includes("<anonymous>") &&
                        (s = s.replace("<anonymous>", e.displayName)),
                      s
                    );
                  }
                while (1 <= l && 0 <= u);
              break;
            }
        }
      } finally {
        ((zl = !1), (Error.prepareStackTrace = n));
      }
      return (e = e ? e.displayName || e.name : "") ? pr(e) : "";
    }
    function fm(e) {
      switch (e.tag) {
        case 5:
          return pr(e.type);
        case 16:
          return pr("Lazy");
        case 13:
          return pr("Suspense");
        case 19:
          return pr("SuspenseList");
        case 0:
        case 2:
        case 15:
          return ((e = Pl(e.type, !1)), e);
        case 11:
          return ((e = Pl(e.type.render, !1)), e);
        case 1:
          return ((e = Pl(e.type, !0)), e);
        default:
          return "";
      }
    }
    function bl(e) {
      if (e == null) return null;
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case En:
          return "Fragment";
        case kn:
          return "Portal";
        case Gl:
          return "Profiler";
        case Qu:
          return "StrictMode";
        case Zl:
          return "Suspense";
        case Jl:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Vc:
            return (e.displayName || "Context") + ".Consumer";
          case Uc:
            return (e._context.displayName || "Context") + ".Provider";
          case Wu:
            var t = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = t.displayName || t.name || ""),
                (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
              e
            );
          case Xu:
            return (
              (t = e.displayName || null),
              t !== null ? t : bl(e.type) || "Memo"
            );
          case Pt:
            ((t = e._payload), (e = e._init));
            try {
              return bl(e(t));
            } catch {}
        }
      return null;
    }
    function dm(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return "Cache";
        case 9:
          return (t.displayName || "Context") + ".Consumer";
        case 10:
          return (t._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return (
            (e = t.render),
            (e = e.displayName || e.name || ""),
            t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
          );
        case 7:
          return "Fragment";
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return bl(t);
        case 8:
          return t === Qu ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof t == "function") return t.displayName || t.name || null;
          if (typeof t == "string") return t;
      }
      return null;
    }
    function jt(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return e;
        default:
          return "";
      }
    }
    function Hc(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
      );
    }
    function pm(e) {
      var t = Hc(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
      if (
        !e.hasOwnProperty(t) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
      ) {
        var i = n.get,
          o = n.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this);
            },
            set: function (l) {
              ((r = "" + l), o.call(this, l));
            },
          }),
          Object.defineProperty(e, t, { enumerable: n.enumerable }),
          {
            getValue: function () {
              return r;
            },
            setValue: function (l) {
              r = "" + l;
            },
            stopTracking: function () {
              ((e._valueTracker = null), delete e[t]);
            },
          }
        );
      }
    }
    function gi(e) {
      e._valueTracker || (e._valueTracker = pm(e));
    }
    function jc(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = "";
      return (
        e && (r = Hc(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
      );
    }
    function Xi(e) {
      if (
        ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function eu(e, t) {
      var n = t.checked;
      return q({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
      });
    }
    function Aa(e, t) {
      var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
      ((n = jt(t.value != null ? t.value : n)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            t.type === "checkbox" || t.type === "radio"
              ? t.checked != null
              : t.value != null,
        }));
    }
    function Qc(e, t) {
      ((t = t.checked), t != null && ju(e, "checked", t, !1));
    }
    function tu(e, t) {
      Qc(e, t);
      var n = jt(t.value),
        r = t.type;
      if (n != null)
        r === "number"
          ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
          : e.value !== "" + n && (e.value = "" + n);
      else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return;
      }
      (t.hasOwnProperty("value")
        ? nu(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && nu(e, t.type, jt(t.defaultValue)),
        t.checked == null &&
          t.defaultChecked != null &&
          (e.defaultChecked = !!t.defaultChecked));
    }
    function Fa(e, t, n) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
          !(
            (r !== "submit" && r !== "reset") ||
            (t.value !== void 0 && t.value !== null)
          )
        )
          return;
        ((t = "" + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t));
      }
      ((n = e.name),
        n !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== "" && (e.name = n));
    }
    function nu(e, t, n) {
      (t !== "number" || Xi(e.ownerDocument) !== e) &&
        (n == null
          ? (e.defaultValue = "" + e._wrapperState.initialValue)
          : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
    }
    var hr = Array.isArray;
    function An(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
          ((i = t.hasOwnProperty("$" + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0));
      } else {
        for (n = "" + jt(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n) {
            ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
            return;
          }
          t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function ru(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(S(91));
      return q({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
      });
    }
    function Ra(e, t) {
      var n = t.value;
      if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
          if (t != null) throw Error(S(92));
          if (hr(n)) {
            if (1 < n.length) throw Error(S(93));
            n = n[0];
          }
          t = n;
        }
        (t == null && (t = ""), (n = t));
      }
      e._wrapperState = { initialValue: jt(n) };
    }
    function Wc(e, t) {
      var n = jt(t.value),
        r = jt(t.defaultValue);
      (n != null &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r));
    }
    function $a(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
    }
    function Xc(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function iu(e, t) {
      return e == null || e === "http://www.w3.org/1999/xhtml"
        ? Xc(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
          ? "http://www.w3.org/1999/xhtml"
          : e;
    }
    var wi,
      Yc = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, i) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n, r, i);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
          e.innerHTML = t;
        else {
          for (
            wi = wi || document.createElement("div"),
              wi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
              t = wi.firstChild;
            e.firstChild;
          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function Tr(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var yr = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      hm = ["Webkit", "ms", "Moz", "O"];
    Object.keys(yr).forEach(function (e) {
      hm.forEach(function (t) {
        ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (yr[t] = yr[e]));
      });
    });
    function Kc(e, t, n) {
      return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n ||
            typeof t != "number" ||
            t === 0 ||
            (yr.hasOwnProperty(e) && yr[e])
          ? ("" + t).trim()
          : t + "px";
    }
    function qc(e, t) {
      e = e.style;
      for (var n in t)
        if (t.hasOwnProperty(n)) {
          var r = n.indexOf("--") === 0,
            i = Kc(n, t[n], r);
          (n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, i) : (e[n] = i));
        }
    }
    var mm = q(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      },
    );
    function ou(e, t) {
      if (t) {
        if (mm[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw Error(S(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(S(60));
          if (
            typeof t.dangerouslySetInnerHTML != "object" ||
            !("__html" in t.dangerouslySetInnerHTML)
          )
            throw Error(S(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(S(62));
      }
    }
    function lu(e, t) {
      if (e.indexOf("-") === -1) return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var uu = null;
    function Yu(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var su = null,
      Fn = null,
      Rn = null;
    function Ua(e) {
      if ((e = Wr(e))) {
        if (typeof su != "function") throw Error(S(280));
        var t = e.stateNode;
        t && ((t = _o(t)), su(e.stateNode, e.type, t));
      }
    }
    function Gc(e) {
      Fn ? (Rn ? Rn.push(e) : (Rn = [e])) : (Fn = e);
    }
    function Zc() {
      if (Fn) {
        var e = Fn,
          t = Rn;
        if (((Rn = Fn = null), Ua(e), t))
          for (e = 0; e < t.length; e++) Ua(t[e]);
      }
    }
    function Jc(e, t) {
      return e(t);
    }
    function bc() {}
    var Ml = !1;
    function ef(e, t, n) {
      if (Ml) return e(t, n);
      Ml = !0;
      try {
        return Jc(e, t, n);
      } finally {
        ((Ml = !1), (Fn !== null || Rn !== null) && (bc(), Zc()));
      }
    }
    function zr(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var r = _o(n);
      if (r === null) return null;
      n = r[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          ((r = !r.disabled) ||
            ((e = e.type),
            (r = !(
              e === "button" ||
              e === "input" ||
              e === "select" ||
              e === "textarea"
            ))),
            (e = !r));
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != "function") throw Error(S(231, t, typeof n));
      return n;
    }
    var au = !1;
    if (yt)
      try {
        ((_n = {}),
          Object.defineProperty(_n, "passive", {
            get: function () {
              au = !0;
            },
          }),
          window.addEventListener("test", _n, _n),
          window.removeEventListener("test", _n, _n));
      } catch {
        au = !1;
      }
    var _n;
    function vm(e, t, n, r, i, o, l, u, s) {
      var a = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, a);
      } catch (d) {
        this.onError(d);
      }
    }
    var gr = !1,
      Yi = null,
      Ki = !1,
      cu = null,
      ym = {
        onError: function (e) {
          ((gr = !0), (Yi = e));
        },
      };
    function gm(e, t, n, r, i, o, l, u, s) {
      ((gr = !1), (Yi = null), vm.apply(ym, arguments));
    }
    function wm(e, t, n, r, i, o, l, u, s) {
      if ((gm.apply(this, arguments), gr)) {
        if (gr) {
          var a = Yi;
          ((gr = !1), (Yi = null));
        } else throw Error(S(198));
        Ki || ((Ki = !0), (cu = a));
      }
    }
    function hn(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function tf(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (
          (t === null &&
            ((e = e.alternate), e !== null && (t = e.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function Va(e) {
      if (hn(e) !== e) throw Error(S(188));
    }
    function xm(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = hn(e)), t === null)) throw Error(S(188));
        return t !== e ? null : e;
      }
      for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null) break;
        var o = i.alternate;
        if (o === null) {
          if (((r = i.return), r !== null)) {
            n = r;
            continue;
          }
          break;
        }
        if (i.child === o.child) {
          for (o = i.child; o; ) {
            if (o === n) return (Va(i), e);
            if (o === r) return (Va(i), t);
            o = o.sibling;
          }
          throw Error(S(188));
        }
        if (n.return !== r.return) ((n = i), (r = o));
        else {
          for (var l = !1, u = i.child; u; ) {
            if (u === n) {
              ((l = !0), (n = i), (r = o));
              break;
            }
            if (u === r) {
              ((l = !0), (r = i), (n = o));
              break;
            }
            u = u.sibling;
          }
          if (!l) {
            for (u = o.child; u; ) {
              if (u === n) {
                ((l = !0), (n = o), (r = i));
                break;
              }
              if (u === r) {
                ((l = !0), (r = o), (n = i));
                break;
              }
              u = u.sibling;
            }
            if (!l) throw Error(S(189));
          }
        }
        if (n.alternate !== r) throw Error(S(190));
      }
      if (n.tag !== 3) throw Error(S(188));
      return n.stateNode.current === n ? e : t;
    }
    function nf(e) {
      return ((e = xm(e)), e !== null ? rf(e) : null);
    }
    function rf(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = rf(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var of = Ie.unstable_scheduleCallback,
      Ba = Ie.unstable_cancelCallback,
      _m = Ie.unstable_shouldYield,
      Sm = Ie.unstable_requestPaint,
      ee = Ie.unstable_now,
      km = Ie.unstable_getCurrentPriorityLevel,
      Ku = Ie.unstable_ImmediatePriority,
      lf = Ie.unstable_UserBlockingPriority,
      qi = Ie.unstable_NormalPriority,
      Em = Ie.unstable_LowPriority,
      uf = Ie.unstable_IdlePriority,
      yo = null,
      ut = null;
    function Nm(e) {
      if (ut && typeof ut.onCommitFiberRoot == "function")
        try {
          ut.onCommitFiberRoot(yo, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
    }
    var Ze = Math.clz32 ? Math.clz32 : zm,
      Cm = Math.log,
      Tm = Math.LN2;
    function zm(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((Cm(e) / Tm) | 0)) | 0);
    }
    var xi = 64,
      _i = 4194304;
    function mr(e) {
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return e & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return e;
      }
    }
    function Gi(e, t) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var r = 0,
        i = e.suspendedLanes,
        o = e.pingedLanes,
        l = n & 268435455;
      if (l !== 0) {
        var u = l & ~i;
        u !== 0 ? (r = mr(u)) : ((o &= l), o !== 0 && (r = mr(o)));
      } else ((l = n & ~i), l !== 0 ? (r = mr(l)) : o !== 0 && (r = mr(o)));
      if (r === 0) return 0;
      if (
        t !== 0 &&
        t !== r &&
        (t & i) === 0 &&
        ((i = r & -r),
        (o = t & -t),
        i >= o || (i === 16 && (o & 4194240) !== 0))
      )
        return t;
      if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
          ((n = 31 - Ze(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
      return r;
    }
    function Pm(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
          return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Mm(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          i = e.expirationTimes,
          o = e.pendingLanes;
        0 < o;
      ) {
        var l = 31 - Ze(o),
          u = 1 << l,
          s = i[l];
        (s === -1
          ? ((u & n) === 0 || (u & r) !== 0) && (i[l] = Pm(u, t))
          : s <= t && (e.expiredLanes |= u),
          (o &= ~u));
      }
    }
    function fu(e) {
      return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
      );
    }
    function sf() {
      var e = xi;
      return ((xi <<= 1), (xi & 4194240) === 0 && (xi = 64), e);
    }
    function Ol(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function jr(e, t, n) {
      ((e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - Ze(t)),
        (e[t] = n));
    }
    function Om(e, t) {
      var n = e.pendingLanes & ~t;
      ((e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements));
      var r = e.eventTimes;
      for (e = e.expirationTimes; 0 < n; ) {
        var i = 31 - Ze(n),
          o = 1 << i;
        ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~o));
      }
    }
    function qu(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var r = 31 - Ze(n),
          i = 1 << r;
        ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
      }
    }
    var U = 0;
    function af(e) {
      return (
        (e &= -e),
        1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
      );
    }
    var cf,
      Gu,
      ff,
      df,
      pf,
      du = !1,
      Si = [],
      At = null,
      Ft = null,
      Rt = null,
      Pr = new Map(),
      Mr = new Map(),
      Ot = [],
      Im =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
          " ",
        );
    function Ha(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          At = null;
          break;
        case "dragenter":
        case "dragleave":
          Ft = null;
          break;
        case "mouseover":
        case "mouseout":
          Rt = null;
          break;
        case "pointerover":
        case "pointerout":
          Pr.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Mr.delete(t.pointerId);
      }
    }
    function lr(e, t, n, r, i, o) {
      return e === null || e.nativeEvent !== o
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: o,
            targetContainers: [i],
          }),
          t !== null && ((t = Wr(t)), t !== null && Gu(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
    }
    function Lm(e, t, n, r, i) {
      switch (t) {
        case "focusin":
          return ((At = lr(At, e, t, n, r, i)), !0);
        case "dragenter":
          return ((Ft = lr(Ft, e, t, n, r, i)), !0);
        case "mouseover":
          return ((Rt = lr(Rt, e, t, n, r, i)), !0);
        case "pointerover":
          var o = i.pointerId;
          return (Pr.set(o, lr(Pr.get(o) || null, e, t, n, r, i)), !0);
        case "gotpointercapture":
          return (
            (o = i.pointerId),
            Mr.set(o, lr(Mr.get(o) || null, e, t, n, r, i)),
            !0
          );
      }
      return !1;
    }
    function hf(e) {
      var t = nn(e.target);
      if (t !== null) {
        var n = hn(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = tf(n)), t !== null)) {
              ((e.blockedOn = t),
                pf(e.priority, function () {
                  ff(n);
                }));
              return;
            }
          } else if (
            t === 3 &&
            n.stateNode.current.memoizedState.isDehydrated
          ) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Fi(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = pu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          ((uu = r), n.target.dispatchEvent(r), (uu = null));
        } else return ((t = Wr(n)), t !== null && Gu(t), (e.blockedOn = n), !1);
        t.shift();
      }
      return !0;
    }
    function ja(e, t, n) {
      Fi(e) && n.delete(t);
    }
    function Dm() {
      ((du = !1),
        At !== null && Fi(At) && (At = null),
        Ft !== null && Fi(Ft) && (Ft = null),
        Rt !== null && Fi(Rt) && (Rt = null),
        Pr.forEach(ja),
        Mr.forEach(ja));
    }
    function ur(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        du ||
          ((du = !0),
          Ie.unstable_scheduleCallback(Ie.unstable_NormalPriority, Dm)));
    }
    function Or(e) {
      function t(i) {
        return ur(i, e);
      }
      if (0 < Si.length) {
        ur(Si[0], e);
        for (var n = 1; n < Si.length; n++) {
          var r = Si[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        At !== null && ur(At, e),
          Ft !== null && ur(Ft, e),
          Rt !== null && ur(Rt, e),
          Pr.forEach(t),
          Mr.forEach(t),
          n = 0;
        n < Ot.length;
        n++
      )
        ((r = Ot[n]), r.blockedOn === e && (r.blockedOn = null));
      for (; 0 < Ot.length && ((n = Ot[0]), n.blockedOn === null); )
        (hf(n), n.blockedOn === null && Ot.shift());
    }
    var $n = _t.ReactCurrentBatchConfig,
      Zi = !0;
    function Am(e, t, n, r) {
      var i = U,
        o = $n.transition;
      $n.transition = null;
      try {
        ((U = 1), Zu(e, t, n, r));
      } finally {
        ((U = i), ($n.transition = o));
      }
    }
    function Fm(e, t, n, r) {
      var i = U,
        o = $n.transition;
      $n.transition = null;
      try {
        ((U = 4), Zu(e, t, n, r));
      } finally {
        ((U = i), ($n.transition = o));
      }
    }
    function Zu(e, t, n, r) {
      if (Zi) {
        var i = pu(e, t, n, r);
        if (i === null) ($l(e, t, r, Ji, n), Ha(e, r));
        else if (Lm(i, e, t, n, r)) r.stopPropagation();
        else if ((Ha(e, r), t & 4 && -1 < Im.indexOf(e))) {
          for (; i !== null; ) {
            var o = Wr(i);
            if (
              (o !== null && cf(o),
              (o = pu(e, t, n, r)),
              o === null && $l(e, t, r, Ji, n),
              o === i)
            )
              break;
            i = o;
          }
          i !== null && r.stopPropagation();
        } else $l(e, t, r, null, n);
      }
    }
    var Ji = null;
    function pu(e, t, n, r) {
      if (((Ji = null), (e = Yu(r)), (e = nn(e)), e !== null))
        if (((t = hn(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
          if (((e = tf(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      return ((Ji = e), null);
    }
    function mf(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (km()) {
            case Ku:
              return 1;
            case lf:
              return 4;
            case qi:
            case Em:
              return 16;
            case uf:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var Lt = null,
      Ju = null,
      Ri = null;
    function vf() {
      if (Ri) return Ri;
      var e,
        t = Ju,
        n = t.length,
        r,
        i = "value" in Lt ? Lt.value : Lt.textContent,
        o = i.length;
      for (e = 0; e < n && t[e] === i[e]; e++);
      var l = n - e;
      for (r = 1; r <= l && t[n - r] === i[o - r]; r++);
      return (Ri = i.slice(e, 1 < r ? 1 - r : void 0));
    }
    function $i(e) {
      var t = e.keyCode;
      return (
        "charCode" in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function ki() {
      return !0;
    }
    function Qa() {
      return !1;
    }
    function Le(e) {
      function t(n, r, i, o, l) {
        ((this._reactName = n),
          (this._targetInst = i),
          (this.type = r),
          (this.nativeEvent = o),
          (this.target = l),
          (this.currentTarget = null));
        for (var u in e)
          e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(o) : o[u]));
        return (
          (this.isDefaultPrevented = (
            o.defaultPrevented != null
              ? o.defaultPrevented
              : o.returnValue === !1
          )
            ? ki
            : Qa),
          (this.isPropagationStopped = Qa),
          this
        );
      }
      return (
        q(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n &&
              (n.preventDefault
                ? n.preventDefault()
                : typeof n.returnValue != "unknown" && (n.returnValue = !1),
              (this.isDefaultPrevented = ki));
          },
          stopPropagation: function () {
            var n = this.nativeEvent;
            n &&
              (n.stopPropagation
                ? n.stopPropagation()
                : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
              (this.isPropagationStopped = ki));
          },
          persist: function () {},
          isPersistent: ki,
        }),
        t
      );
    }
    var Kn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      bu = Le(Kn),
      Qr = q({}, Kn, { view: 0, detail: 0 }),
      Rm = Le(Qr),
      Il,
      Ll,
      sr,
      go = q({}, Qr, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: es,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return "movementX" in e
            ? e.movementX
            : (e !== sr &&
                (sr && e.type === "mousemove"
                  ? ((Il = e.screenX - sr.screenX),
                    (Ll = e.screenY - sr.screenY))
                  : (Ll = Il = 0),
                (sr = e)),
              Il);
        },
        movementY: function (e) {
          return "movementY" in e ? e.movementY : Ll;
        },
      }),
      Wa = Le(go),
      $m = q({}, go, { dataTransfer: 0 }),
      Um = Le($m),
      Vm = q({}, Qr, { relatedTarget: 0 }),
      Dl = Le(Vm),
      Bm = q({}, Kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      Hm = Le(Bm),
      jm = q({}, Kn, {
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      }),
      Qm = Le(jm),
      Wm = q({}, Kn, { data: 0 }),
      Xa = Le(Wm),
      Xm = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      Ym = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      Km = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function qm(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = Km[e])
          ? !!t[e]
          : !1;
    }
    function es() {
      return qm;
    }
    var Gm = q({}, Qr, {
        key: function (e) {
          if (e.key) {
            var t = Xm[e.key] || e.key;
            if (t !== "Unidentified") return t;
          }
          return e.type === "keypress"
            ? ((e = $i(e)), e === 13 ? "Enter" : String.fromCharCode(e))
            : e.type === "keydown" || e.type === "keyup"
              ? Ym[e.keyCode] || "Unidentified"
              : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: es,
        charCode: function (e) {
          return e.type === "keypress" ? $i(e) : 0;
        },
        keyCode: function (e) {
          return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === "keypress"
            ? $i(e)
            : e.type === "keydown" || e.type === "keyup"
              ? e.keyCode
              : 0;
        },
      }),
      Zm = Le(Gm),
      Jm = q({}, go, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      Ya = Le(Jm),
      bm = q({}, Qr, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: es,
      }),
      e0 = Le(bm),
      t0 = q({}, Kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      n0 = Le(t0),
      r0 = q({}, go, {
        deltaX: function (e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
              ? -e.wheelDeltaX
              : 0;
        },
        deltaY: function (e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
              ? -e.wheelDeltaY
              : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      i0 = Le(r0),
      o0 = [9, 13, 27, 32],
      ts = yt && "CompositionEvent" in window,
      wr = null;
    yt && "documentMode" in document && (wr = document.documentMode);
    var l0 = yt && "TextEvent" in window && !wr,
      yf = yt && (!ts || (wr && 8 < wr && 11 >= wr)),
      Ka = " ",
      qa = !1;
    function gf(e, t) {
      switch (e) {
        case "keyup":
          return o0.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function wf(e) {
      return (
        (e = e.detail),
        typeof e == "object" && "data" in e ? e.data : null
      );
    }
    var Nn = !1;
    function u0(e, t) {
      switch (e) {
        case "compositionend":
          return wf(t);
        case "keypress":
          return t.which !== 32 ? null : ((qa = !0), Ka);
        case "textInput":
          return ((e = t.data), e === Ka && qa ? null : e);
        default:
          return null;
      }
    }
    function s0(e, t) {
      if (Nn)
        return e === "compositionend" || (!ts && gf(e, t))
          ? ((e = vf()), (Ri = Ju = Lt = null), (Nn = !1), e)
          : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return yf && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var a0 = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function Ga(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!a0[e.type] : t === "textarea";
    }
    function xf(e, t, n, r) {
      (Gc(r),
        (t = bi(t, "onChange")),
        0 < t.length &&
          ((n = new bu("onChange", "change", null, n, r)),
          e.push({ event: n, listeners: t })));
    }
    var xr = null,
      Ir = null;
    function c0(e) {
      Of(e, 0);
    }
    function wo(e) {
      var t = zn(e);
      if (jc(t)) return e;
    }
    function f0(e, t) {
      if (e === "change") return t;
    }
    var _f = !1;
    yt &&
      (yt
        ? ((Ni = "oninput" in document),
          Ni ||
            ((Al = document.createElement("div")),
            Al.setAttribute("oninput", "return;"),
            (Ni = typeof Al.oninput == "function")),
          (Ei = Ni))
        : (Ei = !1),
      (_f = Ei && (!document.documentMode || 9 < document.documentMode)));
    var Ei, Ni, Al;
    function Za() {
      xr && (xr.detachEvent("onpropertychange", Sf), (Ir = xr = null));
    }
    function Sf(e) {
      if (e.propertyName === "value" && wo(Ir)) {
        var t = [];
        (xf(t, Ir, e, Yu(e)), ef(c0, t));
      }
    }
    function d0(e, t, n) {
      e === "focusin"
        ? (Za(), (xr = t), (Ir = n), xr.attachEvent("onpropertychange", Sf))
        : e === "focusout" && Za();
    }
    function p0(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return wo(Ir);
    }
    function h0(e, t) {
      if (e === "click") return wo(t);
    }
    function m0(e, t) {
      if (e === "input" || e === "change") return wo(t);
    }
    function v0(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var be = typeof Object.is == "function" ? Object.is : v0;
    function Lr(e, t) {
      if (be(e, t)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!ql.call(t, i) || !be(e[i], t[i])) return !1;
      }
      return !0;
    }
    function Ja(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function ba(e, t) {
      var n = Ja(e);
      e = 0;
      for (var r; n; ) {
        if (n.nodeType === 3) {
          if (((r = e + n.textContent.length), e <= t && r >= t))
            return { node: n, offset: t - e };
          e = r;
        }
        e: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break e;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = Ja(n);
      }
    }
    function kf(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? kf(e, t.parentNode)
              : "contains" in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function Ef() {
      for (var e = window, t = Xi(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == "string";
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Xi(e.document);
      }
      return t;
    }
    function ns(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === "input" &&
          (e.type === "text" ||
            e.type === "search" ||
            e.type === "tel" ||
            e.type === "url" ||
            e.type === "password")) ||
          t === "textarea" ||
          e.contentEditable === "true")
      );
    }
    function y0(e) {
      var t = Ef(),
        n = e.focusedElem,
        r = e.selectionRange;
      if (
        t !== n &&
        n &&
        n.ownerDocument &&
        kf(n.ownerDocument.documentElement, n)
      ) {
        if (r !== null && ns(n)) {
          if (
            ((t = r.start),
            (e = r.end),
            e === void 0 && (e = t),
            "selectionStart" in n)
          )
            ((n.selectionStart = t),
              (n.selectionEnd = Math.min(e, n.value.length)));
          else if (
            ((e =
              ((t = n.ownerDocument || document) && t.defaultView) || window),
            e.getSelection)
          ) {
            e = e.getSelection();
            var i = n.textContent.length,
              o = Math.min(r.start, i);
            ((r = r.end === void 0 ? o : Math.min(r.end, i)),
              !e.extend && o > r && ((i = r), (r = o), (o = i)),
              (i = ba(n, o)));
            var l = ba(n, r);
            i &&
              l &&
              (e.rangeCount !== 1 ||
                e.anchorNode !== i.node ||
                e.anchorOffset !== i.offset ||
                e.focusNode !== l.node ||
                e.focusOffset !== l.offset) &&
              ((t = t.createRange()),
              t.setStart(i.node, i.offset),
              e.removeAllRanges(),
              o > r
                ? (e.addRange(t), e.extend(l.node, l.offset))
                : (t.setEnd(l.node, l.offset), e.addRange(t)));
          }
        }
        for (t = [], e = n; (e = e.parentNode); )
          e.nodeType === 1 &&
            t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
          typeof n.focus == "function" && n.focus(), n = 0;
          n < t.length;
          n++
        )
          ((e = t[n]),
            (e.element.scrollLeft = e.left),
            (e.element.scrollTop = e.top));
      }
    }
    var g0 = yt && "documentMode" in document && 11 >= document.documentMode,
      Cn = null,
      hu = null,
      _r = null,
      mu = !1;
    function ec(e, t, n) {
      var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      mu ||
        Cn == null ||
        Cn !== Xi(r) ||
        ((r = Cn),
        "selectionStart" in r && ns(r)
          ? (r = { start: r.selectionStart, end: r.selectionEnd })
          : ((r = (
              (r.ownerDocument && r.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (r = {
              anchorNode: r.anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            })),
        (_r && Lr(_r, r)) ||
          ((_r = r),
          (r = bi(hu, "onSelect")),
          0 < r.length &&
            ((t = new bu("onSelect", "select", null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = Cn))));
    }
    function Ci(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
      );
    }
    var Tn = {
        animationend: Ci("Animation", "AnimationEnd"),
        animationiteration: Ci("Animation", "AnimationIteration"),
        animationstart: Ci("Animation", "AnimationStart"),
        transitionend: Ci("Transition", "TransitionEnd"),
      },
      Fl = {},
      Nf = {};
    yt &&
      ((Nf = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete Tn.animationend.animation,
        delete Tn.animationiteration.animation,
        delete Tn.animationstart.animation),
      "TransitionEvent" in window || delete Tn.transitionend.transition);
    function xo(e) {
      if (Fl[e]) return Fl[e];
      if (!Tn[e]) return e;
      var t = Tn[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Nf) return (Fl[e] = t[n]);
      return e;
    }
    var Cf = xo("animationend"),
      Tf = xo("animationiteration"),
      zf = xo("animationstart"),
      Pf = xo("transitionend"),
      Mf = new Map(),
      tc =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " ",
        );
    function Wt(e, t) {
      (Mf.set(e, t), pn(t, [e]));
    }
    for (Ti = 0; Ti < tc.length; Ti++)
      ((zi = tc[Ti]),
        (nc = zi.toLowerCase()),
        (rc = zi[0].toUpperCase() + zi.slice(1)),
        Wt(nc, "on" + rc));
    var zi, nc, rc, Ti;
    Wt(Cf, "onAnimationEnd");
    Wt(Tf, "onAnimationIteration");
    Wt(zf, "onAnimationStart");
    Wt("dblclick", "onDoubleClick");
    Wt("focusin", "onFocus");
    Wt("focusout", "onBlur");
    Wt(Pf, "onTransitionEnd");
    Bn("onMouseEnter", ["mouseout", "mouseover"]);
    Bn("onMouseLeave", ["mouseout", "mouseover"]);
    Bn("onPointerEnter", ["pointerout", "pointerover"]);
    Bn("onPointerLeave", ["pointerout", "pointerover"]);
    pn(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    );
    pn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    );
    pn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    pn(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    );
    pn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    );
    pn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
    var vr =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " ",
        ),
      w0 = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(vr),
      );
    function ic(e, t, n) {
      var r = e.type || "unknown-event";
      ((e.currentTarget = n), wm(r, t, void 0, e), (e.currentTarget = null));
    }
    function Of(e, t) {
      t = (t & 4) !== 0;
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = r.event;
        r = r.listeners;
        e: {
          var o = void 0;
          if (t)
            for (var l = r.length - 1; 0 <= l; l--) {
              var u = r[l],
                s = u.instance,
                a = u.currentTarget;
              if (((u = u.listener), s !== o && i.isPropagationStopped()))
                break e;
              (ic(i, u, a), (o = s));
            }
          else
            for (l = 0; l < r.length; l++) {
              if (
                ((u = r[l]),
                (s = u.instance),
                (a = u.currentTarget),
                (u = u.listener),
                s !== o && i.isPropagationStopped())
              )
                break e;
              (ic(i, u, a), (o = s));
            }
        }
      }
      if (Ki) throw ((e = cu), (Ki = !1), (cu = null), e);
    }
    function j(e, t) {
      var n = t[xu];
      n === void 0 && (n = t[xu] = new Set());
      var r = e + "__bubble";
      n.has(r) || (If(t, e, 2, !1), n.add(r));
    }
    function Rl(e, t, n) {
      var r = 0;
      (t && (r |= 4), If(n, e, r, t));
    }
    var Pi = "_reactListening" + Math.random().toString(36).slice(2);
    function Dr(e) {
      if (!e[Pi]) {
        ((e[Pi] = !0),
          $c.forEach(function (n) {
            n !== "selectionchange" &&
              (w0.has(n) || Rl(n, !1, e), Rl(n, !0, e));
          }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Pi] || ((t[Pi] = !0), Rl("selectionchange", !1, t));
      }
    }
    function If(e, t, n, r) {
      switch (mf(t)) {
        case 1:
          var i = Am;
          break;
        case 4:
          i = Fm;
          break;
        default:
          i = Zu;
      }
      ((n = i.bind(null, t, n, e)),
        (i = void 0),
        !au ||
          (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
          (i = !0),
        r
          ? i !== void 0
            ? e.addEventListener(t, n, { capture: !0, passive: i })
            : e.addEventListener(t, n, !0)
          : i !== void 0
            ? e.addEventListener(t, n, { passive: i })
            : e.addEventListener(t, n, !1));
    }
    function $l(e, t, n, r, i) {
      var o = r;
      if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
        e: for (;;) {
          if (r === null) return;
          var l = r.tag;
          if (l === 3 || l === 4) {
            var u = r.stateNode.containerInfo;
            if (u === i || (u.nodeType === 8 && u.parentNode === i)) break;
            if (l === 4)
              for (l = r.return; l !== null; ) {
                var s = l.tag;
                if (
                  (s === 3 || s === 4) &&
                  ((s = l.stateNode.containerInfo),
                  s === i || (s.nodeType === 8 && s.parentNode === i))
                )
                  return;
                l = l.return;
              }
            for (; u !== null; ) {
              if (((l = nn(u)), l === null)) return;
              if (((s = l.tag), s === 5 || s === 6)) {
                r = o = l;
                continue e;
              }
              u = u.parentNode;
            }
          }
          r = r.return;
        }
      ef(function () {
        var a = o,
          d = Yu(n),
          m = [];
        e: {
          var h = Mf.get(e);
          if (h !== void 0) {
            var v = bu,
              x = e;
            switch (e) {
              case "keypress":
                if ($i(n) === 0) break e;
              case "keydown":
              case "keyup":
                v = Zm;
                break;
              case "focusin":
                ((x = "focus"), (v = Dl));
                break;
              case "focusout":
                ((x = "blur"), (v = Dl));
                break;
              case "beforeblur":
              case "afterblur":
                v = Dl;
                break;
              case "click":
                if (n.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                v = Wa;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                v = Um;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                v = e0;
                break;
              case Cf:
              case Tf:
              case zf:
                v = Hm;
                break;
              case Pf:
                v = n0;
                break;
              case "scroll":
                v = Rm;
                break;
              case "wheel":
                v = i0;
                break;
              case "copy":
              case "cut":
              case "paste":
                v = Qm;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                v = Ya;
            }
            var _ = (t & 4) !== 0,
              N = !_ && e === "scroll",
              c = _ ? (h !== null ? h + "Capture" : null) : h;
            _ = [];
            for (var f = a, p; f !== null; ) {
              p = f;
              var w = p.stateNode;
              if (
                (p.tag === 5 &&
                  w !== null &&
                  ((p = w),
                  c !== null &&
                    ((w = zr(f, c)), w != null && _.push(Ar(f, w, p)))),
                N)
              )
                break;
              f = f.return;
            }
            0 < _.length &&
              ((h = new v(h, x, null, n, d)),
              m.push({ event: h, listeners: _ }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (
              ((h = e === "mouseover" || e === "pointerover"),
              (v = e === "mouseout" || e === "pointerout"),
              h &&
                n !== uu &&
                (x = n.relatedTarget || n.fromElement) &&
                (nn(x) || x[gt]))
            )
              break e;
            if (
              (v || h) &&
              ((h =
                d.window === d
                  ? d
                  : (h = d.ownerDocument)
                    ? h.defaultView || h.parentWindow
                    : window),
              v
                ? ((x = n.relatedTarget || n.toElement),
                  (v = a),
                  (x = x ? nn(x) : null),
                  x !== null &&
                    ((N = hn(x)), x !== N || (x.tag !== 5 && x.tag !== 6)) &&
                    (x = null))
                : ((v = null), (x = a)),
              v !== x)
            ) {
              if (
                ((_ = Wa),
                (w = "onMouseLeave"),
                (c = "onMouseEnter"),
                (f = "mouse"),
                (e === "pointerout" || e === "pointerover") &&
                  ((_ = Ya),
                  (w = "onPointerLeave"),
                  (c = "onPointerEnter"),
                  (f = "pointer")),
                (N = v == null ? h : zn(v)),
                (p = x == null ? h : zn(x)),
                (h = new _(w, f + "leave", v, n, d)),
                (h.target = N),
                (h.relatedTarget = p),
                (w = null),
                nn(d) === a &&
                  ((_ = new _(c, f + "enter", x, n, d)),
                  (_.target = p),
                  (_.relatedTarget = N),
                  (w = _)),
                (N = w),
                v && x)
              )
                t: {
                  for (_ = v, c = x, f = 0, p = _; p; p = Sn(p)) f++;
                  for (p = 0, w = c; w; w = Sn(w)) p++;
                  for (; 0 < f - p; ) ((_ = Sn(_)), f--);
                  for (; 0 < p - f; ) ((c = Sn(c)), p--);
                  for (; f--; ) {
                    if (_ === c || (c !== null && _ === c.alternate)) break t;
                    ((_ = Sn(_)), (c = Sn(c)));
                  }
                  _ = null;
                }
              else _ = null;
              (v !== null && oc(m, h, v, _, !1),
                x !== null && N !== null && oc(m, N, x, _, !0));
            }
          }
          e: {
            if (
              ((h = a ? zn(a) : window),
              (v = h.nodeName && h.nodeName.toLowerCase()),
              v === "select" || (v === "input" && h.type === "file"))
            )
              var C = f0;
            else if (Ga(h))
              if (_f) C = m0;
              else {
                C = p0;
                var T = d0;
              }
            else
              (v = h.nodeName) &&
                v.toLowerCase() === "input" &&
                (h.type === "checkbox" || h.type === "radio") &&
                (C = h0);
            if (C && (C = C(e, a))) {
              xf(m, C, n, d);
              break e;
            }
            (T && T(e, h, a),
              e === "focusout" &&
                (T = h._wrapperState) &&
                T.controlled &&
                h.type === "number" &&
                nu(h, "number", h.value));
          }
          switch (((T = a ? zn(a) : window), e)) {
            case "focusin":
              (Ga(T) || T.contentEditable === "true") &&
                ((Cn = T), (hu = a), (_r = null));
              break;
            case "focusout":
              _r = hu = Cn = null;
              break;
            case "mousedown":
              mu = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              ((mu = !1), ec(m, n, d));
              break;
            case "selectionchange":
              if (g0) break;
            case "keydown":
            case "keyup":
              ec(m, n, d);
          }
          var P;
          if (ts)
            e: {
              switch (e) {
                case "compositionstart":
                  var M = "onCompositionStart";
                  break e;
                case "compositionend":
                  M = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  M = "onCompositionUpdate";
                  break e;
              }
              M = void 0;
            }
          else
            Nn
              ? gf(e, n) && (M = "onCompositionEnd")
              : e === "keydown" &&
                n.keyCode === 229 &&
                (M = "onCompositionStart");
          (M &&
            (yf &&
              n.locale !== "ko" &&
              (Nn || M !== "onCompositionStart"
                ? M === "onCompositionEnd" && Nn && (P = vf())
                : ((Lt = d),
                  (Ju = "value" in Lt ? Lt.value : Lt.textContent),
                  (Nn = !0))),
            (T = bi(a, M)),
            0 < T.length &&
              ((M = new Xa(M, e, null, n, d)),
              m.push({ event: M, listeners: T }),
              P ? (M.data = P) : ((P = wf(n)), P !== null && (M.data = P)))),
            (P = l0 ? u0(e, n) : s0(e, n)) &&
              ((a = bi(a, "onBeforeInput")),
              0 < a.length &&
                ((d = new Xa("onBeforeInput", "beforeinput", null, n, d)),
                m.push({ event: d, listeners: a }),
                (d.data = P))));
        }
        Of(m, t);
      });
    }
    function Ar(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function bi(e, t) {
      for (var n = t + "Capture", r = []; e !== null; ) {
        var i = e,
          o = i.stateNode;
        (i.tag === 5 &&
          o !== null &&
          ((i = o),
          (o = zr(e, n)),
          o != null && r.unshift(Ar(e, o, i)),
          (o = zr(e, t)),
          o != null && r.push(Ar(e, o, i))),
          (e = e.return));
      }
      return r;
    }
    function Sn(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function oc(e, t, n, r, i) {
      for (var o = t._reactName, l = []; n !== null && n !== r; ) {
        var u = n,
          s = u.alternate,
          a = u.stateNode;
        if (s !== null && s === r) break;
        (u.tag === 5 &&
          a !== null &&
          ((u = a),
          i
            ? ((s = zr(n, o)), s != null && l.unshift(Ar(n, s, u)))
            : i || ((s = zr(n, o)), s != null && l.push(Ar(n, s, u)))),
          (n = n.return));
      }
      l.length !== 0 && e.push({ event: t, listeners: l });
    }
    var x0 = /\r\n?/g,
      _0 = /\u0000|\uFFFD/g;
    function lc(e) {
      return (typeof e == "string" ? e : "" + e)
        .replace(
          x0,
          `
`,
        )
        .replace(_0, "");
    }
    function Mi(e, t, n) {
      if (((t = lc(t)), lc(e) !== t && n)) throw Error(S(425));
    }
    function eo() {}
    var vu = null,
      yu = null;
    function gu(e, t) {
      return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var wu = typeof setTimeout == "function" ? setTimeout : void 0,
      S0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
      uc = typeof Promise == "function" ? Promise : void 0,
      k0 =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof uc < "u"
            ? function (e) {
                return uc.resolve(null).then(e).catch(E0);
              }
            : wu;
    function E0(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function Ul(e, t) {
      var n = t,
        r = 0;
      do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
          if (((n = i.data), n === "/$")) {
            if (r === 0) {
              (e.removeChild(i), Or(t));
              return;
            }
            r--;
          } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
        n = i;
      } while (n);
      Or(t);
    }
    function $t(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
          if (t === "/$") return null;
        }
      }
      return e;
    }
    function sc(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "$" || n === "$!" || n === "$?") {
            if (t === 0) return e;
            t--;
          } else n === "/$" && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var qn = Math.random().toString(36).slice(2),
      lt = "__reactFiber$" + qn,
      Fr = "__reactProps$" + qn,
      gt = "__reactContainer$" + qn,
      xu = "__reactEvents$" + qn,
      N0 = "__reactListeners$" + qn,
      C0 = "__reactHandles$" + qn;
    function nn(e) {
      var t = e[lt];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[gt] || n[lt])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = sc(e); e !== null; ) {
              if ((n = e[lt])) return n;
              e = sc(e);
            }
          return t;
        }
        ((e = n), (n = e.parentNode));
      }
      return null;
    }
    function Wr(e) {
      return (
        (e = e[lt] || e[gt]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
          ? null
          : e
      );
    }
    function zn(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(S(33));
    }
    function _o(e) {
      return e[Fr] || null;
    }
    var _u = [],
      Pn = -1;
    function Xt(e) {
      return { current: e };
    }
    function Q(e) {
      0 > Pn || ((e.current = _u[Pn]), (_u[Pn] = null), Pn--);
    }
    function H(e, t) {
      (Pn++, (_u[Pn] = e.current), (e.current = t));
    }
    var Qt = {},
      ve = Xt(Qt),
      Ee = Xt(!1),
      sn = Qt;
    function Hn(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Qt;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {},
        o;
      for (o in n) i[o] = t[o];
      return (
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
      );
    }
    function Ne(e) {
      return ((e = e.childContextTypes), e != null);
    }
    function to() {
      (Q(Ee), Q(ve));
    }
    function ac(e, t, n) {
      if (ve.current !== Qt) throw Error(S(168));
      (H(ve, t), H(Ee, n));
    }
    function Lf(e, t, n) {
      var r = e.stateNode;
      if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
        return n;
      r = r.getChildContext();
      for (var i in r)
        if (!(i in t)) throw Error(S(108, dm(e) || "Unknown", i));
      return q({}, n, r);
    }
    function no(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          Qt),
        (sn = ve.current),
        H(ve, e),
        H(Ee, Ee.current),
        !0
      );
    }
    function cc(e, t, n) {
      var r = e.stateNode;
      if (!r) throw Error(S(169));
      (n
        ? ((e = Lf(e, t, sn)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          Q(Ee),
          Q(ve),
          H(ve, e))
        : Q(Ee),
        H(Ee, n));
    }
    var pt = null,
      So = !1,
      Vl = !1;
    function Df(e) {
      pt === null ? (pt = [e]) : pt.push(e);
    }
    function T0(e) {
      ((So = !0), Df(e));
    }
    function Yt() {
      if (!Vl && pt !== null) {
        Vl = !0;
        var e = 0,
          t = U;
        try {
          var n = pt;
          for (U = 1; e < n.length; e++) {
            var r = n[e];
            do r = r(!0);
            while (r !== null);
          }
          ((pt = null), (So = !1));
        } catch (i) {
          throw (pt !== null && (pt = pt.slice(e + 1)), of(Ku, Yt), i);
        } finally {
          ((U = t), (Vl = !1));
        }
      }
      return null;
    }
    var Mn = [],
      On = 0,
      ro = null,
      io = 0,
      Re = [],
      $e = 0,
      an = null,
      ht = 1,
      mt = "";
    function en(e, t) {
      ((Mn[On++] = io), (Mn[On++] = ro), (ro = e), (io = t));
    }
    function Af(e, t, n) {
      ((Re[$e++] = ht), (Re[$e++] = mt), (Re[$e++] = an), (an = e));
      var r = ht;
      e = mt;
      var i = 32 - Ze(r) - 1;
      ((r &= ~(1 << i)), (n += 1));
      var o = 32 - Ze(t) + i;
      if (30 < o) {
        var l = i - (i % 5);
        ((o = (r & ((1 << l) - 1)).toString(32)),
          (r >>= l),
          (i -= l),
          (ht = (1 << (32 - Ze(t) + i)) | (n << i) | r),
          (mt = o + e));
      } else ((ht = (1 << o) | (n << i) | r), (mt = e));
    }
    function rs(e) {
      e.return !== null && (en(e, 1), Af(e, 1, 0));
    }
    function is(e) {
      for (; e === ro; )
        ((ro = Mn[--On]), (Mn[On] = null), (io = Mn[--On]), (Mn[On] = null));
      for (; e === an; )
        ((an = Re[--$e]),
          (Re[$e] = null),
          (mt = Re[--$e]),
          (Re[$e] = null),
          (ht = Re[--$e]),
          (Re[$e] = null));
    }
    var Oe = null,
      Me = null,
      X = !1,
      Ge = null;
    function Ff(e, t) {
      var n = Ue(5, null, null, 0);
      ((n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
    }
    function fc(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            (t =
              t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            t !== null
              ? ((e.stateNode = t), (Oe = e), (Me = $t(t.firstChild)), !0)
              : !1
          );
        case 6:
          return (
            (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
            t !== null ? ((e.stateNode = t), (Oe = e), (Me = null), !0) : !1
          );
        case 13:
          return (
            (t = t.nodeType !== 8 ? null : t),
            t !== null
              ? ((n = an !== null ? { id: ht, overflow: mt } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                (n = Ue(18, null, null, 0)),
                (n.stateNode = t),
                (n.return = e),
                (e.child = n),
                (Oe = e),
                (Me = null),
                !0)
              : !1
          );
        default:
          return !1;
      }
    }
    function Su(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function ku(e) {
      if (X) {
        var t = Me;
        if (t) {
          var n = t;
          if (!fc(e, t)) {
            if (Su(e)) throw Error(S(418));
            t = $t(n.nextSibling);
            var r = Oe;
            t && fc(e, t)
              ? Ff(r, n)
              : ((e.flags = (e.flags & -4097) | 2), (X = !1), (Oe = e));
          }
        } else {
          if (Su(e)) throw Error(S(418));
          ((e.flags = (e.flags & -4097) | 2), (X = !1), (Oe = e));
        }
      }
    }
    function dc(e) {
      for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
      )
        e = e.return;
      Oe = e;
    }
    function Oi(e) {
      if (e !== Oe) return !1;
      if (!X) return (dc(e), (X = !0), !1);
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type),
          (t = t !== "head" && t !== "body" && !gu(e.type, e.memoizedProps))),
        t && (t = Me))
      ) {
        if (Su(e)) throw (Rf(), Error(S(418)));
        for (; t; ) (Ff(e, t), (t = $t(t.nextSibling)));
      }
      if ((dc(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(S(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var n = e.data;
              if (n === "/$") {
                if (t === 0) {
                  Me = $t(e.nextSibling);
                  break e;
                }
                t--;
              } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
            }
            e = e.nextSibling;
          }
          Me = null;
        }
      } else Me = Oe ? $t(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Rf() {
      for (var e = Me; e; ) e = $t(e.nextSibling);
    }
    function jn() {
      ((Me = Oe = null), (X = !1));
    }
    function os(e) {
      Ge === null ? (Ge = [e]) : Ge.push(e);
    }
    var z0 = _t.ReactCurrentBatchConfig;
    function ar(e, t, n) {
      if (
        ((e = n.ref),
        e !== null && typeof e != "function" && typeof e != "object")
      ) {
        if (n._owner) {
          if (((n = n._owner), n)) {
            if (n.tag !== 1) throw Error(S(309));
            var r = n.stateNode;
          }
          if (!r) throw Error(S(147, e));
          var i = r,
            o = "" + e;
          return t !== null &&
            t.ref !== null &&
            typeof t.ref == "function" &&
            t.ref._stringRef === o
            ? t.ref
            : ((t = function (l) {
                var u = i.refs;
                l === null ? delete u[o] : (u[o] = l);
              }),
              (t._stringRef = o),
              t);
        }
        if (typeof e != "string") throw Error(S(284));
        if (!n._owner) throw Error(S(290, e));
      }
      return e;
    }
    function Ii(e, t) {
      throw (
        (e = Object.prototype.toString.call(t)),
        Error(
          S(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e,
          ),
        )
      );
    }
    function pc(e) {
      var t = e._init;
      return t(e._payload);
    }
    function $f(e) {
      function t(c, f) {
        if (e) {
          var p = c.deletions;
          p === null ? ((c.deletions = [f]), (c.flags |= 16)) : p.push(f);
        }
      }
      function n(c, f) {
        if (!e) return null;
        for (; f !== null; ) (t(c, f), (f = f.sibling));
        return null;
      }
      function r(c, f) {
        for (c = new Map(); f !== null; )
          (f.key !== null ? c.set(f.key, f) : c.set(f.index, f),
            (f = f.sibling));
        return c;
      }
      function i(c, f) {
        return ((c = Ht(c, f)), (c.index = 0), (c.sibling = null), c);
      }
      function o(c, f, p) {
        return (
          (c.index = p),
          e
            ? ((p = c.alternate),
              p !== null
                ? ((p = p.index), p < f ? ((c.flags |= 2), f) : p)
                : ((c.flags |= 2), f))
            : ((c.flags |= 1048576), f)
        );
      }
      function l(c) {
        return (e && c.alternate === null && (c.flags |= 2), c);
      }
      function u(c, f, p, w) {
        return f === null || f.tag !== 6
          ? ((f = Yl(p, c.mode, w)), (f.return = c), f)
          : ((f = i(f, p)), (f.return = c), f);
      }
      function s(c, f, p, w) {
        var C = p.type;
        return C === En
          ? d(c, f, p.props.children, w, p.key)
          : f !== null &&
              (f.elementType === C ||
                (typeof C == "object" &&
                  C !== null &&
                  C.$$typeof === Pt &&
                  pc(C) === f.type))
            ? ((w = i(f, p.props)), (w.ref = ar(c, f, p)), (w.return = c), w)
            : ((w = Wi(p.type, p.key, p.props, null, c.mode, w)),
              (w.ref = ar(c, f, p)),
              (w.return = c),
              w);
      }
      function a(c, f, p, w) {
        return f === null ||
          f.tag !== 4 ||
          f.stateNode.containerInfo !== p.containerInfo ||
          f.stateNode.implementation !== p.implementation
          ? ((f = Kl(p, c.mode, w)), (f.return = c), f)
          : ((f = i(f, p.children || [])), (f.return = c), f);
      }
      function d(c, f, p, w, C) {
        return f === null || f.tag !== 7
          ? ((f = un(p, c.mode, w, C)), (f.return = c), f)
          : ((f = i(f, p)), (f.return = c), f);
      }
      function m(c, f, p) {
        if ((typeof f == "string" && f !== "") || typeof f == "number")
          return ((f = Yl("" + f, c.mode, p)), (f.return = c), f);
        if (typeof f == "object" && f !== null) {
          switch (f.$$typeof) {
            case yi:
              return (
                (p = Wi(f.type, f.key, f.props, null, c.mode, p)),
                (p.ref = ar(c, null, f)),
                (p.return = c),
                p
              );
            case kn:
              return ((f = Kl(f, c.mode, p)), (f.return = c), f);
            case Pt:
              var w = f._init;
              return m(c, w(f._payload), p);
          }
          if (hr(f) || or(f))
            return ((f = un(f, c.mode, p, null)), (f.return = c), f);
          Ii(c, f);
        }
        return null;
      }
      function h(c, f, p, w) {
        var C = f !== null ? f.key : null;
        if ((typeof p == "string" && p !== "") || typeof p == "number")
          return C !== null ? null : u(c, f, "" + p, w);
        if (typeof p == "object" && p !== null) {
          switch (p.$$typeof) {
            case yi:
              return p.key === C ? s(c, f, p, w) : null;
            case kn:
              return p.key === C ? a(c, f, p, w) : null;
            case Pt:
              return ((C = p._init), h(c, f, C(p._payload), w));
          }
          if (hr(p) || or(p)) return C !== null ? null : d(c, f, p, w, null);
          Ii(c, p);
        }
        return null;
      }
      function v(c, f, p, w, C) {
        if ((typeof w == "string" && w !== "") || typeof w == "number")
          return ((c = c.get(p) || null), u(f, c, "" + w, C));
        if (typeof w == "object" && w !== null) {
          switch (w.$$typeof) {
            case yi:
              return (
                (c = c.get(w.key === null ? p : w.key) || null),
                s(f, c, w, C)
              );
            case kn:
              return (
                (c = c.get(w.key === null ? p : w.key) || null),
                a(f, c, w, C)
              );
            case Pt:
              var T = w._init;
              return v(c, f, p, T(w._payload), C);
          }
          if (hr(w) || or(w))
            return ((c = c.get(p) || null), d(f, c, w, C, null));
          Ii(f, w);
        }
        return null;
      }
      function x(c, f, p, w) {
        for (
          var C = null, T = null, P = f, M = (f = 0), E = null;
          P !== null && M < p.length;
          M++
        ) {
          P.index > M ? ((E = P), (P = null)) : (E = P.sibling);
          var L = h(c, P, p[M], w);
          if (L === null) {
            P === null && (P = E);
            break;
          }
          (e && P && L.alternate === null && t(c, P),
            (f = o(L, f, M)),
            T === null ? (C = L) : (T.sibling = L),
            (T = L),
            (P = E));
        }
        if (M === p.length) return (n(c, P), X && en(c, M), C);
        if (P === null) {
          for (; M < p.length; M++)
            ((P = m(c, p[M], w)),
              P !== null &&
                ((f = o(P, f, M)),
                T === null ? (C = P) : (T.sibling = P),
                (T = P)));
          return (X && en(c, M), C);
        }
        for (P = r(c, P); M < p.length; M++)
          ((E = v(P, c, M, p[M], w)),
            E !== null &&
              (e &&
                E.alternate !== null &&
                P.delete(E.key === null ? M : E.key),
              (f = o(E, f, M)),
              T === null ? (C = E) : (T.sibling = E),
              (T = E)));
        return (
          e &&
            P.forEach(function (G) {
              return t(c, G);
            }),
          X && en(c, M),
          C
        );
      }
      function _(c, f, p, w) {
        var C = or(p);
        if (typeof C != "function") throw Error(S(150));
        if (((p = C.call(p)), p == null)) throw Error(S(151));
        for (
          var T = (C = null), P = f, M = (f = 0), E = null, L = p.next();
          P !== null && !L.done;
          M++, L = p.next()
        ) {
          P.index > M ? ((E = P), (P = null)) : (E = P.sibling);
          var G = h(c, P, L.value, w);
          if (G === null) {
            P === null && (P = E);
            break;
          }
          (e && P && G.alternate === null && t(c, P),
            (f = o(G, f, M)),
            T === null ? (C = G) : (T.sibling = G),
            (T = G),
            (P = E));
        }
        if (L.done) return (n(c, P), X && en(c, M), C);
        if (P === null) {
          for (; !L.done; M++, L = p.next())
            ((L = m(c, L.value, w)),
              L !== null &&
                ((f = o(L, f, M)),
                T === null ? (C = L) : (T.sibling = L),
                (T = L)));
          return (X && en(c, M), C);
        }
        for (P = r(c, P); !L.done; M++, L = p.next())
          ((L = v(P, c, M, L.value, w)),
            L !== null &&
              (e &&
                L.alternate !== null &&
                P.delete(L.key === null ? M : L.key),
              (f = o(L, f, M)),
              T === null ? (C = L) : (T.sibling = L),
              (T = L)));
        return (
          e &&
            P.forEach(function (W) {
              return t(c, W);
            }),
          X && en(c, M),
          C
        );
      }
      function N(c, f, p, w) {
        if (
          (typeof p == "object" &&
            p !== null &&
            p.type === En &&
            p.key === null &&
            (p = p.props.children),
          typeof p == "object" && p !== null)
        ) {
          switch (p.$$typeof) {
            case yi:
              e: {
                for (var C = p.key, T = f; T !== null; ) {
                  if (T.key === C) {
                    if (((C = p.type), C === En)) {
                      if (T.tag === 7) {
                        (n(c, T.sibling),
                          (f = i(T, p.props.children)),
                          (f.return = c),
                          (c = f));
                        break e;
                      }
                    } else if (
                      T.elementType === C ||
                      (typeof C == "object" &&
                        C !== null &&
                        C.$$typeof === Pt &&
                        pc(C) === T.type)
                    ) {
                      (n(c, T.sibling),
                        (f = i(T, p.props)),
                        (f.ref = ar(c, T, p)),
                        (f.return = c),
                        (c = f));
                      break e;
                    }
                    n(c, T);
                    break;
                  } else t(c, T);
                  T = T.sibling;
                }
                p.type === En
                  ? ((f = un(p.props.children, c.mode, w, p.key)),
                    (f.return = c),
                    (c = f))
                  : ((w = Wi(p.type, p.key, p.props, null, c.mode, w)),
                    (w.ref = ar(c, f, p)),
                    (w.return = c),
                    (c = w));
              }
              return l(c);
            case kn:
              e: {
                for (T = p.key; f !== null; ) {
                  if (f.key === T)
                    if (
                      f.tag === 4 &&
                      f.stateNode.containerInfo === p.containerInfo &&
                      f.stateNode.implementation === p.implementation
                    ) {
                      (n(c, f.sibling),
                        (f = i(f, p.children || [])),
                        (f.return = c),
                        (c = f));
                      break e;
                    } else {
                      n(c, f);
                      break;
                    }
                  else t(c, f);
                  f = f.sibling;
                }
                ((f = Kl(p, c.mode, w)), (f.return = c), (c = f));
              }
              return l(c);
            case Pt:
              return ((T = p._init), N(c, f, T(p._payload), w));
          }
          if (hr(p)) return x(c, f, p, w);
          if (or(p)) return _(c, f, p, w);
          Ii(c, p);
        }
        return (typeof p == "string" && p !== "") || typeof p == "number"
          ? ((p = "" + p),
            f !== null && f.tag === 6
              ? (n(c, f.sibling), (f = i(f, p)), (f.return = c), (c = f))
              : (n(c, f), (f = Yl(p, c.mode, w)), (f.return = c), (c = f)),
            l(c))
          : n(c, f);
      }
      return N;
    }
    var Qn = $f(!0),
      Uf = $f(!1),
      oo = Xt(null),
      lo = null,
      In = null,
      ls = null;
    function us() {
      ls = In = lo = null;
    }
    function ss(e) {
      var t = oo.current;
      (Q(oo), (e._currentValue = t));
    }
    function Eu(e, t, n) {
      for (; e !== null; ) {
        var r = e.alternate;
        if (
          ((e.childLanes & t) !== t
            ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
            : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function Un(e, t) {
      ((lo = e),
        (ls = In = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          ((e.lanes & t) !== 0 && (ke = !0), (e.firstContext = null)));
    }
    function Be(e) {
      var t = e._currentValue;
      if (ls !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), In === null)) {
          if (lo === null) throw Error(S(308));
          ((In = e), (lo.dependencies = { lanes: 0, firstContext: e }));
        } else In = In.next = e;
      return t;
    }
    var rn = null;
    function as(e) {
      rn === null ? (rn = [e]) : rn.push(e);
    }
    function Vf(e, t, n, r) {
      var i = t.interleaved;
      return (
        i === null ? ((n.next = n), as(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        wt(e, r)
      );
    }
    function wt(e, t) {
      e.lanes |= t;
      var n = e.alternate;
      for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        ((e.childLanes |= t),
          (n = e.alternate),
          n !== null && (n.childLanes |= t),
          (n = e),
          (e = e.return));
      return n.tag === 3 ? n.stateNode : null;
    }
    var Mt = !1;
    function cs(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function Bf(e, t) {
      ((e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects,
          }));
    }
    function vt(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function Ut(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), ($ & 2) !== 0)) {
        var i = r.pending;
        return (
          i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
          (r.pending = t),
          wt(e, n)
        );
      }
      return (
        (i = r.interleaved),
        i === null ? ((t.next = t), as(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        wt(e, n)
      );
    }
    function Ui(e, t, n) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
      ) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), qu(e, n));
      }
    }
    function hc(e, t) {
      var n = e.updateQueue,
        r = e.alternate;
      if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
          o = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var l = {
              eventTime: n.eventTime,
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: n.callback,
              next: null,
            };
            (o === null ? (i = o = l) : (o = o.next = l), (n = n.next));
          } while (n !== null);
          o === null ? (i = o = t) : (o = o.next = t);
        } else i = o = t;
        ((n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: o,
          shared: r.shared,
          effects: r.effects,
        }),
          (e.updateQueue = n));
        return;
      }
      ((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t));
    }
    function uo(e, t, n, r) {
      var i = e.updateQueue;
      Mt = !1;
      var o = i.firstBaseUpdate,
        l = i.lastBaseUpdate,
        u = i.shared.pending;
      if (u !== null) {
        i.shared.pending = null;
        var s = u,
          a = s.next;
        ((s.next = null), l === null ? (o = a) : (l.next = a), (l = s));
        var d = e.alternate;
        d !== null &&
          ((d = d.updateQueue),
          (u = d.lastBaseUpdate),
          u !== l &&
            (u === null ? (d.firstBaseUpdate = a) : (u.next = a),
            (d.lastBaseUpdate = s)));
      }
      if (o !== null) {
        var m = i.baseState;
        ((l = 0), (d = a = s = null), (u = o));
        do {
          var h = u.lane,
            v = u.eventTime;
          if ((r & h) === h) {
            d !== null &&
              (d = d.next =
                {
                  eventTime: v,
                  lane: 0,
                  tag: u.tag,
                  payload: u.payload,
                  callback: u.callback,
                  next: null,
                });
            e: {
              var x = e,
                _ = u;
              switch (((h = t), (v = n), _.tag)) {
                case 1:
                  if (((x = _.payload), typeof x == "function")) {
                    m = x.call(v, m, h);
                    break e;
                  }
                  m = x;
                  break e;
                case 3:
                  x.flags = (x.flags & -65537) | 128;
                case 0:
                  if (
                    ((x = _.payload),
                    (h = typeof x == "function" ? x.call(v, m, h) : x),
                    h == null)
                  )
                    break e;
                  m = q({}, m, h);
                  break e;
                case 2:
                  Mt = !0;
              }
            }
            u.callback !== null &&
              u.lane !== 0 &&
              ((e.flags |= 64),
              (h = i.effects),
              h === null ? (i.effects = [u]) : h.push(u));
          } else
            ((v = {
              eventTime: v,
              lane: h,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            }),
              d === null ? ((a = d = v), (s = m)) : (d = d.next = v),
              (l |= h));
          if (((u = u.next), u === null)) {
            if (((u = i.shared.pending), u === null)) break;
            ((h = u),
              (u = h.next),
              (h.next = null),
              (i.lastBaseUpdate = h),
              (i.shared.pending = null));
          }
        } while (!0);
        if (
          (d === null && (s = m),
          (i.baseState = s),
          (i.firstBaseUpdate = a),
          (i.lastBaseUpdate = d),
          (t = i.shared.interleaved),
          t !== null)
        ) {
          i = t;
          do ((l |= i.lane), (i = i.next));
          while (i !== t);
        } else o === null && (i.shared.lanes = 0);
        ((fn |= l), (e.lanes = l), (e.memoizedState = m));
      }
    }
    function mc(e, t, n) {
      if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
          var r = e[t],
            i = r.callback;
          if (i !== null) {
            if (((r.callback = null), (r = n), typeof i != "function"))
              throw Error(S(191, i));
            i.call(r);
          }
        }
    }
    var Xr = {},
      st = Xt(Xr),
      Rr = Xt(Xr),
      $r = Xt(Xr);
    function on(e) {
      if (e === Xr) throw Error(S(174));
      return e;
    }
    function fs(e, t) {
      switch ((H($r, t), H(Rr, e), H(st, Xr), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : iu(null, "");
          break;
        default:
          ((e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = iu(t, e)));
      }
      (Q(st), H(st, t));
    }
    function Wn() {
      (Q(st), Q(Rr), Q($r));
    }
    function Hf(e) {
      on($r.current);
      var t = on(st.current),
        n = iu(t, e.type);
      t !== n && (H(Rr, e), H(st, n));
    }
    function ds(e) {
      Rr.current === e && (Q(st), Q(Rr));
    }
    var Y = Xt(0);
    function so(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (
            n !== null &&
            ((n = n.dehydrated),
            n === null || n.data === "$?" || n.data === "$!")
          )
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
      return null;
    }
    var Bl = [];
    function ps() {
      for (var e = 0; e < Bl.length; e++)
        Bl[e]._workInProgressVersionPrimary = null;
      Bl.length = 0;
    }
    var Vi = _t.ReactCurrentDispatcher,
      Hl = _t.ReactCurrentBatchConfig,
      cn = 0,
      K = null,
      ne = null,
      oe = null,
      ao = !1,
      Sr = !1,
      Ur = 0,
      P0 = 0;
    function pe() {
      throw Error(S(321));
    }
    function hs(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!be(e[n], t[n])) return !1;
      return !0;
    }
    function ms(e, t, n, r, i, o) {
      if (
        ((cn = o),
        (K = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Vi.current = e === null || e.memoizedState === null ? L0 : D0),
        (e = n(r, i)),
        Sr)
      ) {
        o = 0;
        do {
          if (((Sr = !1), (Ur = 0), 25 <= o)) throw Error(S(301));
          ((o += 1),
            (oe = ne = null),
            (t.updateQueue = null),
            (Vi.current = A0),
            (e = n(r, i)));
        } while (Sr);
      }
      if (
        ((Vi.current = co),
        (t = ne !== null && ne.next !== null),
        (cn = 0),
        (oe = ne = K = null),
        (ao = !1),
        t)
      )
        throw Error(S(300));
      return e;
    }
    function vs() {
      var e = Ur !== 0;
      return ((Ur = 0), e);
    }
    function ot() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (
        oe === null ? (K.memoizedState = oe = e) : (oe = oe.next = e),
        oe
      );
    }
    function He() {
      if (ne === null) {
        var e = K.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = ne.next;
      var t = oe === null ? K.memoizedState : oe.next;
      if (t !== null) ((oe = t), (ne = e));
      else {
        if (e === null) throw Error(S(310));
        ((ne = e),
          (e = {
            memoizedState: ne.memoizedState,
            baseState: ne.baseState,
            baseQueue: ne.baseQueue,
            queue: ne.queue,
            next: null,
          }),
          oe === null ? (K.memoizedState = oe = e) : (oe = oe.next = e));
      }
      return oe;
    }
    function Vr(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function jl(e) {
      var t = He(),
        n = t.queue;
      if (n === null) throw Error(S(311));
      n.lastRenderedReducer = e;
      var r = ne,
        i = r.baseQueue,
        o = n.pending;
      if (o !== null) {
        if (i !== null) {
          var l = i.next;
          ((i.next = o.next), (o.next = l));
        }
        ((r.baseQueue = i = o), (n.pending = null));
      }
      if (i !== null) {
        ((o = i.next), (r = r.baseState));
        var u = (l = null),
          s = null,
          a = o;
        do {
          var d = a.lane;
          if ((cn & d) === d)
            (s !== null &&
              (s = s.next =
                {
                  lane: 0,
                  action: a.action,
                  hasEagerState: a.hasEagerState,
                  eagerState: a.eagerState,
                  next: null,
                }),
              (r = a.hasEagerState ? a.eagerState : e(r, a.action)));
          else {
            var m = {
              lane: d,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            };
            (s === null ? ((u = s = m), (l = r)) : (s = s.next = m),
              (K.lanes |= d),
              (fn |= d));
          }
          a = a.next;
        } while (a !== null && a !== o);
        (s === null ? (l = r) : (s.next = u),
          be(r, t.memoizedState) || (ke = !0),
          (t.memoizedState = r),
          (t.baseState = l),
          (t.baseQueue = s),
          (n.lastRenderedState = r));
      }
      if (((e = n.interleaved), e !== null)) {
        i = e;
        do ((o = i.lane), (K.lanes |= o), (fn |= o), (i = i.next));
        while (i !== e);
      } else i === null && (n.lanes = 0);
      return [t.memoizedState, n.dispatch];
    }
    function Ql(e) {
      var t = He(),
        n = t.queue;
      if (n === null) throw Error(S(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch,
        i = n.pending,
        o = t.memoizedState;
      if (i !== null) {
        n.pending = null;
        var l = (i = i.next);
        do ((o = e(o, l.action)), (l = l.next));
        while (l !== i);
        (be(o, t.memoizedState) || (ke = !0),
          (t.memoizedState = o),
          t.baseQueue === null && (t.baseState = o),
          (n.lastRenderedState = o));
      }
      return [o, r];
    }
    function jf() {}
    function Qf(e, t) {
      var n = K,
        r = He(),
        i = t(),
        o = !be(r.memoizedState, i);
      if (
        (o && ((r.memoizedState = i), (ke = !0)),
        (r = r.queue),
        ys(Yf.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || o || (oe !== null && oe.memoizedState.tag & 1))
      ) {
        if (
          ((n.flags |= 2048),
          Br(9, Xf.bind(null, n, r, i, t), void 0, null),
          le === null)
        )
          throw Error(S(349));
        (cn & 30) !== 0 || Wf(n, t, i);
      }
      return i;
    }
    function Wf(e, t, n) {
      ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = K.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (K.updateQueue = t),
            (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
    }
    function Xf(e, t, n, r) {
      ((t.value = n), (t.getSnapshot = r), Kf(t) && qf(e));
    }
    function Yf(e, t, n) {
      return n(function () {
        Kf(t) && qf(e);
      });
    }
    function Kf(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !be(e, n);
      } catch {
        return !0;
      }
    }
    function qf(e) {
      var t = wt(e, 1);
      t !== null && Je(t, e, 1, -1);
    }
    function vc(e) {
      var t = ot();
      return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Vr,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = I0.bind(null, K, e)),
        [t.memoizedState, e]
      );
    }
    function Br(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = K.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (K.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((n = t.lastEffect),
            n === null
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
      );
    }
    function Gf() {
      return He().memoizedState;
    }
    function Bi(e, t, n, r) {
      var i = ot();
      ((K.flags |= e),
        (i.memoizedState = Br(1 | t, n, void 0, r === void 0 ? null : r)));
    }
    function ko(e, t, n, r) {
      var i = He();
      r = r === void 0 ? null : r;
      var o = void 0;
      if (ne !== null) {
        var l = ne.memoizedState;
        if (((o = l.destroy), r !== null && hs(r, l.deps))) {
          i.memoizedState = Br(t, n, o, r);
          return;
        }
      }
      ((K.flags |= e), (i.memoizedState = Br(1 | t, n, o, r)));
    }
    function yc(e, t) {
      return Bi(8390656, 8, e, t);
    }
    function ys(e, t) {
      return ko(2048, 8, e, t);
    }
    function Zf(e, t) {
      return ko(4, 2, e, t);
    }
    function Jf(e, t) {
      return ko(4, 4, e, t);
    }
    function bf(e, t) {
      if (typeof t == "function")
        return (
          (e = e()),
          t(e),
          function () {
            t(null);
          }
        );
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function ed(e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        ko(4, 4, bf.bind(null, t, e), n)
      );
    }
    function gs() {}
    function td(e, t) {
      var n = He();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && hs(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function nd(e, t) {
      var n = He();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && hs(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function rd(e, t, n) {
      return (cn & 21) === 0
        ? (e.baseState && ((e.baseState = !1), (ke = !0)),
          (e.memoizedState = n))
        : (be(n, t) ||
            ((n = sf()), (K.lanes |= n), (fn |= n), (e.baseState = !0)),
          t);
    }
    function M0(e, t) {
      var n = U;
      ((U = n !== 0 && 4 > n ? n : 4), e(!0));
      var r = Hl.transition;
      Hl.transition = {};
      try {
        (e(!1), t());
      } finally {
        ((U = n), (Hl.transition = r));
      }
    }
    function id() {
      return He().memoizedState;
    }
    function O0(e, t, n) {
      var r = Bt(e);
      if (
        ((n = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        od(e))
      )
        ld(t, n);
      else if (((n = Vf(e, t, n, r)), n !== null)) {
        var i = we();
        (Je(n, e, r, i), ud(n, t, r));
      }
    }
    function I0(e, t, n) {
      var r = Bt(e),
        i = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (od(e)) ld(t, i);
      else {
        var o = e.alternate;
        if (
          e.lanes === 0 &&
          (o === null || o.lanes === 0) &&
          ((o = t.lastRenderedReducer), o !== null)
        )
          try {
            var l = t.lastRenderedState,
              u = o(l, n);
            if (((i.hasEagerState = !0), (i.eagerState = u), be(u, l))) {
              var s = t.interleaved;
              (s === null
                ? ((i.next = i), as(t))
                : ((i.next = s.next), (s.next = i)),
                (t.interleaved = i));
              return;
            }
          } catch {}
        ((n = Vf(e, t, i, r)),
          n !== null && ((i = we()), Je(n, e, r, i), ud(n, t, r)));
      }
    }
    function od(e) {
      var t = e.alternate;
      return e === K || (t !== null && t === K);
    }
    function ld(e, t) {
      Sr = ao = !0;
      var n = e.pending;
      (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t));
    }
    function ud(e, t, n) {
      if ((n & 4194240) !== 0) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), qu(e, n));
      }
    }
    var co = {
        readContext: Be,
        useCallback: pe,
        useContext: pe,
        useEffect: pe,
        useImperativeHandle: pe,
        useInsertionEffect: pe,
        useLayoutEffect: pe,
        useMemo: pe,
        useReducer: pe,
        useRef: pe,
        useState: pe,
        useDebugValue: pe,
        useDeferredValue: pe,
        useTransition: pe,
        useMutableSource: pe,
        useSyncExternalStore: pe,
        useId: pe,
        unstable_isNewReconciler: !1,
      },
      L0 = {
        readContext: Be,
        useCallback: function (e, t) {
          return ((ot().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: Be,
        useEffect: yc,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = n != null ? n.concat([e]) : null),
            Bi(4194308, 4, bf.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Bi(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return Bi(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = ot();
          return (
            (t = t === void 0 ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = ot();
          return (
            (t = n !== void 0 ? n(t) : t),
            (r.memoizedState = r.baseState = t),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: t,
            }),
            (r.queue = e),
            (e = e.dispatch = O0.bind(null, K, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = ot();
          return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: vc,
        useDebugValue: gs,
        useDeferredValue: function (e) {
          return (ot().memoizedState = e);
        },
        useTransition: function () {
          var e = vc(!1),
            t = e[0];
          return ((e = M0.bind(null, e[1])), (ot().memoizedState = e), [t, e]);
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
          var r = K,
            i = ot();
          if (X) {
            if (n === void 0) throw Error(S(407));
            n = n();
          } else {
            if (((n = t()), le === null)) throw Error(S(349));
            (cn & 30) !== 0 || Wf(r, t, n);
          }
          i.memoizedState = n;
          var o = { value: n, getSnapshot: t };
          return (
            (i.queue = o),
            yc(Yf.bind(null, r, o, e), [e]),
            (r.flags |= 2048),
            Br(9, Xf.bind(null, r, o, n, t), void 0, null),
            n
          );
        },
        useId: function () {
          var e = ot(),
            t = le.identifierPrefix;
          if (X) {
            var n = mt,
              r = ht;
            ((n = (r & ~(1 << (32 - Ze(r) - 1))).toString(32) + n),
              (t = ":" + t + "R" + n),
              (n = Ur++),
              0 < n && (t += "H" + n.toString(32)),
              (t += ":"));
          } else ((n = P0++), (t = ":" + t + "r" + n.toString(32) + ":"));
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      D0 = {
        readContext: Be,
        useCallback: td,
        useContext: Be,
        useEffect: ys,
        useImperativeHandle: ed,
        useInsertionEffect: Zf,
        useLayoutEffect: Jf,
        useMemo: nd,
        useReducer: jl,
        useRef: Gf,
        useState: function () {
          return jl(Vr);
        },
        useDebugValue: gs,
        useDeferredValue: function (e) {
          var t = He();
          return rd(t, ne.memoizedState, e);
        },
        useTransition: function () {
          var e = jl(Vr)[0],
            t = He().memoizedState;
          return [e, t];
        },
        useMutableSource: jf,
        useSyncExternalStore: Qf,
        useId: id,
        unstable_isNewReconciler: !1,
      },
      A0 = {
        readContext: Be,
        useCallback: td,
        useContext: Be,
        useEffect: ys,
        useImperativeHandle: ed,
        useInsertionEffect: Zf,
        useLayoutEffect: Jf,
        useMemo: nd,
        useReducer: Ql,
        useRef: Gf,
        useState: function () {
          return Ql(Vr);
        },
        useDebugValue: gs,
        useDeferredValue: function (e) {
          var t = He();
          return ne === null
            ? (t.memoizedState = e)
            : rd(t, ne.memoizedState, e);
        },
        useTransition: function () {
          var e = Ql(Vr)[0],
            t = He().memoizedState;
          return [e, t];
        },
        useMutableSource: jf,
        useSyncExternalStore: Qf,
        useId: id,
        unstable_isNewReconciler: !1,
      };
    function Ke(e, t) {
      if (e && e.defaultProps) {
        ((t = q({}, t)), (e = e.defaultProps));
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    function Nu(e, t, n, r) {
      ((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : q({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
    }
    var Eo = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? hn(e) === e : !1;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = we(),
          i = Bt(e),
          o = vt(r, i);
        ((o.payload = t),
          n != null && (o.callback = n),
          (t = Ut(e, o, i)),
          t !== null && (Je(t, e, i, r), Ui(t, e, i)));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = we(),
          i = Bt(e),
          o = vt(r, i);
        ((o.tag = 1),
          (o.payload = t),
          n != null && (o.callback = n),
          (t = Ut(e, o, i)),
          t !== null && (Je(t, e, i, r), Ui(t, e, i)));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = we(),
          r = Bt(e),
          i = vt(n, r);
        ((i.tag = 2),
          t != null && (i.callback = t),
          (t = Ut(e, i, r)),
          t !== null && (Je(t, e, r, n), Ui(t, e, r)));
      },
    };
    function gc(e, t, n, r, i, o, l) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
          ? e.shouldComponentUpdate(r, o, l)
          : t.prototype && t.prototype.isPureReactComponent
            ? !Lr(n, r) || !Lr(i, o)
            : !0
      );
    }
    function sd(e, t, n) {
      var r = !1,
        i = Qt,
        o = t.contextType;
      return (
        typeof o == "object" && o !== null
          ? (o = Be(o))
          : ((i = Ne(t) ? sn : ve.current),
            (r = t.contextTypes),
            (o = (r = r != null) ? Hn(e, i) : Qt)),
        (t = new t(n, o)),
        (e.memoizedState =
          t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = Eo),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = i),
          (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
      );
    }
    function wc(e, t, n, r) {
      ((e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
          t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Eo.enqueueReplaceState(t, t.state, null));
    }
    function Cu(e, t, n, r) {
      var i = e.stateNode;
      ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), cs(e));
      var o = t.contextType;
      (typeof o == "object" && o !== null
        ? (i.context = Be(o))
        : ((o = Ne(t) ? sn : ve.current), (i.context = Hn(e, o))),
        (i.state = e.memoizedState),
        (o = t.getDerivedStateFromProps),
        typeof o == "function" && (Nu(e, t, o, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function" ||
          (typeof i.UNSAFE_componentWillMount != "function" &&
            typeof i.componentWillMount != "function") ||
          ((t = i.state),
          typeof i.componentWillMount == "function" && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == "function" &&
            i.UNSAFE_componentWillMount(),
          t !== i.state && Eo.enqueueReplaceState(i, i.state, null),
          uo(e, n, i, r),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == "function" && (e.flags |= 4194308));
    }
    function Xn(e, t) {
      try {
        var n = "",
          r = t;
        do ((n += fm(r)), (r = r.return));
        while (r);
        var i = n;
      } catch (o) {
        i =
          `
Error generating stack: ` +
          o.message +
          `
` +
          o.stack;
      }
      return { value: e, source: t, stack: i, digest: null };
    }
    function Wl(e, t, n) {
      return { value: e, source: null, stack: n ?? null, digest: t ?? null };
    }
    function Tu(e, t) {
      try {
        console.error(t.value);
      } catch (n) {
        setTimeout(function () {
          throw n;
        });
      }
    }
    var F0 = typeof WeakMap == "function" ? WeakMap : Map;
    function ad(e, t, n) {
      ((n = vt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
      var r = t.value;
      return (
        (n.callback = function () {
          (po || ((po = !0), (Ru = r)), Tu(e, t));
        }),
        n
      );
    }
    function cd(e, t, n) {
      ((n = vt(-1, n)), (n.tag = 3));
      var r = e.type.getDerivedStateFromError;
      if (typeof r == "function") {
        var i = t.value;
        ((n.payload = function () {
          return r(i);
        }),
          (n.callback = function () {
            Tu(e, t);
          }));
      }
      var o = e.stateNode;
      return (
        o !== null &&
          typeof o.componentDidCatch == "function" &&
          (n.callback = function () {
            (Tu(e, t),
              typeof r != "function" &&
                (Vt === null ? (Vt = new Set([this])) : Vt.add(this)));
            var l = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: l !== null ? l : "",
            });
          }),
        n
      );
    }
    function xc(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new F0();
        var i = new Set();
        r.set(t, i);
      } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
      i.has(n) || (i.add(n), (e = G0.bind(null, e, t, n)), t.then(e, e));
    }
    function _c(e) {
      do {
        var t;
        if (
          ((t = e.tag === 13) &&
            ((t = e.memoizedState),
            (t = t !== null ? t.dehydrated !== null : !0)),
          t)
        )
          return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function Sc(e, t, n, r, i) {
      return (e.mode & 1) === 0
        ? (e === t
            ? (e.flags |= 65536)
            : ((e.flags |= 128),
              (n.flags |= 131072),
              (n.flags &= -52805),
              n.tag === 1 &&
                (n.alternate === null
                  ? (n.tag = 17)
                  : ((t = vt(-1, 1)), (t.tag = 2), Ut(n, t, 1))),
              (n.lanes |= 1)),
          e)
        : ((e.flags |= 65536), (e.lanes = i), e);
    }
    var R0 = _t.ReactCurrentOwner,
      ke = !1;
    function ge(e, t, n, r) {
      t.child = e === null ? Uf(t, null, n, r) : Qn(t, e.child, n, r);
    }
    function kc(e, t, n, r, i) {
      n = n.render;
      var o = t.ref;
      return (
        Un(t, i),
        (r = ms(e, t, n, r, o, i)),
        (n = vs()),
        e !== null && !ke
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~i),
            xt(e, t, i))
          : (X && n && rs(t), (t.flags |= 1), ge(e, t, r, i), t.child)
      );
    }
    function Ec(e, t, n, r, i) {
      if (e === null) {
        var o = n.type;
        return typeof o == "function" &&
          !Cs(o) &&
          o.defaultProps === void 0 &&
          n.compare === null &&
          n.defaultProps === void 0
          ? ((t.tag = 15), (t.type = o), fd(e, t, o, r, i))
          : ((e = Wi(n.type, null, r, t, t.mode, i)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((o = e.child), (e.lanes & i) === 0)) {
        var l = o.memoizedProps;
        if (
          ((n = n.compare),
          (n = n !== null ? n : Lr),
          n(l, r) && e.ref === t.ref)
        )
          return xt(e, t, i);
      }
      return (
        (t.flags |= 1),
        (e = Ht(o, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function fd(e, t, n, r, i) {
      if (e !== null) {
        var o = e.memoizedProps;
        if (Lr(o, r) && e.ref === t.ref)
          if (((ke = !1), (t.pendingProps = r = o), (e.lanes & i) !== 0))
            (e.flags & 131072) !== 0 && (ke = !0);
          else return ((t.lanes = e.lanes), xt(e, t, i));
      }
      return zu(e, t, n, r, i);
    }
    function dd(e, t, n) {
      var r = t.pendingProps,
        i = r.children,
        o = e !== null ? e.memoizedState : null;
      if (r.mode === "hidden")
        if ((t.mode & 1) === 0)
          ((t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            H(Dn, Pe),
            (Pe |= n));
        else {
          if ((n & 1073741824) === 0)
            return (
              (e = o !== null ? o.baseLanes | n : n),
              (t.lanes = t.childLanes = 1073741824),
              (t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null,
              }),
              (t.updateQueue = null),
              H(Dn, Pe),
              (Pe |= e),
              null
            );
          ((t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (r = o !== null ? o.baseLanes : n),
            H(Dn, Pe),
            (Pe |= r));
        }
      else
        (o !== null
          ? ((r = o.baseLanes | n), (t.memoizedState = null))
          : (r = n),
          H(Dn, Pe),
          (Pe |= r));
      return (ge(e, t, i, n), t.child);
    }
    function pd(e, t) {
      var n = t.ref;
      ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function zu(e, t, n, r, i) {
      var o = Ne(n) ? sn : ve.current;
      return (
        (o = Hn(t, o)),
        Un(t, i),
        (n = ms(e, t, n, r, o, i)),
        (r = vs()),
        e !== null && !ke
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~i),
            xt(e, t, i))
          : (X && r && rs(t), (t.flags |= 1), ge(e, t, n, i), t.child)
      );
    }
    function Nc(e, t, n, r, i) {
      if (Ne(n)) {
        var o = !0;
        no(t);
      } else o = !1;
      if ((Un(t, i), t.stateNode === null))
        (Hi(e, t), sd(t, n, r), Cu(t, n, r, i), (r = !0));
      else if (e === null) {
        var l = t.stateNode,
          u = t.memoizedProps;
        l.props = u;
        var s = l.context,
          a = n.contextType;
        typeof a == "object" && a !== null
          ? (a = Be(a))
          : ((a = Ne(n) ? sn : ve.current), (a = Hn(t, a)));
        var d = n.getDerivedStateFromProps,
          m =
            typeof d == "function" ||
            typeof l.getSnapshotBeforeUpdate == "function";
        (m ||
          (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
            typeof l.componentWillReceiveProps != "function") ||
          ((u !== r || s !== a) && wc(t, l, r, a)),
          (Mt = !1));
        var h = t.memoizedState;
        ((l.state = h),
          uo(t, r, l, i),
          (s = t.memoizedState),
          u !== r || h !== s || Ee.current || Mt
            ? (typeof d == "function" &&
                (Nu(t, n, d, r), (s = t.memoizedState)),
              (u = Mt || gc(t, n, u, r, h, s, a))
                ? (m ||
                    (typeof l.UNSAFE_componentWillMount != "function" &&
                      typeof l.componentWillMount != "function") ||
                    (typeof l.componentWillMount == "function" &&
                      l.componentWillMount(),
                    typeof l.UNSAFE_componentWillMount == "function" &&
                      l.UNSAFE_componentWillMount()),
                  typeof l.componentDidMount == "function" &&
                    (t.flags |= 4194308))
                : (typeof l.componentDidMount == "function" &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = s)),
              (l.props = r),
              (l.state = s),
              (l.context = a),
              (r = u))
            : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
              (r = !1)));
      } else {
        ((l = t.stateNode),
          Bf(e, t),
          (u = t.memoizedProps),
          (a = t.type === t.elementType ? u : Ke(t.type, u)),
          (l.props = a),
          (m = t.pendingProps),
          (h = l.context),
          (s = n.contextType),
          typeof s == "object" && s !== null
            ? (s = Be(s))
            : ((s = Ne(n) ? sn : ve.current), (s = Hn(t, s))));
        var v = n.getDerivedStateFromProps;
        ((d =
          typeof v == "function" ||
          typeof l.getSnapshotBeforeUpdate == "function") ||
          (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
            typeof l.componentWillReceiveProps != "function") ||
          ((u !== m || h !== s) && wc(t, l, r, s)),
          (Mt = !1),
          (h = t.memoizedState),
          (l.state = h),
          uo(t, r, l, i));
        var x = t.memoizedState;
        u !== m || h !== x || Ee.current || Mt
          ? (typeof v == "function" && (Nu(t, n, v, r), (x = t.memoizedState)),
            (a = Mt || gc(t, n, a, r, h, x, s) || !1)
              ? (d ||
                  (typeof l.UNSAFE_componentWillUpdate != "function" &&
                    typeof l.componentWillUpdate != "function") ||
                  (typeof l.componentWillUpdate == "function" &&
                    l.componentWillUpdate(r, x, s),
                  typeof l.UNSAFE_componentWillUpdate == "function" &&
                    l.UNSAFE_componentWillUpdate(r, x, s)),
                typeof l.componentDidUpdate == "function" && (t.flags |= 4),
                typeof l.getSnapshotBeforeUpdate == "function" &&
                  (t.flags |= 1024))
              : (typeof l.componentDidUpdate != "function" ||
                  (u === e.memoizedProps && h === e.memoizedState) ||
                  (t.flags |= 4),
                typeof l.getSnapshotBeforeUpdate != "function" ||
                  (u === e.memoizedProps && h === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = x)),
            (l.props = r),
            (l.state = x),
            (l.context = s),
            (r = a))
          : (typeof l.componentDidUpdate != "function" ||
              (u === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1));
      }
      return Pu(e, t, n, r, o, i);
    }
    function Pu(e, t, n, r, i, o) {
      pd(e, t);
      var l = (t.flags & 128) !== 0;
      if (!r && !l) return (i && cc(t, n, !1), xt(e, t, o));
      ((r = t.stateNode), (R0.current = t));
      var u =
        l && typeof n.getDerivedStateFromError != "function"
          ? null
          : r.render();
      return (
        (t.flags |= 1),
        e !== null && l
          ? ((t.child = Qn(t, e.child, null, o)), (t.child = Qn(t, null, u, o)))
          : ge(e, t, u, o),
        (t.memoizedState = r.state),
        i && cc(t, n, !0),
        t.child
      );
    }
    function hd(e) {
      var t = e.stateNode;
      (t.pendingContext
        ? ac(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && ac(e, t.context, !1),
        fs(e, t.containerInfo));
    }
    function Cc(e, t, n, r, i) {
      return (jn(), os(i), (t.flags |= 256), ge(e, t, n, r), t.child);
    }
    var Mu = { dehydrated: null, treeContext: null, retryLane: 0 };
    function Ou(e) {
      return { baseLanes: e, cachePool: null, transitions: null };
    }
    function md(e, t, n) {
      var r = t.pendingProps,
        i = Y.current,
        o = !1,
        l = (t.flags & 128) !== 0,
        u;
      if (
        ((u = l) ||
          (u = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
        u
          ? ((o = !0), (t.flags &= -129))
          : (e === null || e.memoizedState !== null) && (i |= 1),
        H(Y, i & 1),
        e === null)
      )
        return (
          ku(t),
          (e = t.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)
            ? ((t.mode & 1) === 0
                ? (t.lanes = 1)
                : e.data === "$!"
                  ? (t.lanes = 8)
                  : (t.lanes = 1073741824),
              null)
            : ((l = r.children),
              (e = r.fallback),
              o
                ? ((r = t.mode),
                  (o = t.child),
                  (l = { mode: "hidden", children: l }),
                  (r & 1) === 0 && o !== null
                    ? ((o.childLanes = 0), (o.pendingProps = l))
                    : (o = To(l, r, 0, null)),
                  (e = un(e, r, n, null)),
                  (o.return = t),
                  (e.return = t),
                  (o.sibling = e),
                  (t.child = o),
                  (t.child.memoizedState = Ou(n)),
                  (t.memoizedState = Mu),
                  e)
                : ws(t, l))
        );
      if (
        ((i = e.memoizedState), i !== null && ((u = i.dehydrated), u !== null))
      )
        return $0(e, t, l, r, u, i, n);
      if (o) {
        ((o = r.fallback), (l = t.mode), (i = e.child), (u = i.sibling));
        var s = { mode: "hidden", children: r.children };
        return (
          (l & 1) === 0 && t.child !== i
            ? ((r = t.child),
              (r.childLanes = 0),
              (r.pendingProps = s),
              (t.deletions = null))
            : ((r = Ht(i, s)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
          u !== null
            ? (o = Ht(u, o))
            : ((o = un(o, l, n, null)), (o.flags |= 2)),
          (o.return = t),
          (r.return = t),
          (r.sibling = o),
          (t.child = r),
          (r = o),
          (o = t.child),
          (l = e.child.memoizedState),
          (l =
            l === null
              ? Ou(n)
              : {
                  baseLanes: l.baseLanes | n,
                  cachePool: null,
                  transitions: l.transitions,
                }),
          (o.memoizedState = l),
          (o.childLanes = e.childLanes & ~n),
          (t.memoizedState = Mu),
          r
        );
      }
      return (
        (o = e.child),
        (e = o.sibling),
        (r = Ht(o, { mode: "visible", children: r.children })),
        (t.mode & 1) === 0 && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
          ((n = t.deletions),
          n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
      );
    }
    function ws(e, t) {
      return (
        (t = To({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
      );
    }
    function Li(e, t, n, r) {
      return (
        r !== null && os(r),
        Qn(t, e.child, null, n),
        (e = ws(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function $0(e, t, n, r, i, o, l) {
      if (n)
        return t.flags & 256
          ? ((t.flags &= -257), (r = Wl(Error(S(422)))), Li(e, t, l, r))
          : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((o = r.fallback),
              (i = t.mode),
              (r = To({ mode: "visible", children: r.children }, i, 0, null)),
              (o = un(o, i, l, null)),
              (o.flags |= 2),
              (r.return = t),
              (o.return = t),
              (r.sibling = o),
              (t.child = r),
              (t.mode & 1) !== 0 && Qn(t, e.child, null, l),
              (t.child.memoizedState = Ou(l)),
              (t.memoizedState = Mu),
              o);
      if ((t.mode & 1) === 0) return Li(e, t, l, null);
      if (i.data === "$!") {
        if (((r = i.nextSibling && i.nextSibling.dataset), r)) var u = r.dgst;
        return (
          (r = u),
          (o = Error(S(419))),
          (r = Wl(o, r, void 0)),
          Li(e, t, l, r)
        );
      }
      if (((u = (l & e.childLanes) !== 0), ke || u)) {
        if (((r = le), r !== null)) {
          switch (l & -l) {
            case 4:
              i = 2;
              break;
            case 16:
              i = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              i = 32;
              break;
            case 536870912:
              i = 268435456;
              break;
            default:
              i = 0;
          }
          ((i = (i & (r.suspendedLanes | l)) !== 0 ? 0 : i),
            i !== 0 &&
              i !== o.retryLane &&
              ((o.retryLane = i), wt(e, i), Je(r, e, i, -1)));
        }
        return (Ns(), (r = Wl(Error(S(421)))), Li(e, t, l, r));
      }
      return i.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = Z0.bind(null, e)),
          (i._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (Me = $t(i.nextSibling)),
          (Oe = t),
          (X = !0),
          (Ge = null),
          e !== null &&
            ((Re[$e++] = ht),
            (Re[$e++] = mt),
            (Re[$e++] = an),
            (ht = e.id),
            (mt = e.overflow),
            (an = t)),
          (t = ws(t, r.children)),
          (t.flags |= 4096),
          t);
    }
    function Tc(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      (r !== null && (r.lanes |= t), Eu(e.return, t, n));
    }
    function Xl(e, t, n, r, i) {
      var o = e.memoizedState;
      o === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: i,
          })
        : ((o.isBackwards = t),
          (o.rendering = null),
          (o.renderingStartTime = 0),
          (o.last = r),
          (o.tail = n),
          (o.tailMode = i));
    }
    function vd(e, t, n) {
      var r = t.pendingProps,
        i = r.revealOrder,
        o = r.tail;
      if ((ge(e, t, r.children, n), (r = Y.current), (r & 2) !== 0))
        ((r = (r & 1) | 2), (t.flags |= 128));
      else {
        if (e !== null && (e.flags & 128) !== 0)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13) e.memoizedState !== null && Tc(e, n, t);
            else if (e.tag === 19) Tc(e, n, t);
            else if (e.child !== null) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break e;
              e = e.return;
            }
            ((e.sibling.return = e.return), (e = e.sibling));
          }
        r &= 1;
      }
      if ((H(Y, r), (t.mode & 1) === 0)) t.memoizedState = null;
      else
        switch (i) {
          case "forwards":
            for (n = t.child, i = null; n !== null; )
              ((e = n.alternate),
                e !== null && so(e) === null && (i = n),
                (n = n.sibling));
            ((n = i),
              n === null
                ? ((i = t.child), (t.child = null))
                : ((i = n.sibling), (n.sibling = null)),
              Xl(t, !1, i, n, o));
            break;
          case "backwards":
            for (n = null, i = t.child, t.child = null; i !== null; ) {
              if (((e = i.alternate), e !== null && so(e) === null)) {
                t.child = i;
                break;
              }
              ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
            }
            Xl(t, !0, n, null, o);
            break;
          case "together":
            Xl(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Hi(e, t) {
      (t.mode & 1) === 0 &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function xt(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (fn |= t.lanes),
        (n & t.childLanes) === 0)
      )
        return null;
      if (e !== null && t.child !== e.child) throw Error(S(153));
      if (t.child !== null) {
        for (
          e = t.child, n = Ht(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;
        )
          ((e = e.sibling),
            (n = n.sibling = Ht(e, e.pendingProps)),
            (n.return = t));
        n.sibling = null;
      }
      return t.child;
    }
    function U0(e, t, n) {
      switch (t.tag) {
        case 3:
          (hd(t), jn());
          break;
        case 5:
          Hf(t);
          break;
        case 1:
          Ne(t.type) && no(t);
          break;
        case 4:
          fs(t, t.stateNode.containerInfo);
          break;
        case 10:
          var r = t.type._context,
            i = t.memoizedProps.value;
          (H(oo, r._currentValue), (r._currentValue = i));
          break;
        case 13:
          if (((r = t.memoizedState), r !== null))
            return r.dehydrated !== null
              ? (H(Y, Y.current & 1), (t.flags |= 128), null)
              : (n & t.child.childLanes) !== 0
                ? md(e, t, n)
                : (H(Y, Y.current & 1),
                  (e = xt(e, t, n)),
                  e !== null ? e.sibling : null);
          H(Y, Y.current & 1);
          break;
        case 19:
          if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
            if (r) return vd(e, t, n);
            t.flags |= 128;
          }
          if (
            ((i = t.memoizedState),
            i !== null &&
              ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
            H(Y, Y.current),
            r)
          )
            break;
          return null;
        case 22:
        case 23:
          return ((t.lanes = 0), dd(e, t, n));
      }
      return xt(e, t, n);
    }
    var yd, Iu, gd, wd;
    yd = function (e, t) {
      for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
          ((n.child.return = n), (n = n.child));
          continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    };
    Iu = function () {};
    gd = function (e, t, n, r) {
      var i = e.memoizedProps;
      if (i !== r) {
        ((e = t.stateNode), on(st.current));
        var o = null;
        switch (n) {
          case "input":
            ((i = eu(e, i)), (r = eu(e, r)), (o = []));
            break;
          case "select":
            ((i = q({}, i, { value: void 0 })),
              (r = q({}, r, { value: void 0 })),
              (o = []));
            break;
          case "textarea":
            ((i = ru(e, i)), (r = ru(e, r)), (o = []));
            break;
          default:
            typeof i.onClick != "function" &&
              typeof r.onClick == "function" &&
              (e.onclick = eo);
        }
        ou(n, r);
        var l;
        n = null;
        for (a in i)
          if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && i[a] != null)
            if (a === "style") {
              var u = i[a];
              for (l in u) u.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
            } else
              a !== "dangerouslySetInnerHTML" &&
                a !== "children" &&
                a !== "suppressContentEditableWarning" &&
                a !== "suppressHydrationWarning" &&
                a !== "autoFocus" &&
                (Cr.hasOwnProperty(a)
                  ? o || (o = [])
                  : (o = o || []).push(a, null));
        for (a in r) {
          var s = r[a];
          if (
            ((u = i?.[a]),
            r.hasOwnProperty(a) && s !== u && (s != null || u != null))
          )
            if (a === "style")
              if (u) {
                for (l in u)
                  !u.hasOwnProperty(l) ||
                    (s && s.hasOwnProperty(l)) ||
                    (n || (n = {}), (n[l] = ""));
                for (l in s)
                  s.hasOwnProperty(l) &&
                    u[l] !== s[l] &&
                    (n || (n = {}), (n[l] = s[l]));
              } else (n || (o || (o = []), o.push(a, n)), (n = s));
            else
              a === "dangerouslySetInnerHTML"
                ? ((s = s ? s.__html : void 0),
                  (u = u ? u.__html : void 0),
                  s != null && u !== s && (o = o || []).push(a, s))
                : a === "children"
                  ? (typeof s != "string" && typeof s != "number") ||
                    (o = o || []).push(a, "" + s)
                  : a !== "suppressContentEditableWarning" &&
                    a !== "suppressHydrationWarning" &&
                    (Cr.hasOwnProperty(a)
                      ? (s != null && a === "onScroll" && j("scroll", e),
                        o || u === s || (o = []))
                      : (o = o || []).push(a, s));
        }
        n && (o = o || []).push("style", n);
        var a = o;
        (t.updateQueue = a) && (t.flags |= 4);
      }
    };
    wd = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    };
    function cr(e, t) {
      if (!X)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
              (t.alternate !== null && (n = t), (t = t.sibling));
            n === null ? (e.tail = null) : (n.sibling = null);
            break;
          case "collapsed":
            n = e.tail;
            for (var r = null; n !== null; )
              (n.alternate !== null && (r = n), (n = n.sibling));
            r === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
    }
    function he(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
      if (t)
        for (var i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags & 14680064),
            (r |= i.flags & 14680064),
            (i.return = e),
            (i = i.sibling));
      else
        for (i = e.child; i !== null; )
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags),
            (r |= i.flags),
            (i.return = e),
            (i = i.sibling));
      return ((e.subtreeFlags |= r), (e.childLanes = n), t);
    }
    function V0(e, t, n) {
      var r = t.pendingProps;
      switch ((is(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (he(t), null);
        case 1:
          return (Ne(t.type) && to(), he(t), null);
        case 3:
          return (
            (r = t.stateNode),
            Wn(),
            Q(Ee),
            Q(ve),
            ps(),
            r.pendingContext &&
              ((r.context = r.pendingContext), (r.pendingContext = null)),
            (e === null || e.child === null) &&
              (Oi(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                  ((t.flags |= 1024), Ge !== null && (Vu(Ge), (Ge = null)))),
            Iu(e, t),
            he(t),
            null
          );
        case 5:
          ds(t);
          var i = on($r.current);
          if (((n = t.type), e !== null && t.stateNode != null))
            (gd(e, t, n, r, i),
              e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(S(166));
              return (he(t), null);
            }
            if (((e = on(st.current)), Oi(t))) {
              ((r = t.stateNode), (n = t.type));
              var o = t.memoizedProps;
              switch (((r[lt] = t), (r[Fr] = o), (e = (t.mode & 1) !== 0), n)) {
                case "dialog":
                  (j("cancel", r), j("close", r));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  j("load", r);
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < vr.length; i++) j(vr[i], r);
                  break;
                case "source":
                  j("error", r);
                  break;
                case "img":
                case "image":
                case "link":
                  (j("error", r), j("load", r));
                  break;
                case "details":
                  j("toggle", r);
                  break;
                case "input":
                  (Aa(r, o), j("invalid", r));
                  break;
                case "select":
                  ((r._wrapperState = { wasMultiple: !!o.multiple }),
                    j("invalid", r));
                  break;
                case "textarea":
                  (Ra(r, o), j("invalid", r));
              }
              (ou(n, o), (i = null));
              for (var l in o)
                if (o.hasOwnProperty(l)) {
                  var u = o[l];
                  l === "children"
                    ? typeof u == "string"
                      ? r.textContent !== u &&
                        (o.suppressHydrationWarning !== !0 &&
                          Mi(r.textContent, u, e),
                        (i = ["children", u]))
                      : typeof u == "number" &&
                        r.textContent !== "" + u &&
                        (o.suppressHydrationWarning !== !0 &&
                          Mi(r.textContent, u, e),
                        (i = ["children", "" + u]))
                    : Cr.hasOwnProperty(l) &&
                      u != null &&
                      l === "onScroll" &&
                      j("scroll", r);
                }
              switch (n) {
                case "input":
                  (gi(r), Fa(r, o, !0));
                  break;
                case "textarea":
                  (gi(r), $a(r));
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof o.onClick == "function" && (r.onclick = eo);
              }
              ((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4));
            } else {
              ((l = i.nodeType === 9 ? i : i.ownerDocument),
                e === "http://www.w3.org/1999/xhtml" && (e = Xc(n)),
                e === "http://www.w3.org/1999/xhtml"
                  ? n === "script"
                    ? ((e = l.createElement("div")),
                      (e.innerHTML = "<script><\/script>"),
                      (e = e.removeChild(e.firstChild)))
                    : typeof r.is == "string"
                      ? (e = l.createElement(n, { is: r.is }))
                      : ((e = l.createElement(n)),
                        n === "select" &&
                          ((l = e),
                          r.multiple
                            ? (l.multiple = !0)
                            : r.size && (l.size = r.size)))
                  : (e = l.createElementNS(e, n)),
                (e[lt] = t),
                (e[Fr] = r),
                yd(e, t, !1, !1),
                (t.stateNode = e));
              e: {
                switch (((l = lu(n, r)), n)) {
                  case "dialog":
                    (j("cancel", e), j("close", e), (i = r));
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    (j("load", e), (i = r));
                    break;
                  case "video":
                  case "audio":
                    for (i = 0; i < vr.length; i++) j(vr[i], e);
                    i = r;
                    break;
                  case "source":
                    (j("error", e), (i = r));
                    break;
                  case "img":
                  case "image":
                  case "link":
                    (j("error", e), j("load", e), (i = r));
                    break;
                  case "details":
                    (j("toggle", e), (i = r));
                    break;
                  case "input":
                    (Aa(e, r), (i = eu(e, r)), j("invalid", e));
                    break;
                  case "option":
                    i = r;
                    break;
                  case "select":
                    ((e._wrapperState = { wasMultiple: !!r.multiple }),
                      (i = q({}, r, { value: void 0 })),
                      j("invalid", e));
                    break;
                  case "textarea":
                    (Ra(e, r), (i = ru(e, r)), j("invalid", e));
                    break;
                  default:
                    i = r;
                }
                (ou(n, i), (u = i));
                for (o in u)
                  if (u.hasOwnProperty(o)) {
                    var s = u[o];
                    o === "style"
                      ? qc(e, s)
                      : o === "dangerouslySetInnerHTML"
                        ? ((s = s ? s.__html : void 0), s != null && Yc(e, s))
                        : o === "children"
                          ? typeof s == "string"
                            ? (n !== "textarea" || s !== "") && Tr(e, s)
                            : typeof s == "number" && Tr(e, "" + s)
                          : o !== "suppressContentEditableWarning" &&
                            o !== "suppressHydrationWarning" &&
                            o !== "autoFocus" &&
                            (Cr.hasOwnProperty(o)
                              ? s != null && o === "onScroll" && j("scroll", e)
                              : s != null && ju(e, o, s, l));
                  }
                switch (n) {
                  case "input":
                    (gi(e), Fa(e, r, !1));
                    break;
                  case "textarea":
                    (gi(e), $a(e));
                    break;
                  case "option":
                    r.value != null &&
                      e.setAttribute("value", "" + jt(r.value));
                    break;
                  case "select":
                    ((e.multiple = !!r.multiple),
                      (o = r.value),
                      o != null
                        ? An(e, !!r.multiple, o, !1)
                        : r.defaultValue != null &&
                          An(e, !!r.multiple, r.defaultValue, !0));
                    break;
                  default:
                    typeof i.onClick == "function" && (e.onclick = eo);
                }
                switch (n) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    r = !!r.autoFocus;
                    break e;
                  case "img":
                    r = !0;
                    break e;
                  default:
                    r = !1;
                }
              }
              r && (t.flags |= 4);
            }
            t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
          }
          return (he(t), null);
        case 6:
          if (e && t.stateNode != null) wd(e, t, e.memoizedProps, r);
          else {
            if (typeof r != "string" && t.stateNode === null)
              throw Error(S(166));
            if (((n = on($r.current)), on(st.current), Oi(t))) {
              if (
                ((r = t.stateNode),
                (n = t.memoizedProps),
                (r[lt] = t),
                (o = r.nodeValue !== n) && ((e = Oe), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    Mi(r.nodeValue, n, (e.mode & 1) !== 0);
                    break;
                  case 5:
                    e.memoizedProps.suppressHydrationWarning !== !0 &&
                      Mi(r.nodeValue, n, (e.mode & 1) !== 0);
                }
              o && (t.flags |= 4);
            } else
              ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
                (r[lt] = t),
                (t.stateNode = r));
          }
          return (he(t), null);
        case 13:
          if (
            (Q(Y),
            (r = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (X && Me !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
              (Rf(), jn(), (t.flags |= 98560), (o = !1));
            else if (((o = Oi(t)), r !== null && r.dehydrated !== null)) {
              if (e === null) {
                if (!o) throw Error(S(318));
                if (
                  ((o = t.memoizedState),
                  (o = o !== null ? o.dehydrated : null),
                  !o)
                )
                  throw Error(S(317));
                o[lt] = t;
              } else
                (jn(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4));
              (he(t), (o = !1));
            } else (Ge !== null && (Vu(Ge), (Ge = null)), (o = !0));
            if (!o) return t.flags & 65536 ? t : null;
          }
          return (t.flags & 128) !== 0
            ? ((t.lanes = n), t)
            : ((r = r !== null),
              r !== (e !== null && e.memoizedState !== null) &&
                r &&
                ((t.child.flags |= 8192),
                (t.mode & 1) !== 0 &&
                  (e === null || (Y.current & 1) !== 0
                    ? re === 0 && (re = 3)
                    : Ns())),
              t.updateQueue !== null && (t.flags |= 4),
              he(t),
              null);
        case 4:
          return (
            Wn(),
            Iu(e, t),
            e === null && Dr(t.stateNode.containerInfo),
            he(t),
            null
          );
        case 10:
          return (ss(t.type._context), he(t), null);
        case 17:
          return (Ne(t.type) && to(), he(t), null);
        case 19:
          if ((Q(Y), (o = t.memoizedState), o === null)) return (he(t), null);
          if (((r = (t.flags & 128) !== 0), (l = o.rendering), l === null))
            if (r) cr(o, !1);
            else {
              if (re !== 0 || (e !== null && (e.flags & 128) !== 0))
                for (e = t.child; e !== null; ) {
                  if (((l = so(e)), l !== null)) {
                    for (
                      t.flags |= 128,
                        cr(o, !1),
                        r = l.updateQueue,
                        r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                        t.subtreeFlags = 0,
                        r = n,
                        n = t.child;
                      n !== null;
                    )
                      ((o = n),
                        (e = r),
                        (o.flags &= 14680066),
                        (l = o.alternate),
                        l === null
                          ? ((o.childLanes = 0),
                            (o.lanes = e),
                            (o.child = null),
                            (o.subtreeFlags = 0),
                            (o.memoizedProps = null),
                            (o.memoizedState = null),
                            (o.updateQueue = null),
                            (o.dependencies = null),
                            (o.stateNode = null))
                          : ((o.childLanes = l.childLanes),
                            (o.lanes = l.lanes),
                            (o.child = l.child),
                            (o.subtreeFlags = 0),
                            (o.deletions = null),
                            (o.memoizedProps = l.memoizedProps),
                            (o.memoizedState = l.memoizedState),
                            (o.updateQueue = l.updateQueue),
                            (o.type = l.type),
                            (e = l.dependencies),
                            (o.dependencies =
                              e === null
                                ? null
                                : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext,
                                  })),
                        (n = n.sibling));
                    return (H(Y, (Y.current & 1) | 2), t.child);
                  }
                  e = e.sibling;
                }
              o.tail !== null &&
                ee() > Yn &&
                ((t.flags |= 128), (r = !0), cr(o, !1), (t.lanes = 4194304));
            }
          else {
            if (!r)
              if (((e = so(l)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (r = !0),
                  (n = e.updateQueue),
                  n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                  cr(o, !0),
                  o.tail === null &&
                    o.tailMode === "hidden" &&
                    !l.alternate &&
                    !X)
                )
                  return (he(t), null);
              } else
                2 * ee() - o.renderingStartTime > Yn &&
                  n !== 1073741824 &&
                  ((t.flags |= 128), (r = !0), cr(o, !1), (t.lanes = 4194304));
            o.isBackwards
              ? ((l.sibling = t.child), (t.child = l))
              : ((n = o.last),
                n !== null ? (n.sibling = l) : (t.child = l),
                (o.last = l));
          }
          return o.tail !== null
            ? ((t = o.tail),
              (o.rendering = t),
              (o.tail = t.sibling),
              (o.renderingStartTime = ee()),
              (t.sibling = null),
              (n = Y.current),
              H(Y, r ? (n & 1) | 2 : n & 1),
              t)
            : (he(t), null);
        case 22:
        case 23:
          return (
            Es(),
            (r = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
            r && (t.mode & 1) !== 0
              ? (Pe & 1073741824) !== 0 &&
                (he(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : he(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(S(156, t.tag));
    }
    function B0(e, t) {
      switch ((is(t), t.tag)) {
        case 1:
          return (
            Ne(t.type) && to(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            Wn(),
            Q(Ee),
            Q(ve),
            ps(),
            (e = t.flags),
            (e & 65536) !== 0 && (e & 128) === 0
              ? ((t.flags = (e & -65537) | 128), t)
              : null
          );
        case 5:
          return (ds(t), null);
        case 13:
          if (
            (Q(Y), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(S(340));
            jn();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return (Q(Y), null);
        case 4:
          return (Wn(), null);
        case 10:
          return (ss(t.type._context), null);
        case 22:
        case 23:
          return (Es(), null);
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Di = !1,
      me = !1,
      H0 = typeof WeakSet == "function" ? WeakSet : Set,
      z = null;
    function Ln(e, t) {
      var n = e.ref;
      if (n !== null)
        if (typeof n == "function")
          try {
            n(null);
          } catch (r) {
            Z(e, t, r);
          }
        else n.current = null;
    }
    function Lu(e, t, n) {
      try {
        n();
      } catch (r) {
        Z(e, t, r);
      }
    }
    var zc = !1;
    function j0(e, t) {
      if (((vu = Zi), (e = Ef()), ns(e))) {
        if ("selectionStart" in e)
          var n = { start: e.selectionStart, end: e.selectionEnd };
        else
          e: {
            n = ((n = e.ownerDocument) && n.defaultView) || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
              n = r.anchorNode;
              var i = r.anchorOffset,
                o = r.focusNode;
              r = r.focusOffset;
              try {
                (n.nodeType, o.nodeType);
              } catch {
                n = null;
                break e;
              }
              var l = 0,
                u = -1,
                s = -1,
                a = 0,
                d = 0,
                m = e,
                h = null;
              t: for (;;) {
                for (
                  var v;
                  m !== n || (i !== 0 && m.nodeType !== 3) || (u = l + i),
                    m !== o || (r !== 0 && m.nodeType !== 3) || (s = l + r),
                    m.nodeType === 3 && (l += m.nodeValue.length),
                    (v = m.firstChild) !== null;
                )
                  ((h = m), (m = v));
                for (;;) {
                  if (m === e) break t;
                  if (
                    (h === n && ++a === i && (u = l),
                    h === o && ++d === r && (s = l),
                    (v = m.nextSibling) !== null)
                  )
                    break;
                  ((m = h), (h = m.parentNode));
                }
                m = v;
              }
              n = u === -1 || s === -1 ? null : { start: u, end: s };
            } else n = null;
          }
        n = n || { start: 0, end: 0 };
      } else n = null;
      for (
        yu = { focusedElem: e, selectionRange: n }, Zi = !1, z = t;
        z !== null;
      )
        if (
          ((t = z), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
          ((e.return = t), (z = e));
        else
          for (; z !== null; ) {
            t = z;
            try {
              var x = t.alternate;
              if ((t.flags & 1024) !== 0)
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (x !== null) {
                      var _ = x.memoizedProps,
                        N = x.memoizedState,
                        c = t.stateNode,
                        f = c.getSnapshotBeforeUpdate(
                          t.elementType === t.type ? _ : Ke(t.type, _),
                          N,
                        );
                      c.__reactInternalSnapshotBeforeUpdate = f;
                    }
                    break;
                  case 3:
                    var p = t.stateNode.containerInfo;
                    p.nodeType === 1
                      ? (p.textContent = "")
                      : p.nodeType === 9 &&
                        p.documentElement &&
                        p.removeChild(p.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(S(163));
                }
            } catch (w) {
              Z(t, t.return, w);
            }
            if (((e = t.sibling), e !== null)) {
              ((e.return = t.return), (z = e));
              break;
            }
            z = t.return;
          }
      return ((x = zc), (zc = !1), x);
    }
    function kr(e, t, n) {
      var r = t.updateQueue;
      if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var i = (r = r.next);
        do {
          if ((i.tag & e) === e) {
            var o = i.destroy;
            ((i.destroy = void 0), o !== void 0 && Lu(t, n, o));
          }
          i = i.next;
        } while (i !== r);
      }
    }
    function No(e, t) {
      if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
      ) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.create;
            n.destroy = r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function Du(e) {
      var t = e.ref;
      if (t !== null) {
        var n = e.stateNode;
        (e.tag, (e = n), typeof t == "function" ? t(e) : (t.current = e));
      }
    }
    function xd(e) {
      var t = e.alternate;
      (t !== null && ((e.alternate = null), xd(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null &&
            (delete t[lt],
            delete t[Fr],
            delete t[xu],
            delete t[N0],
            delete t[C0])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    function _d(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Pc(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || _d(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Au(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode),
          t
            ? n.nodeType === 8
              ? n.parentNode.insertBefore(e, t)
              : n.insertBefore(e, t)
            : (n.nodeType === 8
                ? ((t = n.parentNode), t.insertBefore(e, n))
                : ((t = n), t.appendChild(e)),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = eo)));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (Au(e, t, n), e = e.sibling; e !== null; )
          (Au(e, t, n), (e = e.sibling));
    }
    function Fu(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (Fu(e, t, n), e = e.sibling; e !== null; )
          (Fu(e, t, n), (e = e.sibling));
    }
    var se = null,
      qe = !1;
    function zt(e, t, n) {
      for (n = n.child; n !== null; ) (Sd(e, t, n), (n = n.sibling));
    }
    function Sd(e, t, n) {
      if (ut && typeof ut.onCommitFiberUnmount == "function")
        try {
          ut.onCommitFiberUnmount(yo, n);
        } catch {}
      switch (n.tag) {
        case 5:
          me || Ln(n, t);
        case 6:
          var r = se,
            i = qe;
          ((se = null),
            zt(e, t, n),
            (se = r),
            (qe = i),
            se !== null &&
              (qe
                ? ((e = se),
                  (n = n.stateNode),
                  e.nodeType === 8
                    ? e.parentNode.removeChild(n)
                    : e.removeChild(n))
                : se.removeChild(n.stateNode)));
          break;
        case 18:
          se !== null &&
            (qe
              ? ((e = se),
                (n = n.stateNode),
                e.nodeType === 8
                  ? Ul(e.parentNode, n)
                  : e.nodeType === 1 && Ul(e, n),
                Or(e))
              : Ul(se, n.stateNode));
          break;
        case 4:
          ((r = se),
            (i = qe),
            (se = n.stateNode.containerInfo),
            (qe = !0),
            zt(e, t, n),
            (se = r),
            (qe = i));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !me &&
            ((r = n.updateQueue),
            r !== null && ((r = r.lastEffect), r !== null))
          ) {
            i = r = r.next;
            do {
              var o = i,
                l = o.destroy;
              ((o = o.tag),
                l !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Lu(n, t, l),
                (i = i.next));
            } while (i !== r);
          }
          zt(e, t, n);
          break;
        case 1:
          if (
            !me &&
            (Ln(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == "function")
          )
            try {
              ((r.props = n.memoizedProps),
                (r.state = n.memoizedState),
                r.componentWillUnmount());
            } catch (u) {
              Z(n, t, u);
            }
          zt(e, t, n);
          break;
        case 21:
          zt(e, t, n);
          break;
        case 22:
          n.mode & 1
            ? ((me = (r = me) || n.memoizedState !== null),
              zt(e, t, n),
              (me = r))
            : zt(e, t, n);
          break;
        default:
          zt(e, t, n);
      }
    }
    function Mc(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        (n === null && (n = e.stateNode = new H0()),
          t.forEach(function (r) {
            var i = J0.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(i, i));
          }));
      }
    }
    function Ye(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var i = n[r];
          try {
            var o = e,
              l = t,
              u = l;
            e: for (; u !== null; ) {
              switch (u.tag) {
                case 5:
                  ((se = u.stateNode), (qe = !1));
                  break e;
                case 3:
                  ((se = u.stateNode.containerInfo), (qe = !0));
                  break e;
                case 4:
                  ((se = u.stateNode.containerInfo), (qe = !0));
                  break e;
              }
              u = u.return;
            }
            if (se === null) throw Error(S(160));
            (Sd(o, l, i), (se = null), (qe = !1));
            var s = i.alternate;
            (s !== null && (s.return = null), (i.return = null));
          } catch (a) {
            Z(i, t, a);
          }
        }
      if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) (kd(t, e), (t = t.sibling));
    }
    function kd(e, t) {
      var n = e.alternate,
        r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((Ye(t, e), it(e), r & 4)) {
            try {
              (kr(3, e, e.return), No(3, e));
            } catch (_) {
              Z(e, e.return, _);
            }
            try {
              kr(5, e, e.return);
            } catch (_) {
              Z(e, e.return, _);
            }
          }
          break;
        case 1:
          (Ye(t, e), it(e), r & 512 && n !== null && Ln(n, n.return));
          break;
        case 5:
          if (
            (Ye(t, e),
            it(e),
            r & 512 && n !== null && Ln(n, n.return),
            e.flags & 32)
          ) {
            var i = e.stateNode;
            try {
              Tr(i, "");
            } catch (_) {
              Z(e, e.return, _);
            }
          }
          if (r & 4 && ((i = e.stateNode), i != null)) {
            var o = e.memoizedProps,
              l = n !== null ? n.memoizedProps : o,
              u = e.type,
              s = e.updateQueue;
            if (((e.updateQueue = null), s !== null))
              try {
                (u === "input" &&
                  o.type === "radio" &&
                  o.name != null &&
                  Qc(i, o),
                  lu(u, l));
                var a = lu(u, o);
                for (l = 0; l < s.length; l += 2) {
                  var d = s[l],
                    m = s[l + 1];
                  d === "style"
                    ? qc(i, m)
                    : d === "dangerouslySetInnerHTML"
                      ? Yc(i, m)
                      : d === "children"
                        ? Tr(i, m)
                        : ju(i, d, m, a);
                }
                switch (u) {
                  case "input":
                    tu(i, o);
                    break;
                  case "textarea":
                    Wc(i, o);
                    break;
                  case "select":
                    var h = i._wrapperState.wasMultiple;
                    i._wrapperState.wasMultiple = !!o.multiple;
                    var v = o.value;
                    v != null
                      ? An(i, !!o.multiple, v, !1)
                      : h !== !!o.multiple &&
                        (o.defaultValue != null
                          ? An(i, !!o.multiple, o.defaultValue, !0)
                          : An(i, !!o.multiple, o.multiple ? [] : "", !1));
                }
                i[Fr] = o;
              } catch (_) {
                Z(e, e.return, _);
              }
          }
          break;
        case 6:
          if ((Ye(t, e), it(e), r & 4)) {
            if (e.stateNode === null) throw Error(S(162));
            ((i = e.stateNode), (o = e.memoizedProps));
            try {
              i.nodeValue = o;
            } catch (_) {
              Z(e, e.return, _);
            }
          }
          break;
        case 3:
          if (
            (Ye(t, e),
            it(e),
            r & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              Or(t.containerInfo);
            } catch (_) {
              Z(e, e.return, _);
            }
          break;
        case 4:
          (Ye(t, e), it(e));
          break;
        case 13:
          (Ye(t, e),
            it(e),
            (i = e.child),
            i.flags & 8192 &&
              ((o = i.memoizedState !== null),
              (i.stateNode.isHidden = o),
              !o ||
                (i.alternate !== null && i.alternate.memoizedState !== null) ||
                (Ss = ee())),
            r & 4 && Mc(e));
          break;
        case 22:
          if (
            ((d = n !== null && n.memoizedState !== null),
            e.mode & 1 ? ((me = (a = me) || d), Ye(t, e), (me = a)) : Ye(t, e),
            it(e),
            r & 8192)
          ) {
            if (
              ((a = e.memoizedState !== null),
              (e.stateNode.isHidden = a) && !d && (e.mode & 1) !== 0)
            )
              for (z = e, d = e.child; d !== null; ) {
                for (m = z = d; z !== null; ) {
                  switch (((h = z), (v = h.child), h.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      kr(4, h, h.return);
                      break;
                    case 1:
                      Ln(h, h.return);
                      var x = h.stateNode;
                      if (typeof x.componentWillUnmount == "function") {
                        ((r = h), (n = h.return));
                        try {
                          ((t = r),
                            (x.props = t.memoizedProps),
                            (x.state = t.memoizedState),
                            x.componentWillUnmount());
                        } catch (_) {
                          Z(r, n, _);
                        }
                      }
                      break;
                    case 5:
                      Ln(h, h.return);
                      break;
                    case 22:
                      if (h.memoizedState !== null) {
                        Ic(m);
                        continue;
                      }
                  }
                  v !== null ? ((v.return = h), (z = v)) : Ic(m);
                }
                d = d.sibling;
              }
            e: for (d = null, m = e; ; ) {
              if (m.tag === 5) {
                if (d === null) {
                  d = m;
                  try {
                    ((i = m.stateNode),
                      a
                        ? ((o = i.style),
                          typeof o.setProperty == "function"
                            ? o.setProperty("display", "none", "important")
                            : (o.display = "none"))
                        : ((u = m.stateNode),
                          (s = m.memoizedProps.style),
                          (l =
                            s != null && s.hasOwnProperty("display")
                              ? s.display
                              : null),
                          (u.style.display = Kc("display", l))));
                  } catch (_) {
                    Z(e, e.return, _);
                  }
                }
              } else if (m.tag === 6) {
                if (d === null)
                  try {
                    m.stateNode.nodeValue = a ? "" : m.memoizedProps;
                  } catch (_) {
                    Z(e, e.return, _);
                  }
              } else if (
                ((m.tag !== 22 && m.tag !== 23) ||
                  m.memoizedState === null ||
                  m === e) &&
                m.child !== null
              ) {
                ((m.child.return = m), (m = m.child));
                continue;
              }
              if (m === e) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === e) break e;
                (d === m && (d = null), (m = m.return));
              }
              (d === m && (d = null),
                (m.sibling.return = m.return),
                (m = m.sibling));
            }
          }
          break;
        case 19:
          (Ye(t, e), it(e), r & 4 && Mc(e));
          break;
        case 21:
          break;
        default:
          (Ye(t, e), it(e));
      }
    }
    function it(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var n = e.return; n !== null; ) {
              if (_d(n)) {
                var r = n;
                break e;
              }
              n = n.return;
            }
            throw Error(S(160));
          }
          switch (r.tag) {
            case 5:
              var i = r.stateNode;
              r.flags & 32 && (Tr(i, ""), (r.flags &= -33));
              var o = Pc(e);
              Fu(e, o, i);
              break;
            case 3:
            case 4:
              var l = r.stateNode.containerInfo,
                u = Pc(e);
              Au(e, u, l);
              break;
            default:
              throw Error(S(161));
          }
        } catch (s) {
          Z(e, e.return, s);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Q0(e, t, n) {
      ((z = e), Ed(e, t, n));
    }
    function Ed(e, t, n) {
      for (var r = (e.mode & 1) !== 0; z !== null; ) {
        var i = z,
          o = i.child;
        if (i.tag === 22 && r) {
          var l = i.memoizedState !== null || Di;
          if (!l) {
            var u = i.alternate,
              s = (u !== null && u.memoizedState !== null) || me;
            u = Di;
            var a = me;
            if (((Di = l), (me = s) && !a))
              for (z = i; z !== null; )
                ((l = z),
                  (s = l.child),
                  l.tag === 22 && l.memoizedState !== null
                    ? Lc(i)
                    : s !== null
                      ? ((s.return = l), (z = s))
                      : Lc(i));
            for (; o !== null; ) ((z = o), Ed(o, t, n), (o = o.sibling));
            ((z = i), (Di = u), (me = a));
          }
          Oc(e, t, n);
        } else
          (i.subtreeFlags & 8772) !== 0 && o !== null
            ? ((o.return = i), (z = o))
            : Oc(e, t, n);
      }
    }
    function Oc(e) {
      for (; z !== null; ) {
        var t = z;
        if ((t.flags & 8772) !== 0) {
          var n = t.alternate;
          try {
            if ((t.flags & 8772) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  me || No(5, t);
                  break;
                case 1:
                  var r = t.stateNode;
                  if (t.flags & 4 && !me)
                    if (n === null) r.componentDidMount();
                    else {
                      var i =
                        t.elementType === t.type
                          ? n.memoizedProps
                          : Ke(t.type, n.memoizedProps);
                      r.componentDidUpdate(
                        i,
                        n.memoizedState,
                        r.__reactInternalSnapshotBeforeUpdate,
                      );
                    }
                  var o = t.updateQueue;
                  o !== null && mc(t, o, r);
                  break;
                case 3:
                  var l = t.updateQueue;
                  if (l !== null) {
                    if (((n = null), t.child !== null))
                      switch (t.child.tag) {
                        case 5:
                          n = t.child.stateNode;
                          break;
                        case 1:
                          n = t.child.stateNode;
                      }
                    mc(t, l, n);
                  }
                  break;
                case 5:
                  var u = t.stateNode;
                  if (n === null && t.flags & 4) {
                    n = u;
                    var s = t.memoizedProps;
                    switch (t.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        s.autoFocus && n.focus();
                        break;
                      case "img":
                        s.src && (n.src = s.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (t.memoizedState === null) {
                    var a = t.alternate;
                    if (a !== null) {
                      var d = a.memoizedState;
                      if (d !== null) {
                        var m = d.dehydrated;
                        m !== null && Or(m);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(S(163));
              }
            me || (t.flags & 512 && Du(t));
          } catch (h) {
            Z(t, t.return, h);
          }
        }
        if (t === e) {
          z = null;
          break;
        }
        if (((n = t.sibling), n !== null)) {
          ((n.return = t.return), (z = n));
          break;
        }
        z = t.return;
      }
    }
    function Ic(e) {
      for (; z !== null; ) {
        var t = z;
        if (t === e) {
          z = null;
          break;
        }
        var n = t.sibling;
        if (n !== null) {
          ((n.return = t.return), (z = n));
          break;
        }
        z = t.return;
      }
    }
    function Lc(e) {
      for (; z !== null; ) {
        var t = z;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var n = t.return;
              try {
                No(4, t);
              } catch (s) {
                Z(t, n, s);
              }
              break;
            case 1:
              var r = t.stateNode;
              if (typeof r.componentDidMount == "function") {
                var i = t.return;
                try {
                  r.componentDidMount();
                } catch (s) {
                  Z(t, i, s);
                }
              }
              var o = t.return;
              try {
                Du(t);
              } catch (s) {
                Z(t, o, s);
              }
              break;
            case 5:
              var l = t.return;
              try {
                Du(t);
              } catch (s) {
                Z(t, l, s);
              }
          }
        } catch (s) {
          Z(t, t.return, s);
        }
        if (t === e) {
          z = null;
          break;
        }
        var u = t.sibling;
        if (u !== null) {
          ((u.return = t.return), (z = u));
          break;
        }
        z = t.return;
      }
    }
    var W0 = Math.ceil,
      fo = _t.ReactCurrentDispatcher,
      xs = _t.ReactCurrentOwner,
      Ve = _t.ReactCurrentBatchConfig,
      $ = 0,
      le = null,
      te = null,
      ae = 0,
      Pe = 0,
      Dn = Xt(0),
      re = 0,
      Hr = null,
      fn = 0,
      Co = 0,
      _s = 0,
      Er = null,
      Se = null,
      Ss = 0,
      Yn = 1 / 0,
      dt = null,
      po = !1,
      Ru = null,
      Vt = null,
      Ai = !1,
      Dt = null,
      ho = 0,
      Nr = 0,
      $u = null,
      ji = -1,
      Qi = 0;
    function we() {
      return ($ & 6) !== 0 ? ee() : ji !== -1 ? ji : (ji = ee());
    }
    function Bt(e) {
      return (e.mode & 1) === 0
        ? 1
        : ($ & 2) !== 0 && ae !== 0
          ? ae & -ae
          : z0.transition !== null
            ? (Qi === 0 && (Qi = sf()), Qi)
            : ((e = U),
              e !== 0 ||
                ((e = window.event), (e = e === void 0 ? 16 : mf(e.type))),
              e);
    }
    function Je(e, t, n, r) {
      if (50 < Nr) throw ((Nr = 0), ($u = null), Error(S(185)));
      (jr(e, n, r),
        (($ & 2) === 0 || e !== le) &&
          (e === le && (($ & 2) === 0 && (Co |= n), re === 4 && It(e, ae)),
          Ce(e, r),
          n === 1 &&
            $ === 0 &&
            (t.mode & 1) === 0 &&
            ((Yn = ee() + 500), So && Yt())));
    }
    function Ce(e, t) {
      var n = e.callbackNode;
      Mm(e, t);
      var r = Gi(e, e === le ? ae : 0);
      if (r === 0)
        (n !== null && Ba(n),
          (e.callbackNode = null),
          (e.callbackPriority = 0));
      else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && Ba(n), t === 1))
          (e.tag === 0 ? T0(Dc.bind(null, e)) : Df(Dc.bind(null, e)),
            k0(function () {
              ($ & 6) === 0 && Yt();
            }),
            (n = null));
        else {
          switch (af(r)) {
            case 1:
              n = Ku;
              break;
            case 4:
              n = lf;
              break;
            case 16:
              n = qi;
              break;
            case 536870912:
              n = uf;
              break;
            default:
              n = qi;
          }
          n = Id(n, Nd.bind(null, e));
        }
        ((e.callbackPriority = t), (e.callbackNode = n));
      }
    }
    function Nd(e, t) {
      if (((ji = -1), (Qi = 0), ($ & 6) !== 0)) throw Error(S(327));
      var n = e.callbackNode;
      if (Vn() && e.callbackNode !== n) return null;
      var r = Gi(e, e === le ? ae : 0);
      if (r === 0) return null;
      if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = mo(e, r);
      else {
        t = r;
        var i = $;
        $ |= 2;
        var o = Td();
        (le !== e || ae !== t) && ((dt = null), (Yn = ee() + 500), ln(e, t));
        do
          try {
            K0();
            break;
          } catch (u) {
            Cd(e, u);
          }
        while (!0);
        (us(),
          (fo.current = o),
          ($ = i),
          te !== null ? (t = 0) : ((le = null), (ae = 0), (t = re)));
      }
      if (t !== 0) {
        if (
          (t === 2 && ((i = fu(e)), i !== 0 && ((r = i), (t = Uu(e, i)))),
          t === 1)
        )
          throw ((n = Hr), ln(e, 0), It(e, r), Ce(e, ee()), n);
        if (t === 6) It(e, r);
        else {
          if (
            ((i = e.current.alternate),
            (r & 30) === 0 &&
              !X0(i) &&
              ((t = mo(e, r)),
              t === 2 && ((o = fu(e)), o !== 0 && ((r = o), (t = Uu(e, o)))),
              t === 1))
          )
            throw ((n = Hr), ln(e, 0), It(e, r), Ce(e, ee()), n);
          switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
            case 0:
            case 1:
              throw Error(S(345));
            case 2:
              tn(e, Se, dt);
              break;
            case 3:
              if (
                (It(e, r),
                (r & 130023424) === r && ((t = Ss + 500 - ee()), 10 < t))
              ) {
                if (Gi(e, 0) !== 0) break;
                if (((i = e.suspendedLanes), (i & r) !== r)) {
                  (we(), (e.pingedLanes |= e.suspendedLanes & i));
                  break;
                }
                e.timeoutHandle = wu(tn.bind(null, e, Se, dt), t);
                break;
              }
              tn(e, Se, dt);
              break;
            case 4:
              if ((It(e, r), (r & 4194240) === r)) break;
              for (t = e.eventTimes, i = -1; 0 < r; ) {
                var l = 31 - Ze(r);
                ((o = 1 << l), (l = t[l]), l > i && (i = l), (r &= ~o));
              }
              if (
                ((r = i),
                (r = ee() - r),
                (r =
                  (120 > r
                    ? 120
                    : 480 > r
                      ? 480
                      : 1080 > r
                        ? 1080
                        : 1920 > r
                          ? 1920
                          : 3e3 > r
                            ? 3e3
                            : 4320 > r
                              ? 4320
                              : 1960 * W0(r / 1960)) - r),
                10 < r)
              ) {
                e.timeoutHandle = wu(tn.bind(null, e, Se, dt), r);
                break;
              }
              tn(e, Se, dt);
              break;
            case 5:
              tn(e, Se, dt);
              break;
            default:
              throw Error(S(329));
          }
        }
      }
      return (Ce(e, ee()), e.callbackNode === n ? Nd.bind(null, e) : null);
    }
    function Uu(e, t) {
      var n = Er;
      return (
        e.current.memoizedState.isDehydrated && (ln(e, t).flags |= 256),
        (e = mo(e, t)),
        e !== 2 && ((t = Se), (Se = n), t !== null && Vu(t)),
        e
      );
    }
    function Vu(e) {
      Se === null ? (Se = e) : Se.push.apply(Se, e);
    }
    function X0(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var n = t.updateQueue;
          if (n !== null && ((n = n.stores), n !== null))
            for (var r = 0; r < n.length; r++) {
              var i = n[r],
                o = i.getSnapshot;
              i = i.value;
              try {
                if (!be(o(), i)) return !1;
              } catch {
                return !1;
              }
            }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
          ((n.return = t), (t = n));
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      }
      return !0;
    }
    function It(e, t) {
      for (
        t &= ~_s,
          t &= ~Co,
          e.suspendedLanes |= t,
          e.pingedLanes &= ~t,
          e = e.expirationTimes;
        0 < t;
      ) {
        var n = 31 - Ze(t),
          r = 1 << n;
        ((e[n] = -1), (t &= ~r));
      }
    }
    function Dc(e) {
      if (($ & 6) !== 0) throw Error(S(327));
      Vn();
      var t = Gi(e, 0);
      if ((t & 1) === 0) return (Ce(e, ee()), null);
      var n = mo(e, t);
      if (e.tag !== 0 && n === 2) {
        var r = fu(e);
        r !== 0 && ((t = r), (n = Uu(e, r)));
      }
      if (n === 1) throw ((n = Hr), ln(e, 0), It(e, t), Ce(e, ee()), n);
      if (n === 6) throw Error(S(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        tn(e, Se, dt),
        Ce(e, ee()),
        null
      );
    }
    function ks(e, t) {
      var n = $;
      $ |= 1;
      try {
        return e(t);
      } finally {
        (($ = n), $ === 0 && ((Yn = ee() + 500), So && Yt()));
      }
    }
    function dn(e) {
      Dt !== null && Dt.tag === 0 && ($ & 6) === 0 && Vn();
      var t = $;
      $ |= 1;
      var n = Ve.transition,
        r = U;
      try {
        if (((Ve.transition = null), (U = 1), e)) return e();
      } finally {
        ((U = r), (Ve.transition = n), ($ = t), ($ & 6) === 0 && Yt());
      }
    }
    function Es() {
      ((Pe = Dn.current), Q(Dn));
    }
    function ln(e, t) {
      ((e.finishedWork = null), (e.finishedLanes = 0));
      var n = e.timeoutHandle;
      if ((n !== -1 && ((e.timeoutHandle = -1), S0(n)), te !== null))
        for (n = te.return; n !== null; ) {
          var r = n;
          switch ((is(r), r.tag)) {
            case 1:
              ((r = r.type.childContextTypes), r != null && to());
              break;
            case 3:
              (Wn(), Q(Ee), Q(ve), ps());
              break;
            case 5:
              ds(r);
              break;
            case 4:
              Wn();
              break;
            case 13:
              Q(Y);
              break;
            case 19:
              Q(Y);
              break;
            case 10:
              ss(r.type._context);
              break;
            case 22:
            case 23:
              Es();
          }
          n = n.return;
        }
      if (
        ((le = e),
        (te = e = Ht(e.current, null)),
        (ae = Pe = t),
        (re = 0),
        (Hr = null),
        (_s = Co = fn = 0),
        (Se = Er = null),
        rn !== null)
      ) {
        for (t = 0; t < rn.length; t++)
          if (((n = rn[t]), (r = n.interleaved), r !== null)) {
            n.interleaved = null;
            var i = r.next,
              o = n.pending;
            if (o !== null) {
              var l = o.next;
              ((o.next = i), (r.next = l));
            }
            n.pending = r;
          }
        rn = null;
      }
      return e;
    }
    function Cd(e, t) {
      do {
        var n = te;
        try {
          if ((us(), (Vi.current = co), ao)) {
            for (var r = K.memoizedState; r !== null; ) {
              var i = r.queue;
              (i !== null && (i.pending = null), (r = r.next));
            }
            ao = !1;
          }
          if (
            ((cn = 0),
            (oe = ne = K = null),
            (Sr = !1),
            (Ur = 0),
            (xs.current = null),
            n === null || n.return === null)
          ) {
            ((re = 1), (Hr = t), (te = null));
            break;
          }
          e: {
            var o = e,
              l = n.return,
              u = n,
              s = t;
            if (
              ((t = ae),
              (u.flags |= 32768),
              s !== null && typeof s == "object" && typeof s.then == "function")
            ) {
              var a = s,
                d = u,
                m = d.tag;
              if ((d.mode & 1) === 0 && (m === 0 || m === 11 || m === 15)) {
                var h = d.alternate;
                h
                  ? ((d.updateQueue = h.updateQueue),
                    (d.memoizedState = h.memoizedState),
                    (d.lanes = h.lanes))
                  : ((d.updateQueue = null), (d.memoizedState = null));
              }
              var v = _c(l);
              if (v !== null) {
                ((v.flags &= -257),
                  Sc(v, l, u, o, t),
                  v.mode & 1 && xc(o, a, t),
                  (t = v),
                  (s = a));
                var x = t.updateQueue;
                if (x === null) {
                  var _ = new Set();
                  (_.add(s), (t.updateQueue = _));
                } else x.add(s);
                break e;
              } else {
                if ((t & 1) === 0) {
                  (xc(o, a, t), Ns());
                  break e;
                }
                s = Error(S(426));
              }
            } else if (X && u.mode & 1) {
              var N = _c(l);
              if (N !== null) {
                ((N.flags & 65536) === 0 && (N.flags |= 256),
                  Sc(N, l, u, o, t),
                  os(Xn(s, u)));
                break e;
              }
            }
            ((o = s = Xn(s, u)),
              re !== 4 && (re = 2),
              Er === null ? (Er = [o]) : Er.push(o),
              (o = l));
            do {
              switch (o.tag) {
                case 3:
                  ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                  var c = ad(o, s, t);
                  hc(o, c);
                  break e;
                case 1:
                  u = s;
                  var f = o.type,
                    p = o.stateNode;
                  if (
                    (o.flags & 128) === 0 &&
                    (typeof f.getDerivedStateFromError == "function" ||
                      (p !== null &&
                        typeof p.componentDidCatch == "function" &&
                        (Vt === null || !Vt.has(p))))
                  ) {
                    ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                    var w = cd(o, u, t);
                    hc(o, w);
                    break e;
                  }
              }
              o = o.return;
            } while (o !== null);
          }
          Pd(n);
        } catch (C) {
          ((t = C), te === n && n !== null && (te = n = n.return));
          continue;
        }
        break;
      } while (!0);
    }
    function Td() {
      var e = fo.current;
      return ((fo.current = co), e === null ? co : e);
    }
    function Ns() {
      ((re === 0 || re === 3 || re === 2) && (re = 4),
        le === null ||
          ((fn & 268435455) === 0 && (Co & 268435455) === 0) ||
          It(le, ae));
    }
    function mo(e, t) {
      var n = $;
      $ |= 2;
      var r = Td();
      (le !== e || ae !== t) && ((dt = null), ln(e, t));
      do
        try {
          Y0();
          break;
        } catch (i) {
          Cd(e, i);
        }
      while (!0);
      if ((us(), ($ = n), (fo.current = r), te !== null)) throw Error(S(261));
      return ((le = null), (ae = 0), re);
    }
    function Y0() {
      for (; te !== null; ) zd(te);
    }
    function K0() {
      for (; te !== null && !_m(); ) zd(te);
    }
    function zd(e) {
      var t = Od(e.alternate, e, Pe);
      ((e.memoizedProps = e.pendingProps),
        t === null ? Pd(e) : (te = t),
        (xs.current = null));
    }
    function Pd(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (((e = t.return), (t.flags & 32768) === 0)) {
          if (((n = V0(n, t, Pe)), n !== null)) {
            te = n;
            return;
          }
        } else {
          if (((n = B0(n, t)), n !== null)) {
            ((n.flags &= 32767), (te = n));
            return;
          }
          if (e !== null)
            ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
          else {
            ((re = 6), (te = null));
            return;
          }
        }
        if (((t = t.sibling), t !== null)) {
          te = t;
          return;
        }
        te = t = e;
      } while (t !== null);
      re === 0 && (re = 5);
    }
    function tn(e, t, n) {
      var r = U,
        i = Ve.transition;
      try {
        ((Ve.transition = null), (U = 1), q0(e, t, n, r));
      } finally {
        ((Ve.transition = i), (U = r));
      }
      return null;
    }
    function q0(e, t, n, r) {
      do Vn();
      while (Dt !== null);
      if (($ & 6) !== 0) throw Error(S(327));
      n = e.finishedWork;
      var i = e.finishedLanes;
      if (n === null) return null;
      if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(S(177));
      ((e.callbackNode = null), (e.callbackPriority = 0));
      var o = n.lanes | n.childLanes;
      if (
        (Om(e, o),
        e === le && ((te = le = null), (ae = 0)),
        ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
          Ai ||
          ((Ai = !0),
          Id(qi, function () {
            return (Vn(), null);
          })),
        (o = (n.flags & 15990) !== 0),
        (n.subtreeFlags & 15990) !== 0 || o)
      ) {
        ((o = Ve.transition), (Ve.transition = null));
        var l = U;
        U = 1;
        var u = $;
        (($ |= 4),
          (xs.current = null),
          j0(e, n),
          kd(n, e),
          y0(yu),
          (Zi = !!vu),
          (yu = vu = null),
          (e.current = n),
          Q0(n, e, i),
          Sm(),
          ($ = u),
          (U = l),
          (Ve.transition = o));
      } else e.current = n;
      if (
        (Ai && ((Ai = !1), (Dt = e), (ho = i)),
        (o = e.pendingLanes),
        o === 0 && (Vt = null),
        Nm(n.stateNode, r),
        Ce(e, ee()),
        t !== null)
      )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
          ((i = t[n]),
            r(i.value, { componentStack: i.stack, digest: i.digest }));
      if (po) throw ((po = !1), (e = Ru), (Ru = null), e);
      return (
        (ho & 1) !== 0 && e.tag !== 0 && Vn(),
        (o = e.pendingLanes),
        (o & 1) !== 0 ? (e === $u ? Nr++ : ((Nr = 0), ($u = e))) : (Nr = 0),
        Yt(),
        null
      );
    }
    function Vn() {
      if (Dt !== null) {
        var e = af(ho),
          t = Ve.transition,
          n = U;
        try {
          if (((Ve.transition = null), (U = 16 > e ? 16 : e), Dt === null))
            var r = !1;
          else {
            if (((e = Dt), (Dt = null), (ho = 0), ($ & 6) !== 0))
              throw Error(S(331));
            var i = $;
            for ($ |= 4, z = e.current; z !== null; ) {
              var o = z,
                l = o.child;
              if ((z.flags & 16) !== 0) {
                var u = o.deletions;
                if (u !== null) {
                  for (var s = 0; s < u.length; s++) {
                    var a = u[s];
                    for (z = a; z !== null; ) {
                      var d = z;
                      switch (d.tag) {
                        case 0:
                        case 11:
                        case 15:
                          kr(8, d, o);
                      }
                      var m = d.child;
                      if (m !== null) ((m.return = d), (z = m));
                      else
                        for (; z !== null; ) {
                          d = z;
                          var h = d.sibling,
                            v = d.return;
                          if ((xd(d), d === a)) {
                            z = null;
                            break;
                          }
                          if (h !== null) {
                            ((h.return = v), (z = h));
                            break;
                          }
                          z = v;
                        }
                    }
                  }
                  var x = o.alternate;
                  if (x !== null) {
                    var _ = x.child;
                    if (_ !== null) {
                      x.child = null;
                      do {
                        var N = _.sibling;
                        ((_.sibling = null), (_ = N));
                      } while (_ !== null);
                    }
                  }
                  z = o;
                }
              }
              if ((o.subtreeFlags & 2064) !== 0 && l !== null)
                ((l.return = o), (z = l));
              else
                e: for (; z !== null; ) {
                  if (((o = z), (o.flags & 2048) !== 0))
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        kr(9, o, o.return);
                    }
                  var c = o.sibling;
                  if (c !== null) {
                    ((c.return = o.return), (z = c));
                    break e;
                  }
                  z = o.return;
                }
            }
            var f = e.current;
            for (z = f; z !== null; ) {
              l = z;
              var p = l.child;
              if ((l.subtreeFlags & 2064) !== 0 && p !== null)
                ((p.return = l), (z = p));
              else
                e: for (l = f; z !== null; ) {
                  if (((u = z), (u.flags & 2048) !== 0))
                    try {
                      switch (u.tag) {
                        case 0:
                        case 11:
                        case 15:
                          No(9, u);
                      }
                    } catch (C) {
                      Z(u, u.return, C);
                    }
                  if (u === l) {
                    z = null;
                    break e;
                  }
                  var w = u.sibling;
                  if (w !== null) {
                    ((w.return = u.return), (z = w));
                    break e;
                  }
                  z = u.return;
                }
            }
            if (
              (($ = i),
              Yt(),
              ut && typeof ut.onPostCommitFiberRoot == "function")
            )
              try {
                ut.onPostCommitFiberRoot(yo, e);
              } catch {}
            r = !0;
          }
          return r;
        } finally {
          ((U = n), (Ve.transition = t));
        }
      }
      return !1;
    }
    function Ac(e, t, n) {
      ((t = Xn(n, t)),
        (t = ad(e, t, 1)),
        (e = Ut(e, t, 1)),
        (t = we()),
        e !== null && (jr(e, 1, t), Ce(e, t)));
    }
    function Z(e, t, n) {
      if (e.tag === 3) Ac(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            Ac(t, e, n);
            break;
          } else if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == "function" ||
              (typeof r.componentDidCatch == "function" &&
                (Vt === null || !Vt.has(r)))
            ) {
              ((e = Xn(n, e)),
                (e = cd(t, e, 1)),
                (t = Ut(t, e, 1)),
                (e = we()),
                t !== null && (jr(t, 1, e), Ce(t, e)));
              break;
            }
          }
          t = t.return;
        }
    }
    function G0(e, t, n) {
      var r = e.pingCache;
      (r !== null && r.delete(t),
        (t = we()),
        (e.pingedLanes |= e.suspendedLanes & n),
        le === e &&
          (ae & n) === n &&
          (re === 4 || (re === 3 && (ae & 130023424) === ae && 500 > ee() - Ss)
            ? ln(e, 0)
            : (_s |= n)),
        Ce(e, t));
    }
    function Md(e, t) {
      t === 0 &&
        ((e.mode & 1) === 0
          ? (t = 1)
          : ((t = _i), (_i <<= 1), (_i & 130023424) === 0 && (_i = 4194304)));
      var n = we();
      ((e = wt(e, t)), e !== null && (jr(e, t, n), Ce(e, n)));
    }
    function Z0(e) {
      var t = e.memoizedState,
        n = 0;
      (t !== null && (n = t.retryLane), Md(e, n));
    }
    function J0(e, t) {
      var n = 0;
      switch (e.tag) {
        case 13:
          var r = e.stateNode,
            i = e.memoizedState;
          i !== null && (n = i.retryLane);
          break;
        case 19:
          r = e.stateNode;
          break;
        default:
          throw Error(S(314));
      }
      (r !== null && r.delete(t), Md(e, n));
    }
    var Od;
    Od = function (e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Ee.current) ke = !0;
        else {
          if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
            return ((ke = !1), U0(e, t, n));
          ke = (e.flags & 131072) !== 0;
        }
      else ((ke = !1), X && (t.flags & 1048576) !== 0 && Af(t, io, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var r = t.type;
          (Hi(e, t), (e = t.pendingProps));
          var i = Hn(t, ve.current);
          (Un(t, n), (i = ms(null, t, r, e, i, n)));
          var o = vs();
          return (
            (t.flags |= 1),
            typeof i == "object" &&
            i !== null &&
            typeof i.render == "function" &&
            i.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                Ne(r) ? ((o = !0), no(t)) : (o = !1),
                (t.memoizedState =
                  i.state !== null && i.state !== void 0 ? i.state : null),
                cs(t),
                (i.updater = Eo),
                (t.stateNode = i),
                (i._reactInternals = t),
                Cu(t, r, e, n),
                (t = Pu(null, t, r, !0, o, n)))
              : ((t.tag = 0),
                X && o && rs(t),
                ge(null, t, i, n),
                (t = t.child)),
            t
          );
        case 16:
          r = t.elementType;
          e: {
            switch (
              (Hi(e, t),
              (e = t.pendingProps),
              (i = r._init),
              (r = i(r._payload)),
              (t.type = r),
              (i = t.tag = ev(r)),
              (e = Ke(r, e)),
              i)
            ) {
              case 0:
                t = zu(null, t, r, e, n);
                break e;
              case 1:
                t = Nc(null, t, r, e, n);
                break e;
              case 11:
                t = kc(null, t, r, e, n);
                break e;
              case 14:
                t = Ec(null, t, r, Ke(r.type, e), n);
                break e;
            }
            throw Error(S(306, r, ""));
          }
          return t;
        case 0:
          return (
            (r = t.type),
            (i = t.pendingProps),
            (i = t.elementType === r ? i : Ke(r, i)),
            zu(e, t, r, i, n)
          );
        case 1:
          return (
            (r = t.type),
            (i = t.pendingProps),
            (i = t.elementType === r ? i : Ke(r, i)),
            Nc(e, t, r, i, n)
          );
        case 3:
          e: {
            if ((hd(t), e === null)) throw Error(S(387));
            ((r = t.pendingProps),
              (o = t.memoizedState),
              (i = o.element),
              Bf(e, t),
              uo(t, r, null, n));
            var l = t.memoizedState;
            if (((r = l.element), o.isDehydrated))
              if (
                ((o = {
                  element: r,
                  isDehydrated: !1,
                  cache: l.cache,
                  pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
                  transitions: l.transitions,
                }),
                (t.updateQueue.baseState = o),
                (t.memoizedState = o),
                t.flags & 256)
              ) {
                ((i = Xn(Error(S(423)), t)), (t = Cc(e, t, r, n, i)));
                break e;
              } else if (r !== i) {
                ((i = Xn(Error(S(424)), t)), (t = Cc(e, t, r, n, i)));
                break e;
              } else
                for (
                  Me = $t(t.stateNode.containerInfo.firstChild),
                    Oe = t,
                    X = !0,
                    Ge = null,
                    n = Uf(t, null, r, n),
                    t.child = n;
                  n;
                )
                  ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            else {
              if ((jn(), r === i)) {
                t = xt(e, t, n);
                break e;
              }
              ge(e, t, r, n);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            Hf(t),
            e === null && ku(t),
            (r = t.type),
            (i = t.pendingProps),
            (o = e !== null ? e.memoizedProps : null),
            (l = i.children),
            gu(r, i) ? (l = null) : o !== null && gu(r, o) && (t.flags |= 32),
            pd(e, t),
            ge(e, t, l, n),
            t.child
          );
        case 6:
          return (e === null && ku(t), null);
        case 13:
          return md(e, t, n);
        case 4:
          return (
            fs(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            e === null ? (t.child = Qn(t, null, r, n)) : ge(e, t, r, n),
            t.child
          );
        case 11:
          return (
            (r = t.type),
            (i = t.pendingProps),
            (i = t.elementType === r ? i : Ke(r, i)),
            kc(e, t, r, i, n)
          );
        case 7:
          return (ge(e, t, t.pendingProps, n), t.child);
        case 8:
          return (ge(e, t, t.pendingProps.children, n), t.child);
        case 12:
          return (ge(e, t, t.pendingProps.children, n), t.child);
        case 10:
          e: {
            if (
              ((r = t.type._context),
              (i = t.pendingProps),
              (o = t.memoizedProps),
              (l = i.value),
              H(oo, r._currentValue),
              (r._currentValue = l),
              o !== null)
            )
              if (be(o.value, l)) {
                if (o.children === i.children && !Ee.current) {
                  t = xt(e, t, n);
                  break e;
                }
              } else
                for (o = t.child, o !== null && (o.return = t); o !== null; ) {
                  var u = o.dependencies;
                  if (u !== null) {
                    l = o.child;
                    for (var s = u.firstContext; s !== null; ) {
                      if (s.context === r) {
                        if (o.tag === 1) {
                          ((s = vt(-1, n & -n)), (s.tag = 2));
                          var a = o.updateQueue;
                          if (a !== null) {
                            a = a.shared;
                            var d = a.pending;
                            (d === null
                              ? (s.next = s)
                              : ((s.next = d.next), (d.next = s)),
                              (a.pending = s));
                          }
                        }
                        ((o.lanes |= n),
                          (s = o.alternate),
                          s !== null && (s.lanes |= n),
                          Eu(o.return, n, t),
                          (u.lanes |= n));
                        break;
                      }
                      s = s.next;
                    }
                  } else if (o.tag === 10)
                    l = o.type === t.type ? null : o.child;
                  else if (o.tag === 18) {
                    if (((l = o.return), l === null)) throw Error(S(341));
                    ((l.lanes |= n),
                      (u = l.alternate),
                      u !== null && (u.lanes |= n),
                      Eu(l, n, t),
                      (l = o.sibling));
                  } else l = o.child;
                  if (l !== null) l.return = o;
                  else
                    for (l = o; l !== null; ) {
                      if (l === t) {
                        l = null;
                        break;
                      }
                      if (((o = l.sibling), o !== null)) {
                        ((o.return = l.return), (l = o));
                        break;
                      }
                      l = l.return;
                    }
                  o = l;
                }
            (ge(e, t, i.children, n), (t = t.child));
          }
          return t;
        case 9:
          return (
            (i = t.type),
            (r = t.pendingProps.children),
            Un(t, n),
            (i = Be(i)),
            (r = r(i)),
            (t.flags |= 1),
            ge(e, t, r, n),
            t.child
          );
        case 14:
          return (
            (r = t.type),
            (i = Ke(r, t.pendingProps)),
            (i = Ke(r.type, i)),
            Ec(e, t, r, i, n)
          );
        case 15:
          return fd(e, t, t.type, t.pendingProps, n);
        case 17:
          return (
            (r = t.type),
            (i = t.pendingProps),
            (i = t.elementType === r ? i : Ke(r, i)),
            Hi(e, t),
            (t.tag = 1),
            Ne(r) ? ((e = !0), no(t)) : (e = !1),
            Un(t, n),
            sd(t, r, i),
            Cu(t, r, i, n),
            Pu(null, t, r, !0, e, n)
          );
        case 19:
          return vd(e, t, n);
        case 22:
          return dd(e, t, n);
      }
      throw Error(S(156, t.tag));
    };
    function Id(e, t) {
      return of(e, t);
    }
    function b0(e, t, n, r) {
      ((this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function Ue(e, t, n, r) {
      return new b0(e, t, n, r);
    }
    function Cs(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function ev(e) {
      if (typeof e == "function") return Cs(e) ? 1 : 0;
      if (e != null) {
        if (((e = e.$$typeof), e === Wu)) return 11;
        if (e === Xu) return 14;
      }
      return 2;
    }
    function Ht(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = Ue(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function Wi(e, t, n, r, i, o) {
      var l = 2;
      if (((r = e), typeof e == "function")) Cs(e) && (l = 1);
      else if (typeof e == "string") l = 5;
      else
        e: switch (e) {
          case En:
            return un(n.children, i, o, t);
          case Qu:
            ((l = 8), (i |= 8));
            break;
          case Gl:
            return (
              (e = Ue(12, n, t, i | 2)),
              (e.elementType = Gl),
              (e.lanes = o),
              e
            );
          case Zl:
            return (
              (e = Ue(13, n, t, i)),
              (e.elementType = Zl),
              (e.lanes = o),
              e
            );
          case Jl:
            return (
              (e = Ue(19, n, t, i)),
              (e.elementType = Jl),
              (e.lanes = o),
              e
            );
          case Bc:
            return To(n, i, o, t);
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case Uc:
                  l = 10;
                  break e;
                case Vc:
                  l = 9;
                  break e;
                case Wu:
                  l = 11;
                  break e;
                case Xu:
                  l = 14;
                  break e;
                case Pt:
                  ((l = 16), (r = null));
                  break e;
              }
            throw Error(S(130, e == null ? e : typeof e, ""));
        }
      return (
        (t = Ue(l, n, t, i)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = o),
        t
      );
    }
    function un(e, t, n, r) {
      return ((e = Ue(7, e, r, t)), (e.lanes = n), e);
    }
    function To(e, t, n, r) {
      return (
        (e = Ue(22, e, r, t)),
        (e.elementType = Bc),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
      );
    }
    function Yl(e, t, n) {
      return ((e = Ue(6, e, null, t)), (e.lanes = n), e);
    }
    function Kl(e, t, n) {
      return (
        (t = Ue(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function tv(e, t, n, r, i) {
      ((this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
          this.pingCache =
          this.current =
          this.pendingChildren =
            null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = Ol(0)),
        (this.expirationTimes = Ol(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Ol(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null));
    }
    function Ts(e, t, n, r, i, o, l, u, s) {
      return (
        (e = new tv(e, t, n, u, s)),
        t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
        (o = Ue(3, null, null, t)),
        (e.current = o),
        (o.stateNode = e),
        (o.memoizedState = {
          element: r,
          isDehydrated: n,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        cs(o),
        e
      );
    }
    function nv(e, t, n) {
      var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: kn,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function Ld(e) {
      if (!e) return Qt;
      e = e._reactInternals;
      e: {
        if (hn(e) !== e || e.tag !== 1) throw Error(S(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (Ne(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break e;
              }
          }
          t = t.return;
        } while (t !== null);
        throw Error(S(171));
      }
      if (e.tag === 1) {
        var n = e.type;
        if (Ne(n)) return Lf(e, n, t);
      }
      return t;
    }
    function Dd(e, t, n, r, i, o, l, u, s) {
      return (
        (e = Ts(n, r, !0, e, i, o, l, u, s)),
        (e.context = Ld(null)),
        (n = e.current),
        (r = we()),
        (i = Bt(n)),
        (o = vt(r, i)),
        (o.callback = t ?? null),
        Ut(n, o, i),
        (e.current.lanes = i),
        jr(e, i, r),
        Ce(e, r),
        e
      );
    }
    function zo(e, t, n, r) {
      var i = t.current,
        o = we(),
        l = Bt(i);
      return (
        (n = Ld(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = vt(o, l)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = Ut(i, t, l)),
        e !== null && (Je(e, i, l, o), Ui(e, i, l)),
        l
      );
    }
    function vo(e) {
      return (
        (e = e.current),
        e.child ? (e.child.tag === 5, e.child.stateNode) : null
      );
    }
    function Fc(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function zs(e, t) {
      (Fc(e, t), (e = e.alternate) && Fc(e, t));
    }
    function rv() {
      return null;
    }
    var Ad =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            console.error(e);
          };
    function Ps(e) {
      this._internalRoot = e;
    }
    Po.prototype.render = Ps.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(S(409));
      zo(e, t, null, null);
    };
    Po.prototype.unmount = Ps.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (dn(function () {
          zo(null, e, null, null);
        }),
          (t[gt] = null));
      }
    };
    function Po(e) {
      this._internalRoot = e;
    }
    Po.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = df();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Ot.length && t !== 0 && t < Ot[n].priority; n++);
        (Ot.splice(n, 0, e), n === 0 && hf(e));
      }
    };
    function Ms(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function Mo(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
      );
    }
    function Rc() {}
    function iv(e, t, n, r, i) {
      if (i) {
        if (typeof r == "function") {
          var o = r;
          r = function () {
            var a = vo(l);
            o.call(a);
          };
        }
        var l = Dd(t, r, e, 0, null, !1, !1, "", Rc);
        return (
          (e._reactRootContainer = l),
          (e[gt] = l.current),
          Dr(e.nodeType === 8 ? e.parentNode : e),
          dn(),
          l
        );
      }
      for (; (i = e.lastChild); ) e.removeChild(i);
      if (typeof r == "function") {
        var u = r;
        r = function () {
          var a = vo(s);
          u.call(a);
        };
      }
      var s = Ts(e, 0, !1, null, null, !1, !1, "", Rc);
      return (
        (e._reactRootContainer = s),
        (e[gt] = s.current),
        Dr(e.nodeType === 8 ? e.parentNode : e),
        dn(function () {
          zo(t, s, n, r);
        }),
        s
      );
    }
    function Oo(e, t, n, r, i) {
      var o = n._reactRootContainer;
      if (o) {
        var l = o;
        if (typeof i == "function") {
          var u = i;
          i = function () {
            var s = vo(l);
            u.call(s);
          };
        }
        zo(t, l, e, i);
      } else l = iv(n, t, e, i, r);
      return vo(l);
    }
    cf = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = mr(t.pendingLanes);
            n !== 0 &&
              (qu(t, n | 1),
              Ce(t, ee()),
              ($ & 6) === 0 && ((Yn = ee() + 500), Yt()));
          }
          break;
        case 13:
          (dn(function () {
            var r = wt(e, 1);
            if (r !== null) {
              var i = we();
              Je(r, e, 1, i);
            }
          }),
            zs(e, 1));
      }
    };
    Gu = function (e) {
      if (e.tag === 13) {
        var t = wt(e, 134217728);
        if (t !== null) {
          var n = we();
          Je(t, e, 134217728, n);
        }
        zs(e, 134217728);
      }
    };
    ff = function (e) {
      if (e.tag === 13) {
        var t = Bt(e),
          n = wt(e, t);
        if (n !== null) {
          var r = we();
          Je(n, e, t, r);
        }
        zs(e, t);
      }
    };
    df = function () {
      return U;
    };
    pf = function (e, t) {
      var n = U;
      try {
        return ((U = e), t());
      } finally {
        U = n;
      }
    };
    su = function (e, t, n) {
      switch (t) {
        case "input":
          if ((tu(e, n), (t = n.name), n.type === "radio" && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var i = _o(r);
                if (!i) throw Error(S(90));
                (jc(r), tu(r, i));
              }
            }
          }
          break;
        case "textarea":
          Wc(e, n);
          break;
        case "select":
          ((t = n.value), t != null && An(e, !!n.multiple, t, !1));
      }
    };
    Jc = ks;
    bc = dn;
    var ov = { usingClientEntryPoint: !1, Events: [Wr, zn, _o, Gc, Zc, ks] },
      fr = {
        findFiberByHostInstance: nn,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom",
      },
      lv = {
        bundleType: fr.bundleType,
        version: fr.version,
        rendererPackageName: fr.rendererPackageName,
        rendererConfig: fr.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: _t.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return ((e = nf(e)), e === null ? null : e.stateNode);
        },
        findFiberByHostInstance: fr.findFiberByHostInstance || rv,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
      };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
      ((dr = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !dr.isDisabled && dr.supportsFiber)
    )
      try {
        ((yo = dr.inject(lv)), (ut = dr));
      } catch {}
    var dr;
    De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ov;
    De.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Ms(t)) throw Error(S(200));
      return nv(e, t, null, n);
    };
    De.createRoot = function (e, t) {
      if (!Ms(e)) throw Error(S(299));
      var n = !1,
        r = "",
        i = Ad;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = Ts(e, 1, !1, null, null, n, !1, r, i)),
        (e[gt] = t.current),
        Dr(e.nodeType === 8 ? e.parentNode : e),
        new Ps(t)
      );
    };
    De.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(S(188))
          : ((e = Object.keys(e).join(",")), Error(S(268, e)));
      return ((e = nf(t)), (e = e === null ? null : e.stateNode), e);
    };
    De.flushSync = function (e) {
      return dn(e);
    };
    De.hydrate = function (e, t, n) {
      if (!Mo(t)) throw Error(S(200));
      return Oo(null, e, t, !0, n);
    };
    De.hydrateRoot = function (e, t, n) {
      if (!Ms(e)) throw Error(S(405));
      var r = (n != null && n.hydratedSources) || null,
        i = !1,
        o = "",
        l = Ad;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (l = n.onRecoverableError)),
        (t = Dd(t, null, e, 1, n ?? null, i, !1, o, l)),
        (e[gt] = t.current),
        Dr(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          ((n = r[e]),
            (i = n._getVersion),
            (i = i(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, i])
              : t.mutableSourceEagerHydrationData.push(n, i));
      return new Po(t);
    };
    De.render = function (e, t, n) {
      if (!Mo(t)) throw Error(S(200));
      return Oo(null, e, t, !1, n);
    };
    De.unmountComponentAtNode = function (e) {
      if (!Mo(e)) throw Error(S(40));
      return e._reactRootContainer
        ? (dn(function () {
            Oo(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[gt] = null));
            });
          }),
          !0)
        : !1;
    };
    De.unstable_batchedUpdates = ks;
    De.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!Mo(n)) throw Error(S(200));
      if (e == null || e._reactInternals === void 0) throw Error(S(38));
      return Oo(e, t, n, !1, r);
    };
    De.version = "18.3.1-next-f1338f8080-20240426";
  });
  var Ud = Jt((Lg, $d) => {
    "use strict";
    function Rd() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Rd);
        } catch (e) {
          console.error(e);
        }
    }
    (Rd(), ($d.exports = Fd()));
  });
  var Bd = Jt((Os) => {
    "use strict";
    var Vd = Ud();
    ((Os.createRoot = Vd.createRoot), (Os.hydrateRoot = Vd.hydrateRoot));
    var Dg;
  });
  var g = la(yl(), 1),
    Rh = la(Bd(), 1);
  var uv = { value: () => {} };
  function jd() {
    for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
      if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r))
        throw new Error("illegal type: " + r);
      n[r] = [];
    }
    return new Io(n);
  }
  function Io(e) {
    this._ = e;
  }
  function sv(e, t) {
    return e
      .trim()
      .split(/^|\s+/)
      .map(function (n) {
        var r = "",
          i = n.indexOf(".");
        if (
          (i >= 0 && ((r = n.slice(i + 1)), (n = n.slice(0, i))),
          n && !t.hasOwnProperty(n))
        )
          throw new Error("unknown type: " + n);
        return { type: n, name: r };
      });
  }
  Io.prototype = jd.prototype = {
    constructor: Io,
    on: function (e, t) {
      var n = this._,
        r = sv(e + "", n),
        i,
        o = -1,
        l = r.length;
      if (arguments.length < 2) {
        for (; ++o < l; )
          if ((i = (e = r[o]).type) && (i = av(n[i], e.name))) return i;
        return;
      }
      if (t != null && typeof t != "function")
        throw new Error("invalid callback: " + t);
      for (; ++o < l; )
        if ((i = (e = r[o]).type)) n[i] = Hd(n[i], e.name, t);
        else if (t == null) for (i in n) n[i] = Hd(n[i], e.name, null);
      return this;
    },
    copy: function () {
      var e = {},
        t = this._;
      for (var n in t) e[n] = t[n].slice();
      return new Io(e);
    },
    call: function (e, t) {
      if ((i = arguments.length - 2) > 0)
        for (var n = new Array(i), r = 0, i, o; r < i; ++r)
          n[r] = arguments[r + 2];
      if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
      for (o = this._[e], r = 0, i = o.length; r < i; ++r)
        o[r].value.apply(t, n);
    },
    apply: function (e, t, n) {
      if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
      for (var r = this._[e], i = 0, o = r.length; i < o; ++i)
        r[i].value.apply(t, n);
    },
  };
  function av(e, t) {
    for (var n = 0, r = e.length, i; n < r; ++n)
      if ((i = e[n]).name === t) return i.value;
  }
  function Hd(e, t, n) {
    for (var r = 0, i = e.length; r < i; ++r)
      if (e[r].name === t) {
        ((e[r] = uv), (e = e.slice(0, r).concat(e.slice(r + 1))));
        break;
      }
    return (n != null && e.push({ name: t, value: n }), e);
  }
  var Yr = jd;
  var Lo = "http://www.w3.org/1999/xhtml",
    Is = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: Lo,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/",
    };
  function St(e) {
    var t = (e += ""),
      n = t.indexOf(":");
    return (
      n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)),
      Is.hasOwnProperty(t) ? { space: Is[t], local: e } : e
    );
  }
  function cv(e) {
    return function () {
      var t = this.ownerDocument,
        n = this.namespaceURI;
      return n === Lo && t.documentElement.namespaceURI === Lo
        ? t.createElement(e)
        : t.createElementNS(n, e);
    };
  }
  function fv(e) {
    return function () {
      return this.ownerDocument.createElementNS(e.space, e.local);
    };
  }
  function Do(e) {
    var t = St(e);
    return (t.local ? fv : cv)(t);
  }
  function dv() {}
  function mn(e) {
    return e == null
      ? dv
      : function () {
          return this.querySelector(e);
        };
  }
  function Qd(e) {
    typeof e != "function" && (e = mn(e));
    for (
      var t = this._groups, n = t.length, r = new Array(n), i = 0;
      i < n;
      ++i
    )
      for (
        var o = t[i], l = o.length, u = (r[i] = new Array(l)), s, a, d = 0;
        d < l;
        ++d
      )
        (s = o[d]) &&
          (a = e.call(s, s.__data__, d, o)) &&
          ("__data__" in s && (a.__data__ = s.__data__), (u[d] = a));
    return new J(r, this._parents);
  }
  function Ls(e) {
    return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
  }
  function pv() {
    return [];
  }
  function Kr(e) {
    return e == null
      ? pv
      : function () {
          return this.querySelectorAll(e);
        };
  }
  function hv(e) {
    return function () {
      return Ls(e.apply(this, arguments));
    };
  }
  function Wd(e) {
    typeof e == "function" ? (e = hv(e)) : (e = Kr(e));
    for (var t = this._groups, n = t.length, r = [], i = [], o = 0; o < n; ++o)
      for (var l = t[o], u = l.length, s, a = 0; a < u; ++a)
        (s = l[a]) && (r.push(e.call(s, s.__data__, a, l)), i.push(s));
    return new J(r, i);
  }
  function qr(e) {
    return function () {
      return this.matches(e);
    };
  }
  function Ao(e) {
    return function (t) {
      return t.matches(e);
    };
  }
  var mv = Array.prototype.find;
  function vv(e) {
    return function () {
      return mv.call(this.children, e);
    };
  }
  function yv() {
    return this.firstElementChild;
  }
  function Xd(e) {
    return this.select(e == null ? yv : vv(typeof e == "function" ? e : Ao(e)));
  }
  var gv = Array.prototype.filter;
  function wv() {
    return Array.from(this.children);
  }
  function xv(e) {
    return function () {
      return gv.call(this.children, e);
    };
  }
  function Yd(e) {
    return this.selectAll(
      e == null ? wv : xv(typeof e == "function" ? e : Ao(e)),
    );
  }
  function Kd(e) {
    typeof e != "function" && (e = qr(e));
    for (
      var t = this._groups, n = t.length, r = new Array(n), i = 0;
      i < n;
      ++i
    )
      for (var o = t[i], l = o.length, u = (r[i] = []), s, a = 0; a < l; ++a)
        (s = o[a]) && e.call(s, s.__data__, a, o) && u.push(s);
    return new J(r, this._parents);
  }
  function Fo(e) {
    return new Array(e.length);
  }
  function qd() {
    return new J(this._enter || this._groups.map(Fo), this._parents);
  }
  function Gr(e, t) {
    ((this.ownerDocument = e.ownerDocument),
      (this.namespaceURI = e.namespaceURI),
      (this._next = null),
      (this._parent = e),
      (this.__data__ = t));
  }
  Gr.prototype = {
    constructor: Gr,
    appendChild: function (e) {
      return this._parent.insertBefore(e, this._next);
    },
    insertBefore: function (e, t) {
      return this._parent.insertBefore(e, t);
    },
    querySelector: function (e) {
      return this._parent.querySelector(e);
    },
    querySelectorAll: function (e) {
      return this._parent.querySelectorAll(e);
    },
  };
  function Gd(e) {
    return function () {
      return e;
    };
  }
  function _v(e, t, n, r, i, o) {
    for (var l = 0, u, s = t.length, a = o.length; l < a; ++l)
      (u = t[l]) ? ((u.__data__ = o[l]), (r[l] = u)) : (n[l] = new Gr(e, o[l]));
    for (; l < s; ++l) (u = t[l]) && (i[l] = u);
  }
  function Sv(e, t, n, r, i, o, l) {
    var u,
      s,
      a = new Map(),
      d = t.length,
      m = o.length,
      h = new Array(d),
      v;
    for (u = 0; u < d; ++u)
      (s = t[u]) &&
        ((h[u] = v = l.call(s, s.__data__, u, t) + ""),
        a.has(v) ? (i[u] = s) : a.set(v, s));
    for (u = 0; u < m; ++u)
      ((v = l.call(e, o[u], u, o) + ""),
        (s = a.get(v))
          ? ((r[u] = s), (s.__data__ = o[u]), a.delete(v))
          : (n[u] = new Gr(e, o[u])));
    for (u = 0; u < d; ++u) (s = t[u]) && a.get(h[u]) === s && (i[u] = s);
  }
  function kv(e) {
    return e.__data__;
  }
  function Zd(e, t) {
    if (!arguments.length) return Array.from(this, kv);
    var n = t ? Sv : _v,
      r = this._parents,
      i = this._groups;
    typeof e != "function" && (e = Gd(e));
    for (
      var o = i.length,
        l = new Array(o),
        u = new Array(o),
        s = new Array(o),
        a = 0;
      a < o;
      ++a
    ) {
      var d = r[a],
        m = i[a],
        h = m.length,
        v = Ev(e.call(d, d && d.__data__, a, r)),
        x = v.length,
        _ = (u[a] = new Array(x)),
        N = (l[a] = new Array(x)),
        c = (s[a] = new Array(h));
      n(d, m, _, N, c, v, t);
      for (var f = 0, p = 0, w, C; f < x; ++f)
        if ((w = _[f])) {
          for (f >= p && (p = f + 1); !(C = N[p]) && ++p < x; );
          w._next = C || null;
        }
    }
    return ((l = new J(l, r)), (l._enter = u), (l._exit = s), l);
  }
  function Ev(e) {
    return typeof e == "object" && "length" in e ? e : Array.from(e);
  }
  function Jd() {
    return new J(this._exit || this._groups.map(Fo), this._parents);
  }
  function bd(e, t, n) {
    var r = this.enter(),
      i = this,
      o = this.exit();
    return (
      typeof e == "function"
        ? ((r = e(r)), r && (r = r.selection()))
        : (r = r.append(e + "")),
      t != null && ((i = t(i)), i && (i = i.selection())),
      n == null ? o.remove() : n(o),
      r && i ? r.merge(i).order() : i
    );
  }
  function ep(e) {
    for (
      var t = e.selection ? e.selection() : e,
        n = this._groups,
        r = t._groups,
        i = n.length,
        o = r.length,
        l = Math.min(i, o),
        u = new Array(i),
        s = 0;
      s < l;
      ++s
    )
      for (
        var a = n[s],
          d = r[s],
          m = a.length,
          h = (u[s] = new Array(m)),
          v,
          x = 0;
        x < m;
        ++x
      )
        (v = a[x] || d[x]) && (h[x] = v);
    for (; s < i; ++s) u[s] = n[s];
    return new J(u, this._parents);
  }
  function tp() {
    for (var e = this._groups, t = -1, n = e.length; ++t < n; )
      for (var r = e[t], i = r.length - 1, o = r[i], l; --i >= 0; )
        (l = r[i]) &&
          (o &&
            l.compareDocumentPosition(o) ^ 4 &&
            o.parentNode.insertBefore(l, o),
          (o = l));
    return this;
  }
  function np(e) {
    e || (e = Nv);
    function t(m, h) {
      return m && h ? e(m.__data__, h.__data__) : !m - !h;
    }
    for (
      var n = this._groups, r = n.length, i = new Array(r), o = 0;
      o < r;
      ++o
    ) {
      for (
        var l = n[o], u = l.length, s = (i[o] = new Array(u)), a, d = 0;
        d < u;
        ++d
      )
        (a = l[d]) && (s[d] = a);
      s.sort(t);
    }
    return new J(i, this._parents).order();
  }
  function Nv(e, t) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
  }
  function rp() {
    var e = arguments[0];
    return ((arguments[0] = this), e.apply(null, arguments), this);
  }
  function ip() {
    return Array.from(this);
  }
  function op() {
    for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
      for (var r = e[t], i = 0, o = r.length; i < o; ++i) {
        var l = r[i];
        if (l) return l;
      }
    return null;
  }
  function lp() {
    let e = 0;
    for (let t of this) ++e;
    return e;
  }
  function up() {
    return !this.node();
  }
  function sp(e) {
    for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
      for (var i = t[n], o = 0, l = i.length, u; o < l; ++o)
        (u = i[o]) && e.call(u, u.__data__, o, i);
    return this;
  }
  function Cv(e) {
    return function () {
      this.removeAttribute(e);
    };
  }
  function Tv(e) {
    return function () {
      this.removeAttributeNS(e.space, e.local);
    };
  }
  function zv(e, t) {
    return function () {
      this.setAttribute(e, t);
    };
  }
  function Pv(e, t) {
    return function () {
      this.setAttributeNS(e.space, e.local, t);
    };
  }
  function Mv(e, t) {
    return function () {
      var n = t.apply(this, arguments);
      n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
    };
  }
  function Ov(e, t) {
    return function () {
      var n = t.apply(this, arguments);
      n == null
        ? this.removeAttributeNS(e.space, e.local)
        : this.setAttributeNS(e.space, e.local, n);
    };
  }
  function ap(e, t) {
    var n = St(e);
    if (arguments.length < 2) {
      var r = this.node();
      return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
    }
    return this.each(
      (t == null
        ? n.local
          ? Tv
          : Cv
        : typeof t == "function"
          ? n.local
            ? Ov
            : Mv
          : n.local
            ? Pv
            : zv)(n, t),
    );
  }
  function Ro(e) {
    return (
      (e.ownerDocument && e.ownerDocument.defaultView) ||
      (e.document && e) ||
      e.defaultView
    );
  }
  function Iv(e) {
    return function () {
      this.style.removeProperty(e);
    };
  }
  function Lv(e, t, n) {
    return function () {
      this.style.setProperty(e, t, n);
    };
  }
  function Dv(e, t, n) {
    return function () {
      var r = t.apply(this, arguments);
      r == null
        ? this.style.removeProperty(e)
        : this.style.setProperty(e, r, n);
    };
  }
  function cp(e, t, n) {
    return arguments.length > 1
      ? this.each(
          (t == null ? Iv : typeof t == "function" ? Dv : Lv)(e, t, n ?? ""),
        )
      : Kt(this.node(), e);
  }
  function Kt(e, t) {
    return (
      e.style.getPropertyValue(t) ||
      Ro(e).getComputedStyle(e, null).getPropertyValue(t)
    );
  }
  function Av(e) {
    return function () {
      delete this[e];
    };
  }
  function Fv(e, t) {
    return function () {
      this[e] = t;
    };
  }
  function Rv(e, t) {
    return function () {
      var n = t.apply(this, arguments);
      n == null ? delete this[e] : (this[e] = n);
    };
  }
  function fp(e, t) {
    return arguments.length > 1
      ? this.each((t == null ? Av : typeof t == "function" ? Rv : Fv)(e, t))
      : this.node()[e];
  }
  function dp(e) {
    return e.trim().split(/^|\s+/);
  }
  function Ds(e) {
    return e.classList || new pp(e);
  }
  function pp(e) {
    ((this._node = e), (this._names = dp(e.getAttribute("class") || "")));
  }
  pp.prototype = {
    add: function (e) {
      var t = this._names.indexOf(e);
      t < 0 &&
        (this._names.push(e),
        this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function (e) {
      var t = this._names.indexOf(e);
      t >= 0 &&
        (this._names.splice(t, 1),
        this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function (e) {
      return this._names.indexOf(e) >= 0;
    },
  };
  function hp(e, t) {
    for (var n = Ds(e), r = -1, i = t.length; ++r < i; ) n.add(t[r]);
  }
  function mp(e, t) {
    for (var n = Ds(e), r = -1, i = t.length; ++r < i; ) n.remove(t[r]);
  }
  function $v(e) {
    return function () {
      hp(this, e);
    };
  }
  function Uv(e) {
    return function () {
      mp(this, e);
    };
  }
  function Vv(e, t) {
    return function () {
      (t.apply(this, arguments) ? hp : mp)(this, e);
    };
  }
  function vp(e, t) {
    var n = dp(e + "");
    if (arguments.length < 2) {
      for (var r = Ds(this.node()), i = -1, o = n.length; ++i < o; )
        if (!r.contains(n[i])) return !1;
      return !0;
    }
    return this.each((typeof t == "function" ? Vv : t ? $v : Uv)(n, t));
  }
  function Bv() {
    this.textContent = "";
  }
  function Hv(e) {
    return function () {
      this.textContent = e;
    };
  }
  function jv(e) {
    return function () {
      var t = e.apply(this, arguments);
      this.textContent = t ?? "";
    };
  }
  function yp(e) {
    return arguments.length
      ? this.each(e == null ? Bv : (typeof e == "function" ? jv : Hv)(e))
      : this.node().textContent;
  }
  function Qv() {
    this.innerHTML = "";
  }
  function Wv(e) {
    return function () {
      this.innerHTML = e;
    };
  }
  function Xv(e) {
    return function () {
      var t = e.apply(this, arguments);
      this.innerHTML = t ?? "";
    };
  }
  function gp(e) {
    return arguments.length
      ? this.each(e == null ? Qv : (typeof e == "function" ? Xv : Wv)(e))
      : this.node().innerHTML;
  }
  function Yv() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function wp() {
    return this.each(Yv);
  }
  function Kv() {
    this.previousSibling &&
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function xp() {
    return this.each(Kv);
  }
  function _p(e) {
    var t = typeof e == "function" ? e : Do(e);
    return this.select(function () {
      return this.appendChild(t.apply(this, arguments));
    });
  }
  function qv() {
    return null;
  }
  function Sp(e, t) {
    var n = typeof e == "function" ? e : Do(e),
      r = t == null ? qv : typeof t == "function" ? t : mn(t);
    return this.select(function () {
      return this.insertBefore(
        n.apply(this, arguments),
        r.apply(this, arguments) || null,
      );
    });
  }
  function Gv() {
    var e = this.parentNode;
    e && e.removeChild(this);
  }
  function kp() {
    return this.each(Gv);
  }
  function Zv() {
    var e = this.cloneNode(!1),
      t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
  }
  function Jv() {
    var e = this.cloneNode(!0),
      t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
  }
  function Ep(e) {
    return this.select(e ? Jv : Zv);
  }
  function Np(e) {
    return arguments.length
      ? this.property("__data__", e)
      : this.node().__data__;
  }
  function bv(e) {
    return function (t) {
      e.call(this, t, this.__data__);
    };
  }
  function ey(e) {
    return e
      .trim()
      .split(/^|\s+/)
      .map(function (t) {
        var n = "",
          r = t.indexOf(".");
        return (
          r >= 0 && ((n = t.slice(r + 1)), (t = t.slice(0, r))),
          { type: t, name: n }
        );
      });
  }
  function ty(e) {
    return function () {
      var t = this.__on;
      if (t) {
        for (var n = 0, r = -1, i = t.length, o; n < i; ++n)
          ((o = t[n]),
            (!e.type || o.type === e.type) && o.name === e.name
              ? this.removeEventListener(o.type, o.listener, o.options)
              : (t[++r] = o));
        ++r ? (t.length = r) : delete this.__on;
      }
    };
  }
  function ny(e, t, n) {
    return function () {
      var r = this.__on,
        i,
        o = bv(t);
      if (r) {
        for (var l = 0, u = r.length; l < u; ++l)
          if ((i = r[l]).type === e.type && i.name === e.name) {
            (this.removeEventListener(i.type, i.listener, i.options),
              this.addEventListener(i.type, (i.listener = o), (i.options = n)),
              (i.value = t));
            return;
          }
      }
      (this.addEventListener(e.type, o, n),
        (i = { type: e.type, name: e.name, value: t, listener: o, options: n }),
        r ? r.push(i) : (this.__on = [i]));
    };
  }
  function Cp(e, t, n) {
    var r = ey(e + ""),
      i,
      o = r.length,
      l;
    if (arguments.length < 2) {
      var u = this.node().__on;
      if (u) {
        for (var s = 0, a = u.length, d; s < a; ++s)
          for (i = 0, d = u[s]; i < o; ++i)
            if ((l = r[i]).type === d.type && l.name === d.name) return d.value;
      }
      return;
    }
    for (u = t ? ny : ty, i = 0; i < o; ++i) this.each(u(r[i], t, n));
    return this;
  }
  function Tp(e, t, n) {
    var r = Ro(e),
      i = r.CustomEvent;
    (typeof i == "function"
      ? (i = new i(t, n))
      : ((i = r.document.createEvent("Event")),
        n
          ? (i.initEvent(t, n.bubbles, n.cancelable), (i.detail = n.detail))
          : i.initEvent(t, !1, !1)),
      e.dispatchEvent(i));
  }
  function ry(e, t) {
    return function () {
      return Tp(this, e, t);
    };
  }
  function iy(e, t) {
    return function () {
      return Tp(this, e, t.apply(this, arguments));
    };
  }
  function zp(e, t) {
    return this.each((typeof t == "function" ? iy : ry)(e, t));
  }
  function* Pp() {
    for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
      for (var r = e[t], i = 0, o = r.length, l; i < o; ++i)
        (l = r[i]) && (yield l);
  }
  var As = [null];
  function J(e, t) {
    ((this._groups = e), (this._parents = t));
  }
  function Mp() {
    return new J([[document.documentElement]], As);
  }
  function oy() {
    return this;
  }
  J.prototype = Mp.prototype = {
    constructor: J,
    select: Qd,
    selectAll: Wd,
    selectChild: Xd,
    selectChildren: Yd,
    filter: Kd,
    data: Zd,
    enter: qd,
    exit: Jd,
    join: bd,
    merge: ep,
    selection: oy,
    order: tp,
    sort: np,
    call: rp,
    nodes: ip,
    node: op,
    size: lp,
    empty: up,
    each: sp,
    attr: ap,
    style: cp,
    property: fp,
    classed: vp,
    text: yp,
    html: gp,
    raise: wp,
    lower: xp,
    append: _p,
    insert: Sp,
    remove: kp,
    clone: Ep,
    datum: Np,
    on: Cp,
    dispatch: zp,
    [Symbol.iterator]: Pp,
  };
  var kt = Mp;
  function Ae(e) {
    return typeof e == "string"
      ? new J([[document.querySelector(e)]], [document.documentElement])
      : new J([[e]], As);
  }
  function Op(e) {
    let t;
    for (; (t = e.sourceEvent); ) e = t;
    return e;
  }
  function Et(e, t) {
    if (((e = Op(e)), t === void 0 && (t = e.currentTarget), t)) {
      var n = t.ownerSVGElement || t;
      if (n.createSVGPoint) {
        var r = n.createSVGPoint();
        return (
          (r.x = e.clientX),
          (r.y = e.clientY),
          (r = r.matrixTransform(t.getScreenCTM().inverse())),
          [r.x, r.y]
        );
      }
      if (t.getBoundingClientRect) {
        var i = t.getBoundingClientRect();
        return [
          e.clientX - i.left - t.clientLeft,
          e.clientY - i.top - t.clientTop,
        ];
      }
    }
    return [e.pageX, e.pageY];
  }
  var $o = { capture: !0, passive: !1 };
  function Uo(e) {
    (e.preventDefault(), e.stopImmediatePropagation());
  }
  function Fs(e) {
    var t = e.document.documentElement,
      n = Ae(e).on("dragstart.drag", Uo, $o);
    "onselectstart" in t
      ? n.on("selectstart.drag", Uo, $o)
      : ((t.__noselect = t.style.MozUserSelect),
        (t.style.MozUserSelect = "none"));
  }
  function Rs(e, t) {
    var n = e.document.documentElement,
      r = Ae(e).on("dragstart.drag", null);
    (t &&
      (r.on("click.drag", Uo, $o),
      setTimeout(function () {
        r.on("click.drag", null);
      }, 0)),
      "onselectstart" in n
        ? r.on("selectstart.drag", null)
        : ((n.style.MozUserSelect = n.__noselect), delete n.__noselect));
  }
  function Vo(e, t, n) {
    ((e.prototype = t.prototype = n), (n.constructor = e));
  }
  function $s(e, t) {
    var n = Object.create(e.prototype);
    for (var r in t) n[r] = t[r];
    return n;
  }
  function br() {}
  var Zr = 0.7,
    jo = 1 / Zr,
    Gn = "\\s*([+-]?\\d+)\\s*",
    Jr = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    at = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    ly = /^#([0-9a-f]{3,8})$/,
    uy = new RegExp(`^rgb\\(${Gn},${Gn},${Gn}\\)$`),
    sy = new RegExp(`^rgb\\(${at},${at},${at}\\)$`),
    ay = new RegExp(`^rgba\\(${Gn},${Gn},${Gn},${Jr}\\)$`),
    cy = new RegExp(`^rgba\\(${at},${at},${at},${Jr}\\)$`),
    fy = new RegExp(`^hsl\\(${Jr},${at},${at}\\)$`),
    dy = new RegExp(`^hsla\\(${Jr},${at},${at},${Jr}\\)$`),
    Ip = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    };
  Vo(br, qt, {
    copy(e) {
      return Object.assign(new this.constructor(), this, e);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: Lp,
    formatHex: Lp,
    formatHex8: py,
    formatHsl: hy,
    formatRgb: Dp,
    toString: Dp,
  });
  function Lp() {
    return this.rgb().formatHex();
  }
  function py() {
    return this.rgb().formatHex8();
  }
  function hy() {
    return Vp(this).formatHsl();
  }
  function Dp() {
    return this.rgb().formatRgb();
  }
  function qt(e) {
    var t, n;
    return (
      (e = (e + "").trim().toLowerCase()),
      (t = ly.exec(e))
        ? ((n = t[1].length),
          (t = parseInt(t[1], 16)),
          n === 6
            ? Ap(t)
            : n === 3
              ? new Te(
                  ((t >> 8) & 15) | ((t >> 4) & 240),
                  ((t >> 4) & 15) | (t & 240),
                  ((t & 15) << 4) | (t & 15),
                  1,
                )
              : n === 8
                ? Bo(
                    (t >> 24) & 255,
                    (t >> 16) & 255,
                    (t >> 8) & 255,
                    (t & 255) / 255,
                  )
                : n === 4
                  ? Bo(
                      ((t >> 12) & 15) | ((t >> 8) & 240),
                      ((t >> 8) & 15) | ((t >> 4) & 240),
                      ((t >> 4) & 15) | (t & 240),
                      (((t & 15) << 4) | (t & 15)) / 255,
                    )
                  : null)
        : (t = uy.exec(e))
          ? new Te(t[1], t[2], t[3], 1)
          : (t = sy.exec(e))
            ? new Te(
                (t[1] * 255) / 100,
                (t[2] * 255) / 100,
                (t[3] * 255) / 100,
                1,
              )
            : (t = ay.exec(e))
              ? Bo(t[1], t[2], t[3], t[4])
              : (t = cy.exec(e))
                ? Bo(
                    (t[1] * 255) / 100,
                    (t[2] * 255) / 100,
                    (t[3] * 255) / 100,
                    t[4],
                  )
                : (t = fy.exec(e))
                  ? $p(t[1], t[2] / 100, t[3] / 100, 1)
                  : (t = dy.exec(e))
                    ? $p(t[1], t[2] / 100, t[3] / 100, t[4])
                    : Ip.hasOwnProperty(e)
                      ? Ap(Ip[e])
                      : e === "transparent"
                        ? new Te(NaN, NaN, NaN, 0)
                        : null
    );
  }
  function Ap(e) {
    return new Te((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
  }
  function Bo(e, t, n, r) {
    return (r <= 0 && (e = t = n = NaN), new Te(e, t, n, r));
  }
  function my(e) {
    return (
      e instanceof br || (e = qt(e)),
      e ? ((e = e.rgb()), new Te(e.r, e.g, e.b, e.opacity)) : new Te()
    );
  }
  function Zn(e, t, n, r) {
    return arguments.length === 1 ? my(e) : new Te(e, t, n, r ?? 1);
  }
  function Te(e, t, n, r) {
    ((this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r));
  }
  Vo(
    Te,
    Zn,
    $s(br, {
      brighter(e) {
        return (
          (e = e == null ? jo : Math.pow(jo, e)),
          new Te(this.r * e, this.g * e, this.b * e, this.opacity)
        );
      },
      darker(e) {
        return (
          (e = e == null ? Zr : Math.pow(Zr, e)),
          new Te(this.r * e, this.g * e, this.b * e, this.opacity)
        );
      },
      rgb() {
        return this;
      },
      clamp() {
        return new Te(yn(this.r), yn(this.g), yn(this.b), Qo(this.opacity));
      },
      displayable() {
        return (
          -0.5 <= this.r &&
          this.r < 255.5 &&
          -0.5 <= this.g &&
          this.g < 255.5 &&
          -0.5 <= this.b &&
          this.b < 255.5 &&
          0 <= this.opacity &&
          this.opacity <= 1
        );
      },
      hex: Fp,
      formatHex: Fp,
      formatHex8: vy,
      formatRgb: Rp,
      toString: Rp,
    }),
  );
  function Fp() {
    return `#${vn(this.r)}${vn(this.g)}${vn(this.b)}`;
  }
  function vy() {
    return `#${vn(this.r)}${vn(this.g)}${vn(this.b)}${vn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function Rp() {
    let e = Qo(this.opacity);
    return `${e === 1 ? "rgb(" : "rgba("}${yn(this.r)}, ${yn(this.g)}, ${yn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
  }
  function Qo(e) {
    return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
  }
  function yn(e) {
    return Math.max(0, Math.min(255, Math.round(e) || 0));
  }
  function vn(e) {
    return ((e = yn(e)), (e < 16 ? "0" : "") + e.toString(16));
  }
  function $p(e, t, n, r) {
    return (
      r <= 0
        ? (e = t = n = NaN)
        : n <= 0 || n >= 1
          ? (e = t = NaN)
          : t <= 0 && (e = NaN),
      new et(e, t, n, r)
    );
  }
  function Vp(e) {
    if (e instanceof et) return new et(e.h, e.s, e.l, e.opacity);
    if ((e instanceof br || (e = qt(e)), !e)) return new et();
    if (e instanceof et) return e;
    e = e.rgb();
    var t = e.r / 255,
      n = e.g / 255,
      r = e.b / 255,
      i = Math.min(t, n, r),
      o = Math.max(t, n, r),
      l = NaN,
      u = o - i,
      s = (o + i) / 2;
    return (
      u
        ? (t === o
            ? (l = (n - r) / u + (n < r) * 6)
            : n === o
              ? (l = (r - t) / u + 2)
              : (l = (t - n) / u + 4),
          (u /= s < 0.5 ? o + i : 2 - o - i),
          (l *= 60))
        : (u = s > 0 && s < 1 ? 0 : l),
      new et(l, u, s, e.opacity)
    );
  }
  function Bp(e, t, n, r) {
    return arguments.length === 1 ? Vp(e) : new et(e, t, n, r ?? 1);
  }
  function et(e, t, n, r) {
    ((this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r));
  }
  Vo(
    et,
    Bp,
    $s(br, {
      brighter(e) {
        return (
          (e = e == null ? jo : Math.pow(jo, e)),
          new et(this.h, this.s, this.l * e, this.opacity)
        );
      },
      darker(e) {
        return (
          (e = e == null ? Zr : Math.pow(Zr, e)),
          new et(this.h, this.s, this.l * e, this.opacity)
        );
      },
      rgb() {
        var e = (this.h % 360) + (this.h < 0) * 360,
          t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
          n = this.l,
          r = n + (n < 0.5 ? n : 1 - n) * t,
          i = 2 * n - r;
        return new Te(
          Us(e >= 240 ? e - 240 : e + 120, i, r),
          Us(e, i, r),
          Us(e < 120 ? e + 240 : e - 120, i, r),
          this.opacity,
        );
      },
      clamp() {
        return new et(Up(this.h), Ho(this.s), Ho(this.l), Qo(this.opacity));
      },
      displayable() {
        return (
          ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
          0 <= this.l &&
          this.l <= 1 &&
          0 <= this.opacity &&
          this.opacity <= 1
        );
      },
      formatHsl() {
        let e = Qo(this.opacity);
        return `${e === 1 ? "hsl(" : "hsla("}${Up(this.h)}, ${Ho(this.s) * 100}%, ${Ho(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
      },
    }),
  );
  function Up(e) {
    return ((e = (e || 0) % 360), e < 0 ? e + 360 : e);
  }
  function Ho(e) {
    return Math.max(0, Math.min(1, e || 0));
  }
  function Us(e, t, n) {
    return (
      (e < 60
        ? t + ((n - t) * e) / 60
        : e < 180
          ? n
          : e < 240
            ? t + ((n - t) * (240 - e)) / 60
            : t) * 255
    );
  }
  function Vs(e, t, n, r, i) {
    var o = e * e,
      l = o * e;
    return (
      ((1 - 3 * e + 3 * o - l) * t +
        (4 - 6 * o + 3 * l) * n +
        (1 + 3 * e + 3 * o - 3 * l) * r +
        l * i) /
      6
    );
  }
  function Hp(e) {
    var t = e.length - 1;
    return function (n) {
      var r = n <= 0 ? (n = 0) : n >= 1 ? ((n = 1), t - 1) : Math.floor(n * t),
        i = e[r],
        o = e[r + 1],
        l = r > 0 ? e[r - 1] : 2 * i - o,
        u = r < t - 1 ? e[r + 2] : 2 * o - i;
      return Vs((n - r / t) * t, l, i, o, u);
    };
  }
  function jp(e) {
    var t = e.length;
    return function (n) {
      var r = Math.floor(((n %= 1) < 0 ? ++n : n) * t),
        i = e[(r + t - 1) % t],
        o = e[r % t],
        l = e[(r + 1) % t],
        u = e[(r + 2) % t];
      return Vs((n - r / t) * t, i, o, l, u);
    };
  }
  var Bs = (e) => () => e;
  function yy(e, t) {
    return function (n) {
      return e + n * t;
    };
  }
  function gy(e, t, n) {
    return (
      (e = Math.pow(e, n)),
      (t = Math.pow(t, n) - e),
      (n = 1 / n),
      function (r) {
        return Math.pow(e + r * t, n);
      }
    );
  }
  function Qp(e) {
    return (e = +e) == 1
      ? Wo
      : function (t, n) {
          return n - t ? gy(t, n, e) : Bs(isNaN(t) ? n : t);
        };
  }
  function Wo(e, t) {
    var n = t - e;
    return n ? yy(e, n) : Bs(isNaN(e) ? t : e);
  }
  var Xo = (function e(t) {
    var n = Qp(t);
    function r(i, o) {
      var l = n((i = Zn(i)).r, (o = Zn(o)).r),
        u = n(i.g, o.g),
        s = n(i.b, o.b),
        a = Wo(i.opacity, o.opacity);
      return function (d) {
        return (
          (i.r = l(d)),
          (i.g = u(d)),
          (i.b = s(d)),
          (i.opacity = a(d)),
          i + ""
        );
      };
    }
    return ((r.gamma = e), r);
  })(1);
  function Wp(e) {
    return function (t) {
      var n = t.length,
        r = new Array(n),
        i = new Array(n),
        o = new Array(n),
        l,
        u;
      for (l = 0; l < n; ++l)
        ((u = Zn(t[l])),
          (r[l] = u.r || 0),
          (i[l] = u.g || 0),
          (o[l] = u.b || 0));
      return (
        (r = e(r)),
        (i = e(i)),
        (o = e(o)),
        (u.opacity = 1),
        function (s) {
          return ((u.r = r(s)), (u.g = i(s)), (u.b = o(s)), u + "");
        }
      );
    };
  }
  var wy = Wp(Hp),
    xy = Wp(jp);
  function je(e, t) {
    return (
      (e = +e),
      (t = +t),
      function (n) {
        return e * (1 - n) + t * n;
      }
    );
  }
  var js = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    Hs = new RegExp(js.source, "g");
  function _y(e) {
    return function () {
      return e;
    };
  }
  function Sy(e) {
    return function (t) {
      return e(t) + "";
    };
  }
  function Qs(e, t) {
    var n = (js.lastIndex = Hs.lastIndex = 0),
      r,
      i,
      o,
      l = -1,
      u = [],
      s = [];
    for (e = e + "", t = t + ""; (r = js.exec(e)) && (i = Hs.exec(t)); )
      ((o = i.index) > n &&
        ((o = t.slice(n, o)), u[l] ? (u[l] += o) : (u[++l] = o)),
        (r = r[0]) === (i = i[0])
          ? u[l]
            ? (u[l] += i)
            : (u[++l] = i)
          : ((u[++l] = null), s.push({ i: l, x: je(r, i) })),
        (n = Hs.lastIndex));
    return (
      n < t.length && ((o = t.slice(n)), u[l] ? (u[l] += o) : (u[++l] = o)),
      u.length < 2
        ? s[0]
          ? Sy(s[0].x)
          : _y(t)
        : ((t = s.length),
          function (a) {
            for (var d = 0, m; d < t; ++d) u[(m = s[d]).i] = m.x(a);
            return u.join("");
          })
    );
  }
  var Xp = 180 / Math.PI,
    Yo = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1,
    };
  function Ws(e, t, n, r, i, o) {
    var l, u, s;
    return (
      (l = Math.sqrt(e * e + t * t)) && ((e /= l), (t /= l)),
      (s = e * n + t * r) && ((n -= e * s), (r -= t * s)),
      (u = Math.sqrt(n * n + r * r)) && ((n /= u), (r /= u), (s /= u)),
      e * r < t * n && ((e = -e), (t = -t), (s = -s), (l = -l)),
      {
        translateX: i,
        translateY: o,
        rotate: Math.atan2(t, e) * Xp,
        skewX: Math.atan(s) * Xp,
        scaleX: l,
        scaleY: u,
      }
    );
  }
  var Ko;
  function Yp(e) {
    let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
      e + "",
    );
    return t.isIdentity ? Yo : Ws(t.a, t.b, t.c, t.d, t.e, t.f);
  }
  function Kp(e) {
    return e == null
      ? Yo
      : (Ko ||
          (Ko = document.createElementNS("http://www.w3.org/2000/svg", "g")),
        Ko.setAttribute("transform", e),
        (e = Ko.transform.baseVal.consolidate())
          ? ((e = e.matrix), Ws(e.a, e.b, e.c, e.d, e.e, e.f))
          : Yo);
  }
  function qp(e, t, n, r) {
    function i(a) {
      return a.length ? a.pop() + " " : "";
    }
    function o(a, d, m, h, v, x) {
      if (a !== m || d !== h) {
        var _ = v.push("translate(", null, t, null, n);
        x.push({ i: _ - 4, x: je(a, m) }, { i: _ - 2, x: je(d, h) });
      } else (m || h) && v.push("translate(" + m + t + h + n);
    }
    function l(a, d, m, h) {
      a !== d
        ? (a - d > 180 ? (d += 360) : d - a > 180 && (a += 360),
          h.push({ i: m.push(i(m) + "rotate(", null, r) - 2, x: je(a, d) }))
        : d && m.push(i(m) + "rotate(" + d + r);
    }
    function u(a, d, m, h) {
      a !== d
        ? h.push({ i: m.push(i(m) + "skewX(", null, r) - 2, x: je(a, d) })
        : d && m.push(i(m) + "skewX(" + d + r);
    }
    function s(a, d, m, h, v, x) {
      if (a !== m || d !== h) {
        var _ = v.push(i(v) + "scale(", null, ",", null, ")");
        x.push({ i: _ - 4, x: je(a, m) }, { i: _ - 2, x: je(d, h) });
      } else
        (m !== 1 || h !== 1) && v.push(i(v) + "scale(" + m + "," + h + ")");
    }
    return function (a, d) {
      var m = [],
        h = [];
      return (
        (a = e(a)),
        (d = e(d)),
        o(a.translateX, a.translateY, d.translateX, d.translateY, m, h),
        l(a.rotate, d.rotate, m, h),
        u(a.skewX, d.skewX, m, h),
        s(a.scaleX, a.scaleY, d.scaleX, d.scaleY, m, h),
        (a = d = null),
        function (v) {
          for (var x = -1, _ = h.length, N; ++x < _; ) m[(N = h[x]).i] = N.x(v);
          return m.join("");
        }
      );
    };
  }
  var Xs = qp(Yp, "px, ", "px)", "deg)"),
    Ys = qp(Kp, ", ", ")", ")");
  var ky = 1e-12;
  function Gp(e) {
    return ((e = Math.exp(e)) + 1 / e) / 2;
  }
  function Ey(e) {
    return ((e = Math.exp(e)) - 1 / e) / 2;
  }
  function Ny(e) {
    return ((e = Math.exp(2 * e)) - 1) / (e + 1);
  }
  var Ks = (function e(t, n, r) {
    function i(o, l) {
      var u = o[0],
        s = o[1],
        a = o[2],
        d = l[0],
        m = l[1],
        h = l[2],
        v = d - u,
        x = m - s,
        _ = v * v + x * x,
        N,
        c;
      if (_ < ky)
        ((c = Math.log(h / a) / t),
          (N = function (P) {
            return [u + P * v, s + P * x, a * Math.exp(t * P * c)];
          }));
      else {
        var f = Math.sqrt(_),
          p = (h * h - a * a + r * _) / (2 * a * n * f),
          w = (h * h - a * a - r * _) / (2 * h * n * f),
          C = Math.log(Math.sqrt(p * p + 1) - p),
          T = Math.log(Math.sqrt(w * w + 1) - w);
        ((c = (T - C) / t),
          (N = function (P) {
            var M = P * c,
              E = Gp(C),
              L = (a / (n * f)) * (E * Ny(t * M + C) - Ey(C));
            return [u + L * v, s + L * x, (a * E) / Gp(t * M + C)];
          }));
      }
      return ((N.duration = (c * 1e3 * t) / Math.SQRT2), N);
    }
    return (
      (i.rho = function (o) {
        var l = Math.max(0.001, +o),
          u = l * l,
          s = u * u;
        return e(l, u, s);
      }),
      i
    );
  })(Math.SQRT2, 2, 4);
  var Jn = 0,
    ti = 0,
    ei = 0,
    Jp = 1e3,
    qo,
    ni,
    Go = 0,
    gn = 0,
    Zo = 0,
    ri = typeof performance == "object" && performance.now ? performance : Date,
    bp =
      typeof window == "object" && window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : function (e) {
            setTimeout(e, 17);
          };
  function oi() {
    return gn || (bp(Cy), (gn = ri.now() + Zo));
  }
  function Cy() {
    gn = 0;
  }
  function ii() {
    this._call = this._time = this._next = null;
  }
  ii.prototype = Jo.prototype = {
    constructor: ii,
    restart: function (e, t, n) {
      if (typeof e != "function")
        throw new TypeError("callback is not a function");
      ((n = (n == null ? oi() : +n) + (t == null ? 0 : +t)),
        !this._next &&
          ni !== this &&
          (ni ? (ni._next = this) : (qo = this), (ni = this)),
        (this._call = e),
        (this._time = n),
        qs());
    },
    stop: function () {
      this._call && ((this._call = null), (this._time = 1 / 0), qs());
    },
  };
  function Jo(e, t, n) {
    var r = new ii();
    return (r.restart(e, t, n), r);
  }
  function eh() {
    (oi(), ++Jn);
    for (var e = qo, t; e; )
      ((t = gn - e._time) >= 0 && e._call.call(void 0, t), (e = e._next));
    --Jn;
  }
  function Zp() {
    ((gn = (Go = ri.now()) + Zo), (Jn = ti = 0));
    try {
      eh();
    } finally {
      ((Jn = 0), zy(), (gn = 0));
    }
  }
  function Ty() {
    var e = ri.now(),
      t = e - Go;
    t > Jp && ((Zo -= t), (Go = e));
  }
  function zy() {
    for (var e, t = qo, n, r = 1 / 0; t; )
      t._call
        ? (r > t._time && (r = t._time), (e = t), (t = t._next))
        : ((n = t._next), (t._next = null), (t = e ? (e._next = n) : (qo = n)));
    ((ni = e), qs(r));
  }
  function qs(e) {
    if (!Jn) {
      ti && (ti = clearTimeout(ti));
      var t = e - gn;
      t > 24
        ? (e < 1 / 0 && (ti = setTimeout(Zp, e - ri.now() - Zo)),
          ei && (ei = clearInterval(ei)))
        : (ei || ((Go = ri.now()), (ei = setInterval(Ty, Jp))),
          (Jn = 1),
          bp(Zp));
    }
  }
  function bo(e, t, n) {
    var r = new ii();
    return (
      (t = t == null ? 0 : +t),
      r.restart(
        (i) => {
          (r.stop(), e(i + t));
        },
        t,
        n,
      ),
      r
    );
  }
  var Py = Yr("start", "end", "cancel", "interrupt"),
    My = [],
    rh = 0,
    th = 1,
    tl = 2,
    el = 3,
    nh = 4,
    nl = 5,
    li = 6;
  function Gt(e, t, n, r, i, o) {
    var l = e.__transition;
    if (!l) e.__transition = {};
    else if (n in l) return;
    Oy(e, n, {
      name: t,
      index: r,
      group: i,
      on: Py,
      tween: My,
      time: o.time,
      delay: o.delay,
      duration: o.duration,
      ease: o.ease,
      timer: null,
      state: rh,
    });
  }
  function ui(e, t) {
    var n = ie(e, t);
    if (n.state > rh) throw new Error("too late; already scheduled");
    return n;
  }
  function fe(e, t) {
    var n = ie(e, t);
    if (n.state > el) throw new Error("too late; already running");
    return n;
  }
  function ie(e, t) {
    var n = e.__transition;
    if (!n || !(n = n[t])) throw new Error("transition not found");
    return n;
  }
  function Oy(e, t, n) {
    var r = e.__transition,
      i;
    ((r[t] = n), (n.timer = Jo(o, 0, n.time)));
    function o(a) {
      ((n.state = th),
        n.timer.restart(l, n.delay, n.time),
        n.delay <= a && l(a - n.delay));
    }
    function l(a) {
      var d, m, h, v;
      if (n.state !== th) return s();
      for (d in r)
        if (((v = r[d]), v.name === n.name)) {
          if (v.state === el) return bo(l);
          v.state === nh
            ? ((v.state = li),
              v.timer.stop(),
              v.on.call("interrupt", e, e.__data__, v.index, v.group),
              delete r[d])
            : +d < t &&
              ((v.state = li),
              v.timer.stop(),
              v.on.call("cancel", e, e.__data__, v.index, v.group),
              delete r[d]);
        }
      if (
        (bo(function () {
          n.state === el &&
            ((n.state = nh), n.timer.restart(u, n.delay, n.time), u(a));
        }),
        (n.state = tl),
        n.on.call("start", e, e.__data__, n.index, n.group),
        n.state === tl)
      ) {
        for (
          n.state = el, i = new Array((h = n.tween.length)), d = 0, m = -1;
          d < h;
          ++d
        )
          (v = n.tween[d].value.call(e, e.__data__, n.index, n.group)) &&
            (i[++m] = v);
        i.length = m + 1;
      }
    }
    function u(a) {
      for (
        var d =
            a < n.duration
              ? n.ease.call(null, a / n.duration)
              : (n.timer.restart(s), (n.state = nl), 1),
          m = -1,
          h = i.length;
        ++m < h;
      )
        i[m].call(e, d);
      n.state === nl &&
        (n.on.call("end", e, e.__data__, n.index, n.group), s());
    }
    function s() {
      ((n.state = li), n.timer.stop(), delete r[t]);
      for (var a in r) return;
      delete e.__transition;
    }
  }
  function Zt(e, t) {
    var n = e.__transition,
      r,
      i,
      o = !0,
      l;
    if (n) {
      t = t == null ? null : t + "";
      for (l in n) {
        if ((r = n[l]).name !== t) {
          o = !1;
          continue;
        }
        ((i = r.state > tl && r.state < nl),
          (r.state = li),
          r.timer.stop(),
          r.on.call(
            i ? "interrupt" : "cancel",
            e,
            e.__data__,
            r.index,
            r.group,
          ),
          delete n[l]);
      }
      o && delete e.__transition;
    }
  }
  function ih(e) {
    return this.each(function () {
      Zt(this, e);
    });
  }
  function Iy(e, t) {
    var n, r;
    return function () {
      var i = fe(this, e),
        o = i.tween;
      if (o !== n) {
        r = n = o;
        for (var l = 0, u = r.length; l < u; ++l)
          if (r[l].name === t) {
            ((r = r.slice()), r.splice(l, 1));
            break;
          }
      }
      i.tween = r;
    };
  }
  function Ly(e, t, n) {
    var r, i;
    if (typeof n != "function") throw new Error();
    return function () {
      var o = fe(this, e),
        l = o.tween;
      if (l !== r) {
        i = (r = l).slice();
        for (var u = { name: t, value: n }, s = 0, a = i.length; s < a; ++s)
          if (i[s].name === t) {
            i[s] = u;
            break;
          }
        s === a && i.push(u);
      }
      o.tween = i;
    };
  }
  function oh(e, t) {
    var n = this._id;
    if (((e += ""), arguments.length < 2)) {
      for (var r = ie(this.node(), n).tween, i = 0, o = r.length, l; i < o; ++i)
        if ((l = r[i]).name === e) return l.value;
      return null;
    }
    return this.each((t == null ? Iy : Ly)(n, e, t));
  }
  function bn(e, t, n) {
    var r = e._id;
    return (
      e.each(function () {
        var i = fe(this, r);
        (i.value || (i.value = {}))[t] = n.apply(this, arguments);
      }),
      function (i) {
        return ie(i, r).value[t];
      }
    );
  }
  function rl(e, t) {
    var n;
    return (
      typeof t == "number"
        ? je
        : t instanceof qt
          ? Xo
          : (n = qt(t))
            ? ((t = n), Xo)
            : Qs
    )(e, t);
  }
  function Dy(e) {
    return function () {
      this.removeAttribute(e);
    };
  }
  function Ay(e) {
    return function () {
      this.removeAttributeNS(e.space, e.local);
    };
  }
  function Fy(e, t, n) {
    var r,
      i = n + "",
      o;
    return function () {
      var l = this.getAttribute(e);
      return l === i ? null : l === r ? o : (o = t((r = l), n));
    };
  }
  function Ry(e, t, n) {
    var r,
      i = n + "",
      o;
    return function () {
      var l = this.getAttributeNS(e.space, e.local);
      return l === i ? null : l === r ? o : (o = t((r = l), n));
    };
  }
  function $y(e, t, n) {
    var r, i, o;
    return function () {
      var l,
        u = n(this),
        s;
      return u == null
        ? void this.removeAttribute(e)
        : ((l = this.getAttribute(e)),
          (s = u + ""),
          l === s
            ? null
            : l === r && s === i
              ? o
              : ((i = s), (o = t((r = l), u))));
    };
  }
  function Uy(e, t, n) {
    var r, i, o;
    return function () {
      var l,
        u = n(this),
        s;
      return u == null
        ? void this.removeAttributeNS(e.space, e.local)
        : ((l = this.getAttributeNS(e.space, e.local)),
          (s = u + ""),
          l === s
            ? null
            : l === r && s === i
              ? o
              : ((i = s), (o = t((r = l), u))));
    };
  }
  function lh(e, t) {
    var n = St(e),
      r = n === "transform" ? Ys : rl;
    return this.attrTween(
      e,
      typeof t == "function"
        ? (n.local ? Uy : $y)(n, r, bn(this, "attr." + e, t))
        : t == null
          ? (n.local ? Ay : Dy)(n)
          : (n.local ? Ry : Fy)(n, r, t),
    );
  }
  function Vy(e, t) {
    return function (n) {
      this.setAttribute(e, t.call(this, n));
    };
  }
  function By(e, t) {
    return function (n) {
      this.setAttributeNS(e.space, e.local, t.call(this, n));
    };
  }
  function Hy(e, t) {
    var n, r;
    function i() {
      var o = t.apply(this, arguments);
      return (o !== r && (n = (r = o) && By(e, o)), n);
    }
    return ((i._value = t), i);
  }
  function jy(e, t) {
    var n, r;
    function i() {
      var o = t.apply(this, arguments);
      return (o !== r && (n = (r = o) && Vy(e, o)), n);
    }
    return ((i._value = t), i);
  }
  function uh(e, t) {
    var n = "attr." + e;
    if (arguments.length < 2) return (n = this.tween(n)) && n._value;
    if (t == null) return this.tween(n, null);
    if (typeof t != "function") throw new Error();
    var r = St(e);
    return this.tween(n, (r.local ? Hy : jy)(r, t));
  }
  function Qy(e, t) {
    return function () {
      ui(this, e).delay = +t.apply(this, arguments);
    };
  }
  function Wy(e, t) {
    return (
      (t = +t),
      function () {
        ui(this, e).delay = t;
      }
    );
  }
  function sh(e) {
    var t = this._id;
    return arguments.length
      ? this.each((typeof e == "function" ? Qy : Wy)(t, e))
      : ie(this.node(), t).delay;
  }
  function Xy(e, t) {
    return function () {
      fe(this, e).duration = +t.apply(this, arguments);
    };
  }
  function Yy(e, t) {
    return (
      (t = +t),
      function () {
        fe(this, e).duration = t;
      }
    );
  }
  function ah(e) {
    var t = this._id;
    return arguments.length
      ? this.each((typeof e == "function" ? Xy : Yy)(t, e))
      : ie(this.node(), t).duration;
  }
  function Ky(e, t) {
    if (typeof t != "function") throw new Error();
    return function () {
      fe(this, e).ease = t;
    };
  }
  function ch(e) {
    var t = this._id;
    return arguments.length ? this.each(Ky(t, e)) : ie(this.node(), t).ease;
  }
  function qy(e, t) {
    return function () {
      var n = t.apply(this, arguments);
      if (typeof n != "function") throw new Error();
      fe(this, e).ease = n;
    };
  }
  function fh(e) {
    if (typeof e != "function") throw new Error();
    return this.each(qy(this._id, e));
  }
  function dh(e) {
    typeof e != "function" && (e = qr(e));
    for (
      var t = this._groups, n = t.length, r = new Array(n), i = 0;
      i < n;
      ++i
    )
      for (var o = t[i], l = o.length, u = (r[i] = []), s, a = 0; a < l; ++a)
        (s = o[a]) && e.call(s, s.__data__, a, o) && u.push(s);
    return new _e(r, this._parents, this._name, this._id);
  }
  function ph(e) {
    if (e._id !== this._id) throw new Error();
    for (
      var t = this._groups,
        n = e._groups,
        r = t.length,
        i = n.length,
        o = Math.min(r, i),
        l = new Array(r),
        u = 0;
      u < o;
      ++u
    )
      for (
        var s = t[u],
          a = n[u],
          d = s.length,
          m = (l[u] = new Array(d)),
          h,
          v = 0;
        v < d;
        ++v
      )
        (h = s[v] || a[v]) && (m[v] = h);
    for (; u < r; ++u) l[u] = t[u];
    return new _e(l, this._parents, this._name, this._id);
  }
  function Gy(e) {
    return (e + "")
      .trim()
      .split(/^|\s+/)
      .every(function (t) {
        var n = t.indexOf(".");
        return (n >= 0 && (t = t.slice(0, n)), !t || t === "start");
      });
  }
  function Zy(e, t, n) {
    var r,
      i,
      o = Gy(t) ? ui : fe;
    return function () {
      var l = o(this, e),
        u = l.on;
      (u !== r && (i = (r = u).copy()).on(t, n), (l.on = i));
    };
  }
  function hh(e, t) {
    var n = this._id;
    return arguments.length < 2
      ? ie(this.node(), n).on.on(e)
      : this.each(Zy(n, e, t));
  }
  function Jy(e) {
    return function () {
      var t = this.parentNode;
      for (var n in this.__transition) if (+n !== e) return;
      t && t.removeChild(this);
    };
  }
  function mh() {
    return this.on("end.remove", Jy(this._id));
  }
  function vh(e) {
    var t = this._name,
      n = this._id;
    typeof e != "function" && (e = mn(e));
    for (
      var r = this._groups, i = r.length, o = new Array(i), l = 0;
      l < i;
      ++l
    )
      for (
        var u = r[l], s = u.length, a = (o[l] = new Array(s)), d, m, h = 0;
        h < s;
        ++h
      )
        (d = u[h]) &&
          (m = e.call(d, d.__data__, h, u)) &&
          ("__data__" in d && (m.__data__ = d.__data__),
          (a[h] = m),
          Gt(a[h], t, n, h, a, ie(d, n)));
    return new _e(o, this._parents, t, n);
  }
  function yh(e) {
    var t = this._name,
      n = this._id;
    typeof e != "function" && (e = Kr(e));
    for (var r = this._groups, i = r.length, o = [], l = [], u = 0; u < i; ++u)
      for (var s = r[u], a = s.length, d, m = 0; m < a; ++m)
        if ((d = s[m])) {
          for (
            var h = e.call(d, d.__data__, m, s),
              v,
              x = ie(d, n),
              _ = 0,
              N = h.length;
            _ < N;
            ++_
          )
            (v = h[_]) && Gt(v, t, n, _, h, x);
          (o.push(h), l.push(d));
        }
    return new _e(o, l, t, n);
  }
  var by = kt.prototype.constructor;
  function gh() {
    return new by(this._groups, this._parents);
  }
  function eg(e, t) {
    var n, r, i;
    return function () {
      var o = Kt(this, e),
        l = (this.style.removeProperty(e), Kt(this, e));
      return o === l
        ? null
        : o === n && l === r
          ? i
          : (i = t((n = o), (r = l)));
    };
  }
  function wh(e) {
    return function () {
      this.style.removeProperty(e);
    };
  }
  function tg(e, t, n) {
    var r,
      i = n + "",
      o;
    return function () {
      var l = Kt(this, e);
      return l === i ? null : l === r ? o : (o = t((r = l), n));
    };
  }
  function ng(e, t, n) {
    var r, i, o;
    return function () {
      var l = Kt(this, e),
        u = n(this),
        s = u + "";
      return (
        u == null && (s = u = (this.style.removeProperty(e), Kt(this, e))),
        l === s ? null : l === r && s === i ? o : ((i = s), (o = t((r = l), u)))
      );
    };
  }
  function rg(e, t) {
    var n,
      r,
      i,
      o = "style." + t,
      l = "end." + o,
      u;
    return function () {
      var s = fe(this, e),
        a = s.on,
        d = s.value[o] == null ? u || (u = wh(t)) : void 0;
      ((a !== n || i !== d) && (r = (n = a).copy()).on(l, (i = d)), (s.on = r));
    };
  }
  function xh(e, t, n) {
    var r = (e += "") == "transform" ? Xs : rl;
    return t == null
      ? this.styleTween(e, eg(e, r)).on("end.style." + e, wh(e))
      : typeof t == "function"
        ? this.styleTween(e, ng(e, r, bn(this, "style." + e, t))).each(
            rg(this._id, e),
          )
        : this.styleTween(e, tg(e, r, t), n).on("end.style." + e, null);
  }
  function ig(e, t, n) {
    return function (r) {
      this.style.setProperty(e, t.call(this, r), n);
    };
  }
  function og(e, t, n) {
    var r, i;
    function o() {
      var l = t.apply(this, arguments);
      return (l !== i && (r = (i = l) && ig(e, l, n)), r);
    }
    return ((o._value = t), o);
  }
  function _h(e, t, n) {
    var r = "style." + (e += "");
    if (arguments.length < 2) return (r = this.tween(r)) && r._value;
    if (t == null) return this.tween(r, null);
    if (typeof t != "function") throw new Error();
    return this.tween(r, og(e, t, n ?? ""));
  }
  function lg(e) {
    return function () {
      this.textContent = e;
    };
  }
  function ug(e) {
    return function () {
      var t = e(this);
      this.textContent = t ?? "";
    };
  }
  function Sh(e) {
    return this.tween(
      "text",
      typeof e == "function"
        ? ug(bn(this, "text", e))
        : lg(e == null ? "" : e + ""),
    );
  }
  function sg(e) {
    return function (t) {
      this.textContent = e.call(this, t);
    };
  }
  function ag(e) {
    var t, n;
    function r() {
      var i = e.apply(this, arguments);
      return (i !== n && (t = (n = i) && sg(i)), t);
    }
    return ((r._value = e), r);
  }
  function kh(e) {
    var t = "text";
    if (arguments.length < 1) return (t = this.tween(t)) && t._value;
    if (e == null) return this.tween(t, null);
    if (typeof e != "function") throw new Error();
    return this.tween(t, ag(e));
  }
  function Eh() {
    for (
      var e = this._name,
        t = this._id,
        n = il(),
        r = this._groups,
        i = r.length,
        o = 0;
      o < i;
      ++o
    )
      for (var l = r[o], u = l.length, s, a = 0; a < u; ++a)
        if ((s = l[a])) {
          var d = ie(s, t);
          Gt(s, e, n, a, l, {
            time: d.time + d.delay + d.duration,
            delay: 0,
            duration: d.duration,
            ease: d.ease,
          });
        }
    return new _e(r, this._parents, e, n);
  }
  function Nh() {
    var e,
      t,
      n = this,
      r = n._id,
      i = n.size();
    return new Promise(function (o, l) {
      var u = { value: l },
        s = {
          value: function () {
            --i === 0 && o();
          },
        };
      (n.each(function () {
        var a = fe(this, r),
          d = a.on;
        (d !== e &&
          ((t = (e = d).copy()),
          t._.cancel.push(u),
          t._.interrupt.push(u),
          t._.end.push(s)),
          (a.on = t));
      }),
        i === 0 && o());
    });
  }
  var cg = 0;
  function _e(e, t, n, r) {
    ((this._groups = e), (this._parents = t), (this._name = n), (this._id = r));
  }
  function Ch(e) {
    return kt().transition(e);
  }
  function il() {
    return ++cg;
  }
  var Nt = kt.prototype;
  _e.prototype = Ch.prototype = {
    constructor: _e,
    select: vh,
    selectAll: yh,
    selectChild: Nt.selectChild,
    selectChildren: Nt.selectChildren,
    filter: dh,
    merge: ph,
    selection: gh,
    transition: Eh,
    call: Nt.call,
    nodes: Nt.nodes,
    node: Nt.node,
    size: Nt.size,
    empty: Nt.empty,
    each: Nt.each,
    on: hh,
    attr: lh,
    attrTween: uh,
    style: xh,
    styleTween: _h,
    text: Sh,
    textTween: kh,
    remove: mh,
    tween: oh,
    delay: sh,
    duration: ah,
    ease: ch,
    easeVarying: fh,
    end: Nh,
    [Symbol.iterator]: Nt[Symbol.iterator],
  };
  function ol(e) {
    return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
  }
  var fg = { time: null, delay: 0, duration: 250, ease: ol };
  function dg(e, t) {
    for (var n; !(n = e.__transition) || !(n = n[t]); )
      if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
    return n;
  }
  function Th(e) {
    var t, n;
    e instanceof _e
      ? ((t = e._id), (e = e._name))
      : ((t = il()), ((n = fg).time = oi()), (e = e == null ? null : e + ""));
    for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
      for (var l = r[o], u = l.length, s, a = 0; a < u; ++a)
        (s = l[a]) && Gt(s, e, t, a, l, n || dg(s, t));
    return new _e(r, this._parents, e, t);
  }
  kt.prototype.interrupt = ih;
  kt.prototype.transition = Th;
  var { abs: HS, max: jS, min: QS } = Math;
  function zh(e) {
    return [+e[0], +e[1]];
  }
  function pg(e) {
    return [zh(e[0]), zh(e[1])];
  }
  var WS = {
      name: "x",
      handles: ["w", "e"].map(Gs),
      input: function (e, t) {
        return e == null
          ? null
          : [
              [+e[0], t[0][1]],
              [+e[1], t[1][1]],
            ];
      },
      output: function (e) {
        return e && [e[0][0], e[1][0]];
      },
    },
    XS = {
      name: "y",
      handles: ["n", "s"].map(Gs),
      input: function (e, t) {
        return e == null
          ? null
          : [
              [t[0][0], +e[0]],
              [t[1][0], +e[1]],
            ];
      },
      output: function (e) {
        return e && [e[0][1], e[1][1]];
      },
    },
    YS = {
      name: "xy",
      handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Gs),
      input: function (e) {
        return e == null ? null : pg(e);
      },
      output: function (e) {
        return e;
      },
    };
  function Gs(e) {
    return { type: e };
  }
  var si = (e) => () => e;
  function Zs(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
    Object.defineProperties(this, {
      type: { value: e, enumerable: !0, configurable: !0 },
      sourceEvent: { value: t, enumerable: !0, configurable: !0 },
      target: { value: n, enumerable: !0, configurable: !0 },
      transform: { value: r, enumerable: !0, configurable: !0 },
      _: { value: i },
    });
  }
  function tt(e, t, n) {
    ((this.k = e), (this.x = t), (this.y = n));
  }
  tt.prototype = {
    constructor: tt,
    scale: function (e) {
      return e === 1 ? this : new tt(this.k * e, this.x, this.y);
    },
    translate: function (e, t) {
      return (e === 0) & (t === 0)
        ? this
        : new tt(this.k, this.x + this.k * e, this.y + this.k * t);
    },
    apply: function (e) {
      return [e[0] * this.k + this.x, e[1] * this.k + this.y];
    },
    applyX: function (e) {
      return e * this.k + this.x;
    },
    applyY: function (e) {
      return e * this.k + this.y;
    },
    invert: function (e) {
      return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
    },
    invertX: function (e) {
      return (e - this.x) / this.k;
    },
    invertY: function (e) {
      return (e - this.y) / this.k;
    },
    rescaleX: function (e) {
      return e
        .copy()
        .domain(e.range().map(this.invertX, this).map(e.invert, e));
    },
    rescaleY: function (e) {
      return e
        .copy()
        .domain(e.range().map(this.invertY, this).map(e.invert, e));
    },
    toString: function () {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    },
  };
  var wn = new tt(1, 0, 0);
  Js.prototype = tt.prototype;
  function Js(e) {
    for (; !e.__zoom; ) if (!(e = e.parentNode)) return wn;
    return e.__zoom;
  }
  function ll(e) {
    e.stopImmediatePropagation();
  }
  function er(e) {
    (e.preventDefault(), e.stopImmediatePropagation());
  }
  function hg(e) {
    return (!e.ctrlKey || e.type === "wheel") && !e.button;
  }
  function mg() {
    var e = this;
    return e instanceof SVGElement
      ? ((e = e.ownerSVGElement || e),
        e.hasAttribute("viewBox")
          ? ((e = e.viewBox.baseVal),
            [
              [e.x, e.y],
              [e.x + e.width, e.y + e.height],
            ])
          : [
              [0, 0],
              [e.width.baseVal.value, e.height.baseVal.value],
            ])
      : [
          [0, 0],
          [e.clientWidth, e.clientHeight],
        ];
  }
  function Ph() {
    return this.__zoom || wn;
  }
  function vg(e) {
    return (
      -e.deltaY *
      (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) *
      (e.ctrlKey ? 10 : 1)
    );
  }
  function yg() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function gg(e, t, n) {
    var r = e.invertX(t[0][0]) - n[0][0],
      i = e.invertX(t[1][0]) - n[1][0],
      o = e.invertY(t[0][1]) - n[0][1],
      l = e.invertY(t[1][1]) - n[1][1];
    return e.translate(
      i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
      l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l),
    );
  }
  function bs() {
    var e = hg,
      t = mg,
      n = gg,
      r = vg,
      i = yg,
      o = [0, 1 / 0],
      l = [
        [-1 / 0, -1 / 0],
        [1 / 0, 1 / 0],
      ],
      u = 250,
      s = Ks,
      a = Yr("start", "zoom", "end"),
      d,
      m,
      h,
      v = 500,
      x = 150,
      _ = 0,
      N = 10;
    function c(y) {
      y.property("__zoom", Ph)
        .on("wheel.zoom", M, { passive: !1 })
        .on("mousedown.zoom", E)
        .on("dblclick.zoom", L)
        .filter(i)
        .on("touchstart.zoom", G)
        .on("touchmove.zoom", W)
        .on("touchend.zoom touchcancel.zoom", ze)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    ((c.transform = function (y, O, k, I) {
      var D = y.selection ? y.selection() : y;
      (D.property("__zoom", Ph),
        y !== D
          ? C(y, O, k, I)
          : D.interrupt().each(function () {
              T(this, arguments)
                .event(I)
                .start()
                .zoom(
                  null,
                  typeof O == "function" ? O.apply(this, arguments) : O,
                )
                .end();
            }));
    }),
      (c.scaleBy = function (y, O, k, I) {
        c.scaleTo(
          y,
          function () {
            var D = this.__zoom.k,
              F = typeof O == "function" ? O.apply(this, arguments) : O;
            return D * F;
          },
          k,
          I,
        );
      }),
      (c.scaleTo = function (y, O, k, I) {
        c.transform(
          y,
          function () {
            var D = t.apply(this, arguments),
              F = this.__zoom,
              R =
                k == null
                  ? w(D)
                  : typeof k == "function"
                    ? k.apply(this, arguments)
                    : k,
              V = F.invert(R),
              b = typeof O == "function" ? O.apply(this, arguments) : O;
            return n(p(f(F, b), R, V), D, l);
          },
          k,
          I,
        );
      }),
      (c.translateBy = function (y, O, k, I) {
        c.transform(
          y,
          function () {
            return n(
              this.__zoom.translate(
                typeof O == "function" ? O.apply(this, arguments) : O,
                typeof k == "function" ? k.apply(this, arguments) : k,
              ),
              t.apply(this, arguments),
              l,
            );
          },
          null,
          I,
        );
      }),
      (c.translateTo = function (y, O, k, I, D) {
        c.transform(
          y,
          function () {
            var F = t.apply(this, arguments),
              R = this.__zoom,
              V =
                I == null
                  ? w(F)
                  : typeof I == "function"
                    ? I.apply(this, arguments)
                    : I;
            return n(
              wn
                .translate(V[0], V[1])
                .scale(R.k)
                .translate(
                  typeof O == "function" ? -O.apply(this, arguments) : -O,
                  typeof k == "function" ? -k.apply(this, arguments) : -k,
                ),
              F,
              l,
            );
          },
          I,
          D,
        );
      }));
    function f(y, O) {
      return (
        (O = Math.max(o[0], Math.min(o[1], O))),
        O === y.k ? y : new tt(O, y.x, y.y)
      );
    }
    function p(y, O, k) {
      var I = O[0] - k[0] * y.k,
        D = O[1] - k[1] * y.k;
      return I === y.x && D === y.y ? y : new tt(y.k, I, D);
    }
    function w(y) {
      return [(+y[0][0] + +y[1][0]) / 2, (+y[0][1] + +y[1][1]) / 2];
    }
    function C(y, O, k, I) {
      y.on("start.zoom", function () {
        T(this, arguments).event(I).start();
      })
        .on("interrupt.zoom end.zoom", function () {
          T(this, arguments).event(I).end();
        })
        .tween("zoom", function () {
          var D = this,
            F = arguments,
            R = T(D, F).event(I),
            V = t.apply(D, F),
            b = k == null ? w(V) : typeof k == "function" ? k.apply(D, F) : k,
            nt = Math.max(V[1][0] - V[0][0], V[1][1] - V[0][1]),
            ue = D.__zoom,
            Qe = typeof O == "function" ? O.apply(D, F) : O,
            ct = s(
              ue.invert(b).concat(nt / ue.k),
              Qe.invert(b).concat(nt / Qe.k),
            );
          return function (We) {
            if (We === 1) We = Qe;
            else {
              var ft = ct(We),
                fl = nt / ft[2];
              We = new tt(fl, b[0] - ft[0] * fl, b[1] - ft[1] * fl);
            }
            R.zoom(null, We);
          };
        });
    }
    function T(y, O, k) {
      return (!k && y.__zooming) || new P(y, O);
    }
    function P(y, O) {
      ((this.that = y),
        (this.args = O),
        (this.active = 0),
        (this.sourceEvent = null),
        (this.extent = t.apply(y, O)),
        (this.taps = 0));
    }
    P.prototype = {
      event: function (y) {
        return (y && (this.sourceEvent = y), this);
      },
      start: function () {
        return (
          ++this.active === 1 &&
            ((this.that.__zooming = this), this.emit("start")),
          this
        );
      },
      zoom: function (y, O) {
        return (
          this.mouse &&
            y !== "mouse" &&
            (this.mouse[1] = O.invert(this.mouse[0])),
          this.touch0 &&
            y !== "touch" &&
            (this.touch0[1] = O.invert(this.touch0[0])),
          this.touch1 &&
            y !== "touch" &&
            (this.touch1[1] = O.invert(this.touch1[0])),
          (this.that.__zoom = O),
          this.emit("zoom"),
          this
        );
      },
      end: function () {
        return (
          --this.active === 0 && (delete this.that.__zooming, this.emit("end")),
          this
        );
      },
      emit: function (y) {
        var O = Ae(this.that).datum();
        a.call(
          y,
          this.that,
          new Zs(y, {
            sourceEvent: this.sourceEvent,
            target: c,
            type: y,
            transform: this.that.__zoom,
            dispatch: a,
          }),
          O,
        );
      },
    };
    function M(y, ...O) {
      if (!e.apply(this, arguments)) return;
      var k = T(this, O).event(y),
        I = this.__zoom,
        D = Math.max(
          o[0],
          Math.min(o[1], I.k * Math.pow(2, r.apply(this, arguments))),
        ),
        F = Et(y);
      if (k.wheel)
        ((k.mouse[0][0] !== F[0] || k.mouse[0][1] !== F[1]) &&
          (k.mouse[1] = I.invert((k.mouse[0] = F))),
          clearTimeout(k.wheel));
      else {
        if (I.k === D) return;
        ((k.mouse = [F, I.invert(F)]), Zt(this), k.start());
      }
      (er(y),
        (k.wheel = setTimeout(R, x)),
        k.zoom("mouse", n(p(f(I, D), k.mouse[0], k.mouse[1]), k.extent, l)));
      function R() {
        ((k.wheel = null), k.end());
      }
    }
    function E(y, ...O) {
      if (h || !e.apply(this, arguments)) return;
      var k = y.currentTarget,
        I = T(this, O, !0).event(y),
        D = Ae(y.view).on("mousemove.zoom", b, !0).on("mouseup.zoom", nt, !0),
        F = Et(y, k),
        R = y.clientX,
        V = y.clientY;
      (Fs(y.view),
        ll(y),
        (I.mouse = [F, this.__zoom.invert(F)]),
        Zt(this),
        I.start());
      function b(ue) {
        if ((er(ue), !I.moved)) {
          var Qe = ue.clientX - R,
            ct = ue.clientY - V;
          I.moved = Qe * Qe + ct * ct > _;
        }
        I.event(ue).zoom(
          "mouse",
          n(
            p(I.that.__zoom, (I.mouse[0] = Et(ue, k)), I.mouse[1]),
            I.extent,
            l,
          ),
        );
      }
      function nt(ue) {
        (D.on("mousemove.zoom mouseup.zoom", null),
          Rs(ue.view, I.moved),
          er(ue),
          I.event(ue).end());
      }
    }
    function L(y, ...O) {
      if (e.apply(this, arguments)) {
        var k = this.__zoom,
          I = Et(y.changedTouches ? y.changedTouches[0] : y, this),
          D = k.invert(I),
          F = k.k * (y.shiftKey ? 0.5 : 2),
          R = n(p(f(k, F), I, D), t.apply(this, O), l);
        (er(y),
          u > 0
            ? Ae(this).transition().duration(u).call(C, R, I, y)
            : Ae(this).call(c.transform, R, I, y));
      }
    }
    function G(y, ...O) {
      if (e.apply(this, arguments)) {
        var k = y.touches,
          I = k.length,
          D = T(this, O, y.changedTouches.length === I).event(y),
          F,
          R,
          V,
          b;
        for (ll(y), R = 0; R < I; ++R)
          ((V = k[R]),
            (b = Et(V, this)),
            (b = [b, this.__zoom.invert(b), V.identifier]),
            D.touch0
              ? !D.touch1 &&
                D.touch0[2] !== b[2] &&
                ((D.touch1 = b), (D.taps = 0))
              : ((D.touch0 = b), (F = !0), (D.taps = 1 + !!d)));
        (d && (d = clearTimeout(d)),
          F &&
            (D.taps < 2 &&
              ((m = b[0]),
              (d = setTimeout(function () {
                d = null;
              }, v))),
            Zt(this),
            D.start()));
      }
    }
    function W(y, ...O) {
      if (this.__zooming) {
        var k = T(this, O).event(y),
          I = y.changedTouches,
          D = I.length,
          F,
          R,
          V,
          b;
        for (er(y), F = 0; F < D; ++F)
          ((R = I[F]),
            (V = Et(R, this)),
            k.touch0 && k.touch0[2] === R.identifier
              ? (k.touch0[0] = V)
              : k.touch1 && k.touch1[2] === R.identifier && (k.touch1[0] = V));
        if (((R = k.that.__zoom), k.touch1)) {
          var nt = k.touch0[0],
            ue = k.touch0[1],
            Qe = k.touch1[0],
            ct = k.touch1[1],
            We = (We = Qe[0] - nt[0]) * We + (We = Qe[1] - nt[1]) * We,
            ft = (ft = ct[0] - ue[0]) * ft + (ft = ct[1] - ue[1]) * ft;
          ((R = f(R, Math.sqrt(We / ft))),
            (V = [(nt[0] + Qe[0]) / 2, (nt[1] + Qe[1]) / 2]),
            (b = [(ue[0] + ct[0]) / 2, (ue[1] + ct[1]) / 2]));
        } else if (k.touch0) ((V = k.touch0[0]), (b = k.touch0[1]));
        else return;
        k.zoom("touch", n(p(R, V, b), k.extent, l));
      }
    }
    function ze(y, ...O) {
      if (this.__zooming) {
        var k = T(this, O).event(y),
          I = y.changedTouches,
          D = I.length,
          F,
          R;
        for (
          ll(y),
            h && clearTimeout(h),
            h = setTimeout(function () {
              h = null;
            }, v),
            F = 0;
          F < D;
          ++F
        )
          ((R = I[F]),
            k.touch0 && k.touch0[2] === R.identifier
              ? delete k.touch0
              : k.touch1 && k.touch1[2] === R.identifier && delete k.touch1);
        if (
          (k.touch1 && !k.touch0 && ((k.touch0 = k.touch1), delete k.touch1),
          k.touch0)
        )
          k.touch0[1] = this.__zoom.invert(k.touch0[0]);
        else if (
          (k.end(),
          k.taps === 2 &&
            ((R = Et(R, this)), Math.hypot(m[0] - R[0], m[1] - R[1]) < N))
        ) {
          var V = Ae(this).on("dblclick.zoom");
          V && V.apply(this, arguments);
        }
      }
    }
    return (
      (c.wheelDelta = function (y) {
        return arguments.length
          ? ((r = typeof y == "function" ? y : si(+y)), c)
          : r;
      }),
      (c.filter = function (y) {
        return arguments.length
          ? ((e = typeof y == "function" ? y : si(!!y)), c)
          : e;
      }),
      (c.touchable = function (y) {
        return arguments.length
          ? ((i = typeof y == "function" ? y : si(!!y)), c)
          : i;
      }),
      (c.extent = function (y) {
        return arguments.length
          ? ((t =
              typeof y == "function"
                ? y
                : si([
                    [+y[0][0], +y[0][1]],
                    [+y[1][0], +y[1][1]],
                  ])),
            c)
          : t;
      }),
      (c.scaleExtent = function (y) {
        return arguments.length
          ? ((o[0] = +y[0]), (o[1] = +y[1]), c)
          : [o[0], o[1]];
      }),
      (c.translateExtent = function (y) {
        return arguments.length
          ? ((l[0][0] = +y[0][0]),
            (l[1][0] = +y[1][0]),
            (l[0][1] = +y[0][1]),
            (l[1][1] = +y[1][1]),
            c)
          : [
              [l[0][0], l[0][1]],
              [l[1][0], l[1][1]],
            ];
      }),
      (c.constrain = function (y) {
        return arguments.length ? ((n = y), c) : n;
      }),
      (c.duration = function (y) {
        return arguments.length ? ((u = +y), c) : u;
      }),
      (c.interpolate = function (y) {
        return arguments.length ? ((s = y), c) : s;
      }),
      (c.on = function () {
        var y = a.on.apply(a, arguments);
        return y === a ? c : y;
      }),
      (c.clickDistance = function (y) {
        return arguments.length ? ((_ = (y = +y) * y), c) : Math.sqrt(_);
      }),
      (c.tapDistance = function (y) {
        return arguments.length ? ((N = +y), c) : N;
      }),
      c
    );
  }
  var Mh = { high: "#22C55E", medium: "#EAB308", low: "#EF4444" },
    Oh = { high: "#FFFFFF", medium: "#7C2D12", low: "#FFFFFF" },
    ea = "#3366CC",
    Ih = "#165DFF",
    sl = 112,
    al = 96,
    Ph = {
      questionSize: sl,
      questionFont: 15,
      answerSize: al,
      answerFont: 15,
      solidWidth: 2,
      solidColor: ea,
      dashedWidth: 2,
      dashedColor: ea,
      aiArcWidth: 2,
      aiArcColor: "#DC2626",
      qArcWidth: 2,
      qArcColor: "#2563EB",
      wavyWidth: 2,
      wavyColor: "#000000",
    },
    Lh = 28,
    Dh = -24,
    cl = {
      id: "preview",
      title: "\u9884\u89C8\u4F1A\u8BDD",
      modelProvider: "Kimi \u7F51\u9875\u7248",
      updatedAt: new Date().toISOString(),
      storageProgress: 100,
      patternSummary: { progressive: 1, independent: 1, repeat_correction: 1 },
      nodes: [],
      edges: [],
    };
  function Ct(e, t = {}) {
    return new Promise((n) => {
      if (!window.chrome?.runtime?.sendMessage) {
        n({ ok: !0, session: cl, sessions: [cl] });
        return;
      }
      window.chrome.runtime.sendMessage({ type: e, payload: t }, (r) => {
        if (window.chrome.runtime.lastError) {
          n({ ok: !1, error: window.chrome.runtime.lastError.message });
          return;
        }
        n(
          r || {
            ok: !1,
            error: "\u672A\u6536\u5230\u6269\u5C55\u54CD\u5E94\u3002",
          },
        );
      });
    });
  }
  function ia(e) {
    return e
      ? new Date(e).toLocaleString("zh-CN", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "\u6682\u65E0\u65F6\u95F4";
  }
  function Ah(e) {
    return e === "high" ? "\u9AD8" : e === "low" ? "\u4F4E" : "\u4E2D";
  }
  function ta(e) {
    return e === "independent"
      ? "\u72EC\u7ACB"
      : e === "repeat_correction"
        ? "\u91CD\u590D\u6307\u6B63"
        : "\u9012\u8FDB";
  }
  function ul(e) {
    return e === "high"
      ? "quality-high"
      : e === "low"
        ? "quality-low"
        : "quality-medium";
  }
  function _g(e) {
    let t = e.x1,
      n = e.y1,
      r = e.x2,
      i = e.y2,
      o = Math.hypot(r - t, i - n);
    if (o < 2) return `M ${t} ${n} L ${r} ${i}`;
    let l = Math.max(3, Math.round(o / 24)),
      u = (r - t) / l,
      s = (i - n) / l,
      a = 7,
      d = -(i - n) / o,
      m = (r - t) / o,
      h = `M ${t} ${n}`;
    for (let v = 1; v <= l; v += 1) {
      let x = t + u * v,
        _ = n + s * v,
        N = v % 2 === 0 ? -1 : 1,
        c = t + u * (v - 0.5) + d * a * N,
        f = n + s * (v - 0.5) + m * a * N;
      h += ` Q ${c} ${f} ${x} ${_}`;
    }
    return h;
  }
  function Sg(e) {
    let t = e.x1,
      n = e.y1,
      r = e.x2,
      i = e.y2,
      o = Math.hypot(r - t, i - n);
    if (o < 2) return `M ${t} ${n} L ${r} ${i}`;
    let l = (t + r) / 2,
      u = (n + i) / 2,
      s = Math.max(20, Math.min(72, o * 0.25)),
      a = u - s;
    return `M ${t} ${n} Q ${l} ${a} ${r} ${i}`;
  }
  function na(e, t) {
    return !t || !e?.nodes ? null : e.nodes.find((n) => n.id === t.id) || null;
  }
  function kg(e) {
    let t = new Map(),
      n = Array.isArray(e?.nodes) ? e.nodes : [],
      r = (i, o) => new Date(i.createdAt) - new Date(o.createdAt);
    return (
      n
        .filter((i) => i.type === "question")
        .sort(r)
        .forEach((i, o) => {
          t.set(i.id, `\u63D0\u95EE${o + 1}`);
        }),
      n
        .filter((i) => i.type === "answer")
        .sort(r)
        .forEach((i, o) => {
          t.set(i.id, `\u56DE\u7B54${o + 1}`);
        }),
      t
    );
  }
  function Eg(e, t) {
    let n = e.filter((i) => i.visible !== !1),
      r = new Map(n.map((i) => [String(i.id), i]));
    return t.flatMap((i) => {
      let o = r.get(String(i.source)),
        l = r.get(String(i.target));
      if (!o || !l) return [];
      if (i.relationType === "ai_related_context") {
        if (l.type !== "question") return [];
        if (o.type !== "question" && o.type !== "answer") return [];
        return [{ ...i, source: o, target: l }];
      }
      if (i.relationType === "q_related_context") {
        if (o.type !== l.type) return [];
        if (o.type !== "question" && o.type !== "answer") return [];
        return [{ ...i, source: o, target: l }];
      }
      if (
        i.relationType !== "semantic_context" &&
        String(o.conversationId || "") !== String(l.conversationId || "")
      )
        return [];
      if (o.type === "question" && l.type === "answer") {
        if (String(l.questionId || "") !== String(o.id)) return [];
      } else if (o.type === "answer" && l.type === "question") {
        if (
          i.relationType !== "semantic_context" &&
          String(l.previousAnswerId || "") !== String(o.id)
        )
          return [];
      } else return [];
      return [{ ...i, source: o, target: l }];
    });
  }
  function Ng({
    session: e,
    nodeLabels: t,
    onSelectNode: n,
    onLocateNode: qn,
    lassoMode: Ln,
    setLassoMode: Dn,
    zoom: r,
    setZoom: i,
    onLassoAnalysisStatusChange: Vn,
  }) {
    let o = (0, g.useRef)(null),
      l = (0, g.useRef)(null),
      u = (0, g.useRef)(null),
      [s, a] = (0, g.useState)(null),
      [d, m] = (0, g.useState)({ x: 18, y: 18 }),
      [B, U] = (0, g.useState)(() => ({ ...Ph })),
      [Ve, Be] = (0, g.useState)(() => ({ ...Ph })),
      [kn, pn] = (0, g.useState)([]),
      [Sn, Cn] = (0, g.useState)([]),
      [Mn, En] = (0, g.useState)(0),
      [zr, Kr] = (0, g.useState)(null),
      Wn = (0, g.useRef)({ drawing: !1, points: [], screen: [] }),
      Nn = (0, g.useRef)([]),
      h = (0, g.useMemo)(() => {
        let N = (e?.nodes || []).filter((p) => p.visible !== !1),
          c = new Map(N.map((p) => [p.id, p])),
          f = Eg(N, e?.edges || []);
        return { nodes: N, edges: f, nodeMap: c };
      }, [e]),
      zn = (0, g.useMemo)(() => new Set(Sn), [Sn]);
    (0, g.useEffect)(() => {
      Nn.current = kn;
    }, [kn]);
    (0, g.useEffect)(() => {
      Sn.length || Be({ ...B });
    }, [B, Sn.length]);
    function Rn(N, c) {
      let f = N.x,
        p = N.y,
        w = !1;
      for (let C = 0, T = c.length - 1; C < c.length; T = C++) {
        let P = c[C].x,
          M = c[C].y,
          E = c[T].x,
          I = c[T].y;
        M > p != I > p &&
          f < ((E - P) * (p - M)) / (I - M || 1e-6) + P &&
          (w = !w);
      }
      return w;
    }
    function Qn(N) {
      if (!Array.isArray(N) || N.length < 3) {
        (Cn([]), En((c) => c + 1));
        return;
      }
      let c = h.nodes
        .filter((f) => f?.position && Rn(f.position, N))
        .map((f) => f.id);
      (Cn(c), En((f) => f + 1));
    }
    function Hr(N) {
      if (Sn.length) {
        let p = N(Ve),
          w = Object.keys(p).filter((C) => p[C] !== Ve[C]);
        (Be(p),
          w.length &&
            (Sn.forEach((C) => {
              let T = h.nodeMap.get(C);
              if (!T) return;
              (w.includes("questionSize") &&
                T.type === "question" &&
                (T.__questionSize = p.questionSize),
                w.includes("questionFont") &&
                  T.type === "question" &&
                  (T.__questionFont = p.questionFont),
                w.includes("answerSize") &&
                  T.type === "answer" &&
                  (T.__answerSize = p.answerSize),
                w.includes("answerFont") &&
                  T.type === "answer" &&
                  (T.__answerFont = p.answerFont));
            }),
            h.edges.forEach((C) => {
              if (!(zn.has(C.source.id) || zn.has(C.target.id))) return;
              (w.includes("solidWidth") && (C.__solidWidth = p.solidWidth),
                w.includes("solidColor") && (C.__solidColor = p.solidColor),
                w.includes("aiArcWidth") &&
                  C.style === "semantic-ai-dashed-arc" &&
                  (C.__aiArcWidth = p.aiArcWidth),
                w.includes("aiArcColor") &&
                  C.style === "semantic-ai-dashed-arc" &&
                  (C.__aiArcColor = p.aiArcColor),
                w.includes("qArcWidth") &&
                  C.style === "semantic-q-dashed-arc" &&
                  (C.__qArcWidth = p.qArcWidth),
                w.includes("qArcColor") &&
                  C.style === "semantic-q-dashed-arc" &&
                  (C.__qArcColor = p.qArcColor),
                w.includes("dashedWidth") &&
                  C.style !== "semantic-ai-dashed-arc" &&
                  C.style !== "semantic-q-dashed-arc" &&
                  (C.__dashedWidth = p.dashedWidth),
                w.includes("dashedColor") &&
                  C.style !== "semantic-ai-dashed-arc" &&
                  C.style !== "semantic-q-dashed-arc" &&
                  (C.__dashedColor = p.dashedColor),
                w.includes("aiArcWidth") &&
                  C.style === "semantic-ai-dashed-arc" &&
                  (C.__aiArcWidth = p.aiArcWidth),
                w.includes("aiArcColor") &&
                  C.style === "semantic-ai-dashed-arc" &&
                  (C.__aiArcColor = p.aiArcColor),
                w.includes("wavyWidth") && (C.__wavyWidth = p.wavyWidth),
                w.includes("wavyColor") && (C.__wavyColor = p.wavyColor));
            }),
            En((C) => C + 1)));
        return;
      }
      U((p) => {
        let w = N(p);
        return (Be(w), w);
      });
    }
    function ir() {
      (Cn([]), pn([]), En((N) => N + 1), Dn?.(!1));
    }
    async function urAnalyzeSelected() {
      if (!Sn.length) return;
      Vn?.("qa", "start");
      let N = await Ct("RUN_AI_ANALYSIS_SELECTED", { nodeIds: Sn });
      if (!N?.ok || !N.session) {
        Vn?.("qa", "start");
        return;
      }
      Vn?.("qa", "done");
      (t(N.session), a((c) => na(N.session, c)), Dn?.(!1), Cn([]), pn([]));
    }
    async function urAnalyzeSelectedLocal() {
      if (!Sn.length) return;
      Vn?.("qa", "start");
      let N = await Ct("RUN_LOCAL_ANALYSIS_SELECTED", { nodeIds: Sn });
      if (!N?.ok || !N.session) {
        Vn?.("qa", "start");
        return;
      }
      Vn?.("qa", "done");
      (t(N.session), a((c) => na(N.session, c)), Dn?.(!1), Cn([]), pn([]));
    }
    async function urAnalyzeSelectedSingleLocal() {
      if (!Sn.length) return;
      Vn?.("single", "start");
      let N = await Ct("RUN_Q_ANALYSIS_SELECTED", { nodeIds: Sn });
      if (!N?.ok || !N.session) {
        Vn?.("single", "start");
        return;
      }
      Vn?.("single", "done");
      (t(N.session), a((c) => na(N.session, c)), Dn?.(!1), Cn([]), pn([]));
    }
    async function urAnalyzeSelectedSingleAi() {
      if (!Sn.length) return;
      Vn?.("single", "start");
      let N = await Ct("RUN_AI_Q_ANALYSIS_SELECTED", { nodeIds: Sn });
      if (!N?.ok || !N.session) {
        Vn?.("single", "start");
        return;
      }
      Vn?.("single", "done");
      (t(N.session), a((c) => na(N.session, c)), Dn?.(!1), Cn([]), pn([]));
    }
    function or(N) {
      if (!Ln || !u.current) return;
      (N.preventDefault(), N.stopPropagation());
      let c = u.current.getBoundingClientRect(),
        f = { x: N.clientX - c.left, y: N.clientY - c.top },
        p = l.current ? Et(N, l.current) : [f.x, f.y];
      ((Wn.current = {
        drawing: !0,
        points: [{ x: p[0], y: p[1] }],
        screen: [f],
      }),
        pn([f]),
        Cn([]),
        N.currentTarget.setPointerCapture?.(N.pointerId));
    }
    function lr(N) {
      if (!Ln || !Wn.current.drawing || !u.current) return;
      (N.preventDefault(), N.stopPropagation());
      let c = u.current.getBoundingClientRect(),
        f = { x: N.clientX - c.left, y: N.clientY - c.top },
        p = l.current ? Et(N, l.current) : [f.x, f.y],
        w = Wn.current.screen[Wn.current.screen.length - 1];
      if (w && Math.hypot(f.x - w.x, f.y - w.y) < 2) return;
      (Wn.current.screen.push(f),
        Wn.current.points.push({ x: p[0], y: p[1] }),
        pn([...Wn.current.screen]));
    }
    function ur(N) {
      if (!Ln || !Wn.current.drawing) return;
      (N.preventDefault(), N.stopPropagation());
      let c = Wn.current.points || [],
        f = Wn.current.screen || [],
        p = !1;
      if (f.length >= 8) {
        let w = f[0],
          C = f[f.length - 1];
        if (Math.hypot(C.x - w.x, C.y - w.y) <= 18) {
          let T = c.slice(),
            P = f.slice();
          (T.push({ ...T[0] }),
            P.push({ ...P[0] }),
            Qn(T),
            pn(P),
            (p = !0),
            Dn?.(!1));
        }
      }
      ((Wn.current = { drawing: !1, points: [], screen: [] }),
        p || (pn([]), Dn?.(!1)),
        N.currentTarget.releasePointerCapture?.(N.pointerId));
    }
    function v(N) {
      if (!u.current) return;
      let c = u.current.getBoundingClientRect(),
        f = Math.max(12, Math.min(N.clientX - c.left + 14, c.width - 208)),
        p = Math.max(12, Math.min(N.clientY - c.top + 14, c.height - 132));
      m({ x: f, y: p });
    }
    function x(N, c) {
      (v(c), a(N));
    }
    function _(N) {
      v(N);
    }
    let ar = Sn.length > 0;
    return (
      (0, g.useEffect)(() => {
        if (!o.current || !l.current) return;
        let N = Ae(o.current),
          c = Ae(l.current),
          f = bs()
            .filter(() => !ar)
            .scaleExtent([0.325, 2])
            .on("zoom", (p) => {
              if (ar) return;
              (c.attr("transform", p.transform.toString()),
                i(Number(p.transform.k.toFixed(2))));
            });
        return (
          N.call(f),
          N.call(f.transform, wn.translate(Lh, Dh).scale(r)),
          () => {
            N.on(".zoom", null);
          }
        );
      }, [i, r, ar]),
      (0, g.useEffect)(() => {
        if (!l.current) return;
        let N = Ae(l.current);
        N.selectAll("*").remove();
        let c = new Map(),
          x0 = new Map(),
          Q0 = new Map(),
          f = [];
        function Cg(P, M) {
          let E = x0.get(String(P?.id || ""));
          E && E.style("display", M ? null : "none");
        }
        function Rg(P, M) {
          let E = String(P?.id || ""),
            I = Q0.get(E);
          if (!I) return;
          if (M) {
            (I.attr("stroke", "#9CA3AF"), I.attr("stroke-width", 3));
            return;
          }
          let G = zn.has(E),
            W = P.__customFill ? "#FFFFFF" : P.type === "question" ? "#FFFFFF" : Oh[P.quality] || Oh.medium,
            ze = P.__customFill || (P.type === "question" ? Ih : Mh[P.quality] || Mh.medium);
          (I.attr("stroke", G ? "#165DFF" : ze), I.attr("stroke-width", G ? 3 : 1.5), I.attr("fill", ze || W));
        }
        function Tg(P, M) {
          let E = l.current?.ownerSVGElement;
          if (!E) return;
          let I = E.getBoundingClientRect(),
            G = Number(M?.clientX) || 0,
            W = Number(M?.clientY) || 0,
            ze = Math.max(10, Math.min(G - I.left + 12, I.width - 240)),
            se = Math.max(10, Math.min(W - I.top + 12, I.height - 100));
          Kr({ text: P, x: ze, y: se });
        }
        function pz(P) {
          let M = Math.max(0.4, Math.min(3, Number(P.__sizeScale) || 1));
          return P.type === "question"
            ? {
                width: Math.round((P.__questionSize || B.questionSize) * 1.28 * M),
                height: Math.max(
                  40,
                  Math.round((P.__questionSize || B.questionSize) * 0.64 * M),
                ),
                font: P.__questionFont || B.questionFont,
              }
            : {
                width: Math.round((P.__answerSize || B.answerSize) * 1.32 * M),
                height: Math.max(
                  38,
                  Math.round((P.__answerSize || B.answerSize) * 0.62 * M),
                ),
                font: P.__answerFont || B.answerFont,
              };
        }
        function yz(P, M) {
          let E = pz(P),
            I = pz(M),
            G = P.position.x <= M.position.x;
          return {
            x1: G ? P.position.x + E.width / 2 : P.position.x - E.width / 2,
            y1: P.position.y,
            x2: G ? M.position.x - I.width / 2 : M.position.x + I.width / 2,
            y2: M.position.y,
          };
        }
        function bz(P) {
          return P.style === "semantic-ai-dashed-arc"
            ? {
                variant: "arc",
                stroke: P.__solidColor || P.__aiArcColor || B.aiArcColor,
                width: P.__aiArcWidth || B.aiArcWidth,
                dasharray: "8 6",
              }
            : P.style === "semantic-q-dashed-arc"
            ? {
                variant: "arc",
                stroke: P.__solidColor || P.__qArcColor || B.qArcColor,
                width: P.__qArcWidth || B.qArcWidth,
                dasharray: "8 6",
              }
            : P.style === "semantic-wavy"
            ? {
                variant: "wavy",
                stroke: P.__wavyColor || B.wavyColor,
                width: P.__wavyWidth || B.wavyWidth,
                dasharray: "0",
              }
            : P.style === "dashed"
              ? {
                  variant: "line",
                  stroke: P.__solidColor || P.__dashedColor || B.dashedColor,
                  width: P.__dashedWidth || B.dashedWidth,
                  dasharray: "8 6",
                }
              : P.style === "dotted"
                ? {
                    variant: "line",
                    stroke: P.__solidColor || P.__dashedColor || B.dashedColor,
                    width: P.__dashedWidth || B.dashedWidth,
                    dasharray: "2 7",
                  }
                : {
                    variant: "line",
                    stroke: P.__solidColor || B.solidColor,
                    width: P.__solidWidth || B.solidWidth,
                    dasharray: "0",
                  };
        }
        function p(P) {
          let M = P.source,
            E = P.target;
          if (!M || !E) return;
          let I = bz(P),
            G = yz(M, E),
            W =
              I.variant === "wavy" || I.variant === "arc"
                ? N.append("path")
                    .attr("fill", "none")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                : N.append("line").attr("stroke-dasharray", I.dasharray);
          (W.attr("stroke", I.stroke).attr("stroke-width", I.width),
            I.variant === "arc" && W.attr("stroke-dasharray", I.dasharray));
          if (
            P.style === "semantic-ai-dashed-arc" ||
            P.style === "semantic-q-dashed-arc"
          ) {
            W.style("cursor", "pointer")
              .on("mouseenter", (ze) => {
                let se =
                  P.style === "semantic-ai-dashed-arc"
                    ? String(P.aiReason || "")
                    : String(P.qReason || "");
                let F0 = bz(P).width;
                W.attr("stroke-width", Math.max(Number(F0 || 0) + 1.5, 1.5));
                Tg(se || "无判定说明", ze);
                Cg(P.source, !0);
                Cg(P.target, !0);
                Rg(P.source, !0);
                Rg(P.target, !0);
              })
              .on("mousemove", (ze) => {
                let se =
                  P.style === "semantic-ai-dashed-arc"
                    ? String(P.aiReason || "")
                    : String(P.qReason || "");
                Tg(se || "无判定说明", ze);
              })
              .on("mouseleave", () => {
                W.attr("stroke-width", bz(P).width);
                Kr(null);
                Cg(P.source, !1);
                Cg(P.target, !1);
                Rg(P.source, !1);
                Rg(P.target, !1);
              });
          }
          f.push({ edge: P, element: W, variant: I.variant });
          I.variant === "wavy"
            ? W.attr("d", _g(G))
            : I.variant === "arc"
              ? W.attr("d", Sg(G))
            : W.attr("x1", G.x1)
                .attr("y1", G.y1)
                .attr("x2", G.x2)
                .attr("y2", G.y2);
        }
        function w() {
          f.forEach(({ edge: P, element: M, variant: E }) => {
            let I = yz(P.source, P.target),
              G = bz(P);
            (M.attr("stroke", G.stroke).attr("stroke-width", G.width),
              E === "line" && M.attr("stroke-dasharray", G.dasharray),
              E === "arc" && M.attr("stroke-dasharray", G.dasharray));
            E === "wavy"
              ? M.attr("d", _g(I))
              : E === "arc"
                ? M.attr("d", Sg(I))
              : M.attr("x1", I.x1)
                  .attr("y1", I.y1)
                  .attr("x2", I.x2)
                  .attr("y2", I.y2);
          });
        }
        function C(P, M) {
          let E = c.get(P.id);
          if (E)
            E.attr(
              "transform",
              `translate(${P.position.x - M.width / 2} ${P.position.y - M.height / 2})`,
            );
        }
        function T(P, M, E) {
          let I = l.current?.ownerSVGElement;
          if (!I) return;
          E.preventDefault();
          E.stopPropagation();
          I.setPointerCapture?.(E.pointerId);
          let G = Et(E, l.current),
            W = zn.has(P.id)
              ? Sn.map((j) => h.nodeMap.get(j)).filter((j) => j?.position)
              : [P],
            ze = new Map(
              W.map((j) => [j.id, { x: j.position.x, y: j.position.y }]),
            ),
            se = 8,
            F = (j) => {
              let q = Et(j, l.current),
                ie = q[0] - G[0],
                oe = q[1] - G[1];
              (Math.abs(ie) > se || Math.abs(oe) > se) && (P.__dragging = !0);
              W.forEach((re) => {
                let le = ze.get(re.id);
                if (!le) return;
                (re.position = { x: le.x + ie, y: le.y + oe }, C(re, pz(re)));
              }),
                zn.has(P.id) &&
                  Nn.current?.length &&
                  pn((re) =>
                    re.length
                      ? re.map((le) => ({ x: le.x + ie * r, y: le.y + oe * r }))
                      : re,
                  ),
                w(),
                a(P);
              (G = q),
                W.forEach((re) => {
                  ze.set(re.id, { x: re.position.x, y: re.position.y });
                });
            },
            V = (j) => {
              (I.releasePointerCapture?.(j.pointerId),
                I.removeEventListener("pointermove", F),
                I.removeEventListener("pointerup", V),
                I.removeEventListener("pointercancel", V));
              window.setTimeout(() => {
                (P.__dragging = !1),
                  W.forEach((q) => {
                    q.__dragging = !1;
                  });
              }, 0);
            };
          ((P.__dragging = !1),
            W.forEach((j) => {
              j.__dragging = !1;
            }));
          (I.addEventListener("pointermove", F),
            I.addEventListener("pointerup", V),
            I.addEventListener("pointercancel", V));
        }
        h.edges.forEach(p);
        h.nodes.forEach((P) => {
          let M = P.type === "question",
            E = pz(P).width,
            I = pz(P).height,
            G = P.position.x - E / 2,
            W = P.position.y - I / 2,
            ze = M ? Ih : Mh[P.quality] || Mh.medium,
            F = t.get(P.id) || (M ? "\u63D0\u95EE" : "\u56DE\u7B54"),
            V = P.__customFill
              ? "#FFFFFF"
              : M
                ? "#FFFFFF"
                : Oh[P.quality] || Oh.medium,
            jz = P.__customFill || ze,
            Kz = zn.has(P.id),
            j = null,
            K = null,
            Ye = null;
          j = N.append("g")
            .attr("transform", `translate(${G} ${W})`)
            .style("cursor", Ln ? "crosshair" : "pointer")
            .style("touch-action", "none")
            .style("pointer-events", Ln ? "none" : "all")
            .on("mouseenter", (j) => {
              (x(P, j),
                Ye && (window.clearTimeout(Ye), (Ye = null)),
                K && K.style("display", null));
            })
            .on("mousemove", (j) => _(j))
            .on("mouseleave", () => {
              (a(null),
                Ye && window.clearTimeout(Ye),
                (Ye = window.setTimeout(() => {
                  K && K.style("display", "none");
                }, 500)));
            });
          Ln || j.on("pointerdown", (j) => T(P, { width: E, height: I }, j));
          j.on("click", (j) => {
              if (Ln) return;
              if (P.__dragging) {
                (j.preventDefault(), j.stopPropagation());
                return;
              }
              n(P);
            });
          c.set(P.id, j);
          let H0 = M
            ? j
                .append("ellipse")
                .attr("cx", E / 2)
                .attr("cy", I / 2)
                .attr("rx", E / 2)
                .attr("ry", I / 2)
                .attr("fill", jz)
                .attr("stroke", Kz ? "#165DFF" : jz)
                .attr("stroke-width", Kz ? 3 : 1.5)
            : j
                .append("rect")
                .attr("width", E)
                .attr("height", I)
                .attr("rx", Math.max(10, Math.round(I * 0.32)))
                .attr("fill", jz)
                .attr("stroke", Kz ? "#165DFF" : jz)
                .attr("stroke-width", Kz ? 3 : 1.5);
          Q0.set(String(P.id), H0);
          j.append("foreignObject")
            .attr("width", E)
            .attr("height", I)
            .style("pointer-events", "none")
            .append("xhtml:div")
            .attr("class", "node-label solid-node")
                .append("xhtml:span")
                .attr("class", "node-seq")
                .style("color", V)
                .style("font-size", `${pz(P).font}px`)
                .text(F);
          K = j
            .append("g")
            .attr("class", "node-info-button")
            .attr(
              "transform",
              `translate(${E + 12} ${Math.max(6, Math.round(I / 2 - 12))})`,
            )
            .style("display", "none")
            .style("cursor", "pointer");
          x0.set(String(P.id), K);
          K.append("circle")
            .attr("cx", 12)
            .attr("cy", 12)
            .attr("r", 12)
            .attr("fill", "#FFFFFF")
            .attr("stroke", "#165DFF")
            .attr("stroke-width", 1.5);
          K.append("path")
            .attr(
              "d",
              "M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z",
            )
            .attr("fill", "#165DFF")
            .attr("transform", "translate(4 4) scale(0.03125)");
          K.on("pointerdown", (q) => {
            (q.preventDefault(), q.stopPropagation());
          }).on("click", (q) => {
            (q.preventDefault(), q.stopPropagation(), qn?.(P));
          });
          P.tags?.length &&
            j
              .append("circle")
              .attr("class", "annotation-dot")
              .attr("cx", E - 10)
              .attr("cy", 10)
              .attr("r", 6)
              .attr("fill", "#FFFFFF")
              .attr("stroke", Ih)
              .attr("stroke-width", 2);
        });
      }, [B, h, n, qn, t, Ln, zn, Mn]),
      g.default.createElement(
        "div",
        { ref: u, className: "canvas-panel" },
        g.default.createElement(
              "div",
              { className: "d3-control-panel" },
              g.default.createElement(
                "label",
                null,
                "\u63D0\u95EE\u8282\u70B9",
                g.default.createElement("input", {
                  type: "range",
                  min: "72",
                  max: "180",
                  step: "2",
                  value: Sn.length ? Ve.questionSize : B.questionSize,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, questionSize: Number(N.target.value) })),
                }),
                g.default.createElement(
                  "span",
                  null,
                  Sn.length ? Ve.questionSize : B.questionSize,
                ),
              ),
              g.default.createElement(
                "label",
                null,
                "\u63D0\u95EE\u5B57\u4F53",
                g.default.createElement("input", {
                  type: "range",
                  min: "10",
                  max: "28",
                  step: "1",
                  value: Sn.length ? Ve.questionFont : B.questionFont,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, questionFont: Number(N.target.value) })),
                }),
                g.default.createElement(
                  "span",
                  null,
                  Sn.length ? Ve.questionFont : B.questionFont,
                ),
              ),
              g.default.createElement(
                "label",
                null,
                "\u56DE\u7B54\u8282\u70B9",
                g.default.createElement("input", {
                  type: "range",
                  min: "64",
                  max: "180",
                  step: "2",
                  value: Sn.length ? Ve.answerSize : B.answerSize,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, answerSize: Number(N.target.value) })),
                }),
                g.default.createElement(
                  "span",
                  null,
                  Sn.length ? Ve.answerSize : B.answerSize,
                ),
              ),
              g.default.createElement(
                "label",
                null,
                "\u56DE\u7B54\u5B57\u4F53",
                g.default.createElement("input", {
                  type: "range",
                  min: "10",
                  max: "28",
                  step: "1",
                  value: Sn.length ? Ve.answerFont : B.answerFont,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, answerFont: Number(N.target.value) })),
                }),
                g.default.createElement(
                  "span",
                  null,
                  Sn.length ? Ve.answerFont : B.answerFont,
                ),
              ),
              g.default.createElement(
                "label",
                null,
                "\u5B9E\u7EBF",
                g.default.createElement("input", {
                  type: "range",
                  min: "0",
                  max: "8",
                  step: "0.5",
                  value: Sn.length ? Ve.solidWidth : B.solidWidth,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, solidWidth: Number(N.target.value) })),
                }),
                g.default.createElement("input", {
                  type: "color",
                  value: Sn.length ? Ve.solidColor : B.solidColor,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, solidColor: N.target.value })),
                }),
              ),
              g.default.createElement(
                "label",
                null,
                "\u7EA2\u8272\u865A\u5F27\u7EBF",
                g.default.createElement("input", {
                  type: "range",
                  min: "0",
                  max: "8",
                  step: "0.5",
                  value: Sn.length ? Ve.aiArcWidth : B.aiArcWidth,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, aiArcWidth: Number(N.target.value) })),
                }),
                g.default.createElement("input", {
                  type: "color",
                  value: Sn.length ? Ve.aiArcColor : B.aiArcColor,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, aiArcColor: N.target.value })),
                }),
              ),
              g.default.createElement(
                "label",
                null,
                "\u84DD\u8272\u865A\u5F27\u7EBF",
                g.default.createElement("input", {
                  type: "range",
                  min: "0",
                  max: "8",
                  step: "0.5",
                  value: Sn.length ? Ve.qArcWidth : B.qArcWidth,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, qArcWidth: Number(N.target.value) })),
                }),
                g.default.createElement("input", {
                  type: "color",
                  value: Sn.length ? Ve.qArcColor : B.qArcColor,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, qArcColor: N.target.value })),
                }),
              ),
              g.default.createElement(
                "label",
                null,
                "\u6CE2\u6D6A\u7EBF",
                g.default.createElement("input", {
                  type: "range",
                  min: "0",
                  max: "8",
                  step: "0.5",
                  value: Sn.length ? Ve.wavyWidth : B.wavyWidth,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, wavyWidth: Number(N.target.value) })),
                }),
                g.default.createElement("input", {
                  type: "color",
                  value: Sn.length ? Ve.wavyColor : B.wavyColor,
                  onChange: (N) =>
                    Hr((c) => ({ ...c, wavyColor: N.target.value })),
                }),
              ),
              g.default.createElement(
                "button",
                {
                  type: "button",
                  className: Ln ? "active" : "",
                  onClick: () => Dn?.((N) => !N),
                },
                Ln ? "\u9000\u51FA\u5708\u7D22" : "\u5708\u7D22",
              ),
              Sn.length
                ? g.default.createElement(
                    "div",
                    { className: "lasso-batch-panel inline" },
                    g.default.createElement(
                      "div",
                      { className: "lasso-batch-head" },
                      g.default.createElement(
                        "strong",
                        null,
                        `\u5DF2\u5708\u9009 ${Sn.length} \u4E2A\u8282\u70B9`,
                      ),
                      g.default.createElement(
                        "button",
                        { type: "button", onClick: ir },
                        "\u5173\u95ED",
                      ),
                    ),
                    g.default.createElement(
                      "div",
                      { className: "lasso-batch-actions" },
                      g.default.createElement(
                        "button",
                        { type: "button", onClick: urAnalyzeSelected },
                        "AI-QA\u5173\u8054",
                      ),
                      g.default.createElement(
                        "button",
                        { type: "button", onClick: urAnalyzeSelectedLocal },
                        "local-QA\u5173\u8054",
                      ),
                    ),
                    g.default.createElement(
                      "div",
                      { className: "lasso-batch-actions" },
                      g.default.createElement(
                        "button",
                        { type: "button", onClick: urAnalyzeSelectedSingleAi },
                        "AI-单侧",
                      ),
                      g.default.createElement(
                        "button",
                        { type: "button", onClick: urAnalyzeSelectedSingleLocal },
                        "local-单侧",
                      ),
                    ),
                  )
                : null,
      
            ),
        h.nodes.length
          ? null
          : g.default.createElement(
              "div",
              { className: "canvas-empty" },
              g.default.createElement(
                "div",
                null,
                g.default.createElement(
                  "strong",
                  null,
                  "\u7B49\u5F85\u81EA\u52A8\u6293\u53D6",
                ),
                g.default.createElement(
                  "div",
                  null,
                  "\u6253\u5F00 Kimi \u5BF9\u8BDD\u9875\u540E\uFF0C\u53F3\u4FA7\u4F1A\u81EA\u52A8\u751F\u6210\u95EE\u7B54\u8282\u70B9\u3001\u8FDE\u7EBF\u548C\u8D28\u91CF\u6807\u8BB0\u3002",
                ),
              ),
            ),
        g.default.createElement(
          "svg",
          { ref: o, className: "canvas-svg", viewBox: "0 0 920 702" },
          g.default.createElement(
            "g",
            {
              key: "d3",
              ref: l,
              transform: `translate(${Lh} ${Dh}) scale(${r})`,
            },
          ),
        ),
        g.default.createElement(
          "div",
          {
            className: `lasso-overlay${Ln ? " active" : ""}`,
            onPointerDown: or,
            onPointerMove: lr,
            onPointerUp: ur,
            onPointerCancel: ur,
          },
          g.default.createElement(
            "svg",
            { className: "lasso-overlay-svg" },
            kn.length
              ? g.default.createElement("polyline", {
                  className: "lasso-polyline",
                  points: kn.map((N) => `${N.x},${N.y}`).join(" "),
                })
              : null,
          ),
        ),
        s
          ? g.default.createElement(
              "div",
              {
                className: "node-preview",
                style: { left: `${d.x}px`, top: `${d.y}px` },
              },
              g.default.createElement(
                "strong",
                null,
                t.get(s.id) ||
                  (s.type === "question" ? "\u63D0\u95EE" : "\u56DE\u7B54"),
              ),
              g.default.createElement(
                "div",
                { className: "node-preview-text" },
                s.content,
              ),
            )
          : null,
        zr
          ? g.default.createElement(
              "div",
              {
                className: "edge-reason-tooltip",
                style: { left: `${zr.x}px`, top: `${zr.y}px` },
              },
              zr.text,
            )
          : null,
      )
    );
  }
  function ra({ title: e, onClose: t, children: n, className: r = "" }) {
    return g.default.createElement(
      "div",
      { className: "modal-backdrop", onClick: t },
      g.default.createElement(
        "div",
        {
          className: `modal-card ${r}`.trim(),
          onClick: (i) => i.stopPropagation(),
        },
        g.default.createElement(
          "div",
          { className: "modal-head" },
          g.default.createElement("h2", null, e),
          g.default.createElement(
            "button",
            { className: "modal-close", onClick: t },
            "\u5173\u95ED",
          ),
        ),
        g.default.createElement("div", { className: "modal-body" }, n),
      ),
    );
  }
  function Cg() {
    let [e, t] = (0, g.useState)(cl),
      [n, r] = (0, g.useState)([cl]),
      [i, o] = (0, g.useState)(1.2),
      [l, u] = (0, g.useState)("\u7B49\u5F85\u8FDE\u63A5\u9875\u9762"),
      [aiBusy, setAiBusy] = (0, g.useState)(!1),
      [aiBusyText, setAiBusyText] = (0, g.useState)(
        "\u6B63\u5728\u8FDB\u884C\u5206\u6790\uff0c\u8bf7\u7a0d\u540e...",
      ),
      [qaRelationStatus, setQaRelationStatus] = (0, g.useState)(""),
      [singleSideStatus, setSingleSideStatus] = (0, g.useState)(""),
      [s, a] = (0, g.useState)(null),
      [d, m] = (0, g.useState)(!1),
      [h, v] = (0, g.useState)(!1),
      [y, b] = (0, g.useState)(!1),
      x = (0, g.useMemo)(() => kg(e), [e]);
    (0, g.useEffect)(() => {
      let E = !0;
      async function L() {
        let [W, ze, y] = await Promise.all([
          Ct("GET_CURRENT_SESSION"),
          Ct("GET_SESSIONS"),
          Ct("REQUEST_PAGE_SYNC"),
        ]);
        if (E) {
          if (
            (W?.ok && W.session && t(W.session),
            ze?.ok && ze.sessions && r(ze.sessions),
            !y?.ok && y?.error)
          ) {
            u(y.error);
            return;
          }
          u("\u5DF2\u8FDE\u63A5\u81EA\u52A8\u6293\u53D6\u6D41\u7A0B");
        }
      }
      let G = (W) => {
        E &&
          (W?.type === "SESSION_UPDATED" &&
            W.session &&
            (t(W.session), a((ze) => na(W.session, ze))),
          W?.type === "SESSION_INDEX_UPDATED" && W.sessions && r(W.sessions),
          W?.type === "STATUS_UPDATE" && W.status && u(W.status),
          W?.type === "AI_ANALYSIS_STATE" &&
            (W.active
              ? (setAiBusy(!0),
                W.label &&
                  setAiBusyText(String(W.label).trim().slice(0, 64)))
              : requestAnimationFrame(() =>
                  requestAnimationFrame(() => {
                    W.label &&
                      setAiBusyText(String(W.label).trim().slice(0, 64));
                    setAiBusy(!1);
                  }),
                )));
      };
      return (
        window.chrome?.runtime?.onMessage &&
          window.chrome.runtime.onMessage.addListener(G),
        L(),
        () => {
          ((E = !1),
            window.chrome?.runtime?.onMessage &&
              window.chrome.runtime.onMessage.removeListener(G));
        }
      );
    }, []);
    let _ = (0, g.useMemo)(
        () => (e?.nodes || []).filter((E) => E.type === "answer" && E.scores),
        [e],
      ),
      N = (0, g.useMemo)(
        () =>
          (e?.nodes || []).filter(
            (E) => E.type === "question" && E.visible !== !1,
          ).length,
        [e],
      );
    async function c() {
      u("\u6B63\u5728\u540C\u6B65\u9875\u9762\u5185\u5BB9...");
      let E = await Ct("REQUEST_PAGE_SYNC");
      if (!E?.ok) {
        u(E?.error || "\u9875\u9762\u540C\u6B65\u5931\u8D25\u3002");
        return;
      }
      u(
        "\u5DF2\u8BF7\u6C42\u7ACB\u5373\u540C\u6B65\u9875\u9762\u5185\u5BB9\u3002",
      );
    }
    async function f() {
      let E = await Ct("RESET_STORAGE");
      if (!E?.ok || !E.session) {
        u(E?.error || "\u91CD\u7F6E\u5B58\u50A8\u5931\u8D25\u3002");
        return;
      }
      (t(E.session),
        a(null),
        r([E.session]),
        u("\u672C\u5730\u5B58\u50A8\u5DF2\u91CD\u7F6E\u3002"));
    }
    async function p() {
      let E = await Ct("RESET_LAYOUT");
      E?.ok && E.session && (t(E.session), a((L) => na(E.session, L)), o(1.2));
    }
    async function aiAnalyzeAll() {
      u("\u6B63\u5728\u8FDB\u884C AI \u5224\u522B...");
      let E = await Ct("RUN_AI_ANALYSIS");
      if (!E?.ok || !E.session) {
        u(E?.error || "AI \u5224\u522B\u5931\u8D25\u3002");
        return;
      }
      setQaRelationStatus("全局QA关联已分析");
      (t(E.session),
        a((L) => na(E.session, L)),
        u("AI \u5224\u522B\u5DF2\u5B8C\u6210\u3002"));
    }
    async function localAnalyzeAll() {
      u("正在进行本地-QA关联...");
      let E = await Ct("RUN_LOCAL_ANALYSIS");
      if (!E?.ok || !E.session) {
        u(E?.error || "本地-QA关联失败。");
        return;
      }
      setQaRelationStatus("全局QA关联已分析");
      (t(E.session),
        a((L) => na(E.session, L)),
        u("本地-QA关联已完成。"));
    }
    async function qAnalyzeAll() {
      u("正在进行本地-单侧...");
      let E = await Ct("RUN_Q_ANALYSIS");
      if (!E?.ok || !E.session) {
        u(E?.error || "本地-单侧失败。");
        return;
      }
      setSingleSideStatus("全局单侧关联已分析");
      (t(E.session), a((L) => na(E.session, L)), u("本地-单侧已完成。"));
    }
    async function aiQaAnalyzeAll() {
      u("正在进行AI-单侧...");
      let E = await Ct("RUN_AI_Q_ANALYSIS");
      if (!E?.ok || !E.session) {
        u(E?.error || "AI-单侧失败。");
        return;
      }
      setSingleSideStatus("全局单侧关联已分析");
      (t(E.session), a((L) => na(E.session, L)), u("AI-单侧已完成。"));
    }
    function onLassoAnalysisStatusChange(E, L) {
      if (L === "start") {
        E === "single" ? setSingleSideStatus("") : setQaRelationStatus("");
        return;
      }
      if (L === "done") {
        E === "single"
          ? setSingleSideStatus("局部单侧关联已分析")
          : setQaRelationStatus("局部QA关联已分析");
      }
    }
    async function w(E = s) {
      if (!E) {
        u(
          "\u8BF7\u5148\u9009\u62E9\u4E00\u4E2A\u8282\u70B9\u518D\u7F16\u8F91\u3002",
        );
        return;
      }
      let L = (E.tags || []).join("\uFF0C"),
        G = window.prompt(
          "\u7F16\u8F91\u8282\u70B9\u6807\u6CE8\uFF0C\u591A\u4E2A\u6807\u6CE8\u8BF7\u7528\u9017\u53F7\u5206\u9694\u3002",
          L,
        );
      if (G === null) return;
      let W = G.split(/[锛?]/)
          .map((y) => y.trim())
          .filter(Boolean),
        ze = await Ct("NODE_SET_TAGS", { nodeId: E.id, tags: W });
      if (ze?.ok && ze.session) {
        (t(ze.session),
          a(na(ze.session, E)),
          u("\u8282\u70B9\u6807\u6CE8\u5DF2\u66F4\u65B0\u3002"));
        return;
      }
      u(ze?.error || "\u8282\u70B9\u6807\u6CE8\u66F4\u65B0\u5931\u8D25\u3002");
    }
    async function C() {
      let E = await Ct("EXPORT_SESSION");
      if (!E?.ok || !E.payload) {
        u(E?.error || "\u5BFC\u51FA\u5931\u8D25\u3002");
        return;
      }
      let L = new Blob([JSON.stringify(E.payload, null, 2)], {
          type: "application/json",
        }),
        G = URL.createObjectURL(L),
        W = document.createElement("a");
      ((W.href = G),
        (W.download = `${e?.title || "\u95EE\u7B54\u4F1A\u8BDD"}.json`),
        W.click(),
        URL.revokeObjectURL(G),
        u("\u4F1A\u8BDD\u5DF2\u5BFC\u51FA\u3002"));
    }
    async function T(E) {
      let L = await Ct("RESTORE_SESSION", { sessionId: E });
      L?.ok &&
        L.session &&
        (t(L.session),
        a(null),
        v(!1),
        u("\u5386\u53F2\u4F1A\u8BDD\u5DF2\u6062\u590D\u3002"));
    }
    async function P() {
      if (!s?.content) {
        u(
          "\u5F53\u524D\u8282\u70B9\u6CA1\u6709\u53EF\u590D\u5236\u5185\u5BB9\u3002",
        );
        return;
      }
      try {
        (await navigator.clipboard.writeText(s.content),
          u("\u8282\u70B9\u5185\u5BB9\u5DF2\u590D\u5236\u3002"));
      } catch {
        u(
          "\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u526A\u8D34\u677F\u6743\u9650\u3002",
        );
      }
    }
    async function M() {
      if (!s) {
        u(
          "\u8BF7\u5148\u9009\u62E9\u4E00\u4E2A\u8282\u70B9\u518D\u5206\u4EAB\u3002",
        );
        return;
      }
      let L = `${x.get(s.id) || "\u8282\u70B9"}
${s.content}`;
      if (navigator.share)
        try {
          (await navigator.share({
            title: "Kimi \u95EE\u7B54\u8282\u70B9",
            text: L,
          }),
            u("\u8282\u70B9\u5185\u5BB9\u5DF2\u5206\u4EAB\u3002"));
          return;
        } catch (G) {
          if (G?.name === "AbortError") return;
        }
      try {
        (await navigator.clipboard.writeText(L),
          u(
            "\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u76F4\u63A5\u5206\u4EAB\uFF0C\u5DF2\u590D\u5236\u5206\u4EAB\u5185\u5BB9\u3002",
          ));
      } catch {
        u("\u5206\u4EAB\u5931\u8D25\u3002");
      }
    }
    async function Jt(E) {
      if (!E) return;
      u("\u6B63\u5728\u5B9A\u4F4D\u8282\u70B9\u5230\u5BF9\u8BDD\u9875\u9762...");
      let L = await Ct("FOCUS_NODE_IN_PAGE", {
        nodeId: E.id,
        messageKey: E.messageKey,
        locator: E.locator || null,
        type: E.type,
        content: E.content,
        createdAt: E.createdAt,
      });
      L?.ok
        ? u("\u5DF2\u5B9A\u4F4D\u5230\u5BF9\u5E94\u5BF9\u8BDD\u4F4D\u7F6E\u3002")
        : L?.error && u(L.error);
    }
    return g.default.createElement(
      "main",
      { className: "shell" },
      g.default.createElement(
        "section",
        { className: "capture-panel" },
        g.default.createElement(
          "div",
          { className: "capture-header" },
          g.default.createElement(
            "div",
            null,
            g.default.createElement(
              "div",
              { className: "panel-kicker" },
              "\u81EA\u52A8\u6293\u53D6",
            ),
            g.default.createElement(
              "h1",
              null,
              "\u5BF9\u8BDD\u8D28\u91CF\u8BC4\u4F30",
            ),
            g.default.createElement(
              "div",
              { className: "analysis-status-lines" },
              qaRelationStatus
                ? g.default.createElement("span", null, qaRelationStatus)
                : null,
              singleSideStatus
                ? g.default.createElement("span", null, singleSideStatus)
                : null,
            ),
          ),
          g.default.createElement(
            "div",
            { className: "capture-actions" },
          ),
        ),
        g.default.createElement("div", { className: "status-line" }, l),
        g.default.createElement(
          "div",
          { className: "capture-stats with-actions" },
          g.default.createElement(
            "div",
            { className: "capture-stat-grid" },
          g.default.createElement(
            "div",
            { className: "stat-card" },
            g.default.createElement("strong", null, N),
            g.default.createElement("span", null, "\u63D0\u95EE\u8282\u70B9"),
          ),
          g.default.createElement(
            "div",
            { className: "stat-card" },
            g.default.createElement("strong", null, _.length),
            g.default.createElement("span", null, "\u56DE\u7B54\u8282\u70B9"),
          ),
          g.default.createElement(
            "div",
            { className: "stat-card" },
            g.default.createElement(
              "strong",
              null,
              e?.storageProgress || 0,
              "%",
            ),
            g.default.createElement("span", null, "\u672C\u5730\u5B58\u50A8"),
          ),
          ),
          g.default.createElement(
            "div",
            { className: "capture-inline-actions" },
            g.default.createElement(
              "button",
              { type: "button", className: "pill-action", onClick: c },
              "\u7ACB\u5373\u540C\u6B65",
            ),
            g.default.createElement(
              "button",
              { type: "button", className: "pill-action", onClick: f },
              "\u91CD\u7F6E\u5B58\u50A8",
            ),
          ),
        ),
      ),
        g.default.createElement(
          "section",
          { className: "main-panel" },
        g.default.createElement(
          "div",
          { className: "canvas-head" },
          g.default.createElement(
            "div",
            null,
            g.default.createElement(
              "h2",
              null,
              "\u95EE\u7B54\u7ED3\u6784\u56FE",
            ),
            g.default.createElement(
              "div",
              { className: "canvas-subtitle" },
              g.default.createElement(
                "span",
                null,
                "\u72EC\u7ACB\u4E0E\u9012\u8FDB\u95EE\u7B54\u4F7F\u7528\u5B9E\u7EBF\uFF1B\u5F3A\u4E0A\u4E0B\u6587\u5173\u8054\u95EE\u7B54\u4F7F\u7528\u6CE2\u6D6A\u7EBF\uFF1B\u91CD\u590D\u8FFD\u95EE\u4E2D\u6700\u65B0\u56DE\u7B54\u4F7F\u7528\u865A\u7EBF\uFF0C\u5386\u53F2\u56DE\u7B54\u4F7F\u7528\u70B9\u7EBF\u3002",
              ),
            ),
          ),
          g.default.createElement(
            "div",
            { className: "toolbar" },
            g.default.createElement(
              "button",
              { type: "button", onClick: p },
              "\u91CD\u7F6E",
            ),
            g.default.createElement(
              "button",
              { type: "button", onClick: () => w() },
              "\u6807\u6CE8",
            ),
            g.default.createElement(
              "button",
              { type: "button", onClick: () => v(!0) },
              "\u5386\u53F2",
            ),
            g.default.createElement(
              "button",
              { type: "button", onClick: aiAnalyzeAll },
              "AI-QA\u5173\u8054",
            ),
            g.default.createElement(
              "button",
              { type: "button", onClick: localAnalyzeAll },
              "\u672C\u5730-QA\u5173\u8054",
            ),
            g.default.createElement(
              "button",
              { type: "button", onClick: aiQaAnalyzeAll },
              "AI-\u5355\u4FA7",
            ),
            g.default.createElement(
              "button",
              { type: "button", onClick: qAnalyzeAll },
              "\u672C\u5730-\u5355\u4FA7",
            ),
          ),
        ),
        g.default.createElement(Ng, {
          session: e,
          nodeLabels: x,
          onSelectNode: a,
          onLocateNode: Jt,
          lassoMode: y,
          setLassoMode: b,
          zoom: i,
          setZoom: o,
          onLassoAnalysisStatusChange,
        }),
        aiBusy
          ? g.default.createElement(
              "div",
              { className: "ai-analysis-overlay", "aria-live": "polite" },
              g.default.createElement(
                "div",
                { className: "ai-analysis-overlay-card" },
                g.default.createElement("div", { className: "ai-analysis-dot" }),
                g.default.createElement("strong", null, aiBusyText),
              ),
            )
          : null,
      ),
      g.default.createElement(
        "footer",
        { className: "footer" },
        g.default.createElement(
          "div",
          { className: "footer-head footer-inline" },
          g.default.createElement(
            "strong",
            null,
            "\u8D28\u91CF\u8BC4\u4F30\u4E0E\u5B58\u50A8",
          ),
          g.default.createElement(
            "div",
            { className: "pattern-chip-row" },
            g.default.createElement(
              "span",
              { className: "chip" },
              ta("progressive"),
              " ",
              e?.patternSummary?.progressive || 0,
            ),
            g.default.createElement(
              "span",
              { className: "chip" },
              ta("independent"),
              " ",
              e?.patternSummary?.independent || 0,
            ),
            g.default.createElement(
              "span",
              { className: "chip" },
              ta("repeat_correction"),
              " ",
              e?.patternSummary?.repeat_correction || 0,
            ),
          ),
          g.default.createElement(
            "button",
            { type: "button", className: "pill-action", onClick: () => m(!0) },
            "\u8D28\u91CF\u8BE6\u60C5",
          ),
          g.default.createElement(
            "button",
            { type: "button", className: "pill-action", onClick: C },
            "\u6570\u636E\u5BFC\u51FA",
          ),
        ),
      ),
      g.default.createElement(
        "section",
        { className: "ai-raw-debug-outside" },
        (() => {
          let E =
              e?.lastDebugSource === "q"
                ? e?.qQualityLayer
                : e?.aiQualityLayer || e?.qQualityLayer || null,
            L =
              e?.lastDebugSource === "q"
                ? e?.qQualityLayer?.provider
                  ? `${e.qQualityLayer.provider}${e?.qQualityLayer?.qMode ? ` (${e.qQualityLayer.qMode})` : ""}`
                  : "local_qaScore"
                : e?.aiQualityLayer?.provider
                  ? `${e.aiQualityLayer.provider}${e?.aiQualityLayer?.aiMode ? ` (${e.aiQualityLayer.aiMode})` : ""}`
                  : e?.qQualityLayer?.provider || "（当前会话尚未触发判别）";
          return g.default.createElement(
            "div",
            { className: "ai-raw-debug" },
            g.default.createElement(
              "div",
              { className: "ai-raw-line" },
              "当前判别来源：",
              L,
            ),
            g.default.createElement(
              "div",
              { className: "ai-raw-line" },
              "判别输入：",
              E?.requestText || "（当前会话尚未触发判别）",
            ),
            g.default.createElement(
              "div",
              { className: "ai-raw-line" },
              "判别输出：",
              E?.responseText || "（当前会话尚未触发判别）",
            ),
          );
        })(),
      ),
      s
        ? g.default.createElement(
            ra,
            {
              title: "\u8282\u70B9\u8BE6\u60C5",
              onClose: () => a(null),
              className: "detail-modal",
            },
            g.default.createElement(
              "div",
              { className: "detail-block" },
              g.default.createElement(
                "div",
                { className: "detail-head" },
                g.default.createElement(
                  "strong",
                  null,
                  x.get(s.id) ||
                    (s.type === "question" ? "\u63D0\u95EE" : "\u56DE\u7B54"),
                ),
                s.type === "answer"
                  ? g.default.createElement(
                      "span",
                      { className: `quality-badge ${ul(s.quality)}` },
                      Ah(s.quality),
                      "\u8D28\u91CF",
                    )
                  : null,
              ),
              g.default.createElement(
                "div",
                { className: "detail-meta" },
                ia(s.createdAt),
              ),
              g.default.createElement(
                "div",
                { className: "detail-content" },
                s.content,
              ),
              s.tags?.length
                ? g.default.createElement(
                    "div",
                    { className: "score-row" },
                    s.tags.map((E) =>
                      g.default.createElement(
                        "span",
                        { key: `${s.id}-${E}`, className: "chip" },
                        E,
                      ),
                    ),
                  )
                : null,
              g.default.createElement(
                "div",
                { className: "detail-actions" },
                g.default.createElement(
                  "button",
                  {
                    type: "button",
                    className: "detail-action-button",
                    onClick: () => w(),
                  },
                  "\u7F16\u8F91",
                ),
                g.default.createElement(
                  "button",
                  {
                    type: "button",
                    className: "detail-action-button",
                    onClick: P,
                  },
                  "\u590D\u5236",
                ),
                g.default.createElement(
                  "button",
                  {
                    type: "button",
                    className: "detail-action-button",
                    onClick: M,
                  },
                  "\u5206\u4EAB",
                ),
              ),
            ),
          )
        : null,
      d
        ? g.default.createElement(
            ra,
            { title: "\u8D28\u91CF\u8BE6\u60C5", onClose: () => m(!1) },
            _.length
              ? _.map((E) =>
                  g.default.createElement(
                    "div",
                    { key: E.id, className: `quality-item ${ul(E.quality)}` },
                    g.default.createElement(
                      "div",
                      { className: "quality-item-head" },
                      g.default.createElement(
                        "div",
                        { className: "quality-title" },
                        g.default.createElement("span", {
                          className: `quality-marker ${ul(E.quality)}`,
                        }),
                        g.default.createElement(
                          "strong",
                          null,
                          x.get(E.id) || E.thumbnailText,
                        ),
                      ),
                      g.default.createElement(
                        "span",
                        { className: `quality-badge ${ul(E.quality)}` },
                        Ah(E.quality),
                        "\u8D28\u91CF",
                      ),
                    ),
                    g.default.createElement(
                      "div",
                      { className: "score-row" },
                      g.default.createElement(
                        "span",
                        { className: "chip" },
                        "\u51C6\u786E\u6027 ",
                        E.scores.accuracy,
                      ),
                      g.default.createElement(
                        "span",
                        { className: "chip" },
                        "\u5B8C\u6574\u6027 ",
                        E.scores.completeness,
                      ),
                      g.default.createElement(
                        "span",
                        { className: "chip" },
                        "\u6D41\u7545\u5EA6 ",
                        E.scores.fluency,
                      ),
                      g.default.createElement(
                        "span",
                        { className: "chip" },
                        "\u7EFC\u5408 ",
                        E.scores.overall,
                      ),
                    ),
                  ),
                )
              : g.default.createElement(
                  "div",
                  { className: "detail-block" },
                  "\u5F53\u524D\u8FD8\u6CA1\u6709\u53EF\u8BC4\u4F30\u7684\u56DE\u7B54\u5185\u5BB9\u3002",
                ),
          )
        : null,
      h
        ? g.default.createElement(
            ra,
            { title: "\u5386\u53F2\u4F1A\u8BDD", onClose: () => v(!1) },
            n.length
              ? n.map((E) =>
                  g.default.createElement(
                    "button",
                    {
                      key: E.id,
                      className: "history-item",
                      onClick: () => T(E.id),
                    },
                    g.default.createElement(
                      "strong",
                      null,
                      E.title || "\u672A\u547D\u540D\u4F1A\u8BDD",
                    ),
                    g.default.createElement(
                      "small",
                      null,
                      E.modelProvider || "Kimi \u7F51\u9875\u7248",
                    ),
                    g.default.createElement("small", null, ia(E.updatedAt)),
                  ),
                )
              : g.default.createElement(
                  "div",
                  { className: "detail-block" },
                  "\u6682\u672A\u627E\u5230\u5386\u53F2\u4F1A\u8BDD\u3002",
                ),
          )
        : null,
    );
  }
  (0, Rh.createRoot)(document.getElementById("root")).render(
    g.default.createElement(Cg, null),
  );
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/


