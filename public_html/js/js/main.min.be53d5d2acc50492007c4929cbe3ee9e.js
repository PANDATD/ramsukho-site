function cq5forms_isArray(t) {
  return Array.isArray
    ? Array.isArray(t)
    : "[object Array]" === Object.prototype.toString.call(t);
}
function cq5forms_isNodeList(t) {
  var e = Object.prototype.toString.call(t);
  return (
    "object" == typeof t &&
    /^\[object (HTMLCollection|NodeList|RadioNodeList)\]$/.test(e) &&
    "number" == typeof t.length &&
    (0 === t.length || ("object" == typeof t[0] && t[0].nodeType > 0))
  );
}
function cq5forms_showMsg(t, e, i, a) {
  var r = document.forms[t].elements[e];
  alert(i),
    cq5forms_isNodeList(r) && (r = Array.prototype.slice.call(r)),
    cq5forms_isArray(r) ? (a || (a = 0), r[a].focus()) : r.focus();
}
function cq5forms_isEmpty(t) {
  if (void 0 === t) return !1;
  var e = !0;
  if (
    (cq5forms_isNodeList(t) && (t = Array.prototype.slice.call(t)),
    cq5forms_isArray(t))
  )
    for (i = 0; i < t.length; i++)
      "radio" == t[i].type || "checkbox" == t[i].type
        ? t[i].checked && (e = !1)
        : "option" == t[i].localName
          ? t[i].selected && (e = !1)
          : t[i].value.length > 0 && (e = !1);
  else
    "radio" == t.type || "checkbox" == t.type
      ? t.checked && (e = !1)
      : t.value.length > 0 && (e = !1);
  return e;
}
function cq5forms_regcheck(t, e) {
  var i = !1,
    a = e.exec(t);
  if (a) {
    var r = t.length;
    i = a[0].length == r;
  }
  return i;
}
function cq5forms_multiResourceChange(t, e, i) {
  if (
    i ||
    (t || (t = window.event),
    !(t.keyCode < 48 && 8 != t.keyCode && 46 != t.keyCode))
  )
    try {
      document.getElementById(e).checked = !0;
    } catch (t) {}
}
!(function (t) {
  var e, i;
  (t.WCM = t.WCM || {}),
    (t.WCM.Image =
      t.WCM.Image ||
      ((i = ".cq-wcm-foundation-image-map"),
      ((e = {}).handleResize = function () {
        var t = document.querySelectorAll(i);
        Array.prototype.forEach.call(t, function (t) {
          if (t.getAttribute("usemap")) {
            var e = t.getAttribute("src"),
              i = document.createElement("img");
            i.addEventListener("load", function () {
              var i = t.getAttribute("width") || t.naturalWidth,
                a = t.getAttribute("height") || t.naturalHeight;
              if (!i || !a) {
                var r = new Image();
                (r.src = e), i || (i = r.width), a || (a = r.height);
              }
              var n = t.offsetWidth / 100,
                o = t.offsetHeight / 100,
                c = t.getAttribute("usemap");
              c = c.replace("#", "");
              var s = document.querySelectorAll('map[name="' + c + '"]');
              Array.prototype.forEach.call(s, function (t) {
                var e = t.querySelectorAll("area");
                Array.prototype.forEach.call(e, function (t) {
                  t.dataset.coords ||
                    (t.dataset.coords = t.getAttribute("coords"));
                  for (
                    var e = t.dataset.coords.split(","),
                      r = new Array(e.length),
                      c = 0;
                    c < e.length;
                    ++c
                  )
                    r[c] =
                      c % 2 == 0
                        ? parseInt((e[c] / i) * 100 * n)
                        : parseInt((e[c] / a) * 100 * o);
                  t.setAttribute("coords", r.toString());
                });
              });
            }),
              i.setAttribute("src", e);
          }
        });
      }),
      e));
  var a = window.addEventListener || window.attachEvent,
    r = new (window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver)(function (e) {
      e.forEach(function () {
        t.WCM.Image.handleResize();
      });
    });
  a("resize", t.WCM.Image.handleResize),
    r.observe(document, { attributes: !0 }),
    t.WCM.Image.handleResize();
})(CQ),
  (function (t) {
    t.fn.rwdImageMaps = function () {
      var e = this;
      return (
        t(window)
          .resize(function () {
            e.each(function () {
              if (void 0 !== t(this).attr("usemap")) {
                var e = t(this);
                t("<img />")
                  .on("load", function () {
                    var i = e.attr("width"),
                      a = e.attr("height");
                    if (!i || !a) {
                      var r = new Image();
                      (r.src = e.attr("src")),
                        i || (i = r.width),
                        a || (a = r.height);
                    }
                    var n = e.width() / 100,
                      o = e.height() / 100,
                      c = e.attr("usemap").replace("#", ""),
                      s = "coords";
                    t('map[name="' + c + '"]')
                      .find("area")
                      .each(function () {
                        var e = t(this);
                        e.data(s) || e.data(s, e.attr(s));
                        for (
                          var r = e.data(s).split(","),
                            c = new Array(r.length),
                            l = 0;
                          l < c.length;
                          ++l
                        )
                          c[l] =
                            l % 2 == 0
                              ? parseInt((r[l] / i) * 100 * n)
                              : parseInt((r[l] / a) * 100 * o);
                        e.attr(s, c.toString());
                      });
                  })
                  .attr("src", e.attr("src"));
              }
            });
          })
          .trigger("resize"),
        this
      );
    };
  })(jQuery),
  (function (t, e) {
    var i =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver,
      a = { attributes: !0 },
      r = new i(function (t) {
        t.forEach(function () {
          n();
        });
      });
    function n() {
      e("div[id^='cq-image-jsp-']").each(function (t, i) {
        e("img[usemap]", i).rwdImageMaps();
      });
    }
    e(function () {
      n(), r.observe(t.documentElement, a);
    });
  })(document, $CQ),
  (function (t) {
    t(function () {
      function e(e, i) {
        try {
          (t.cq.isAuthor() || "#debug" == window.location.hash) &&
            ("undefined" != typeof console &&
              void 0 !== console.log &&
              (console.log(e), console.log(i)),
            alert(e.name + ":\n" + e.message + ".\n" + i + "."));
        } catch (t) {}
      }
      try {
        var i = t.browser.msie ? 0 : 250;
        try {
          t(".cq-carousel").each(function () {
            var a = t(this),
              r = +t("var[title='play-delay']", this).text();
            r || (r = 6e3);
            var n = +t("var[title='transition-time']", this).text();
            n || (n = 1e3);
            t(".cq-carousel-banners", this);
            var o = t(".cq-carousel-banner-switch", this).find("a"),
              c = t(".cq-carousel-banner-item", this),
              s = c.outerWidth(),
              l = c.filter(":first"),
              u = null,
              d = null,
              h = 0,
              f = t("a.cq-carousel-control-prev", this);
            f.click(function () {
              return (
                f.is(".cq-carousel-active") &&
                  t(o[(h + o.length - 1) % o.length]).click(),
                !1
              );
            });
            var m = t("a.cq-carousel-control-next", this);
            function v() {
              p(),
                r > 0 &&
                  (d = setInterval(function () {
                    t(o[(h + 1) % o.length]).click();
                  }, r));
            }
            function p() {
              null !== d && (clearInterval(d), (d = null));
            }
            m.click(function () {
              return (
                m.is(".cq-carousel-active") && t(o[(h + 1) % o.length]).click(),
                !1
              );
            }),
              o.length > 1 && m.addClass("cq-carousel-active"),
              i || t.browser.version > 6 ? l.css("left", 0) : l.show(),
              o
                .click(function () {
                  var e = t(this),
                    a = c.filter(e.attr("href")),
                    r = a.prevAll().length,
                    v = r > h || null !== d ? 1 : -1;
                  return (
                    e.is(".cq-carousel-active") ||
                      (o.removeClass("cq-carousel-active"),
                      e.addClass("cq-carousel-active"),
                      l.is(":animated") && (l.stop(!0, !0), u.stop(!0, !0)),
                      i
                        ? (a
                            .css({ left: v * s })
                            .animate({ left: 0, opacity: 1 }, n),
                          l.animate({ left: -v * s, opacity: 0 }, n))
                        : t.browser.version > 6
                          ? (a
                              .css({ left: v * s, opacity: 1 })
                              .animate({ left: 0 }, n),
                            l.animate({ left: -v * s }, n))
                          : (a.fadeIn(), l.fadeOut()),
                      (u = l),
                      (l = a),
                      (h = r) > 0
                        ? f.addClass("cq-carousel-active")
                        : f.removeClass("cq-carousel-active"),
                      h < o.length - 1
                        ? m.addClass("cq-carousel-active")
                        : m.removeClass("cq-carousel-active")),
                    !1
                  );
                })
                .each(function () {
                  var e = t(this);
                  e.attr("title", e.text());
                })
                .filter(":first")
                .addClass("cq-carousel-active"),
              v(),
              a.hover(
                function () {
                  p(), f.fadeIn(), m.fadeIn();
                },
                function () {
                  v(), f.fadeOut(), m.fadeOut();
                },
              ),
              (function (i) {
                try {
                  window.location.hash.length > 0 &&
                    t(window.location.hash, i).length > 0 &&
                    (window.location = (window.location + "").replace(
                      window.location.hash,
                      "",
                    ));
                } catch (t) {
                  e(t, "Could not remove hash");
                }
              })(this);
          });
        } catch (t) {
          e(t, "Could not initialize the banners");
        }
      } catch (t) {
        e(t, "Init failed");
      }
    });
  })($CQ || $),
  (function (t) {
    var e,
      i,
      a = t.event;
    e = a.special.debouncedresize = {
      setup: function () {
        t(this).on("resize", e.handler);
      },
      teardown: function () {
        t(this).off("resize", e.handler);
      },
      handler: function (t, r) {
        var n = this,
          o = arguments,
          c = function () {
            (t.type = "debouncedresize"), a.dispatch.apply(n, o);
          };
        i && clearTimeout(i), r ? c() : (i = setTimeout(c, e.threshold));
      },
      threshold: 150,
    };
  })($CQ),
  (window.matchMedia =
    window.matchMedia ||
    (function (t, e) {
      var i,
        a = t.documentElement,
        r = a.firstElementChild || a.firstChild,
        n = t.createElement("body"),
        o = t.createElement("div");
      return (
        (o.id = "mq-test-1"),
        (o.style.cssText = "position:absolute;top:-100em"),
        (n.style.background = "none"),
        n.appendChild(o),
        function (t) {
          return (
            (o.innerHTML =
              '&shy;<style media="' +
              t +
              '"> #mq-test-1 { width: 42px; }</style>'),
            a.insertBefore(n, r),
            (i = 42 === o.offsetWidth),
            a.removeChild(n),
            { matches: i, media: t }
          );
        }
      );
    })(document)),
  (function (t, e) {
    (e.picturefill = function (i) {
      undefined === i && (i = t("body")),
        t("div[data-picture]", i).each(function () {
          var i = this,
            a = [];
          t("div[data-media]", i).each(function () {
            var i = t(this).attr("data-media");
            (!i || (e.matchMedia && e.matchMedia(i).matches)) && a.push(this);
          });
          var r = t("img", i).first();
          if (a.length) {
            if (0 === r.size()) {
              var n = t(i);
              r = t("<img />").attr("alt", n.attr("data-alt")).appendTo(n);
            }
            r.attr("src", a.pop().getAttribute("data-src"));
          } else r.remove();
        });
    }),
      t(function () {
        e.picturefill();
      }),
      t(e).on("debouncedresize", function () {
        e.picturefill();
      });
  })($CQ, this);
