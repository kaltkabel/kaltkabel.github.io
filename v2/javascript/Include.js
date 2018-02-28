function Include() {
	var opt1 = $("#mod option:selected").attr('class');
	var opt2 = $("#mod option:selected").val();
	var file = opt1+"_"+opt2;
	$('#submit').prop('disabled', true).delay(700).queue(
		function(next) {
		$(this).prop('disabled', false);
		next(); 
		});
	$("#include").load("includes/"+file); 
	$("#include").css("opacity", "0");
	$("#include").delay('500');
	$("#include").animate({opacity: '1'}, "fast");
}