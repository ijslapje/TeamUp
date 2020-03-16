import $ from 'jquery'

$(document).ready(function () {
    $('#toggle').click(function() {	
		$(this).toggleClass('active');
		$('body').toggleClass('no_scroll');
		$('html').toggleClass('no_scroll');
		$('#overlay').toggleClass('open');
    });
    $('#overlay ul li a').on("click", function () {
        $('#toggle').click();
      });
});

