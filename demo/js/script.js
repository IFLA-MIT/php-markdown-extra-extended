$(function(){
	var resizeBoxes = function(){
		var h = $(window).height() - $('header').innerHeight() - 130;		
		$('.content-area').css('height', h + 'px');
		$('textarea').css('height', (h - 11) + 'px');		
	};
	
	// resize boxes to fit screen
	resizeBoxes();
	
	// load data from cookie
	$('textarea').val($.cookie('pmee_testdata')).focus();
	
				
	// bindings
	$(window).resize(resizeBoxes);
	
	$('form').bind("reset", function(){
		$.cookie('pmee_testdata', null);
	});

	// post to server
	$('form').submit(function(){
		var testdata = $('textarea').val();
		// some processing colors and UI niceness
		$('#result').html('').css('background-color', '#EBF765');
		$('#rawoutput').html('');
		$('button[type=submit]').attr('disabled', 'disabled');
		// save testdata in cookie for next reload
		$.cookie('pmee_testdata', testdata);
		// submit and wait for markup
		$.ajax({
			url: '/demo/service.php',
			data: { 'markdown': testdata },
			dataType: 'text',
			type: 'POST',
			success: function(res, status, xhr){
				// update UI
				$('#result').html(res).css('background-color', 'transparent');
				$('#rawoutput').text(res);
				prettyPrint();
				$('textarea').focus();
				$('button[type=submit]').removeAttr('disabled');
			}
		});
		return false;
	});
});