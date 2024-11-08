$.fn.begin = function (a) {
  $("#fader").css({ width: a.width, height: a.height }),
    $("#fader_img").css({ width: a.width, height: a.height - 40 }),
    $("#fader_img img").css({ width: a.width, height: a.height - 40 });
  var i = a.fade_speed,
    e = $("#fader_img").children(),
    s = $(e).length,
    r = s - 1;
  $("#sl2").css("display", "none"),
    $("#sr2").css("display", "none"),
    $(e).animate({ opacity: 0 }, { duration: 5 }),
    $(e[r]).animate({ opacity: 1 }, { duration: 5 });
  for (var o = "", t = 0; t < s; t++)
    o += "<div class='bip' id='" + t + "'> </div>";
  $("#fader_bips").append(o);
  var n = $("#fader_bips").children();
  if (($(n[r]).removeClass("bip"), $(n[r]).addClass("bip_over"), a.autoplay)) {
    var d = a.auto_speed,
      l = "";
    l = setInterval(function () {
      $(e).animate({ opacity: 0 }, { duration: i }),
        r < s - 1
          ? ($(n[r]).removeClass("bip_over"),
            $(n[r]).addClass("bip"),
            r++,
            $(e[r]).animate({ opacity: 1 }, { duration: i }),
            $(n[r]).removeClass("bip"),
            $(n[r]).addClass("bip_over"))
          : ($(n[r]).removeClass("bip_over"),
            $(n[r]).addClass("bip"),
            (r = 0),
            $(e[r]).animate({ opacity: 1 }, { duration: i }),
            $(n[r]).removeClass("bip"),
            $(n[r]).addClass("bip_over"));
    }, d);
  }
  $(".bip").on("click", function () {
    $(".bip_over").addClass("bip"),
      $(".bip_over").removeClass("bip_over"),
      $(this).removeClass("bip"),
      $(this).addClass("bip_over");
    var a = $(this).attr("id");
    $(e).animate({ opacity: 0 }, { duration: i }),
      $(e[a]).animate({ opacity: 1 }, { duration: i }),
      (r = a),
      clearInterval(l);
  }),
    $(".bip_over").on("click", function () {
      $(".bip_over").addClass("bip"),
        $(".bip_over").removeClass("bip_over"),
        $(this).removeClass("bip"),
        $(this).addClass("bip_over");
      var a = $(this).attr("id");
      $(e).animate({ opacity: 0 }, { duration: i }),
        $(e[a]).animate({ opacity: 1 }, { duration: i }),
        (r = a),
        clearInterval(l);
    }),
    $("#fader_left a")
      .mouseenter(function () {
        $("#sl2").css("display", "inline"), $("#sl").css("display", "none");
      })
      .mouseleave(function () {
        $("#sl").css("display", "inline"), $("#sl2").css("display", "none");
      }),
    $("#fader_right a")
      .mouseenter(function () {
        $("#sr2").css("display", "inline"), $("#sr").css("display", "none");
      })
      .mouseleave(function () {
        $("#sr").css("display", "inline"), $("#sr2").css("display", "none");
      }),
    $("#fader_left a").on("click", function () {
      return (
        $(e).animate({ opacity: 0 }, { duration: i }),
        r > 0
          ? ($(n[r]).removeClass("bip_over"),
            $(n[r]).addClass("bip"),
            r--,
            $(e[r]).animate({ opacity: 1 }, { duration: i }),
            $(n[r]).removeClass("bip"),
            $(n[r]).addClass("bip_over"))
          : ($(n[r]).removeClass("bip_over"),
            $(n[r]).addClass("bip"),
            (r = s - 1),
            $(e[r]).animate({ opacity: 1 }, { duration: i }),
            $(n[r]).removeClass("bip"),
            $(n[r]).addClass("bip_over")),
        clearInterval(l),
        !1
      );
    }),
    $("#fader_right a").on("click", function () {
      return (
        $(e).animate({ opacity: 0 }, { duration: i }),
        r < s - 1
          ? ($(n[r]).removeClass("bip_over"),
            $(n[r]).addClass("bip"),
            r++,
            $(e[r]).animate({ opacity: 1 }, { duration: i }),
            $(n[r]).removeClass("bip"),
            $(n[r]).addClass("bip_over"))
          : ($(n[r]).removeClass("bip_over"),
            $(n[r]).addClass("bip"),
            (r = 0),
            $(e[r]).animate({ opacity: 1 }, { duration: i }),
            $(n[r]).removeClass("bip"),
            $(n[r]).addClass("bip_over")),
        clearInterval(l),
        !1
      );
    });
};
