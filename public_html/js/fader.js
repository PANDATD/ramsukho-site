(function () {
	$.fn.begin = function (properties) {
		$("#fader").css({ "width": properties.width, "height": properties.height });
		$("#fader_img").css({ "width": properties.width, "height": properties.height - 40 });
		$("#fader_img img").css({ "width": properties.width, "height": properties.height - 40 });

		var speed = properties.fade_speed;
		var imgs = $("#fader_img").children();
		var total = $(imgs).length;
		var current = total - 1;

		$("#sl2").css("display", "none");
		$("#sr2").css("display", "none");
		$(imgs).animate({ opacity: 0 }, { duration: 5 });
		$(imgs[current]).animate({ opacity: 1 }, { duration: 5 });

		var bippies = "";
		for (var i = 0; i < total; i++) {
			bippies += "<div class='bip' id='" + i + "'> </div>";
		}
		$("#fader_bips").append(bippies);
		var bips = $("#fader_bips").children();
		$(bips[current]).removeClass("bip");
		$(bips[current]).addClass("bip_over");

		if (properties.autoplay) {
			var time = properties.auto_speed;
			var timervar = '';

			function myFunction() {
				timervar = setInterval(function () {
					$(imgs).animate({ opacity: 0 }, { duration: speed });
					if (current < total - 1) {
						$(bips[current]).removeClass("bip_over");
						$(bips[current]).addClass("bip");
						current++;
						$(imgs[current]).animate({ opacity: 1 }, { duration: speed });
						$(bips[current]).removeClass("bip");
						$(bips[current]).addClass("bip_over");
					}
					else {
						$(bips[current]).removeClass("bip_over");
						$(bips[current]).addClass("bip");
						current = 0;
						$(imgs[current]).animate({ opacity: 1 }, { duration: speed });
						$(bips[current]).removeClass("bip");
						$(bips[current]).addClass("bip_over");
					}
				}, time);
			}
			myFunction();
		}

		$(".bip").on("click", function () {
			$(".bip_over").addClass("bip");
			$(".bip_over").removeClass("bip_over");
			$(this).removeClass("bip");
			$(this).addClass("bip_over");
			var id = $(this).attr('id');
			$(imgs).animate({ opacity: 0 }, { duration: speed });
			$(imgs[id]).animate({ opacity: 1 }, { duration: speed });
			current = id;
			clearInterval(timervar);
		});

		$(".bip_over").on("click", function () {
			$(".bip_over").addClass("bip");
			$(".bip_over").removeClass("bip_over");
			$(this).removeClass("bip");
			$(this).addClass("bip_over");
			var id = $(this).attr('id');
			$(imgs).animate({ opacity: 0 }, { duration: speed });
			$(imgs[id]).animate({ opacity: 1 }, { duration: speed });
			current = id;
			clearInterval(timervar);
		});

		$("#fader_left a").mouseenter(function () {
			$("#sl2").css("display", "inline");
			$("#sl").css("display", "none");
		}).mouseleave(function () {
			$("#sl").css("display", "inline");
			$("#sl2").css("display", "none");
		});

		$("#fader_right a").mouseenter(function () {
			$("#sr2").css("display", "inline");
			$("#sr").css("display", "none");
		}).mouseleave(function () {
			$("#sr").css("display", "inline");
			$("#sr2").css("display", "none");
		});

		$("#fader_left a").on("click", function () {
			$(imgs).animate({ opacity: 0 }, { duration: speed });
			if (current > 0) {
				$(bips[current]).removeClass("bip_over");
				$(bips[current]).addClass("bip");
				current--;
				$(imgs[current]).animate({ opacity: 1 }, { duration: speed });
				$(bips[current]).removeClass("bip");
				$(bips[current]).addClass("bip_over");
			}
			else {
				$(bips[current]).removeClass("bip_over");
				$(bips[current]).addClass("bip");
				current = total - 1;
				$(imgs[current]).animate({ opacity: 1 }, { duration: speed });
				$(bips[current]).removeClass("bip");
				$(bips[current]).addClass("bip_over");
			}
			clearInterval(timervar);
			return false;
		});

		$("#fader_right a").on("click", function () {
			$(imgs).animate({ opacity: 0 }, { duration: speed });
			if (current < total - 1) {
				$(bips[current]).removeClass("bip_over");
				$(bips[current]).addClass("bip");
				current++;
				$(imgs[current]).animate({ opacity: 1 }, { duration: speed });
				$(bips[current]).removeClass("bip");
				$(bips[current]).addClass("bip_over");
			}
			else {
				$(bips[current]).removeClass("bip_over");
				$(bips[current]).addClass("bip");
				current = 0;
				$(imgs[current]).animate({ opacity: 1 }, { duration: speed });
				$(bips[current]).removeClass("bip");
				$(bips[current]).addClass("bip_over");
			}
			clearInterval(timervar);
			return false;
		});
	};
})();