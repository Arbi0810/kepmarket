$(document).ready(function(){


	$('a.mob-parent').bind('click', function(){
	$(this).next().toggleClass('active'); //triangle
	$(this).parent().children("div").slideToggle("fast");
	});

	$('.toggle-mobile-menu span.fa').bind('click', function(){
		$('.mobile-menu').toggleClass('active');
		$('.mobile-menu').slideToggle();

		$(this).toggleClass('active');
	});


})