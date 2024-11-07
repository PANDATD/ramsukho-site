/******************************************/
/***** FOR RESPONSIVE ******/
/******************************************/
function retStr() {
	var listWidth = [];
	$('.rb-right-parent > div').each(function () {
		listWidth.push($(this).outerWidth());
	});
	var sum = listWidth.reduce(add, 0);

	function add(a, b) {
		return a + b;
	}
	return sum;
}

/* ==FOR CONTROLS MAX-WIDTH ADJUSTMENT SHOW-HIDE (Property/Child/Coupon Field)==*/
$(window).on('load', function () {


	if ($('.rb-wrapper').outerWidth() < 950) {

		$('.rb-wrapper').addClass('vertical');

		if ($('.child').length == 0) {

			$('.room,.adult').css('max-width', '50%');
		}

	} else {

		if ($(window).width() > 950) {


			if ($('.rb-left-parent > div').length < 3) {

				$('.rb-left-parent > div').css('max-width', '50%');

			}


			var pwid = retStr();
			$('.rb-right-parent').css('width', pwid);
			$('.rb-left-parent').css('width', $('.rb-container').outerWidth() - pwid)


		}




	}

});




/******************************************/
/***** Mandatory to add below script ******/
/******************************************/

(function ($) {
	/* Form Validation */
	$('#resBooking').on('submit', function () {
		var arrDate = $("input[name=arr_date]").val();
		var depDate = $("input[name=dep_date]").val();
		var roomNo = $("select[name=roomNo]").val();
		var adult_1 = $("select[name=adult_1]").val();
		var child_1 = $("select[name=child_1]").val();

		var res = true;
		if (arrDate == '') {
			$("input[name=arr_date]").parent().addClass("error-required");
			res = false;
		} else {
			$("input[name=arr_date]").parent().removeClass("error-required");
		}
		if (depDate == '') {
			$("input[name=dep_date]").parent().addClass("error-required");
			res = false;
		} else {
			$("input[name=dep_date]").parent().removeClass("error-required");
		}
		if (roomNo == '') {
			$("select[name=roomNo]").parent().addClass("error-required");
			res = false;
		} else {
			$("select[name=roomNo]").parent().removeClass("error-required");
		}
		if (adult_1 == '') {
			$("select[name=adult_1]").parent().addClass("error-required");
			res = false;
		} else {
			$("select[name=adult_1]").parent().removeClass("error-required");
		}
		if (child_1 == '') {
			$("select[name=child_1]").parent().addClass("error-required");
			res = false;
		} else {
			$("select[name=child_1]").parent().removeClass("error-required");
		}

		if ($("select[name=regCode]").length) {
			var regCode = $("select[name=regCode]").val();
			if (regCode == '') {
				$("select[name=regCode]").parent().addClass("error-required");
				res = false;
			} else {
				$("select[name=regCode]").parent().removeClass("error-required");
			}
		}
//alert("in validation "+depDate+" arr dat "+arrDate+" roomNo "+roomNo+" adult_1 "+adult_1+" child_1 "+child_1);
		return res;
	});

	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

	var checkin = $('#arr_date').datepicker({
		minDate: 0,
		dateFormat: 'dd/mm/yy',
		onRender: function (date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		if (ev.date.valueOf() >= checkout.date.valueOf()) {
			var newDate = new Date(ev.date)
			newDate.setDate(newDate.getDate() + 1);
			checkout.setValue(newDate);
		}
		checkout.fill();
		checkin.hide();
		$('#dep_date')[0].focus();
	}).data('datepicker');

	var checkout = $('#dep_date').datepicker({
		onRender: function (date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		checkout.hide();
	}).data('datepicker');

})(jQuery);
