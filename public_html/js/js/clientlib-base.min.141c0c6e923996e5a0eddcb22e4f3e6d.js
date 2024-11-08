!(function () {
  function e(e) {
    function t() {
      if (o) {
        var e = o.getDeepLinkItemIdx(C, "item", "item");
        if (-1 < e) {
          var t = C._elements.item[e];
          t && C._elements.item[C._active].id !== t.id && (A(e, !0), u()),
            (e = window.location.hash.substring(1)) &&
              (e = document.querySelector("[id='" + e + "']")) &&
              e.scrollIntoView();
        }
      }
    }
    function a(e) {
      var t = C._active,
        n = C._elements.indicator.length - 1;
      switch (e.keyCode) {
        case i.ARROW_LEFT:
        case i.ARROW_UP:
          e.preventDefault(), 0 < t && A(t - 1);
          break;
        case i.ARROW_RIGHT:
        case i.ARROW_DOWN:
          e.preventDefault(), t < n && A(t + 1);
          break;
        case i.HOME:
          e.preventDefault(), A(0);
          break;
        case i.END:
          e.preventDefault(), A(n);
          break;
        case i.SPACE:
          C._properties.autoplay &&
            e.target !== C._elements.previous &&
            e.target !== C._elements.next &&
            (e.preventDefault(), C._paused ? f() : u()),
            e.target === C._elements.pause && C._elements.play.focus(),
            e.target === C._elements.play && C._elements.pause.focus();
      }
    }
    function l(e) {
      y();
    }
    function m(e) {
      g();
    }
    function d(e) {
      u(), C._elements.play.focus();
    }
    function p() {
      f(), C._elements.pause.focus();
    }
    function u() {
      (C._paused = !0), y(), _();
    }
    function f() {
      var e = (C._paused = !1);
      C._elements.self.parentElement &&
        (e =
          C._elements.self.parentElement.querySelector(":hover") ===
          C._elements.self),
        (!C._properties.autopauseDisabled && e) || g(),
        _();
    }
    function _() {
      b(C._elements.pause, C._paused), b(C._elements.play, !C._paused);
    }
    function h() {
      var e = C._elements.item,
        t = C._elements.indicator;
      if (e)
        if (Array.isArray(e))
          for (var n = 0; n < e.length; n++)
            n === parseInt(C._active)
              ? (e[n].classList.add("cmp-carousel__item--active"),
                e[n].removeAttribute("aria-hidden"),
                t[n].classList.add("cmp-carousel__indicator--active"),
                t[n].setAttribute("aria-selected", !0),
                t[n].setAttribute("tabindex", "0"))
              : (e[n].classList.remove("cmp-carousel__item--active"),
                e[n].setAttribute("aria-hidden", !0),
                t[n].classList.remove("cmp-carousel__indicator--active"),
                t[n].setAttribute("aria-selected", !1),
                t[n].setAttribute("tabindex", "-1"));
        else
          e.classList.add("cmp-carousel__item--active"),
            t.classList.add("cmp-carousel__indicator--active");
    }
    function v() {
      return C._active === C._elements.item.length - 1 ? 0 : C._active + 1;
    }
    function w(e, t) {
      if (!(0 > e || e > C._elements.item.length - 1)) {
        if (
          ((C._active = e), h(), !t && o && o.updateUrlHash(C, "item", e), r)
        ) {
          t = C._elements.self.id;
          var a = n(C._elements.item[e]);
          ((e = { component: {} }).component[t] = { shownItems: [a] }),
            ((a = { component: {} }).component[t] = { shownItems: void 0 }),
            s.push(a),
            s.push(e);
        }
        C._elements.self.parentElement &&
          C._elements.self.parentElement.querySelector(":hover") !==
            C._elements.self &&
          g();
      }
    }
    function A(e, t) {
      w(e, t), (t = window.scrollX || window.pageXOffset);
      var a = window.scrollY || window.pageYOffset;
      C._elements.indicator[e].focus(),
        window.scrollTo(t, a),
        r &&
          s.push({
            event: "cmp:show",
            eventInfo: { path: "component." + n(C._elements.item[e]) },
          });
    }
    function g() {
      !C._paused &&
        C._properties.autoplay &&
        (y(),
        (C._autoplayIntervalId = window.setInterval(function () {
          if (!document.visibilityState || !document.hidden) {
            var e = C._elements.indicators;
            e !== document.activeElement && e.contains(document.activeElement)
              ? A(v(), !0)
              : w(v(), !0);
          }
        }, C._properties.delay)));
    }
    function y() {
      window.clearInterval(C._autoplayIntervalId),
        (C._autoplayIntervalId = null);
    }
    function b(e, t) {
      e &&
        (!1 !== t
          ? ((e.disabled = !0),
            e.classList.add("cmp-carousel__action--disabled"))
          : ((e.disabled = !1),
            e.classList.remove("cmp-carousel__action--disabled")));
    }
    var E,
      C = this;
    e &&
      e.element &&
      ((E = e),
      (C._config = E),
      E.element.removeAttribute("data-cmp-is"),
      (function (e) {
        for (var t in ((C._properties = {}), c))
          if (Object.prototype.hasOwnProperty.call(c, t)) {
            var n = c[t],
              a = null;
            e &&
              null != e[t] &&
              ((a = e[t]),
              n && "function" == typeof n.transform && (a = n.transform(a))),
              null === a && (a = c[t].default),
              (C._properties[t] = a);
          }
      })(E.options),
      (function (e) {
        (C._elements = {}),
          (C._elements.self = e),
          (e = C._elements.self.querySelectorAll("[data-cmp-hook-carousel]"));
        for (var t = 0; t < e.length; t++) {
          var n = e[t],
            a = "carousel";
          (a = a.charAt(0).toUpperCase() + a.slice(1)),
            (a = n.dataset["cmpHook" + a]),
            C._elements[a]
              ? (Array.isArray(C._elements[a]) ||
                  (C._elements[a] = [C._elements[a]]),
                C._elements[a].push(n))
              : (C._elements[a] = n);
        }
      })(E.element),
      (C._active = 0),
      (C._paused = !1),
      C._elements.item &&
        (h(),
        (function () {
          window.addEventListener("hashchange", t, !1),
            C._elements.previous &&
              C._elements.previous.addEventListener("click", function () {
                var e =
                  0 === C._active ? C._elements.item.length - 1 : C._active - 1;
                w(e),
                  r &&
                    s.push({
                      event: "cmp:show",
                      eventInfo: {
                        path: "component." + n(C._elements.item[e]),
                      },
                    });
              }),
            C._elements.next &&
              C._elements.next.addEventListener("click", function () {
                var e = v();
                w(e),
                  r &&
                    s.push({
                      event: "cmp:show",
                      eventInfo: {
                        path: "component." + n(C._elements.item[e]),
                      },
                    });
              });
          var e = C._elements.indicator;
          if (e)
            for (var o = 0; o < e.length; o++)
              !(function (t) {
                e[o].addEventListener("click", function (e) {
                  A(t), u();
                });
              })(o);
          C._elements.pause &&
            C._properties.autoplay &&
            C._elements.pause.addEventListener("click", d),
            C._elements.play &&
              C._properties.autoplay &&
              C._elements.play.addEventListener("click", p),
            C._elements.self.addEventListener("keydown", a),
            C._properties.autopauseDisabled ||
              (C._elements.self.addEventListener("mouseenter", l),
              C._elements.self.addEventListener("mouseleave", m));
          var i = C._elements.item;
          if (i)
            for (var c = 0; c < i.length; c++)
              i[c].addEventListener("focusin", l),
                i[c].addEventListener("focusout", m);
        })(),
        g(),
        _(),
        t()),
      window.Granite &&
        window.Granite.author &&
        window.Granite.author.MessageChannel &&
        ((window.CQ = window.CQ || {}),
        (window.CQ.CoreComponents = window.CQ.CoreComponents || {}),
        (window.CQ.CoreComponents.MESSAGE_CHANNEL =
          window.CQ.CoreComponents.MESSAGE_CHANNEL ||
          new window.Granite.author.MessageChannel("cqauthor", window)),
        window.CQ.CoreComponents.MESSAGE_CHANNEL.subscribeRequestMessage(
          "cmp.panelcontainer",
          function (e) {
            e.data &&
              "cmp-carousel" === e.data.type &&
              e.data.id === C._elements.self.dataset.cmpPanelcontainerId &&
              "navigate" === e.data.operation &&
              w(e.data.index);
          },
        )));
  }
  function t(e) {
    e = e.dataset;
    var t = [],
      n = "carousel";
    for (var a in ((n = [
      "is",
      "hook" + (n = n.charAt(0).toUpperCase() + n.slice(1)),
    ]),
    e))
      if (Object.prototype.hasOwnProperty.call(e, a)) {
        var o = e[a];
        0 === a.indexOf("cmp") &&
          ((a = (a = a.slice(3)).charAt(0).toLowerCase() + a.substring(1)),
          -1 === n.indexOf(a) && (t[a] = o));
      }
    return t;
  }
  function n(e) {
    return e
      ? e.dataset.cmpDataLayer
        ? Object.keys(JSON.parse(e.dataset.cmpDataLayer))[0]
        : e.id
      : null;
  }
  function a() {
    s = (r = document.body.hasAttribute("data-cmp-data-layer-enabled"))
      ? (window.adobeDataLayer = window.adobeDataLayer || [])
      : void 0;
    for (var n = document.querySelectorAll(l.self), a = 0; a < n.length; a++)
      new e({ element: n[a], options: t(n[a]) });
    (n =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver),
      (a = document.querySelector("body")),
      new n(function (n) {
        n.forEach(function (n) {
          0 < (n = [].slice.call(n.addedNodes)).length &&
            n.forEach(function (n) {
              n.querySelectorAll &&
                [].slice.call(n.querySelectorAll(l.self)).forEach(function (n) {
                  new e({ element: n, options: t(n) });
                });
            });
        });
      }).observe(a, { subtree: !0, childList: !0, characterData: !0 });
  }
  var o =
    window.CQ &&
    window.CQ.CoreComponents &&
    window.CQ.CoreComponents.container &&
    window.CQ.CoreComponents.container.utils
      ? window.CQ.CoreComponents.container.utils
      : void 0;
  o ||
    console.warn(
      "Tabs: container utilities at window.CQ.CoreComponents.container.utils are not available. This can lead to missing features. Ensure the core.wcm.components.commons.site.container client library is included on the page.",
    );
  var r,
    s,
    i = {
      SPACE: 32,
      END: 35,
      HOME: 36,
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40,
    },
    l = { self: '[data-cmp-is="carousel"]' },
    c = {
      autoplay: {
        default: !1,
        transform: function (e) {
          return !(null == e);
        },
      },
      delay: {
        default: 5e3,
        transform: function (e) {
          return (e = parseFloat(e)), isNaN(e) ? null : e;
        },
      },
      autopauseDisabled: {
        default: !1,
        transform: function (e) {
          return !(null == e);
        },
      },
    };
  "loading" !== document.readyState
    ? a()
    : document.addEventListener("DOMContentLoaded", a),
    o && window.addEventListener("load", o.scrollToAnchor, !1);
})(),
  window.Element &&
    !Element.prototype.closest &&
    (Element.prototype.closest = function (e) {
      e = (this.document || this.ownerDocument).querySelectorAll(e);
      var t,
        n = this;
      do {
        for (t = e.length; 0 <= --t && e.item(t) !== n; );
      } while (0 > t && (n = n.parentElement));
      return n;
    }),
  window.Element &&
    !Element.prototype.matches &&
    (Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (e) {
        for (
          var t = (e = (this.document || this.ownerDocument).querySelectorAll(
            e,
          )).length;
          0 <= --t && e.item(t) !== this;

        );
        return -1 < t;
      }),
  Object.assign ||
    (Object.assign = function (e, t) {
      if (null === e)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var n = Object(e), a = 1; a < arguments.length; a++) {
        var o = arguments[a];
        if (null !== o)
          for (var r in o)
            Object.prototype.hasOwnProperty.call(o, r) && (n[r] = o[r]);
      }
      return n;
    }),
  [Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(
    function (e) {
      Object.prototype.hasOwnProperty.call(e, "remove") ||
        Object.defineProperty(e, "remove", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: function () {
            this.parentNode.removeChild(this);
          },
        });
    },
  ),
  (function () {
    function e(e) {
      e = e.dataset;
      var t = [],
        n = "image";
      for (var a in ((n = [
        "is",
        "hook" + (n = n.charAt(0).toUpperCase() + n.slice(1)),
      ]),
      e))
        if (Object.prototype.hasOwnProperty.call(e, a)) {
          var o = e[a];
          0 === a.indexOf("cmp") &&
            ((a = (a = a.slice(3)).charAt(0).toLowerCase() + a.substring(1)),
            -1 === n.indexOf(a) && (t[a] = o));
        }
      return t;
    }
    function t(e) {
      function t() {
        var e =
          (p._properties.widths && 0 < p._properties.widths.length) ||
          0 < Object.keys(u).length;
        if (0 < Object.keys(u).length) {
          var t = n(Object.keys(u), !1);
          t = u[t];
        } else
          t = e
            ? (p._properties.dmimage ? "" : ".") + n(p._properties.widths, !0)
            : "";
        f && (t = "" !== t ? "width=" + t.substring(1) : ""),
          (t = (t = p._properties.src.replace(_, t)).replace("{dpr}", s));
        var a = p._elements.image.getAttribute("src");
        if (t !== a)
          if (
            null === a ||
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ===
              a
          )
            p._elements.image.setAttribute("src", t);
          else {
            var o = p._properties.src.split(_),
              r = a.startsWith(o[0]);
            r && 1 < o.length && (r = a.endsWith(o[o.length - 1])),
              r &&
                (p._elements.image.setAttribute("src", t),
                e || window.removeEventListener("scroll", p.update));
          }
        p._lazyLoaderShowing && p._elements.image.addEventListener("load", i),
          p._interSectionObserver.unobserve(p._elements.self);
      }
      function n(e, t) {
        for (
          var n = p._elements.self, a = n.clientWidth;
          0 === a && n.parentNode;

        )
          a = (n = n.parentNode).clientWidth;
        for (t = a * (t ? s : 1), n = e.length, a = 0; a < n - 1 && e[a] < t; )
          a++;
        return e[a].toString();
      }
      function i() {
        for (var e in (p._elements.image.classList.remove(o.cssClass), o.style))
          Object.prototype.hasOwnProperty.call(o.style, e) &&
            (p._elements.image.style[e] = "");
        p._elements.image.removeEventListener("load", i),
          (p._lazyLoaderShowing = !1);
      }
      function l() {
        if (p._elements.areas && 0 < p._elements.areas.length)
          for (var e = 0; e < p._elements.areas.length; e++) {
            var t = p._elements.image.width,
              n = p._elements.image.height;
            if (t && n) {
              var a = p._elements.areas[e].dataset.cmpRelcoords;
              if (a) {
                a = a.split(",");
                for (var o = Array(a.length), r = 0; r < o.length; r++)
                  o[r] = 0 == r % 2 ? parseInt(a[r] * t) : parseInt(a[r] * n);
                p._elements.areas[e].coords = o;
              }
            }
          }
      }
      function c() {
        p.update(), l();
      }
      function m() {
        l();
      }
      var d,
        p = this,
        u = {},
        f = !1,
        _ = "{.width}";
      (p.update = function () {
        if (p._properties.lazy) {
          if (null === p._elements.container.offsetParent) var e = !1;
          else {
            var n =
                (e = window.pageYOffset) +
                document.documentElement.clientHeight,
              a = p._elements.container.getBoundingClientRect().top + e;
            e =
              a + p._elements.container.clientHeight >=
                e - p._properties.lazythreshold &&
              a <= n + p._properties.lazythreshold;
          }
          e && t();
        } else t();
      }),
        e &&
          e.element &&
          ((d = e).element.removeAttribute("data-cmp-is"),
          d.options.src &&
            0 <= d.options.src.indexOf("width={width}") &&
            ((f = !0), (_ = "width={width}")),
          (function (e) {
            for (var t in ((p._properties = {}), r))
              if (Object.prototype.hasOwnProperty.call(r, t)) {
                var n = r[t];
                p._properties[t] =
                  e && null != e[t]
                    ? n && "function" == typeof n.transform
                      ? n.transform(e[t])
                      : e[t]
                    : r[t].default;
              }
          })(d.options),
          (function (e) {
            (p._elements = {}),
              (p._elements.self = e),
              (e = p._elements.self.querySelectorAll("[data-cmp-hook-image]"));
            for (var t = 0; t < e.length; t++) {
              var n = e[t],
                a = "image";
              (a = a.charAt(0).toUpperCase() + a.slice(1)),
                (p._elements[n.dataset["cmpHook" + a]] = n);
            }
          })(d.element),
          d.options.src &&
            Object.prototype.hasOwnProperty.call(d.options, "dmimage") &&
            "SmartCrop:Auto" === d.options.smartcroprendition &&
            (u = CMP.image.dynamicMedia.getAutoSmartCrops(d.options.src)),
          p._elements.noscript &&
            ((p._elements.container = p._elements.link
              ? p._elements.link
              : p._elements.self),
            (function () {
              var e = p._elements.noscript.textContent.trim();
              e = (e = e.replace(/&(amp;)*lt;/g, "<")).replace(
                /&(amp;)*gt;/g,
                ">",
              );
              var t = (e = new DOMParser().parseFromString(
                e,
                "text/html",
              )).querySelector(a.image);
              t.removeAttribute("src"),
                p._elements.container.insertBefore(t, p._elements.noscript),
                (e = e.querySelector(a.map)) &&
                  p._elements.container.insertBefore(e, p._elements.noscript),
                p._elements.noscript.parentNode.removeChild(
                  p._elements.noscript,
                ),
                p._elements.container.matches(a.image)
                  ? (p._elements.image = p._elements.container)
                  : (p._elements.image = p._elements.container.querySelector(
                      a.image,
                    )),
                (p._elements.map = p._elements.container.querySelector(a.map)),
                (p._elements.areas = p._elements.container.querySelectorAll(
                  a.area,
                ));
            })(),
            p._properties.lazy &&
              (function () {
                var e = p._elements.image.getAttribute("width"),
                  t = p._elements.image.getAttribute("height");
                if (e && t) {
                  var n = o.style;
                  for (var a in ((n["padding-bottom"] = (t / e) * 100 + "%"),
                  n))
                    Object.prototype.hasOwnProperty.call(n, a) &&
                      (p._elements.image.style[a] = n[a]);
                }
                p._elements.image.setAttribute(
                  "src",
                  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                ),
                  p._elements.image.classList.add(o.cssClass),
                  (p._lazyLoaderShowing = !0);
              })(),
            p._elements.map && p._elements.image.addEventListener("load", m),
            window.addEventListener("resize", c),
            "focus click load transitionend animationend scroll"
              .split(" ")
              .forEach(function (e) {
                document.addEventListener(e, p.update);
              }),
            p._elements.image.addEventListener("cmp-image-redraw", p.update),
            (p._interSectionObserver = new IntersectionObserver(function (
              e,
              t,
            ) {
              e.forEach(function (e) {
                0 < e.intersectionRatio && p.update();
              });
            })),
            p._interSectionObserver.observe(p._elements.self),
            p.update()));
    }
    function n() {
      for (var n = document.querySelectorAll(a.self), o = 0; o < n.length; o++)
        new t({ element: n[o], options: e(n[o]) });
      (n =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver),
        (o = document.querySelector("body")),
        new n(function (n) {
          n.forEach(function (n) {
            0 < (n = [].slice.call(n.addedNodes)).length &&
              n.forEach(function (n) {
                n.querySelectorAll &&
                  [].slice
                    .call(n.querySelectorAll(a.self))
                    .forEach(function (n) {
                      new t({ element: n, options: e(n) });
                    });
              });
          });
        }).observe(o, { subtree: !0, childList: !0, characterData: !0 });
    }
    var a = {
        self: '[data-cmp-is="image"]',
        image: '[data-cmp-hook-image="image"]',
        map: '[data-cmp-hook-image="map"]',
        area: '[data-cmp-hook-image="area"]',
      },
      o = {
        cssClass: "cmp-image__image--is-loading",
        style: { height: 0, "padding-bottom": "" },
      },
      r = {
        widths: {
          default: [],
          transform: function (e) {
            var t = [];
            return (
              e.split(",").forEach(function (e) {
                (e = parseFloat(e)), isNaN(e) || t.push(e);
              }),
              t
            );
          },
        },
        lazy: {
          default: !1,
          transform: function (e) {
            return !(null == e);
          },
        },
        dmimage: {
          default: !1,
          transform: function (e) {
            return !(null == e);
          },
        },
        lazythreshold: {
          default: 0,
          transform: function (e) {
            return (e = parseInt(e)), isNaN(e) ? 0 : e;
          },
        },
        src: {
          transform: function (e) {
            return decodeURIComponent(e);
          },
        },
      },
      s = window.devicePixelRatio || 1;
    "loading" !== document.readyState
      ? n()
      : document.addEventListener("DOMContentLoaded", n);
  })();
