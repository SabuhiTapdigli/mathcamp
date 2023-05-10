!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.ClipboardJS = t())
    : (e.ClipboardJS = t());
})(this, function () {
  return (
    (n = [
      function (e, t, n) {
        var i;
        (n = [e, n(7)]),
          void 0 !==
            (t =
              "function" ==
              typeof (i = function (e, t) {
                "use strict";
                function n(e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                }
                var i = (function (e) {
                    return e && e.__esModule ? e : { default: e };
                  })(t),
                  o =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                      ? function (e) {
                          return typeof e;
                        }
                      : function (e) {
                          return e &&
                            "function" == typeof Symbol &&
                            e.constructor === Symbol &&
                            e !== Symbol.prototype
                            ? "symbol"
                            : typeof e;
                        },
                  r = (function () {
                    function i(e, t) {
                      for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        (i.enumerable = i.enumerable || !1),
                          (i.configurable = !0),
                          "value" in i && (i.writable = !0),
                          Object.defineProperty(e, i.key, i);
                      }
                    }
                    return function (e, t, n) {
                      return t && i(e.prototype, t), n && i(e, n), e;
                    };
                  })(),
                  s = (function () {
                    function t(e) {
                      n(this, t), this.resolveOptions(e), this.initSelection();
                    }
                    return (
                      r(t, [
                        {
                          key: "resolveOptions",
                          value: function () {
                            var e =
                              arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : {};
                            (this.action = e.action),
                              (this.container = e.container),
                              (this.emitter = e.emitter),
                              (this.target = e.target),
                              (this.text = e.text),
                              (this.trigger = e.trigger),
                              (this.selectedText = "");
                          },
                        },
                        {
                          key: "initSelection",
                          value: function () {
                            this.text
                              ? this.selectFake()
                              : this.target && this.selectTarget();
                          },
                        },
                        {
                          key: "selectFake",
                          value: function () {
                            var e = this,
                              t =
                                "rtl" ==
                                document.documentElement.getAttribute("dir");
                            this.removeFake(),
                              (this.fakeHandlerCallback = function () {
                                return e.removeFake();
                              }),
                              (this.fakeHandler =
                                this.container.addEventListener(
                                  "click",
                                  this.fakeHandlerCallback
                                ) || !0),
                              (this.fakeElem =
                                document.createElement("textarea")),
                              (this.fakeElem.style.fontSize = "12pt"),
                              (this.fakeElem.style.border = "0"),
                              (this.fakeElem.style.padding = "0"),
                              (this.fakeElem.style.margin = "0"),
                              (this.fakeElem.style.position = "absolute"),
                              (this.fakeElem.style[t ? "right" : "left"] =
                                "-9999px");
                            var n =
                              window.pageYOffset ||
                              document.documentElement.scrollTop;
                            (this.fakeElem.style.top = n + "px"),
                              this.fakeElem.setAttribute("readonly", ""),
                              (this.fakeElem.value = this.text),
                              this.container.appendChild(this.fakeElem),
                              (this.selectedText = (0, i.default)(
                                this.fakeElem
                              )),
                              this.copyText();
                          },
                        },
                        {
                          key: "removeFake",
                          value: function () {
                            this.fakeHandler &&
                              (this.container.removeEventListener(
                                "click",
                                this.fakeHandlerCallback
                              ),
                              (this.fakeHandler = null),
                              (this.fakeHandlerCallback = null)),
                              this.fakeElem &&
                                (this.container.removeChild(this.fakeElem),
                                (this.fakeElem = null));
                          },
                        },
                        {
                          key: "selectTarget",
                          value: function () {
                            (this.selectedText = (0, i.default)(this.target)),
                              this.copyText();
                          },
                        },
                        {
                          key: "copyText",
                          value: function () {
                            var t = void 0;
                            try {
                              t = document.execCommand(this.action);
                            } catch (e) {
                              t = !1;
                            }
                            this.handleResult(t);
                          },
                        },
                        {
                          key: "handleResult",
                          value: function (e) {
                            this.emitter.emit(e ? "success" : "error", {
                              action: this.action,
                              text: this.selectedText,
                              trigger: this.trigger,
                              clearSelection: this.clearSelection.bind(this),
                            });
                          },
                        },
                        {
                          key: "clearSelection",
                          value: function () {
                            this.trigger && this.trigger.focus(),
                              window.getSelection().removeAllRanges();
                          },
                        },
                        {
                          key: "destroy",
                          value: function () {
                            this.removeFake();
                          },
                        },
                        {
                          key: "action",
                          set: function () {
                            var e =
                              arguments.length > 0 && void 0 !== arguments[0]
                                ? arguments[0]
                                : "copy";
                            if (
                              ((this._action = e),
                              "copy" !== this._action && "cut" !== this._action)
                            )
                              throw new Error(
                                'Invalid "action" value, use either "copy" or "cut"'
                              );
                          },
                          get: function () {
                            return this._action;
                          },
                        },
                        {
                          key: "target",
                          set: function (e) {
                            if (void 0 !== e) {
                              if (
                                !e ||
                                "object" !==
                                  (void 0 === e ? "undefined" : o(e)) ||
                                1 !== e.nodeType
                              )
                                throw new Error(
                                  'Invalid "target" value, use a valid Element'
                                );
                              if (
                                "copy" === this.action &&
                                e.hasAttribute("disabled")
                              )
                                throw new Error(
                                  'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                                );
                              if (
                                "cut" === this.action &&
                                (e.hasAttribute("readonly") ||
                                  e.hasAttribute("disabled"))
                              )
                                throw new Error(
                                  'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
                                );
                              this._target = e;
                            }
                          },
                          get: function () {
                            return this._target;
                          },
                        },
                      ]),
                      t
                    );
                  })();
                e.exports = s;
              })
                ? i.apply(t, n)
                : i) && (e.exports = t);
      },
      function (e, t, n) {
        var u = n(6),
          c = n(5);
        e.exports = function (e, t, n) {
          if (!e && !t && !n) throw new Error("Missing required arguments");
          if (!u.string(t))
            throw new TypeError("Second argument must be a String");
          if (!u.fn(n))
            throw new TypeError("Third argument must be a Function");
          if (u.node(e))
            return (
              (o = t),
              (r = n),
              (i = e).addEventListener(o, r),
              {
                destroy: function () {
                  i.removeEventListener(o, r);
                },
              }
            );
          var i, o, r, s, a, l;
          if (u.nodeList(e))
            return (
              (s = e),
              (a = t),
              (l = n),
              Array.prototype.forEach.call(s, function (e) {
                e.addEventListener(a, l);
              }),
              {
                destroy: function () {
                  Array.prototype.forEach.call(s, function (e) {
                    e.removeEventListener(a, l);
                  });
                },
              }
            );
          if (u.string(e)) return c(document.body, e, t, n);
          throw new TypeError(
            "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
          );
        };
      },
      function (e, t) {
        function n() {}
        (n.prototype = {
          on: function (e, t, n) {
            var i = this.e || (this.e = {});
            return (i[e] || (i[e] = [])).push({ fn: t, ctx: n }), this;
          },
          once: function (e, t, n) {
            function i() {
              o.off(e, i), t.apply(n, arguments);
            }
            var o = this;
            return (i._ = t), this.on(e, i, n);
          },
          emit: function (e) {
            for (
              var t = [].slice.call(arguments, 1),
                n = ((this.e || (this.e = {}))[e] || []).slice(),
                i = 0,
                o = n.length;
              i < o;
              i++
            )
              n[i].fn.apply(n[i].ctx, t);
            return this;
          },
          off: function (e, t) {
            var n = this.e || (this.e = {}),
              i = n[e],
              o = [];
            if (i && t)
              for (var r = 0, s = i.length; r < s; r++)
                i[r].fn !== t && i[r].fn._ !== t && o.push(i[r]);
            return o.length ? (n[e] = o) : delete n[e], this;
          },
        }),
          (e.exports = n);
      },
      function (e, t, n) {
        var i;
        (n = [e, n(0), n(2), n(1)]),
          void 0 !==
            (t =
              "function" ==
              typeof (i = function (e, t, n, i) {
                "use strict";
                function o(e) {
                  return e && e.__esModule ? e : { default: e };
                }
                function r(e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                }
                function s(e, t) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  return !t || ("object" != typeof t && "function" != typeof t)
                    ? e
                    : t;
                }
                function a(e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " +
                        typeof t
                    );
                  (e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    t &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, t)
                        : (e.__proto__ = t));
                }
                function l(e, t) {
                  var n = "data-clipboard-" + e;
                  if (t.hasAttribute(n)) return t.getAttribute(n);
                }
                var u = o(t),
                  c = o(n),
                  d = o(i),
                  p =
                    "function" == typeof Symbol &&
                    "symbol" == typeof Symbol.iterator
                      ? function (e) {
                          return typeof e;
                        }
                      : function (e) {
                          return e &&
                            "function" == typeof Symbol &&
                            e.constructor === Symbol &&
                            e !== Symbol.prototype
                            ? "symbol"
                            : typeof e;
                        },
                  h = (function () {
                    function i(e, t) {
                      for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        (i.enumerable = i.enumerable || !1),
                          (i.configurable = !0),
                          "value" in i && (i.writable = !0),
                          Object.defineProperty(e, i.key, i);
                      }
                    }
                    return function (e, t, n) {
                      return t && i(e.prototype, t), n && i(e, n), e;
                    };
                  })(),
                  f = (function (e) {
                    function i(e, t) {
                      r(this, i);
                      var n = s(
                        this,
                        (i.__proto__ || Object.getPrototypeOf(i)).call(this)
                      );
                      return n.resolveOptions(t), n.listenClick(e), n;
                    }
                    return (
                      a(i, e),
                      h(
                        i,
                        [
                          {
                            key: "resolveOptions",
                            value: function () {
                              var e =
                                arguments.length > 0 && void 0 !== arguments[0]
                                  ? arguments[0]
                                  : {};
                              (this.action =
                                "function" == typeof e.action
                                  ? e.action
                                  : this.defaultAction),
                                (this.target =
                                  "function" == typeof e.target
                                    ? e.target
                                    : this.defaultTarget),
                                (this.text =
                                  "function" == typeof e.text
                                    ? e.text
                                    : this.defaultText),
                                (this.container =
                                  "object" === p(e.container)
                                    ? e.container
                                    : document.body);
                            },
                          },
                          {
                            key: "listenClick",
                            value: function (e) {
                              var t = this;
                              this.listener = (0, d.default)(
                                e,
                                "click",
                                function (e) {
                                  return t.onClick(e);
                                }
                              );
                            },
                          },
                          {
                            key: "onClick",
                            value: function (e) {
                              var t = e.delegateTarget || e.currentTarget;
                              this.clipboardAction &&
                                (this.clipboardAction = null),
                                (this.clipboardAction = new u.default({
                                  action: this.action(t),
                                  target: this.target(t),
                                  text: this.text(t),
                                  container: this.container,
                                  trigger: t,
                                  emitter: this,
                                }));
                            },
                          },
                          {
                            key: "defaultAction",
                            value: function (e) {
                              return l("action", e);
                            },
                          },
                          {
                            key: "defaultTarget",
                            value: function (e) {
                              var t = l("target", e);
                              if (t) return document.querySelector(t);
                            },
                          },
                          {
                            key: "defaultText",
                            value: function (e) {
                              return l("text", e);
                            },
                          },
                          {
                            key: "destroy",
                            value: function () {
                              this.listener.destroy(),
                                this.clipboardAction &&
                                  (this.clipboardAction.destroy(),
                                  (this.clipboardAction = null));
                            },
                          },
                        ],
                        [
                          {
                            key: "isSupported",
                            value: function () {
                              var e =
                                  arguments.length > 0 &&
                                  void 0 !== arguments[0]
                                    ? arguments[0]
                                    : ["copy", "cut"],
                                t = "string" == typeof e ? [e] : e,
                                n = !!document.queryCommandSupported;
                              return (
                                t.forEach(function (e) {
                                  n = n && !!document.queryCommandSupported(e);
                                }),
                                n
                              );
                            },
                          },
                        ]
                      ),
                      i
                    );
                  })(c.default);
                e.exports = f;
              })
                ? i.apply(t, n)
                : i) && (e.exports = t);
      },
      function (e, t) {
        var n;
        "undefined" == typeof Element ||
          Element.prototype.matches ||
          ((n = Element.prototype).matches =
            n.matchesSelector ||
            n.mozMatchesSelector ||
            n.msMatchesSelector ||
            n.oMatchesSelector ||
            n.webkitMatchesSelector),
          (e.exports = function (e, t) {
            for (; e && 9 !== e.nodeType; ) {
              if ("function" == typeof e.matches && e.matches(t)) return e;
              e = e.parentNode;
            }
          });
      },
      function (e, t, n) {
        function r(e, t, n, i, o) {
          var r = function (t, n, e, i) {
            return function (e) {
              (e.delegateTarget = s(e.target, n)),
                e.delegateTarget && i.call(t, e);
            };
          }.apply(this, arguments);
          return (
            e.addEventListener(n, r, o),
            {
              destroy: function () {
                e.removeEventListener(n, r, o);
              },
            }
          );
        }
        var s = n(4);
        e.exports = function (e, t, n, i, o) {
          return "function" == typeof e.addEventListener
            ? r.apply(null, arguments)
            : "function" == typeof n
            ? r.bind(null, document).apply(null, arguments)
            : ("string" == typeof e && (e = document.querySelectorAll(e)),
              Array.prototype.map.call(e, function (e) {
                return r(e, t, n, i, o);
              }));
        };
      },
      function (e, n) {
        (n.node = function (e) {
          return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType;
        }),
          (n.nodeList = function (e) {
            var t = Object.prototype.toString.call(e);
            return (
              void 0 !== e &&
              ("[object NodeList]" === t || "[object HTMLCollection]" === t) &&
              "length" in e &&
              (0 === e.length || n.node(e[0]))
            );
          }),
          (n.string = function (e) {
            return "string" == typeof e || e instanceof String;
          }),
          (n.fn = function (e) {
            return "[object Function]" === Object.prototype.toString.call(e);
          });
      },
      function (e, t) {
        e.exports = function (e) {
          var t, n;
          return (e =
            "SELECT" === e.nodeName
              ? (e.focus(), e.value)
              : "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName
              ? ((t = e.hasAttribute("readonly")) ||
                  e.setAttribute("readonly", ""),
                e.select(),
                e.setSelectionRange(0, e.value.length),
                t || e.removeAttribute("readonly"),
                e.value)
              : (e.hasAttribute("contenteditable") && e.focus(),
                (t = window.getSelection()),
                (n = document.createRange()).selectNodeContents(e),
                t.removeAllRanges(),
                t.addRange(n),
                t.toString()));
        };
      },
    ]),
    (o = {}),
    (i.m = n),
    (i.c = o),
    (i.i = function (e) {
      return e;
    }),
    (i.d = function (e, t, n) {
      i.o(e, t) ||
        Object.defineProperty(e, t, {
          configurable: !1,
          enumerable: !0,
          get: n,
        });
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return i.d(t, "a", t), t;
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = ""),
    i((i.s = 3))
  );
  function i(e) {
    if (o[e]) return o[e].exports;
    var t = (o[e] = { i: e, l: !1, exports: {} });
    return n[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
  }
  var n, o;
}),
  !(function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e.document
          ? t(e, !0)
          : function (e) {
              if (e.document) return t(e);
              throw new Error("jQuery requires a window with a document");
            })
      : t(e);
  })("undefined" != typeof window ? window : this, function (w, I) {
    "use strict";
    function y(e) {
      return "function" == typeof e && "number" != typeof e.nodeType;
    }
    function m(e) {
      return null != e && e === e.window;
    }
    var e = [],
      x = w.document,
      L = Object.getPrototypeOf,
      a = e.slice,
      B = e.concat,
      N = e.push,
      R = e.indexOf,
      H = {},
      q = H.toString,
      z = H.hasOwnProperty,
      W = z.toString,
      U = W.call(Object),
      g = {},
      V = { type: !0, src: !0, noModule: !0 };
    function Y(e, t, n) {
      var i,
        o = (t = t || x).createElement("script");
      if (((o.text = e), n)) for (i in V) n[i] && (o[i] = n[i]);
      t.head.appendChild(o).parentNode.removeChild(o);
    }
    function f(e) {
      return null == e
        ? e + ""
        : "object" == typeof e || "function" == typeof e
        ? H[q.call(e)] || "object"
        : typeof e;
    }
    var C = function (e, t) {
        return new C.fn.init(e, t);
      },
      Z = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function X(e) {
      var t = !!e && "length" in e && e.length,
        n = f(e);
      return (
        !y(e) &&
        !m(e) &&
        ("array" === n ||
          0 === t ||
          ("number" == typeof t && 0 < t && t - 1 in e))
      );
    }
    (C.fn = C.prototype =
      {
        jquery: "3.3.1",
        constructor: C,
        length: 0,
        toArray: function () {
          return a.call(this);
        },
        get: function (e) {
          return null == e
            ? a.call(this)
            : e < 0
            ? this[e + this.length]
            : this[e];
        },
        pushStack: function (e) {
          e = C.merge(this.constructor(), e);
          return (e.prevObject = this), e;
        },
        each: function (e) {
          return C.each(this, e);
        },
        map: function (n) {
          return this.pushStack(
            C.map(this, function (e, t) {
              return n.call(e, t, e);
            })
          );
        },
        slice: function () {
          return this.pushStack(a.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (e) {
          var t = this.length,
            e = +e + (e < 0 ? t : 0);
          return this.pushStack(0 <= e && e < t ? [this[e]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: N,
        sort: e.sort,
        splice: e.splice,
      }),
      (C.extend = C.fn.extend =
        function () {
          var e,
            t,
            n,
            i,
            o,
            r = arguments[0] || {},
            s = 1,
            a = arguments.length,
            l = !1;
          for (
            "boolean" == typeof r && ((l = r), (r = arguments[s] || {}), s++),
              "object" == typeof r || y(r) || (r = {}),
              s === a && ((r = this), s--);
            s < a;
            s++
          )
            if (null != (e = arguments[s]))
              for (t in e)
                (o = r[t]),
                  r !== (n = e[t]) &&
                    (l && n && (C.isPlainObject(n) || (i = Array.isArray(n)))
                      ? ((o = i
                          ? ((i = !1), o && Array.isArray(o) ? o : [])
                          : o && C.isPlainObject(o)
                          ? o
                          : {}),
                        (r[t] = C.extend(l, o, n)))
                      : void 0 !== n && (r[t] = n));
          return r;
        }),
      C.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw new Error(e);
        },
        noop: function () {},
        isPlainObject: function (e) {
          return !(
            !e ||
            "[object Object]" !== q.call(e) ||
            ((e = L(e)) &&
              ("function" !=
                typeof (e = z.call(e, "constructor") && e.constructor) ||
                W.call(e) !== U))
          );
        },
        isEmptyObject: function (e) {
          for (var t in e) return !1;
          return !0;
        },
        globalEval: function (e) {
          Y(e);
        },
        each: function (e, t) {
          var n,
            i = 0;
          if (X(e))
            for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
          else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
          return e;
        },
        trim: function (e) {
          return null == e ? "" : (e + "").replace(Z, "");
        },
        makeArray: function (e, t) {
          t = t || [];
          return (
            null != e &&
              (X(Object(e))
                ? C.merge(t, "string" == typeof e ? [e] : e)
                : N.call(t, e)),
            t
          );
        },
        inArray: function (e, t, n) {
          return null == t ? -1 : R.call(t, e, n);
        },
        merge: function (e, t) {
          for (var n = +t.length, i = 0, o = e.length; i < n; i++)
            e[o++] = t[i];
          return (e.length = o), e;
        },
        grep: function (e, t, n) {
          for (var i = [], o = 0, r = e.length, s = !n; o < r; o++)
            !t(e[o], o) != s && i.push(e[o]);
          return i;
        },
        map: function (e, t, n) {
          var i,
            o,
            r = 0,
            s = [];
          if (X(e))
            for (i = e.length; r < i; r++)
              null != (o = t(e[r], r, n)) && s.push(o);
          else for (r in e) null != (o = t(e[r], r, n)) && s.push(o);
          return B.apply([], s);
        },
        guid: 1,
        support: g,
      }),
      "function" == typeof Symbol &&
        (C.fn[Symbol.iterator] = e[Symbol.iterator]),
      C.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (e, t) {
          H["[object " + t + "]"] = t.toLowerCase();
        }
      );
    function i(e, t, n) {
      for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
        if (1 === e.nodeType) {
          if (o && C(e).is(n)) break;
          i.push(e);
        }
      return i;
    }
    function K(e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    }
    var e = (function (n) {
        function d(e, t, n) {
          var i = "0x" + t - 65536;
          return i != i || n
            ? t
            : i < 0
            ? String.fromCharCode(65536 + i)
            : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
        }
        function I(e, t) {
          return t
            ? "\0" === e
              ? "�"
              : e.slice(0, -1) +
                "\\" +
                e.charCodeAt(e.length - 1).toString(16) +
                " "
            : "\\" + e;
        }
        function L() {
          x();
        }
        var e,
          h,
          k,
          r,
          B,
          f,
          N,
          R,
          w,
          l,
          u,
          x,
          C,
          i,
          S,
          m,
          o,
          s,
          g,
          T = "sizzle" + +new Date(),
          v = n.document,
          A = 0,
          H = 0,
          q = ce(),
          z = ce(),
          y = ce(),
          W = function (e, t) {
            return e === t && (u = !0), 0;
          },
          U = {}.hasOwnProperty,
          t = [],
          V = t.pop,
          Y = t.push,
          E = t.push,
          Z = t.slice,
          b = function (e, t) {
            for (var n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
            return -1;
          },
          X =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          a = "[\\x20\\t\\r\\n\\f]",
          c = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
          K =
            "\\[" +
            a +
            "*(" +
            c +
            ")(?:" +
            a +
            "*([*^$|!~]?=)" +
            a +
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
            c +
            "))|)" +
            a +
            "*\\]",
          G =
            ":(" +
            c +
            ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
            K +
            ")*)|.*)\\)|)",
          J = new RegExp(a + "+", "g"),
          _ = new RegExp(
            "^" + a + "+|((?:^|[^\\\\])(?:\\\\.)*)" + a + "+$",
            "g"
          ),
          Q = new RegExp("^" + a + "*," + a + "*"),
          ee = new RegExp("^" + a + "*([>+~]|" + a + ")" + a + "*"),
          te = new RegExp("=" + a + "*([^\\]'\"]*?)" + a + "*\\]", "g"),
          ne = new RegExp(G),
          ie = new RegExp("^" + c + "$"),
          p = {
            ID: new RegExp("^#(" + c + ")"),
            CLASS: new RegExp("^\\.(" + c + ")"),
            TAG: new RegExp("^(" + c + "|[*])"),
            ATTR: new RegExp("^" + K),
            PSEUDO: new RegExp("^" + G),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                a +
                "*(even|odd|(([+-]|)(\\d*)n|)" +
                a +
                "*(?:([+-]|)" +
                a +
                "*(\\d+)|))" +
                a +
                "*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + X + ")$", "i"),
            needsContext: new RegExp(
              "^" +
                a +
                "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                a +
                "*((?:-\\d)?\\d*)" +
                a +
                "*\\)|)(?=[^-]|$)",
              "i"
            ),
          },
          oe = /^(?:input|select|textarea|button)$/i,
          re = /^h\d$/i,
          D = /^[^{]+\{\s*\[native \w/,
          se = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          ae = /[+~]/,
          $ = new RegExp("\\\\([\\da-f]{1,6}" + a + "?|(" + a + ")|.)", "ig"),
          le = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
          ue = ge(
            function (e) {
              return !0 === e.disabled && ("form" in e || "label" in e);
            },
            { dir: "parentNode", next: "legend" }
          );
        try {
          E.apply((t = Z.call(v.childNodes)), v.childNodes),
            t[v.childNodes.length].nodeType;
        } catch (n) {
          E = {
            apply: t.length
              ? function (e, t) {
                  Y.apply(e, Z.call(t));
                }
              : function (e, t) {
                  for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                  e.length = n - 1;
                },
          };
        }
        function F(e, t, n, i) {
          var o,
            r,
            s,
            a,
            l,
            u,
            c,
            d = t && t.ownerDocument,
            p = t ? t.nodeType : 9;
          if (
            ((n = n || []),
            "string" != typeof e || !e || (1 !== p && 9 !== p && 11 !== p))
          )
            return n;
          if (
            !i &&
            ((t ? t.ownerDocument || t : v) !== C && x(t), (t = t || C), S)
          ) {
            if (11 !== p && (l = se.exec(e)))
              if ((o = l[1])) {
                if (9 === p) {
                  if (!(s = t.getElementById(o))) return n;
                  if (s.id === o) return n.push(s), n;
                } else if (
                  d &&
                  (s = d.getElementById(o)) &&
                  g(t, s) &&
                  s.id === o
                )
                  return n.push(s), n;
              } else {
                if (l[2]) return E.apply(n, t.getElementsByTagName(e)), n;
                if (
                  (o = l[3]) &&
                  h.getElementsByClassName &&
                  t.getElementsByClassName
                )
                  return E.apply(n, t.getElementsByClassName(o)), n;
              }
            if (h.qsa && !y[e + " "] && (!m || !m.test(e))) {
              if (1 !== p) (d = t), (c = e);
              else if ("object" !== t.nodeName.toLowerCase()) {
                for (
                  (a = t.getAttribute("id"))
                    ? (a = a.replace(le, I))
                    : t.setAttribute("id", (a = T)),
                    r = (u = f(e)).length;
                  r--;

                )
                  u[r] = "#" + a + " " + P(u[r]);
                (c = u.join(",")), (d = (ae.test(e) && fe(t.parentNode)) || t);
              }
              if (c)
                try {
                  return E.apply(n, d.querySelectorAll(c)), n;
                } catch (e) {
                } finally {
                  a === T && t.removeAttribute("id");
                }
            }
          }
          return R(e.replace(_, "$1"), t, n, i);
        }
        function ce() {
          var n = [];
          function i(e, t) {
            return (
              n.push(e + " ") > k.cacheLength && delete i[n.shift()],
              (i[e + " "] = t)
            );
          }
          return i;
        }
        function j(e) {
          return (e[T] = !0), e;
        }
        function M(e) {
          var t = C.createElement("fieldset");
          try {
            return !!e(t);
          } catch (e) {
            return !1;
          } finally {
            t.parentNode && t.parentNode.removeChild(t);
          }
        }
        function de(e, t) {
          for (var n = e.split("|"), i = n.length; i--; )
            k.attrHandle[n[i]] = t;
        }
        function pe(e, t) {
          var n = t && e,
            i =
              n &&
              1 === e.nodeType &&
              1 === t.nodeType &&
              e.sourceIndex - t.sourceIndex;
          if (i) return i;
          if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
          return e ? 1 : -1;
        }
        function he(t) {
          return function (e) {
            return "form" in e
              ? e.parentNode && !1 === e.disabled
                ? "label" in e
                  ? "label" in e.parentNode
                    ? e.parentNode.disabled === t
                    : e.disabled === t
                  : e.isDisabled === t || (e.isDisabled !== !t && ue(e) === t)
                : e.disabled === t
              : "label" in e && e.disabled === t;
          };
        }
        function O(s) {
          return j(function (r) {
            return (
              (r = +r),
              j(function (e, t) {
                for (var n, i = s([], e.length, r), o = i.length; o--; )
                  e[(n = i[o])] && (e[n] = !(t[n] = e[n]));
              })
            );
          });
        }
        function fe(e) {
          return e && void 0 !== e.getElementsByTagName && e;
        }
        for (e in ((h = F.support = {}),
        (B = F.isXML =
          function (e) {
            e = e && (e.ownerDocument || e).documentElement;
            return !!e && "HTML" !== e.nodeName;
          }),
        (x = F.setDocument =
          function (e) {
            var e = e ? e.ownerDocument || e : v;
            return (
              e !== C &&
                9 === e.nodeType &&
                e.documentElement &&
                ((i = (C = e).documentElement),
                (S = !B(C)),
                v !== C &&
                  (e = C.defaultView) &&
                  e.top !== e &&
                  (e.addEventListener
                    ? e.addEventListener("unload", L, !1)
                    : e.attachEvent && e.attachEvent("onunload", L)),
                (h.attributes = M(function (e) {
                  return (e.className = "i"), !e.getAttribute("className");
                })),
                (h.getElementsByTagName = M(function (e) {
                  return (
                    e.appendChild(C.createComment("")),
                    !e.getElementsByTagName("*").length
                  );
                })),
                (h.getElementsByClassName = D.test(C.getElementsByClassName)),
                (h.getById = M(function (e) {
                  return (
                    (i.appendChild(e).id = T),
                    !C.getElementsByName || !C.getElementsByName(T).length
                  );
                })),
                h.getById
                  ? ((k.filter.ID = function (e) {
                      var t = e.replace($, d);
                      return function (e) {
                        return e.getAttribute("id") === t;
                      };
                    }),
                    (k.find.ID = function (e, t) {
                      if (void 0 !== t.getElementById && S)
                        return (t = t.getElementById(e)) ? [t] : [];
                    }))
                  : ((k.filter.ID = function (e) {
                      var t = e.replace($, d);
                      return function (e) {
                        e =
                          void 0 !== e.getAttributeNode &&
                          e.getAttributeNode("id");
                        return e && e.value === t;
                      };
                    }),
                    (k.find.ID = function (e, t) {
                      if (void 0 !== t.getElementById && S) {
                        var n,
                          i,
                          o,
                          r = t.getElementById(e);
                        if (r) {
                          if ((n = r.getAttributeNode("id")) && n.value === e)
                            return [r];
                          for (
                            o = t.getElementsByName(e), i = 0;
                            (r = o[i++]);

                          )
                            if ((n = r.getAttributeNode("id")) && n.value === e)
                              return [r];
                        }
                        return [];
                      }
                    })),
                (k.find.TAG = h.getElementsByTagName
                  ? function (e, t) {
                      return void 0 !== t.getElementsByTagName
                        ? t.getElementsByTagName(e)
                        : h.qsa
                        ? t.querySelectorAll(e)
                        : void 0;
                    }
                  : function (e, t) {
                      var n,
                        i = [],
                        o = 0,
                        r = t.getElementsByTagName(e);
                      if ("*" !== e) return r;
                      for (; (n = r[o++]); ) 1 === n.nodeType && i.push(n);
                      return i;
                    }),
                (k.find.CLASS =
                  h.getElementsByClassName &&
                  function (e, t) {
                    if (void 0 !== t.getElementsByClassName && S)
                      return t.getElementsByClassName(e);
                  }),
                (o = []),
                (m = []),
                (h.qsa = D.test(C.querySelectorAll)) &&
                  (M(function (e) {
                    (i.appendChild(e).innerHTML =
                      "<a id='" +
                      T +
                      "'></a><select id='" +
                      T +
                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                      e.querySelectorAll("[msallowcapture^='']").length &&
                        m.push("[*^$]=" + a + "*(?:''|\"\")"),
                      e.querySelectorAll("[selected]").length ||
                        m.push("\\[" + a + "*(?:value|" + X + ")"),
                      e.querySelectorAll("[id~=" + T + "-]").length ||
                        m.push("~="),
                      e.querySelectorAll(":checked").length ||
                        m.push(":checked"),
                      e.querySelectorAll("a#" + T + "+*").length ||
                        m.push(".#.+[+~]");
                  }),
                  M(function (e) {
                    e.innerHTML =
                      "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = C.createElement("input");
                    t.setAttribute("type", "hidden"),
                      e.appendChild(t).setAttribute("name", "D"),
                      e.querySelectorAll("[name=d]").length &&
                        m.push("name" + a + "*[*^$|!~]?="),
                      2 !== e.querySelectorAll(":enabled").length &&
                        m.push(":enabled", ":disabled"),
                      (i.appendChild(e).disabled = !0),
                      2 !== e.querySelectorAll(":disabled").length &&
                        m.push(":enabled", ":disabled"),
                      e.querySelectorAll("*,:x"),
                      m.push(",.*:");
                  })),
                (h.matchesSelector = D.test(
                  (s =
                    i.matches ||
                    i.webkitMatchesSelector ||
                    i.mozMatchesSelector ||
                    i.oMatchesSelector ||
                    i.msMatchesSelector)
                )) &&
                  M(function (e) {
                    (h.disconnectedMatch = s.call(e, "*")),
                      s.call(e, "[s!='']:x"),
                      o.push("!=", G);
                  }),
                (m = m.length && new RegExp(m.join("|"))),
                (o = o.length && new RegExp(o.join("|"))),
                (e = D.test(i.compareDocumentPosition)),
                (g =
                  e || D.test(i.contains)
                    ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                          t = t && t.parentNode;
                        return (
                          e === t ||
                          !(
                            !t ||
                            1 !== t.nodeType ||
                            !(n.contains
                              ? n.contains(t)
                              : e.compareDocumentPosition &&
                                16 & e.compareDocumentPosition(t))
                          )
                        );
                      }
                    : function (e, t) {
                        if (t)
                          for (; (t = t.parentNode); ) if (t === e) return !0;
                        return !1;
                      }),
                (W = e
                  ? function (e, t) {
                      return e === t
                        ? ((u = !0), 0)
                        : !e.compareDocumentPosition -
                            !t.compareDocumentPosition ||
                            (1 &
                              (n =
                                (e.ownerDocument || e) ===
                                (t.ownerDocument || t)
                                  ? e.compareDocumentPosition(t)
                                  : 1) ||
                            (!h.sortDetached &&
                              t.compareDocumentPosition(e) === n)
                              ? e === C || (e.ownerDocument === v && g(v, e))
                                ? -1
                                : t === C || (t.ownerDocument === v && g(v, t))
                                ? 1
                                : l
                                ? b(l, e) - b(l, t)
                                : 0
                              : 4 & n
                              ? -1
                              : 1);
                      var n;
                    }
                  : function (e, t) {
                      if (e === t) return (u = !0), 0;
                      var n,
                        i = 0,
                        o = e.parentNode,
                        r = t.parentNode,
                        s = [e],
                        a = [t];
                      if (!o || !r)
                        return e === C
                          ? -1
                          : t === C
                          ? 1
                          : o
                          ? -1
                          : r
                          ? 1
                          : l
                          ? b(l, e) - b(l, t)
                          : 0;
                      if (o === r) return pe(e, t);
                      for (n = e; (n = n.parentNode); ) s.unshift(n);
                      for (n = t; (n = n.parentNode); ) a.unshift(n);
                      for (; s[i] === a[i]; ) i++;
                      return i
                        ? pe(s[i], a[i])
                        : s[i] === v
                        ? -1
                        : a[i] === v
                        ? 1
                        : 0;
                    })),
              C
            );
          }),
        (F.matches = function (e, t) {
          return F(e, null, null, t);
        }),
        (F.matchesSelector = function (e, t) {
          if (
            ((e.ownerDocument || e) !== C && x(e),
            (t = t.replace(te, "='$1']")),
            h.matchesSelector &&
              S &&
              !y[t + " "] &&
              (!o || !o.test(t)) &&
              (!m || !m.test(t)))
          )
            try {
              var n = s.call(e, t);
              if (
                n ||
                h.disconnectedMatch ||
                (e.document && 11 !== e.document.nodeType)
              )
                return n;
            } catch (e) {}
          return 0 < F(t, C, null, [e]).length;
        }),
        (F.contains = function (e, t) {
          return (e.ownerDocument || e) !== C && x(e), g(e, t);
        }),
        (F.attr = function (e, t) {
          (e.ownerDocument || e) !== C && x(e);
          var n = k.attrHandle[t.toLowerCase()],
            n =
              n && U.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !S) : void 0;
          return void 0 !== n
            ? n
            : h.attributes || !S
            ? e.getAttribute(t)
            : (n = e.getAttributeNode(t)) && n.specified
            ? n.value
            : null;
        }),
        (F.escape = function (e) {
          return (e + "").replace(le, I);
        }),
        (F.error = function (e) {
          throw new Error("Syntax error, unrecognized expression: " + e);
        }),
        (F.uniqueSort = function (e) {
          var t,
            n = [],
            i = 0,
            o = 0;
          if (
            ((u = !h.detectDuplicates),
            (l = !h.sortStable && e.slice(0)),
            e.sort(W),
            u)
          ) {
            for (; (t = e[o++]); ) t === e[o] && (i = n.push(o));
            for (; i--; ) e.splice(n[i], 1);
          }
          return (l = null), e;
        }),
        (r = F.getText =
          function (e) {
            var t,
              n = "",
              i = 0,
              o = e.nodeType;
            if (o) {
              if (1 === o || 9 === o || 11 === o) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += r(e);
              } else if (3 === o || 4 === o) return e.nodeValue;
            } else for (; (t = e[i++]); ) n += r(t);
            return n;
          }),
        ((k = F.selectors =
          {
            cacheLength: 50,
            createPseudo: j,
            match: p,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (e) {
                return (
                  (e[1] = e[1].replace($, d)),
                  (e[3] = (e[3] || e[4] || e[5] || "").replace($, d)),
                  "~=" === e[2] && (e[3] = " " + e[3] + " "),
                  e.slice(0, 4)
                );
              },
              CHILD: function (e) {
                return (
                  (e[1] = e[1].toLowerCase()),
                  "nth" === e[1].slice(0, 3)
                    ? (e[3] || F.error(e[0]),
                      (e[4] = +(e[4]
                        ? e[5] + (e[6] || 1)
                        : 2 * ("even" === e[3] || "odd" === e[3]))),
                      (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                    : e[3] && F.error(e[0]),
                  e
                );
              },
              PSEUDO: function (e) {
                var t,
                  n = !e[6] && e[2];
                return p.CHILD.test(e[0])
                  ? null
                  : (e[3]
                      ? (e[2] = e[4] || e[5] || "")
                      : n &&
                        ne.test(n) &&
                        (t = f(n, !0)) &&
                        (t = n.indexOf(")", n.length - t) - n.length) &&
                        ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                    e.slice(0, 3));
              },
            },
            filter: {
              TAG: function (e) {
                var t = e.replace($, d).toLowerCase();
                return "*" === e
                  ? function () {
                      return !0;
                    }
                  : function (e) {
                      return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
              },
              CLASS: function (e) {
                var t = q[e + " "];
                return (
                  t ||
                  ((t = new RegExp("(^|" + a + ")" + e + "(" + a + "|$)")) &&
                    q(e, function (e) {
                      return t.test(
                        ("string" == typeof e.className && e.className) ||
                          (void 0 !== e.getAttribute &&
                            e.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (t, n, i) {
                return function (e) {
                  e = F.attr(e, t);
                  return null == e
                    ? "!=" === n
                    : !n ||
                        ((e += ""),
                        "=" === n
                          ? e === i
                          : "!=" === n
                          ? e !== i
                          : "^=" === n
                          ? i && 0 === e.indexOf(i)
                          : "*=" === n
                          ? i && -1 < e.indexOf(i)
                          : "$=" === n
                          ? i && e.slice(-i.length) === i
                          : "~=" === n
                          ? -1 < (" " + e.replace(J, " ") + " ").indexOf(i)
                          : "|=" === n &&
                            (e === i || e.slice(0, i.length + 1) === i + "-"));
                };
              },
              CHILD: function (f, e, t, m, g) {
                var v = "nth" !== f.slice(0, 3),
                  y = "last" !== f.slice(-4),
                  b = "of-type" === e;
                return 1 === m && 0 === g
                  ? function (e) {
                      return !!e.parentNode;
                    }
                  : function (e, t, n) {
                      var i,
                        o,
                        r,
                        s,
                        a,
                        l,
                        u = v != y ? "nextSibling" : "previousSibling",
                        c = e.parentNode,
                        d = b && e.nodeName.toLowerCase(),
                        p = !n && !b,
                        h = !1;
                      if (c) {
                        if (v) {
                          for (; u; ) {
                            for (s = e; (s = s[u]); )
                              if (
                                b
                                  ? s.nodeName.toLowerCase() === d
                                  : 1 === s.nodeType
                              )
                                return !1;
                            l = u = "only" === f && !l && "nextSibling";
                          }
                          return !0;
                        }
                        if (((l = [y ? c.firstChild : c.lastChild]), y && p)) {
                          for (
                            h =
                              (a =
                                (i =
                                  (o =
                                    (r = (s = c)[T] || (s[T] = {}))[
                                      s.uniqueID
                                    ] || (r[s.uniqueID] = {}))[f] || [])[0] ===
                                  A && i[1]) && i[2],
                              s = a && c.childNodes[a];
                            (s = (++a && s && s[u]) || (h = a = 0) || l.pop());

                          )
                            if (1 === s.nodeType && ++h && s === e) {
                              o[f] = [A, a, h];
                              break;
                            }
                        } else if (
                          !1 ===
                          (h = p
                            ? (a =
                                (i =
                                  (o =
                                    (r = (s = e)[T] || (s[T] = {}))[
                                      s.uniqueID
                                    ] || (r[s.uniqueID] = {}))[f] || [])[0] ===
                                  A && i[1])
                            : h)
                        )
                          for (
                            ;
                            (s =
                              (++a && s && s[u]) || (h = a = 0) || l.pop()) &&
                            ((b
                              ? s.nodeName.toLowerCase() !== d
                              : 1 !== s.nodeType) ||
                              !++h ||
                              (p &&
                                ((o =
                                  (r = s[T] || (s[T] = {}))[s.uniqueID] ||
                                  (r[s.uniqueID] = {}))[f] = [A, h]),
                              s !== e));

                          );
                        return (h -= g) === m || (h % m == 0 && 0 <= h / m);
                      }
                    };
              },
              PSEUDO: function (e, r) {
                var t,
                  s =
                    k.pseudos[e] ||
                    k.setFilters[e.toLowerCase()] ||
                    F.error("unsupported pseudo: " + e);
                return s[T]
                  ? s(r)
                  : 1 < s.length
                  ? ((t = [e, e, "", r]),
                    k.setFilters.hasOwnProperty(e.toLowerCase())
                      ? j(function (e, t) {
                          for (var n, i = s(e, r), o = i.length; o--; )
                            e[(n = b(e, i[o]))] = !(t[n] = i[o]);
                        })
                      : function (e) {
                          return s(e, 0, t);
                        })
                  : s;
              },
            },
            pseudos: {
              not: j(function (e) {
                var i = [],
                  o = [],
                  a = N(e.replace(_, "$1"));
                return a[T]
                  ? j(function (e, t, n, i) {
                      for (var o, r = a(e, null, i, []), s = e.length; s--; )
                        (o = r[s]) && (e[s] = !(t[s] = o));
                    })
                  : function (e, t, n) {
                      return (
                        (i[0] = e), a(i, null, n, o), (i[0] = null), !o.pop()
                      );
                    };
              }),
              has: j(function (t) {
                return function (e) {
                  return 0 < F(t, e).length;
                };
              }),
              contains: j(function (t) {
                return (
                  (t = t.replace($, d)),
                  function (e) {
                    return (
                      -1 < (e.textContent || e.innerText || r(e)).indexOf(t)
                    );
                  }
                );
              }),
              lang: j(function (n) {
                return (
                  ie.test(n || "") || F.error("unsupported lang: " + n),
                  (n = n.replace($, d).toLowerCase()),
                  function (e) {
                    var t;
                    do {
                      if (
                        (t = S
                          ? e.lang
                          : e.getAttribute("xml:lang") ||
                            e.getAttribute("lang"))
                      )
                        return (
                          (t = t.toLowerCase()) === n ||
                          0 === t.indexOf(n + "-")
                        );
                    } while ((e = e.parentNode) && 1 === e.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (e) {
                var t = n.location && n.location.hash;
                return t && t.slice(1) === e.id;
              },
              root: function (e) {
                return e === i;
              },
              focus: function (e) {
                return (
                  e === C.activeElement &&
                  (!C.hasFocus || C.hasFocus()) &&
                  !!(e.type || e.href || ~e.tabIndex)
                );
              },
              enabled: he(!1),
              disabled: he(!0),
              checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return (
                  ("input" === t && !!e.checked) ||
                  ("option" === t && !!e.selected)
                );
              },
              selected: function (e) {
                return (
                  e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                );
              },
              empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)
                  if (e.nodeType < 6) return !1;
                return !0;
              },
              parent: function (e) {
                return !k.pseudos.empty(e);
              },
              header: function (e) {
                return re.test(e.nodeName);
              },
              input: function (e) {
                return oe.test(e.nodeName);
              },
              button: function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t && "button" === e.type) || "button" === t;
              },
              text: function (e) {
                return (
                  "input" === e.nodeName.toLowerCase() &&
                  "text" === e.type &&
                  (null == (e = e.getAttribute("type")) ||
                    "text" === e.toLowerCase())
                );
              },
              first: O(function () {
                return [0];
              }),
              last: O(function (e, t) {
                return [t - 1];
              }),
              eq: O(function (e, t, n) {
                return [n < 0 ? n + t : n];
              }),
              even: O(function (e, t) {
                for (var n = 0; n < t; n += 2) e.push(n);
                return e;
              }),
              odd: O(function (e, t) {
                for (var n = 1; n < t; n += 2) e.push(n);
                return e;
              }),
              lt: O(function (e, t, n) {
                for (var i = n < 0 ? n + t : n; 0 <= --i; ) e.push(i);
                return e;
              }),
              gt: O(function (e, t, n) {
                for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                return e;
              }),
            },
          }).pseudos.nth = k.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
          k.pseudos[e] = (function (t) {
            return function (e) {
              return "input" === e.nodeName.toLowerCase() && e.type === t;
            };
          })(e);
        for (e in { submit: !0, reset: !0 })
          k.pseudos[e] = (function (n) {
            return function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t || "button" === t) && e.type === n;
            };
          })(e);
        function me() {}
        function P(e) {
          for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
          return i;
        }
        function ge(s, e, t) {
          var a = e.dir,
            l = e.next,
            u = l || a,
            c = t && "parentNode" === u,
            d = H++;
          return e.first
            ? function (e, t, n) {
                for (; (e = e[a]); )
                  if (1 === e.nodeType || c) return s(e, t, n);
                return !1;
              }
            : function (e, t, n) {
                var i,
                  o,
                  r = [A, d];
                if (n) {
                  for (; (e = e[a]); )
                    if ((1 === e.nodeType || c) && s(e, t, n)) return !0;
                } else
                  for (; (e = e[a]); )
                    if (1 === e.nodeType || c)
                      if (
                        ((o =
                          (o = e[T] || (e[T] = {}))[e.uniqueID] ||
                          (o[e.uniqueID] = {})),
                        l && l === e.nodeName.toLowerCase())
                      )
                        e = e[a] || e;
                      else {
                        if ((i = o[u]) && i[0] === A && i[1] === d)
                          return (r[2] = i[2]);
                        if (((o[u] = r)[2] = s(e, t, n))) return !0;
                      }
                return !1;
              };
        }
        function ve(o) {
          return 1 < o.length
            ? function (e, t, n) {
                for (var i = o.length; i--; ) if (!o[i](e, t, n)) return !1;
                return !0;
              }
            : o[0];
        }
        function ye(e, t, n, i, o) {
          for (var r, s = [], a = 0, l = e.length, u = null != t; a < l; a++)
            !(r = e[a]) || (n && !n(r, i, o)) || (s.push(r), u && t.push(a));
          return s;
        }
        function be(h, f, m, g, v, e) {
          return (
            g && !g[T] && (g = be(g)),
            v && !v[T] && (v = be(v, e)),
            j(function (e, t, n, i) {
              var o,
                r,
                s,
                a = [],
                l = [],
                u = t.length,
                c =
                  e ||
                  (function (e, t, n) {
                    for (var i = 0, o = t.length; i < o; i++) F(e, t[i], n);
                    return n;
                  })(f || "*", n.nodeType ? [n] : n, []),
                d = !h || (!e && f) ? c : ye(c, a, h, n, i),
                p = m ? (v || (e ? h : u || g) ? [] : t) : d;
              if ((m && m(d, p, n, i), g))
                for (o = ye(p, l), g(o, [], n, i), r = o.length; r--; )
                  (s = o[r]) && (p[l[r]] = !(d[l[r]] = s));
              if (e) {
                if (v || h) {
                  if (v) {
                    for (o = [], r = p.length; r--; )
                      (s = p[r]) && o.push((d[r] = s));
                    v(null, (p = []), o, i);
                  }
                  for (r = p.length; r--; )
                    (s = p[r]) &&
                      -1 < (o = v ? b(e, s) : a[r]) &&
                      (e[o] = !(t[o] = s));
                }
              } else (p = ye(p === t ? p.splice(u, p.length) : p)), v ? v(null, t, p, i) : E.apply(t, p);
            })
          );
        }
        function ke(g, v) {
          function e(e, t, n, i, o) {
            var r,
              s,
              a,
              l = 0,
              u = "0",
              c = e && [],
              d = [],
              p = w,
              h = e || (b && k.find.TAG("*", o)),
              f = (A += null == p ? 1 : Math.random() || 0.1),
              m = h.length;
            for (
              o && (w = t === C || t || o);
              u !== m && null != (r = h[u]);
              u++
            ) {
              if (b && r) {
                for (
                  s = 0, t || r.ownerDocument === C || (x(r), (n = !S));
                  (a = g[s++]);

                )
                  if (a(r, t || C, n)) {
                    i.push(r);
                    break;
                  }
                o && (A = f);
              }
              y && ((r = !a && r) && l--, e && c.push(r));
            }
            if (((l += u), y && u !== l)) {
              for (s = 0; (a = v[s++]); ) a(c, d, t, n);
              if (e) {
                if (0 < l) for (; u--; ) c[u] || d[u] || (d[u] = V.call(i));
                d = ye(d);
              }
              E.apply(i, d),
                o && !e && 0 < d.length && 1 < l + v.length && F.uniqueSort(i);
            }
            return o && ((A = f), (w = p)), c;
          }
          var y = 0 < v.length,
            b = 0 < g.length;
          return y ? j(e) : e;
        }
        return (
          (me.prototype = k.filters = k.pseudos),
          (k.setFilters = new me()),
          (f = F.tokenize =
            function (e, t) {
              var n,
                i,
                o,
                r,
                s,
                a,
                l,
                u = z[e + " "];
              if (u) return t ? 0 : u.slice(0);
              for (s = e, a = [], l = k.preFilter; s; ) {
                for (r in ((n && !(i = Q.exec(s))) ||
                  (i && (s = s.slice(i[0].length) || s), a.push((o = []))),
                (n = !1),
                (i = ee.exec(s)) &&
                  ((n = i.shift()),
                  o.push({ value: n, type: i[0].replace(_, " ") }),
                  (s = s.slice(n.length))),
                k.filter))
                  !(i = p[r].exec(s)) ||
                    (l[r] && !(i = l[r](i))) ||
                    ((n = i.shift()),
                    o.push({ value: n, type: r, matches: i }),
                    (s = s.slice(n.length)));
                if (!n) break;
              }
              return t ? s.length : s ? F.error(e) : z(e, a).slice(0);
            }),
          (N = F.compile =
            function (e, t) {
              var n,
                i = [],
                o = [],
                r = y[e + " "];
              if (!r) {
                for (n = (t = t || f(e)).length; n--; )
                  ((r = (function e(t) {
                    for (
                      var i,
                        n,
                        o,
                        r = t.length,
                        s = k.relative[t[0].type],
                        a = s || k.relative[" "],
                        l = s ? 1 : 0,
                        u = ge(
                          function (e) {
                            return e === i;
                          },
                          a,
                          !0
                        ),
                        c = ge(
                          function (e) {
                            return -1 < b(i, e);
                          },
                          a,
                          !0
                        ),
                        d = [
                          function (e, t, n) {
                            return (
                              (e =
                                (!s && (n || t !== w)) ||
                                ((i = t).nodeType ? u : c)(e, t, n)),
                              (i = null),
                              e
                            );
                          },
                        ];
                      l < r;
                      l++
                    )
                      if ((n = k.relative[t[l].type])) d = [ge(ve(d), n)];
                      else {
                        if (
                          (n = k.filter[t[l].type].apply(null, t[l].matches))[T]
                        ) {
                          for (o = ++l; o < r && !k.relative[t[o].type]; o++);
                          return be(
                            1 < l && ve(d),
                            1 < l &&
                              P(
                                t
                                  .slice(0, l - 1)
                                  .concat({
                                    value: " " === t[l - 2].type ? "*" : "",
                                  })
                              ).replace(_, "$1"),
                            n,
                            l < o && e(t.slice(l, o)),
                            o < r && e((t = t.slice(o))),
                            o < r && P(t)
                          );
                        }
                        d.push(n);
                      }
                    return ve(d);
                  })(t[n]))[T]
                    ? i
                    : o
                  ).push(r);
                (r = y(e, ke(o, i))).selector = e;
              }
              return r;
            }),
          (R = F.select =
            function (e, t, n, i) {
              var o,
                r,
                s,
                a,
                l,
                u = "function" == typeof e && e,
                c = !i && f((e = u.selector || e));
              if (((n = n || []), 1 === c.length)) {
                if (
                  2 < (r = c[0] = c[0].slice(0)).length &&
                  "ID" === (s = r[0]).type &&
                  9 === t.nodeType &&
                  S &&
                  k.relative[r[1].type]
                ) {
                  if (
                    !(t = (k.find.ID(s.matches[0].replace($, d), t) || [])[0])
                  )
                    return n;
                  u && (t = t.parentNode),
                    (e = e.slice(r.shift().value.length));
                }
                for (
                  o = p.needsContext.test(e) ? 0 : r.length;
                  o-- && ((s = r[o]), !k.relative[(a = s.type)]);

                )
                  if (
                    (l = k.find[a]) &&
                    (i = l(
                      s.matches[0].replace($, d),
                      (ae.test(r[0].type) && fe(t.parentNode)) || t
                    ))
                  ) {
                    if ((r.splice(o, 1), (e = i.length && P(r)))) break;
                    return E.apply(n, i), n;
                  }
              }
              return (
                (u || N(e, c))(
                  i,
                  t,
                  !S,
                  n,
                  !t || (ae.test(e) && fe(t.parentNode)) || t
                ),
                n
              );
            }),
          (h.sortStable = T.split("").sort(W).join("") === T),
          (h.detectDuplicates = !!u),
          x(),
          (h.sortDetached = M(function (e) {
            return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
          })),
          M(function (e) {
            return (
              (e.innerHTML = "<a href='#'></a>"),
              "#" === e.firstChild.getAttribute("href")
            );
          }) ||
            de("type|href|height|width", function (e, t, n) {
              if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
            }),
          (h.attributes &&
            M(function (e) {
              return (
                (e.innerHTML = "<input/>"),
                e.firstChild.setAttribute("value", ""),
                "" === e.firstChild.getAttribute("value")
              );
            })) ||
            de("value", function (e, t, n) {
              if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue;
            }),
          M(function (e) {
            return null == e.getAttribute("disabled");
          }) ||
            de(X, function (e, t, n) {
              if (!n)
                return !0 === e[t]
                  ? t.toLowerCase()
                  : (n = e.getAttributeNode(t)) && n.specified
                  ? n.value
                  : null;
            }),
          F
        );
      })(w),
      G =
        ((C.find = e),
        (C.expr = e.selectors),
        (C.expr[":"] = C.expr.pseudos),
        (C.uniqueSort = C.unique = e.uniqueSort),
        (C.text = e.getText),
        (C.isXMLDoc = e.isXML),
        (C.contains = e.contains),
        (C.escapeSelector = e.escape),
        C.expr.match.needsContext);
    function l(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }
    var J = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function Q(e, n, i) {
      return y(n)
        ? C.grep(e, function (e, t) {
            return !!n.call(e, t, e) !== i;
          })
        : n.nodeType
        ? C.grep(e, function (e) {
            return (e === n) !== i;
          })
        : "string" != typeof n
        ? C.grep(e, function (e) {
            return -1 < R.call(n, e) !== i;
          })
        : C.filter(n, e, i);
    }
    (C.filter = function (e, t, n) {
      var i = t[0];
      return (
        n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === i.nodeType
          ? C.find.matchesSelector(i, e)
            ? [i]
            : []
          : C.find.matches(
              e,
              C.grep(t, function (e) {
                return 1 === e.nodeType;
              })
            )
      );
    }),
      C.fn.extend({
        find: function (e) {
          var t,
            n,
            i = this.length,
            o = this;
          if ("string" != typeof e)
            return this.pushStack(
              C(e).filter(function () {
                for (t = 0; t < i; t++) if (C.contains(o[t], this)) return !0;
              })
            );
          for (n = this.pushStack([]), t = 0; t < i; t++) C.find(e, o[t], n);
          return 1 < i ? C.uniqueSort(n) : n;
        },
        filter: function (e) {
          return this.pushStack(Q(this, e || [], !1));
        },
        not: function (e) {
          return this.pushStack(Q(this, e || [], !0));
        },
        is: function (e) {
          return !!Q(
            this,
            "string" == typeof e && G.test(e) ? C(e) : e || [],
            !1
          ).length;
        },
      });
    var ee,
      te = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      ne =
        (((C.fn.init = function (e, t, n) {
          if (!e) return this;
          if (((n = n || ee), "string" != typeof e))
            return e.nodeType
              ? ((this[0] = e), (this.length = 1), this)
              : y(e)
              ? void 0 !== n.ready
                ? n.ready(e)
                : e(C)
              : C.makeArray(e, this);
          if (
            !(i =
              "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
                ? [null, e, null]
                : te.exec(e)) ||
            (!i[1] && t)
          )
            return (!t || t.jquery ? t || n : this.constructor(t)).find(e);
          if (i[1]) {
            if (
              ((t = t instanceof C ? t[0] : t),
              C.merge(
                this,
                C.parseHTML(
                  i[1],
                  t && t.nodeType ? t.ownerDocument || t : x,
                  !0
                )
              ),
              J.test(i[1]) && C.isPlainObject(t))
            )
              for (var i in t) y(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
            return this;
          }
          return (
            (n = x.getElementById(i[2])) && ((this[0] = n), (this.length = 1)),
            this
          );
        }).prototype = C.fn),
        (ee = C(x)),
        /^(?:parents|prev(?:Until|All))/),
      ie = { children: !0, contents: !0, next: !0, prev: !0 };
    function oe(e, t) {
      for (; (e = e[t]) && 1 !== e.nodeType; );
      return e;
    }
    C.fn.extend({
      has: function (e) {
        var t = C(e, this),
          n = t.length;
        return this.filter(function () {
          for (var e = 0; e < n; e++) if (C.contains(this, t[e])) return !0;
        });
      },
      closest: function (e, t) {
        var n,
          i = 0,
          o = this.length,
          r = [],
          s = "string" != typeof e && C(e);
        if (!G.test(e))
          for (; i < o; i++)
            for (n = this[i]; n && n !== t; n = n.parentNode)
              if (
                n.nodeType < 11 &&
                (s
                  ? -1 < s.index(n)
                  : 1 === n.nodeType && C.find.matchesSelector(n, e))
              ) {
                r.push(n);
                break;
              }
        return this.pushStack(1 < r.length ? C.uniqueSort(r) : r);
      },
      index: function (e) {
        return e
          ? "string" == typeof e
            ? R.call(C(e), this[0])
            : R.call(this, e.jquery ? e[0] : e)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (e, t) {
        return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))));
      },
      addBack: function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      },
    }),
      C.each(
        {
          parent: function (e) {
            e = e.parentNode;
            return e && 11 !== e.nodeType ? e : null;
          },
          parents: function (e) {
            return i(e, "parentNode");
          },
          parentsUntil: function (e, t, n) {
            return i(e, "parentNode", n);
          },
          next: function (e) {
            return oe(e, "nextSibling");
          },
          prev: function (e) {
            return oe(e, "previousSibling");
          },
          nextAll: function (e) {
            return i(e, "nextSibling");
          },
          prevAll: function (e) {
            return i(e, "previousSibling");
          },
          nextUntil: function (e, t, n) {
            return i(e, "nextSibling", n);
          },
          prevUntil: function (e, t, n) {
            return i(e, "previousSibling", n);
          },
          siblings: function (e) {
            return K((e.parentNode || {}).firstChild, e);
          },
          children: function (e) {
            return K(e.firstChild);
          },
          contents: function (e) {
            return l(e, "iframe")
              ? e.contentDocument
              : (l(e, "template") && (e = e.content || e),
                C.merge([], e.childNodes));
          },
        },
        function (i, o) {
          C.fn[i] = function (e, t) {
            var n = C.map(this, o, e);
            return (
              (t = "Until" !== i.slice(-5) ? e : t) &&
                "string" == typeof t &&
                (n = C.filter(t, n)),
              1 < this.length &&
                (ie[i] || C.uniqueSort(n), ne.test(i) && n.reverse()),
              this.pushStack(n)
            );
          };
        }
      );
    var S = /[^\x20\t\r\n\f]+/g;
    function c(e) {
      return e;
    }
    function re(e) {
      throw e;
    }
    function se(e, t, n, i) {
      var o;
      try {
        e && y((o = e.promise))
          ? o.call(e).done(t).fail(n)
          : e && y((o = e.then))
          ? o.call(e, t, n)
          : t.apply(void 0, [e].slice(i));
      } catch (e) {
        n.apply(void 0, [e]);
      }
    }
    (C.Callbacks = function (i) {
      var e, n;
      i =
        "string" == typeof i
          ? ((e = i),
            (n = {}),
            C.each(e.match(S) || [], function (e, t) {
              n[t] = !0;
            }),
            n)
          : C.extend({}, i);
      function o() {
        for (a = a || i.once, s = r = !0; u.length; c = -1)
          for (t = u.shift(); ++c < l.length; )
            !1 === l[c].apply(t[0], t[1]) &&
              i.stopOnFalse &&
              ((c = l.length), (t = !1));
        i.memory || (t = !1), (r = !1), a && (l = t ? [] : "");
      }
      var r,
        t,
        s,
        a,
        l = [],
        u = [],
        c = -1,
        d = {
          add: function () {
            return (
              l &&
                (t && !r && ((c = l.length - 1), u.push(t)),
                (function n(e) {
                  C.each(e, function (e, t) {
                    y(t)
                      ? (i.unique && d.has(t)) || l.push(t)
                      : t && t.length && "string" !== f(t) && n(t);
                  });
                })(arguments),
                t && !r && o()),
              this
            );
          },
          remove: function () {
            return (
              C.each(arguments, function (e, t) {
                for (var n; -1 < (n = C.inArray(t, l, n)); )
                  l.splice(n, 1), n <= c && c--;
              }),
              this
            );
          },
          has: function (e) {
            return e ? -1 < C.inArray(e, l) : 0 < l.length;
          },
          empty: function () {
            return (l = l && []), this;
          },
          disable: function () {
            return (a = u = []), (l = t = ""), this;
          },
          disabled: function () {
            return !l;
          },
          lock: function () {
            return (a = u = []), t || r || (l = t = ""), this;
          },
          locked: function () {
            return !!a;
          },
          fireWith: function (e, t) {
            return (
              a ||
                ((t = [e, (t = t || []).slice ? t.slice() : t]),
                u.push(t),
                r || o()),
              this
            );
          },
          fire: function () {
            return d.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!s;
          },
        };
      return d;
    }),
      C.extend({
        Deferred: function (e) {
          var r = [
              [
                "notify",
                "progress",
                C.Callbacks("memory"),
                C.Callbacks("memory"),
                2,
              ],
              [
                "resolve",
                "done",
                C.Callbacks("once memory"),
                C.Callbacks("once memory"),
                0,
                "resolved",
              ],
              [
                "reject",
                "fail",
                C.Callbacks("once memory"),
                C.Callbacks("once memory"),
                1,
                "rejected",
              ],
            ],
            o = "pending",
            s = {
              state: function () {
                return o;
              },
              always: function () {
                return a.done(arguments).fail(arguments), this;
              },
              catch: function (e) {
                return s.then(null, e);
              },
              pipe: function () {
                var o = arguments;
                return C.Deferred(function (i) {
                  C.each(r, function (e, t) {
                    var n = y(o[t[4]]) && o[t[4]];
                    a[t[1]](function () {
                      var e = n && n.apply(this, arguments);
                      e && y(e.promise)
                        ? e
                            .promise()
                            .progress(i.notify)
                            .done(i.resolve)
                            .fail(i.reject)
                        : i[t[0] + "With"](this, n ? [e] : arguments);
                    });
                  }),
                    (o = null);
                }).promise();
              },
              then: function (t, n, i) {
                var l = 0;
                function u(o, r, s, a) {
                  return function () {
                    function e() {
                      var e, t;
                      if (!(o < l)) {
                        if ((e = s.apply(n, i)) === r.promise())
                          throw new TypeError("Thenable self-resolution");
                        (t =
                          e &&
                          ("object" == typeof e || "function" == typeof e) &&
                          e.then),
                          y(t)
                            ? a
                              ? t.call(e, u(l, r, c, a), u(l, r, re, a))
                              : (l++,
                                t.call(
                                  e,
                                  u(l, r, c, a),
                                  u(l, r, re, a),
                                  u(l, r, c, r.notifyWith)
                                ))
                            : (s !== c && ((n = void 0), (i = [e])),
                              (a || r.resolveWith)(n, i));
                      }
                    }
                    var n = this,
                      i = arguments,
                      t = a
                        ? e
                        : function () {
                            try {
                              e();
                            } catch (e) {
                              C.Deferred.exceptionHook &&
                                C.Deferred.exceptionHook(e, t.stackTrace),
                                l <= o + 1 &&
                                  (s !== re && ((n = void 0), (i = [e])),
                                  r.rejectWith(n, i));
                            }
                          };
                    o
                      ? t()
                      : (C.Deferred.getStackHook &&
                          (t.stackTrace = C.Deferred.getStackHook()),
                        w.setTimeout(t));
                  };
                }
                return C.Deferred(function (e) {
                  r[0][3].add(u(0, e, y(i) ? i : c, e.notifyWith)),
                    r[1][3].add(u(0, e, y(t) ? t : c)),
                    r[2][3].add(u(0, e, y(n) ? n : re));
                }).promise();
              },
              promise: function (e) {
                return null != e ? C.extend(e, s) : s;
              },
            },
            a = {};
          return (
            C.each(r, function (e, t) {
              var n = t[2],
                i = t[5];
              (s[t[1]] = n.add),
                i &&
                  n.add(
                    function () {
                      o = i;
                    },
                    r[3 - e][2].disable,
                    r[3 - e][3].disable,
                    r[0][2].lock,
                    r[0][3].lock
                  ),
                n.add(t[3].fire),
                (a[t[0]] = function () {
                  return (
                    a[t[0] + "With"](this === a ? void 0 : this, arguments),
                    this
                  );
                }),
                (a[t[0] + "With"] = n.fireWith);
            }),
            s.promise(a),
            e && e.call(a, a),
            a
          );
        },
        when: function (e) {
          function t(t) {
            return function (e) {
              (o[t] = this),
                (r[t] = 1 < arguments.length ? a.call(arguments) : e),
                --n || s.resolveWith(o, r);
            };
          }
          var n = arguments.length,
            i = n,
            o = Array(i),
            r = a.call(arguments),
            s = C.Deferred();
          if (
            n <= 1 &&
            (se(e, s.done(t(i)).resolve, s.reject, !n),
            "pending" === s.state() || y(r[i] && r[i].then))
          )
            return s.then();
          for (; i--; ) se(r[i], t(i), s.reject);
          return s.promise();
        },
      });
    var ae = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/,
      le =
        ((C.Deferred.exceptionHook = function (e, t) {
          w.console &&
            w.console.warn &&
            e &&
            ae.test(e.name) &&
            w.console.warn(
              "jQuery.Deferred exception: " + e.message,
              e.stack,
              t
            );
        }),
        (C.readyException = function (e) {
          w.setTimeout(function () {
            throw e;
          });
        }),
        C.Deferred());
    function ue() {
      x.removeEventListener("DOMContentLoaded", ue),
        w.removeEventListener("load", ue),
        C.ready();
    }
    (C.fn.ready = function (e) {
      return (
        le.then(e).catch(function (e) {
          C.readyException(e);
        }),
        this
      );
    }),
      C.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (e) {
          (!0 === e ? --C.readyWait : C.isReady) ||
            ((C.isReady = !0) !== e && 0 < --C.readyWait) ||
            le.resolveWith(x, [C]);
        },
      }),
      (C.ready.then = le.then),
      "complete" === x.readyState ||
      ("loading" !== x.readyState && !x.documentElement.doScroll)
        ? w.setTimeout(C.ready)
        : (x.addEventListener("DOMContentLoaded", ue),
          w.addEventListener("load", ue));
    function d(e, t, n, i, o, r, s) {
      var a = 0,
        l = e.length,
        u = null == n;
      if ("object" === f(n))
        for (a in ((o = !0), n)) d(e, t, a, n[a], !0, r, s);
      else if (
        void 0 !== i &&
        ((o = !0),
        y(i) || (s = !0),
        (t = u
          ? s
            ? (t.call(e, i), null)
            : ((u = t),
              function (e, t, n) {
                return u.call(C(e), n);
              })
          : t))
      )
        for (; a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
      return o ? e : u ? t.call(e) : l ? t(e[0], n) : r;
    }
    var ce = /^-ms-/,
      de = /-([a-z])/g;
    function pe(e, t) {
      return t.toUpperCase();
    }
    function b(e) {
      return e.replace(ce, "ms-").replace(de, pe);
    }
    function he(e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }
    function t() {
      this.expando = C.expando + t.uid++;
    }
    (t.uid = 1),
      (t.prototype = {
        cache: function (e) {
          var t = e[this.expando];
          return (
            t ||
              ((t = {}),
              he(e) &&
                (e.nodeType
                  ? (e[this.expando] = t)
                  : Object.defineProperty(e, this.expando, {
                      value: t,
                      configurable: !0,
                    }))),
            t
          );
        },
        set: function (e, t, n) {
          var i,
            o = this.cache(e);
          if ("string" == typeof t) o[b(t)] = n;
          else for (i in t) o[b(i)] = t[i];
          return o;
        },
        get: function (e, t) {
          return void 0 === t
            ? this.cache(e)
            : e[this.expando] && e[this.expando][b(t)];
        },
        access: function (e, t, n) {
          return void 0 === t || (t && "string" == typeof t && void 0 === n)
            ? this.get(e, t)
            : (this.set(e, t, n), void 0 !== n ? n : t);
        },
        remove: function (e, t) {
          var n,
            i = e[this.expando];
          if (void 0 !== i) {
            if (void 0 !== t) {
              n = (t = Array.isArray(t)
                ? t.map(b)
                : (t = b(t)) in i
                ? [t]
                : t.match(S) || []).length;
              for (; n--; ) delete i[t[n]];
            }
            (void 0 !== t && !C.isEmptyObject(i)) ||
              (e.nodeType
                ? (e[this.expando] = void 0)
                : delete e[this.expando]);
          }
        },
        hasData: function (e) {
          e = e[this.expando];
          return void 0 !== e && !C.isEmptyObject(e);
        },
      });
    var v = new t(),
      u = new t(),
      fe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      me = /[A-Z]/g;
    function ge(e, t, n) {
      var i, o;
      if (void 0 === n && 1 === e.nodeType)
        if (
          ((i = "data-" + t.replace(me, "-$&").toLowerCase()),
          "string" == typeof (n = e.getAttribute(i)))
        ) {
          try {
            n =
              "true" === (o = n) ||
              ("false" !== o &&
                ("null" === o
                  ? null
                  : o === +o + ""
                  ? +o
                  : fe.test(o)
                  ? JSON.parse(o)
                  : o));
          } catch (e) {}
          u.set(e, t, n);
        } else n = void 0;
      return n;
    }
    C.extend({
      hasData: function (e) {
        return u.hasData(e) || v.hasData(e);
      },
      data: function (e, t, n) {
        return u.access(e, t, n);
      },
      removeData: function (e, t) {
        u.remove(e, t);
      },
      _data: function (e, t, n) {
        return v.access(e, t, n);
      },
      _removeData: function (e, t) {
        v.remove(e, t);
      },
    }),
      C.fn.extend({
        data: function (n, e) {
          var t,
            i,
            o,
            r = this[0],
            s = r && r.attributes;
          if (void 0 !== n)
            return "object" == typeof n
              ? this.each(function () {
                  u.set(this, n);
                })
              : d(
                  this,
                  function (e) {
                    var t;
                    if (r && void 0 === e)
                      return void 0 !== (t = u.get(r, n)) ||
                        void 0 !== (t = ge(r, n))
                        ? t
                        : void 0;
                    this.each(function () {
                      u.set(this, n, e);
                    });
                  },
                  null,
                  e,
                  1 < arguments.length,
                  null,
                  !0
                );
          if (
            this.length &&
            ((o = u.get(r)), 1 === r.nodeType && !v.get(r, "hasDataAttrs"))
          ) {
            for (t = s.length; t--; )
              s[t] &&
                0 === (i = s[t].name).indexOf("data-") &&
                ((i = b(i.slice(5))), ge(r, i, o[i]));
            v.set(r, "hasDataAttrs", !0);
          }
          return o;
        },
        removeData: function (e) {
          return this.each(function () {
            u.remove(this, e);
          });
        },
      }),
      C.extend({
        queue: function (e, t, n) {
          var i;
          if (e)
            return (
              (i = v.get(e, (t = (t || "fx") + "queue"))),
              n &&
                (!i || Array.isArray(n)
                  ? (i = v.access(e, t, C.makeArray(n)))
                  : i.push(n)),
              i || []
            );
        },
        dequeue: function (e, t) {
          t = t || "fx";
          var n = C.queue(e, t),
            i = n.length,
            o = n.shift(),
            r = C._queueHooks(e, t);
          "inprogress" === o && ((o = n.shift()), i--),
            o &&
              ("fx" === t && n.unshift("inprogress"),
              delete r.stop,
              o.call(
                e,
                function () {
                  C.dequeue(e, t);
                },
                r
              )),
            !i && r && r.empty.fire();
        },
        _queueHooks: function (e, t) {
          var n = t + "queueHooks";
          return (
            v.get(e, n) ||
            v.access(e, n, {
              empty: C.Callbacks("once memory").add(function () {
                v.remove(e, [t + "queue", n]);
              }),
            })
          );
        },
      }),
      C.fn.extend({
        queue: function (t, n) {
          var e = 2;
          return (
            "string" != typeof t && ((n = t), (t = "fx"), e--),
            arguments.length < e
              ? C.queue(this[0], t)
              : void 0 === n
              ? this
              : this.each(function () {
                  var e = C.queue(this, t, n);
                  C._queueHooks(this, t),
                    "fx" === t && "inprogress" !== e[0] && C.dequeue(this, t);
                })
          );
        },
        dequeue: function (e) {
          return this.each(function () {
            C.dequeue(this, e);
          });
        },
        clearQueue: function (e) {
          return this.queue(e || "fx", []);
        },
        promise: function (e, t) {
          function n() {
            --o || r.resolveWith(s, [s]);
          }
          var i,
            o = 1,
            r = C.Deferred(),
            s = this,
            a = this.length;
          for (
            "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
            a--;

          )
            (i = v.get(s[a], e + "queueHooks")) &&
              i.empty &&
              (o++, i.empty.add(n));
          return n(), r.promise(t);
        },
      });
    function ve(e, t) {
      return (
        "none" === (e = t || e).style.display ||
        ("" === e.style.display &&
          C.contains(e.ownerDocument, e) &&
          "none" === C.css(e, "display"))
      );
    }
    function ye(e, t, n, i) {
      var o,
        r = {};
      for (o in t) (r[o] = e.style[o]), (e.style[o] = t[o]);
      for (o in ((n = n.apply(e, i || [])), t)) e.style[o] = r[o];
      return n;
    }
    var e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      p = new RegExp("^(?:([+-])=|)(" + e + ")([a-z%]*)$", "i"),
      h = ["Top", "Right", "Bottom", "Left"];
    function be(e, t, n, i) {
      var o,
        r,
        s = 20,
        a = i
          ? function () {
              return i.cur();
            }
          : function () {
              return C.css(e, t, "");
            },
        l = a(),
        u = (n && n[3]) || (C.cssNumber[t] ? "" : "px"),
        c = (C.cssNumber[t] || ("px" !== u && +l)) && p.exec(C.css(e, t));
      if (c && c[3] !== u) {
        for (u = u || c[3], c = +(l /= 2) || 1; s--; )
          C.style(e, t, c + u),
            (1 - r) * (1 - (r = a() / l || 0.5)) <= 0 && (s = 0),
            (c /= r);
        C.style(e, t, (c *= 2) + u), (n = n || []);
      }
      return (
        n &&
          ((c = +c || +l || 0),
          (o = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
          i && ((i.unit = u), (i.start = c), (i.end = o))),
        o
      );
    }
    var ke = {};
    function k(e, t) {
      for (var n, i, o, r, s, a = [], l = 0, u = e.length; l < u; l++)
        (i = e[l]).style &&
          ((n = i.style.display),
          t
            ? ("none" === n &&
                ((a[l] = v.get(i, "display") || null),
                a[l] || (i.style.display = "")),
              "" === i.style.display &&
                ve(i) &&
                (a[l] =
                  ((s = r = void 0),
                  (r = (o = i).ownerDocument),
                  (o = o.nodeName),
                  (s = ke[o]) ||
                    ((r = r.body.appendChild(r.createElement(o))),
                    (s = C.css(r, "display")),
                    r.parentNode.removeChild(r),
                    (ke[o] = s = "none" === s ? "block" : s)))))
            : "none" !== n && ((a[l] = "none"), v.set(i, "display", n)));
      for (l = 0; l < u; l++) null != a[l] && (e[l].style.display = a[l]);
      return e;
    }
    C.fn.extend({
      show: function () {
        return k(this, !0);
      },
      hide: function () {
        return k(this);
      },
      toggle: function (e) {
        return "boolean" == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
              ve(this) ? C(this).show() : C(this).hide();
            });
      },
    });
    var we = /^(?:checkbox|radio)$/i,
      xe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      Ce = /^$|^module$|\/(?:java|ecma)script/i,
      T = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""],
      };
    function A(e, t) {
      var n =
        void 0 !== e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : void 0 !== e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : [];
      return void 0 === t || (t && l(e, t)) ? C.merge([e], n) : n;
    }
    function Se(e, t) {
      for (var n = 0, i = e.length; n < i; n++)
        v.set(e[n], "globalEval", !t || v.get(t[n], "globalEval"));
    }
    (T.optgroup = T.option),
      (T.tbody = T.tfoot = T.colgroup = T.caption = T.thead),
      (T.th = T.td);
    var Te = /<|&#?\w+;/;
    function Ae(e, t, n, i, o) {
      for (
        var r,
          s,
          a,
          l,
          u,
          c = t.createDocumentFragment(),
          d = [],
          p = 0,
          h = e.length;
        p < h;
        p++
      )
        if ((r = e[p]) || 0 === r)
          if ("object" === f(r)) C.merge(d, r.nodeType ? [r] : r);
          else if (Te.test(r)) {
            for (
              s = s || c.appendChild(t.createElement("div")),
                a = (xe.exec(r) || ["", ""])[1].toLowerCase(),
                a = T[a] || T._default,
                s.innerHTML = a[1] + C.htmlPrefilter(r) + a[2],
                u = a[0];
              u--;

            )
              s = s.lastChild;
            C.merge(d, s.childNodes), ((s = c.firstChild).textContent = "");
          } else d.push(t.createTextNode(r));
      for (c.textContent = "", p = 0; (r = d[p++]); )
        if (i && -1 < C.inArray(r, i)) o && o.push(r);
        else if (
          ((l = C.contains(r.ownerDocument, r)),
          (s = A(c.appendChild(r), "script")),
          l && Se(s),
          n)
        )
          for (u = 0; (r = s[u++]); ) Ce.test(r.type || "") && n.push(r);
      return c;
    }
    (F = x.createDocumentFragment().appendChild(x.createElement("div"))),
      (s = x.createElement("input")).setAttribute("type", "radio"),
      s.setAttribute("checked", "checked"),
      s.setAttribute("name", "t"),
      F.appendChild(s),
      (g.checkClone = F.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (F.innerHTML = "<textarea>x</textarea>"),
      (g.noCloneChecked = !!F.cloneNode(!0).lastChild.defaultValue);
    var Ee = x.documentElement,
      _e = /^key/,
      De = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      $e = /^([^.]*)(?:\.(.+)|)/;
    function Fe() {
      return !0;
    }
    function E() {
      return !1;
    }
    function je() {
      try {
        return x.activeElement;
      } catch (e) {}
    }
    function Me(e, t, n, i, o, r) {
      var s, a;
      if ("object" == typeof t) {
        for (a in ("string" != typeof n && ((i = i || n), (n = void 0)), t))
          Me(e, a, n, i, t[a], r);
        return e;
      }
      if (
        (null == i && null == o
          ? ((o = n), (i = n = void 0))
          : null == o &&
            ("string" == typeof n
              ? ((o = i), (i = void 0))
              : ((o = i), (i = n), (n = void 0))),
        !1 === o)
      )
        o = E;
      else if (!o) return e;
      return (
        1 === r &&
          ((s = o),
          ((o = function (e) {
            return C().off(e), s.apply(this, arguments);
          }).guid = s.guid || (s.guid = C.guid++))),
        e.each(function () {
          C.event.add(this, t, o, i, n);
        })
      );
    }
    (C.event = {
      global: {},
      add: function (t, e, n, i, o) {
        var r,
          s,
          a,
          l,
          u,
          c,
          d,
          p,
          h,
          f = v.get(t);
        if (f)
          for (
            n.handler && ((n = (r = n).handler), (o = r.selector)),
              o && C.find.matchesSelector(Ee, o),
              n.guid || (n.guid = C.guid++),
              (a = f.events) || (a = f.events = {}),
              (s = f.handle) ||
                (s = f.handle =
                  function (e) {
                    return void 0 !== C && C.event.triggered !== e.type
                      ? C.event.dispatch.apply(t, arguments)
                      : void 0;
                  }),
              l = (e = (e || "").match(S) || [""]).length;
            l--;

          )
            (d = h = (p = $e.exec(e[l]) || [])[1]),
              (p = (p[2] || "").split(".").sort()),
              d &&
                ((u = C.event.special[d] || {}),
                (d = (o ? u.delegateType : u.bindType) || d),
                (u = C.event.special[d] || {}),
                (h = C.extend(
                  {
                    type: d,
                    origType: h,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && C.expr.match.needsContext.test(o),
                    namespace: p.join("."),
                  },
                  r
                )),
                (c = a[d]) ||
                  (((c = a[d] = []).delegateCount = 0),
                  (u.setup && !1 !== u.setup.call(t, i, p, s)) ||
                    (t.addEventListener && t.addEventListener(d, s))),
                u.add &&
                  (u.add.call(t, h),
                  h.handler.guid || (h.handler.guid = n.guid)),
                o ? c.splice(c.delegateCount++, 0, h) : c.push(h),
                (C.event.global[d] = !0));
      },
      remove: function (e, t, n, i, o) {
        var r,
          s,
          a,
          l,
          u,
          c,
          d,
          p,
          h,
          f,
          m,
          g = v.hasData(e) && v.get(e);
        if (g && (l = g.events)) {
          for (u = (t = (t || "").match(S) || [""]).length; u--; )
            if (
              ((h = m = (a = $e.exec(t[u]) || [])[1]),
              (f = (a[2] || "").split(".").sort()),
              h)
            ) {
              for (
                d = C.event.special[h] || {},
                  p = l[(h = (i ? d.delegateType : d.bindType) || h)] || [],
                  a =
                    a[2] &&
                    new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  s = r = p.length;
                r--;

              )
                (c = p[r]),
                  (!o && m !== c.origType) ||
                    (n && n.guid !== c.guid) ||
                    (a && !a.test(c.namespace)) ||
                    (i && i !== c.selector && ("**" !== i || !c.selector)) ||
                    (p.splice(r, 1),
                    c.selector && p.delegateCount--,
                    d.remove && d.remove.call(e, c));
              s &&
                !p.length &&
                ((d.teardown && !1 !== d.teardown.call(e, f, g.handle)) ||
                  C.removeEvent(e, h, g.handle),
                delete l[h]);
            } else for (h in l) C.event.remove(e, h + t[u], n, i, !0);
          C.isEmptyObject(l) && v.remove(e, "handle events");
        }
      },
      dispatch: function (e) {
        var t,
          n,
          i,
          o,
          r,
          s = C.event.fix(e),
          a = new Array(arguments.length),
          e = (v.get(this, "events") || {})[s.type] || [],
          l = C.event.special[s.type] || {};
        for (a[0] = s, t = 1; t < arguments.length; t++) a[t] = arguments[t];
        if (
          ((s.delegateTarget = this),
          !l.preDispatch || !1 !== l.preDispatch.call(this, s))
        ) {
          for (
            r = C.event.handlers.call(this, s, e), t = 0;
            (i = r[t++]) && !s.isPropagationStopped();

          )
            for (
              s.currentTarget = i.elem, n = 0;
              (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();

            )
              (s.rnamespace && !s.rnamespace.test(o.namespace)) ||
                ((s.handleObj = o),
                (s.data = o.data),
                void 0 !==
                  (o = (
                    (C.event.special[o.origType] || {}).handle || o.handler
                  ).apply(i.elem, a)) &&
                  !1 === (s.result = o) &&
                  (s.preventDefault(), s.stopPropagation()));
          return l.postDispatch && l.postDispatch.call(this, s), s.result;
        }
      },
      handlers: function (e, t) {
        var n,
          i,
          o,
          r,
          s,
          a = [],
          l = t.delegateCount,
          u = e.target;
        if (l && u.nodeType && !("click" === e.type && 1 <= e.button))
          for (; u !== this; u = u.parentNode || this)
            if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
              for (r = [], s = {}, n = 0; n < l; n++)
                void 0 === s[(o = (i = t[n]).selector + " ")] &&
                  (s[o] = i.needsContext
                    ? -1 < C(o, this).index(u)
                    : C.find(o, this, null, [u]).length),
                  s[o] && r.push(i);
              r.length && a.push({ elem: u, handlers: r });
            }
        return (
          (u = this),
          l < t.length && a.push({ elem: u, handlers: t.slice(l) }),
          a
        );
      },
      addProp: function (t, e) {
        Object.defineProperty(C.Event.prototype, t, {
          enumerable: !0,
          configurable: !0,
          get: y(e)
            ? function () {
                if (this.originalEvent) return e(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[t];
              },
          set: function (e) {
            Object.defineProperty(this, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: e,
            });
          },
        });
      },
      fix: function (e) {
        return e[C.expando] ? e : new C.Event(e);
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== je() && this.focus) return this.focus(), !1;
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            if (this === je() && this.blur) return this.blur(), !1;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            if ("checkbox" === this.type && this.click && l(this, "input"))
              return this.click(), !1;
          },
          _default: function (e) {
            return l(e.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (e) {
            void 0 !== e.result &&
              e.originalEvent &&
              (e.originalEvent.returnValue = e.result);
          },
        },
      },
    }),
      (C.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
      }),
      (C.Event = function (e, t) {
        if (!(this instanceof C.Event)) return new C.Event(e, t);
        e && e.type
          ? ((this.originalEvent = e),
            (this.type = e.type),
            (this.isDefaultPrevented =
              e.defaultPrevented ||
              (void 0 === e.defaultPrevented && !1 === e.returnValue)
                ? Fe
                : E),
            (this.target =
              e.target && 3 === e.target.nodeType
                ? e.target.parentNode
                : e.target),
            (this.currentTarget = e.currentTarget),
            (this.relatedTarget = e.relatedTarget))
          : (this.type = e),
          t && C.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || Date.now()),
          (this[C.expando] = !0);
      }),
      (C.Event.prototype = {
        constructor: C.Event,
        isDefaultPrevented: E,
        isPropagationStopped: E,
        isImmediatePropagationStopped: E,
        isSimulated: !1,
        preventDefault: function () {
          var e = this.originalEvent;
          (this.isDefaultPrevented = Fe),
            e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function () {
          var e = this.originalEvent;
          (this.isPropagationStopped = Fe),
            e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          (this.isImmediatePropagationStopped = Fe),
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      C.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: function (e) {
            var t = e.button;
            return null == e.which && _e.test(e.type)
              ? null != e.charCode
                ? e.charCode
                : e.keyCode
              : !e.which && void 0 !== t && De.test(e.type)
              ? 1 & t
                ? 1
                : 2 & t
                ? 3
                : 4 & t
                ? 2
                : 0
              : e.which;
          },
        },
        C.event.addProp
      ),
      C.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (e, o) {
          C.event.special[e] = {
            delegateType: o,
            bindType: o,
            handle: function (e) {
              var t,
                n = e.relatedTarget,
                i = e.handleObj;
              return (
                (n && (n === this || C.contains(this, n))) ||
                  ((e.type = i.origType),
                  (t = i.handler.apply(this, arguments)),
                  (e.type = o)),
                t
              );
            },
          };
        }
      ),
      C.fn.extend({
        on: function (e, t, n, i) {
          return Me(this, e, t, n, i);
        },
        one: function (e, t, n, i) {
          return Me(this, e, t, n, i, 1);
        },
        off: function (e, t, n) {
          var i, o;
          if (e && e.preventDefault && e.handleObj)
            return (
              (i = e.handleObj),
              C(e.delegateTarget).off(
                i.namespace ? i.origType + "." + i.namespace : i.origType,
                i.selector,
                i.handler
              ),
              this
            );
          if ("object" != typeof e)
            return (
              (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
              !1 === n && (n = E),
              this.each(function () {
                C.event.remove(this, e, n, t);
              })
            );
          for (o in e) this.off(o, t, e[o]);
          return this;
        },
      });
    var Oe =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Pe = /<script|<style|<link/i,
      Ie = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function Be(e, t) {
      return (
        (l(e, "table") &&
          l(11 !== t.nodeType ? t : t.firstChild, "tr") &&
          C(e).children("tbody")[0]) ||
        e
      );
    }
    function Ne(e) {
      return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function Re(e) {
      return (
        "true/" === (e.type || "").slice(0, 5)
          ? (e.type = e.type.slice(5))
          : e.removeAttribute("type"),
        e
      );
    }
    function He(e, t) {
      var n, i, o, r, s, a;
      if (1 === t.nodeType) {
        if (
          v.hasData(e) &&
          ((r = v.access(e)), (s = v.set(t, r)), (a = r.events))
        )
          for (o in (delete s.handle, (s.events = {}), a))
            for (n = 0, i = a[o].length; n < i; n++) C.event.add(t, o, a[o][n]);
        u.hasData(e) && ((r = u.access(e)), (s = C.extend({}, r)), u.set(t, s));
      }
    }
    function _(n, i, o, r) {
      i = B.apply([], i);
      var e,
        t,
        s,
        a,
        l,
        u,
        c = 0,
        d = n.length,
        p = d - 1,
        h = i[0],
        f = y(h);
      if (f || (1 < d && "string" == typeof h && !g.checkClone && Ie.test(h)))
        return n.each(function (e) {
          var t = n.eq(e);
          f && (i[0] = h.call(this, e, t.html())), _(t, i, o, r);
        });
      if (
        d &&
        ((t = (e = Ae(i, n[0].ownerDocument, !1, n, r)).firstChild),
        1 === e.childNodes.length && (e = t),
        t || r)
      ) {
        for (a = (s = C.map(A(e, "script"), Ne)).length; c < d; c++)
          (l = e),
            c !== p &&
              ((l = C.clone(l, !0, !0)), a && C.merge(s, A(l, "script"))),
            o.call(n[c], l, c);
        if (a)
          for (
            u = s[s.length - 1].ownerDocument, C.map(s, Re), c = 0;
            c < a;
            c++
          )
            (l = s[c]),
              Ce.test(l.type || "") &&
                !v.access(l, "globalEval") &&
                C.contains(u, l) &&
                (l.src && "module" !== (l.type || "").toLowerCase()
                  ? C._evalUrl && C._evalUrl(l.src)
                  : Y(l.textContent.replace(Le, ""), u, l));
      }
      return n;
    }
    function qe(e, t, n) {
      for (var i, o = t ? C.filter(t, e) : e, r = 0; null != (i = o[r]); r++)
        n || 1 !== i.nodeType || C.cleanData(A(i)),
          i.parentNode &&
            (n && C.contains(i.ownerDocument, i) && Se(A(i, "script")),
            i.parentNode.removeChild(i));
      return e;
    }
    C.extend({
      htmlPrefilter: function (e) {
        return e.replace(Oe, "<$1></$2>");
      },
      clone: function (e, t, n) {
        var i,
          o,
          r,
          s,
          a,
          l,
          u,
          c = e.cloneNode(!0),
          d = C.contains(e.ownerDocument, e);
        if (
          !(
            g.noCloneChecked ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            C.isXMLDoc(e)
          )
        )
          for (s = A(c), i = 0, o = (r = A(e)).length; i < o; i++)
            (a = r[i]),
              (l = s[i]),
              (u = void 0),
              "input" === (u = l.nodeName.toLowerCase()) && we.test(a.type)
                ? (l.checked = a.checked)
                : ("input" !== u && "textarea" !== u) ||
                  (l.defaultValue = a.defaultValue);
        if (t)
          if (n)
            for (r = r || A(e), s = s || A(c), i = 0, o = r.length; i < o; i++)
              He(r[i], s[i]);
          else He(e, c);
        return (
          0 < (s = A(c, "script")).length && Se(s, !d && A(e, "script")), c
        );
      },
      cleanData: function (e) {
        for (
          var t, n, i, o = C.event.special, r = 0;
          void 0 !== (n = e[r]);
          r++
        )
          if (he(n)) {
            if ((t = n[v.expando])) {
              if (t.events)
                for (i in t.events)
                  o[i] ? C.event.remove(n, i) : C.removeEvent(n, i, t.handle);
              n[v.expando] = void 0;
            }
            n[u.expando] && (n[u.expando] = void 0);
          }
      },
    }),
      C.fn.extend({
        detach: function (e) {
          return qe(this, e, !0);
        },
        remove: function (e) {
          return qe(this, e);
        },
        text: function (e) {
          return d(
            this,
            function (e) {
              return void 0 === e
                ? C.text(this)
                : this.empty().each(function () {
                    (1 !== this.nodeType &&
                      11 !== this.nodeType &&
                      9 !== this.nodeType) ||
                      (this.textContent = e);
                  });
            },
            null,
            e,
            arguments.length
          );
        },
        append: function () {
          return _(this, arguments, function (e) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              Be(this, e).appendChild(e);
          });
        },
        prepend: function () {
          return _(this, arguments, function (e) {
            var t;
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              (t = Be(this, e)).insertBefore(e, t.firstChild);
          });
        },
        before: function () {
          return _(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this);
          });
        },
        after: function () {
          return _(this, arguments, function (e) {
            this.parentNode &&
              this.parentNode.insertBefore(e, this.nextSibling);
          });
        },
        empty: function () {
          for (var e, t = 0; null != (e = this[t]); t++)
            1 === e.nodeType && (C.cleanData(A(e, !1)), (e.textContent = ""));
          return this;
        },
        clone: function (e, t) {
          return (
            (e = null != e && e),
            (t = null == t ? e : t),
            this.map(function () {
              return C.clone(this, e, t);
            })
          );
        },
        html: function (e) {
          return d(
            this,
            function (e) {
              var t = this[0] || {},
                n = 0,
                i = this.length;
              if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
              if (
                "string" == typeof e &&
                !Pe.test(e) &&
                !T[(xe.exec(e) || ["", ""])[1].toLowerCase()]
              ) {
                e = C.htmlPrefilter(e);
                try {
                  for (; n < i; n++)
                    1 === (t = this[n] || {}).nodeType &&
                      (C.cleanData(A(t, !1)), (t.innerHTML = e));
                  t = 0;
                } catch (e) {}
              }
              t && this.empty().append(e);
            },
            null,
            e,
            arguments.length
          );
        },
        replaceWith: function () {
          var n = [];
          return _(
            this,
            arguments,
            function (e) {
              var t = this.parentNode;
              C.inArray(this, n) < 0 &&
                (C.cleanData(A(this)), t && t.replaceChild(e, this));
            },
            n
          );
        },
      }),
      C.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (e, s) {
          C.fn[e] = function (e) {
            for (var t, n = [], i = C(e), o = i.length - 1, r = 0; r <= o; r++)
              (t = r === o ? this : this.clone(!0)),
                C(i[r])[s](t),
                N.apply(n, t.get());
            return this.pushStack(n);
          };
        }
      );
    function ze(e) {
      var t = e.ownerDocument.defaultView;
      return (t = t && t.opener ? t : w).getComputedStyle(e);
    }
    var We,
      Ue,
      Ve,
      Ye,
      Ze,
      Xe,
      n,
      Ke = new RegExp("^(" + e + ")(?!px)[a-z%]+$", "i"),
      Ge = new RegExp(h.join("|"), "i");
    function o() {
      var e;
      n &&
        ((Xe.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
        (n.style.cssText =
          "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
        Ee.appendChild(Xe).appendChild(n),
        (e = w.getComputedStyle(n)),
        (We = "1%" !== e.top),
        (Ze = 12 === Je(e.marginLeft)),
        (n.style.right = "60%"),
        (Ye = 36 === Je(e.right)),
        (Ue = 36 === Je(e.width)),
        (n.style.position = "absolute"),
        (Ve = 36 === n.offsetWidth || "absolute"),
        Ee.removeChild(Xe),
        (n = null));
    }
    function Je(e) {
      return Math.round(parseFloat(e));
    }
    function D(e, t, n) {
      var i,
        o,
        r = e.style;
      return (
        (n = n || ze(e)) &&
          ("" !== (o = n.getPropertyValue(t) || n[t]) ||
            C.contains(e.ownerDocument, e) ||
            (o = C.style(e, t)),
          !g.pixelBoxStyles() &&
            Ke.test(o) &&
            Ge.test(t) &&
            ((e = r.width),
            (t = r.minWidth),
            (i = r.maxWidth),
            (r.minWidth = r.maxWidth = r.width = o),
            (o = n.width),
            (r.width = e),
            (r.minWidth = t),
            (r.maxWidth = i))),
        void 0 !== o ? o + "" : o
      );
    }
    function Qe(e, t) {
      return {
        get: function () {
          if (!e()) return (this.get = t).apply(this, arguments);
          delete this.get;
        },
      };
    }
    (Xe = x.createElement("div")),
      (n = x.createElement("div")).style &&
        ((n.style.backgroundClip = "content-box"),
        (n.cloneNode(!0).style.backgroundClip = ""),
        (g.clearCloneStyle = "content-box" === n.style.backgroundClip),
        C.extend(g, {
          boxSizingReliable: function () {
            return o(), Ue;
          },
          pixelBoxStyles: function () {
            return o(), Ye;
          },
          pixelPosition: function () {
            return o(), We;
          },
          reliableMarginLeft: function () {
            return o(), Ze;
          },
          scrollboxSize: function () {
            return o(), Ve;
          },
        }));
    var et = /^(none|table(?!-c[ea]).+)/,
      tt = /^--/,
      nt = { position: "absolute", visibility: "hidden", display: "block" },
      it = { letterSpacing: "0", fontWeight: "400" },
      ot = ["Webkit", "Moz", "ms"],
      rt = x.createElement("div").style;
    function st(e) {
      return (
        C.cssProps[e] ||
        (C.cssProps[e] =
          (function (e) {
            if (e in rt) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = ot.length; n--; )
              if ((e = ot[n] + t) in rt) return e;
          })(e) || e)
      );
    }
    function at(e, t, n) {
      var i = p.exec(t);
      return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
    }
    function lt(e, t, n, i, o, r) {
      var s = "width" === t ? 1 : 0,
        a = 0,
        l = 0;
      if (n === (i ? "border" : "content")) return 0;
      for (; s < 4; s += 2)
        "margin" === n && (l += C.css(e, n + h[s], !0, o)),
          i
            ? ("content" === n && (l -= C.css(e, "padding" + h[s], !0, o)),
              "margin" !== n &&
                (l -= C.css(e, "border" + h[s] + "Width", !0, o)))
            : ((l += C.css(e, "padding" + h[s], !0, o)),
              "padding" !== n
                ? (l += C.css(e, "border" + h[s] + "Width", !0, o))
                : (a += C.css(e, "border" + h[s] + "Width", !0, o)));
      return (
        !i &&
          0 <= r &&
          (l += Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - 0.5
            )
          )),
        l
      );
    }
    function ut(e, t, n) {
      var i = ze(e),
        o = D(e, t, i),
        r = "border-box" === C.css(e, "boxSizing", !1, i),
        s = r;
      if (Ke.test(o)) {
        if (!n) return o;
        o = "auto";
      }
      return (
        (s = s && (g.boxSizingReliable() || o === e.style[t])),
        ("auto" !== o &&
          (parseFloat(o) || "inline" !== C.css(e, "display", !1, i))) ||
          ((o = e["offset" + t[0].toUpperCase() + t.slice(1)]), (s = !0)),
        (o = parseFloat(o) || 0) +
          lt(e, t, n || (r ? "border" : "content"), s, i, o) +
          "px"
      );
    }
    function r(e, t, n, i, o) {
      return new r.prototype.init(e, t, n, i, o);
    }
    C.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) return "" === (t = D(e, "opacity")) ? "1" : t;
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: {},
      style: function (e, t, n, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var o,
            r,
            s,
            a = b(t),
            l = tt.test(t),
            u = e.style;
          if (
            (l || (t = st(a)),
            (s = C.cssHooks[t] || C.cssHooks[a]),
            void 0 === n)
          )
            return s && "get" in s && void 0 !== (o = s.get(e, !1, i))
              ? o
              : u[t];
          "string" == (r = typeof n) &&
            (o = p.exec(n)) &&
            o[1] &&
            ((n = be(e, t, o)), (r = "number")),
            null != n &&
              n == n &&
              ("number" === r &&
                (n += (o && o[3]) || (C.cssNumber[a] ? "" : "px")),
              g.clearCloneStyle ||
                "" !== n ||
                0 !== t.indexOf("background") ||
                (u[t] = "inherit"),
              (s && "set" in s && void 0 === (n = s.set(e, n, i))) ||
                (l ? u.setProperty(t, n) : (u[t] = n)));
        }
      },
      css: function (e, t, n, i) {
        var o,
          r = b(t);
        return (
          tt.test(t) || (t = st(r)),
          "normal" ===
            (o =
              void 0 ===
              (o =
                (r = C.cssHooks[t] || C.cssHooks[r]) && "get" in r
                  ? r.get(e, !0, n)
                  : o)
                ? D(e, t, i)
                : o) &&
            t in it &&
            (o = it[t]),
          "" === n || n
            ? ((r = parseFloat(o)), !0 === n || isFinite(r) ? r || 0 : o)
            : o
        );
      },
    }),
      C.each(["height", "width"], function (e, r) {
        C.cssHooks[r] = {
          get: function (e, t, n) {
            if (t)
              return !et.test(C.css(e, "display")) ||
                (e.getClientRects().length && e.getBoundingClientRect().width)
                ? ut(e, r, n)
                : ye(e, nt, function () {
                    return ut(e, r, n);
                  });
          },
          set: function (e, t, n) {
            var i = ze(e),
              o = "border-box" === C.css(e, "boxSizing", !1, i),
              n = n && lt(e, r, n, o, i);
            return (
              o &&
                g.scrollboxSize() === i.position &&
                (n -= Math.ceil(
                  e["offset" + r[0].toUpperCase() + r.slice(1)] -
                    parseFloat(i[r]) -
                    lt(e, r, "border", !1, i) -
                    0.5
                )),
              n &&
                (o = p.exec(t)) &&
                "px" !== (o[3] || "px") &&
                ((e.style[r] = t), (t = C.css(e, r))),
              at(0, t, n)
            );
          },
        };
      }),
      (C.cssHooks.marginLeft = Qe(g.reliableMarginLeft, function (e, t) {
        if (t)
          return (
            (parseFloat(D(e, "marginLeft")) ||
              e.getBoundingClientRect().left -
                ye(e, { marginLeft: 0 }, function () {
                  return e.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      C.each({ margin: "", padding: "", border: "Width" }, function (o, r) {
        (C.cssHooks[o + r] = {
          expand: function (e) {
            for (
              var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e];
              t < 4;
              t++
            )
              n[o + h[t] + r] = i[t] || i[t - 2] || i[0];
            return n;
          },
        }),
          "margin" !== o && (C.cssHooks[o + r].set = at);
      }),
      C.fn.extend({
        css: function (e, t) {
          return d(
            this,
            function (e, t, n) {
              var i,
                o,
                r = {},
                s = 0;
              if (Array.isArray(t)) {
                for (i = ze(e), o = t.length; s < o; s++)
                  r[t[s]] = C.css(e, t[s], !1, i);
                return r;
              }
              return void 0 !== n ? C.style(e, t, n) : C.css(e, t);
            },
            e,
            t,
            1 < arguments.length
          );
        },
      }),
      (((C.Tween = r).prototype = {
        constructor: r,
        init: function (e, t, n, i, o, r) {
          (this.elem = e),
            (this.prop = n),
            (this.easing = o || C.easing._default),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = i),
            (this.unit = r || (C.cssNumber[n] ? "" : "px"));
        },
        cur: function () {
          var e = r.propHooks[this.prop];
          return (e && e.get ? e : r.propHooks._default).get(this);
        },
        run: function (e) {
          var t,
            n = r.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = t =
                  C.easing[this.easing](
                    e,
                    this.options.duration * e,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = t = e),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            (n && n.set ? n : r.propHooks._default).set(this),
            this
          );
        },
      }).init.prototype = r.prototype),
      ((r.propHooks = {
        _default: {
          get: function (e) {
            return 1 !== e.elem.nodeType ||
              (null != e.elem[e.prop] && null == e.elem.style[e.prop])
              ? e.elem[e.prop]
              : (e = C.css(e.elem, e.prop, "")) && "auto" !== e
              ? e
              : 0;
          },
          set: function (e) {
            C.fx.step[e.prop]
              ? C.fx.step[e.prop](e)
              : 1 !== e.elem.nodeType ||
                (null == e.elem.style[C.cssProps[e.prop]] &&
                  !C.cssHooks[e.prop])
              ? (e.elem[e.prop] = e.now)
              : C.style(e.elem, e.prop, e.now + e.unit);
          },
        },
      }).scrollTop = r.propHooks.scrollLeft =
        {
          set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
          },
        }),
      (C.easing = {
        linear: function (e) {
          return e;
        },
        swing: function (e) {
          return 0.5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (C.fx = r.prototype.init),
      (C.fx.step = {});
    var $,
      ct,
      s,
      F,
      dt = /^(?:toggle|show|hide)$/,
      pt = /queueHooks$/;
    function ht() {
      ct &&
        (!1 === x.hidden && w.requestAnimationFrame
          ? w.requestAnimationFrame(ht)
          : w.setTimeout(ht, C.fx.interval),
        C.fx.tick());
    }
    function ft() {
      return (
        w.setTimeout(function () {
          $ = void 0;
        }),
        ($ = Date.now())
      );
    }
    function mt(e, t) {
      var n,
        i = 0,
        o = { height: e };
      for (t = t ? 1 : 0; i < 4; i += 2 - t)
        o["margin" + (n = h[i])] = o["padding" + n] = e;
      return t && (o.opacity = o.width = e), o;
    }
    function gt(e, t, n) {
      for (
        var i,
          o = (j.tweeners[t] || []).concat(j.tweeners["*"]),
          r = 0,
          s = o.length;
        r < s;
        r++
      )
        if ((i = o[r].call(n, t, e))) return i;
    }
    function j(o, e, t) {
      var n,
        r,
        i,
        s,
        a,
        l,
        u,
        c = 0,
        d = j.prefilters.length,
        p = C.Deferred().always(function () {
          delete h.elem;
        }),
        h = function () {
          if (r) return !1;
          for (
            var e = $ || ft(),
              e = Math.max(0, f.startTime + f.duration - e),
              t = 1 - (e / f.duration || 0),
              n = 0,
              i = f.tweens.length;
            n < i;
            n++
          )
            f.tweens[n].run(t);
          return (
            p.notifyWith(o, [f, t, e]),
            t < 1 && i
              ? e
              : (i || p.notifyWith(o, [f, 1, 0]), p.resolveWith(o, [f]), !1)
          );
        },
        f = p.promise({
          elem: o,
          props: C.extend({}, e),
          opts: C.extend(
            !0,
            { specialEasing: {}, easing: C.easing._default },
            t
          ),
          originalProperties: e,
          originalOptions: t,
          startTime: $ || ft(),
          duration: t.duration,
          tweens: [],
          createTween: function (e, t) {
            t = C.Tween(
              o,
              f.opts,
              e,
              t,
              f.opts.specialEasing[e] || f.opts.easing
            );
            return f.tweens.push(t), t;
          },
          stop: function (e) {
            var t = 0,
              n = e ? f.tweens.length : 0;
            if (r) return this;
            for (r = !0; t < n; t++) f.tweens[t].run(1);
            return (
              e
                ? (p.notifyWith(o, [f, 1, 0]), p.resolveWith(o, [f, e]))
                : p.rejectWith(o, [f, e]),
              this
            );
          },
        }),
        m = f.props,
        g = m,
        v = f.opts.specialEasing;
      for (i in g)
        if (
          ((s = b(i)),
          (a = v[s]),
          (l = g[i]),
          Array.isArray(l) && ((a = l[1]), (l = g[i] = l[0])),
          i !== s && ((g[s] = l), delete g[i]),
          (u = C.cssHooks[s]) && "expand" in u)
        )
          for (i in ((l = u.expand(l)), delete g[s], l))
            i in g || ((g[i] = l[i]), (v[i] = a));
        else v[s] = a;
      for (; c < d; c++)
        if ((n = j.prefilters[c].call(f, o, m, f.opts)))
          return (
            y(n.stop) &&
              (C._queueHooks(f.elem, f.opts.queue).stop = n.stop.bind(n)),
            n
          );
      return (
        C.map(m, gt, f),
        y(f.opts.start) && f.opts.start.call(o, f),
        f
          .progress(f.opts.progress)
          .done(f.opts.done, f.opts.complete)
          .fail(f.opts.fail)
          .always(f.opts.always),
        C.fx.timer(C.extend(h, { elem: o, anim: f, queue: f.opts.queue })),
        f
      );
    }
    (C.Animation = C.extend(j, {
      tweeners: {
        "*": [
          function (e, t) {
            var n = this.createTween(e, t);
            return be(n.elem, e, p.exec(t), n), n;
          },
        ],
      },
      tweener: function (e, t) {
        for (
          var n, i = 0, o = (e = y(e) ? ((t = e), ["*"]) : e.match(S)).length;
          i < o;
          i++
        )
          (n = e[i]),
            (j.tweeners[n] = j.tweeners[n] || []),
            j.tweeners[n].unshift(t);
      },
      prefilters: [
        function (e, t, n) {
          var i,
            o,
            r,
            s,
            a,
            l,
            u,
            c = "width" in t || "height" in t,
            d = this,
            p = {},
            h = e.style,
            f = e.nodeType && ve(e),
            m = v.get(e, "fxshow");
          for (i in (n.queue ||
            (null == (s = C._queueHooks(e, "fx")).unqueued &&
              ((s.unqueued = 0),
              (a = s.empty.fire),
              (s.empty.fire = function () {
                s.unqueued || a();
              })),
            s.unqueued++,
            d.always(function () {
              d.always(function () {
                s.unqueued--, C.queue(e, "fx").length || s.empty.fire();
              });
            })),
          t))
            if (((o = t[i]), dt.test(o))) {
              if (
                (delete t[i],
                (r = r || "toggle" === o),
                o === (f ? "hide" : "show"))
              ) {
                if ("show" !== o || !m || void 0 === m[i]) continue;
                f = !0;
              }
              p[i] = (m && m[i]) || C.style(e, i);
            }
          if ((l = !C.isEmptyObject(t)) || !C.isEmptyObject(p))
            for (i in (c &&
              1 === e.nodeType &&
              ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
              null == (u = m && m.display) && (u = v.get(e, "display")),
              "none" === (c = C.css(e, "display")) &&
                (u
                  ? (c = u)
                  : (k([e], !0),
                    (u = e.style.display || u),
                    (c = C.css(e, "display")),
                    k([e]))),
              ("inline" === c || ("inline-block" === c && null != u)) &&
                "none" === C.css(e, "float") &&
                (l ||
                  (d.done(function () {
                    h.display = u;
                  }),
                  null == u && ((c = h.display), (u = "none" === c ? "" : c))),
                (h.display = "inline-block"))),
            n.overflow &&
              ((h.overflow = "hidden"),
              d.always(function () {
                (h.overflow = n.overflow[0]),
                  (h.overflowX = n.overflow[1]),
                  (h.overflowY = n.overflow[2]);
              })),
            (l = !1),
            p))
              l ||
                (m
                  ? "hidden" in m && (f = m.hidden)
                  : (m = v.access(e, "fxshow", { display: u })),
                r && (m.hidden = !f),
                f && k([e], !0),
                d.done(function () {
                  for (i in (f || k([e]), v.remove(e, "fxshow"), p))
                    C.style(e, i, p[i]);
                })),
                (l = gt(f ? m[i] : 0, i, d)),
                i in m ||
                  ((m[i] = l.start), f && ((l.end = l.start), (l.start = 0)));
        },
      ],
      prefilter: function (e, t) {
        t ? j.prefilters.unshift(e) : j.prefilters.push(e);
      },
    })),
      (C.speed = function (e, t, n) {
        var i =
          e && "object" == typeof e
            ? C.extend({}, e)
            : {
                complete: n || (!n && t) || (y(e) && e),
                duration: e,
                easing: (n && t) || (t && !y(t) && t),
              };
        return (
          C.fx.off
            ? (i.duration = 0)
            : "number" != typeof i.duration &&
              (i.duration in C.fx.speeds
                ? (i.duration = C.fx.speeds[i.duration])
                : (i.duration = C.fx.speeds._default)),
          (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
          (i.old = i.complete),
          (i.complete = function () {
            y(i.old) && i.old.call(this), i.queue && C.dequeue(this, i.queue);
          }),
          i
        );
      }),
      C.fn.extend({
        fadeTo: function (e, t, n, i) {
          return this.filter(ve)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: t }, e, n, i);
        },
        animate: function (t, e, n, i) {
          function o() {
            var e = j(this, C.extend({}, t), s);
            (r || v.get(this, "finish")) && e.stop(!0);
          }
          var r = C.isEmptyObject(t),
            s = C.speed(e, n, i);
          return (
            (o.finish = o),
            r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o)
          );
        },
        stop: function (o, e, r) {
          function s(e) {
            var t = e.stop;
            delete e.stop, t(r);
          }
          return (
            "string" != typeof o && ((r = e), (e = o), (o = void 0)),
            e && !1 !== o && this.queue(o || "fx", []),
            this.each(function () {
              var e = !0,
                t = null != o && o + "queueHooks",
                n = C.timers,
                i = v.get(this);
              if (t) i[t] && i[t].stop && s(i[t]);
              else for (t in i) i[t] && i[t].stop && pt.test(t) && s(i[t]);
              for (t = n.length; t--; )
                n[t].elem !== this ||
                  (null != o && n[t].queue !== o) ||
                  (n[t].anim.stop(r), (e = !1), n.splice(t, 1));
              (!e && r) || C.dequeue(this, o);
            })
          );
        },
        finish: function (s) {
          return (
            !1 !== s && (s = s || "fx"),
            this.each(function () {
              var e,
                t = v.get(this),
                n = t[s + "queue"],
                i = t[s + "queueHooks"],
                o = C.timers,
                r = n ? n.length : 0;
              for (
                t.finish = !0,
                  C.queue(this, s, []),
                  i && i.stop && i.stop.call(this, !0),
                  e = o.length;
                e--;

              )
                o[e].elem === this &&
                  o[e].queue === s &&
                  (o[e].anim.stop(!0), o.splice(e, 1));
              for (e = 0; e < r; e++)
                n[e] && n[e].finish && n[e].finish.call(this);
              delete t.finish;
            })
          );
        },
      }),
      C.each(["toggle", "show", "hide"], function (e, i) {
        var o = C.fn[i];
        C.fn[i] = function (e, t, n) {
          return null == e || "boolean" == typeof e
            ? o.apply(this, arguments)
            : this.animate(mt(i, !0), e, t, n);
        };
      }),
      C.each(
        {
          slideDown: mt("show"),
          slideUp: mt("hide"),
          slideToggle: mt("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (e, i) {
          C.fn[e] = function (e, t, n) {
            return this.animate(i, e, t, n);
          };
        }
      ),
      (C.timers = []),
      (C.fx.tick = function () {
        var e,
          t = 0,
          n = C.timers;
        for ($ = Date.now(); t < n.length; t++)
          (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || C.fx.stop(), ($ = void 0);
      }),
      (C.fx.timer = function (e) {
        C.timers.push(e), C.fx.start();
      }),
      (C.fx.interval = 13),
      (C.fx.start = function () {
        ct || ((ct = !0), ht());
      }),
      (C.fx.stop = function () {
        ct = null;
      }),
      (C.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (C.fn.delay = function (i, e) {
        return (
          (i = (C.fx && C.fx.speeds[i]) || i),
          this.queue((e = e || "fx"), function (e, t) {
            var n = w.setTimeout(e, i);
            t.stop = function () {
              w.clearTimeout(n);
            };
          })
        );
      }),
      (s = x.createElement("input")),
      (F = x.createElement("select").appendChild(x.createElement("option"))),
      (s.type = "checkbox"),
      (g.checkOn = "" !== s.value),
      (g.optSelected = F.selected),
      ((s = x.createElement("input")).value = "t"),
      (s.type = "radio"),
      (g.radioValue = "t" === s.value);
    var vt,
      M = C.expr.attrHandle,
      yt =
        (C.fn.extend({
          attr: function (e, t) {
            return d(this, C.attr, e, t, 1 < arguments.length);
          },
          removeAttr: function (e) {
            return this.each(function () {
              C.removeAttr(this, e);
            });
          },
        }),
        C.extend({
          attr: function (e, t, n) {
            var i,
              o,
              r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r)
              return void 0 === e.getAttribute
                ? C.prop(e, t, n)
                : ((1 === r && C.isXMLDoc(e)) ||
                    (o =
                      C.attrHooks[t.toLowerCase()] ||
                      (C.expr.match.bool.test(t) ? vt : void 0)),
                  void 0 !== n
                    ? null === n
                      ? void C.removeAttr(e, t)
                      : o && "set" in o && void 0 !== (i = o.set(e, n, t))
                      ? i
                      : (e.setAttribute(t, n + ""), n)
                    : !(o && "get" in o && null !== (i = o.get(e, t))) &&
                      null == (i = C.find.attr(e, t))
                    ? void 0
                    : i);
          },
          attrHooks: {
            type: {
              set: function (e, t) {
                var n;
                if (!g.radioValue && "radio" === t && l(e, "input"))
                  return (
                    (n = e.value),
                    e.setAttribute("type", t),
                    n && (e.value = n),
                    t
                  );
              },
            },
          },
          removeAttr: function (e, t) {
            var n,
              i = 0,
              o = t && t.match(S);
            if (o && 1 === e.nodeType)
              for (; (n = o[i++]); ) e.removeAttribute(n);
          },
        }),
        (vt = {
          set: function (e, t, n) {
            return !1 === t ? C.removeAttr(e, n) : e.setAttribute(n, n), n;
          },
        }),
        C.each(C.expr.match.bool.source.match(/\w+/g), function (e, t) {
          var s = M[t] || C.find.attr;
          M[t] = function (e, t, n) {
            var i,
              o,
              r = t.toLowerCase();
            return (
              n ||
                ((o = M[r]),
                (M[r] = i),
                (i = null != s(e, t, n) ? r : null),
                (M[r] = o)),
              i
            );
          };
        }),
        /^(?:input|select|textarea|button)$/i),
      bt = /^(?:a|area)$/i;
    function O(e) {
      return (e.match(S) || []).join(" ");
    }
    function P(e) {
      return (e.getAttribute && e.getAttribute("class")) || "";
    }
    function kt(e) {
      return Array.isArray(e) ? e : ("string" == typeof e && e.match(S)) || [];
    }
    C.fn.extend({
      prop: function (e, t) {
        return d(this, C.prop, e, t, 1 < arguments.length);
      },
      removeProp: function (e) {
        return this.each(function () {
          delete this[C.propFix[e] || e];
        });
      },
    }),
      C.extend({
        prop: function (e, t, n) {
          var i,
            o,
            r = e.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return (
              (1 === r && C.isXMLDoc(e)) ||
                ((t = C.propFix[t] || t), (o = C.propHooks[t])),
              void 0 !== n
                ? o && "set" in o && void 0 !== (i = o.set(e, n, t))
                  ? i
                  : (e[t] = n)
                : o && "get" in o && null !== (i = o.get(e, t))
                ? i
                : e[t]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (e) {
              var t = C.find.attr(e, "tabindex");
              return t
                ? parseInt(t, 10)
                : yt.test(e.nodeName) || (bt.test(e.nodeName) && e.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      g.optSelected ||
        (C.propHooks.selected = {
          get: function (e) {
            e = e.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null;
          },
          set: function (e) {
            e = e.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
          },
        }),
      C.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          C.propFix[this.toLowerCase()] = this;
        }
      ),
      C.fn.extend({
        addClass: function (t) {
          var e,
            n,
            i,
            o,
            r,
            s,
            a = 0;
          if (y(t))
            return this.each(function (e) {
              C(this).addClass(t.call(this, e, P(this)));
            });
          if ((e = kt(t)).length)
            for (; (n = this[a++]); )
              if (((s = P(n)), (i = 1 === n.nodeType && " " + O(s) + " "))) {
                for (r = 0; (o = e[r++]); )
                  i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                s !== (s = O(i)) && n.setAttribute("class", s);
              }
          return this;
        },
        removeClass: function (t) {
          var e,
            n,
            i,
            o,
            r,
            s,
            a = 0;
          if (y(t))
            return this.each(function (e) {
              C(this).removeClass(t.call(this, e, P(this)));
            });
          if (!arguments.length) return this.attr("class", "");
          if ((e = kt(t)).length)
            for (; (n = this[a++]); )
              if (((s = P(n)), (i = 1 === n.nodeType && " " + O(s) + " "))) {
                for (r = 0; (o = e[r++]); )
                  for (; -1 < i.indexOf(" " + o + " "); )
                    i = i.replace(" " + o + " ", " ");
                s !== (s = O(i)) && n.setAttribute("class", s);
              }
          return this;
        },
        toggleClass: function (o, t) {
          var r = typeof o,
            s = "string" == r || Array.isArray(o);
          return "boolean" == typeof t && s
            ? t
              ? this.addClass(o)
              : this.removeClass(o)
            : y(o)
            ? this.each(function (e) {
                C(this).toggleClass(o.call(this, e, P(this), t), t);
              })
            : this.each(function () {
                var e, t, n, i;
                if (s)
                  for (t = 0, n = C(this), i = kt(o); (e = i[t++]); )
                    n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                else
                  (void 0 !== o && "boolean" != r) ||
                    ((e = P(this)) && v.set(this, "__className__", e),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        (!e && !1 !== o && v.get(this, "__className__")) || ""
                      ));
              });
        },
        hasClass: function (e) {
          for (var t, n = 0, i = " " + e + " "; (t = this[n++]); )
            if (1 === t.nodeType && -1 < (" " + O(P(t)) + " ").indexOf(i))
              return !0;
          return !1;
        },
      });
    function wt(e) {
      e.stopPropagation();
    }
    var xt = /\r/g,
      Ct =
        (C.fn.extend({
          val: function (t) {
            var n,
              e,
              i,
              o = this[0];
            return arguments.length
              ? ((i = y(t)),
                this.each(function (e) {
                  1 === this.nodeType &&
                    (null == (e = i ? t.call(this, e, C(this).val()) : t)
                      ? (e = "")
                      : "number" == typeof e
                      ? (e += "")
                      : Array.isArray(e) &&
                        (e = C.map(e, function (e) {
                          return null == e ? "" : e + "";
                        })),
                    ((n =
                      C.valHooks[this.type] ||
                      C.valHooks[this.nodeName.toLowerCase()]) &&
                      "set" in n &&
                      void 0 !== n.set(this, e, "value")) ||
                      (this.value = e));
                }))
              : o
              ? (n =
                  C.valHooks[o.type] || C.valHooks[o.nodeName.toLowerCase()]) &&
                "get" in n &&
                void 0 !== (e = n.get(o, "value"))
                ? e
                : "string" == typeof (e = o.value)
                ? e.replace(xt, "")
                : null == e
                ? ""
                : e
              : void 0;
          },
        }),
        C.extend({
          valHooks: {
            option: {
              get: function (e) {
                var t = C.find.attr(e, "value");
                return null != t ? t : O(C.text(e));
              },
            },
            select: {
              get: function (e) {
                for (
                  var t,
                    n = e.options,
                    i = e.selectedIndex,
                    o = "select-one" === e.type,
                    r = o ? null : [],
                    s = o ? i + 1 : n.length,
                    a = i < 0 ? s : o ? i : 0;
                  a < s;
                  a++
                )
                  if (
                    ((t = n[a]).selected || a === i) &&
                    !t.disabled &&
                    (!t.parentNode.disabled || !l(t.parentNode, "optgroup"))
                  ) {
                    if (((t = C(t).val()), o)) return t;
                    r.push(t);
                  }
                return r;
              },
              set: function (e, t) {
                for (
                  var n, i, o = e.options, r = C.makeArray(t), s = o.length;
                  s--;

                )
                  ((i = o[s]).selected =
                    -1 < C.inArray(C.valHooks.option.get(i), r)) && (n = !0);
                return n || (e.selectedIndex = -1), r;
              },
            },
          },
        }),
        C.each(["radio", "checkbox"], function () {
          (C.valHooks[this] = {
            set: function (e, t) {
              if (Array.isArray(t))
                return (e.checked = -1 < C.inArray(C(e).val(), t));
            },
          }),
            g.checkOn ||
              (C.valHooks[this].get = function (e) {
                return null === e.getAttribute("value") ? "on" : e.value;
              });
        }),
        (g.focusin = "onfocusin" in w),
        /^(?:focusinfocus|focusoutblur)$/),
      St =
        (C.extend(C.event, {
          trigger: function (e, t, n, i) {
            var o,
              r,
              s,
              a,
              l,
              u,
              c,
              d = [n || x],
              p = z.call(e, "type") ? e.type : e,
              h = z.call(e, "namespace") ? e.namespace.split(".") : [],
              f = (c = r = n = n || x);
            if (
              3 !== n.nodeType &&
              8 !== n.nodeType &&
              !Ct.test(p + C.event.triggered) &&
              (-1 < p.indexOf(".") &&
                ((p = (h = p.split(".")).shift()), h.sort()),
              (a = p.indexOf(":") < 0 && "on" + p),
              ((e = e[C.expando]
                ? e
                : new C.Event(p, "object" == typeof e && e)).isTrigger = i
                ? 2
                : 3),
              (e.namespace = h.join(".")),
              (e.rnamespace = e.namespace
                ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")
                : null),
              (e.result = void 0),
              e.target || (e.target = n),
              (t = null == t ? [e] : C.makeArray(t, [e])),
              (u = C.event.special[p] || {}),
              i || !u.trigger || !1 !== u.trigger.apply(n, t))
            ) {
              if (!i && !u.noBubble && !m(n)) {
                for (
                  s = u.delegateType || p, Ct.test(s + p) || (f = f.parentNode);
                  f;
                  f = f.parentNode
                )
                  d.push(f), (r = f);
                r === (n.ownerDocument || x) &&
                  d.push(r.defaultView || r.parentWindow || w);
              }
              for (o = 0; (f = d[o++]) && !e.isPropagationStopped(); )
                (c = f),
                  (e.type = 1 < o ? s : u.bindType || p),
                  (l =
                    (v.get(f, "events") || {})[e.type] && v.get(f, "handle")) &&
                    l.apply(f, t),
                  (l = a && f[a]) &&
                    l.apply &&
                    he(f) &&
                    ((e.result = l.apply(f, t)),
                    !1 === e.result && e.preventDefault());
              return (
                (e.type = p),
                i ||
                  e.isDefaultPrevented() ||
                  (u._default && !1 !== u._default.apply(d.pop(), t)) ||
                  !he(n) ||
                  (a &&
                    y(n[p]) &&
                    !m(n) &&
                    ((r = n[a]) && (n[a] = null),
                    (C.event.triggered = p),
                    e.isPropagationStopped() && c.addEventListener(p, wt),
                    n[p](),
                    e.isPropagationStopped() && c.removeEventListener(p, wt),
                    (C.event.triggered = void 0),
                    r && (n[a] = r))),
                e.result
              );
            }
          },
          simulate: function (e, t, n) {
            n = C.extend(new C.Event(), n, { type: e, isSimulated: !0 });
            C.event.trigger(n, null, t);
          },
        }),
        C.fn.extend({
          trigger: function (e, t) {
            return this.each(function () {
              C.event.trigger(e, t, this);
            });
          },
          triggerHandler: function (e, t) {
            var n = this[0];
            if (n) return C.event.trigger(e, t, n, !0);
          },
        }),
        g.focusin ||
          C.each({ focus: "focusin", blur: "focusout" }, function (n, i) {
            function o(e) {
              C.event.simulate(i, e.target, C.event.fix(e));
            }
            C.event.special[i] = {
              setup: function () {
                var e = this.ownerDocument || this,
                  t = v.access(e, i);
                t || e.addEventListener(n, o, !0), v.access(e, i, (t || 0) + 1);
              },
              teardown: function () {
                var e = this.ownerDocument || this,
                  t = v.access(e, i) - 1;
                t
                  ? v.access(e, i, t)
                  : (e.removeEventListener(n, o, !0), v.remove(e, i));
              },
            };
          }),
        w.location),
      Tt = Date.now(),
      At = /\?/,
      Et =
        ((C.parseXML = function (e) {
          var t;
          if (!e || "string" != typeof e) return null;
          try {
            t = new w.DOMParser().parseFromString(e, "text/xml");
          } catch (e) {
            t = void 0;
          }
          return (
            (t && !t.getElementsByTagName("parsererror").length) ||
              C.error("Invalid XML: " + e),
            t
          );
        }),
        /\[\]$/),
      _t = /\r?\n/g,
      Dt = /^(?:submit|button|image|reset|file)$/i,
      $t = /^(?:input|select|textarea|keygen)/i;
    (C.param = function (e, t) {
      function n(e, t) {
        (t = y(t) ? t() : t),
          (o[o.length] =
            encodeURIComponent(e) +
            "=" +
            encodeURIComponent(null == t ? "" : t));
      }
      var i,
        o = [];
      if (Array.isArray(e) || (e.jquery && !C.isPlainObject(e)))
        C.each(e, function () {
          n(this.name, this.value);
        });
      else
        for (i in e)
          !(function n(i, e, o, r) {
            if (Array.isArray(e))
              C.each(e, function (e, t) {
                o || Et.test(i)
                  ? r(i, t)
                  : n(
                      i +
                        "[" +
                        ("object" == typeof t && null != t ? e : "") +
                        "]",
                      t,
                      o,
                      r
                    );
              });
            else if (o || "object" !== f(e)) r(i, e);
            else for (var t in e) n(i + "[" + t + "]", e[t], o, r);
          })(i, e[i], t, n);
      return o.join("&");
    }),
      C.fn.extend({
        serialize: function () {
          return C.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var e = C.prop(this, "elements");
            return e ? C.makeArray(e) : this;
          })
            .filter(function () {
              var e = this.type;
              return (
                this.name &&
                !C(this).is(":disabled") &&
                $t.test(this.nodeName) &&
                !Dt.test(e) &&
                (this.checked || !we.test(e))
              );
            })
            .map(function (e, t) {
              var n = C(this).val();
              return null == n
                ? null
                : Array.isArray(n)
                ? C.map(n, function (e) {
                    return { name: t.name, value: e.replace(_t, "\r\n") };
                  })
                : { name: t.name, value: n.replace(_t, "\r\n") };
            })
            .get();
        },
      });
    var Ft = /%20/g,
      jt = /#.*$/,
      Mt = /([?&])_=[^&]*/,
      Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Pt = /^(?:GET|HEAD)$/,
      It = /^\/\//,
      Lt = {},
      Bt = {},
      Nt = "*/".concat("*"),
      Rt = x.createElement("a");
    function Ht(r) {
      return function (e, t) {
        "string" != typeof e && ((t = e), (e = "*"));
        var n,
          i = 0,
          o = e.toLowerCase().match(S) || [];
        if (y(t))
          for (; (n = o[i++]); )
            "+" === n[0]
              ? ((n = n.slice(1) || "*"), (r[n] = r[n] || []).unshift(t))
              : (r[n] = r[n] || []).push(t);
      };
    }
    function qt(t, i, o, r) {
      var s = {},
        a = t === Bt;
      function l(e) {
        var n;
        return (
          (s[e] = !0),
          C.each(t[e] || [], function (e, t) {
            t = t(i, o, r);
            return "string" != typeof t || a || s[t]
              ? a
                ? !(n = t)
                : void 0
              : (i.dataTypes.unshift(t), l(t), !1);
          }),
          n
        );
      }
      return l(i.dataTypes[0]) || (!s["*"] && l("*"));
    }
    function zt(e, t) {
      var n,
        i,
        o = C.ajaxSettings.flatOptions || {};
      for (n in t) void 0 !== t[n] && ((o[n] ? e : (i = i || {}))[n] = t[n]);
      return i && C.extend(!0, e, i), e;
    }
    (Rt.href = St.href),
      C.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: St.href,
          type: "GET",
          isLocal:
            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
              St.protocol
            ),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": Nt,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": C.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (e, t) {
          return t ? zt(zt(e, C.ajaxSettings), t) : zt(C.ajaxSettings, e);
        },
        ajaxPrefilter: Ht(Lt),
        ajaxTransport: Ht(Bt),
        ajax: function (e, t) {
          "object" == typeof e && ((t = e), (e = void 0));
          var l,
            u,
            c,
            n,
            d,
            p,
            h,
            i,
            f = C.ajaxSetup({}, (t = t || {})),
            m = f.context || f,
            g = f.context && (m.nodeType || m.jquery) ? C(m) : C.event,
            v = C.Deferred(),
            y = C.Callbacks("once memory"),
            b = f.statusCode || {},
            o = {},
            r = {},
            s = "canceled",
            k = {
              readyState: 0,
              getResponseHeader: function (e) {
                var t;
                if (p) {
                  if (!n)
                    for (n = {}; (t = Ot.exec(c)); )
                      n[t[1].toLowerCase()] = t[2];
                  t = n[e.toLowerCase()];
                }
                return null == t ? null : t;
              },
              getAllResponseHeaders: function () {
                return p ? c : null;
              },
              setRequestHeader: function (e, t) {
                return (
                  null == p &&
                    ((e = r[e.toLowerCase()] = r[e.toLowerCase()] || e),
                    (o[e] = t)),
                  this
                );
              },
              overrideMimeType: function (e) {
                return null == p && (f.mimeType = e), this;
              },
              statusCode: function (e) {
                if (e)
                  if (p) k.always(e[k.status]);
                  else for (var t in e) b[t] = [b[t], e[t]];
                return this;
              },
              abort: function (e) {
                e = e || s;
                return l && l.abort(e), a(0, e), this;
              },
            };
          if (
            (v.promise(k),
            (f.url = ((e || f.url || St.href) + "").replace(
              It,
              St.protocol + "//"
            )),
            (f.type = t.method || t.type || f.method || f.type),
            (f.dataTypes = (f.dataType || "*").toLowerCase().match(S) || [""]),
            null == f.crossDomain)
          ) {
            e = x.createElement("a");
            try {
              (e.href = f.url),
                (e.href = e.href),
                (f.crossDomain =
                  Rt.protocol + "//" + Rt.host != e.protocol + "//" + e.host);
            } catch (e) {
              f.crossDomain = !0;
            }
          }
          if (
            (f.data &&
              f.processData &&
              "string" != typeof f.data &&
              (f.data = C.param(f.data, f.traditional)),
            qt(Lt, f, t, k),
            p)
          )
            return k;
          for (i in ((h = C.event && f.global) &&
            0 == C.active++ &&
            C.event.trigger("ajaxStart"),
          (f.type = f.type.toUpperCase()),
          (f.hasContent = !Pt.test(f.type)),
          (u = f.url.replace(jt, "")),
          f.hasContent
            ? f.data &&
              f.processData &&
              0 ===
                (f.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              (f.data = f.data.replace(Ft, "+"))
            : ((e = f.url.slice(u.length)),
              f.data &&
                (f.processData || "string" == typeof f.data) &&
                ((u += (At.test(u) ? "&" : "?") + f.data), delete f.data),
              !1 === f.cache &&
                ((u = u.replace(Mt, "$1")),
                (e = (At.test(u) ? "&" : "?") + "_=" + Tt++ + e)),
              (f.url = u + e)),
          f.ifModified &&
            (C.lastModified[u] &&
              k.setRequestHeader("If-Modified-Since", C.lastModified[u]),
            C.etag[u] && k.setRequestHeader("If-None-Match", C.etag[u])),
          ((f.data && f.hasContent && !1 !== f.contentType) || t.contentType) &&
            k.setRequestHeader("Content-Type", f.contentType),
          k.setRequestHeader(
            "Accept",
            f.dataTypes[0] && f.accepts[f.dataTypes[0]]
              ? f.accepts[f.dataTypes[0]] +
                  ("*" !== f.dataTypes[0] ? ", " + Nt + "; q=0.01" : "")
              : f.accepts["*"]
          ),
          f.headers))
            k.setRequestHeader(i, f.headers[i]);
          if (f.beforeSend && (!1 === f.beforeSend.call(m, k, f) || p))
            return k.abort();
          if (
            ((s = "abort"),
            y.add(f.complete),
            k.done(f.success),
            k.fail(f.error),
            (l = qt(Bt, f, t, k)))
          ) {
            if (((k.readyState = 1), h && g.trigger("ajaxSend", [k, f]), p))
              return k;
            f.async &&
              0 < f.timeout &&
              (d = w.setTimeout(function () {
                k.abort("timeout");
              }, f.timeout));
            try {
              (p = !1), l.send(o, a);
            } catch (e) {
              if (p) throw e;
              a(-1, e);
            }
          } else a(-1, "No Transport");
          function a(e, t, n, i) {
            var o,
              r,
              s,
              a = t;
            p ||
              ((p = !0),
              d && w.clearTimeout(d),
              (l = void 0),
              (c = i || ""),
              (k.readyState = 0 < e ? 4 : 0),
              (i = (200 <= e && e < 300) || 304 === e),
              n &&
                (s = (function (e, t, n) {
                  for (
                    var i, o, r, s, a = e.contents, l = e.dataTypes;
                    "*" === l[0];

                  )
                    l.shift(),
                      void 0 === i &&
                        (i = e.mimeType || t.getResponseHeader("Content-Type"));
                  if (i)
                    for (o in a)
                      if (a[o] && a[o].test(i)) {
                        l.unshift(o);
                        break;
                      }
                  if (l[0] in n) r = l[0];
                  else {
                    for (o in n) {
                      if (!l[0] || e.converters[o + " " + l[0]]) {
                        r = o;
                        break;
                      }
                      s = s || o;
                    }
                    r = r || s;
                  }
                  if (r) return r !== l[0] && l.unshift(r), n[r];
                })(f, k, n)),
              (s = (function (e, t, n, i) {
                var o,
                  r,
                  s,
                  a,
                  l,
                  u = {},
                  c = e.dataTypes.slice();
                if (c[1])
                  for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
                for (r = c.shift(); r; )
                  if (
                    (e.responseFields[r] && (n[e.responseFields[r]] = t),
                    !l &&
                      i &&
                      e.dataFilter &&
                      (t = e.dataFilter(t, e.dataType)),
                    (l = r),
                    (r = c.shift()))
                  )
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                      if (!(s = u[l + " " + r] || u["* " + r]))
                        for (o in u)
                          if (
                            (a = o.split(" "))[1] === r &&
                            (s = u[l + " " + a[0]] || u["* " + a[0]])
                          ) {
                            !0 === s
                              ? (s = u[o])
                              : !0 !== u[o] && ((r = a[0]), c.unshift(a[1]));
                            break;
                          }
                      if (!0 !== s)
                        if (s && e.throws) t = s(t);
                        else
                          try {
                            t = s(t);
                          } catch (e) {
                            return {
                              state: "parsererror",
                              error: s
                                ? e
                                : "No conversion from " + l + " to " + r,
                            };
                          }
                    }
                return { state: "success", data: t };
              })(f, s, k, i)),
              i
                ? (f.ifModified &&
                    ((n = k.getResponseHeader("Last-Modified")) &&
                      (C.lastModified[u] = n),
                    (n = k.getResponseHeader("etag")) && (C.etag[u] = n)),
                  204 === e || "HEAD" === f.type
                    ? (a = "nocontent")
                    : 304 === e
                    ? (a = "notmodified")
                    : ((a = s.state), (o = s.data), (i = !(r = s.error))))
                : ((r = a), (!e && a) || ((a = "error"), e < 0 && (e = 0))),
              (k.status = e),
              (k.statusText = (t || a) + ""),
              i ? v.resolveWith(m, [o, a, k]) : v.rejectWith(m, [k, a, r]),
              k.statusCode(b),
              (b = void 0),
              h &&
                g.trigger(i ? "ajaxSuccess" : "ajaxError", [k, f, i ? o : r]),
              y.fireWith(m, [k, a]),
              h &&
                (g.trigger("ajaxComplete", [k, f]),
                --C.active || C.event.trigger("ajaxStop")));
          }
          return k;
        },
        getJSON: function (e, t, n) {
          return C.get(e, t, n, "json");
        },
        getScript: function (e, t) {
          return C.get(e, void 0, t, "script");
        },
      }),
      C.each(["get", "post"], function (e, o) {
        C[o] = function (e, t, n, i) {
          return (
            y(t) && ((i = i || n), (n = t), (t = void 0)),
            C.ajax(
              C.extend(
                { url: e, type: o, dataType: i, data: t, success: n },
                C.isPlainObject(e) && e
              )
            )
          );
        };
      }),
      (C._evalUrl = function (e) {
        return C.ajax({
          url: e,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          throws: !0,
        });
      }),
      C.fn.extend({
        wrapAll: function (e) {
          return (
            this[0] &&
              (y(e) && (e = e.call(this[0])),
              (e = C(e, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && e.insertBefore(this[0]),
              e
                .map(function () {
                  for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                  return e;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (n) {
          return y(n)
            ? this.each(function (e) {
                C(this).wrapInner(n.call(this, e));
              })
            : this.each(function () {
                var e = C(this),
                  t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n);
              });
        },
        wrap: function (t) {
          var n = y(t);
          return this.each(function (e) {
            C(this).wrapAll(n ? t.call(this, e) : t);
          });
        },
        unwrap: function (e) {
          return (
            this.parent(e)
              .not("body")
              .each(function () {
                C(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (C.expr.pseudos.hidden = function (e) {
        return !C.expr.pseudos.visible(e);
      }),
      (C.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }),
      (C.ajaxSettings.xhr = function () {
        try {
          return new w.XMLHttpRequest();
        } catch (e) {}
      });
    var Wt = { 0: 200, 1223: 204 },
      Ut = C.ajaxSettings.xhr(),
      Vt =
        ((g.cors = !!Ut && "withCredentials" in Ut),
        (g.ajax = Ut = !!Ut),
        C.ajaxTransport(function (o) {
          var r, s;
          if (g.cors || (Ut && !o.crossDomain))
            return {
              send: function (e, t) {
                var n,
                  i = o.xhr();
                if (
                  (i.open(o.type, o.url, o.async, o.username, o.password),
                  o.xhrFields)
                )
                  for (n in o.xhrFields) i[n] = o.xhrFields[n];
                for (n in (o.mimeType &&
                  i.overrideMimeType &&
                  i.overrideMimeType(o.mimeType),
                o.crossDomain ||
                  e["X-Requested-With"] ||
                  (e["X-Requested-With"] = "XMLHttpRequest"),
                e))
                  i.setRequestHeader(n, e[n]);
                (r = function (e) {
                  return function () {
                    r &&
                      ((r =
                        s =
                        i.onload =
                        i.onerror =
                        i.onabort =
                        i.ontimeout =
                        i.onreadystatechange =
                          null),
                      "abort" === e
                        ? i.abort()
                        : "error" === e
                        ? "number" != typeof i.status
                          ? t(0, "error")
                          : t(i.status, i.statusText)
                        : t(
                            Wt[i.status] || i.status,
                            i.statusText,
                            "text" !== (i.responseType || "text") ||
                              "string" != typeof i.responseText
                              ? { binary: i.response }
                              : { text: i.responseText },
                            i.getAllResponseHeaders()
                          ));
                  };
                }),
                  (i.onload = r()),
                  (s = i.onerror = i.ontimeout = r("error")),
                  void 0 !== i.onabort
                    ? (i.onabort = s)
                    : (i.onreadystatechange = function () {
                        4 === i.readyState &&
                          w.setTimeout(function () {
                            r && s();
                          });
                      }),
                  (r = r("abort"));
                try {
                  i.send((o.hasContent && o.data) || null);
                } catch (e) {
                  if (r) throw e;
                }
              },
              abort: function () {
                r && r();
              },
            };
        }),
        C.ajaxPrefilter(function (e) {
          e.crossDomain && (e.contents.script = !1);
        }),
        C.ajaxSetup({
          accepts: {
            script:
              "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
          },
          contents: { script: /\b(?:java|ecma)script\b/ },
          converters: {
            "text script": function (e) {
              return C.globalEval(e), e;
            },
          },
        }),
        C.ajaxPrefilter("script", function (e) {
          void 0 === e.cache && (e.cache = !1),
            e.crossDomain && (e.type = "GET");
        }),
        C.ajaxTransport("script", function (n) {
          var i, o;
          if (n.crossDomain)
            return {
              send: function (e, t) {
                (i = C("<script>")
                  .prop({ charset: n.scriptCharset, src: n.url })
                  .on(
                    "load error",
                    (o = function (e) {
                      i.remove(),
                        (o = null),
                        e && t("error" === e.type ? 404 : 200, e.type);
                    })
                  )),
                  x.head.appendChild(i[0]);
              },
              abort: function () {
                o && o();
              },
            };
        }),
        []),
      Yt = /(=)\?(?=&|$)|\?\?/,
      Zt =
        (C.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function () {
            var e = Vt.pop() || C.expando + "_" + Tt++;
            return (this[e] = !0), e;
          },
        }),
        C.ajaxPrefilter("json jsonp", function (e, t, n) {
          var i,
            o,
            r,
            s =
              !1 !== e.jsonp &&
              (Yt.test(e.url)
                ? "url"
                : "string" == typeof e.data &&
                  0 ===
                    (e.contentType || "").indexOf(
                      "application/x-www-form-urlencoded"
                    ) &&
                  Yt.test(e.data) &&
                  "data");
          if (s || "jsonp" === e.dataTypes[0])
            return (
              (i = e.jsonpCallback =
                y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
              s
                ? (e[s] = e[s].replace(Yt, "$1" + i))
                : !1 !== e.jsonp &&
                  (e.url += (At.test(e.url) ? "&" : "?") + e.jsonp + "=" + i),
              (e.converters["script json"] = function () {
                return r || C.error(i + " was not called"), r[0];
              }),
              (e.dataTypes[0] = "json"),
              (o = w[i]),
              (w[i] = function () {
                r = arguments;
              }),
              n.always(function () {
                void 0 === o ? C(w).removeProp(i) : (w[i] = o),
                  e[i] && ((e.jsonpCallback = t.jsonpCallback), Vt.push(i)),
                  r && y(o) && o(r[0]),
                  (r = o = void 0);
              }),
              "script"
            );
        }),
        (g.createHTMLDocument =
          (((e = x.implementation.createHTMLDocument("").body).innerHTML =
            "<form></form><form></form>"),
          2 === e.childNodes.length)),
        (C.parseHTML = function (e, t, n) {
          return "string" != typeof e
            ? []
            : ("boolean" == typeof t && ((n = t), (t = !1)),
              t ||
                (g.createHTMLDocument
                  ? (((i = (t =
                      x.implementation.createHTMLDocument("")).createElement(
                      "base"
                    )).href = x.location.href),
                    t.head.appendChild(i))
                  : (t = x)),
              (i = !n && []),
              (n = J.exec(e))
                ? [t.createElement(n[1])]
                : ((n = Ae([e], t, i)),
                  i && i.length && C(i).remove(),
                  C.merge([], n.childNodes)));
          var i;
        }),
        (C.fn.load = function (e, t, n) {
          var i,
            o,
            r,
            s = this,
            a = e.indexOf(" ");
          return (
            -1 < a && ((i = O(e.slice(a))), (e = e.slice(0, a))),
            y(t)
              ? ((n = t), (t = void 0))
              : t && "object" == typeof t && (o = "POST"),
            0 < s.length &&
              C.ajax({ url: e, type: o || "GET", dataType: "html", data: t })
                .done(function (e) {
                  (r = arguments),
                    s.html(i ? C("<div>").append(C.parseHTML(e)).find(i) : e);
                })
                .always(
                  n &&
                    function (e, t) {
                      s.each(function () {
                        n.apply(this, r || [e.responseText, t, e]);
                      });
                    }
                ),
            this
          );
        }),
        C.each(
          [
            "ajaxStart",
            "ajaxStop",
            "ajaxComplete",
            "ajaxError",
            "ajaxSuccess",
            "ajaxSend",
          ],
          function (e, t) {
            C.fn[t] = function (e) {
              return this.on(t, e);
            };
          }
        ),
        (C.expr.pseudos.animated = function (t) {
          return C.grep(C.timers, function (e) {
            return t === e.elem;
          }).length;
        }),
        (C.offset = {
          setOffset: function (e, t, n) {
            var i,
              o,
              r,
              s,
              a = C.css(e, "position"),
              l = C(e),
              u = {};
            "static" === a && (e.style.position = "relative"),
              (r = l.offset()),
              (i = C.css(e, "top")),
              (s = C.css(e, "left")),
              (a =
                ("absolute" === a || "fixed" === a) &&
                -1 < (i + s).indexOf("auto")
                  ? ((o = (a = l.position()).top), a.left)
                  : ((o = parseFloat(i) || 0), parseFloat(s) || 0)),
              null != (t = y(t) ? t.call(e, n, C.extend({}, r)) : t).top &&
                (u.top = t.top - r.top + o),
              null != t.left && (u.left = t.left - r.left + a),
              "using" in t ? t.using.call(e, u) : l.css(u);
          },
        }),
        C.fn.extend({
          offset: function (t) {
            if (arguments.length)
              return void 0 === t
                ? this
                : this.each(function (e) {
                    C.offset.setOffset(this, t, e);
                  });
            var e,
              n = this[0];
            return n
              ? n.getClientRects().length
                ? ((e = n.getBoundingClientRect()),
                  (n = n.ownerDocument.defaultView),
                  { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
                : { top: 0, left: 0 }
              : void 0;
          },
          position: function () {
            if (this[0]) {
              var e,
                t,
                n,
                i = this[0],
                o = { top: 0, left: 0 };
              if ("fixed" === C.css(i, "position"))
                t = i.getBoundingClientRect();
              else {
                for (
                  t = this.offset(),
                    n = i.ownerDocument,
                    e = i.offsetParent || n.documentElement;
                  e &&
                  (e === n.body || e === n.documentElement) &&
                  "static" === C.css(e, "position");

                )
                  e = e.parentNode;
                e &&
                  e !== i &&
                  1 === e.nodeType &&
                  (((o = C(e).offset()).top += C.css(e, "borderTopWidth", !0)),
                  (o.left += C.css(e, "borderLeftWidth", !0)));
              }
              return {
                top: t.top - o.top - C.css(i, "marginTop", !0),
                left: t.left - o.left - C.css(i, "marginLeft", !0),
              };
            }
          },
          offsetParent: function () {
            return this.map(function () {
              for (
                var e = this.offsetParent;
                e && "static" === C.css(e, "position");

              )
                e = e.offsetParent;
              return e || Ee;
            });
          },
        }),
        C.each(
          { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
          function (t, o) {
            var r = "pageYOffset" === o;
            C.fn[t] = function (e) {
              return d(
                this,
                function (e, t, n) {
                  var i;
                  if (
                    (m(e) ? (i = e) : 9 === e.nodeType && (i = e.defaultView),
                    void 0 === n)
                  )
                    return i ? i[o] : e[t];
                  i
                    ? i.scrollTo(r ? i.pageXOffset : n, r ? n : i.pageYOffset)
                    : (e[t] = n);
                },
                t,
                e,
                arguments.length
              );
            };
          }
        ),
        C.each(["top", "left"], function (e, n) {
          C.cssHooks[n] = Qe(g.pixelPosition, function (e, t) {
            if (t)
              return (t = D(e, n)), Ke.test(t) ? C(e).position()[n] + "px" : t;
          });
        }),
        C.each({ Height: "height", Width: "width" }, function (s, a) {
          C.each(
            { padding: "inner" + s, content: a, "": "outer" + s },
            function (i, r) {
              C.fn[r] = function (e, t) {
                var n = arguments.length && (i || "boolean" != typeof e),
                  o = i || (!0 === e || !0 === t ? "margin" : "border");
                return d(
                  this,
                  function (e, t, n) {
                    var i;
                    return m(e)
                      ? 0 === r.indexOf("outer")
                        ? e["inner" + s]
                        : e.document.documentElement["client" + s]
                      : 9 === e.nodeType
                      ? ((i = e.documentElement),
                        Math.max(
                          e.body["scroll" + s],
                          i["scroll" + s],
                          e.body["offset" + s],
                          i["offset" + s],
                          i["client" + s]
                        ))
                      : void 0 === n
                      ? C.css(e, t, o)
                      : C.style(e, t, n, o);
                  },
                  a,
                  n ? e : void 0,
                  n
                );
              };
            }
          );
        }),
        C.each(
          "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
            " "
          ),
          function (e, n) {
            C.fn[n] = function (e, t) {
              return 0 < arguments.length
                ? this.on(n, null, e, t)
                : this.trigger(n);
            };
          }
        ),
        C.fn.extend({
          hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e);
          },
        }),
        C.fn.extend({
          bind: function (e, t, n) {
            return this.on(e, null, t, n);
          },
          unbind: function (e, t) {
            return this.off(e, null, t);
          },
          delegate: function (e, t, n, i) {
            return this.on(t, e, n, i);
          },
          undelegate: function (e, t, n) {
            return 1 === arguments.length
              ? this.off(e, "**")
              : this.off(t, e || "**", n);
          },
        }),
        (C.proxy = function (e, t) {
          var n, i;
          if (("string" == typeof t && ((i = e[t]), (t = e), (e = i)), y(e)))
            return (
              (n = a.call(arguments, 2)),
              ((i = function () {
                return e.apply(t || this, n.concat(a.call(arguments)));
              }).guid = e.guid =
                e.guid || C.guid++),
              i
            );
        }),
        (C.holdReady = function (e) {
          e ? C.readyWait++ : C.ready(!0);
        }),
        (C.isArray = Array.isArray),
        (C.parseJSON = JSON.parse),
        (C.nodeName = l),
        (C.isFunction = y),
        (C.isWindow = m),
        (C.camelCase = b),
        (C.type = f),
        (C.now = Date.now),
        (C.isNumeric = function (e) {
          var t = C.type(e);
          return (
            ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
          );
        }),
        "function" == typeof define &&
          define.amd &&
          define("jquery", [], function () {
            return C;
          }),
        w.jQuery),
      Xt = w.$;
    return (
      (C.noConflict = function (e) {
        return (
          w.$ === C && (w.$ = Xt), e && w.jQuery === C && (w.jQuery = Zt), C
        );
      }),
      I || (w.jQuery = w.$ = C),
      C
    );
  }),
  !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? t(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], t)
      : t(
          ((e =
            "undefined" != typeof globalThis ? globalThis : e || self).IMask =
            {})
        );
  })(this, function (e) {
    "use strict";
    function F(e) {
      return e && e.Math == Math && e;
    }
    function t(e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    }
    function j(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t,
      };
    }
    function M(e) {
      if (null == e) throw TypeError("Can't call method on " + e);
      return e;
    }
    function O(e) {
      return ie(oe(e));
    }
    function P(e) {
      return "object" == typeof e ? null !== e : "function" == typeof e;
    }
    function I(e, t) {
      if (!re(e)) return e;
      var n, i;
      if (t && "function" == typeof (n = e.toString) && !re((i = n.call(e))))
        return i;
      if ("function" == typeof (n = e.valueOf) && !re((i = n.call(e))))
        return i;
      if (t || "function" != typeof (n = e.toString) || re((i = n.call(e))))
        throw TypeError("Can't convert object to primitive value");
      return i;
    }
    function q(e) {
      return Object(se(e));
    }
    function z(e) {
      if (ke(e)) return e;
      throw TypeError(String(e) + " is not an object");
    }
    function W(t, n) {
      try {
        De(_e, t, n);
      } catch (e) {
        _e[t] = n;
      }
      return n;
    }
    var n,
      U,
      V,
      Y,
      Z,
      i,
      X,
      o,
      r =
        "undefined" != typeof globalThis
          ? globalThis
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : {},
      r =
        F("object" == typeof globalThis && globalThis) ||
        F("object" == typeof window && window) ||
        F("object" == typeof self && self) ||
        F("object" == typeof r && r) ||
        (function () {
          return this;
        })() ||
        Function("return this")(),
      K = {},
      s = !t(function () {
        return (
          7 !=
          Object.defineProperty({}, 1, {
            get: function () {
              return 7;
            },
          })[1]
        );
      }),
      G = {},
      J = {}.propertyIsEnumerable,
      Q = Object.getOwnPropertyDescriptor,
      a = Q && !J.call({ 1: 2 }, 1),
      ee =
        ((G.f = a
          ? function (e) {
              e = Q(this, e);
              return !!e && e.enumerable;
            }
          : J),
        {}.toString),
      a = t,
      te = function (e) {
        return ee.call(e).slice(8, -1);
      },
      ne = "".split,
      J = a(function () {
        return !Object("z").propertyIsEnumerable(0);
      })
        ? function (e) {
            return "String" == te(e) ? ne.call(e, "") : Object(e);
          }
        : Object,
      ie = J,
      oe = M,
      re = P,
      se = M,
      ae = q,
      le = {}.hasOwnProperty,
      a =
        Object.hasOwn ||
        function (e, t) {
          return le.call(ae(e), t);
        },
      l = P,
      ue = r.document,
      ce = l(ue) && l(ue.createElement),
      de = function (e) {
        return ce ? ue.createElement(e) : {};
      },
      l =
        !s &&
        !t(function () {
          return (
            7 !=
            Object.defineProperty(de("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        }),
      pe = G,
      he = j,
      fe = O,
      me = I,
      ge = a,
      ve = l,
      ye = Object.getOwnPropertyDescriptor,
      be =
        ((K.f = s
          ? ye
          : function (e, t) {
              if (((e = fe(e)), (t = me(t, !0)), ve))
                try {
                  return ye(e, t);
                } catch (e) {}
              if (ge(e, t)) return he(!pe.f.call(e, t), e[t]);
            }),
        {}),
      ke = P,
      we = l,
      xe = z,
      Ce = I,
      Se = Object.defineProperty,
      l =
        ((be.f = s
          ? Se
          : function (e, t, n) {
              if ((xe(e), (t = Ce(t, !0)), xe(n), we))
                try {
                  return Se(e, t, n);
                } catch (e) {}
              if ("get" in n || "set" in n)
                throw TypeError("Accessors not supported");
              return "value" in n && (e[t] = n.value), e;
            }),
        s),
      Te = be,
      Ae = j,
      l = l
        ? function (e, t, n) {
            return Te.f(e, t, Ae(1, n));
          }
        : function (e, t, n) {
            return (e[t] = n), e;
          },
      Ee = { exports: {} },
      _e = r,
      De = l,
      u = W,
      c = "__core-js_shared__",
      u = r[c] || u(c, {}),
      c = u,
      $e = Function.toString,
      c =
        ("function" != typeof c.inspectSource &&
          (c.inspectSource = function (e) {
            return $e.call(e);
          }),
        c.inspectSource),
      d = c,
      p = r.WeakMap,
      d = "function" == typeof p && /native code/.test(d(p)),
      p = { exports: {} },
      Fe = u,
      je =
        ((p.exports = function (e, t) {
          return Fe[e] || (Fe[e] = void 0 !== t ? t : {});
        })("versions", []).push({
          version: "3.15.2",
          mode: "global",
          copyright: "© 2021 Denis Pushkarev (zloirock.ru)",
        }),
        0),
      Me = Math.random(),
      p = p.exports,
      Oe = function (e) {
        return (
          "Symbol(" +
          String(void 0 === e ? "" : e) +
          ")_" +
          (++je + Me).toString(36)
        );
      },
      Pe = p("keys"),
      p = {},
      Ie = P,
      Le = l,
      Be = a,
      h = function (e) {
        return Pe[e] || (Pe[e] = Oe(e));
      },
      f = p,
      Ne = "Object already initialized",
      Re = r.WeakMap,
      d =
        ((X =
          d || u.state
            ? ((n = u.state || (u.state = new Re())),
              (U = n.get),
              (V = n.has),
              (Y = n.set),
              (Z = function (e, t) {
                if (V.call(n, e)) throw new TypeError(Ne);
                return (t.facade = e), Y.call(n, e, t), t;
              }),
              (i = function (e) {
                return U.call(n, e) || {};
              }),
              function (e) {
                return V.call(n, e);
              })
            : ((f[(o = h("state"))] = !0),
              (Z = function (e, t) {
                if (Be(e, o)) throw new TypeError(Ne);
                return (t.facade = e), Le(e, o, t), t;
              }),
              (i = function (e) {
                return Be(e, o) ? e[o] : {};
              }),
              function (e) {
                return Be(e, o);
              })),
        {
          set: Z,
          get: i,
          has: X,
          enforce: function (e) {
            return X(e) ? i(e) : Z(e, {});
          },
          getterFor: function (t) {
            return function (e) {
              if (Ie(e) && (e = i(e)).type === t) return e;
              throw TypeError("Incompatible receiver, " + t + " required");
            };
          },
        }),
      He = r,
      qe = l,
      ze = a,
      We = W,
      Ue = c,
      Ve = d.get,
      Ye = d.enforce,
      Ze = String(String).split("String");
    (Ee.exports = function (e, t, n, i) {
      var o,
        r = !!i && !!i.unsafe,
        s = !!i && !!i.enumerable,
        i = !!i && !!i.noTargetGet;
      "function" == typeof n &&
        ("string" != typeof t || ze(n, "name") || qe(n, "name", t),
        (o = Ye(n)).source ||
          (o.source = Ze.join("string" == typeof t ? t : ""))),
        e === He
          ? s
            ? (e[t] = n)
            : We(t, n)
          : (r ? !i && e[t] && (s = !0) : delete e[t],
            s ? (e[t] = n) : qe(e, t, n));
    })(Function.prototype, "toString", function () {
      return ("function" == typeof this && Ve(this).source) || Ue(this);
    });
    function Xe(e) {
      return "function" == typeof e ? e : void 0;
    }
    function Ke(e, t) {
      return arguments.length < 2
        ? Xe(rt[e]) || Xe(st[e])
        : (rt[e] && rt[e][t]) || (st[e] && st[e][t]);
    }
    function Ge(e) {
      return isNaN((e = +e)) ? 0 : (0 < e ? lt : at)(e);
    }
    function Je(e) {
      return 0 < e ? ct(ut(e), 9007199254740991) : 0;
    }
    function Qe(a) {
      return function (e, t, n) {
        var i,
          o = ft(e),
          r = mt(o.length),
          s = gt(n, r);
        if (a && t != t) {
          for (; s < r; ) if ((i = o[s++]) != i) return !0;
        } else for (; s < r; s++) if ((a || s in o) && o[s] === t) return a || s || 0;
        return !a && -1;
      };
    }
    function et(e, t) {
      var n,
        i = yt(e),
        o = 0,
        r = [];
      for (n in i) !vt(kt, n) && vt(i, n) && r.push(n);
      for (; t.length > o; ) !vt(i, (n = t[o++])) || ~bt(r, n) || r.push(n);
      return r;
    }
    function tt(e, t) {
      return (
        (e = Mt[jt(e)]) == Pt ||
        (e != Ot && ("function" == typeof t ? $t(t) : !!t))
      );
    }
    function nt(e, t) {
      var n,
        i,
        o,
        r = e.target,
        s = e.global,
        a = e.stat,
        l = s ? It : a ? It[r] || Rt(r, {}) : (It[r] || {}).prototype;
      if (l)
        for (n in t) {
          if (
            ((i = t[n]),
            (o = e.noTargetGet ? (o = Lt(l, n)) && o.value : l[n]),
            !qt(s ? n : r + (a ? "." : "#") + n, e.forced) && void 0 !== o)
          ) {
            if (typeof i == typeof o) continue;
            Ht(i, o);
          }
          (e.sham || (o && o.sham)) && Bt(i, "sham", !0), Nt(l, n, i, e);
        }
    }
    function it(e) {
      var t = String(Qt(this)),
        n = "",
        i = Jt(e);
      if (i < 0 || i == 1 / 0) throw RangeError("Wrong number of repetitions");
      for (; 0 < i; (i >>>= 1) && (t += t)) 1 & i && (n += t);
      return n;
    }
    function ot(o) {
      return function (e, t, n) {
        var e = String(nn(e)),
          i = e.length,
          n = void 0 === n ? " " : String(n),
          t = en(t);
        return t <= i || "" == n
          ? e
          : ((i = tn.call(n, on((t = t - i) / n.length))).length > t &&
              (i = i.slice(0, t)),
            o ? e + i : i + e);
      };
    }
    var rt = r,
      st = r,
      u = {},
      at = Math.ceil,
      lt = Math.floor,
      ut = Ge,
      ct = Math.min,
      dt = Ge,
      pt = Math.max,
      ht = Math.min,
      ft = O,
      mt = Je,
      gt = function (e, t) {
        e = dt(e);
        return e < 0 ? pt(e + t, 0) : ht(e, t);
      },
      Re = { includes: Qe(!0), indexOf: Qe(!1) },
      vt = a,
      yt = O,
      bt = Re.indexOf,
      kt = p,
      f = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ],
      wt = et,
      xt = f.concat("length", "prototype"),
      h =
        ((u.f =
          Object.getOwnPropertyNames ||
          function (e) {
            return wt(e, xt);
          }),
        {}),
      c = ((h.f = Object.getOwnPropertySymbols), Ke),
      Ct = u,
      St = h,
      Tt = z,
      d =
        c("Reflect", "ownKeys") ||
        function (e) {
          var t = Ct.f(Tt(e)),
            n = St.f;
          return n ? t.concat(n(e)) : t;
        },
      At = a,
      Et = d,
      _t = K,
      Dt = be,
      $t = t,
      Ft = /#|\.prototype\./,
      jt = (tt.normalize = function (e) {
        return String(e).replace(Ft, ".").toLowerCase();
      }),
      Mt = (tt.data = {}),
      Ot = (tt.NATIVE = "N"),
      Pt = (tt.POLYFILL = "P"),
      It = r,
      Lt = K.f,
      Bt = l,
      Nt = Ee.exports,
      Rt = W,
      Ht = function (e, t) {
        for (var n = Et(t), i = Dt.f, o = _t.f, r = 0; r < n.length; r++) {
          var s = n[r];
          At(e, s) || i(e, s, o(t, s));
        }
      },
      qt = tt,
      zt = et,
      Wt = f,
      Re =
        Object.keys ||
        function (e) {
          return zt(e, Wt);
        },
      Ut = s,
      p = t,
      Vt = Re,
      Yt = h,
      Zt = G,
      Xt = q,
      Kt = J,
      m = Object.assign,
      Gt = Object.defineProperty,
      u =
        !m ||
        p(function () {
          if (
            Ut &&
            1 !==
              m(
                { b: 1 },
                m(
                  Gt({}, "a", {
                    enumerable: !0,
                    get: function () {
                      Gt(this, "b", { value: 3, enumerable: !1 });
                    },
                  }),
                  { b: 2 }
                )
              ).b
          )
            return !0;
          var e = {},
            t = {},
            n = Symbol(),
            i = "abcdefghijklmnopqrst";
          return (
            (e[n] = 7),
            i.split("").forEach(function (e) {
              t[e] = e;
            }),
            7 != m({}, e)[n] || Vt(m({}, t)).join("") != i
          );
        })
          ? function (e, t) {
              for (
                var n = Xt(e), i = arguments.length, o = 1, r = Yt.f, s = Zt.f;
                o < i;

              )
                for (
                  var a,
                    l = Kt(arguments[o++]),
                    u = r ? Vt(l).concat(r(l)) : Vt(l),
                    c = u.length,
                    d = 0;
                  d < c;

                )
                  (a = u[d++]), (Ut && !s.call(l, a)) || (n[a] = l[a]);
              return n;
            }
          : m,
      Jt =
        (nt(
          { target: "Object", stat: !0, forced: Object.assign !== u },
          { assign: u }
        ),
        Ge),
      Qt = M,
      en = (nt({ target: "String", proto: !0 }, { repeat: it }), Je),
      tn = it,
      nn = M,
      on = Math.ceil,
      c = { start: ot(!1), end: ot(!0) },
      a = Ke("navigator", "userAgent") || "",
      d =
        /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(
          a
        ),
      be = nt,
      rn = c.start,
      K =
        (be(
          { target: "String", proto: !0, forced: d },
          {
            padStart: function (e) {
              return rn(this, e, 1 < arguments.length ? arguments[1] : void 0);
            },
          }
        ),
        nt),
      sn = c.end;
    function an(e) {
      return (an =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function g(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function ln(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    function v(e, t, n) {
      t && ln(e.prototype, t), n && ln(e, n);
    }
    function y(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        t && un(e, t);
    }
    function b(e) {
      return (b = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function un(e, t) {
      return (un =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function cn(e, t) {
      if (null == e) return {};
      var n,
        i = (function (e, t) {
          if (null == e) return {};
          for (var n, i = {}, o = Object.keys(e), r = 0; r < o.length; r++)
            (n = o[r]), 0 <= t.indexOf(n) || (i[n] = e[n]);
          return i;
        })(e, t);
      if (Object.getOwnPropertySymbols)
        for (var o = Object.getOwnPropertySymbols(e), r = 0; r < o.length; r++)
          (n = o[r]),
            0 <= t.indexOf(n) ||
              (Object.prototype.propertyIsEnumerable.call(e, n) &&
                (i[n] = e[n]));
      return i;
    }
    function dn(e, t) {
      if (!t || ("object" != typeof t && "function" != typeof t)) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      return t;
    }
    function k(n) {
      var i = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var e,
          t = b(n);
        return dn(
          this,
          i
            ? ((e = b(this).constructor), Reflect.construct(t, arguments, e))
            : t.apply(this, arguments)
        );
      };
    }
    function pn(e, t) {
      for (
        ;
        !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = b(e));

      );
      return e;
    }
    function w(e, t, n) {
      return (w =
        "undefined" != typeof Reflect && Reflect.get
          ? Reflect.get
          : function (e, t, n) {
              var e = pn(e, t);
              if (e)
                return (
                  (e = Object.getOwnPropertyDescriptor(e, t)),
                  e.get ? e.get.call(n) : e.value
                );
            })(e, t, n || e);
    }
    function hn(e, t, n, i) {
      return (hn =
        "undefined" != typeof Reflect && Reflect.set
          ? Reflect.set
          : function (e, t, n, i) {
              var o,
                e = pn(e, t);
              if (e) {
                if ((o = Object.getOwnPropertyDescriptor(e, t)).set)
                  return o.set.call(i, n), !0;
                if (!o.writable) return !1;
              }
              if ((o = Object.getOwnPropertyDescriptor(i, t))) {
                if (!o.writable) return !1;
                (o.value = n), Object.defineProperty(i, t, o);
              } else
                (e = n),
                  (o = t) in (n = i)
                    ? Object.defineProperty(n, o, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (n[o] = e);
              return !0;
            })(e, t, n, i);
    }
    function x(e, t, n, i, o) {
      if (!hn(e, t, n, i || e) && o) throw new Error("failed to set property");
    }
    function C(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var n =
            null == e
              ? null
              : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null != n) {
            var i,
              o,
              r = [],
              s = !0,
              a = !1;
            try {
              for (
                n = n.call(e);
                !(s = (i = n.next()).done) &&
                (r.push(i.value), !t || r.length !== t);
                s = !0
              );
            } catch (e) {
              (a = !0), (o = e);
            } finally {
              try {
                s || null == n.return || n.return();
              } finally {
                if (a) throw o;
              }
            }
            return r;
          }
        })(e, t) ||
        (function (e, t) {
          if (e) {
            if ("string" == typeof e) return fn(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" ===
              (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
              "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? fn(e, t)
              : void 0;
          }
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function fn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function S(e) {
      return "string" == typeof e || e instanceof String;
    }
    K(
      { target: "String", proto: !0, forced: d },
      {
        padEnd: function (e) {
          return sn(this, e, 1 < arguments.length ? arguments[1] : void 0);
        },
      }
    ),
      nt({ global: !0 }, { globalThis: r });
    var L = "NONE",
      B = "LEFT",
      N = "FORCE_LEFT",
      R = "RIGHT",
      H = "FORCE_RIGHT";
    function mn(e) {
      return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
    }
    var gn = (function () {
        function o(e, t, n, i) {
          for (
            g(this, o),
              this.value = e,
              this.cursorPos = t,
              this.oldValue = n,
              this.oldSelection = i;
            this.value.slice(0, this.startChangePos) !==
            this.oldValue.slice(0, this.startChangePos);

          )
            --this.oldSelection.start;
        }
        return (
          v(o, [
            {
              key: "startChangePos",
              get: function () {
                return Math.min(this.cursorPos, this.oldSelection.start);
              },
            },
            {
              key: "insertedCount",
              get: function () {
                return this.cursorPos - this.startChangePos;
              },
            },
            {
              key: "inserted",
              get: function () {
                return this.value.substr(
                  this.startChangePos,
                  this.insertedCount
                );
              },
            },
            {
              key: "removedCount",
              get: function () {
                return Math.max(
                  this.oldSelection.end - this.startChangePos ||
                    this.oldValue.length - this.value.length,
                  0
                );
              },
            },
            {
              key: "removed",
              get: function () {
                return this.oldValue.substr(
                  this.startChangePos,
                  this.removedCount
                );
              },
            },
            {
              key: "head",
              get: function () {
                return this.value.substring(0, this.startChangePos);
              },
            },
            {
              key: "tail",
              get: function () {
                return this.value.substring(
                  this.startChangePos + this.insertedCount
                );
              },
            },
            {
              key: "removeDirection",
              get: function () {
                return !this.removedCount || this.insertedCount
                  ? L
                  : this.oldSelection.end === this.cursorPos ||
                    this.oldSelection.start === this.cursorPos
                  ? R
                  : B;
              },
            },
          ]),
          o
        );
      })(),
      T = (function () {
        function t(e) {
          g(this, t),
            Object.assign(
              this,
              { inserted: "", rawInserted: "", skip: !1, tailShift: 0 },
              e
            );
        }
        return (
          v(t, [
            {
              key: "aggregate",
              value: function (e) {
                return (
                  (this.rawInserted += e.rawInserted),
                  (this.skip = this.skip || e.skip),
                  (this.inserted += e.inserted),
                  (this.tailShift += e.tailShift),
                  this
                );
              },
            },
            {
              key: "offset",
              get: function () {
                return this.tailShift + this.inserted.length;
              },
            },
          ]),
          t
        );
      })(),
      A = (function () {
        function i() {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : "",
            t =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            n = 2 < arguments.length ? arguments[2] : void 0;
          g(this, i), (this.value = e), (this.from = t), (this.stop = n);
        }
        return (
          v(i, [
            {
              key: "toString",
              value: function () {
                return this.value;
              },
            },
            {
              key: "extend",
              value: function (e) {
                this.value += String(e);
              },
            },
            {
              key: "appendTo",
              value: function (e) {
                return e
                  .append(this.toString(), { tail: !0 })
                  .aggregate(e._appendPlaceholder());
              },
            },
            {
              key: "state",
              get: function () {
                return { value: this.value, from: this.from, stop: this.stop };
              },
              set: function (e) {
                Object.assign(this, e);
              },
            },
            {
              key: "shiftBefore",
              value: function (e) {
                if (this.from >= e || !this.value.length) return "";
                e = this.value[0];
                return (this.value = this.value.slice(1)), e;
              },
            },
          ]),
          i
        );
      })();
    function E(e) {
      return new E.InputMask(
        e,
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
      );
    }
    var _ = (function () {
      function t(e) {
        g(this, t),
          (this._value = ""),
          this._update(Object.assign({}, t.DEFAULTS, e)),
          (this.isInitialized = !0);
      }
      return (
        v(t, [
          {
            key: "updateOptions",
            value: function (e) {
              Object.keys(e).length &&
                this.withValueRefresh(this._update.bind(this, e));
            },
          },
          {
            key: "_update",
            value: function (e) {
              Object.assign(this, e);
            },
          },
          {
            key: "state",
            get: function () {
              return { _value: this.value };
            },
            set: function (e) {
              this._value = e._value;
            },
          },
          {
            key: "reset",
            value: function () {
              this._value = "";
            },
          },
          {
            key: "value",
            get: function () {
              return this._value;
            },
            set: function (e) {
              this.resolve(e);
            },
          },
          {
            key: "resolve",
            value: function (e) {
              return (
                this.reset(),
                this.append(e, { input: !0 }, ""),
                this.doCommit(),
                this.value
              );
            },
          },
          {
            key: "unmaskedValue",
            get: function () {
              return this.value;
            },
            set: function (e) {
              this.reset(), this.append(e, {}, ""), this.doCommit();
            },
          },
          {
            key: "typedValue",
            get: function () {
              return this.doParse(this.value);
            },
            set: function (e) {
              this.value = this.doFormat(e);
            },
          },
          {
            key: "rawInputValue",
            get: function () {
              return this.extractInput(0, this.value.length, { raw: !0 });
            },
            set: function (e) {
              this.reset(), this.append(e, { raw: !0 }, ""), this.doCommit();
            },
          },
          {
            key: "isComplete",
            get: function () {
              return !0;
            },
          },
          {
            key: "nearestInputPos",
            value: function (e, t) {
              return e;
            },
          },
          {
            key: "extractInput",
            value: function () {
              var e =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.value.length;
              return this.value.slice(e, t);
            },
          },
          {
            key: "extractTail",
            value: function () {
              var e =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.value.length;
              return new A(this.extractInput(e, t), e);
            },
          },
          {
            key: "appendTail",
            value: function (e) {
              return (e = S(e) ? new A(String(e)) : e).appendTo(this);
            },
          },
          {
            key: "_appendCharRaw",
            value: function (e) {
              return e
                ? ((this._value += e), new T({ inserted: e, rawInserted: e }))
                : new T();
            },
          },
          {
            key: "_appendChar",
            value: function (e) {
              var t,
                n,
                i,
                o =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                r = 2 < arguments.length ? arguments[2] : void 0,
                s = this.state,
                e = this._appendCharRaw(this.doPrepare(e, o), o);
              return (
                e.inserted &&
                  ((o = !1 !== this.doValidate(o)) &&
                    null != r &&
                    ((n = this.state),
                    this.overwrite &&
                      ((t = r.state), r.shiftBefore(this.value.length)),
                    (o =
                      (i = this.appendTail(r)).rawInserted === r.toString()) &&
                      i.inserted &&
                      (this.state = n)),
                  o ||
                    ((e = new T()), (this.state = s), r && t && (r.state = t))),
                e
              );
            },
          },
          {
            key: "_appendPlaceholder",
            value: function () {
              return new T();
            },
          },
          {
            key: "append",
            value: function (e, t, n) {
              if (!S(e)) throw new Error("value should be string");
              var i = new T(),
                o = S(n) ? new A(String(n)) : n;
              t && t.tail && (t._beforeTailState = this.state);
              for (var r = 0; r < e.length; ++r)
                i.aggregate(this._appendChar(e[r], t, o));
              return (
                null != o && (i.tailShift += this.appendTail(o).tailShift), i
              );
            },
          },
          {
            key: "remove",
            value: function () {
              var e =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.value.length;
              return (
                (this._value = this.value.slice(0, e) + this.value.slice(t)),
                new T()
              );
            },
          },
          {
            key: "withValueRefresh",
            value: function (e) {
              if (this._refreshing || !this.isInitialized) return e();
              this._refreshing = !0;
              var t = this.rawInputValue,
                n = this.value,
                e = e();
              return (
                (this.rawInputValue = t),
                this.value &&
                  this.value !== n &&
                  0 === n.indexOf(this.value) &&
                  this.append(n.slice(this.value.length), {}, ""),
                delete this._refreshing,
                e
              );
            },
          },
          {
            key: "runIsolated",
            value: function (e) {
              if (this._isolated || !this.isInitialized) return e(this);
              this._isolated = !0;
              var t = this.state,
                e = e(this);
              return (this.state = t), delete this._isolated, e;
            },
          },
          {
            key: "doPrepare",
            value: function (e) {
              return this.prepare
                ? this.prepare(
                    e,
                    this,
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {}
                  )
                : e;
            },
          },
          {
            key: "doValidate",
            value: function (e) {
              return (
                (!this.validate || this.validate(this.value, this, e)) &&
                (!this.parent || this.parent.doValidate(e))
              );
            },
          },
          {
            key: "doCommit",
            value: function () {
              this.commit && this.commit(this.value, this);
            },
          },
          {
            key: "doFormat",
            value: function (e) {
              return this.format ? this.format(e, this) : e;
            },
          },
          {
            key: "doParse",
            value: function (e) {
              return this.parse ? this.parse(e, this) : e;
            },
          },
          {
            key: "splice",
            value: function (e, t, n, i) {
              (t = this.extractTail(e + t)), (i = this.nearestInputPos(e, i));
              return new T({ tailShift: i - e })
                .aggregate(this.remove(i))
                .aggregate(this.append(n, { input: !0 }, t));
            },
          },
        ]),
        t
      );
    })();
    function vn(e) {
      if (null == e) throw new Error("mask property should be defined");
      return e instanceof RegExp
        ? E.MaskedRegExp
        : S(e)
        ? E.MaskedPattern
        : e instanceof Date || e === Date
        ? E.MaskedDate
        : e instanceof Number || "number" == typeof e || e === Number
        ? E.MaskedNumber
        : Array.isArray(e) || e === Array
        ? E.MaskedDynamic
        : E.Masked && e.prototype instanceof E.Masked
        ? e
        : e instanceof Function
        ? E.MaskedFunction
        : e instanceof E.Masked
        ? e.constructor
        : (console.warn("Mask not found for mask", e), E.Masked);
    }
    function D(e) {
      if (E.Masked && e instanceof E.Masked) return e;
      var t = (e = Object.assign({}, e)).mask;
      if (E.Masked && t instanceof E.Masked) return t;
      t = vn(t);
      if (t) return new t(e);
      throw new Error(
        "Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask."
      );
    }
    (_.DEFAULTS = {
      format: function (e) {
        return e;
      },
      parse: function (e) {
        return e;
      },
    }),
      (E.Masked = _),
      (E.createMask = D);
    var yn = ["mask"],
      bn = {
        0: /\d/,
        a: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        "*": /./,
      },
      kn = (function () {
        function n(e) {
          g(this, n);
          var t = e.mask,
            e = cn(e, yn);
          (this.masked = D({ mask: t })), Object.assign(this, e);
        }
        return (
          v(n, [
            {
              key: "reset",
              value: function () {
                (this._isFilled = !1), this.masked.reset();
              },
            },
            {
              key: "remove",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length;
                return 0 === e && 1 <= t
                  ? ((this._isFilled = !1), this.masked.remove(e, t))
                  : new T();
              },
            },
            {
              key: "value",
              get: function () {
                return (
                  this.masked.value ||
                  (this._isFilled && !this.isOptional
                    ? this.placeholderChar
                    : "")
                );
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this.masked.unmaskedValue;
              },
            },
            {
              key: "isComplete",
              get: function () {
                return Boolean(this.masked.value) || this.isOptional;
              },
            },
            {
              key: "_appendChar",
              value: function (e) {
                var t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                if (this._isFilled) return new T();
                var n = this.masked.state,
                  e = this.masked._appendChar(e, t);
                return (
                  e.inserted &&
                    !1 === this.doValidate(t) &&
                    ((e.inserted = e.rawInserted = ""),
                    (this.masked.state = n)),
                  e.inserted ||
                    this.isOptional ||
                    this.lazy ||
                    t.input ||
                    (e.inserted = this.placeholderChar),
                  (e.skip = !e.inserted && !this.isOptional),
                  (this._isFilled = Boolean(e.inserted)),
                  e
                );
              },
            },
            {
              key: "append",
              value: function () {
                var e;
                return (e = this.masked).append.apply(e, arguments);
              },
            },
            {
              key: "_appendPlaceholder",
              value: function () {
                var e = new T();
                return (
                  this._isFilled ||
                    this.isOptional ||
                    ((this._isFilled = !0),
                    (e.inserted = this.placeholderChar)),
                  e
                );
              },
            },
            {
              key: "extractTail",
              value: function () {
                var e;
                return (e = this.masked).extractTail.apply(e, arguments);
              },
            },
            {
              key: "appendTail",
              value: function () {
                var e;
                return (e = this.masked).appendTail.apply(e, arguments);
              },
            },
            {
              key: "extractInput",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length;
                return this.masked.extractInput(
                  e,
                  t,
                  2 < arguments.length ? arguments[2] : void 0
                );
              },
            },
            {
              key: "nearestInputPos",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : L,
                  n = this.value.length,
                  i = Math.min(Math.max(e, 0), n);
                switch (t) {
                  case B:
                  case N:
                    return this.isComplete ? i : 0;
                  case R:
                  case H:
                    return this.isComplete ? i : n;
                  default:
                    return i;
                }
              },
            },
            {
              key: "doValidate",
              value: function () {
                var e;
                return (
                  (e = this.masked).doValidate.apply(e, arguments) &&
                  (!this.parent ||
                    (e = this.parent).doValidate.apply(e, arguments))
                );
              },
            },
            {
              key: "doCommit",
              value: function () {
                this.masked.doCommit();
              },
            },
            {
              key: "state",
              get: function () {
                return { masked: this.masked.state, _isFilled: this._isFilled };
              },
              set: function (e) {
                (this.masked.state = e.masked), (this._isFilled = e._isFilled);
              },
            },
          ]),
          n
        );
      })(),
      wn = (function () {
        function t(e) {
          g(this, t), Object.assign(this, e), (this._value = "");
        }
        return (
          v(t, [
            {
              key: "value",
              get: function () {
                return this._value;
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this.isUnmasking ? this.value : "";
              },
            },
            {
              key: "reset",
              value: function () {
                (this._isRawInput = !1), (this._value = "");
              },
            },
            {
              key: "remove",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this._value.length;
                return (
                  (this._value =
                    this._value.slice(0, e) + this._value.slice(t)),
                  this._value || (this._isRawInput = !1),
                  new T()
                );
              },
            },
            {
              key: "nearestInputPos",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : L,
                  n = this._value.length;
                switch (t) {
                  case B:
                  case N:
                    return 0;
                  default:
                    return n;
                }
              },
            },
            {
              key: "extractInput",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this._value.length;
                return (
                  ((2 < arguments.length && void 0 !== arguments[2]
                    ? arguments[2]
                    : {}
                  ).raw &&
                    this._isRawInput &&
                    this._value.slice(e, t)) ||
                  ""
                );
              },
            },
            {
              key: "isComplete",
              get: function () {
                return !0;
              },
            },
            {
              key: "_appendChar",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = new T();
                if (this._value) return n;
                e =
                  this.char === e[0] &&
                  (this.isUnmasking || t.input || t.raw) &&
                  !t.tail;
                return (
                  e && (n.rawInserted = this.char),
                  (this._value = n.inserted = this.char),
                  (this._isRawInput = e && (t.raw || t.input)),
                  n
                );
              },
            },
            {
              key: "_appendPlaceholder",
              value: function () {
                var e = new T();
                return this._value || (this._value = e.inserted = this.char), e;
              },
            },
            {
              key: "extractTail",
              value: function () {
                return (
                  (1 < arguments.length && void 0 !== arguments[1]) ||
                    this.value.length,
                  new A("")
                );
              },
            },
            {
              key: "appendTail",
              value: function (e) {
                return (e = S(e) ? new A(String(e)) : e).appendTo(this);
              },
            },
            {
              key: "append",
              value: function (e, t, n) {
                e = this._appendChar(e, t);
                return (
                  null != n && (e.tailShift += this.appendTail(n).tailShift), e
                );
              },
            },
            { key: "doCommit", value: function () {} },
            {
              key: "state",
              get: function () {
                return { _value: this._value, _isRawInput: this._isRawInput };
              },
              set: function (e) {
                Object.assign(this, e);
              },
            },
          ]),
          t
        );
      })(),
      xn = ["chunks"],
      Cn = (function () {
        function a() {
          var e =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            t =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : 0;
          g(this, a), (this.chunks = e), (this.from = t);
        }
        return (
          v(a, [
            {
              key: "toString",
              value: function () {
                return this.chunks.map(String).join("");
              },
            },
            {
              key: "extend",
              value: function (e) {
                if (String(e)) {
                  S(e) && (e = new A(String(e)));
                  var t,
                    n = this.chunks[this.chunks.length - 1],
                    i =
                      n &&
                      (n.stop === e.stop || null == e.stop) &&
                      e.from === n.from + n.toString().length;
                  if (e instanceof A)
                    i ? n.extend(e.toString()) : this.chunks.push(e);
                  else if (e instanceof a) {
                    if (null == e.stop)
                      for (; e.chunks.length && null == e.chunks[0].stop; )
                        ((t = e.chunks.shift()).from += e.from), this.extend(t);
                    e.toString() &&
                      ((e.stop = e.blockIndex), this.chunks.push(e));
                  }
                }
              },
            },
            {
              key: "appendTo",
              value: function (e) {
                if (!(e instanceof E.MaskedPattern))
                  return new A(this.toString()).appendTo(e);
                for (
                  var t = new T(), n = 0;
                  n < this.chunks.length && !t.skip;
                  ++n
                ) {
                  var i = this.chunks[n],
                    o = e._mapPosToBlock(e.value.length),
                    r = i.stop,
                    s = void 0;
                  null != r &&
                    (!o || o.index <= r) &&
                    ((i instanceof a || 0 <= e._stops.indexOf(r)) &&
                      t.aggregate(e._appendPlaceholder(r)),
                    (s = i instanceof a && e._blocks[r])),
                    s
                      ? (((o = s.appendTail(i)).skip = !1),
                        t.aggregate(o),
                        (e._value += o.inserted),
                        (r = i.toString().slice(o.rawInserted.length)) &&
                          t.aggregate(e.append(r, { tail: !0 })))
                      : t.aggregate(e.append(i.toString(), { tail: !0 }));
                }
                return t;
              },
            },
            {
              key: "state",
              get: function () {
                return {
                  chunks: this.chunks.map(function (e) {
                    return e.state;
                  }),
                  from: this.from,
                  stop: this.stop,
                  blockIndex: this.blockIndex,
                };
              },
              set: function (e) {
                var t = e.chunks,
                  e = cn(e, xn);
                Object.assign(this, e),
                  (this.chunks = t.map(function (e) {
                    var t = new ("chunks" in e ? a : A)();
                    return (t.state = e), t;
                  }));
              },
            },
            {
              key: "shiftBefore",
              value: function (e) {
                if (this.from >= e || !this.chunks.length) return "";
                for (var t = e - this.from, n = 0; n < this.chunks.length; ) {
                  var i = this.chunks[n],
                    o = i.shiftBefore(t);
                  if (i.toString()) {
                    if (!o) break;
                    ++n;
                  } else this.chunks.splice(n, 1);
                  if (o) return o;
                }
                return "";
              },
            },
          ]),
          a
        );
      })(),
      l = (function () {
        y(n, _);
        var e = k(n);
        function n() {
          return g(this, n), e.apply(this, arguments);
        }
        return (
          v(n, [
            {
              key: "_update",
              value: function (t) {
                t.mask &&
                  (t.validate = function (e) {
                    return 0 <= e.search(t.mask);
                  }),
                  w(b(n.prototype), "_update", this).call(this, t);
              },
            },
          ]),
          n
        );
      })(),
      Sn = ((E.MaskedRegExp = l), ["_blocks"]),
      $ = (function () {
        y(l, _);
        var t = k(l);
        function l() {
          var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          return (
            g(this, l),
            (e.definitions = Object.assign({}, bn, e.definitions)),
            t.call(this, Object.assign({}, l.DEFAULTS, e))
          );
        }
        return (
          v(l, [
            {
              key: "_update",
              value: function () {
                var e =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                (e.definitions = Object.assign(
                  {},
                  this.definitions,
                  e.definitions
                )),
                  w(b(l.prototype), "_update", this).call(this, e),
                  this._rebuildMask();
              },
            },
            {
              key: "_rebuildMask",
              value: function () {
                var i = this,
                  e = this.definitions,
                  o =
                    ((this._blocks = []),
                    (this._stops = []),
                    (this._maskedBlocks = {}),
                    this.mask);
                if (o && e)
                  for (var t = !1, n = !1, r = 0; r < o.length; ++r) {
                    if (this.blocks)
                      if (
                        "continue" ===
                        (function () {
                          var e,
                            t = o.slice(r),
                            n = Object.keys(i.blocks).filter(function (e) {
                              return 0 === t.indexOf(e);
                            }),
                            n =
                              (n.sort(function (e, t) {
                                return t.length - e.length;
                              }),
                              n[0]);
                          if (n)
                            return (
                              (e = D(
                                Object.assign(
                                  {
                                    parent: i,
                                    lazy: i.lazy,
                                    placeholderChar: i.placeholderChar,
                                    overwrite: i.overwrite,
                                  },
                                  i.blocks[n]
                                )
                              )) &&
                                (i._blocks.push(e),
                                i._maskedBlocks[n] || (i._maskedBlocks[n] = []),
                                i._maskedBlocks[n].push(i._blocks.length - 1)),
                              (r += n.length - 1),
                              "continue"
                            );
                        })()
                      )
                        continue;
                    var s = o[r],
                      a = s in e;
                    if (s === l.STOP_CHAR)
                      this._stops.push(this._blocks.length);
                    else if ("{" === s || "}" === s) t = !t;
                    else if ("[" === s || "]" === s) n = !n;
                    else {
                      if (s === l.ESCAPE_CHAR) {
                        if (!(s = o[++r])) break;
                        a = !1;
                      }
                      a = a
                        ? new kn({
                            parent: this,
                            lazy: this.lazy,
                            placeholderChar: this.placeholderChar,
                            mask: e[s],
                            isOptional: n,
                          })
                        : new wn({ char: s, isUnmasking: t });
                      this._blocks.push(a);
                    }
                  }
              },
            },
            {
              key: "state",
              get: function () {
                return Object.assign({}, w(b(l.prototype), "state", this), {
                  _blocks: this._blocks.map(function (e) {
                    return e.state;
                  }),
                });
              },
              set: function (e) {
                var n = e._blocks,
                  e = cn(e, Sn);
                this._blocks.forEach(function (e, t) {
                  return (e.state = n[t]);
                }),
                  x(b(l.prototype), "state", e, this, !0);
              },
            },
            {
              key: "reset",
              value: function () {
                w(b(l.prototype), "reset", this).call(this),
                  this._blocks.forEach(function (e) {
                    return e.reset();
                  });
              },
            },
            {
              key: "isComplete",
              get: function () {
                return this._blocks.every(function (e) {
                  return e.isComplete;
                });
              },
            },
            {
              key: "doCommit",
              value: function () {
                this._blocks.forEach(function (e) {
                  return e.doCommit();
                }),
                  w(b(l.prototype), "doCommit", this).call(this);
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this._blocks.reduce(function (e, t) {
                  return e + t.unmaskedValue;
                }, "");
              },
              set: function (e) {
                x(b(l.prototype), "unmaskedValue", e, this, !0);
              },
            },
            {
              key: "value",
              get: function () {
                return this._blocks.reduce(function (e, t) {
                  return e + t.value;
                }, "");
              },
              set: function (e) {
                x(b(l.prototype), "value", e, this, !0);
              },
            },
            {
              key: "appendTail",
              value: function (e) {
                return w(b(l.prototype), "appendTail", this)
                  .call(this, e)
                  .aggregate(this._appendPlaceholder());
              },
            },
            {
              key: "_appendCharRaw",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = this._mapPosToBlock(this.value.length),
                  i = new T();
                if (!n) return i;
                for (var o = n.index; ; ++o) {
                  var r = this._blocks[o];
                  if (!r) break;
                  var r = r._appendChar(e, t),
                    s = r.skip;
                  if ((i.aggregate(r), s || r.rawInserted)) break;
                }
                return i;
              },
            },
            {
              key: "extractTail",
              value: function () {
                var o = this,
                  e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length,
                  r = new Cn();
                return (
                  e === t ||
                    this._forEachBlocksInRange(e, t, function (e, t, n, i) {
                      e = e.extractTail(n, i);
                      (e.stop = o._findStopBefore(t)),
                        (e.from = o._blockStartPos(t)),
                        e instanceof Cn && (e.blockIndex = t),
                        r.extend(e);
                    }),
                  r
                );
              },
            },
            {
              key: "extractInput",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length,
                  o =
                    2 < arguments.length && void 0 !== arguments[2]
                      ? arguments[2]
                      : {};
                if (e === t) return "";
                var r = "";
                return (
                  this._forEachBlocksInRange(e, t, function (e, t, n, i) {
                    r += e.extractInput(n, i, o);
                  }),
                  r
                );
              },
            },
            {
              key: "_findStopBefore",
              value: function (e) {
                for (var t, n = 0; n < this._stops.length; ++n) {
                  var i = this._stops[n];
                  if (!(i <= e)) break;
                  t = i;
                }
                return t;
              },
            },
            {
              key: "_appendPlaceholder",
              value: function (n) {
                var i = this,
                  o = new T();
                if (this.lazy && null == n) return o;
                var e = this._mapPosToBlock(this.value.length);
                if (!e) return o;
                var e = e.index,
                  t = null != n ? n : this._blocks.length;
                return (
                  this._blocks.slice(e, t).forEach(function (e) {
                    var t;
                    (e.lazy && null == n) ||
                      ((t = null != e._blocks ? [e._blocks.length] : []),
                      (e = e._appendPlaceholder.apply(e, t)),
                      (i._value += e.inserted),
                      o.aggregate(e));
                  }),
                  o
                );
              },
            },
            {
              key: "_mapPosToBlock",
              value: function (e) {
                for (var t = "", n = 0; n < this._blocks.length; ++n) {
                  var i = this._blocks[n],
                    o = t.length;
                  if (e <= (t += i.value).length)
                    return { index: n, offset: e - o };
                }
              },
            },
            {
              key: "_blockStartPos",
              value: function (e) {
                return this._blocks.slice(0, e).reduce(function (e, t) {
                  return e + t.value.length;
                }, 0);
              },
            },
            {
              key: "_forEachBlocksInRange",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length,
                  n = 2 < arguments.length ? arguments[2] : void 0,
                  e = this._mapPosToBlock(e);
                if (e) {
                  var i = this._mapPosToBlock(t),
                    t = i && e.index === i.index,
                    o = e.offset,
                    r = i && t ? i.offset : this._blocks[e.index].value.length;
                  if ((n(this._blocks[e.index], e.index, o, r), i && !t)) {
                    for (var s = e.index + 1; s < i.index; ++s)
                      n(this._blocks[s], s, 0, this._blocks[s].value.length);
                    n(this._blocks[i.index], i.index, 0, i.offset);
                  }
                }
              },
            },
            {
              key: "remove",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : 0,
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : this.value.length,
                  o = w(b(l.prototype), "remove", this).call(this, e, t);
                return (
                  this._forEachBlocksInRange(e, t, function (e, t, n, i) {
                    o.aggregate(e.remove(n, i));
                  }),
                  o
                );
              },
            },
            {
              key: "nearestInputPos",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : L,
                  n = this._mapPosToBlock(e) || { index: 0, offset: 0 },
                  i = n.offset,
                  n = n.index,
                  o = this._blocks[n];
                if (!o) return e;
                var r = i,
                  i =
                    (r =
                      0 !== r && r < o.value.length
                        ? o.nearestInputPos(
                            i,
                            (function (e) {
                              switch (e) {
                                case B:
                                  return N;
                                case R:
                                  return H;
                                default:
                                  return e;
                              }
                            })(t)
                          )
                        : r) === o.value.length;
                if (!(0 === r) && !i) return this._blockStartPos(n) + r;
                var s = i ? n + 1 : n;
                if (t === L) {
                  if (0 < s) {
                    (o = this._blocks[s - 1]), (r = o.nearestInputPos(0, L));
                    if (!o.value.length || r !== o.value.length)
                      return this._blockStartPos(s);
                  }
                  for (var a = s; a < this._blocks.length; ++a) {
                    var l = this._blocks[a],
                      u = l.nearestInputPos(0, L);
                    if (!l.value.length || u !== l.value.length)
                      return this._blockStartPos(a) + u;
                  }
                  for (var c = s - 1; 0 <= c; --c) {
                    var d = this._blocks[c],
                      P = d.nearestInputPos(0, L);
                    if (!d.value.length || P !== d.value.length)
                      return this._blockStartPos(c) + d.value.length;
                  }
                  return e;
                }
                if (t === B || t === N) {
                  for (var p, h = s; h < this._blocks.length; ++h)
                    if (this._blocks[h].value) {
                      p = h;
                      break;
                    }
                  if (null != p) {
                    (i = this._blocks[p]), (n = i.nearestInputPos(0, R));
                    if (0 === n && i.unmaskedValue.length)
                      return this._blockStartPos(p) + n;
                  }
                  for (var f, m = -1, g = s - 1; 0 <= g; --g) {
                    var v = this._blocks[g],
                      y = v.nearestInputPos(v.value.length, N);
                    if (((v.value && 0 === y) || (f = g), 0 !== y)) {
                      if (y !== v.value.length)
                        return this._blockStartPos(g) + y;
                      m = g;
                      break;
                    }
                  }
                  if (t === B)
                    for (
                      var b = m + 1;
                      b <= Math.min(s, this._blocks.length - 1);
                      ++b
                    ) {
                      var k = this._blocks[b],
                        w = k.nearestInputPos(0, L),
                        x = this._blockStartPos(b) + w;
                      if (e < x) break;
                      if (w !== k.value.length) return x;
                    }
                  if (0 <= m)
                    return (
                      this._blockStartPos(m) + this._blocks[m].value.length
                    );
                  if (
                    t === N ||
                    (this.lazy &&
                      !this.extractInput() &&
                      !(function (e) {
                        if (!e) return;
                        var t = e.value;
                        return !t || e.nearestInputPos(0, L) !== t.length;
                      })(this._blocks[s]))
                  )
                    return 0;
                  if (null != f) return this._blockStartPos(f);
                  for (var C = s; C < this._blocks.length; ++C) {
                    var S = this._blocks[C],
                      T = S.nearestInputPos(0, L);
                    if (!S.value.length || T !== S.value.length)
                      return this._blockStartPos(C) + T;
                  }
                  return 0;
                }
                if (t === R || t === H) {
                  for (var A, E, _ = s; _ < this._blocks.length; ++_) {
                    var D = this._blocks[_],
                      $ = D.nearestInputPos(0, L);
                    if ($ !== D.value.length) {
                      (E = this._blockStartPos(_) + $), (A = _);
                      break;
                    }
                  }
                  if (null != A && null != E) {
                    for (var F = A; F < this._blocks.length; ++F) {
                      var j = this._blocks[F],
                        I = j.nearestInputPos(0, H);
                      if (I !== j.value.length)
                        return this._blockStartPos(F) + I;
                    }
                    return t === H ? this.value.length : E;
                  }
                  for (
                    var M = Math.min(s, this._blocks.length - 1);
                    0 <= M;
                    --M
                  ) {
                    var O = this._blocks[M],
                      O = O.nearestInputPos(O.value.length, B);
                    if (0 !== O) {
                      O = this._blockStartPos(M) + O;
                      if (e <= O) return O;
                      break;
                    }
                  }
                }
                return e;
              },
            },
            {
              key: "maskedBlock",
              value: function (e) {
                return this.maskedBlocks(e)[0];
              },
            },
            {
              key: "maskedBlocks",
              value: function (e) {
                var t = this,
                  e = this._maskedBlocks[e];
                return e
                  ? e.map(function (e) {
                      return t._blocks[e];
                    })
                  : [];
              },
            },
          ]),
          l
        );
      })();
    ($.DEFAULTS = { lazy: !0, placeholderChar: "_" }),
      ($.STOP_CHAR = "`"),
      ($.ESCAPE_CHAR = "\\"),
      ($.InputDefinition = kn),
      ($.FixedDefinition = wn),
      (E.MaskedPattern = $);
    var Tn = (function () {
        y(c, $);
        var e = k(c);
        function c() {
          return g(this, c), e.apply(this, arguments);
        }
        return (
          v(c, [
            {
              key: "_matchFrom",
              get: function () {
                return this.maxLength - String(this.from).length;
              },
            },
            {
              key: "_update",
              value: function (e) {
                e = Object.assign(
                  { to: this.to || 0, from: this.from || 0 },
                  e
                );
                for (
                  var t = String(e.to).length,
                    n =
                      (null != e.maxLength && (t = Math.max(t, e.maxLength)),
                      (e.maxLength = t),
                      String(e.from).padStart(t, "0")),
                    i = String(e.to).padStart(t, "0"),
                    o = 0;
                  o < i.length && i[o] === n[o];

                )
                  ++o;
                (e.mask =
                  i.slice(0, o).replace(/0/g, "\\0") + "0".repeat(t - o)),
                  w(b(c.prototype), "_update", this).call(this, e);
              },
            },
            {
              key: "isComplete",
              get: function () {
                return (
                  w(b(c.prototype), "isComplete", this) && Boolean(this.value)
                );
              },
            },
            {
              key: "boundaries",
              value: function (e) {
                var t = "",
                  n = "",
                  e = C(e.match(/^(\D*)(\d*)(\D*)/) || [], 3),
                  i = e[1],
                  e = e[2];
                return (
                  e &&
                    ((t = "0".repeat(i.length) + e),
                    (n = "9".repeat(i.length) + e)),
                  [
                    (t = t.padEnd(this.maxLength, "0")),
                    (n = n.padEnd(this.maxLength, "9")),
                  ]
                );
              },
            },
            {
              key: "doPrepare",
              value: function (e) {
                var t =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                if (
                  ((e = w(b(c.prototype), "doPrepare", this)
                    .call(this, e, t)
                    .replace(/\D/g, "")),
                  !this.autofix)
                )
                  return e;
                for (
                  var n = String(this.from).padStart(this.maxLength, "0"),
                    i = String(this.to).padStart(this.maxLength, "0"),
                    o = this.value,
                    r = "",
                    s = 0;
                  s < e.length;
                  ++s
                ) {
                  var a = o + r + e[s],
                    l = C(this.boundaries(a), 2),
                    u = l[0],
                    l = l[1];
                  Number(l) < this.from
                    ? (r += n[a.length - 1])
                    : Number(u) > this.to
                    ? (r += i[a.length - 1])
                    : (r += e[s]);
                }
                return r;
              },
            },
            {
              key: "doValidate",
              value: function () {
                var e = this.value;
                if (-1 === e.search(/[^0]/) && e.length <= this._matchFrom)
                  return !0;
                for (
                  var e = C(this.boundaries(e), 2),
                    t = e[0],
                    e = e[1],
                    n = arguments.length,
                    i = new Array(n),
                    o = 0;
                  o < n;
                  o++
                )
                  i[o] = arguments[o];
                return (
                  this.from <= Number(e) &&
                  Number(t) <= this.to &&
                  (e = w(b(c.prototype), "doValidate", this)).call.apply(
                    e,
                    [this].concat(i)
                  )
                );
              },
            },
          ]),
          c
        );
      })(),
      An =
        ((E.MaskedRange = Tn),
        (function () {
          y(r, $);
          var t = k(r);
          function r(e) {
            return g(this, r), t.call(this, Object.assign({}, r.DEFAULTS, e));
          }
          return (
            v(r, [
              {
                key: "_update",
                value: function (t) {
                  t.mask === Date && delete t.mask,
                    t.pattern && (t.mask = t.pattern);
                  var e = t.blocks;
                  (t.blocks = Object.assign({}, r.GET_DEFAULT_BLOCKS())),
                    t.min && (t.blocks.Y.from = t.min.getFullYear()),
                    t.max && (t.blocks.Y.to = t.max.getFullYear()),
                    t.min &&
                      t.max &&
                      t.blocks.Y.from === t.blocks.Y.to &&
                      ((t.blocks.m.from = t.min.getMonth() + 1),
                      (t.blocks.m.to = t.max.getMonth() + 1),
                      t.blocks.m.from === t.blocks.m.to &&
                        ((t.blocks.d.from = t.min.getDate()),
                        (t.blocks.d.to = t.max.getDate()))),
                    Object.assign(t.blocks, e),
                    Object.keys(t.blocks).forEach(function (e) {
                      e = t.blocks[e];
                      "autofix" in e || (e.autofix = t.autofix);
                    }),
                    w(b(r.prototype), "_update", this).call(this, t);
                },
              },
              {
                key: "doValidate",
                value: function () {
                  for (
                    var e,
                      t = this.date,
                      n = arguments.length,
                      i = new Array(n),
                      o = 0;
                    o < n;
                    o++
                  )
                    i[o] = arguments[o];
                  return (
                    (e = w(b(r.prototype), "doValidate", this)).call.apply(
                      e,
                      [this].concat(i)
                    ) &&
                    (!this.isComplete ||
                      (this.isDateExist(this.value) &&
                        null != t &&
                        (null == this.min || this.min <= t) &&
                        (null == this.max || t <= this.max)))
                  );
                },
              },
              {
                key: "isDateExist",
                value: function (e) {
                  return 0 <= this.format(this.parse(e, this), this).indexOf(e);
                },
              },
              {
                key: "date",
                get: function () {
                  return this.typedValue;
                },
                set: function (e) {
                  this.typedValue = e;
                },
              },
              {
                key: "typedValue",
                get: function () {
                  return this.isComplete
                    ? w(b(r.prototype), "typedValue", this)
                    : null;
                },
                set: function (e) {
                  x(b(r.prototype), "typedValue", e, this, !0);
                },
              },
            ]),
            r
          );
        })()),
      En =
        ((An.DEFAULTS = {
          pattern: "d{.}`m{.}`Y",
          format: function (e) {
            return [
              String(e.getDate()).padStart(2, "0"),
              String(e.getMonth() + 1).padStart(2, "0"),
              e.getFullYear(),
            ].join(".");
          },
          parse: function (e) {
            var e = C(e.split("."), 3),
              t = e[0],
              n = e[1],
              e = e[2];
            return new Date(e, n - 1, t);
          },
        }),
        (An.GET_DEFAULT_BLOCKS = function () {
          return {
            d: { mask: Tn, from: 1, to: 31, maxLength: 2 },
            m: { mask: Tn, from: 1, to: 12, maxLength: 2 },
            Y: { mask: Tn, from: 1900, to: 9999 },
          };
        }),
        (E.MaskedDate = An),
        (function () {
          function e() {
            g(this, e);
          }
          return (
            v(e, [
              {
                key: "selectionStart",
                get: function () {
                  var e;
                  try {
                    e = this._unsafeSelectionStart;
                  } catch (e) {}
                  return null != e ? e : this.value.length;
                },
              },
              {
                key: "selectionEnd",
                get: function () {
                  var e;
                  try {
                    e = this._unsafeSelectionEnd;
                  } catch (e) {}
                  return null != e ? e : this.value.length;
                },
              },
              {
                key: "select",
                value: function (e, t) {
                  if (
                    null != e &&
                    null != t &&
                    (e !== this.selectionStart || t !== this.selectionEnd)
                  )
                    try {
                      this._unsafeSelect(e, t);
                    } catch (e) {}
                },
              },
              { key: "_unsafeSelect", value: function (e, t) {} },
              {
                key: "isActive",
                get: function () {
                  return !1;
                },
              },
              { key: "bindEvents", value: function (e) {} },
              { key: "unbindEvents", value: function () {} },
            ]),
            e
          );
        })()),
      _n =
        ((E.MaskElement = En),
        (function () {
          y(i, En);
          var n = k(i);
          function i(e) {
            var t;
            return (
              g(this, i), ((t = n.call(this)).input = e), (t._handlers = {}), t
            );
          }
          return (
            v(i, [
              {
                key: "rootElement",
                get: function () {
                  return this.input.getRootNode
                    ? this.input.getRootNode()
                    : document;
                },
              },
              {
                key: "isActive",
                get: function () {
                  return this.input === this.rootElement.activeElement;
                },
              },
              {
                key: "_unsafeSelectionStart",
                get: function () {
                  return this.input.selectionStart;
                },
              },
              {
                key: "_unsafeSelectionEnd",
                get: function () {
                  return this.input.selectionEnd;
                },
              },
              {
                key: "_unsafeSelect",
                value: function (e, t) {
                  this.input.setSelectionRange(e, t);
                },
              },
              {
                key: "value",
                get: function () {
                  return this.input.value;
                },
                set: function (e) {
                  this.input.value = e;
                },
              },
              {
                key: "bindEvents",
                value: function (t) {
                  var n = this;
                  Object.keys(t).forEach(function (e) {
                    return n._toggleEventHandler(i.EVENTS_MAP[e], t[e]);
                  });
                },
              },
              {
                key: "unbindEvents",
                value: function () {
                  var t = this;
                  Object.keys(this._handlers).forEach(function (e) {
                    return t._toggleEventHandler(e);
                  });
                },
              },
              {
                key: "_toggleEventHandler",
                value: function (e, t) {
                  this._handlers[e] &&
                    (this.input.removeEventListener(e, this._handlers[e]),
                    delete this._handlers[e]),
                    t &&
                      (this.input.addEventListener(e, t),
                      (this._handlers[e] = t));
                },
              },
            ]),
            i
          );
        })()),
      Dn =
        ((_n.EVENTS_MAP = {
          selectionChange: "keydown",
          input: "input",
          drop: "drop",
          click: "click",
          focus: "focus",
          commit: "blur",
        }),
        (E.HTMLMaskElement = _n),
        (function () {
          y(t, _n);
          var e = k(t);
          function t() {
            return g(this, t), e.apply(this, arguments);
          }
          return (
            v(t, [
              {
                key: "_unsafeSelectionStart",
                get: function () {
                  var e = this.rootElement,
                    e = e.getSelection && e.getSelection();
                  return e && e.anchorOffset;
                },
              },
              {
                key: "_unsafeSelectionEnd",
                get: function () {
                  var e = this.rootElement,
                    e = e.getSelection && e.getSelection();
                  return e && this._unsafeSelectionStart + String(e).length;
                },
              },
              {
                key: "_unsafeSelect",
                value: function (e, t) {
                  var n;
                  this.rootElement.createRange &&
                    ((n = this.rootElement.createRange()).setStart(
                      this.input.firstChild || this.input,
                      e
                    ),
                    n.setEnd(this.input.lastChild || this.input, t),
                    (t =
                      (e = this.rootElement).getSelection &&
                      e.getSelection()) &&
                      (t.removeAllRanges(), t.addRange(n)));
                },
              },
              {
                key: "value",
                get: function () {
                  return this.input.textContent;
                },
                set: function (e) {
                  this.input.textContent = e;
                },
              },
            ]),
            t
          );
        })()),
      $n = ((E.HTMLContenteditableMaskElement = Dn), ["mask"]),
      Ee = (function () {
        function n(e, t) {
          g(this, n),
            (this.el =
              e instanceof En
                ? e
                : new (e.isContentEditable &&
                  "INPUT" !== e.tagName &&
                  "TEXTAREA" !== e.tagName
                    ? Dn
                    : _n)(e)),
            (this.masked = D(t)),
            (this._listeners = {}),
            (this._value = ""),
            (this._unmaskedValue = ""),
            (this._saveSelection = this._saveSelection.bind(this)),
            (this._onInput = this._onInput.bind(this)),
            (this._onChange = this._onChange.bind(this)),
            (this._onDrop = this._onDrop.bind(this)),
            (this._onFocus = this._onFocus.bind(this)),
            (this._onClick = this._onClick.bind(this)),
            (this.alignCursor = this.alignCursor.bind(this)),
            (this.alignCursorFriendly = this.alignCursorFriendly.bind(this)),
            this._bindEvents(),
            this.updateValue(),
            this._onChange();
        }
        return (
          v(n, [
            {
              key: "mask",
              get: function () {
                return this.masked.mask;
              },
              set: function (e) {
                var t;
                this.maskEquals(e) ||
                  (e instanceof E.Masked || this.masked.constructor !== vn(e)
                    ? (((t = D({ mask: e })).unmaskedValue =
                        this.masked.unmaskedValue),
                      (this.masked = t))
                    : this.masked.updateOptions({ mask: e }));
              },
            },
            {
              key: "maskEquals",
              value: function (e) {
                return (
                  null == e ||
                  e === this.masked.mask ||
                  (e === Date && this.masked instanceof An)
                );
              },
            },
            {
              key: "value",
              get: function () {
                return this._value;
              },
              set: function (e) {
                (this.masked.value = e),
                  this.updateControl(),
                  this.alignCursor();
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this._unmaskedValue;
              },
              set: function (e) {
                (this.masked.unmaskedValue = e),
                  this.updateControl(),
                  this.alignCursor();
              },
            },
            {
              key: "typedValue",
              get: function () {
                return this.masked.typedValue;
              },
              set: function (e) {
                (this.masked.typedValue = e),
                  this.updateControl(),
                  this.alignCursor();
              },
            },
            {
              key: "_bindEvents",
              value: function () {
                this.el.bindEvents({
                  selectionChange: this._saveSelection,
                  input: this._onInput,
                  drop: this._onDrop,
                  click: this._onClick,
                  focus: this._onFocus,
                  commit: this._onChange,
                });
              },
            },
            {
              key: "_unbindEvents",
              value: function () {
                this.el && this.el.unbindEvents();
              },
            },
            {
              key: "_fireEvent",
              value: function (e) {
                for (
                  var t = arguments.length,
                    n = new Array(1 < t ? t - 1 : 0),
                    i = 1;
                  i < t;
                  i++
                )
                  n[i - 1] = arguments[i];
                e = this._listeners[e];
                e &&
                  e.forEach(function (e) {
                    return e.apply(void 0, n);
                  });
              },
            },
            {
              key: "selectionStart",
              get: function () {
                return this._cursorChanging
                  ? this._changingCursorPos
                  : this.el.selectionStart;
              },
            },
            {
              key: "cursorPos",
              get: function () {
                return this._cursorChanging
                  ? this._changingCursorPos
                  : this.el.selectionEnd;
              },
              set: function (e) {
                this.el &&
                  this.el.isActive &&
                  (this.el.select(e, e), this._saveSelection());
              },
            },
            {
              key: "_saveSelection",
              value: function () {
                this.value !== this.el.value &&
                  console.warn(
                    "Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly."
                  ),
                  (this._selection = {
                    start: this.selectionStart,
                    end: this.cursorPos,
                  });
              },
            },
            {
              key: "updateValue",
              value: function () {
                (this.masked.value = this.el.value),
                  (this._value = this.masked.value);
              },
            },
            {
              key: "updateControl",
              value: function () {
                var e = this.masked.unmaskedValue,
                  t = this.masked.value,
                  n = this.unmaskedValue !== e || this.value !== t;
                (this._unmaskedValue = e),
                  (this._value = t),
                  this.el.value !== t && (this.el.value = t),
                  n && this._fireChangeEvents();
              },
            },
            {
              key: "updateOptions",
              value: function (e) {
                var t = e.mask,
                  e = cn(e, $n),
                  n = !this.maskEquals(t),
                  i = !(function e(t, n) {
                    if (n === t) return 1;
                    var i = Array.isArray(n),
                      o = Array.isArray(t);
                    if (i && o) {
                      if (n.length != t.length) return;
                      for (s = 0; s < n.length; s++) if (!e(n[s], t[s])) return;
                      return 1;
                    }
                    if (i == o) {
                      if (n && t && "object" === an(n) && "object" === an(t)) {
                        if (
                          ((i = n instanceof Date),
                          (o = t instanceof Date),
                          i && o)
                        )
                          return n.getTime() == t.getTime();
                        if (i != o) return;
                        if (
                          ((i = n instanceof RegExp),
                          (o = t instanceof RegExp),
                          i && o)
                        )
                          return n.toString() == t.toString();
                        if (i != o) return;
                        for (var r = Object.keys(n), s = 0; s < r.length; s++)
                          if (!Object.prototype.hasOwnProperty.call(t, r[s]))
                            return;
                        for (s = 0; s < r.length; s++)
                          if (!e(t[r[s]], n[r[s]])) return;
                        return 1;
                      }
                      return (
                        n &&
                        t &&
                        "function" == typeof n &&
                        "function" == typeof t &&
                        n.toString() === t.toString()
                      );
                    }
                  })(this.masked, e);
                n && (this.mask = t),
                  i && this.masked.updateOptions(e),
                  (n || i) && this.updateControl();
              },
            },
            {
              key: "updateCursor",
              value: function (e) {
                null != e && ((this.cursorPos = e), this._delayUpdateCursor(e));
              },
            },
            {
              key: "_delayUpdateCursor",
              value: function (e) {
                var t = this;
                this._abortUpdateCursor(),
                  (this._changingCursorPos = e),
                  (this._cursorChanging = setTimeout(function () {
                    t.el &&
                      ((t.cursorPos = t._changingCursorPos),
                      t._abortUpdateCursor());
                  }, 10));
              },
            },
            {
              key: "_fireChangeEvents",
              value: function () {
                this._fireEvent("accept", this._inputEvent),
                  this.masked.isComplete &&
                    this._fireEvent("complete", this._inputEvent);
              },
            },
            {
              key: "_abortUpdateCursor",
              value: function () {
                this._cursorChanging &&
                  (clearTimeout(this._cursorChanging),
                  delete this._cursorChanging);
              },
            },
            {
              key: "alignCursor",
              value: function () {
                this.cursorPos = this.masked.nearestInputPos(this.cursorPos, B);
              },
            },
            {
              key: "alignCursorFriendly",
              value: function () {
                this.selectionStart === this.cursorPos && this.alignCursor();
              },
            },
            {
              key: "on",
              value: function (e, t) {
                return (
                  this._listeners[e] || (this._listeners[e] = []),
                  this._listeners[e].push(t),
                  this
                );
              },
            },
            {
              key: "off",
              value: function (e, t) {
                if (!this._listeners[e]) return this;
                if (!t) return delete this._listeners[e], this;
                t = this._listeners[e].indexOf(t);
                return 0 <= t && this._listeners[e].splice(t, 1), this;
              },
            },
            {
              key: "_onInput",
              value: function (e) {
                if (
                  ((this._inputEvent = e),
                  this._abortUpdateCursor(),
                  !this._selection)
                )
                  return this.updateValue();
                var e = new gn(
                    this.el.value,
                    this.cursorPos,
                    this.value,
                    this._selection
                  ),
                  t = this.masked.rawInputValue,
                  n = this.masked.splice(
                    e.startChangePos,
                    e.removed.length,
                    e.inserted,
                    e.removeDirection
                  ).offset,
                  t = t === this.masked.rawInputValue ? e.removeDirection : L,
                  e = this.masked.nearestInputPos(e.startChangePos + n, t);
                this.updateControl(),
                  this.updateCursor(e),
                  delete this._inputEvent;
              },
            },
            {
              key: "_onChange",
              value: function () {
                this.value !== this.el.value && this.updateValue(),
                  this.masked.doCommit(),
                  this.updateControl(),
                  this._saveSelection();
              },
            },
            {
              key: "_onDrop",
              value: function (e) {
                e.preventDefault(), e.stopPropagation();
              },
            },
            {
              key: "_onFocus",
              value: function (e) {
                this.alignCursorFriendly();
              },
            },
            {
              key: "_onClick",
              value: function (e) {
                this.alignCursorFriendly();
              },
            },
            {
              key: "destroy",
              value: function () {
                this._unbindEvents(),
                  (this._listeners.length = 0),
                  delete this.el;
              },
            },
          ]),
          n
        );
      })(),
      f =
        ((E.InputMask = Ee),
        (function () {
          y(r, $);
          var e = k(r);
          function r() {
            return g(this, r), e.apply(this, arguments);
          }
          return (
            v(r, [
              {
                key: "_update",
                value: function (e) {
                  e.enum && (e.mask = "*".repeat(e.enum[0].length)),
                    w(b(r.prototype), "_update", this).call(this, e);
                },
              },
              {
                key: "doValidate",
                value: function () {
                  for (
                    var e,
                      t = this,
                      n = arguments.length,
                      i = new Array(n),
                      o = 0;
                    o < n;
                    o++
                  )
                    i[o] = arguments[o];
                  return (
                    this.enum.some(function (e) {
                      return 0 <= e.indexOf(t.unmaskedValue);
                    }) &&
                    (e = w(b(r.prototype), "doValidate", this)).call.apply(
                      e,
                      [this].concat(i)
                    )
                  );
                },
              },
            ]),
            r
          );
        })()),
      s =
        ((E.MaskedEnum = f),
        (function () {
          y(r, _);
          var t = k(r);
          function r(e) {
            return g(this, r), t.call(this, Object.assign({}, r.DEFAULTS, e));
          }
          return (
            v(r, [
              {
                key: "_update",
                value: function (e) {
                  w(b(r.prototype), "_update", this).call(this, e),
                    this._updateRegExps();
                },
              },
              {
                key: "_updateRegExps",
                value: function () {
                  var e = "^" + (this.allowNegative ? "[+|\\-]?" : ""),
                    t =
                      (this.scale
                        ? "(" + mn(this.radix) + "\\d{0," + this.scale + "})?"
                        : "") + "$";
                  (this._numberRegExpInput = new RegExp(
                    e + "(0|([1-9]+\\d*))?" + t
                  )),
                    (this._numberRegExp = new RegExp(e + "\\d*" + t)),
                    (this._mapToRadixRegExp = new RegExp(
                      "[" + this.mapToRadix.map(mn).join("") + "]",
                      "g"
                    )),
                    (this._thousandsSeparatorRegExp = new RegExp(
                      mn(this.thousandsSeparator),
                      "g"
                    ));
                },
              },
              {
                key: "_removeThousandsSeparators",
                value: function (e) {
                  return e.replace(this._thousandsSeparatorRegExp, "");
                },
              },
              {
                key: "_insertThousandsSeparators",
                value: function (e) {
                  e = e.split(this.radix);
                  return (
                    (e[0] = e[0].replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      this.thousandsSeparator
                    )),
                    e.join(this.radix)
                  );
                },
              },
              {
                key: "doPrepare",
                value: function (e) {
                  for (
                    var t,
                      n = arguments.length,
                      i = new Array(1 < n ? n - 1 : 0),
                      o = 1;
                    o < n;
                    o++
                  )
                    i[o - 1] = arguments[o];
                  return (t = w(b(r.prototype), "doPrepare", this)).call.apply(
                    t,
                    [
                      this,
                      this._removeThousandsSeparators(
                        e.replace(this._mapToRadixRegExp, this.radix)
                      ),
                    ].concat(i)
                  );
                },
              },
              {
                key: "_separatorsCount",
                value: function (e) {
                  for (
                    var t =
                        1 < arguments.length &&
                        void 0 !== arguments[1] &&
                        arguments[1],
                      n = 0,
                      i = 0;
                    i < e;
                    ++i
                  )
                    this._value.indexOf(this.thousandsSeparator, i) === i &&
                      (++n, t && (e += this.thousandsSeparator.length));
                  return n;
                },
              },
              {
                key: "_separatorsCountFromSlice",
                value: function () {
                  var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : this._value;
                  return this._separatorsCount(
                    this._removeThousandsSeparators(e).length,
                    !0
                  );
                },
              },
              {
                key: "extractInput",
                value: function () {
                  var e =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0,
                    t =
                      1 < arguments.length && void 0 !== arguments[1]
                        ? arguments[1]
                        : this.value.length,
                    n = 2 < arguments.length ? arguments[2] : void 0,
                    i = C(this._adjustRangeWithSeparators(e, t), 2),
                    e = i[0],
                    t = i[1];
                  return this._removeThousandsSeparators(
                    w(b(r.prototype), "extractInput", this).call(this, e, t, n)
                  );
                },
              },
              {
                key: "_appendCharRaw",
                value: function (e) {
                  var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {};
                  if (!this.thousandsSeparator)
                    return w(b(r.prototype), "_appendCharRaw", this).call(
                      this,
                      e,
                      t
                    );
                  var n = (
                      t.tail && t._beforeTailState ? t._beforeTailState : this
                    )._value,
                    n = this._separatorsCountFromSlice(n),
                    i =
                      ((this._value = this._removeThousandsSeparators(
                        this.value
                      )),
                      w(b(r.prototype), "_appendCharRaw", this).call(
                        this,
                        e,
                        t
                      )),
                    t =
                      ((this._value = this._insertThousandsSeparators(
                        this._value
                      )),
                      (t.tail && t._beforeTailState ? t._beforeTailState : this)
                        ._value),
                    t = this._separatorsCountFromSlice(t);
                  return (
                    (i.tailShift += (t - n) * this.thousandsSeparator.length),
                    (i.skip = !i.rawInserted && e === this.thousandsSeparator),
                    i
                  );
                },
              },
              {
                key: "_findSeparatorAround",
                value: function (e) {
                  if (this.thousandsSeparator) {
                    var t = e - this.thousandsSeparator.length + 1,
                      t = this.value.indexOf(this.thousandsSeparator, t);
                    if (t <= e) return t;
                  }
                  return -1;
                },
              },
              {
                key: "_adjustRangeWithSeparators",
                value: function (e, t) {
                  var n = this._findSeparatorAround(e),
                    n = (0 <= n && (e = n), this._findSeparatorAround(t));
                  return [
                    e,
                    (t = 0 <= n ? n + this.thousandsSeparator.length : t),
                  ];
                },
              },
              {
                key: "remove",
                value: function () {
                  var e =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : 0,
                    t =
                      1 < arguments.length && void 0 !== arguments[1]
                        ? arguments[1]
                        : this.value.length,
                    n = C(this._adjustRangeWithSeparators(e, t), 2),
                    e = n[0],
                    t = n[1],
                    n = this.value.slice(0, e),
                    e = this.value.slice(t),
                    t = this._separatorsCount(n.length),
                    e =
                      ((this._value = this._insertThousandsSeparators(
                        this._removeThousandsSeparators(n + e)
                      )),
                      this._separatorsCountFromSlice(n));
                  return new T({
                    tailShift: (e - t) * this.thousandsSeparator.length,
                  });
                },
              },
              {
                key: "nearestInputPos",
                value: function (e, t) {
                  if (!this.thousandsSeparator) return e;
                  switch (t) {
                    case L:
                    case B:
                    case N:
                      var n = this._findSeparatorAround(e - 1);
                      if (0 <= n) {
                        var i = n + this.thousandsSeparator.length;
                        if (e < i || this.value.length <= i || t === N)
                          return n;
                      }
                      break;
                    case R:
                    case H:
                      i = this._findSeparatorAround(e);
                      if (0 <= i) return i + this.thousandsSeparator.length;
                  }
                  return e;
                },
              },
              {
                key: "doValidate",
                value: function (e) {
                  var t,
                    n = (
                      e.input ? this._numberRegExpInput : this._numberRegExp
                    ).test(this._removeThousandsSeparators(this.value));
                  return (
                    n &&
                      ((t = this.number),
                      (n =
                        n &&
                        !isNaN(t) &&
                        (null == this.min ||
                          0 <= this.min ||
                          this.min <= this.number) &&
                        (null == this.max ||
                          this.max <= 0 ||
                          this.number <= this.max))),
                    n && w(b(r.prototype), "doValidate", this).call(this, e)
                  );
                },
              },
              {
                key: "doCommit",
                value: function () {
                  var e, t;
                  this.value &&
                    ((e = t = this.number),
                    null != this.min && (e = Math.max(e, this.min)),
                    (e = null != this.max ? Math.min(e, this.max) : e) !== t &&
                      (this.unmaskedValue = String(e)),
                    (t = this.value),
                    this.normalizeZeros && (t = this._normalizeZeros(t)),
                    this.padFractionalZeros &&
                      (t = this._padFractionalZeros(t)),
                    (this._value = t)),
                    w(b(r.prototype), "doCommit", this).call(this);
                },
              },
              {
                key: "_normalizeZeros",
                value: function (e) {
                  var t = this._removeThousandsSeparators(e).split(this.radix);
                  return (
                    (t[0] = t[0].replace(
                      /^(\D*)(0*)(\d*)/,
                      function (e, t, n, i) {
                        return t + i;
                      }
                    )),
                    e.length && !/\d$/.test(t[0]) && (t[0] = t[0] + "0"),
                    1 < t.length &&
                      ((t[1] = t[1].replace(/0*$/, "")),
                      t[1].length || (t.length = 1)),
                    this._insertThousandsSeparators(t.join(this.radix))
                  );
                },
              },
              {
                key: "_padFractionalZeros",
                value: function (e) {
                  if (!e) return e;
                  e = e.split(this.radix);
                  return (
                    e.length < 2 && e.push(""),
                    (e[1] = e[1].padEnd(this.scale, "0")),
                    e.join(this.radix)
                  );
                },
              },
              {
                key: "unmaskedValue",
                get: function () {
                  return this._removeThousandsSeparators(
                    this._normalizeZeros(this.value)
                  ).replace(this.radix, ".");
                },
                set: function (e) {
                  x(
                    b(r.prototype),
                    "unmaskedValue",
                    e.replace(".", this.radix),
                    this,
                    !0
                  );
                },
              },
              {
                key: "typedValue",
                get: function () {
                  return Number(this.unmaskedValue);
                },
                set: function (e) {
                  x(b(r.prototype), "unmaskedValue", String(e), this, !0);
                },
              },
              {
                key: "number",
                get: function () {
                  return this.typedValue;
                },
                set: function (e) {
                  this.typedValue = e;
                },
              },
              {
                key: "allowNegative",
                get: function () {
                  return (
                    this.signed ||
                    (null != this.min && this.min < 0) ||
                    (null != this.max && this.max < 0)
                  );
                },
              },
            ]),
            r
          );
        })()),
      Re =
        ((s.DEFAULTS = {
          radix: ",",
          thousandsSeparator: "",
          mapToRadix: ["."],
          scale: 2,
          signed: !1,
          normalizeZeros: !0,
          padFractionalZeros: !1,
        }),
        (E.MaskedNumber = s),
        (function () {
          y(t, _);
          var e = k(t);
          function t() {
            return g(this, t), e.apply(this, arguments);
          }
          return (
            v(t, [
              {
                key: "_update",
                value: function (e) {
                  e.mask && (e.validate = e.mask),
                    w(b(t.prototype), "_update", this).call(this, e);
                },
              },
            ]),
            t
          );
        })()),
      Fn =
        ((E.MaskedFunction = Re),
        ["compiledMasks", "currentMaskRef", "currentMask"]),
      h = (function () {
        y(o, _);
        var t = k(o);
        function o(e) {
          return (
            g(this, o),
            ((e = t.call(this, Object.assign({}, o.DEFAULTS, e))).currentMask =
              null),
            e
          );
        }
        return (
          v(o, [
            {
              key: "_update",
              value: function (e) {
                w(b(o.prototype), "_update", this).call(this, e),
                  "mask" in e &&
                    (this.compiledMasks = Array.isArray(e.mask)
                      ? e.mask.map(D)
                      : []);
              },
            },
            {
              key: "_appendCharRaw",
              value: function (e) {
                var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = this._applyDispatch(e, t);
                return (
                  this.currentMask &&
                    n.aggregate(this.currentMask._appendChar(e, t)),
                  n
                );
              },
            },
            {
              key: "_applyDispatch",
              value: function () {
                var e =
                    0 < arguments.length && void 0 !== arguments[0]
                      ? arguments[0]
                      : "",
                  t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n =
                    t.tail && null != t._beforeTailState
                      ? t._beforeTailState._value
                      : this.value,
                  i = this.rawInputValue,
                  o =
                    t.tail && null != t._beforeTailState
                      ? t._beforeTailState._rawInputValue
                      : i,
                  i = i.slice(o.length),
                  r = this.currentMask,
                  s = new T(),
                  a = r && r.state;
                return (
                  (this.currentMask = this.doDispatch(e, Object.assign({}, t))),
                  this.currentMask &&
                    (this.currentMask !== r
                      ? (this.currentMask.reset(),
                        o &&
                          ((e = this.currentMask.append(o, { raw: !0 })),
                          (s.tailShift = e.inserted.length - n.length)),
                        i &&
                          (s.tailShift += this.currentMask.append(i, {
                            raw: !0,
                            tail: !0,
                          }).tailShift))
                      : (this.currentMask.state = a)),
                  s
                );
              },
            },
            {
              key: "_appendPlaceholder",
              value: function () {
                var e = this._applyDispatch.apply(this, arguments);
                return (
                  this.currentMask &&
                    e.aggregate(this.currentMask._appendPlaceholder()),
                  e
                );
              },
            },
            {
              key: "doDispatch",
              value: function (e) {
                return this.dispatch(
                  e,
                  this,
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {}
                );
              },
            },
            {
              key: "doValidate",
              value: function () {
                for (
                  var e, t = arguments.length, n = new Array(t), i = 0;
                  i < t;
                  i++
                )
                  n[i] = arguments[i];
                return (
                  (e = w(b(o.prototype), "doValidate", this)).call.apply(
                    e,
                    [this].concat(n)
                  ) &&
                  (!this.currentMask ||
                    (e = this.currentMask).doValidate.apply(e, n))
                );
              },
            },
            {
              key: "reset",
              value: function () {
                this.currentMask && this.currentMask.reset(),
                  this.compiledMasks.forEach(function (e) {
                    return e.reset();
                  });
              },
            },
            {
              key: "value",
              get: function () {
                return this.currentMask ? this.currentMask.value : "";
              },
              set: function (e) {
                x(b(o.prototype), "value", e, this, !0);
              },
            },
            {
              key: "unmaskedValue",
              get: function () {
                return this.currentMask ? this.currentMask.unmaskedValue : "";
              },
              set: function (e) {
                x(b(o.prototype), "unmaskedValue", e, this, !0);
              },
            },
            {
              key: "typedValue",
              get: function () {
                return this.currentMask ? this.currentMask.typedValue : "";
              },
              set: function (e) {
                var t = String(e);
                this.currentMask &&
                  ((this.currentMask.typedValue = e),
                  (t = this.currentMask.unmaskedValue)),
                  (this.unmaskedValue = t);
              },
            },
            {
              key: "isComplete",
              get: function () {
                return !!this.currentMask && this.currentMask.isComplete;
              },
            },
            {
              key: "remove",
              value: function () {
                var e,
                  t = new T();
                return (
                  this.currentMask &&
                    t
                      .aggregate(
                        (e = this.currentMask).remove.apply(e, arguments)
                      )
                      .aggregate(this._applyDispatch()),
                  t
                );
              },
            },
            {
              key: "state",
              get: function () {
                return Object.assign({}, w(b(o.prototype), "state", this), {
                  _rawInputValue: this.rawInputValue,
                  compiledMasks: this.compiledMasks.map(function (e) {
                    return e.state;
                  }),
                  currentMaskRef: this.currentMask,
                  currentMask: this.currentMask && this.currentMask.state,
                });
              },
              set: function (e) {
                var n = e.compiledMasks,
                  t = e.currentMaskRef,
                  i = e.currentMask,
                  e = cn(e, Fn);
                this.compiledMasks.forEach(function (e, t) {
                  return (e.state = n[t]);
                }),
                  null != t &&
                    ((this.currentMask = t), (this.currentMask.state = i)),
                  x(b(o.prototype), "state", e, this, !0);
              },
            },
            {
              key: "extractInput",
              value: function () {
                var e;
                return this.currentMask
                  ? (e = this.currentMask).extractInput.apply(e, arguments)
                  : "";
              },
            },
            {
              key: "extractTail",
              value: function () {
                for (
                  var e, t = arguments.length, n = new Array(t), i = 0;
                  i < t;
                  i++
                )
                  n[i] = arguments[i];
                return this.currentMask
                  ? (e = this.currentMask).extractTail.apply(e, n)
                  : (e = w(b(o.prototype), "extractTail", this)).call.apply(
                      e,
                      [this].concat(n)
                    );
              },
            },
            {
              key: "doCommit",
              value: function () {
                this.currentMask && this.currentMask.doCommit(),
                  w(b(o.prototype), "doCommit", this).call(this);
              },
            },
            {
              key: "nearestInputPos",
              value: function () {
                for (
                  var e, t = arguments.length, n = new Array(t), i = 0;
                  i < t;
                  i++
                )
                  n[i] = arguments[i];
                return this.currentMask
                  ? (e = this.currentMask).nearestInputPos.apply(e, n)
                  : (e = w(b(o.prototype), "nearestInputPos", this)).call.apply(
                      e,
                      [this].concat(n)
                    );
              },
            },
            {
              key: "overwrite",
              get: function () {
                return this.currentMask
                  ? this.currentMask.overwrite
                  : w(b(o.prototype), "overwrite", this);
              },
              set: function (e) {
                console.warn(
                  '"overwrite" option is not available in dynamic mask, use this option in siblings'
                );
              },
            },
          ]),
          o
        );
      })(),
      jn =
        ((h.DEFAULTS = {
          dispatch: function (n, e, i) {
            var o, t;
            if (e.compiledMasks.length)
              return (
                (o = e.rawInputValue),
                (t = e.compiledMasks.map(function (e, t) {
                  return (
                    e.reset(),
                    e.append(o, { raw: !0 }),
                    e.append(n, i),
                    { weight: e.rawInputValue.length, index: t }
                  );
                })),
                t.sort(function (e, t) {
                  return t.weight - e.weight;
                }),
                e.compiledMasks[t[0].index]
              );
          },
        }),
        (E.MaskedDynamic = h),
        { MASKED: "value", UNMASKED: "unmaskedValue", TYPED: "typedValue" });
    function Mn(e) {
      var n =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : jn.MASKED,
        i =
          2 < arguments.length && void 0 !== arguments[2]
            ? arguments[2]
            : jn.MASKED,
        o = D(e);
      return function (t) {
        return o.runIsolated(function (e) {
          return (e[n] = t), e[i];
        });
      };
    }
    function On(e) {
      for (
        var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), i = 1;
        i < t;
        i++
      )
        n[i - 1] = arguments[i];
      return Mn.apply(void 0, n)(e);
    }
    (E.PIPE_TYPE = jn), (E.createPipe = Mn), (E.pipe = On);
    try {
      globalThis.IMask = E;
    } catch (e) {}
    (e.HTMLContenteditableMaskElement = Dn),
      (e.HTMLMaskElement = _n),
      (e.InputMask = Ee),
      (e.MaskElement = En),
      (e.Masked = _),
      (e.MaskedDate = An),
      (e.MaskedDynamic = h),
      (e.MaskedEnum = f),
      (e.MaskedFunction = Re),
      (e.MaskedNumber = s),
      (e.MaskedPattern = $),
      (e.MaskedRange = Tn),
      (e.MaskedRegExp = l),
      (e.PIPE_TYPE = jn),
      (e.createMask = D),
      (e.createPipe = Mn),
      (e.default = E),
      (e.pipe = On),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
  !(function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "undefined" != typeof exports
      ? (module.exports = e(require("jquery")))
      : e(jQuery);
  })(function (u) {
    "use strict";
    var i,
      r = window.Slick || {};
    (i = 0),
      ((r = function (e, t) {
        var n = this;
        (n.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: u(e),
          appendDots: u(e),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (e, t) {
            return u('<button type="button" />').text(t + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (n.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          u.extend(n, n.initials),
          (n.activeBreakpoint = null),
          (n.animType = null),
          (n.animProp = null),
          (n.breakpoints = []),
          (n.breakpointSettings = []),
          (n.cssTransitions = !1),
          (n.focussed = !1),
          (n.interrupted = !1),
          (n.hidden = "hidden"),
          (n.paused = !0),
          (n.positionProp = null),
          (n.respondTo = null),
          (n.rowCount = 1),
          (n.shouldClick = !0),
          (n.$slider = u(e)),
          (n.$slidesCache = null),
          (n.transformType = null),
          (n.transitionType = null),
          (n.visibilityChange = "visibilitychange"),
          (n.windowWidth = 0),
          (n.windowTimer = null),
          (e = u(e).data("slick") || {}),
          (n.options = u.extend({}, n.defaults, t, e)),
          (n.currentSlide = n.options.initialSlide),
          (n.originalSettings = n.options),
          void 0 !== document.mozHidden
            ? ((n.hidden = "mozHidden"),
              (n.visibilityChange = "mozvisibilitychange"))
            : void 0 !== document.webkitHidden &&
              ((n.hidden = "webkitHidden"),
              (n.visibilityChange = "webkitvisibilitychange")),
          (n.autoPlay = u.proxy(n.autoPlay, n)),
          (n.autoPlayClear = u.proxy(n.autoPlayClear, n)),
          (n.autoPlayIterator = u.proxy(n.autoPlayIterator, n)),
          (n.changeSlide = u.proxy(n.changeSlide, n)),
          (n.clickHandler = u.proxy(n.clickHandler, n)),
          (n.selectHandler = u.proxy(n.selectHandler, n)),
          (n.setPosition = u.proxy(n.setPosition, n)),
          (n.swipeHandler = u.proxy(n.swipeHandler, n)),
          (n.dragHandler = u.proxy(n.dragHandler, n)),
          (n.keyHandler = u.proxy(n.keyHandler, n)),
          (n.instanceUid = i++),
          (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          n.registerBreakpoints(),
          n.init(!0);
      }).prototype.activateADA = function () {
        this.$slideTrack
          .find(".slick-active")
          .attr({ "aria-hidden": "false" })
          .find("a, input, button, select")
          .attr({ tabindex: "0" });
      }),
      (r.prototype.addSlide = r.prototype.slickAdd =
        function (e, t, n) {
          var i = this;
          if ("boolean" == typeof t) (n = t), (t = null);
          else if (t < 0 || t >= i.slideCount) return !1;
          i.unload(),
            "number" == typeof t
              ? 0 === t && 0 === i.$slides.length
                ? u(e).appendTo(i.$slideTrack)
                : n
                ? u(e).insertBefore(i.$slides.eq(t))
                : u(e).insertAfter(i.$slides.eq(t))
              : !0 === n
              ? u(e).prependTo(i.$slideTrack)
              : u(e).appendTo(i.$slideTrack),
            (i.$slides = i.$slideTrack.children(this.options.slide)),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slideTrack.append(i.$slides),
            i.$slides.each(function (e, t) {
              u(t).attr("data-slick-index", e);
            }),
            (i.$slidesCache = i.$slides),
            i.reinit();
        }),
      (r.prototype.animateHeight = function () {
        var e,
          t = this;
        1 === t.options.slidesToShow &&
          !0 === t.options.adaptiveHeight &&
          !1 === t.options.vertical &&
          ((e = t.$slides.eq(t.currentSlide).outerHeight(!0)),
          t.$list.animate({ height: e }, t.options.speed));
      }),
      (r.prototype.animateSlide = function (e, t) {
        var n = {},
          i = this;
        i.animateHeight(),
          !0 === i.options.rtl && !1 === i.options.vertical && (e = -e),
          !1 === i.transformsEnabled
            ? !1 === i.options.vertical
              ? i.$slideTrack.animate(
                  { left: e },
                  i.options.speed,
                  i.options.easing,
                  t
                )
              : i.$slideTrack.animate(
                  { top: e },
                  i.options.speed,
                  i.options.easing,
                  t
                )
            : !1 === i.cssTransitions
            ? (!0 === i.options.rtl && (i.currentLeft = -i.currentLeft),
              u({ animStart: i.currentLeft }).animate(
                { animStart: e },
                {
                  duration: i.options.speed,
                  easing: i.options.easing,
                  step: function (e) {
                    (e = Math.ceil(e)),
                      !1 === i.options.vertical
                        ? (n[i.animType] = "translate(" + e + "px, 0px)")
                        : (n[i.animType] = "translate(0px," + e + "px)"),
                      i.$slideTrack.css(n);
                  },
                  complete: function () {
                    t && t.call();
                  },
                }
              ))
            : (i.applyTransition(),
              (e = Math.ceil(e)),
              !1 === i.options.vertical
                ? (n[i.animType] = "translate3d(" + e + "px, 0px, 0px)")
                : (n[i.animType] = "translate3d(0px," + e + "px, 0px)"),
              i.$slideTrack.css(n),
              t &&
                setTimeout(function () {
                  i.disableTransition(), t.call();
                }, i.options.speed));
      }),
      (r.prototype.getNavTarget = function () {
        var e = this.options.asNavFor;
        return (e = e && null !== e ? u(e).not(this.$slider) : e);
      }),
      (r.prototype.asNavFor = function (t) {
        var e = this.getNavTarget();
        null !== e &&
          "object" == typeof e &&
          e.each(function () {
            var e = u(this).slick("getSlick");
            e.unslicked || e.slideHandler(t, !0);
          });
      }),
      (r.prototype.applyTransition = function (e) {
        var t = this,
          n = {};
        !1 === t.options.fade
          ? (n[t.transitionType] =
              t.transformType +
              " " +
              t.options.speed +
              "ms " +
              t.options.cssEase)
          : (n[t.transitionType] =
              "opacity " + t.options.speed + "ms " + t.options.cssEase),
          (!1 === t.options.fade ? t.$slideTrack : t.$slides.eq(e)).css(n);
      }),
      (r.prototype.autoPlay = function () {
        var e = this;
        e.autoPlayClear(),
          e.slideCount > e.options.slidesToShow &&
            (e.autoPlayTimer = setInterval(
              e.autoPlayIterator,
              e.options.autoplaySpeed
            ));
      }),
      (r.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
      }),
      (r.prototype.autoPlayIterator = function () {
        var e = this,
          t = e.currentSlide + e.options.slidesToScroll;
        e.paused ||
          e.interrupted ||
          e.focussed ||
          (!1 === e.options.infinite &&
            (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1
              ? (e.direction = 0)
              : 0 === e.direction &&
                ((t = e.currentSlide - e.options.slidesToScroll),
                e.currentSlide - 1 == 0 && (e.direction = 1))),
          e.slideHandler(t));
      }),
      (r.prototype.buildArrows = function () {
        var e = this;
        !0 === e.options.arrows &&
          ((e.$prevArrow = u(e.options.prevArrow).addClass("slick-arrow")),
          (e.$nextArrow = u(e.options.nextArrow).addClass("slick-arrow")),
          e.slideCount > e.options.slidesToShow
            ? (e.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.htmlExpr.test(e.options.prevArrow) &&
                e.$prevArrow.prependTo(e.options.appendArrows),
              e.htmlExpr.test(e.options.nextArrow) &&
                e.$nextArrow.appendTo(e.options.appendArrows),
              !0 !== e.options.infinite &&
                e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : e.$prevArrow
                .add(e.$nextArrow)
                .addClass("slick-hidden")
                .attr({ "aria-disabled": "true", tabindex: "-1" }));
      }),
      (r.prototype.buildDots = function () {
        var e,
          t,
          n = this;
        if (!0 === n.options.dots) {
          for (
            n.$slider.addClass("slick-dotted"),
              t = u("<ul />").addClass(n.options.dotsClass),
              e = 0;
            e <= n.getDotCount();
            e += 1
          )
            t.append(
              u("<li />").append(n.options.customPaging.call(this, n, e))
            );
          (n.$dots = t.appendTo(n.options.appendDots)),
            n.$dots.find("li").first().addClass("slick-active");
        }
      }),
      (r.prototype.buildOut = function () {
        var e = this;
        (e.$slides = e.$slider
          .children(e.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.$slides.each(function (e, t) {
            u(t)
              .attr("data-slick-index", e)
              .data("originalStyling", u(t).attr("style") || "");
          }),
          e.$slider.addClass("slick-slider"),
          (e.$slideTrack =
            0 === e.slideCount
              ? u('<div class="slick-track"/>').appendTo(e.$slider)
              : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          e.$slideTrack.css("opacity", 0),
          (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
            (e.options.slidesToScroll = 1),
          u("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
          e.setupInfinite(),
          e.buildArrows(),
          e.buildDots(),
          e.updateDots(),
          e.setSlideClasses(
            "number" == typeof e.currentSlide ? e.currentSlide : 0
          ),
          !0 === e.options.draggable && e.$list.addClass("draggable");
      }),
      (r.prototype.buildRows = function () {
        var e,
          t,
          n,
          i = this,
          o = document.createDocumentFragment(),
          r = i.$slider.children();
        if (1 < i.options.rows) {
          for (
            n = i.options.slidesPerRow * i.options.rows,
              t = Math.ceil(r.length / n),
              e = 0;
            e < t;
            e++
          ) {
            for (
              var s = document.createElement("div"), a = 0;
              a < i.options.rows;
              a++
            ) {
              for (
                var l = document.createElement("div"), u = 0;
                u < i.options.slidesPerRow;
                u++
              ) {
                var c = e * n + (a * i.options.slidesPerRow + u);
                r.get(c) && l.appendChild(r.get(c));
              }
              s.appendChild(l);
            }
            o.appendChild(s);
          }
          i.$slider.empty().append(o),
            i.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / i.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (r.prototype.checkResponsive = function (e, t) {
        var n,
          i,
          o,
          r = this,
          s = !1,
          a = r.$slider.width(),
          l = window.innerWidth || u(window).width();
        if (
          ("window" === r.respondTo
            ? (o = l)
            : "slider" === r.respondTo
            ? (o = a)
            : "min" === r.respondTo && (o = Math.min(l, a)),
          r.options.responsive &&
            r.options.responsive.length &&
            null !== r.options.responsive)
        ) {
          for (n in ((i = null), r.breakpoints))
            r.breakpoints.hasOwnProperty(n) &&
              (!1 === r.originalSettings.mobileFirst
                ? o < r.breakpoints[n] && (i = r.breakpoints[n])
                : o > r.breakpoints[n] && (i = r.breakpoints[n]));
          null !== i
            ? (null !== r.activeBreakpoint && i === r.activeBreakpoint && !t) ||
              ((r.activeBreakpoint = i),
              "unslick" === r.breakpointSettings[i]
                ? r.unslick(i)
                : ((r.options = u.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[i]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (s = i))
            : null !== r.activeBreakpoint &&
              ((r.activeBreakpoint = null),
              (r.options = r.originalSettings),
              !0 === e && (r.currentSlide = r.options.initialSlide),
              r.refresh(e),
              (s = i)),
            e || !1 === s || r.$slider.trigger("breakpoint", [r, s]);
        }
      }),
      (r.prototype.changeSlide = function (e, t) {
        var n,
          i = this,
          o = u(e.currentTarget);
        switch (
          (o.is("a") && e.preventDefault(),
          o.is("li") || (o = o.closest("li")),
          (n =
            i.slideCount % i.options.slidesToScroll != 0
              ? 0
              : (i.slideCount - i.currentSlide) % i.options.slidesToScroll),
          e.data.message)
        ) {
          case "previous":
            (r =
              0 == n ? i.options.slidesToScroll : i.options.slidesToShow - n),
              i.slideCount > i.options.slidesToShow &&
                i.slideHandler(i.currentSlide - r, !1, t);
            break;
          case "next":
            (r = 0 == n ? i.options.slidesToScroll : n),
              i.slideCount > i.options.slidesToShow &&
                i.slideHandler(i.currentSlide + r, !1, t);
            break;
          case "index":
            var r =
              0 === e.data.index
                ? 0
                : e.data.index || o.index() * i.options.slidesToScroll;
            i.slideHandler(i.checkNavigable(r), !1, t),
              o.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (r.prototype.checkNavigable = function (e) {
        var t = this.getNavigableIndexes(),
          n = 0;
        if (e > t[t.length - 1]) e = t[t.length - 1];
        else
          for (var i in t) {
            if (e < t[i]) {
              e = n;
              break;
            }
            n = t[i];
          }
        return e;
      }),
      (r.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots &&
          null !== e.$dots &&
          (u("li", e.$dots)
            .off("click.slick", e.changeSlide)
            .off("mouseenter.slick", u.proxy(e.interrupt, e, !0))
            .off("mouseleave.slick", u.proxy(e.interrupt, e, !1)),
          !0 === e.options.accessibility &&
            e.$dots.off("keydown.slick", e.keyHandler)),
          e.$slider.off("focus.slick blur.slick"),
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
            e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
            !0 === e.options.accessibility &&
              (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
              e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
          e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
          e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
          e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
          e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
          e.$list.off("click.slick", e.clickHandler),
          u(document).off(e.visibilityChange, e.visibility),
          e.cleanUpSlideEvents(),
          !0 === e.options.accessibility &&
            e.$list.off("keydown.slick", e.keyHandler),
          !0 === e.options.focusOnSelect &&
            u(e.$slideTrack).children().off("click.slick", e.selectHandler),
          u(window).off(
            "orientationchange.slick.slick-" + e.instanceUid,
            e.orientationChange
          ),
          u(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
          u("[draggable!=true]", e.$slideTrack).off(
            "dragstart",
            e.preventDefault
          ),
          u(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
      }),
      (r.prototype.cleanUpSlideEvents = function () {
        this.$list.off("mouseenter.slick", u.proxy(this.interrupt, this, !0)),
          this.$list.off("mouseleave.slick", u.proxy(this.interrupt, this, !1));
      }),
      (r.prototype.cleanUpRows = function () {
        var e;
        1 < this.options.rows &&
          ((e = this.$slides.children().children()).removeAttr("style"),
          this.$slider.empty().append(e));
      }),
      (r.prototype.clickHandler = function (e) {
        !1 === this.shouldClick &&
          (e.stopImmediatePropagation(),
          e.stopPropagation(),
          e.preventDefault());
      }),
      (r.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(),
          (t.touchObject = {}),
          t.cleanUpEvents(),
          u(".slick-cloned", t.$slider).detach(),
          t.$dots && t.$dots.remove(),
          t.$prevArrow &&
            t.$prevArrow.length &&
            (t.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
          t.$nextArrow &&
            t.$nextArrow.length &&
            (t.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
          t.$slides &&
            (t.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                u(this).attr("style", u(this).data("originalStyling"));
              }),
            t.$slideTrack.children(this.options.slide).detach(),
            t.$slideTrack.detach(),
            t.$list.detach(),
            t.$slider.append(t.$slides)),
          t.cleanUpRows(),
          t.$slider.removeClass("slick-slider"),
          t.$slider.removeClass("slick-initialized"),
          t.$slider.removeClass("slick-dotted"),
          (t.unslicked = !0),
          e || t.$slider.trigger("destroy", [t]);
      }),
      (r.prototype.disableTransition = function (e) {
        var t = {};
        (t[this.transitionType] = ""),
          (!1 === this.options.fade
            ? this.$slideTrack
            : this.$slides.eq(e)
          ).css(t);
      }),
      (r.prototype.fadeSlide = function (e, t) {
        var n = this;
        !1 === n.cssTransitions
          ? (n.$slides.eq(e).css({ zIndex: n.options.zIndex }),
            n.$slides
              .eq(e)
              .animate({ opacity: 1 }, n.options.speed, n.options.easing, t))
          : (n.applyTransition(e),
            n.$slides.eq(e).css({ opacity: 1, zIndex: n.options.zIndex }),
            t &&
              setTimeout(function () {
                n.disableTransition(e), t.call();
              }, n.options.speed));
      }),
      (r.prototype.fadeSlideOut = function (e) {
        !1 === this.cssTransitions
          ? this.$slides
              .eq(e)
              .animate(
                { opacity: 0, zIndex: this.options.zIndex - 2 },
                this.options.speed,
                this.options.easing
              )
          : (this.applyTransition(e),
            this.$slides
              .eq(e)
              .css({ opacity: 0, zIndex: this.options.zIndex - 2 }));
      }),
      (r.prototype.filterSlides = r.prototype.slickFilter =
        function (e) {
          null !== e &&
            ((this.$slidesCache = this.$slides),
            this.unload(),
            this.$slideTrack.children(this.options.slide).detach(),
            this.$slidesCache.filter(e).appendTo(this.$slideTrack),
            this.reinit());
        }),
      (r.prototype.focusHandler = function () {
        var n = this;
        n.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*", function (e) {
            e.stopImmediatePropagation();
            var t = u(this);
            setTimeout(function () {
              n.options.pauseOnFocus &&
                ((n.focussed = t.is(":focus")), n.autoPlay());
            }, 0);
          });
      }),
      (r.prototype.getCurrent = r.prototype.slickCurrentSlide =
        function () {
          return this.currentSlide;
        }),
      (r.prototype.getDotCount = function () {
        var e = this,
          t = 0,
          n = 0,
          i = 0;
        if (!0 === e.options.infinite)
          if (e.slideCount <= e.options.slidesToShow) ++i;
          else
            for (; t < e.slideCount; )
              ++i,
                (t = n + e.options.slidesToScroll),
                (n +=
                  e.options.slidesToScroll <= e.options.slidesToShow
                    ? e.options.slidesToScroll
                    : e.options.slidesToShow);
        else if (!0 === e.options.centerMode) i = e.slideCount;
        else if (e.options.asNavFor)
          for (; t < e.slideCount; )
            ++i,
              (t = n + e.options.slidesToScroll),
              (n +=
                e.options.slidesToScroll <= e.options.slidesToShow
                  ? e.options.slidesToScroll
                  : e.options.slidesToShow);
        else
          i =
            1 +
            Math.ceil(
              (e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll
            );
        return i - 1;
      }),
      (r.prototype.getLeft = function (e) {
        var t,
          n,
          i = this,
          o = 0;
        return (
          (i.slideOffset = 0),
          (t = i.$slides.first().outerHeight(!0)),
          !0 === i.options.infinite
            ? (i.slideCount > i.options.slidesToShow &&
                ((i.slideOffset = i.slideWidth * i.options.slidesToShow * -1),
                (n = -1),
                !0 === i.options.vertical &&
                  !0 === i.options.centerMode &&
                  (2 === i.options.slidesToShow
                    ? (n = -1.5)
                    : 1 === i.options.slidesToShow && (n = -2)),
                (o = t * i.options.slidesToShow * n)),
              i.slideCount % i.options.slidesToScroll != 0 &&
                e + i.options.slidesToScroll > i.slideCount &&
                i.slideCount > i.options.slidesToShow &&
                (o =
                  e > i.slideCount
                    ? ((i.slideOffset =
                        (i.options.slidesToShow - (e - i.slideCount)) *
                        i.slideWidth *
                        -1),
                      (i.options.slidesToShow - (e - i.slideCount)) * t * -1)
                    : ((i.slideOffset =
                        (i.slideCount % i.options.slidesToScroll) *
                        i.slideWidth *
                        -1),
                      (i.slideCount % i.options.slidesToScroll) * t * -1)))
            : e + i.options.slidesToShow > i.slideCount &&
              ((i.slideOffset =
                (e + i.options.slidesToShow - i.slideCount) * i.slideWidth),
              (o = (e + i.options.slidesToShow - i.slideCount) * t)),
          i.slideCount <= i.options.slidesToShow && (o = i.slideOffset = 0),
          !0 === i.options.centerMode && i.slideCount <= i.options.slidesToShow
            ? (i.slideOffset =
                (i.slideWidth * Math.floor(i.options.slidesToShow)) / 2 -
                (i.slideWidth * i.slideCount) / 2)
            : !0 === i.options.centerMode && !0 === i.options.infinite
            ? (i.slideOffset +=
                i.slideWidth * Math.floor(i.options.slidesToShow / 2) -
                i.slideWidth)
            : !0 === i.options.centerMode &&
              ((i.slideOffset = 0),
              (i.slideOffset +=
                i.slideWidth * Math.floor(i.options.slidesToShow / 2))),
          (n =
            !1 === i.options.vertical
              ? e * i.slideWidth * -1 + i.slideOffset
              : e * t * -1 + o),
          !0 === i.options.variableWidth &&
            ((t =
              i.slideCount <= i.options.slidesToShow ||
              !1 === i.options.infinite
                ? i.$slideTrack.children(".slick-slide").eq(e)
                : i.$slideTrack
                    .children(".slick-slide")
                    .eq(e + i.options.slidesToShow)),
            (n =
              !0 === i.options.rtl
                ? t[0]
                  ? -1 * (i.$slideTrack.width() - t[0].offsetLeft - t.width())
                  : 0
                : t[0]
                ? -1 * t[0].offsetLeft
                : 0),
            !0 === i.options.centerMode &&
              ((t =
                i.slideCount <= i.options.slidesToShow ||
                !1 === i.options.infinite
                  ? i.$slideTrack.children(".slick-slide").eq(e)
                  : i.$slideTrack
                      .children(".slick-slide")
                      .eq(e + i.options.slidesToShow + 1)),
              (n =
                !0 === i.options.rtl
                  ? t[0]
                    ? -1 * (i.$slideTrack.width() - t[0].offsetLeft - t.width())
                    : 0
                  : t[0]
                  ? -1 * t[0].offsetLeft
                  : 0),
              (n += (i.$list.width() - t.outerWidth()) / 2))),
          n
        );
      }),
      (r.prototype.getOption = r.prototype.slickGetOption =
        function (e) {
          return this.options[e];
        }),
      (r.prototype.getNavigableIndexes = function () {
        for (
          var e = this,
            t = 0,
            n = 0,
            i = [],
            o =
              !1 === e.options.infinite
                ? e.slideCount
                : ((t = -1 * e.options.slidesToScroll),
                  (n = -1 * e.options.slidesToScroll),
                  2 * e.slideCount);
          t < o;

        )
          i.push(t),
            (t = n + e.options.slidesToScroll),
            (n +=
              e.options.slidesToScroll <= e.options.slidesToShow
                ? e.options.slidesToScroll
                : e.options.slidesToShow);
        return i;
      }),
      (r.prototype.getSlick = function () {
        return this;
      }),
      (r.prototype.getSlideCount = function () {
        var n,
          i = this,
          o =
            !0 === i.options.centerMode
              ? i.slideWidth * Math.floor(i.options.slidesToShow / 2)
              : 0;
        return !0 === i.options.swipeToSlide
          ? (i.$slideTrack.find(".slick-slide").each(function (e, t) {
              if (t.offsetLeft - o + u(t).outerWidth() / 2 > -1 * i.swipeLeft)
                return (n = t), !1;
            }),
            Math.abs(u(n).attr("data-slick-index") - i.currentSlide) || 1)
          : i.options.slidesToScroll;
      }),
      (r.prototype.goTo = r.prototype.slickGoTo =
        function (e, t) {
          this.changeSlide(
            { data: { message: "index", index: parseInt(e) } },
            t
          );
        }),
      (r.prototype.init = function (e) {
        var t = this;
        u(t.$slider).hasClass("slick-initialized") ||
          (u(t.$slider).addClass("slick-initialized"),
          t.buildRows(),
          t.buildOut(),
          t.setProps(),
          t.startLoad(),
          t.loadSlider(),
          t.initializeEvents(),
          t.updateArrows(),
          t.updateDots(),
          t.checkResponsive(!0),
          t.focusHandler()),
          e && t.$slider.trigger("init", [t]),
          !0 === t.options.accessibility && t.initADA(),
          t.options.autoplay && ((t.paused = !1), t.autoPlay());
      }),
      (r.prototype.initADA = function () {
        var n = this,
          i = Math.ceil(n.slideCount / n.options.slidesToShow),
          o = n.getNavigableIndexes().filter(function (e) {
            return 0 <= e && e < n.slideCount;
          });
        n.$slides
          .add(n.$slideTrack.find(".slick-cloned"))
          .attr({ "aria-hidden": "true", tabindex: "-1" })
          .find("a, input, button, select")
          .attr({ tabindex: "-1" }),
          null !== n.$dots &&
            (n.$slides
              .not(n.$slideTrack.find(".slick-cloned"))
              .each(function (e) {
                var t = o.indexOf(e);
                u(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + n.instanceUid + e,
                  tabindex: -1,
                }),
                  -1 !== t &&
                    u(this).attr({
                      "aria-describedby":
                        "slick-slide-control" + n.instanceUid + t,
                    });
              }),
            n.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (e) {
                var t = o[e];
                u(this).attr({ role: "presentation" }),
                  u(this)
                    .find("button")
                    .first()
                    .attr({
                      role: "tab",
                      id: "slick-slide-control" + n.instanceUid + e,
                      "aria-controls": "slick-slide" + n.instanceUid + t,
                      "aria-label": e + 1 + " of " + i,
                      "aria-selected": null,
                      tabindex: "-1",
                    });
              })
              .eq(n.currentSlide)
              .find("button")
              .attr({ "aria-selected": "true", tabindex: "0" })
              .end());
        for (var e = n.currentSlide, t = e + n.options.slidesToShow; e < t; e++)
          n.$slides.eq(e).attr("tabindex", 0);
        n.activateADA();
      }),
      (r.prototype.initArrowEvents = function () {
        var e = this;
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow
            .off("click.slick")
            .on("click.slick", { message: "previous" }, e.changeSlide),
          e.$nextArrow
            .off("click.slick")
            .on("click.slick", { message: "next" }, e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow.on("keydown.slick", e.keyHandler),
            e.$nextArrow.on("keydown.slick", e.keyHandler)));
      }),
      (r.prototype.initDotEvents = function () {
        var e = this;
        !0 === e.options.dots &&
          (u("li", e.$dots).on(
            "click.slick",
            { message: "index" },
            e.changeSlide
          ),
          !0 === e.options.accessibility &&
            e.$dots.on("keydown.slick", e.keyHandler)),
          !0 === e.options.dots &&
            !0 === e.options.pauseOnDotsHover &&
            u("li", e.$dots)
              .on("mouseenter.slick", u.proxy(e.interrupt, e, !0))
              .on("mouseleave.slick", u.proxy(e.interrupt, e, !1));
      }),
      (r.prototype.initSlideEvents = function () {
        this.options.pauseOnHover &&
          (this.$list.on("mouseenter.slick", u.proxy(this.interrupt, this, !0)),
          this.$list.on("mouseleave.slick", u.proxy(this.interrupt, this, !1)));
      }),
      (r.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(),
          e.initDotEvents(),
          e.initSlideEvents(),
          e.$list.on(
            "touchstart.slick mousedown.slick",
            { action: "start" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchmove.slick mousemove.slick",
            { action: "move" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchend.slick mouseup.slick",
            { action: "end" },
            e.swipeHandler
          ),
          e.$list.on(
            "touchcancel.slick mouseleave.slick",
            { action: "end" },
            e.swipeHandler
          ),
          e.$list.on("click.slick", e.clickHandler),
          u(document).on(e.visibilityChange, u.proxy(e.visibility, e)),
          !0 === e.options.accessibility &&
            e.$list.on("keydown.slick", e.keyHandler),
          !0 === e.options.focusOnSelect &&
            u(e.$slideTrack).children().on("click.slick", e.selectHandler),
          u(window).on(
            "orientationchange.slick.slick-" + e.instanceUid,
            u.proxy(e.orientationChange, e)
          ),
          u(window).on(
            "resize.slick.slick-" + e.instanceUid,
            u.proxy(e.resize, e)
          ),
          u("[draggable!=true]", e.$slideTrack).on(
            "dragstart",
            e.preventDefault
          ),
          u(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
          u(e.setPosition);
      }),
      (r.prototype.initUI = function () {
        !0 === this.options.arrows &&
          this.slideCount > this.options.slidesToShow &&
          (this.$prevArrow.show(), this.$nextArrow.show()),
          !0 === this.options.dots &&
            this.slideCount > this.options.slidesToShow &&
            this.$dots.show();
      }),
      (r.prototype.keyHandler = function (e) {
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === e.keyCode && !0 === this.options.accessibility
            ? this.changeSlide({
                data: {
                  message: !0 === this.options.rtl ? "next" : "previous",
                },
              })
            : 39 === e.keyCode &&
              !0 === this.options.accessibility &&
              this.changeSlide({
                data: {
                  message: !0 === this.options.rtl ? "previous" : "next",
                },
              }));
      }),
      (r.prototype.lazyLoad = function () {
        function e(e) {
          u("img[data-lazy]", e).each(function () {
            var e = u(this),
              t = u(this).attr("data-lazy"),
              n = u(this).attr("data-srcset"),
              i = u(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
              o = document.createElement("img");
            (o.onload = function () {
              e.animate({ opacity: 0 }, 100, function () {
                n && (e.attr("srcset", n), i && e.attr("sizes", i)),
                  e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                    e.removeAttr(
                      "data-lazy data-srcset data-sizes"
                    ).removeClass("slick-loading");
                  }),
                  r.$slider.trigger("lazyLoaded", [r, e, t]);
              });
            }),
              (o.onerror = function () {
                e
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  r.$slider.trigger("lazyLoadError", [r, e, t]);
              }),
              (o.src = t);
          });
        }
        var t,
          n,
          i,
          r = this;
        if (
          (!0 === r.options.centerMode
            ? (i =
                !0 === r.options.infinite
                  ? (n = r.currentSlide + (r.options.slidesToShow / 2 + 1)) +
                    r.options.slidesToShow +
                    2
                  : ((n = Math.max(
                      0,
                      r.currentSlide - (r.options.slidesToShow / 2 + 1)
                    )),
                    r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide))
            : ((n = r.options.infinite
                ? r.options.slidesToShow + r.currentSlide
                : r.currentSlide),
              (i = Math.ceil(n + r.options.slidesToShow)),
              !0 === r.options.fade &&
                (0 < n && n--, i <= r.slideCount && i++)),
          (t = r.$slider.find(".slick-slide").slice(n, i)),
          "anticipated" === r.options.lazyLoad)
        )
          for (
            var o = n - 1, s = i, a = r.$slider.find(".slick-slide"), l = 0;
            l < r.options.slidesToScroll;
            l++
          )
            o < 0 && (o = r.slideCount - 1),
              (t = (t = t.add(a.eq(o))).add(a.eq(s))),
              o--,
              s++;
        e(t),
          r.slideCount <= r.options.slidesToShow
            ? e(r.$slider.find(".slick-slide"))
            : r.currentSlide >= r.slideCount - r.options.slidesToShow
            ? e(
                r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)
              )
            : 0 === r.currentSlide &&
              e(
                r.$slider
                  .find(".slick-cloned")
                  .slice(-1 * r.options.slidesToShow)
              );
      }),
      (r.prototype.loadSlider = function () {
        this.setPosition(),
          this.$slideTrack.css({ opacity: 1 }),
          this.$slider.removeClass("slick-loading"),
          this.initUI(),
          "progressive" === this.options.lazyLoad && this.progressiveLazyLoad();
      }),
      (r.prototype.next = r.prototype.slickNext =
        function () {
          this.changeSlide({ data: { message: "next" } });
        }),
      (r.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition();
      }),
      (r.prototype.pause = r.prototype.slickPause =
        function () {
          this.autoPlayClear(), (this.paused = !0);
        }),
      (r.prototype.play = r.prototype.slickPlay =
        function () {
          this.autoPlay(),
            (this.options.autoplay = !0),
            (this.paused = !1),
            (this.focussed = !1),
            (this.interrupted = !1);
        }),
      (r.prototype.postSlide = function (e) {
        var t = this;
        t.unslicked ||
          (t.$slider.trigger("afterChange", [t, e]),
          (t.animating = !1),
          t.slideCount > t.options.slidesToShow && t.setPosition(),
          (t.swipeLeft = null),
          t.options.autoplay && t.autoPlay(),
          !0 === t.options.accessibility &&
            (t.initADA(),
            t.options.focusOnChange &&
              u(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
      }),
      (r.prototype.prev = r.prototype.slickPrev =
        function () {
          this.changeSlide({ data: { message: "previous" } });
        }),
      (r.prototype.preventDefault = function (e) {
        e.preventDefault();
      }),
      (r.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t,
          n,
          i,
          o,
          r = this,
          s = u("img[data-lazy]", r.$slider);
        s.length
          ? ((t = s.first()),
            (n = t.attr("data-lazy")),
            (i = t.attr("data-srcset")),
            (o = t.attr("data-sizes") || r.$slider.attr("data-sizes")),
            ((s = document.createElement("img")).onload = function () {
              i && (t.attr("srcset", i), o && t.attr("sizes", o)),
                t
                  .attr("src", n)
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading"),
                !0 === r.options.adaptiveHeight && r.setPosition(),
                r.$slider.trigger("lazyLoaded", [r, t, n]),
                r.progressiveLazyLoad();
            }),
            (s.onerror = function () {
              e < 3
                ? setTimeout(function () {
                    r.progressiveLazyLoad(e + 1);
                  }, 500)
                : (t
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  r.$slider.trigger("lazyLoadError", [r, t, n]),
                  r.progressiveLazyLoad());
            }),
            (s.src = n))
          : r.$slider.trigger("allImagesLoaded", [r]);
      }),
      (r.prototype.refresh = function (e) {
        var t = this,
          n = t.slideCount - t.options.slidesToShow;
        !t.options.infinite && t.currentSlide > n && (t.currentSlide = n),
          t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
          (n = t.currentSlide),
          t.destroy(!0),
          u.extend(t, t.initials, { currentSlide: n }),
          t.init(),
          e || t.changeSlide({ data: { message: "index", index: n } }, !1);
      }),
      (r.prototype.registerBreakpoints = function () {
        var e,
          t,
          n,
          i = this,
          o = i.options.responsive || null;
        if ("array" === u.type(o) && o.length) {
          for (e in ((i.respondTo = i.options.respondTo || "window"), o))
            if (((n = i.breakpoints.length - 1), o.hasOwnProperty(e))) {
              for (t = o[e].breakpoint; 0 <= n; )
                i.breakpoints[n] &&
                  i.breakpoints[n] === t &&
                  i.breakpoints.splice(n, 1),
                  n--;
              i.breakpoints.push(t), (i.breakpointSettings[t] = o[e].settings);
            }
          i.breakpoints.sort(function (e, t) {
            return i.options.mobileFirst ? e - t : t - e;
          });
        }
      }),
      (r.prototype.reinit = function () {
        var e = this;
        (e.$slides = e.$slideTrack
          .children(e.options.slide)
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.currentSlide >= e.slideCount &&
            0 !== e.currentSlide &&
            (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          e.registerBreakpoints(),
          e.setProps(),
          e.setupInfinite(),
          e.buildArrows(),
          e.updateArrows(),
          e.initArrowEvents(),
          e.buildDots(),
          e.updateDots(),
          e.initDotEvents(),
          e.cleanUpSlideEvents(),
          e.initSlideEvents(),
          e.checkResponsive(!1, !0),
          !0 === e.options.focusOnSelect &&
            u(e.$slideTrack).children().on("click.slick", e.selectHandler),
          e.setSlideClasses(
            "number" == typeof e.currentSlide ? e.currentSlide : 0
          ),
          e.setPosition(),
          e.focusHandler(),
          (e.paused = !e.options.autoplay),
          e.autoPlay(),
          e.$slider.trigger("reInit", [e]);
      }),
      (r.prototype.resize = function () {
        var e = this;
        u(window).width() !== e.windowWidth &&
          (clearTimeout(e.windowDelay),
          (e.windowDelay = window.setTimeout(function () {
            (e.windowWidth = u(window).width()),
              e.checkResponsive(),
              e.unslicked || e.setPosition();
          }, 50)));
      }),
      (r.prototype.removeSlide = r.prototype.slickRemove =
        function (e, t, n) {
          var i = this;
          if (
            ((e =
              "boolean" == typeof e
                ? !0 === (t = e)
                  ? 0
                  : i.slideCount - 1
                : !0 === t
                ? --e
                : e),
            i.slideCount < 1 || e < 0 || e > i.slideCount - 1)
          )
            return !1;
          i.unload(),
            (!0 === n
              ? i.$slideTrack.children()
              : i.$slideTrack.children(this.options.slide).eq(e)
            ).remove(),
            (i.$slides = i.$slideTrack.children(this.options.slide)),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slideTrack.append(i.$slides),
            (i.$slidesCache = i.$slides),
            i.reinit();
        }),
      (r.prototype.setCSS = function (e) {
        var t,
          n,
          i = this,
          o = {};
        !0 === i.options.rtl && (e = -e),
          (t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px"),
          (n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px"),
          (o[i.positionProp] = e),
          !1 !== i.transformsEnabled &&
            (!(o = {}) === i.cssTransitions
              ? (o[i.animType] = "translate(" + t + ", " + n + ")")
              : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)")),
          i.$slideTrack.css(o);
      }),
      (r.prototype.setDimensions = function () {
        var e = this,
          t =
            (!1 === e.options.vertical
              ? !0 === e.options.centerMode &&
                e.$list.css({ padding: "0px " + e.options.centerPadding })
              : (e.$list.height(
                  e.$slides.first().outerHeight(!0) * e.options.slidesToShow
                ),
                !0 === e.options.centerMode &&
                  e.$list.css({ padding: e.options.centerPadding + " 0px" })),
            (e.listWidth = e.$list.width()),
            (e.listHeight = e.$list.height()),
            !1 === e.options.vertical && !1 === e.options.variableWidth
              ? ((e.slideWidth = Math.ceil(
                  e.listWidth / e.options.slidesToShow
                )),
                e.$slideTrack.width(
                  Math.ceil(
                    e.slideWidth * e.$slideTrack.children(".slick-slide").length
                  )
                ))
              : !0 === e.options.variableWidth
              ? e.$slideTrack.width(5e3 * e.slideCount)
              : ((e.slideWidth = Math.ceil(e.listWidth)),
                e.$slideTrack.height(
                  Math.ceil(
                    e.$slides.first().outerHeight(!0) *
                      e.$slideTrack.children(".slick-slide").length
                  )
                )),
            e.$slides.first().outerWidth(!0) - e.$slides.first().width());
        !1 === e.options.variableWidth &&
          e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
      }),
      (r.prototype.setFade = function () {
        var n,
          i = this;
        i.$slides.each(function (e, t) {
          (n = i.slideWidth * e * -1),
            !0 === i.options.rtl
              ? u(t).css({
                  position: "relative",
                  right: n,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0,
                })
              : u(t).css({
                  position: "relative",
                  left: n,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          i.$slides
            .eq(i.currentSlide)
            .css({ zIndex: i.options.zIndex - 1, opacity: 1 });
      }),
      (r.prototype.setHeight = function () {
        var e;
        1 === this.options.slidesToShow &&
          !0 === this.options.adaptiveHeight &&
          !1 === this.options.vertical &&
          ((e = this.$slides.eq(this.currentSlide).outerHeight(!0)),
          this.$list.css("height", e));
      }),
      (r.prototype.setOption = r.prototype.slickSetOption =
        function () {
          var e,
            t,
            n,
            i,
            o,
            r = this,
            s = !1;
          if (
            ("object" === u.type(arguments[0])
              ? ((n = arguments[0]), (s = arguments[1]), (o = "multiple"))
              : "string" === u.type(arguments[0]) &&
                ((n = arguments[0]),
                (i = arguments[1]),
                (s = arguments[2]),
                "responsive" === arguments[0] &&
                "array" === u.type(arguments[1])
                  ? (o = "responsive")
                  : void 0 !== arguments[1] && (o = "single")),
            "single" === o)
          )
            r.options[n] = i;
          else if ("multiple" === o)
            u.each(n, function (e, t) {
              r.options[e] = t;
            });
          else if ("responsive" === o)
            for (t in i)
              if ("array" !== u.type(r.options.responsive))
                r.options.responsive = [i[t]];
              else {
                for (e = r.options.responsive.length - 1; 0 <= e; )
                  r.options.responsive[e].breakpoint === i[t].breakpoint &&
                    r.options.responsive.splice(e, 1),
                    e--;
                r.options.responsive.push(i[t]);
              }
          s && (r.unload(), r.reinit());
        }),
      (r.prototype.setPosition = function () {
        this.setDimensions(),
          this.setHeight(),
          !1 === this.options.fade
            ? this.setCSS(this.getLeft(this.currentSlide))
            : this.setFade(),
          this.$slider.trigger("setPosition", [this]);
      }),
      (r.prototype.setProps = function () {
        var e = this,
          t = document.body.style;
        (e.positionProp = !0 === e.options.vertical ? "top" : "left"),
          "top" === e.positionProp
            ? e.$slider.addClass("slick-vertical")
            : e.$slider.removeClass("slick-vertical"),
          (void 0 === t.WebkitTransition &&
            void 0 === t.MozTransition &&
            void 0 === t.msTransition) ||
            (!0 === e.options.useCSS && (e.cssTransitions = !0)),
          e.options.fade &&
            ("number" == typeof e.options.zIndex
              ? e.options.zIndex < 3 && (e.options.zIndex = 3)
              : (e.options.zIndex = e.defaults.zIndex)),
          void 0 !== t.OTransform &&
            ((e.animType = "OTransform"),
            (e.transformType = "-o-transform"),
            (e.transitionType = "OTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.webkitPerspective &&
              (e.animType = !1)),
          void 0 !== t.MozTransform &&
            ((e.animType = "MozTransform"),
            (e.transformType = "-moz-transform"),
            (e.transitionType = "MozTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.MozPerspective &&
              (e.animType = !1)),
          void 0 !== t.webkitTransform &&
            ((e.animType = "webkitTransform"),
            (e.transformType = "-webkit-transform"),
            (e.transitionType = "webkitTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.webkitPerspective &&
              (e.animType = !1)),
          void 0 !== t.msTransform &&
            ((e.animType = "msTransform"),
            (e.transformType = "-ms-transform"),
            (e.transitionType = "msTransition"),
            void 0 === t.msTransform && (e.animType = !1)),
          void 0 !== t.transform &&
            !1 !== e.animType &&
            ((e.animType = "transform"),
            (e.transformType = "transform"),
            (e.transitionType = "transition")),
          (e.transformsEnabled =
            e.options.useTransform && null !== e.animType && !1 !== e.animType);
      }),
      (r.prototype.setSlideClasses = function (e) {
        var t,
          n,
          i,
          o = this,
          r = o.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true");
        o.$slides.eq(e).addClass("slick-current"),
          !0 === o.options.centerMode
            ? ((n = o.options.slidesToShow % 2 == 0 ? 1 : 0),
              (i = Math.floor(o.options.slidesToShow / 2)),
              !0 === o.options.infinite &&
                (i <= e && e <= o.slideCount - 1 - i
                  ? o.$slides
                      .slice(e - i + n, e + i + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((t = o.options.slidesToShow + e),
                    r
                      .slice(t - i + 1 + n, t + i + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === e
                  ? r
                      .eq(r.length - 1 - o.options.slidesToShow)
                      .addClass("slick-center")
                  : e === o.slideCount - 1 &&
                    r.eq(o.options.slidesToShow).addClass("slick-center")),
              o.$slides.eq(e).addClass("slick-center"))
            : 0 <= e && e <= o.slideCount - o.options.slidesToShow
            ? o.$slides
                .slice(e, e + o.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : r.length <= o.options.slidesToShow
            ? r.addClass("slick-active").attr("aria-hidden", "false")
            : ((n = o.slideCount % o.options.slidesToShow),
              (t = !0 === o.options.infinite ? o.options.slidesToShow + e : e),
              (o.options.slidesToShow == o.options.slidesToScroll &&
              o.slideCount - e < o.options.slidesToShow
                ? r.slice(t - (o.options.slidesToShow - n), t + n)
                : r.slice(t, t + o.options.slidesToShow)
              )
                .addClass("slick-active")
                .attr("aria-hidden", "false")),
          ("ondemand" !== o.options.lazyLoad &&
            "anticipated" !== o.options.lazyLoad) ||
            o.lazyLoad();
      }),
      (r.prototype.setupInfinite = function () {
        var e,
          t,
          n,
          i = this;
        if (
          (!0 === i.options.fade && (i.options.centerMode = !1),
          !0 === i.options.infinite &&
            !1 === i.options.fade &&
            ((t = null), i.slideCount > i.options.slidesToShow))
        ) {
          for (
            n =
              !0 === i.options.centerMode
                ? i.options.slidesToShow + 1
                : i.options.slidesToShow,
              e = i.slideCount;
            e > i.slideCount - n;
            --e
          )
            u(i.$slides[(t = e - 1)])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - i.slideCount)
              .prependTo(i.$slideTrack)
              .addClass("slick-cloned");
          for (e = 0; e < n + i.slideCount; e += 1)
            (t = e),
              u(i.$slides[t])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", t + i.slideCount)
                .appendTo(i.$slideTrack)
                .addClass("slick-cloned");
          i.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              u(this).attr("id", "");
            });
        }
      }),
      (r.prototype.interrupt = function (e) {
        e || this.autoPlay(), (this.interrupted = e);
      }),
      (r.prototype.selectHandler = function (e) {
        (e = u(e.target).is(".slick-slide")
          ? u(e.target)
          : u(e.target).parents(".slick-slide")),
          (e = (e = parseInt(e.attr("data-slick-index"))) || 0);
        this.slideCount <= this.options.slidesToShow
          ? this.slideHandler(e, !1, !0)
          : this.slideHandler(e);
      }),
      (r.prototype.slideHandler = function (e, t, n) {
        var i,
          o,
          r,
          s = this;
        if (
          ((t = t || !1),
          !(
            (!0 === s.animating && !0 === s.options.waitForAnimate) ||
            (!0 === s.options.fade && s.currentSlide === e)
          ))
        )
          if (
            (!1 === t && s.asNavFor(e),
            (i = e),
            (t = s.getLeft(i)),
            (r = s.getLeft(s.currentSlide)),
            (s.currentLeft = null === s.swipeLeft ? r : s.swipeLeft),
            !1 === s.options.infinite &&
              !1 === s.options.centerMode &&
              (e < 0 || e > s.getDotCount() * s.options.slidesToScroll))
          )
            !1 === s.options.fade &&
              ((i = s.currentSlide),
              !0 !== n
                ? s.animateSlide(r, function () {
                    s.postSlide(i);
                  })
                : s.postSlide(i));
          else if (
            !1 === s.options.infinite &&
            !0 === s.options.centerMode &&
            (e < 0 || e > s.slideCount - s.options.slidesToScroll)
          )
            !1 === s.options.fade &&
              ((i = s.currentSlide),
              !0 !== n
                ? s.animateSlide(r, function () {
                    s.postSlide(i);
                  })
                : s.postSlide(i));
          else {
            if (
              (s.options.autoplay && clearInterval(s.autoPlayTimer),
              (o =
                i < 0
                  ? s.slideCount % s.options.slidesToScroll != 0
                    ? s.slideCount - (s.slideCount % s.options.slidesToScroll)
                    : s.slideCount + i
                  : i >= s.slideCount
                  ? s.slideCount % s.options.slidesToScroll != 0
                    ? 0
                    : i - s.slideCount
                  : i),
              (s.animating = !0),
              s.$slider.trigger("beforeChange", [s, s.currentSlide, o]),
              (e = s.currentSlide),
              (s.currentSlide = o),
              s.setSlideClasses(s.currentSlide),
              s.options.asNavFor &&
                (r = (r = s.getNavTarget()).slick("getSlick")).slideCount <=
                  r.options.slidesToShow &&
                r.setSlideClasses(s.currentSlide),
              s.updateDots(),
              s.updateArrows(),
              !0 === s.options.fade)
            )
              return (
                !0 !== n
                  ? (s.fadeSlideOut(e),
                    s.fadeSlide(o, function () {
                      s.postSlide(o);
                    }))
                  : s.postSlide(o),
                void s.animateHeight()
              );
            !0 !== n
              ? s.animateSlide(t, function () {
                  s.postSlide(o);
                })
              : s.postSlide(o);
          }
      }),
      (r.prototype.startLoad = function () {
        var e = this;
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.hide(), e.$nextArrow.hide()),
          !0 === e.options.dots &&
            e.slideCount > e.options.slidesToShow &&
            e.$dots.hide(),
          e.$slider.addClass("slick-loading");
      }),
      (r.prototype.swipeDirection = function () {
        var e = this.touchObject.startX - this.touchObject.curX,
          t = this.touchObject.startY - this.touchObject.curY,
          t = Math.atan2(t, e);
        return ((e =
          (e = Math.round((180 * t) / Math.PI)) < 0 ? 360 - Math.abs(e) : e) <=
          45 &&
          0 <= e) ||
          (e <= 360 && 315 <= e)
          ? !1 === this.options.rtl
            ? "left"
            : "right"
          : 135 <= e && e <= 225
          ? !1 === this.options.rtl
            ? "right"
            : "left"
          : !0 === this.options.verticalSwiping
          ? 35 <= e && e <= 135
            ? "down"
            : "up"
          : "vertical";
      }),
      (r.prototype.swipeEnd = function (e) {
        var t,
          n,
          i = this;
        if (((i.dragging = !1), (i.swiping = !1), i.scrolling))
          return (i.scrolling = !1);
        if (
          ((i.interrupted = !1),
          (i.shouldClick = !(10 < i.touchObject.swipeLength)),
          void 0 === i.touchObject.curX)
        )
          return !1;
        if (
          (!0 === i.touchObject.edgeHit &&
            i.$slider.trigger("edge", [i, i.swipeDirection()]),
          i.touchObject.swipeLength >= i.touchObject.minSwipe)
        ) {
          switch ((n = i.swipeDirection())) {
            case "left":
            case "down":
              (t = i.options.swipeToSlide
                ? i.checkNavigable(i.currentSlide + i.getSlideCount())
                : i.currentSlide + i.getSlideCount()),
                (i.currentDirection = 0);
              break;
            case "right":
            case "up":
              (t = i.options.swipeToSlide
                ? i.checkNavigable(i.currentSlide - i.getSlideCount())
                : i.currentSlide - i.getSlideCount()),
                (i.currentDirection = 1);
          }
          "vertical" != n &&
            (i.slideHandler(t),
            (i.touchObject = {}),
            i.$slider.trigger("swipe", [i, n]));
        } else
          i.touchObject.startX !== i.touchObject.curX &&
            (i.slideHandler(i.currentSlide), (i.touchObject = {}));
      }),
      (r.prototype.swipeHandler = function (e) {
        var t = this;
        if (
          !(
            !1 === t.options.swipe ||
            ("ontouchend" in document && !1 === t.options.swipe) ||
            (!1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))
          )
        )
          switch (
            ((t.touchObject.fingerCount =
              e.originalEvent && void 0 !== e.originalEvent.touches
                ? e.originalEvent.touches.length
                : 1),
            (t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold),
            !0 === t.options.verticalSwiping &&
              (t.touchObject.minSwipe =
                t.listHeight / t.options.touchThreshold),
            e.data.action)
          ) {
            case "start":
              t.swipeStart(e);
              break;
            case "move":
              t.swipeMove(e);
              break;
            case "end":
              t.swipeEnd(e);
          }
      }),
      (r.prototype.swipeMove = function (e) {
        var t,
          n,
          i = this,
          o = void 0 !== e.originalEvent ? e.originalEvent.touches : null;
        return (
          !(!i.dragging || i.scrolling || (o && 1 !== o.length)) &&
          ((t = i.getLeft(i.currentSlide)),
          (i.touchObject.curX = void 0 !== o ? o[0].pageX : e.clientX),
          (i.touchObject.curY = void 0 !== o ? o[0].pageY : e.clientY),
          (i.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(i.touchObject.curX - i.touchObject.startX, 2))
          )),
          (o = Math.round(
            Math.sqrt(Math.pow(i.touchObject.curY - i.touchObject.startY, 2))
          )),
          !i.options.verticalSwiping && !i.swiping && 4 < o
            ? !(i.scrolling = !0)
            : (!0 === i.options.verticalSwiping &&
                (i.touchObject.swipeLength = o),
              (o = i.swipeDirection()),
              void 0 !== e.originalEvent &&
                4 < i.touchObject.swipeLength &&
                ((i.swiping = !0), e.preventDefault()),
              (e =
                (!1 === i.options.rtl ? 1 : -1) *
                (i.touchObject.curX > i.touchObject.startX ? 1 : -1)),
              !0 === i.options.verticalSwiping &&
                (e = i.touchObject.curY > i.touchObject.startY ? 1 : -1),
              (n = i.touchObject.swipeLength),
              (i.touchObject.edgeHit = !1) === i.options.infinite &&
                ((0 === i.currentSlide && "right" === o) ||
                  (i.currentSlide >= i.getDotCount() && "left" === o)) &&
                ((n = i.touchObject.swipeLength * i.options.edgeFriction),
                (i.touchObject.edgeHit = !0)),
              !1 === i.options.vertical
                ? (i.swipeLeft = t + n * e)
                : (i.swipeLeft = t + n * (i.$list.height() / i.listWidth) * e),
              !0 === i.options.verticalSwiping && (i.swipeLeft = t + n * e),
              !0 !== i.options.fade &&
                !1 !== i.options.touchMove &&
                (!0 === i.animating
                  ? ((i.swipeLeft = null), !1)
                  : void i.setCSS(i.swipeLeft))))
        );
      }),
      (r.prototype.swipeStart = function (e) {
        var t,
          n = this;
        if (
          ((n.interrupted = !0),
          1 !== n.touchObject.fingerCount ||
            n.slideCount <= n.options.slidesToShow)
        )
          return !(n.touchObject = {});
        void 0 !== e.originalEvent &&
          void 0 !== e.originalEvent.touches &&
          (t = e.originalEvent.touches[0]),
          (n.touchObject.startX = n.touchObject.curX =
            void 0 !== t ? t.pageX : e.clientX),
          (n.touchObject.startY = n.touchObject.curY =
            void 0 !== t ? t.pageY : e.clientY),
          (n.dragging = !0);
      }),
      (r.prototype.unfilterSlides = r.prototype.slickUnfilter =
        function () {
          null !== this.$slidesCache &&
            (this.unload(),
            this.$slideTrack.children(this.options.slide).detach(),
            this.$slidesCache.appendTo(this.$slideTrack),
            this.reinit());
        }),
      (r.prototype.unload = function () {
        var e = this;
        u(".slick-cloned", e.$slider).remove(),
          e.$dots && e.$dots.remove(),
          e.$prevArrow &&
            e.htmlExpr.test(e.options.prevArrow) &&
            e.$prevArrow.remove(),
          e.$nextArrow &&
            e.htmlExpr.test(e.options.nextArrow) &&
            e.$nextArrow.remove(),
          e.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (r.prototype.unslick = function (e) {
        this.$slider.trigger("unslick", [this, e]), this.destroy();
      }),
      (r.prototype.updateArrows = function () {
        var e = this;
        Math.floor(e.options.slidesToShow / 2),
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            !e.options.infinite &&
            (e.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            e.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            0 === e.currentSlide
              ? (e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : ((e.currentSlide >= e.slideCount - e.options.slidesToShow &&
                  !1 === e.options.centerMode) ||
                  (e.currentSlide >= e.slideCount - 1 &&
                    !0 === e.options.centerMode)) &&
                (e.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (r.prototype.updateDots = function () {
        null !== this.$dots &&
          (this.$dots.find("li").removeClass("slick-active").end(),
          this.$dots
            .find("li")
            .eq(Math.floor(this.currentSlide / this.options.slidesToScroll))
            .addClass("slick-active"));
      }),
      (r.prototype.visibility = function () {
        this.options.autoplay &&
          (document[this.hidden]
            ? (this.interrupted = !0)
            : (this.interrupted = !1));
      }),
      (u.fn.slick = function () {
        for (
          var e,
            t = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            i = this.length,
            o = 0;
          o < i;
          o++
        )
          if (
            ("object" == typeof t || void 0 === t
              ? (this[o].slick = new r(this[o], t))
              : (e = this[o].slick[t].apply(this[o].slick, n)),
            void 0 !== e)
          )
            return e;
        return this;
      });
  }),
  !(function (e, t) {
    "function" == typeof define && define.amd
      ? define(t)
      : "object" == typeof exports
      ? (module.exports = t())
      : (e.PhotoSwipe = t());
  })(this, function () {
    "use strict";
    return function (p, L, t, B) {
      var h = {
          features: null,
          bind: function (e, t, n, i) {
            var o = (i ? "remove" : "add") + "EventListener";
            t = t.split(" ");
            for (var r = 0; r < t.length; r++) t[r] && e[o](t[r], n, !1);
          },
          isArray: function (e) {
            return e instanceof Array;
          },
          createEl: function (e, t) {
            t = document.createElement(t || "div");
            return e && (t.className = e), t;
          },
          getScrollY: function () {
            var e = window.pageYOffset;
            return void 0 !== e ? e : document.documentElement.scrollTop;
          },
          unbind: function (e, t, n) {
            h.bind(e, t, n, !0);
          },
          removeClass: function (e, t) {
            t = new RegExp("(\\s|^)" + t + "(\\s|$)");
            e.className = e.className
              .replace(t, " ")
              .replace(/^\s\s*/, "")
              .replace(/\s\s*$/, "");
          },
          addClass: function (e, t) {
            h.hasClass(e, t) || (e.className += (e.className ? " " : "") + t);
          },
          hasClass: function (e, t) {
            return (
              e.className &&
              new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
            );
          },
          getChildByClass: function (e, t) {
            for (var n = e.firstChild; n; ) {
              if (h.hasClass(n, t)) return n;
              n = n.nextSibling;
            }
          },
          arraySearch: function (e, t, n) {
            for (var i = e.length; i--; ) if (e[i][n] === t) return i;
            return -1;
          },
          extend: function (e, t, n) {
            for (var i in t)
              if (t.hasOwnProperty(i)) {
                if (n && e.hasOwnProperty(i)) continue;
                e[i] = t[i];
              }
          },
          easing: {
            sine: {
              out: function (e) {
                return Math.sin(e * (Math.PI / 2));
              },
              inOut: function (e) {
                return -(Math.cos(Math.PI * e) - 1) / 2;
              },
            },
            cubic: {
              out: function (e) {
                return --e * e * e + 1;
              },
            },
          },
          detectFeatures: function () {
            if (h.features) return h.features;
            var e,
              t,
              n = h.createEl().style,
              i = "",
              o = {};
            (o.oldIE = document.all && !document.addEventListener),
              (o.touch = "ontouchstart" in window),
              window.requestAnimationFrame &&
                ((o.raf = window.requestAnimationFrame),
                (o.caf = window.cancelAnimationFrame)),
              (o.pointerEvent =
                navigator.pointerEnabled || navigator.msPointerEnabled),
              o.pointerEvent ||
                ((e = navigator.userAgent),
                /iP(hone|od)/.test(navigator.platform) &&
                  (t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)) &&
                  0 < t.length &&
                  1 <= (t = parseInt(t[1], 10)) &&
                  t < 8 &&
                  (o.isOldIOSPhone = !0),
                (t = (t = e.match(/Android\s([0-9\.]*)/)) ? t[1] : 0),
                1 <= (t = parseFloat(t)) &&
                  (t < 4.4 && (o.isOldAndroid = !0), (o.androidVersion = t)),
                (o.isMobileOpera = /opera mini|opera mobi/i.test(e)));
            for (
              var r,
                s,
                a,
                l = ["transform", "perspective", "animationName"],
                u = ["", "webkit", "Moz", "ms", "O"],
                c = 0;
              c < 4;
              c++
            ) {
              for (var i = u[c], d = 0; d < 3; d++)
                (r = l[d]),
                  (s = i + (i ? r.charAt(0).toUpperCase() + r.slice(1) : r)),
                  !o[r] && s in n && (o[r] = s);
              i &&
                !o.raf &&
                ((i = i.toLowerCase()),
                (o.raf = window[i + "RequestAnimationFrame"]),
                o.raf &&
                  (o.caf =
                    window[i + "CancelAnimationFrame"] ||
                    window[i + "CancelRequestAnimationFrame"]));
            }
            return (
              o.raf ||
                ((a = 0),
                (o.raf = function (e) {
                  var t = new Date().getTime(),
                    n = Math.max(0, 16 - (t - a)),
                    i = window.setTimeout(function () {
                      e(t + n);
                    }, n);
                  return (a = t + n), i;
                }),
                (o.caf = function (e) {
                  clearTimeout(e);
                })),
              (o.svg =
                !!document.createElementNS &&
                !!document.createElementNS("http://www.w3.org/2000/svg", "svg")
                  .createSVGRect),
              (h.features = o)
            );
          },
        },
        f =
          (h.detectFeatures(),
          h.features.oldIE &&
            (h.bind = function (e, t, n, i) {
              t = t.split(" ");
              for (
                var o,
                  r = (i ? "detach" : "attach") + "Event",
                  s = function () {
                    n.handleEvent.call(n);
                  },
                  a = 0;
                a < t.length;
                a++
              )
                if ((o = t[a]))
                  if ("object" == typeof n && n.handleEvent) {
                    if (i) {
                      if (!n["oldIE" + o]) return !1;
                    } else n["oldIE" + o] = s;
                    e[r]("on" + o, n["oldIE" + o]);
                  } else e[r]("on" + o, n);
            }),
          this),
        N = 25,
        m = {
          allowPanToNext: !0,
          spacing: 0.12,
          bgOpacity: 1,
          mouseUsed: !1,
          loop: !0,
          pinchToClose: !0,
          closeOnScroll: !0,
          closeOnVerticalDrag: !0,
          verticalDragRange: 0.75,
          hideAnimationDuration: 333,
          showAnimationDuration: 333,
          showHideOpacity: !1,
          focus: !0,
          escKey: !0,
          arrowKeys: !0,
          mainScrollEndFriction: 0.35,
          panEndFriction: 0.35,
          isClickableElement: function (e) {
            return "A" === e.tagName;
          },
          getDoubleTapZoom: function (e, t) {
            return e || t.initialZoomLevel < 0.7 ? 1 : 1.33;
          },
          maxSpreadZoom: 1.33,
          modal: !0,
          scaleMode: "fit",
        };
      h.extend(m, B);
      function e() {
        return { x: 0, y: 0 };
      }
      function R(e, t) {
        h.extend(f, t.publicMethods), Ue.push(e);
      }
      function H(e) {
        var t = M();
        return t - 1 < e ? e - t : e < 0 ? t + e : e;
      }
      function r(e, t) {
        return Ze[e] || (Ze[e] = []), Ze[e].push(t);
      }
      function q(e, t, n, i) {
        i === f.currItem.initialZoomLevel
          ? (n[e] = f.currItem.initialPosition[e])
          : ((n[e] = Qe(e, i)),
            n[e] > t.min[e]
              ? (n[e] = t.min[e])
              : n[e] < t.max[e] && (n[e] = t.max[e]));
      }
      function z(e) {
        var t = "";
        m.escKey && 27 === e.keyCode
          ? (t = "close")
          : m.arrowKeys &&
            (37 === e.keyCode
              ? (t = "prev")
              : 39 === e.keyCode && (t = "next")),
          !t ||
            e.ctrlKey ||
            e.altKey ||
            e.shiftKey ||
            e.metaKey ||
            (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            f[t]());
      }
      function W(e) {
        e && (De || _e || y || Te) && (e.preventDefault(), e.stopPropagation());
      }
      function U() {
        f.setScrollOffset(0, h.getScrollY());
      }
      function V(e) {
        var t;
        ("mousedown" === e.type && 0 < e.button) ||
          (Qt
            ? e.preventDefault()
            : (Ae && "mousedown" === e.type) ||
              (Ft(e, !0) && e.preventDefault(),
              C("pointerDown"),
              he &&
                ((t = h.arraySearch(mt, e.pointerId, "id")) < 0 &&
                  (t = mt.length),
                (mt[t] = { x: e.pageX, y: e.pageY, id: e.pointerId })),
              (e = (t = Nt(e)).length),
              (u = null),
              ut(),
              (l && 1 !== e) ||
                ((l = Pe = !0),
                h.bind(window, ee, f),
                (Se = Be = Ie = Te = Fe = De = Ee = _e = !1),
                (Oe = null),
                C("firstTouchStart", t),
                E(He, b),
                (Re.x = Re.y = 0),
                E(F, t[0]),
                E(ft, F),
                (gt.x = w.x * qe),
                (vt = [{ x: F.x, y: F.y }]),
                (xe = we = S()),
                it(v, !0),
                At(),
                Et()),
              !c &&
                1 < e &&
                !y &&
                !Fe &&
                ((ne = v),
                (c = Ee = !(_e = !1)),
                (Re.y = Re.x = 0),
                E(He, b),
                E(D, t[0]),
                E(ht, t[1]),
                Mt(D, ht, Ct),
                (xt.x = Math.abs(Ct.x) - b.x),
                (xt.y = Math.abs(Ct.y) - b.y),
                (je = Tt(D, ht)))));
      }
      function Y(e) {
        var t;
        e.preventDefault(),
          he &&
            -1 < (t = h.arraySearch(mt, e.pointerId, "id")) &&
            (((t = mt[t]).x = e.pageX), (t.y = e.pageY)),
          l &&
            ((t = Nt(e)),
            Oe || De || c
              ? (u = t)
              : j.x !== w.x * qe
              ? (Oe = "h")
              : ((e = Math.abs(t[0].x - F.x) - Math.abs(t[0].y - F.y)),
                Math.abs(e) >= pt && ((Oe = 0 < e ? "h" : "v"), (u = t))));
      }
      function Z(e) {
        if (a.isOldAndroid) {
          if (Ae && "mouseup" === e.type) return;
          -1 < e.type.indexOf("touch") &&
            (clearTimeout(Ae),
            (Ae = setTimeout(function () {
              Ae = 0;
            }, 600)));
        }
        var t;
        C("pointerUp"),
          Ft(e, !1) && e.preventDefault(),
          he &&
            -1 < (r = h.arraySearch(mt, e.pointerId, "id")) &&
            ((t = mt.splice(r, 1)[0]),
            navigator.pointerEnabled
              ? (t.type = e.pointerType || "mouse")
              : ((t.type = { 4: "mouse", 2: "touch", 3: "pen" }[e.pointerType]),
                t.type || (t.type = e.pointerType || "mouse")));
        var n = (r = Nt(e)).length;
        if (2 === (n = "mouseup" === e.type ? 0 : n)) return !(u = null);
        1 === n && E(ft, r[0]),
          0 !== n ||
            Oe ||
            y ||
            (t ||
              ("mouseup" === e.type
                ? (t = { x: e.pageX, y: e.pageY, type: "mouse" })
                : e.changedTouches &&
                  e.changedTouches[0] &&
                  (t = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY,
                    type: "touch",
                  })),
            C("touchRelease", e, t));
        var i,
          o,
          r = -1;
        if (
          (0 === n &&
            ((l = !1),
            h.unbind(window, ee, f),
            At(),
            c ? (r = 0) : -1 !== wt && (r = S() - wt)),
          (wt = 1 === n ? S() : -1),
          (e = -1 !== r && r < 150 ? "zoom" : "swipe"),
          c &&
            n < 2 &&
            ((c = !1), 1 === n && (e = "zoomPointerUp"), C("zoomGestureEnded")),
          (u = null),
          De || _e || y || Te)
        )
          if ((ut(), (Ce = Ce || qt()).calculateSwipeSpeed("x"), Te))
            Pt() < m.verticalDragRange
              ? f.close()
              : ((i = b.y),
                (o = Le),
                ct("verticalDrag", 0, 1, 300, h.easing.cubic.out, function (e) {
                  (b.y = (f.currItem.initialPosition.y - i) * e + i),
                    T((1 - o) * e + o),
                    A();
                }),
                C("onVerticalDrag", 1));
          else {
            if ((Fe || y) && 0 === n) {
              if (Wt(e, Ce)) return;
              e = "zoomPointerUp";
            }
            if (!y)
              return "swipe" !== e
                ? void Vt()
                : void (!Fe && v > f.currItem.fitRatio && zt(Ce));
          }
      }
      var X,
        K,
        G,
        g,
        J,
        Q,
        ee,
        te,
        n,
        v,
        ne,
        ie,
        oe,
        re,
        se,
        s,
        ae,
        le,
        ue,
        ce,
        de,
        pe,
        he,
        i,
        fe,
        me,
        ge,
        ve,
        ye,
        be,
        a,
        ke,
        we,
        xe,
        Ce,
        Se,
        Te,
        Ae,
        l,
        Ee,
        _e,
        De,
        $e,
        Fe,
        u,
        c,
        je,
        d,
        Me,
        y,
        Oe,
        Pe,
        Ie,
        Le,
        Be,
        Ne,
        Re = e(),
        He = e(),
        b = e(),
        k = {},
        qe = 0,
        ze = {},
        w = e(),
        x = 0,
        We = !0,
        Ue = [],
        Ve = {},
        Ye = !1,
        Ze = {},
        C = function (e) {
          var t = Ze[e];
          if (t) {
            var n = Array.prototype.slice.call(arguments);
            n.shift();
            for (var i = 0; i < t.length; i++) t[i].apply(f, n);
          }
        },
        S = function () {
          return new Date().getTime();
        },
        T = function (e) {
          (Le = e), (f.bg.style.opacity = e * m.bgOpacity);
        },
        Xe = function (e, t, n, i, o) {
          (!Ye || (o && o !== f.currItem)) && (i /= (o || f.currItem).fitRatio),
            (e[pe] = ie + t + "px, " + n + "px" + oe + " scale(" + i + ")");
        },
        A = function (e) {
          Me &&
            (e &&
              (v > f.currItem.fitRatio
                ? Ye || (un(f.currItem, !1, !0), (Ye = !0))
                : Ye && (un(f.currItem), (Ye = !1))),
            Xe(Me, b.x, b.y, v));
        },
        Ke = function (e) {
          e.container &&
            Xe(
              e.container.style,
              e.initialPosition.x,
              e.initialPosition.y,
              e.initialZoomLevel,
              e
            );
        },
        Ge = function (e, t) {
          t[pe] = ie + e + "px, 0px" + oe;
        },
        Je = function (e, t) {
          var n;
          !m.loop &&
            t &&
            ((t = g + (w.x * qe - e) / w.x),
            (n = Math.round(e - j.x)),
            ((t < 0 && 0 < n) || (t >= M() - 1 && n < 0)) &&
              (e = j.x + n * m.mainScrollEndFriction)),
            (j.x = e),
            Ge(e, J);
        },
        Qe = function (e, t) {
          var n = xt[e] - ze[e];
          return He[e] + Re[e] + n - (t / ne) * n;
        },
        E = function (e, t) {
          (e.x = t.x), (e.y = t.y), t.id && (e.id = t.id);
        },
        et = function (e) {
          (e.x = Math.round(e.x)), (e.y = Math.round(e.y));
        },
        tt = null,
        nt = function () {
          tt &&
            (h.unbind(document, "mousemove", nt),
            h.addClass(p, "pswp--has_mouse"),
            (m.mouseUsed = !0),
            C("mouseUsed")),
            (tt = setTimeout(function () {
              tt = null;
            }, 100));
        },
        it = function (e, t) {
          e = an(f.currItem, k, e);
          return t && (d = e), e;
        },
        ot = function (e) {
          return (e = e || f.currItem).initialZoomLevel;
        },
        rt = function (e) {
          return 0 < (e = e || f.currItem).w ? m.maxSpreadZoom : 1;
        },
        _ = {},
        st = 0,
        at = function (e) {
          _[e] && (_[e].raf && me(_[e].raf), st--, delete _[e]);
        },
        lt = function (e) {
          _[e] && at(e), _[e] || (st++, (_[e] = {}));
        },
        ut = function () {
          for (var e in _) _.hasOwnProperty(e) && at(e);
        },
        ct = function (e, t, n, i, o, r, s) {
          function a() {
            if (_[e]) {
              if (((l = S() - u), i <= l)) return at(e), r(n), void (s && s());
              r((n - t) * o(l / i) + t), (_[e].raf = fe(a));
            }
          }
          var l,
            u = S();
          lt(e);
          a();
        },
        B = {
          shout: C,
          listen: r,
          viewportSize: k,
          options: m,
          isMainScrollAnimating: function () {
            return y;
          },
          getZoomLevel: function () {
            return v;
          },
          getCurrentIndex: function () {
            return g;
          },
          isDragging: function () {
            return l;
          },
          isZooming: function () {
            return c;
          },
          setScrollOffset: function (e, t) {
            (ze.x = e), (be = ze.y = t), C("updateScrollOffset", ze);
          },
          applyZoomPan: function (e, t, n, i) {
            (b.x = t), (b.y = n), (v = e), A(i);
          },
          init: function () {
            if (!X && !K) {
              (f.framework = h),
                (f.template = p),
                (f.bg = h.getChildByClass(p, "pswp__bg")),
                (ge = p.className),
                (X = !0),
                (a = h.detectFeatures()),
                (fe = a.raf),
                (me = a.caf),
                (pe = a.transform),
                (ye = a.oldIE),
                (f.scrollWrap = h.getChildByClass(p, "pswp__scroll-wrap")),
                (f.container = h.getChildByClass(
                  f.scrollWrap,
                  "pswp__container"
                )),
                (J = f.container.style),
                (f.itemHolders = s =
                  [
                    { el: f.container.children[0], wrap: 0, index: -1 },
                    { el: f.container.children[1], wrap: 0, index: -1 },
                    { el: f.container.children[2], wrap: 0, index: -1 },
                  ]),
                (s[0].el.style.display = s[2].el.style.display = "none"),
                (function () {
                  var e;
                  if (pe)
                    return (
                      (e = a.perspective && !i),
                      (ie = "translate" + (e ? "3d(" : "(")),
                      (oe = a.perspective ? ", 0px)" : ")")
                    );
                  (pe = "left"),
                    h.addClass(p, "pswp--ie"),
                    (Ge = function (e, t) {
                      t.left = e + "px";
                    }),
                    (Ke = function (e) {
                      var t = 1 < e.fitRatio ? 1 : e.fitRatio,
                        n = e.container.style,
                        i = t * e.w,
                        t = t * e.h;
                      (n.width = i + "px"),
                        (n.height = t + "px"),
                        (n.left = e.initialPosition.x + "px"),
                        (n.top = e.initialPosition.y + "px");
                    }),
                    (A = function () {
                      var e, t, n, i;
                      Me &&
                        ((e = Me),
                        (n =
                          (i = 1 < (t = f.currItem).fitRatio ? 1 : t.fitRatio) *
                          t.w),
                        (i = i * t.h),
                        (e.width = n + "px"),
                        (e.height = i + "px"),
                        (e.left = b.x + "px"),
                        (e.top = b.y + "px"));
                    });
                })(),
                (n = {
                  resize: f.updateSize,
                  orientationchange: function () {
                    clearTimeout(ke),
                      (ke = setTimeout(function () {
                        k.x !== f.scrollWrap.clientWidth && f.updateSize();
                      }, 500));
                  },
                  scroll: U,
                  keydown: z,
                  click: W,
                });
              var e,
                t = a.isOldIOSPhone || a.isOldAndroid || a.isMobileOpera;
              for (
                (a.animationName && a.transform && !t) ||
                  (m.showAnimationDuration = m.hideAnimationDuration = 0),
                  e = 0;
                e < Ue.length;
                e++
              )
                f["init" + Ue[e]]();
              L && (f.ui = new L(f, h)).init(),
                C("firstUpdate"),
                (g = g || m.index || 0),
                (isNaN(g) || g < 0 || g >= M()) && (g = 0),
                (f.currItem = en(g)),
                (a.isOldIOSPhone || a.isOldAndroid) && (We = !1),
                p.setAttribute("aria-hidden", "false"),
                m.modal &&
                  (We
                    ? (p.style.position = "fixed")
                    : ((p.style.position = "absolute"),
                      (p.style.top = h.getScrollY() + "px"))),
                void 0 === be &&
                  (C("initialLayout"), (be = ve = h.getScrollY()));
              t = "pswp--open ";
              for (
                m.mainClass && (t += m.mainClass + " "),
                  m.showHideOpacity && (t += "pswp--animate_opacity "),
                  t =
                    (t =
                      (t += i ? "pswp--touch" : "pswp--notouch") +
                      (a.animationName ? " pswp--css_animation" : "")) +
                    (a.svg ? " pswp--svg" : ""),
                  h.addClass(p, t),
                  f.updateSize(),
                  Q = -1,
                  x = null,
                  e = 0;
                e < 3;
                e++
              )
                Ge((e + Q) * w.x, s[e].el.style);
              ye || h.bind(f.scrollWrap, te, f),
                r("initialZoomInEnd", function () {
                  f.setContent(s[0], g - 1),
                    f.setContent(s[2], g + 1),
                    (s[0].el.style.display = s[2].el.style.display = "block"),
                    m.focus && p.focus(),
                    h.bind(document, "keydown", f),
                    a.transform && h.bind(f.scrollWrap, "click", f),
                    m.mouseUsed || h.bind(document, "mousemove", nt),
                    h.bind(window, "resize scroll orientationchange", f),
                    C("bindEvents");
                }),
                f.setContent(s[1], g),
                f.updateCurrItem(),
                C("afterInit"),
                We ||
                  (re = setInterval(function () {
                    st ||
                      l ||
                      c ||
                      v !== f.currItem.initialZoomLevel ||
                      f.updateSize();
                  }, 1e3)),
                h.addClass(p, "pswp--visible");
            }
          },
          close: function () {
            X &&
              ((K = !(X = !1)),
              C("close"),
              h.unbind(window, "resize scroll orientationchange", f),
              h.unbind(window, "scroll", n.scroll),
              h.unbind(document, "keydown", f),
              h.unbind(document, "mousemove", nt),
              a.transform && h.unbind(f.scrollWrap, "click", f),
              l && h.unbind(window, ee, f),
              clearTimeout(ke),
              C("unbindEvents"),
              tn(f.currItem, null, !0, f.destroy));
          },
          destroy: function () {
            C("destroy"),
              Kt && clearTimeout(Kt),
              p.setAttribute("aria-hidden", "true"),
              (p.className = ge),
              re && clearInterval(re),
              h.unbind(f.scrollWrap, te, f),
              h.unbind(window, "scroll", f),
              At(),
              ut(),
              (Ze = null);
          },
          panTo: function (e, t, n) {
            n ||
              (e > d.min.x ? (e = d.min.x) : e < d.max.x && (e = d.max.x),
              t > d.min.y ? (t = d.min.y) : t < d.max.y && (t = d.max.y)),
              (b.x = e),
              (b.y = t),
              A();
          },
          handleEvent: function (e) {
            (e = e || window.event), n[e.type] && n[e.type](e);
          },
          goTo: function (e) {
            var t = (e = H(e)) - g;
            (x = t),
              (g = e),
              (f.currItem = en(g)),
              (qe -= t),
              Je(w.x * qe),
              ut(),
              (y = !1),
              f.updateCurrItem();
          },
          next: function () {
            f.goTo(g + 1);
          },
          prev: function () {
            f.goTo(g - 1);
          },
          updateCurrZoomItem: function (e) {
            var t;
            e && C("beforeChange", 0),
              (Me = s[1].el.children.length
                ? ((t = s[1].el.children[0]),
                  h.hasClass(t, "pswp__zoom-wrap") ? t.style : null)
                : null),
              (d = f.currItem.bounds),
              (ne = v = f.currItem.initialZoomLevel),
              (b.x = d.center.x),
              (b.y = d.center.y),
              e && C("afterChange");
          },
          invalidateCurrItems: function () {
            se = !0;
            for (var e = 0; e < 3; e++)
              s[e].item && (s[e].item.needsUpdate = !0);
          },
          updateCurrItem: function (e) {
            if (0 !== x) {
              var t,
                n = Math.abs(x);
              if (!(e && n < 2)) {
                (f.currItem = en(g)),
                  (Ye = !1),
                  C("beforeChange", x),
                  3 <= n && ((Q += x + (0 < x ? -3 : 3)), (n = 3));
                for (var i = 0; i < n; i++)
                  0 < x
                    ? ((t = s.shift()),
                      (s[2] = t),
                      Ge((++Q + 2) * w.x, t.el.style),
                      f.setContent(t, g - n + i + 1 + 1))
                    : ((t = s.pop()),
                      s.unshift(t),
                      Ge(--Q * w.x, t.el.style),
                      f.setContent(t, g + n - i - 1 - 1));
                !Me ||
                  1 !== Math.abs(x) ||
                  ((e = en(ae)).initialZoomLevel !== v &&
                    (an(e, k), un(e), Ke(e))),
                  (x = 0),
                  f.updateCurrZoomItem(),
                  (ae = g),
                  C("afterChange");
              }
            }
          },
          updateSize: function (e) {
            if (!We && m.modal) {
              var t = h.getScrollY();
              if (
                (be !== t && ((p.style.top = t + "px"), (be = t)),
                !e && Ve.x === window.innerWidth && Ve.y === window.innerHeight)
              )
                return;
              (Ve.x = window.innerWidth),
                (Ve.y = window.innerHeight),
                (p.style.height = Ve.y + "px");
            }
            if (
              ((k.x = f.scrollWrap.clientWidth),
              (k.y = f.scrollWrap.clientHeight),
              U(),
              (w.x = k.x + Math.round(k.x * m.spacing)),
              (w.y = k.y),
              Je(w.x * qe),
              C("beforeResize"),
              void 0 !== Q)
            ) {
              for (var n, i, o, r = 0; r < 3; r++)
                (n = s[r]),
                  Ge((r + Q) * w.x, n.el.style),
                  (o = g + r - 1),
                  m.loop && 2 < M() && (o = H(o)),
                  (i = en(o)) && (se || i.needsUpdate || !i.bounds)
                    ? (f.cleanSlide(i),
                      f.setContent(n, o),
                      1 === r && ((f.currItem = i), f.updateCurrZoomItem(!0)),
                      (i.needsUpdate = !1))
                    : -1 === n.index && 0 <= o && f.setContent(n, o),
                  i && i.container && (an(i, k), un(i), Ke(i));
              se = !1;
            }
            (ne = v = f.currItem.initialZoomLevel),
              (d = f.currItem.bounds) &&
                ((b.x = d.center.x), (b.y = d.center.y), A(!0)),
              C("resize");
          },
          zoomTo: function (t, e, n, i, o) {
            e &&
              ((ne = v),
              (xt.x = Math.abs(e.x) - b.x),
              (xt.y = Math.abs(e.y) - b.y),
              E(He, b));
            function r(e) {
              1 === e
                ? ((v = t), (b.x = s.x), (b.y = s.y))
                : ((v = (t - a) * e + a),
                  (b.x = (s.x - l.x) * e + l.x),
                  (b.y = (s.y - l.y) * e + l.y)),
                o && o(e),
                A(1 === e);
            }
            var e = it(t, !1),
              s = {},
              a = (q("x", e, s, t), q("y", e, s, t), v),
              l = { x: b.x, y: b.y };
            et(s);
            n ? ct("customZoomTo", 0, 1, n, i || h.easing.sine.inOut, r) : r(1);
          },
        },
        dt = 30,
        pt = 10,
        D = {},
        ht = {},
        $ = {},
        F = {},
        ft = {},
        mt = [],
        gt = {},
        vt = [],
        yt = {},
        bt = 0,
        kt = e(),
        wt = 0,
        j = e(),
        xt = e(),
        Ct = e(),
        St = function (e, t) {
          return e.x === t.x && e.y === t.y;
        },
        Tt = function (e, t) {
          return (
            (yt.x = Math.abs(e.x - t.x)),
            (yt.y = Math.abs(e.y - t.y)),
            Math.sqrt(yt.x * yt.x + yt.y * yt.y)
          );
        },
        At = function () {
          $e && (me($e), ($e = null));
        },
        Et = function () {
          l && (($e = fe(Et)), Ht());
        },
        _t = function () {
          return !("fit" === m.scaleMode && v === f.currItem.initialZoomLevel);
        },
        Dt = function (e, t) {
          return (
            !(!e || e === document) &&
            !(
              e.getAttribute("class") &&
              -1 < e.getAttribute("class").indexOf("pswp__scroll-wrap")
            ) &&
            (t(e) ? e : Dt(e.parentNode, t))
          );
        },
        $t = {},
        Ft = function (e, t) {
          return (
            ($t.prevent = !Dt(e.target, m.isClickableElement)),
            C("preventDragEvent", e, t, $t),
            $t.prevent
          );
        },
        jt = function (e, t) {
          return (t.x = e.pageX), (t.y = e.pageY), (t.id = e.identifier), t;
        },
        Mt = function (e, t, n) {
          (n.x = 0.5 * (e.x + t.x)), (n.y = 0.5 * (e.y + t.y));
        },
        Ot = function (e, t, n) {
          var i;
          50 < e - xe &&
            (((i = 2 < vt.length ? vt.shift() : {}).x = t),
            (i.y = n),
            vt.push(i),
            (xe = e));
        },
        Pt = function () {
          var e = b.y - f.currItem.initialPosition.y;
          return 1 - Math.abs(e / (k.y / 2));
        },
        It = {},
        Lt = {},
        Bt = [],
        Nt = function (e) {
          for (; 0 < Bt.length; ) Bt.pop();
          return (
            he
              ? ((Ne = 0),
                mt.forEach(function (e) {
                  0 === Ne ? (Bt[0] = e) : 1 === Ne && (Bt[1] = e), Ne++;
                }))
              : -1 < e.type.indexOf("touch")
              ? e.touches &&
                0 < e.touches.length &&
                ((Bt[0] = jt(e.touches[0], It)),
                1 < e.touches.length && (Bt[1] = jt(e.touches[1], Lt)))
              : ((It.x = e.pageX),
                (It.y = e.pageY),
                (It.id = ""),
                (Bt[0] = It)),
            Bt
          );
        },
        Rt = function (e, t) {
          var n,
            i,
            o,
            r = b[e] + t[e],
            s = 0 < t[e],
            a = j.x + t.x,
            l = j.x - gt.x,
            u = r > d.min[e] || r < d.max[e] ? m.panEndFriction : 1,
            r = b[e] + t[e] * u;
          return (!m.allowPanToNext && v !== f.currItem.initialZoomLevel) ||
            (Me
              ? "h" !== Oe ||
                "x" !== e ||
                _e ||
                (s
                  ? (r > d.min[e] &&
                      ((u = m.panEndFriction),
                      d.min[e],
                      (n = d.min[e] - He[e])),
                    (n <= 0 || l < 0) && 1 < M()
                      ? ((o = a), l < 0 && a > gt.x && (o = gt.x))
                      : d.min.x !== d.max.x && (i = r))
                  : (r < d.max[e] &&
                      ((u = m.panEndFriction),
                      d.max[e],
                      (n = He[e] - d.max[e])),
                    (n <= 0 || 0 < l) && 1 < M()
                      ? ((o = a), 0 < l && a < gt.x && (o = gt.x))
                      : d.min.x !== d.max.x && (i = r)))
              : (o = a),
            "x" !== e)
            ? void (y || Fe || (v > f.currItem.fitRatio && (b[e] += t[e] * u)))
            : (void 0 !== o && (Je(o, !0), (Fe = o !== gt.x)),
              d.min.x !== d.max.x &&
                (void 0 !== i ? (b.x = i) : Fe || (b.x += t.x * u)),
              void 0 !== o);
        },
        Ht = function () {
          if (u) {
            var e,
              t,
              n,
              i,
              o,
              r = u.length;
            if (0 !== r)
              if (
                (E(D, u[0]), ($.x = D.x - F.x), ($.y = D.y - F.y), c && 1 < r)
              )
                (F.x = D.x),
                  (F.y = D.y),
                  (!$.x && !$.y && St(u[1], ht)) ||
                    (E(ht, u[1]),
                    _e || ((_e = !0), C("zoomGestureStarted")),
                    (r = Tt(D, ht)),
                    (e = Ut(r)) >
                      f.currItem.initialZoomLevel +
                        f.currItem.initialZoomLevel / 15 && (Be = !0),
                    (t = 1),
                    (n = ot()),
                    (i = rt()),
                    e < n
                      ? m.pinchToClose &&
                        !Be &&
                        ne <= f.currItem.initialZoomLevel
                        ? (T((o = 1 - (n - e) / (n / 1.2))),
                          C("onPinchClose", o),
                          (Ie = !0))
                        : (e =
                            n - (t = 1 < (t = (n - e) / n) ? 1 : t) * (n / 3))
                      : i < e &&
                        (e = i + (t = 1 < (t = (e - i) / (6 * n)) ? 1 : t) * n),
                    t < 0 && (t = 0),
                    Mt(D, ht, kt),
                    (Re.x += kt.x - Ct.x),
                    (Re.y += kt.y - Ct.y),
                    E(Ct, kt),
                    (b.x = Qe("x", e)),
                    (b.y = Qe("y", e)),
                    (Se = v < e),
                    (v = e),
                    A());
              else if (
                Oe &&
                (Pe &&
                  ((Pe = !1),
                  Math.abs($.x) >= pt && ($.x -= u[0].x - ft.x),
                  Math.abs($.y) >= pt && ($.y -= u[0].y - ft.y)),
                (F.x = D.x),
                (F.y = D.y),
                0 !== $.x || 0 !== $.y)
              ) {
                if ("v" === Oe && m.closeOnVerticalDrag && !_t())
                  return (
                    (Re.y += $.y),
                    (b.y += $.y),
                    (o = Pt()),
                    (Te = !0),
                    C("onVerticalDrag", o),
                    T(o),
                    void A()
                  );
                Ot(S(), D.x, D.y),
                  (De = !0),
                  (d = f.currItem.bounds),
                  Rt("x", $) || (Rt("y", $), et(b), A());
              }
          }
        },
        qt = function () {
          var t,
            n,
            i = {
              lastFlickOffset: {},
              lastFlickDist: {},
              lastFlickSpeed: {},
              slowDownRatio: {},
              slowDownRatioReverse: {},
              speedDecelerationRatio: {},
              speedDecelerationRatioAbs: {},
              distanceOffset: {},
              backAnimDestination: {},
              backAnimStarted: {},
              calculateSwipeSpeed: function (e) {
                (n =
                  1 < vt.length
                    ? ((t = S() - xe + 50), vt[vt.length - 2][e])
                    : ((t = S() - we), ft[e])),
                  (i.lastFlickOffset[e] = F[e] - n),
                  (i.lastFlickDist[e] = Math.abs(i.lastFlickOffset[e])),
                  20 < i.lastFlickDist[e]
                    ? (i.lastFlickSpeed[e] = i.lastFlickOffset[e] / t)
                    : (i.lastFlickSpeed[e] = 0),
                  Math.abs(i.lastFlickSpeed[e]) < 0.1 &&
                    (i.lastFlickSpeed[e] = 0),
                  (i.slowDownRatio[e] = 0.95),
                  (i.slowDownRatioReverse[e] = 1 - i.slowDownRatio[e]),
                  (i.speedDecelerationRatio[e] = 1);
              },
              calculateOverBoundsAnimOffset: function (t, e) {
                i.backAnimStarted[t] ||
                  (b[t] > d.min[t]
                    ? (i.backAnimDestination[t] = d.min[t])
                    : b[t] < d.max[t] && (i.backAnimDestination[t] = d.max[t]),
                  void 0 !== i.backAnimDestination[t] &&
                    ((i.slowDownRatio[t] = 0.7),
                    (i.slowDownRatioReverse[t] = 1 - i.slowDownRatio[t]),
                    i.speedDecelerationRatioAbs[t] < 0.05 &&
                      ((i.lastFlickSpeed[t] = 0),
                      (i.backAnimStarted[t] = !0),
                      ct(
                        "bounceZoomPan" + t,
                        b[t],
                        i.backAnimDestination[t],
                        e || 300,
                        h.easing.sine.out,
                        function (e) {
                          (b[t] = e), A();
                        }
                      ))));
              },
              calculateAnimOffset: function (e) {
                i.backAnimStarted[e] ||
                  ((i.speedDecelerationRatio[e] =
                    i.speedDecelerationRatio[e] *
                    (i.slowDownRatio[e] +
                      i.slowDownRatioReverse[e] -
                      (i.slowDownRatioReverse[e] * i.timeDiff) / 10)),
                  (i.speedDecelerationRatioAbs[e] = Math.abs(
                    i.lastFlickSpeed[e] * i.speedDecelerationRatio[e]
                  )),
                  (i.distanceOffset[e] =
                    i.lastFlickSpeed[e] *
                    i.speedDecelerationRatio[e] *
                    i.timeDiff),
                  (b[e] += i.distanceOffset[e]));
              },
              panAnimLoop: function () {
                if (
                  _.zoomPan &&
                  ((_.zoomPan.raf = fe(i.panAnimLoop)),
                  (i.now = S()),
                  (i.timeDiff = i.now - i.lastNow),
                  (i.lastNow = i.now),
                  i.calculateAnimOffset("x"),
                  i.calculateAnimOffset("y"),
                  A(),
                  i.calculateOverBoundsAnimOffset("x"),
                  i.calculateOverBoundsAnimOffset("y"),
                  i.speedDecelerationRatioAbs.x < 0.05 &&
                    i.speedDecelerationRatioAbs.y < 0.05)
                )
                  return (
                    (b.x = Math.round(b.x)),
                    (b.y = Math.round(b.y)),
                    A(),
                    void at("zoomPan")
                  );
              },
            };
          return i;
        },
        zt = function (e) {
          return (
            e.calculateSwipeSpeed("y"),
            (d = f.currItem.bounds),
            (e.backAnimDestination = {}),
            (e.backAnimStarted = {}),
            Math.abs(e.lastFlickSpeed.x) <= 0.05 &&
            Math.abs(e.lastFlickSpeed.y) <= 0.05
              ? ((e.speedDecelerationRatioAbs.x =
                  e.speedDecelerationRatioAbs.y =
                    0),
                e.calculateOverBoundsAnimOffset("x"),
                e.calculateOverBoundsAnimOffset("y"),
                !0)
              : (lt("zoomPan"), (e.lastNow = S()), void e.panAnimLoop())
          );
        },
        Wt = function (e, t) {
          var n, i, o;
          y || (bt = g),
            "swipe" === e &&
              ((e = F.x - ft.x),
              (r = t.lastFlickDist.x < 10),
              dt < e && (r || 20 < t.lastFlickOffset.x)
                ? (i = -1)
                : e < -dt && (r || t.lastFlickOffset.x < -20) && (i = 1)),
            i &&
              ((g += i) < 0
                ? ((g = m.loop ? M() - 1 : 0), (o = !0))
                : g >= M() && ((g = m.loop ? 0 : M() - 1), (o = !0)),
              (o && !m.loop) || ((x += i), (qe -= i), (n = !0)));
          var e = w.x * qe,
            r = Math.abs(e - j.x),
            s =
              n || e > j.x == 0 < t.lastFlickSpeed.x
                ? ((s =
                    0 < Math.abs(t.lastFlickSpeed.x)
                      ? r / Math.abs(t.lastFlickSpeed.x)
                      : 333),
                  (s = Math.min(s, 400)),
                  Math.max(s, 250))
                : 333;
          return (
            bt === g && (n = !1),
            (y = !0),
            C("mainScrollAnimStart"),
            ct("mainScroll", j.x, e, s, h.easing.cubic.out, Je, function () {
              ut(),
                (y = !1),
                (bt = -1),
                (!n && bt === g) || f.updateCurrItem(),
                C("mainScrollAnimComplete");
            }),
            n && f.updateCurrItem(!0),
            n
          );
        },
        Ut = function (e) {
          return (1 / je) * e * ne;
        },
        Vt = function () {
          var e = v,
            t = ot(),
            n = rt();
          v < t ? (e = t) : n < v && (e = n);
          var i,
            o = Le;
          return (
            Ie && !Se && !Be && v < t
              ? f.close()
              : (Ie &&
                  (i = function (e) {
                    T((1 - o) * e + o);
                  }),
                f.zoomTo(e, 0, 200, h.easing.cubic.out, i)),
            !0
          );
        };
      R("Gestures", {
        publicMethods: {
          initGestures: function () {
            function e(e, t, n, i, o) {
              (le = e + t), (ue = e + n), (ce = e + i), (de = o ? e + o : "");
            }
            (he = a.pointerEvent) && a.touch && (a.touch = !1),
              he
                ? navigator.pointerEnabled
                  ? e("pointer", "down", "move", "up", "cancel")
                  : e("MSPointer", "Down", "Move", "Up", "Cancel")
                : a.touch
                ? (e("touch", "start", "move", "end", "cancel"), (i = !0))
                : e("mouse", "down", "move", "up"),
              (ee = ue + " " + ce + " " + de),
              (te = le),
              he &&
                !i &&
                (i =
                  1 < navigator.maxTouchPoints ||
                  1 < navigator.msMaxTouchPoints),
              (f.likelyTouchDevice = i),
              (n[le] = V),
              (n[ue] = Y),
              (n[ce] = Z),
              de && (n[de] = n[ce]),
              a.touch &&
                ((te += " mousedown"),
                (ee += " mousemove mouseup"),
                (n.mousedown = n[le]),
                (n.mousemove = n[ue]),
                (n.mouseup = n[ce])),
              i || (m.allowPanToNext = !1);
          },
        },
      });
      function Yt(e) {
        function t() {
          (e.loading = !1),
            (e.loaded = !0),
            e.loadComplete ? e.loadComplete(e) : (e.img = null),
            (n.onload = n.onerror = null),
            (n = null);
        }
        (e.loading = !0), (e.loaded = !1);
        var n = (e.img = h.createEl("pswp__img", "img"));
        (n.onload = t),
          (n.onerror = function () {
            (e.loadError = !0), t();
          }),
          (n.src = e.src);
      }
      function Zt(e, t) {
        return (
          e.src &&
          e.loadError &&
          e.container &&
          (t && (e.container.innerHTML = ""),
          (e.container.innerHTML = m.errorMsg.replace("%url%", e.src)),
          1)
        );
      }
      function Xt() {
        if (nn.length) {
          for (var e, t = 0; t < nn.length; t++)
            (e = nn[t]).holder.index === e.index &&
              ln(e.index, e.item, e.baseDiv, e.img, !1, e.clearPlaceholder);
          nn = [];
        }
      }
      var Kt,
        Gt,
        Jt,
        Qt,
        en,
        M,
        tn = function (r, e, s, t) {
          function a() {
            at("initialZoom"),
              s
                ? (f.template.removeAttribute("style"),
                  f.bg.removeAttribute("style"))
                : (T(1),
                  e && (e.style.display = "block"),
                  h.addClass(p, "pswp--animated-in"),
                  C("initialZoom" + (s ? "OutEnd" : "InEnd"))),
              t && t(),
              (Qt = !1);
          }
          Kt && clearTimeout(Kt),
            (Jt = Qt = !0),
            r.initialLayout
              ? ((l = r.initialLayout), (r.initialLayout = null))
              : (l = m.getThumbBoundsFn && m.getThumbBoundsFn(g));
          var l,
            u = s ? m.hideAnimationDuration : m.showAnimationDuration;
          if (!u || !l || void 0 === l.x)
            return (
              C("initialZoom" + (s ? "Out" : "In")),
              (v = r.initialZoomLevel),
              E(b, r.initialPosition),
              A(),
              (p.style.opacity = s ? 0 : 1),
              T(1),
              void (u
                ? setTimeout(function () {
                    a();
                  }, u)
                : a())
            );
          var c, d;
          (c = G),
            (d = !f.currItem.src || f.currItem.loadError || m.showHideOpacity),
            r.miniImg && (r.miniImg.style.webkitBackfaceVisibility = "hidden"),
            s ||
              ((v = l.w / r.w),
              (b.x = l.x),
              (b.y = l.y - ve),
              (f[d ? "template" : "bg"].style.opacity = 0.001),
              A()),
            lt("initialZoom"),
            s && !c && h.removeClass(p, "pswp--animated-in"),
            d &&
              (s
                ? h[(c ? "remove" : "add") + "Class"](
                    p,
                    "pswp--animate_opacity"
                  )
                : setTimeout(function () {
                    h.addClass(p, "pswp--animate_opacity");
                  }, 30)),
            (Kt = setTimeout(
              function () {
                var t, n, i, o, e;
                C("initialZoom" + (s ? "Out" : "In")),
                  s
                    ? ((t = l.w / r.w),
                      (n = { x: b.x, y: b.y }),
                      (i = v),
                      (o = Le),
                      (e = function (e) {
                        1 === e
                          ? ((v = t), (b.x = l.x), (b.y = l.y - be))
                          : ((v = (t - i) * e + i),
                            (b.x = (l.x - n.x) * e + n.x),
                            (b.y = (l.y - be - n.y) * e + n.y)),
                          A(),
                          d ? (p.style.opacity = 1 - e) : T(o - e * o);
                      }),
                      c
                        ? ct("initialZoom", 0, 1, u, h.easing.cubic.out, e, a)
                        : (e(1), (Kt = setTimeout(a, u + 20))))
                    : ((v = r.initialZoomLevel),
                      E(b, r.initialPosition),
                      A(),
                      T(1),
                      d ? (p.style.opacity = 1) : T(1),
                      (Kt = setTimeout(a, u + 20)));
              },
              s ? 25 : 90
            ));
        },
        O = {},
        nn = [],
        on = {
          index: 0,
          errorMsg:
            '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
          forceProgressiveLoading: !1,
          preload: [1, 1],
          getNumItemsFn: function () {
            return Gt.length;
          },
        },
        rn = function () {
          return {
            center: { x: 0, y: 0 },
            max: { x: 0, y: 0 },
            min: { x: 0, y: 0 },
          };
        },
        sn = function (e, t, n) {
          var i = e.bounds;
          (i.center.x = Math.round((O.x - t) / 2)),
            (i.center.y = Math.round((O.y - n) / 2) + e.vGap.top),
            (i.max.x = t > O.x ? Math.round(O.x - t) : i.center.x),
            (i.max.y = n > O.y ? Math.round(O.y - n) + e.vGap.top : i.center.y),
            (i.min.x = t > O.x ? 0 : i.center.x),
            (i.min.y = n > O.y ? e.vGap.top : i.center.y);
        },
        an = function (e, t, n) {
          var i, o;
          return e.src && !e.loadError
            ? ((i = !n) &&
                (e.vGap || (e.vGap = { top: 0, bottom: 0 }),
                C("parseVerticalMargin", e)),
              (O.x = t.x),
              (O.y = t.y - e.vGap.top - e.vGap.bottom),
              i &&
                ((t = O.x / e.w),
                (o = O.y / e.h),
                (e.fitRatio = t < o ? t : o),
                "orig" === (t = m.scaleMode)
                  ? (n = 1)
                  : "fit" === t && (n = e.fitRatio),
                (e.initialZoomLevel = n = 1 < n ? 1 : n),
                e.bounds || (e.bounds = rn())),
              n
                ? (sn(e, e.w * n, e.h * n),
                  i &&
                    n === e.initialZoomLevel &&
                    (e.initialPosition = e.bounds.center),
                  e.bounds)
                : void 0)
            : ((e.w = e.h = 0),
              (e.initialZoomLevel = e.fitRatio = 1),
              (e.bounds = rn()),
              (e.initialPosition = e.bounds.center),
              e.bounds);
        },
        ln = function (e, t, n, i, o, r) {
          t.loadError ||
            (i &&
              ((t.imageAppended = !0),
              un(t, i, t === f.currItem && Ye),
              n.appendChild(i),
              r &&
                setTimeout(function () {
                  t &&
                    t.loaded &&
                    t.placeholder &&
                    ((t.placeholder.style.display = "none"),
                    (t.placeholder = null));
                }, 500)));
        },
        un = function (e, t, n) {
          var i;
          e.src &&
            ((t = t || e.container.lastChild),
            (i = n ? e.w : Math.round(e.w * e.fitRatio)),
            (n = n ? e.h : Math.round(e.h * e.fitRatio)),
            e.placeholder &&
              !e.loaded &&
              ((e.placeholder.style.width = i + "px"),
              (e.placeholder.style.height = n + "px")),
            (t.style.width = i + "px"),
            (t.style.height = n + "px"));
        };
      R("Controller", {
        publicMethods: {
          lazyLoadItem: function (e) {
            e = H(e);
            var t = en(e);
            t &&
              ((!t.loaded && !t.loading) || se) &&
              (C("gettingData", e, t), t.src && Yt(t));
          },
          initController: function () {
            h.extend(m, on, !0),
              (f.items = Gt = t),
              (en = f.getItemAt),
              (M = m.getNumItemsFn),
              m.loop,
              M() < 3 && (m.loop = !1),
              r("beforeChange", function (e) {
                for (
                  var t = m.preload,
                    n = null === e || 0 <= e,
                    i = Math.min(t[0], M()),
                    o = Math.min(t[1], M()),
                    r = 1;
                  r <= (n ? o : i);
                  r++
                )
                  f.lazyLoadItem(g + r);
                for (r = 1; r <= (n ? i : o); r++) f.lazyLoadItem(g - r);
              }),
              r("initialLayout", function () {
                f.currItem.initialLayout =
                  m.getThumbBoundsFn && m.getThumbBoundsFn(g);
              }),
              r("mainScrollAnimComplete", Xt),
              r("initialZoomInEnd", Xt),
              r("destroy", function () {
                for (var e, t = 0; t < Gt.length; t++)
                  (e = Gt[t]).container && (e.container = null),
                    e.placeholder && (e.placeholder = null),
                    e.img && (e.img = null),
                    e.preloader && (e.preloader = null),
                    e.loadError && (e.loaded = e.loadError = !1);
                nn = null;
              });
          },
          getItemAt: function (e) {
            return 0 <= e && void 0 !== Gt[e] && Gt[e];
          },
          allowProgressiveImg: function () {
            return (
              m.forceProgressiveLoading ||
              !i ||
              m.mouseUsed ||
              1200 < screen.width
            );
          },
          setContent: function (t, n) {
            m.loop && (n = H(n));
            var e = f.getItemAt(t.index);
            e && (e.container = null);
            var i,
              o,
              r,
              e = f.getItemAt(n);
            e
              ? (C("gettingData", n, e),
                (t.index = n),
                (o = (t.item = e).container = h.createEl("pswp__zoom-wrap")),
                !e.src &&
                  e.html &&
                  (e.html.tagName
                    ? o.appendChild(e.html)
                    : (o.innerHTML = e.html)),
                Zt(e),
                an(e, k),
                !e.src || e.loadError || e.loaded
                  ? e.src &&
                    !e.loadError &&
                    (((i = h.createEl("pswp__img", "img")).style.opacity = 1),
                    (i.src = e.src),
                    un(e, i),
                    ln(n, e, o, i, !0))
                  : ((e.loadComplete = function (e) {
                      if (X) {
                        if (t && t.index === n) {
                          if (Zt(e, !0))
                            return (
                              (e.loadComplete = e.img = null),
                              an(e, k),
                              Ke(e),
                              void (t.index === g && f.updateCurrZoomItem())
                            );
                          e.imageAppended
                            ? !Qt &&
                              e.placeholder &&
                              ((e.placeholder.style.display = "none"),
                              (e.placeholder = null))
                            : a.transform && (y || Qt)
                            ? nn.push({
                                item: e,
                                baseDiv: o,
                                img: e.img,
                                index: n,
                                holder: t,
                                clearPlaceholder: !0,
                              })
                            : ln(n, e, o, e.img, y || Qt, !0);
                        }
                        (e.loadComplete = null),
                          (e.img = null),
                          C("imageLoadComplete", n, e);
                      }
                    }),
                    h.features.transform &&
                      ((r = "pswp__img pswp__img--placeholder"),
                      (r += e.msrc ? "" : " pswp__img--placeholder--blank"),
                      (r = h.createEl(r, e.msrc ? "img" : "")),
                      e.msrc && (r.src = e.msrc),
                      un(e, r),
                      o.appendChild(r),
                      (e.placeholder = r)),
                    e.loading || Yt(e),
                    f.allowProgressiveImg() &&
                      (!Jt && a.transform
                        ? nn.push({
                            item: e,
                            baseDiv: o,
                            img: e.img,
                            index: n,
                            holder: t,
                          })
                        : ln(n, e, o, e.img, !0, !0))),
                Jt || n !== g ? Ke(e) : ((Me = o.style), tn(e, i || e.img)),
                (t.el.innerHTML = ""),
                t.el.appendChild(o))
              : (t.el.innerHTML = "");
          },
          cleanSlide: function (e) {
            e.img && (e.img.onload = e.img.onerror = null),
              (e.loaded = e.loading = e.img = e.imageAppended = !1);
          },
        },
      });
      function cn(e, t, n) {
        var i = document.createEvent("CustomEvent"),
          t = {
            origEvent: e,
            target: e.target,
            releasePoint: t,
            pointerType: n || "touch",
          };
        i.initCustomEvent("pswpTap", !0, !0, t), e.target.dispatchEvent(i);
      }
      var dn,
        P,
        pn = {};
      R("Tap", {
        publicMethods: {
          initTap: function () {
            r("firstTouchStart", f.onTapStart),
              r("touchRelease", f.onTapRelease),
              r("destroy", function () {
                (pn = {}), (dn = null);
              });
          },
          onTapStart: function (e) {
            1 < e.length && (clearTimeout(dn), (dn = null));
          },
          onTapRelease: function (e, t) {
            var n, i, o;
            !t ||
              De ||
              Ee ||
              st ||
              ((n = t),
              dn &&
              (clearTimeout(dn),
              (dn = null),
              (i = n),
              (o = pn),
              Math.abs(i.x - o.x) < N && Math.abs(i.y - o.y) < N)
                ? C("doubleTap", n)
                : "mouse" === t.type
                ? cn(e, t, "mouse")
                : "BUTTON" === e.target.tagName.toUpperCase() ||
                  h.hasClass(e.target, "pswp__single-tap")
                ? cn(e, t)
                : (E(pn, n),
                  (dn = setTimeout(function () {
                    cn(e, t), (dn = null);
                  }, 300))));
          },
        },
      }),
        R("DesktopZoom", {
          publicMethods: {
            initDesktopZoom: function () {
              ye ||
                (i
                  ? r("mouseUsed", function () {
                      f.setupDesktopZoom();
                    })
                  : f.setupDesktopZoom(!0));
            },
            setupDesktopZoom: function (e) {
              P = {};
              var t = "wheel mousewheel DOMMouseScroll";
              r("bindEvents", function () {
                h.bind(p, t, f.handleMouseWheel);
              }),
                r("unbindEvents", function () {
                  P && h.unbind(p, t, f.handleMouseWheel);
                }),
                (f.mouseZoomedIn = !1);
              function n() {
                f.mouseZoomedIn &&
                  (h.removeClass(p, "pswp--zoomed-in"), (f.mouseZoomedIn = !1)),
                  v < 1
                    ? h.addClass(p, "pswp--zoom-allowed")
                    : h.removeClass(p, "pswp--zoom-allowed"),
                  o();
              }
              var i,
                o = function () {
                  i && (h.removeClass(p, "pswp--dragging"), (i = !1));
                };
              r("resize", n),
                r("afterChange", n),
                r("pointerDown", function () {
                  f.mouseZoomedIn &&
                    ((i = !0), h.addClass(p, "pswp--dragging"));
                }),
                r("pointerUp", o),
                e || n();
            },
            handleMouseWheel: function (e) {
              if (v <= f.currItem.fitRatio)
                return (
                  m.modal &&
                    (!m.closeOnScroll || st || l
                      ? e.preventDefault()
                      : pe && 2 < Math.abs(e.deltaY) && ((G = !0), f.close())),
                  !0
                );
              if ((e.stopPropagation(), (P.x = 0), "deltaX" in e))
                1 === e.deltaMode
                  ? ((P.x = 18 * e.deltaX), (P.y = 18 * e.deltaY))
                  : ((P.x = e.deltaX), (P.y = e.deltaY));
              else if ("wheelDelta" in e)
                e.wheelDeltaX && (P.x = -0.16 * e.wheelDeltaX),
                  e.wheelDeltaY
                    ? (P.y = -0.16 * e.wheelDeltaY)
                    : (P.y = -0.16 * e.wheelDelta);
              else {
                if (!("detail" in e)) return;
                P.y = e.detail;
              }
              it(v, !0);
              var t = b.x - P.x,
                n = b.y - P.y;
              (m.modal ||
                (t <= d.min.x &&
                  t >= d.max.x &&
                  n <= d.min.y &&
                  n >= d.max.y)) &&
                e.preventDefault(),
                f.panTo(t, n);
            },
            toggleDesktopZoom: function (e) {
              e = e || { x: k.x / 2 + ze.x, y: k.y / 2 + ze.y };
              var t = m.getDoubleTapZoom(!0, f.currItem),
                n = v === t;
              (f.mouseZoomedIn = !n),
                f.zoomTo(n ? f.currItem.initialZoomLevel : t, e, 333),
                h[(n ? "remove" : "add") + "Class"](p, "pswp--zoomed-in");
            },
          },
        });
      function hn() {
        mn && clearTimeout(mn), vn && clearTimeout(vn);
      }
      function fn() {
        var e = An(),
          t = {};
        if (e.length < 5) return t;
        var n,
          i = e.split("&");
        for (r = 0; r < i.length; r++)
          !i[r] || (n = i[r].split("=")).length < 2 || (t[n[0]] = n[1]);
        if (m.galleryPIDs) {
          for (var o = t.pid, r = (t.pid = 0); r < Gt.length; r++)
            if (Gt[r].pid === o) {
              t.pid = r;
              break;
            }
        } else t.pid = parseInt(t.pid, 10) - 1;
        return t.pid < 0 && (t.pid = 0), t;
      }
      var mn,
        gn,
        vn,
        yn,
        bn,
        kn,
        o,
        wn,
        xn,
        Cn,
        I,
        Sn,
        Tn = { history: !0, galleryUID: 1 },
        An = function () {
          return I.hash.substring(1);
        },
        En = function () {
          var e, t;
          vn && clearTimeout(vn),
            st || l
              ? (vn = setTimeout(En, 500))
              : (yn ? clearTimeout(gn) : (yn = !0),
                (t = g + 1),
                (e = en(g)).hasOwnProperty("pid") && (t = e.pid),
                (e = o + "&gid=" + m.galleryUID + "&pid=" + t),
                wn || (-1 === I.hash.indexOf(e) && (Cn = !0)),
                (t = I.href.split("#")[0] + "#" + e),
                Sn
                  ? "#" + e !== window.location.hash &&
                    history[wn ? "replaceState" : "pushState"](
                      "",
                      document.title,
                      t
                    )
                  : wn
                  ? I.replace(t)
                  : (I.hash = e),
                (wn = !0),
                (gn = setTimeout(function () {
                  yn = !1;
                }, 60)));
        };
      R("History", {
        publicMethods: {
          initHistory: function () {
            var e, t;
            h.extend(m, Tn, !0),
              m.history &&
                ((I = window.location),
                (wn = xn = Cn = !1),
                (o = An()),
                (Sn = "pushState" in history),
                -1 < o.indexOf("gid=") &&
                  (o = (o = o.split("&gid=")[0]).split("?gid=")[0]),
                r("afterChange", f.updateURL),
                r("unbindEvents", function () {
                  h.unbind(window, "hashchange", f.onHashChange);
                }),
                (e = function () {
                  (kn = !0),
                    xn ||
                      (Cn
                        ? history.back()
                        : o
                        ? (I.hash = o)
                        : Sn
                        ? history.pushState(
                            "",
                            document.title,
                            I.pathname + I.search
                          )
                        : (I.hash = "")),
                    hn();
                }),
                r("unbindEvents", function () {
                  G && e();
                }),
                r("destroy", function () {
                  kn || e();
                }),
                r("firstUpdate", function () {
                  g = fn().pid;
                }),
                -1 < (t = o.indexOf("pid=")) &&
                  "&" === (o = o.substring(0, t)).slice(-1) &&
                  (o = o.slice(0, -1)),
                setTimeout(function () {
                  X && h.bind(window, "hashchange", f.onHashChange);
                }, 40));
          },
          onHashChange: function () {
            return An() === o
              ? ((xn = !0), void f.close())
              : void (yn || ((bn = !0), f.goTo(fn().pid), (bn = !1)));
          },
          updateURL: function () {
            hn(), bn || (wn ? (mn = setTimeout(En, 800)) : En());
          },
        },
      }),
        h.extend(f, B);
    };
  }),
  !(function (e, t) {
    "function" == typeof define && define.amd
      ? define(t)
      : "object" == typeof exports
      ? (module.exports = t())
      : (e.PhotoSwipeUI_Default = t());
  })(this, function () {
    "use strict";
    return function (i, a) {
      function e(e) {
        if (A) return !0;
        (e = e || window.event), T.timeToIdle && T.mouseUsed && !b && l();
        for (
          var t,
            n,
            i = (e.target || e.srcElement).getAttribute("class") || "",
            o = 0;
          o < P.length;
          o++
        )
          (t = P[o]).onTap &&
            -1 < i.indexOf("pswp__" + t.name) &&
            (t.onTap(), (n = !0));
        n &&
          (e.stopPropagation && e.stopPropagation(),
          (A = !0),
          (e = a.features.isOldAndroid ? 600 : 30),
          setTimeout(function () {
            A = !1;
          }, e));
      }
      function n() {
        var e = 1 === T.getNumItemsFn();
        e !== S && (M(h, "ui--one-slide", e), (S = e));
      }
      function s() {
        M(v, "share-modal--hidden", j);
      }
      function o() {
        if (
          ((j = !j)
            ? (a.removeClass(v, "pswp__share-modal--fade-in"),
              setTimeout(function () {
                j && s();
              }, 300))
            : (s(),
              setTimeout(function () {
                j || a.addClass(v, "pswp__share-modal--fade-in");
              }, 30)),
          !j)
        ) {
          for (var e, t, n, i, o = "", r = 0; r < T.shareButtons.length; r++)
            (e = T.shareButtons[r]),
              (t = T.getImageURLForShare(e)),
              (n = T.getPageURLForShare(e)),
              (i = T.getTextForShare(e)),
              (o +=
                '<a href="' +
                e.url
                  .replace("{{url}}", encodeURIComponent(n))
                  .replace("{{image_url}}", encodeURIComponent(t))
                  .replace("{{raw_image_url}}", t)
                  .replace("{{text}}", encodeURIComponent(i)) +
                '" target="_blank" class="pswp__share--' +
                e.id +
                '"' +
                (e.download ? "download" : "") +
                ">" +
                e.label +
                "</a>"),
              T.parseShareButtonOut && (o = T.parseShareButtonOut(e, o));
          (v.children[0].innerHTML = o), (v.children[0].onclick = B);
        }
      }
      function r(e) {
        for (var t = 0; t < T.closeElClasses.length; t++)
          if (a.hasClass(e, "pswp__" + T.closeElClasses[t])) return !0;
      }
      function l() {
        clearTimeout(_), (O = 0), b && D.setIdle(!1);
      }
      function u(e) {
        ((e = (e = e || window.event).relatedTarget || e.toElement) &&
          "HTML" !== e.nodeName) ||
          (clearTimeout(_),
          (_ = setTimeout(function () {
            D.setIdle(!0);
          }, T.timeToIdleOutside)));
      }
      function c(e) {
        x !== e && (M(w, "preloader--active", !e), (x = e));
      }
      function d(e) {
        var t,
          n = e.vGap;
        !i.likelyTouchDevice || T.mouseUsed || screen.width > T.fitControlsWidth
          ? ((t = T.barsSize),
            T.captionEl && "auto" === t.bottom
              ? (m ||
                  ((m = a.createEl(
                    "pswp__caption pswp__caption--fake"
                  )).appendChild(a.createEl("pswp__caption__center")),
                  h.insertBefore(m, f),
                  a.addClass(h, "pswp__ui--fit")),
                T.addCaptionHTMLFn(e, m, !0)
                  ? ((e = m.clientHeight), (n.bottom = parseInt(e, 10) || 44))
                  : (n.bottom = t.top))
              : (n.bottom = "auto" === t.bottom ? 0 : t.bottom),
            (n.top = t.top))
          : (n.top = n.bottom = 0);
      }
      function I() {
        function e(e) {
          if (e)
            for (var t = e.length, n = 0; n < t; n++) {
              (o = e[n]), (r = o.className);
              for (var i = 0; i < P.length; i++)
                (s = P[i]),
                  -1 < r.indexOf("pswp__" + s.name) &&
                    (T[s.option]
                      ? (a.removeClass(o, "pswp__element--disabled"),
                        s.onInit && s.onInit(o))
                      : a.addClass(o, "pswp__element--disabled"));
            }
        }
        e(h.children);
        var o,
          r,
          s,
          t = a.getChildByClass(h, "pswp__top-bar");
        t && e(t.children);
      }
      var p,
        h,
        f,
        m,
        t,
        g,
        v,
        y,
        b,
        k,
        w,
        x,
        C,
        S,
        T,
        A,
        E,
        _,
        D = this,
        $ = !1,
        F = !0,
        j = !0,
        L = {
          barsSize: { top: 44, bottom: "auto" },
          closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
          timeToIdle: 4e3,
          timeToIdleOutside: 1e3,
          loadingIndicatorDelay: 1e3,
          addCaptionHTMLFn: function (e, t) {
            return e.title
              ? ((t.children[0].innerHTML = e.title), !0)
              : ((t.children[0].innerHTML = ""), !1);
          },
          closeEl: !0,
          captionEl: !0,
          fullscreenEl: !0,
          zoomEl: !0,
          shareEl: !0,
          counterEl: !0,
          arrowEl: !0,
          preloaderEl: !0,
          tapToClose: !1,
          tapToToggleControls: !0,
          clickToCloseNonZoomable: !0,
          shareButtons: [
            {
              id: "facebook",
              label: "Share on Facebook",
              url: "https://www.facebook.com/sharer/sharer.php?u={{url}}",
            },
            {
              id: "twitter",
              label: "Tweet",
              url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}",
            },
            {
              id: "pinterest",
              label: "Pin it",
              url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}",
            },
            {
              id: "download",
              label: "Download image",
              url: "{{raw_image_url}}",
              download: !0,
            },
          ],
          getImageURLForShare: function () {
            return i.currItem.src || "";
          },
          getPageURLForShare: function () {
            return window.location.href;
          },
          getTextForShare: function () {
            return i.currItem.title || "";
          },
          indexIndicatorSep: " / ",
          fitControlsWidth: 1200,
        },
        M = function (e, t, n) {
          a[(n ? "add" : "remove") + "Class"](e, "pswp__" + t);
        },
        B = function (e) {
          var t = (e = e || window.event).target || e.srcElement;
          return (
            i.shout("shareLinkClick", e, t),
            !(
              !t.href ||
              (!t.hasAttribute("download") &&
                (window.open(
                  t.href,
                  "pswp_share",
                  "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" +
                    (window.screen ? Math.round(screen.width / 2 - 275) : 100)
                ),
                j || o(),
                1))
            )
          );
        },
        O = 0,
        P = [
          {
            name: "caption",
            option: "captionEl",
            onInit: function (e) {
              f = e;
            },
          },
          {
            name: "share-modal",
            option: "shareEl",
            onInit: function (e) {
              v = e;
            },
            onTap: function () {
              o();
            },
          },
          {
            name: "button--share",
            option: "shareEl",
            onInit: function (e) {
              g = e;
            },
            onTap: function () {
              o();
            },
          },
          {
            name: "button--zoom",
            option: "zoomEl",
            onTap: i.toggleDesktopZoom,
          },
          {
            name: "counter",
            option: "counterEl",
            onInit: function (e) {
              t = e;
            },
          },
          { name: "button--close", option: "closeEl", onTap: i.close },
          { name: "button--arrow--left", option: "arrowEl", onTap: i.prev },
          { name: "button--arrow--right", option: "arrowEl", onTap: i.next },
          {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function () {
              p.isFullscreen() ? p.exit() : p.enter();
            },
          },
          {
            name: "preloader",
            option: "preloaderEl",
            onInit: function (e) {
              w = e;
            },
          },
        ];
      (D.init = function () {
        var t;
        a.extend(i.options, L, !0),
          (T = i.options),
          (h = a.getChildByClass(i.scrollWrap, "pswp__ui")),
          (k = i.listen)("onVerticalDrag", function (e) {
            F && e < 0.95
              ? D.hideControls()
              : !F && 0.95 <= e && D.showControls();
          }),
          k("onPinchClose", function (e) {
            F && e < 0.9
              ? (D.hideControls(), (t = !0))
              : t && !F && 0.9 < e && D.showControls();
          }),
          k("zoomGestureEnded", function () {
            (t = !1) && !F && D.showControls();
          }),
          k("beforeChange", D.update),
          k("doubleTap", function (e) {
            var t = i.currItem.initialZoomLevel;
            i.getZoomLevel() !== t
              ? i.zoomTo(t, e, 333)
              : i.zoomTo(T.getDoubleTapZoom(!1, i.currItem), e, 333);
          }),
          k("preventDragEvent", function (e, t, n) {
            var i = e.target || e.srcElement;
            i &&
              i.getAttribute("class") &&
              -1 < e.type.indexOf("mouse") &&
              (0 < i.getAttribute("class").indexOf("__caption") ||
                /(SMALL|STRONG|EM)/i.test(i.tagName)) &&
              (n.prevent = !1);
          }),
          k("bindEvents", function () {
            a.bind(h, "pswpTap click", e),
              a.bind(i.scrollWrap, "pswpTap", D.onGlobalTap),
              i.likelyTouchDevice ||
                a.bind(i.scrollWrap, "mouseover", D.onMouseOver);
          }),
          k("unbindEvents", function () {
            j || o(),
              E && clearInterval(E),
              a.unbind(document, "mouseout", u),
              a.unbind(document, "mousemove", l),
              a.unbind(h, "pswpTap click", e),
              a.unbind(i.scrollWrap, "pswpTap", D.onGlobalTap),
              a.unbind(i.scrollWrap, "mouseover", D.onMouseOver),
              p &&
                (a.unbind(document, p.eventK, D.updateFullscreen),
                p.isFullscreen() && ((T.hideAnimationDuration = 0), p.exit()),
                (p = null));
          }),
          k("destroy", function () {
            T.captionEl &&
              (m && h.removeChild(m), a.removeClass(f, "pswp__caption--empty")),
              v && (v.children[0].onclick = null),
              a.removeClass(h, "pswp__ui--over-close"),
              a.addClass(h, "pswp__ui--hidden"),
              D.setIdle(!1);
          }),
          T.showAnimationDuration || a.removeClass(h, "pswp__ui--hidden"),
          k("initialZoomIn", function () {
            T.showAnimationDuration && a.removeClass(h, "pswp__ui--hidden");
          }),
          k("initialZoomOut", function () {
            a.addClass(h, "pswp__ui--hidden");
          }),
          k("parseVerticalMargin", d),
          I(),
          T.shareEl && g && v && (j = !0),
          n(),
          T.timeToIdle &&
            k("mouseUsed", function () {
              a.bind(document, "mousemove", l),
                a.bind(document, "mouseout", u),
                (E = setInterval(function () {
                  2 === ++O && D.setIdle(!0);
                }, T.timeToIdle / 2));
            }),
          T.fullscreenEl &&
            !a.features.isOldAndroid &&
            ((p = p || D.getFullscreenAPI())
              ? (a.bind(document, p.eventK, D.updateFullscreen),
                D.updateFullscreen(),
                a.addClass(i.template, "pswp--supports-fs"))
              : a.removeClass(i.template, "pswp--supports-fs")),
          T.preloaderEl &&
            (c(!0),
            k("beforeChange", function () {
              clearTimeout(C),
                (C = setTimeout(function () {
                  i.currItem && i.currItem.loading
                    ? (i.allowProgressiveImg() &&
                        (!i.currItem.img || i.currItem.img.naturalWidth)) ||
                      c(!1)
                    : c(!0);
                }, T.loadingIndicatorDelay));
            }),
            k("imageLoadComplete", function (e, t) {
              i.currItem === t && c(!0);
            }));
      }),
        (D.setIdle = function (e) {
          M(h, "ui--idle", (b = e));
        }),
        (D.update = function () {
          ($ =
            !(!F || !i.currItem) &&
            (D.updateIndexIndicator(),
            T.captionEl &&
              (T.addCaptionHTMLFn(i.currItem, f),
              M(f, "caption--empty", !i.currItem.title)),
            !0)),
            j || o(),
            n();
        }),
        (D.updateFullscreen = function (e) {
          e &&
            setTimeout(function () {
              i.setScrollOffset(0, a.getScrollY());
            }, 50),
            a[(p.isFullscreen() ? "add" : "remove") + "Class"](
              i.template,
              "pswp--fs"
            );
        }),
        (D.updateIndexIndicator = function () {
          T.counterEl &&
            (t.innerHTML =
              i.getCurrentIndex() +
              1 +
              T.indexIndicatorSep +
              T.getNumItemsFn());
        }),
        (D.onGlobalTap = function (e) {
          var t = (e = e || window.event).target || e.srcElement;
          if (!A)
            if (e.detail && "mouse" === e.detail.pointerType)
              r(t)
                ? i.close()
                : a.hasClass(t, "pswp__img") &&
                  (1 === i.getZoomLevel() &&
                  i.getZoomLevel() <= i.currItem.fitRatio
                    ? T.clickToCloseNonZoomable && i.close()
                    : i.toggleDesktopZoom(e.detail.releasePoint));
            else if (
              (T.tapToToggleControls &&
                (F ? D.hideControls() : D.showControls()),
              T.tapToClose && (a.hasClass(t, "pswp__img") || r(t)))
            )
              return void i.close();
        }),
        (D.onMouseOver = function (e) {
          e = (e = e || window.event).target || e.srcElement;
          M(h, "ui--over-close", r(e));
        }),
        (D.hideControls = function () {
          a.addClass(h, "pswp__ui--hidden"), (F = !1);
        }),
        (D.showControls = function () {
          (F = !0), $ || D.update(), a.removeClass(h, "pswp__ui--hidden");
        }),
        (D.supportsFullscreen = function () {
          var e = document;
          return !!(
            e.exitFullscreen ||
            e.mozCancelFullScreen ||
            e.webkitExitFullscreen ||
            e.msExitFullscreen
          );
        }),
        (D.getFullscreenAPI = function () {
          var e,
            t = document.documentElement,
            n = "fullscreenchange";
          return (
            t.requestFullscreen
              ? (e = {
                  enterK: "requestFullscreen",
                  exitK: "exitFullscreen",
                  elementK: "fullscreenElement",
                  eventK: n,
                })
              : t.mozRequestFullScreen
              ? (e = {
                  enterK: "mozRequestFullScreen",
                  exitK: "mozCancelFullScreen",
                  elementK: "mozFullScreenElement",
                  eventK: "moz" + n,
                })
              : t.webkitRequestFullscreen
              ? (e = {
                  enterK: "webkitRequestFullscreen",
                  exitK: "webkitExitFullscreen",
                  elementK: "webkitFullscreenElement",
                  eventK: "webkit" + n,
                })
              : t.msRequestFullscreen &&
                (e = {
                  enterK: "msRequestFullscreen",
                  exitK: "msExitFullscreen",
                  elementK: "msFullscreenElement",
                  eventK: "MSFullscreenChange",
                }),
            e &&
              ((e.enter = function () {
                return (
                  (y = T.closeOnScroll),
                  (T.closeOnScroll = !1),
                  "webkitRequestFullscreen" !== this.enterK
                    ? i.template[this.enterK]()
                    : void i.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
                );
              }),
              (e.exit = function () {
                return (T.closeOnScroll = y), document[this.exitK]();
              }),
              (e.isFullscreen = function () {
                return document[this.elementK];
              })),
            e
          );
        });
    };
  }),
  !(function (s) {
    "use strict";
    function n() {
      return !1;
    }
    function r(e, t) {
      return (
        (this.settings = t),
        (this.el = e),
        (this.$el = s(e)),
        this._initElements(),
        this
      );
    }
    var e = "kinetic-active";
    window.requestAnimationFrame ||
      (window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e) {
          window.setTimeout(e, 1e3 / 60);
        }),
      (s.support = s.support || {}),
      s.extend(s.support, { touch: "ontouchend" in document });
    (r.DATA_KEY = "kinetic"),
      (r.DEFAULTS = {
        cursor: "move",
        decelerate: !0,
        triggerHardware: !1,
        threshold: 0,
        y: !0,
        x: !0,
        slowdown: 0.9,
        maxvelocity: 40,
        throttleFPS: 60,
        movingClass: {
          up: "kinetic-moving-up",
          down: "kinetic-moving-down",
          left: "kinetic-moving-left",
          right: "kinetic-moving-right",
        },
        deceleratingClass: {
          up: "kinetic-decelerating-up",
          down: "kinetic-decelerating-down",
          left: "kinetic-decelerating-left",
          right: "kinetic-decelerating-right",
        },
      }),
      (r.prototype.start = function (e) {
        (this.settings = s.extend(this.settings, e)),
          (this.velocity = e.velocity || this.velocity),
          (this.velocityY = e.velocityY || this.velocityY),
          (this.settings.decelerate = !1),
          this._move();
      }),
      (r.prototype.end = function () {
        this.settings.decelerate = !0;
      }),
      (r.prototype.stop = function () {
        (this.velocity = 0),
          (this.velocityY = 0),
          (this.settings.decelerate = !0),
          s.isFunction(this.settings.stopped) &&
            this.settings.stopped.call(this);
      }),
      (r.prototype.detach = function () {
        this._detachListeners(), this.$el.removeClass(e).css("cursor", "");
      }),
      (r.prototype.attach = function () {
        this.$el.hasClass(e) ||
          (this._attachListeners(this.$el),
          this.$el.addClass(e).css("cursor", this.settings.cursor));
      }),
      (r.prototype._initElements = function () {
        this.$el.addClass(e),
          s.extend(this, {
            xpos: null,
            prevXPos: !1,
            ypos: null,
            prevYPos: !1,
            mouseDown: !1,
            throttleTimeout: 1e3 / this.settings.throttleFPS,
            lastMove: null,
            elementFocused: null,
          }),
          (this.velocity = 0),
          (this.velocityY = 0),
          s(document)
            .mouseup(s.proxy(this._resetMouse, this))
            .click(s.proxy(this._resetMouse, this)),
          this._initEvents(),
          this.$el.css("cursor", this.settings.cursor),
          this.settings.triggerHardware &&
            this.$el.css({
              "-webkit-transform": "translate3d(0,0,0)",
              "-webkit-perspective": "1000",
              "-webkit-backface-visibility": "hidden",
            });
      }),
      (r.prototype._initEvents = function () {
        var n = this;
        (this.settings.events = {
          touchStart: function (e) {
            var t;
            n._useTarget(e.target, e) &&
              ((t = e.originalEvent.touches[0]),
              (n.threshold = n._threshold(e.target, e)),
              n._start(t.clientX, t.clientY),
              e.stopPropagation());
          },
          touchMove: function (e) {
            var t;
            n.mouseDown &&
              ((t = e.originalEvent.touches[0]),
              n._inputmove(t.clientX, t.clientY),
              e.preventDefault && e.preventDefault());
          },
          inputDown: function (e) {
            n._useTarget(e.target, e) &&
              ((n.threshold = n._threshold(e.target, e)),
              n._start(e.clientX, e.clientY),
              (n.elementFocused = e.target),
              "IMG" === e.target.nodeName && e.preventDefault(),
              e.stopPropagation());
          },
          inputEnd: function (e) {
            n._useTarget(e.target, e) &&
              (n._end(),
              (n.elementFocused = null),
              e.preventDefault && e.preventDefault());
          },
          inputMove: function (e) {
            n.mouseDown &&
              (n._inputmove(e.clientX, e.clientY),
              e.preventDefault && e.preventDefault());
          },
          scroll: function (e) {
            s.isFunction(n.settings.moved) &&
              n.settings.moved.call(n, n.settings),
              e.preventDefault && e.preventDefault();
          },
          inputClick: function (e) {
            return 0 < Math.abs(n.velocity) ? (e.preventDefault(), !1) : void 0;
          },
          dragStart: function (e) {
            return (!n._useTarget(e.target, e) || !n.elementFocused) && void 0;
          },
        }),
          this._attachListeners(this.$el, this.settings);
      }),
      (r.prototype._inputmove = function (e, t) {
        var n = this.$el;
        if (
          (this.el,
          (!this.lastMove ||
            new Date() >
              new Date(this.lastMove.getTime() + this.throttleTimeout)) &&
            ((this.lastMove = new Date()),
            this.mouseDown && (this.xpos || this.ypos)))
        ) {
          var i = e - this.xpos,
            o = t - this.ypos;
          if (0 < this.threshold) {
            var r = Math.sqrt(i * i + o * o);
            if (this.threshold > r) return;
            this.threshold = 0;
          }
          this.elementFocused &&
            (s(this.elementFocused).blur(),
            (this.elementFocused = null),
            n.focus()),
            (this.settings.decelerate = !1),
            (this.velocity = this.velocityY = 0);
          (r = this.scrollLeft()), (n = this.scrollTop());
          this.scrollLeft(this.settings.x ? r - i : r),
            this.scrollTop(this.settings.y ? n - o : n),
            (this.prevXPos = this.xpos),
            (this.prevYPos = this.ypos),
            (this.xpos = e),
            (this.ypos = t),
            this._calculateVelocities(),
            this._setMoveClasses(this.settings.movingClass),
            s.isFunction(this.settings.moved) &&
              this.settings.moved.call(this, this.settings);
        }
      }),
      (r.prototype._calculateVelocities = function () {
        (this.velocity = this._capVelocity(
          this.prevXPos - this.xpos,
          this.settings.maxvelocity
        )),
          (this.velocityY = this._capVelocity(
            this.prevYPos - this.ypos,
            this.settings.maxvelocity
          ));
      }),
      (r.prototype._end = function () {
        this.xpos &&
          this.prevXPos &&
          !1 === this.settings.decelerate &&
          ((this.settings.decelerate = !0),
          this._calculateVelocities(),
          (this.xpos = this.prevXPos = this.mouseDown = !1),
          this._move());
      }),
      (r.prototype._useTarget = function (e, t) {
        return (
          !s.isFunction(this.settings.filterTarget) ||
          !1 !== this.settings.filterTarget.call(this, e, t)
        );
      }),
      (r.prototype._threshold = function (e, t) {
        return s.isFunction(this.settings.threshold)
          ? this.settings.threshold.call(this, e, t)
          : this.settings.threshold;
      }),
      (r.prototype._start = function (e, t) {
        (this.mouseDown = !0),
          (this.velocity = this.prevXPos = 0),
          (this.velocityY = this.prevYPos = 0),
          (this.xpos = e),
          (this.ypos = t);
      }),
      (r.prototype._resetMouse = function () {
        (this.xpos = !1), (this.ypos = !1), (this.mouseDown = !1);
      }),
      (r.prototype._decelerateVelocity = function (e, t) {
        return 0 === Math.floor(Math.abs(e)) ? 0 : e * t;
      }),
      (r.prototype._capVelocity = function (e, t) {
        var n = e;
        return 0 < e ? t < e && (n = t) : e < 0 - t && (n = 0 - t), n;
      }),
      (r.prototype._setMoveClasses = function (e) {
        var t = this.settings,
          n = this.$el;
        n
          .removeClass(t.movingClass.up)
          .removeClass(t.movingClass.down)
          .removeClass(t.movingClass.left)
          .removeClass(t.movingClass.right)
          .removeClass(t.deceleratingClass.up)
          .removeClass(t.deceleratingClass.down)
          .removeClass(t.deceleratingClass.left)
          .removeClass(t.deceleratingClass.right),
          0 < this.velocity && n.addClass(e.right),
          this.velocity < 0 && n.addClass(e.left),
          0 < this.velocityY && n.addClass(e.down),
          this.velocityY < 0 && n.addClass(e.up);
      }),
      (r.prototype._move = function () {
        this.$el;
        var e = this.el,
          t = this,
          n = t.settings;
        n.x && 0 < e.scrollWidth
          ? (this.scrollLeft(this.scrollLeft() + this.velocity),
            0 < Math.abs(this.velocity) &&
              (this.velocity = n.decelerate
                ? t._decelerateVelocity(this.velocity, n.slowdown)
                : this.velocity))
          : (this.velocity = 0),
          n.y && 0 < e.scrollHeight
            ? (this.scrollTop(this.scrollTop() + this.velocityY),
              0 < Math.abs(this.velocityY) &&
                (this.velocityY = n.decelerate
                  ? t._decelerateVelocity(this.velocityY, n.slowdown)
                  : this.velocityY))
            : (this.velocityY = 0),
          t._setMoveClasses(n.deceleratingClass),
          s.isFunction(n.moved) && n.moved.call(this, n),
          0 < Math.abs(this.velocity) || 0 < Math.abs(this.velocityY)
            ? this.moving ||
              ((this.moving = !0),
              window.requestAnimationFrame(function () {
                (t.moving = !1), t._move();
              }))
            : t.stop();
      }),
      (r.prototype._getScroller = function () {
        var e = this.$el;
        return (e = this.$el.is("body") || this.$el.is("html") ? s(window) : e);
      }),
      (r.prototype.scrollLeft = function (e) {
        var t = this._getScroller();
        return "number" != typeof e
          ? t.scrollLeft()
          : (t.scrollLeft(e), void (this.settings.scrollLeft = e));
      }),
      (r.prototype.scrollTop = function (e) {
        var t = this._getScroller();
        return "number" != typeof e
          ? t.scrollTop()
          : (t.scrollTop(e), void (this.settings.scrollTop = e));
      }),
      (r.prototype._attachListeners = function () {
        var e = this.$el,
          t = this.settings;
        s.support.touch &&
          e
            .bind("touchstart", t.events.touchStart)
            .bind("touchend", t.events.inputEnd)
            .bind("touchmove", t.events.touchMove),
          e
            .mousedown(t.events.inputDown)
            .mouseup(t.events.inputEnd)
            .mousemove(t.events.inputMove),
          e
            .click(t.events.inputClick)
            .scroll(t.events.scroll)
            .bind("selectstart", n)
            .bind("dragstart", t.events.dragStart);
      }),
      (r.prototype._detachListeners = function () {
        var e = this.$el,
          t = this.settings;
        s.support.touch &&
          e
            .unbind("touchstart", t.events.touchStart)
            .unbind("touchend", t.events.inputEnd)
            .unbind("touchmove", t.events.touchMove),
          e
            .unbind("mousedown", t.events.inputDown)
            .unbind("mouseup", t.events.inputEnd)
            .unbind("mousemove", t.events.inputMove),
          e
            .unbind("click", t.events.inputClick)
            .unbind("scroll", t.events.scroll)
            .unbind("selectstart", n)
            .unbind("dragstart", t.events.dragStart);
      }),
      (s.Kinetic = r),
      (s.fn.kinetic = function (i, o) {
        return this.each(function () {
          var e = s(this),
            t = e.data(r.DATA_KEY),
            n = s.extend({}, r.DEFAULTS, e.data(), "object" == typeof i && i);
          t || e.data(r.DATA_KEY, (t = new r(this, n))),
            "string" == typeof i && t[i](o);
        });
      });
  })(window.jQuery || window.Zepto),
  !(function (c) {
    "use strict";
    function i(e, t) {
      var n;
      if (!(this instanceof i)) return (n = new i(e, t)).open(), n;
      (this.id = i.id++),
        this.setup(e, t),
        this.chainCallbacks(i._callbackChain);
    }
    if (void 0 === c)
      return (
        "console" in window &&
        window.console.info("Too much lightness, Featherlight needs jQuery.")
      );
    if (c.fn.jquery.match(/-ajax/))
      return (
        "console" in window &&
        window.console.info(
          "Featherlight needs regular jQuery, not the slim version."
        )
      );
    function o(t) {
      return (s = c.grep(s, function (e) {
        return e !== t && 0 < e.$instance.closest("body").length;
      }));
    }
    function n(e) {
      c.each(i.opened().reverse(), function () {
        return e.isDefaultPrevented() || !1 !== this[l[e.type]](e)
          ? void 0
          : (e.preventDefault(), e.stopPropagation(), !1);
      });
    }
    function r(e) {
      var t;
      e !== i._globalHandlerInstalled &&
        ((i._globalHandlerInstalled = e),
        (t = c
          .map(l, function (e, t) {
            return t + "." + i.prototype.namespace;
          })
          .join(" ")),
        c(window)[e ? "on" : "off"](t, n));
    }
    var s = [],
      a = {
        allow: 1,
        allowfullscreen: 1,
        frameborder: 1,
        height: 1,
        longdesc: 1,
        marginheight: 1,
        marginwidth: 1,
        mozallowfullscreen: 1,
        name: 1,
        referrerpolicy: 1,
        sandbox: 1,
        scrolling: 1,
        src: 1,
        srcdoc: 1,
        style: 1,
        webkitallowfullscreen: 1,
        width: 1,
      },
      l = { keyup: "onKeyUp", resize: "onResize" };
    (i.prototype = {
      constructor: i,
      namespace: "featherlight",
      targetAttr: "data-featherlight",
      variant: null,
      resetCss: !1,
      background: null,
      openTrigger: "click",
      closeTrigger: "click",
      filter: null,
      root: "body",
      openSpeed: 250,
      closeSpeed: 250,
      closeOnClick: "background",
      closeOnEsc: !0,
      closeIcon: "&#10005;",
      loading: "",
      persist: !1,
      otherClose: null,
      beforeOpen: c.noop,
      beforeContent: c.noop,
      beforeClose: c.noop,
      afterOpen: c.noop,
      afterContent: c.noop,
      afterClose: c.noop,
      onKeyUp: c.noop,
      onResize: c.noop,
      type: null,
      contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
      setup: function (e, t) {
        "object" != typeof e ||
          e instanceof c != 0 ||
          t ||
          ((t = e), (e = void 0));
        var n = c.extend(this, t, { target: e }),
          t = n.resetCss ? n.namespace + "-reset" : n.namespace,
          e = c(
            n.background ||
              [
                '<div class="' + t + "-loading " + t + '">',
                '<div class="' + t + '-content">',
                '<button class="' +
                  t +
                  "-close-icon " +
                  n.namespace +
                  '-close" aria-label="Close">',
                n.closeIcon,
                "</button>",
                '<div class="' +
                  n.namespace +
                  '-inner">' +
                  n.loading +
                  "</div>",
                "</div>",
                "</div>",
              ].join("")
          ),
          i =
            "." +
            n.namespace +
            "-close" +
            (n.otherClose ? "," + n.otherClose : "");
        return (
          (n.$instance = e.clone().addClass(n.variant)),
          n.$instance.on(n.closeTrigger + "." + n.namespace, function (e) {
            var t;
            e.isDefaultPrevented() ||
              ((t = c(e.target)),
              (("background" === n.closeOnClick && t.is("." + n.namespace)) ||
                "anywhere" === n.closeOnClick ||
                t.closest(i).length) &&
                (n.close(e), e.preventDefault()));
          }),
          this
        );
      },
      getContent: function () {
        if (!1 !== this.persist && this.$content) return this.$content;
        function e(e) {
          return t.$currentTarget && t.$currentTarget.attr(e);
        }
        var t = this,
          n = this.constructor.contentFilters,
          i = e(t.targetAttr),
          o = t.target || i || "",
          r = n[t.type];
        if (
          (!r && o in n && ((r = n[o]), (o = t.target && i)),
          (o = o || e("href") || ""),
          !r)
        )
          for (var s in n) t[s] && ((r = n[s]), (o = t[s]));
        if (!r) {
          var a = o,
            o = null;
          if (
            (c.each(t.contentFilters, function () {
              return (
                (r = n[this]),
                !(o =
                  !(o = r.test ? r.test(a) : o) &&
                  r.regex &&
                  a.match &&
                  a.match(r.regex)
                    ? a
                    : o)
              );
            }),
            !o)
          )
            return (
              "console" in window &&
                window.console.error(
                  "Featherlight: no content filter found " +
                    (a ? ' for "' + a + '"' : " (no target specified)")
                ),
              !1
            );
        }
        return r.process.call(t, o);
      },
      setContent: function (e) {
        return (
          this.$instance.removeClass(this.namespace + "-loading"),
          this.$instance.toggleClass(
            this.namespace + "-iframe",
            e.is("iframe")
          ),
          this.$instance
            .find("." + this.namespace + "-inner")
            .not(e)
            .slice(1)
            .remove()
            .end()
            .replaceWith(c.contains(this.$instance[0], e[0]) ? "" : e),
          (this.$content = e.addClass(this.namespace + "-inner")),
          this
        );
      },
      open: function (t) {
        var n = this;
        if (
          (n.$instance.hide().appendTo(n.root),
          !((t && t.isDefaultPrevented()) || !1 === n.beforeOpen(t)))
        ) {
          t && t.preventDefault();
          var e = n.getContent();
          if (e)
            return (
              s.push(n),
              r(!0),
              n.$instance.fadeIn(n.openSpeed),
              n.beforeContent(t),
              c
                .when(e)
                .always(function (e) {
                  n.setContent(e), n.afterContent(t);
                })
                .then(n.$instance.promise())
                .done(function () {
                  n.afterOpen(t);
                })
            );
        }
        return n.$instance.detach(), c.Deferred().reject().promise();
      },
      close: function (e) {
        var t = this,
          n = c.Deferred();
        return (
          !1 === t.beforeClose(e)
            ? n.reject()
            : (0 === o(t).length && r(!1),
              t.$instance.fadeOut(t.closeSpeed, function () {
                t.$instance.detach(), t.afterClose(e), n.resolve();
              })),
          n.promise()
        );
      },
      resize: function (e, t) {
        var n;
        e &&
          t &&
          (this.$content.css("width", "").css("height", ""),
          1 <
            (n = Math.max(
              e / (this.$content.parent().width() - 1),
              t / (this.$content.parent().height() - 1)
            )) &&
            ((n = t / Math.floor(t / n)),
            this.$content
              .css("width", e / n + "px")
              .css("height", t / n + "px")));
      },
      chainCallbacks: function (e) {
        for (var t in e) this[t] = c.proxy(e[t], this, c.proxy(this[t], this));
      },
    }),
      c.extend(i, {
        id: 0,
        autoBind: "[data-featherlight]",
        defaults: i.prototype,
        contentFilters: {
          jquery: {
            regex: /^[#.]\w/,
            test: function (e) {
              return e instanceof c && e;
            },
            process: function (e) {
              return !1 !== this.persist ? c(e) : c(e).clone(!0);
            },
          },
          image: {
            regex: /\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,
            process: function (e) {
              var t = c.Deferred(),
                n = new Image(),
                i = c(
                  '<img src="' +
                    e +
                    '" alt="" class="' +
                    this.namespace +
                    '-image" />'
                );
              return (
                (n.onload = function () {
                  (i.naturalWidth = n.width),
                    (i.naturalHeight = n.height),
                    t.resolve(i);
                }),
                (n.onerror = function () {
                  t.reject(i);
                }),
                (n.src = e),
                t.promise()
              );
            },
          },
          html: {
            regex: /^\s*<[\w!][^<]*>/,
            process: function (e) {
              return c(e);
            },
          },
          ajax: {
            regex: /./,
            process: function (e) {
              var n = c.Deferred(),
                i = c("<div></div>").load(e, function (e, t) {
                  "error" !== t && n.resolve(i.contents()), n.fail();
                });
              return n.promise();
            },
          },
          iframe: {
            process: function (e) {
              var t = new c.Deferred(),
                n = c("<iframe/>"),
                i = (function (e, t) {
                  var n,
                    i = {},
                    o = new RegExp("^" + t + "([A-Z])(.*)");
                  for (n in e) {
                    var r = n.match(o);
                    r &&
                      (i[
                        (r[1] + r[2].replace(/([A-Z])/g, "-$1")).toLowerCase()
                      ] = e[n]);
                  }
                  return i;
                })(this, "iframe"),
                o = (function (e, t) {
                  var n,
                    i = {};
                  for (n in e) n in t && ((i[n] = e[n]), delete e[n]);
                  return i;
                })(i, a);
              return (
                n
                  .hide()
                  .attr("src", e)
                  .attr(o)
                  .css(i)
                  .on("load", function () {
                    t.resolve(n.show());
                  })
                  .appendTo(
                    this.$instance.find("." + this.namespace + "-content")
                  ),
                t.promise()
              );
            },
          },
          text: {
            process: function (e) {
              return c("<div>", { text: e });
            },
          },
        },
        functionAttributes: [
          "beforeOpen",
          "afterOpen",
          "beforeContent",
          "afterContent",
          "beforeClose",
          "afterClose",
        ],
        readElementConfig: function (e, t) {
          var n = this,
            i = new RegExp("^data-" + t + "-(.*)"),
            o = {};
          return (
            e &&
              e.attributes &&
              c.each(e.attributes, function () {
                var e = this.name.match(i);
                if (e) {
                  var t = this.value,
                    e = c.camelCase(e[1]);
                  if (0 <= c.inArray(e, n.functionAttributes))
                    t = new Function(t);
                  else
                    try {
                      t = JSON.parse(t);
                    } catch (e) {}
                  o[e] = t;
                }
              }),
            o
          );
        },
        extend: function (e, t) {
          function n() {
            this.constructor = e;
          }
          return (
            (n.prototype = this.prototype),
            (e.prototype = new n()),
            (e.__super__ = this.prototype),
            c.extend(e, this, t),
            (e.defaults = e.prototype),
            e
          );
        },
        attach: function (o, r, s) {
          var a = this;
          "object" != typeof r ||
            r instanceof c != 0 ||
            s ||
            ((s = r), (r = void 0));
          function e(e) {
            var t = c(e.currentTarget),
              n = c.extend(
                { $source: o, $currentTarget: t },
                a.readElementConfig(o[0], u.namespace),
                a.readElementConfig(e.currentTarget, u.namespace),
                s
              ),
              i = l || t.data("featherlight-persisted") || new a(r, n);
            "shared" === i.persist
              ? (l = i)
              : !1 !== i.persist && t.data("featherlight-persisted", i),
              n.$currentTarget.blur && n.$currentTarget.blur(),
              i.open(e);
          }
          var l,
            t = (s = c.extend({}, s)).namespace || a.defaults.namespace,
            u = c.extend({}, a.defaults, a.readElementConfig(o[0], t), s);
          return (
            o.on(u.openTrigger + "." + u.namespace, u.filter, e),
            { filter: u.filter, handler: e }
          );
        },
        current: function () {
          var e = this.opened();
          return e[e.length - 1] || null;
        },
        opened: function () {
          var t = this;
          return (
            o(),
            c.grep(s, function (e) {
              return e instanceof t;
            })
          );
        },
        close: function (e) {
          var t = this.current();
          return t ? t.close(e) : void 0;
        },
        _onReady: function () {
          var i,
            o = this;
          o.autoBind &&
            ((i = c(o.autoBind)).each(function () {
              o.attach(c(this));
            }),
            c(document).on("click", o.autoBind, function (e) {
              var t, n;
              e.isDefaultPrevented() ||
                ((t = c(e.currentTarget)),
                i.length !== (i = i.add(t)).length &&
                  (!(n = o.attach(t)).filter ||
                    0 < c(e.target).parentsUntil(t, n.filter).length) &&
                  n.handler(e));
            }));
        },
        _callbackChain: {
          onKeyUp: function (e, t) {
            return 27 === t.keyCode
              ? (this.closeOnEsc && c.featherlight.close(t), !1)
              : e(t);
          },
          beforeOpen: function (e, t) {
            return (
              c(document.documentElement).addClass("with-featherlight"),
              (this._previouslyActive = document.activeElement),
              (this._$previouslyTabbable = c(
                "a, input, select, textarea, iframe, button, iframe, [contentEditable=true]"
              )
                .not("[tabindex]")
                .not(this.$instance.find("button"))),
              (this._$previouslyWithTabIndex =
                c("[tabindex]").not('[tabindex="-1"]')),
              (this._previousWithTabIndices = this._$previouslyWithTabIndex.map(
                function (e, t) {
                  return c(t).attr("tabindex");
                }
              )),
              this._$previouslyWithTabIndex
                .add(this._$previouslyTabbable)
                .attr("tabindex", -1),
              document.activeElement.blur && document.activeElement.blur(),
              e(t)
            );
          },
          afterClose: function (e, t) {
            var e = e(t),
              n = this;
            return (
              this._$previouslyTabbable.removeAttr("tabindex"),
              this._$previouslyWithTabIndex.each(function (e, t) {
                c(t).attr("tabindex", n._previousWithTabIndices[e]);
              }),
              this._previouslyActive.focus(),
              0 === i.opened().length &&
                c(document.documentElement).removeClass("with-featherlight"),
              e
            );
          },
          onResize: function (e, t) {
            return (
              this.resize(
                this.$content.naturalWidth,
                this.$content.naturalHeight
              ),
              e(t)
            );
          },
          afterContent: function (e, t) {
            e = e(t);
            return (
              this.$instance.find("[autofocus]:not([disabled])").focus(),
              this.onResize(t),
              e
            );
          },
        },
      }),
      (c.featherlight = i),
      (c.fn.featherlight = function (e, t) {
        return i.attach(this, e, t), this;
      }),
      c(document).ready(function () {
        i._onReady();
      });
  })(jQuery),
  window.addEventListener("DOMContentLoaded", function () {
    "use strict";
    function getUrlParameter(e) {
      e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      e = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
      return null === e ? "" : decodeURIComponent(e[1].replace(/\+/g, " "));
    }
    function getMarketingParameters(i) {
      let t = "";
      const o = [
        "REF",
        "UTM_SOURCE",
        "UTM_MEDIUM",
        "UTM_CONT",
        "UTM_CAMP",
        "UTM_TERM",
      ];
      return (
        [
          "ref",
          "utm_source",
          "utm_medium",
          "utm_content",
          "utm_campaign",
          "utm_term",
        ]
          .map((e, t) => {
            let n = e;
            return (
              "mailerlite" === i && (n = `fields[${n}]`),
              {
                name: (n = "mailchimp" === i ? o[t] : n),
                value: getUrlParameter(e),
              }
            );
          })
          .forEach((e) => {
            e.value && (t += `&${e.name}=` + e.value);
          }),
        t
      );
    }
    window.unicornplatform = {};
    let elementsWithMask = document.querySelectorAll("[data-mask]");
    if (0 < elementsWithMask.length && void 0 !== window.IMask)
      for (let index = 0; index < elementsWithMask.length; index++) {
        const element = elementsWithMask[index],
          elementMask = element.getAttribute("data-mask");
        let mask = IMask(element, { mask: elementMask });
      }
    function removeParam(e) {
      var t = window.location.href,
        n = t.split("?")[0],
        i = [],
        t = -1 !== t.indexOf("?") ? t.split("?")[1] : "";
      if ("" !== t) {
        for (var o = (i = t.split("&")).length - 1; 0 <= o; --o)
          i[o].split("=")[0] === e && i.splice(o, 1);
        n = n + "?" + i.join("&");
      }
      return n;
    }
    function isMobile() {
      return /Android|iPhone|iPad|iPod|BlackBerry/i.test(
        navigator.userAgent || navigator.vendor || window.opera
      );
    }
    function isTablet() {
      return /(ipad|iPad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        navigator.userAgent
      );
    }
    function isPhone() {
      return Math.min(window.screen.width, window.screen.height) < 500;
    }
    !(function () {
      let e = $("body");
      isMobile() ? e.addClass("body--mobile") : e.addClass("body--desktop"),
        isTablet() && e.addClass("body--tablet"),
        isPhone() && e.addClass("body--phone"),
        e.addClass("body--loaded");
    })();
    var message = (function () {
        function t(e, t) {
          t && e.find(".js-error-message-text").text(t),
            e.addClass("state-visible");
        }
        function n(e) {
          for (var t, n = e.length, i = 0; i < n; i++)
            e[i].removeClass("state-visible"),
              (t = e[i]).removeClass("state-reacted"),
              t.find(".js-react-on-message").removeAttr("disabled");
        }
        function e() {
          $(document).on("click", ".js-react-on-message", function (e) {
            var t, n;
            e.preventDefault(),
              (e = $(this)),
              (t = e.parents(".js-message")),
              (n = t).addClass("state-reacted"),
              n.find(".js-react-on-message").attr("disabled", "disabled"),
              (n = e.text()),
              t.find(".js-reaction-text").text(n);
          });
        }
        return {
          show: t,
          hide: n,
          init: function () {
            $(document).on("click", ".js-open-engaging-message", function (e) {
              e.preventDefault();
              e = $(this).attr("data-index");
              t($('.js-engaging-message[data-index="' + e + '"]'));
            }),
              e(),
              $(document).on("click", ".js-close-message", function (e) {
                e.preventDefault(), n([$(this).parents(".js-message")]);
              });
          },
        };
      })(),
      button =
        (message.init(),
        {
          showSuccessTick: function (e) {
            e.addClass("state-show-success-tick");
          },
          removeSuccessTick: function (e) {
            e.removeClass("state-show-success-tick");
          },
          disableSubmit: function (e) {
            e.attr("disabled", "disabled");
          },
          enableSubmit: function (e) {
            e.removeAttr("disabled");
          },
          showSpinner: function (e) {
            e.addClass("state-show-spinner");
          },
          stopSpinner: function (e) {
            e.removeClass("state-show-spinner");
          },
        }),
      submitNoIntegrationForm = {
        init: function () {
          for (
            var e = $(".js-no-integration-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (e) {
              var t = e.find(".js-engaging-message"),
                n = e.find(".js-success-message"),
                i = e.find(".js-error-message"),
                o = e.find(".js-submit-button"),
                r = e.find(".js-form-input"),
                s = r.not("textarea");
              e.attr("success-redirect");
              e.on("submit", function (e) {
                e.preventDefault(),
                  $(this),
                  message.show(
                    i,
                    "The form is not connected to any integration."
                  );
              }),
                s.on("keypress", "", function (e) {
                  if (13 === e.which) return o.trigger("click"), !1;
                }),
                r
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([n, t, i]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      };
    function evaluateCodeAfterFormSubmission(
      codeString,
      $emailFormObject,
      responseData
    ) {
      if (codeString && 0 !== codeString.length)
        try {
          var formDataSerialize = $emailFormObject.serialize(),
            formDataSerializeArray = $emailFormObject.serializeArray(),
            formDataKeyValue = $emailFormObject
              .serializeArray()
              .reduce(function (e, t) {
                return (e[t.name] = t.value), e;
              }, {});
          eval(codeString);
        } catch (e) {
          console.error(
            '⚠️ Your "after form submission" JS code has failed to execute.'
          ),
            console.error("The code: "),
            console.info(codeString),
            console.error("The error message: "),
            console.info(e);
        }
    }
    function redirectAfterFormSubmission(e, t, n, i) {
      void 0 !== e &&
        0 < e.length &&
        (-1 !== (e = e).indexOf(".") &&
          -1 === e.indexOf("http://") &&
          -1 === e.indexOf("https://") &&
          (e = "http://" + e),
        "True" === n && (e = -1 !== e.indexOf("?") ? e + "&" + i : e + "?" + i),
        window.open(e, "True" === t ? "_blank" : "_self"));
    }
    function openPopupAfterFormSubmission(e) {
      e && "" !== e && ((e = $("#" + e)), customPopup().openPopup(e));
    }
    submitNoIntegrationForm.init(),
      (window.unicornplatform.subscribeMailchimpForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-mailchimp-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (o) {
              var r = o.find(".js-engaging-message"),
                s = o.find(".js-success-message"),
                a = o.find(".js-error-message"),
                l = o.find(".js-submit-button"),
                e = o.find(".js-form-input"),
                t = e.not("textarea"),
                u = o.attr("data-redirect-url"),
                c = o.attr("data-redirect-target-blank"),
                d = o.attr("data-pass-values-redirect"),
                p = o.attr("data-success-code");
              const h = o.attr("data-custom-popup-id");
              function i() {
                (t = o.attr("action")),
                  (n = ""),
                  (n = t.replace(/post\?u=/i, "post-json?u="));
                let e = (n += "&c=?");
                var t, n;
                let i = "application/json; charset=utf-8";
                o.attr("data-validation") &&
                  ((e = o.attr("action")),
                  (i = "application/x-www-form-urlencoded; charset=UTF-8")),
                  button.showSpinner(l),
                  button.disableSubmit(l),
                  $.ajax({
                    type: o.attr("method"),
                    url: e,
                    data: o.serialize() + getMarketingParameters("mailchimp"),
                    cache: !1,
                    dataType: "json",
                    contentType: i,
                  })
                    .done(function (e) {
                      "success" != e.result
                        ? (message.hide([s, r, a]),
                          message.show(a, e.msg),
                          button.stopSpinner(l),
                          button.enableSubmit(l))
                        : (message.hide([s, r, a]),
                          button.showSuccessTick(l),
                          setTimeout(function () {
                            button.stopSpinner(l);
                          }, 200),
                          setTimeout(function () {
                            button.removeSuccessTick(l), button.enableSubmit(l);
                          }, 3e3),
                          evaluateCodeAfterFormSubmission(p, o),
                          redirectAfterFormSubmission(u, c, d, o.serialize()),
                          openPopupAfterFormSubmission(h));
                    })
                    .fail(function (e) {
                      button.stopSpinner(l), button.enableSubmit(l);
                      let t =
                        "Uh. We could not connect to the server. Please try again later.";
                      e.responseJSON &&
                        e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([s, r, a]),
                        message.show(a, t),
                        console.log(e);
                    })
                    .always(function (e) {});
              }
              o.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) i($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else i($(this));
              }),
                t.on("keypress", "", function (e) {
                  if (13 === e.which) return l.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([s, r, a]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeMailchimpForm.init(),
      (window.unicornplatform.subscribeZapierForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-zapier-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (t) {
              var n = t.find(".js-engaging-message"),
                i = t.find(".js-success-message"),
                o = t.find(".js-error-message"),
                r = t.find(".js-submit-button"),
                e = t.find(".js-form-input"),
                s = e.not("textarea"),
                a = t.attr("data-redirect-url"),
                l = t.attr("data-redirect-target-blank"),
                u = t.attr("data-pass-values-redirect");
              const c = t.attr("data-custom-popup-id");
              var d = t.attr("data-success-code");
              function p() {
                button.showSpinner(r),
                  button.disableSubmit(r),
                  $.ajax({
                    type: t.attr("method"),
                    url: t.attr("action"),
                    data: t.serialize() + getMarketingParameters(),
                    cache: !1,
                    dataType: "json",
                  })
                    .done(function (e) {
                      "success" !== e.status
                        ? (message.hide([i, n, o]),
                          message.show(
                            o,
                            "There is an unknown error. We are so sorry!"
                          ),
                          button.stopSpinner(r),
                          button.enableSubmit(r))
                        : (message.hide([i, n, o]),
                          button.showSuccessTick(r),
                          setTimeout(function () {
                            button.stopSpinner(r);
                          }, 200),
                          setTimeout(function () {
                            button.removeSuccessTick(r), button.enableSubmit(r);
                          }, 3e3),
                          evaluateCodeAfterFormSubmission(d, t),
                          redirectAfterFormSubmission(a, l, u, t.serialize()),
                          openPopupAfterFormSubmission(c));
                    })
                    .fail(function (e) {
                      button.stopSpinner(r), button.enableSubmit(r);
                      let t =
                        "Uh. We could not connect to the server. Please try again later.";
                      e.responseJSON &&
                        e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([i, n, o]),
                        message.show(o, t),
                        console.log(e);
                    })
                    .always(function (e) {});
              }
              t.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) p($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else p($(this));
              }),
                s.on("keypress", "", function (e) {
                  if (13 === e.which) return r.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([i, n, o]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeZapierForm.init(),
      (window.unicornplatform.subscribeGoogleSheetForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-google-sheet-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (t) {
              var n = t.find(".js-engaging-message"),
                i = t.find(".js-success-message"),
                o = t.find(".js-error-message"),
                r = t.find(".js-submit-button"),
                e = t.find(".js-form-input"),
                s = e.not("textarea"),
                a = t.attr("data-redirect-url"),
                l = t.attr("data-redirect-target-blank"),
                u = t.attr("data-sheet-id"),
                c = t.attr("data-pass-values-redirect");
              const d = t.attr("data-custom-popup-id");
              var p = t.attr("data-success-code");
              function h() {
                button.showSpinner(r),
                  button.disableSubmit(r),
                  $.ajax({
                    type: t.attr("method"),
                    url: t.attr("action"),
                    data:
                      t.serialize() +
                      getMarketingParameters() +
                      "&SHEET_ID=" +
                      u,
                    cache: !1,
                    dataType: "json",
                  })
                    .done(function (e) {
                      "success" !== e.status
                        ? (message.hide([i, n, o]),
                          message.show(
                            o,
                            'There was an error. Perhaps you deleted the "ID" column or revoked access to the sheet? Re-adding the integration usually helps.'
                          ),
                          button.stopSpinner(r),
                          button.enableSubmit(r))
                        : (message.hide([i, n, o]),
                          button.showSuccessTick(r),
                          setTimeout(function () {
                            button.stopSpinner(r);
                          }, 200),
                          setTimeout(function () {
                            button.removeSuccessTick(r), button.enableSubmit(r);
                          }, 3e3),
                          evaluateCodeAfterFormSubmission(p, t),
                          redirectAfterFormSubmission(a, l, c, t.serialize()),
                          openPopupAfterFormSubmission(d));
                    })
                    .fail(function (e) {
                      button.stopSpinner(r), button.enableSubmit(r);
                      let t =
                        'Uh. We could not connect to the server. Please try again later. Perhaps you deleted the "ID" column or revoked access to the sheet? Re-adding the integration usually helps.';
                      e.responseJSON &&
                        e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([i, n, o]),
                        message.show(o, t),
                        console.log(e);
                    })
                    .always(function (e) {});
              }
              t.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) h($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else h($(this));
              }),
                s.on("keypress", "", function (e) {
                  if (13 === e.which) return r.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([i, n, o]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeGoogleSheetForm.init(),
      (window.unicornplatform.subscribeWebhookForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-webhook-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (t) {
              var n = t.find(".js-engaging-message"),
                i = t.find(".js-success-message"),
                o = t.find(".js-error-message"),
                r = t.find(".js-submit-button"),
                e = t.find(".js-form-input"),
                s = e.not("textarea"),
                a = t.attr("data-redirect-url"),
                l = t.attr("data-redirect-target-blank"),
                u = t.attr("data-pass-values-redirect");
              const c = t.attr("data-custom-popup-id");
              var d = t.attr("data-success-code");
              function p() {
                button.showSpinner(r),
                  button.disableSubmit(r),
                  $.ajax({
                    type: t.attr("method"),
                    url: t.attr("action"),
                    data: t.serialize() + getMarketingParameters(),
                    cache: !1,
                  })
                    .done(function (e) {
                      message.hide([i, n, o]),
                        button.showSuccessTick(r),
                        setTimeout(function () {
                          button.stopSpinner(r);
                        }, 200),
                        setTimeout(function () {
                          button.removeSuccessTick(r), button.enableSubmit(r);
                        }, 3e3),
                        evaluateCodeAfterFormSubmission(d, t, e),
                        redirectAfterFormSubmission(a, l, u, t.serialize()),
                        openPopupAfterFormSubmission(c);
                    })
                    .fail(function (e) {
                      button.stopSpinner(r), button.enableSubmit(r);
                      var t =
                        "Uh. We could not connect to the server. Please try again later.";
                      void 0 !== e.responseJSON &&
                        void 0 !== e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([i, n, o]),
                        message.show(o, t);
                    })
                    .always(function (e) {});
              }
              t.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) p($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else p($(this));
              }),
                s.on("keypress", "", function (e) {
                  if (13 === e.which) return r.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([i, n, o]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeWebhookForm.init(),
      (window.unicornplatform.subscribeSendToEmailForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-email-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (t) {
              var n = t.find(".js-engaging-message"),
                i = t.find(".js-success-message"),
                o = t.find(".js-error-message"),
                r = t.find(".js-submit-button"),
                e = t.find(".js-form-input"),
                s = e.not("textarea"),
                a = t.attr("data-redirect-url"),
                l = t.attr("data-redirect-target-blank"),
                u = t.attr("data-pass-values-redirect");
              const c = t.attr("data-custom-popup-id");
              var d = t.attr("data-success-code");
              function p() {
                button.showSpinner(r),
                  button.disableSubmit(r),
                  $.ajax({
                    type: t.attr("method"),
                    url: t.attr("action"),
                    data: t.serialize() + getMarketingParameters(),
                    cache: !1,
                  })
                    .done(function (e) {
                      message.hide([i, n, o]),
                        button.showSuccessTick(r),
                        setTimeout(function () {
                          button.stopSpinner(r);
                        }, 200),
                        setTimeout(function () {
                          button.removeSuccessTick(r), button.enableSubmit(r);
                        }, 3e3),
                        evaluateCodeAfterFormSubmission(d, t),
                        redirectAfterFormSubmission(a, l, u, t.serialize()),
                        openPopupAfterFormSubmission(c);
                    })
                    .fail(function (e) {
                      button.stopSpinner(r), button.enableSubmit(r);
                      var t =
                        "Uh. We could not connect to the server. Please try again later.";
                      void 0 !== e.responseJSON &&
                        void 0 !== e.responseJSON.error &&
                        (t = e.responseJSON.error),
                        message.hide([i, n, o]),
                        message.show(o, t);
                    })
                    .always(function (e) {});
              }
              t.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) p($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else p($(this));
              }),
                s.on("keypress", "", function (e) {
                  if (13 === e.which) return r.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([i, n, o]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeSendToEmailForm.init(),
      (window.unicornplatform.subscribeSendToMailerliteForm = {
        init: function () {
          for (
            var e = $(".js-subscribe-mailerlite-form"), t = e.length, n = 0;
            n < t;
            n++
          )
            !(function (t) {
              var n = t.find(".js-engaging-message"),
                i = t.find(".js-success-message"),
                o = t.find(".js-error-message"),
                r = t.find(".js-submit-button"),
                e = t.find(".js-form-input"),
                s = e.not("textarea"),
                a = t.attr("data-redirect-url"),
                l = t.attr("data-redirect-target-blank"),
                u = t.attr("data-pass-values-redirect");
              const c = t.attr("data-custom-popup-id");
              var d = t.attr("data-success-code");
              function p() {
                button.showSpinner(r), button.disableSubmit(r);
                var e = t
                  .serializeArray()
                  .map(({ name: e, value: t }) =>
                    "g-recaptcha-response" === e
                      ? e + "=" + t
                      : `fields[${e.toLowerCase()}]=` + t
                  )
                  .join("&");
                $.ajax({
                  type: t.attr("method"),
                  url: t.attr("action"),
                  data: e + getMarketingParameters("mailerlite"),
                  cache: !1,
                })
                  .done(function (e) {
                    message.hide([i, n, o]),
                      button.showSuccessTick(r),
                      setTimeout(function () {
                        button.stopSpinner(r);
                      }, 200),
                      setTimeout(function () {
                        button.removeSuccessTick(r), button.enableSubmit(r);
                      }, 3e3),
                      evaluateCodeAfterFormSubmission(d, t),
                      redirectAfterFormSubmission(a, l, u, t.serialize()),
                      openPopupAfterFormSubmission(c);
                  })
                  .fail(function (e) {
                    button.stopSpinner(r), button.enableSubmit(r);
                    var t =
                      "Uh. We could not connect to the server. Please try again later.";
                    void 0 !== e.responseJSON &&
                      void 0 !== e.responseJSON.error &&
                      (t = e.responseJSON.error),
                      message.hide([i, n, o]),
                      message.show(o, t);
                  })
                  .always(function (e) {});
              }
              t.on("submit", function (e) {
                e.preventDefault();
                const t = $(this);
                if (t.hasClass("js-has-captcha"))
                  if (t.hasClass("recap-done")) p($(this));
                  else {
                    const n = t.find(".g-recaptcha");
                    0 < n.length && grecaptcha.execute(n.data("widget-id"));
                  }
                else p($(this));
              }),
                s.on("keypress", "", function (e) {
                  if (13 === e.which) return r.trigger("click"), !1;
                }),
                e
                  .on("focus", "", function (e) {
                    e.preventDefault(), message.hide([i, n, o]);
                  })
                  .on("blur", "", function (e) {
                    e.preventDefault();
                  });
            })(e.eq(n));
        },
      }),
      window.unicornplatform.subscribeSendToMailerliteForm.init(),
      (window.unicornplatform.roadmapScroll = {
        init: function () {
          var e,
            t,
            n = $("#js-roadmap-wrapper");
          0 < n.length &&
            ((e = 700),
            isMobile() && (e = 150),
            (t =
              (t = $(".js-roadmap-item")).length * (t.eq(0).width() + 60) + e),
            $(".js-roadmap-box").css("width", t),
            isMobile() || n.kinetic({ maxvelocity: 30 }));
        },
      }),
      window.unicornplatform.roadmapScroll.init(),
      (window.unicornplatform.slider = {
        init: function () {
          for (
            var e = $(".js-slider"), t = e.length, n = "", i = 0;
            i < t;
            i++
          ) {
            var n = e.eq(i),
              o = JSON.parse(n.attr("data-slider-config")),
              r = n.parent().find(".js-prev-arrow"),
              s = n.parent().find(".js-next-arrow");
            0 < r.length && 0 < s.length
              ? ((o.prevArrow = r), (o.nextArrow = s))
              : (o.arrows = !1),
              n.hasClass("slick-initialized") || n.slick(o);
          }
        },
      }),
      window.unicornplatform.slider.init(),
      (window.unicornplatform.tabs = (function () {
        var t, c;
        function d(e) {
          for (
            var t,
              n = e.find(".js-tab-content-item"),
              i = 0,
              o = n.length,
              r = 0;
            r < o;
            r++
          )
            i < (t = n.eq(r).outerHeight()) && (i = t);
          20 < i && e.css({ height: i });
        }
        function n() {
          for (var e = 0; e < c; e++) d(t.eq(e));
        }
        function e() {
          var e, u;
          n(),
            (e = !1),
            window.addEventListener("resize", function () {
              clearTimeout(e), (e = setTimeout(n, 350));
            }),
            (u = setInterval(function () {
              if ($(".js-tabs-item-list.state-loaded").length === c)
                clearInterval(u);
              else
                for (
                  var e = $(".js-tabs-item-list:not(.state-loaded)"),
                    t = e.length,
                    n = 0;
                  n < t;
                  n++
                ) {
                  for (
                    var i = e.eq(n),
                      o = i.find(".js-tab-content-item"),
                      r = o.length,
                      s = 0;
                    s < r;
                    s++
                  ) {
                    var a = o.eq(s),
                      l = a.find("img");
                    (0 === l.length ||
                      (!1 === a.hasClass("state-loaded") && l[0].complete)) &&
                      a.addClass("state-loaded");
                  }
                  r === i.find(".js-tab-content-item.state-loaded").length &&
                    (i.addClass("state-loaded"), d(i));
                }
            }, 500));
        }
        return {
          init: function () {
            (t = $(".js-tabs-item-list")),
              0 < (c = t.length) && e(),
              $(document).on("click", ".js-open-tab", function (e) {
                if ((e.preventDefault(), $(this).hasClass("state-active-tab")))
                  return !1;
                var e = $(this).attr("data-index"),
                  t = $(this).attr("data-group");
                $('.js-open-tab[data-group="' + t + '"]').removeClass(
                  "state-active-tab"
                ),
                  $(this).addClass("state-active-tab"),
                  $('.js-tab-content[data-group="' + t + '"]').removeClass(
                    "state-active-tab"
                  ),
                  $(
                    '.js-tab-content[data-group="' +
                      t +
                      '"][data-index="' +
                      e +
                      '"]'
                  ).addClass("state-active-tab");
              });
          },
          setAll: n,
        };
      })()),
      window.unicornplatform.tabs.init();
    var showContentOnClick = {
        bind: function () {
          $(document).on(
            "mouseenter",
            ".js-hover-to-show-sibling",
            function (e) {
              e.preventDefault(),
                $(this)
                  .siblings(".js-content-to-show")
                  .addClass("state-visible");
            }
          ),
            $(document).on(
              "mouseleave",
              ".js-hover-to-show-sibling",
              function (e) {
                e.preventDefault(),
                  $(this)
                    .siblings(".js-content-to-show")
                    .removeClass("state-visible");
              }
            );
        },
      },
      clipboard = (showContentOnClick.bind(), new ClipboardJS(".js-copy-text")),
      faqToggle =
        (clipboard.on("success", function (e) {
          var t = $(e.trigger);
          button.showSuccessTick(t),
            button.disableSubmit(t),
            setTimeout(function () {
              button.removeSuccessTick(t), button.enableSubmit(t);
            }, 3e3);
        }),
        clipboard.on("error", function (e) {
          console.error("Copy action error: ", e.action),
            console.error("Trigger:", e.trigger);
        }),
        {
          init: function () {
            $(document).on("click", ".js-open-faq", function (e) {
              e.preventDefault(),
                $(this).find(".js-faq-item").slideToggle(200),
                $(this).toggleClass("state-active");
            }),
              $(document).on("click", ".js-open-faq a", function (e) {
                e.stopPropagation();
              });
          },
        }),
      openMenu =
        (faqToggle.init(),
        (function () {
          var n = $("body");
          function i(e, t) {
            e.removeClass("state-opened-menu"),
              t.removeClass("state-active-burger"),
              n.removeClass("state-fixed-body");
          }
          return {
            bind: function () {
              $(document).on("click", ".js-open-menu", function (e) {
                e.preventDefault();
                var t,
                  e = $(this).parents(".js-menu");
                $(this).hasClass("state-active-burger")
                  ? i(e, $(this))
                  : ((e = e),
                    (t = $(this)),
                    e.addClass("state-opened-menu"),
                    t.addClass("state-active-burger"),
                    n.addClass("state-fixed-body"));
              });
            },
            close: i,
          };
        })()),
      toggleDropdown =
        (openMenu.bind(),
        (function () {
          function i(e) {
            e.removeClass("state-opened-dropdown");
          }
          return {
            bind: function () {
              var n = $(".js-toggle-dropdown");
              $(document).on("click", ".js-toggle-dropdown", function (e) {
                var t = $(this);
                $(this).hasClass("state-opened-dropdown")
                  ? i(t)
                  : (i(n), t.addClass("state-opened-dropdown"));
              }),
                $(document).on("click", function (e) {
                  !0 !== $(e.target).hasClass("js-toggle-dropdown") &&
                    1 !== $(e.target).parents(".js-toggle-dropdown").length &&
                    i(n);
                });
            },
            close: i,
          };
        })()),
      scrollDown =
        (toggleDropdown.bind(),
        {
          bind: function () {
            $(document).on("click", ".js-scroll-down", function (e) {
              e.preventDefault();
              (e = $(this).parents(".js-scroll-this-box")),
                (e = e.outerHeight() + e.position().top);
              $("html, body").animate({ scrollTop: e }, 450);
            });
          },
        }),
      highlightHeadingWord =
        (scrollDown.bind(),
        {
          init: function () {
            $(".js-scroll-down").addClass("state-active");
          },
        }),
      interactions =
        (highlightHeadingWord.init(),
        {
          bind: function () {
            $(document).on("click", ".js-toggle-animation", function (e) {
              e.preventDefault(), $(this).toggleClass("state-active-animation");
            });
          },
        }),
      lightbox =
        (interactions.bind(),
        {
          bind: function () {
            $(document).on("click", ".js-lightbox-single-image", function (e) {
              e.preventDefault();
              var e = document.querySelectorAll(".pswp")[0],
                t = $(this).attr("src"),
                n = $(this).attr("data-height"),
                i = $(this).attr("data-width");
              new PhotoSwipe(
                e,
                PhotoSwipeUI_Default,
                [{ src: t, w: i, h: n }],
                {
                  index: 0,
                  closeEl: !0,
                  captionEl: !0,
                  fullscreenEl: !1,
                  zoomEl: !1,
                  shareEl: !1,
                  counterEl: !1,
                  arrowEl: !0,
                  preloaderEl: !0,
                  history: !1,
                }
              ).init();
            });
          },
        });
    lightbox.bind();
    const customPopup = () => {
      const n = (e) => {
          e.fadeIn(150),
            $(".js-custom-popup-mask").fadeIn(200),
            0 !== e.length && $("body").addClass("state-fixed-body_popup");
        },
        i = () => {
          $(".js-custom-popup").fadeOut(100),
            $(".js-custom-popup-mask").fadeOut(100),
            $("body").removeClass("state-fixed-body_popup");
        };
      return {
        bindOpen: () => {
          $(document).on("click", ".js-open-custom-popup-button", function (e) {
            e.preventDefault();
            var t = $(this).attr("data-custom-popup-id"),
              t = $("#" + t);
            n(t), e.stopImmediatePropagation();
          });
        },
        bindClose: () => {
          $(document).on(
            "click",
            ".js-close-custom-popup-button",
            function (e) {
              e.preventDefault(), i();
            }
          ),
            $(document).on("keydown", function (e) {
              var t =
                0 !==
                $(".js-custom-popup:not(.popup-component__editor)").length;
              "Escape" === e.key && t && i();
            });
        },
        openPopup: n,
      };
    };
    customPopup().bindOpen(), customPopup().bindClose();
    var scrollTo = {
        init: function () {
          $(document).on(
            "click",
            'a[href^="#"]:not([href="#"]), a[href^="/#"]:not([href="/#"]), .js-scroll-to-id',
            function (e) {
              var t = $(this).attr("href");
              ("/" !== window.location.pathname && -1 !== t.indexOf("/#")) ||
                (e.preventDefault(),
                (e = ""),
                (e = "#" + t.split("#")[1]),
                (t = $(e).offset().top),
                $("html, body").animate({ scrollTop: t }, 400),
                (e = $(".js-menu.state-opened-menu")),
                (t = $(".js-open-menu.state-active-burger")),
                0 < e.length && 0 < t.length && openMenu.close(e, t));
            }
          );
        },
      },
      showError =
        (scrollTo.init(),
        {
          showManually: function (e) {
            void 0 !== e && $(".js-form-error-message").text(e),
              $(".js-form-error-box").addClass("state-visible");
          },
          showAutomatically: function () {
            var e = getUrlParameter("error_message");
            0 < e.length &&
              ($(".js-form-error-box").addClass("state-visible"),
              $(".js-form-error-message").text(e));
          },
        }),
      popup =
        (showError.showAutomatically(),
        (window.unicornplatform.stripeCheckout = {
          bind: function () {
            $(document).on("click", "[data-stripe-product-id]", function (e) {
              var t, n, i, o, r, s;
              void 0 !== window.Stripe &&
                void 0 !== window.stripe_public_api_key &&
                "" !== window.stripe_public_api_key &&
                ((s = (t = $(this)).attr("data-stripe-product-id")),
                (n = t.attr("data-successful-payment-url")),
                (i = t.attr("data-cancel-payment-url")),
                ("" !== n && void 0 !== n) ||
                  (n = window.location.href + "?popup_id=successful_payment"),
                ("" !== i && void 0 !== i) ||
                  (i = window.location.href + "?popup_id=cancelled_payment"),
                s &&
                  "" !== s &&
                  (e.preventDefault(),
                  (e = Stripe(window.stripe_public_api_key)),
                  (r = [{ quantity: 1 }]),
                  "plan" === (o = s.split("_")[0])
                    ? (r[0].plan = s)
                    : "sku" === o
                    ? (r[0].sku = s)
                    : "price" === o
                    ? (r[0].price = s)
                    : (alert(
                        "Stripe integration error: wrong product ID was used. Please take a careful look at our guide and copy proper product ID: https://help.unicornplatform.com/en/article/stripe-checkout-integration-1ji5u1/"
                      ),
                      console.error(
                        "A message for the website owner: there has been a mistake in setting up your Stripe integration. Please contact the Unicorn Platform support crew."
                      )),
                  "price" === o
                    ? ((s = t.attr("data-stripe-mode")),
                      e
                        .redirectToCheckout({
                          lineItems: r,
                          mode: s,
                          successUrl: n,
                          cancelUrl: i,
                        })
                        .then(function (e) {
                          e.error &&
                            alert(
                              'The purchase ended up with an error: "' +
                                e.error.message +
                                '" We are sorry.'
                            );
                        }))
                    : e
                        .redirectToCheckout({
                          items: r,
                          successUrl: n,
                          cancelUrl: i,
                        })
                        .then(function (e) {
                          e.error &&
                            alert(
                              'The purchase ended up with an error: "' +
                                e.error.message +
                                '" We are sorry.'
                            );
                        })));
            });
          },
        }),
        window.unicornplatform.stripeCheckout.bind(),
        (function () {
          var t = {
            openSpeed: 150,
            closeSpeed: 50,
            loading: "",
            afterClose: function () {
              var e = { Title: document.title, Url: removeParam("popup_id") };
              history.pushState(e, e.Title, e.Url);
            },
          };
          function n(e) {
            var e = $("#" + e),
              t = e;
            return (t = 0 === e.length ? $("#no_such_popup") : t);
          }
          return {
            openOnPageLoad: function () {
              var e = getUrlParameter("popup_id");
              e && "" !== e && $.featherlight(n(e), t);
            },
            bind: function () {
              $(document).on("click", ".js-open-popup", function (e) {
                e.preventDefault();
                e = $(this).attr("data-popup-id");
                $(this).featherlight(n(e), t);
              });
            },
          };
        })()),
      loadMore,
      $overlayList =
        (popup.openOnPageLoad(),
        popup.bind(),
        null !== localStorage.getItem("allBlogPosts") &&
          ((loadMore = (function () {
            var o = $(".js-post-item"),
              r = $(".js-posts-list"),
              s = o.length,
              a = JSON.parse(localStorage.getItem("allBlogPosts"));
            return {
              bind: function () {
                var i = (a.length - s) / 5;
                $(document).on("click", "#js-load-more", function (e) {
                  if ((e.preventDefault(), 0 < i)) {
                    for (var t = s; t < s + 5 && t < a.length; t++) {
                      var n = o.clone().eq(0);
                      n.attr("href", a[t].url),
                        "" !== a[t].og_image_url
                          ? n
                              .find(".js-post-item__img")
                              .attr("src", a[t].og_image_url)
                          : "" !== a[t].first_image_url
                          ? n
                              .find(".js-post-item__img")
                              .attr("src", a[t].first_image_url)
                          : (n.find(".js-post-item__img").attr("src", null),
                            n
                              .find(".js-post-item__img")
                              .addClass("post-item__img-pattern")),
                        n.find(".js-post-item__title").text(a[t].title),
                        a[t].thumbnail_alt
                          ? n
                              .find(".js-post-item__img")
                              .attr("alt", a[t].thumbnail_alt)
                          : n.find(".js-post-item__img").removeAttr("alt"),
                        r.append(n);
                    }
                    (s += 5),
                      i <= 1 && $(".js-load-more-wrapper").hide(),
                      (i -= 1);
                  }
                });
              },
            };
          })()),
          loadMore.bind()),
        $("#js-overlay-list"));
    setTimeout(function () {
      var n, i, o, r;
      $overlayList.hasClass("read-more-zoom") &&
        ((n = $("#js-read-more")),
        (i = $(".js-nav")),
        (o = $(window).height()),
        (r = $overlayList.height()),
        i.css({ transition: "0.6s cubic-bezier(0.33, 1, 0.68, 1)" }),
        $(window).on("scroll", function () {
          var e = n.offset().top,
            t = $(this).scrollTop();
          o < r
            ? e - o < t
              ? ($overlayList.css("transform", "scale(0.92) translateY(-60px)"),
                i.css({ opacity: "0", visibility: "hidden" }))
              : ($overlayList.css("transform", "scale(1)"),
                i.css({ opacity: "1", visibility: "visible" }))
            : r < o &&
              (0 < t
                ? ($overlayList.css(
                    "transform",
                    "scale(0.92) translateY(-60px)"
                  ),
                  i.css({ opacity: "0", visibility: "hidden" }))
                : ($overlayList.css("transform", "scale(1)"),
                  i.css({ opacity: "1", visibility: "visible" })));
        }));
    }, 500);
  });
var widgets = {
    bindClose: function () {
      $(document).on("click", ".js-close-widget", function (e) {
        e.preventDefault();
        e = $(this).attr("data-widget-id");
        $("#" + e).toggleClass("state-visible"),
          (localStorage["unicorn-widget-" + e] = "hidden");
      });
    },
    bindInit: function () {
      var e,
        t = $(".js-widget");
      0 < t.length &&
        ((e = t.attr("id")),
        "hidden" !== localStorage["unicorn-widget-" + e] &&
          setTimeout(function () {
            t.toggleClass("state-visible");
          }, 2e3));
    },
  },
  languageSwitchHreflangs =
    (widgets.bindClose(),
    widgets.bindInit(),
    {
      bind: function () {
        if (0 < $(".js-lang-widget").length) {
          let n = $(".js-language-link");
          if (0 < n.length) {
            let t = $('link[rel="alternate"]');
            if (0 < t.length)
              for (let e = 0; e < t.length; e++) {
                var i = t.eq(e).attr("hreflang"),
                  o = t.eq(e).attr("href");
                if (i && "" !== i && o && "" !== o)
                  for (let t = 0; t < n.length; t++) {
                    let e = n.eq(t);
                    e.attr("data-lang-code") === i && e.attr("href", o);
                  }
              }
          }
        }
      },
    });
languageSwitchHreflangs.bind();
