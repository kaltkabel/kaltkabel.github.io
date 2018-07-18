function Include() {
	var opt1 = $("#mod option:selected").attr('class');
	var opt2 = $("#mod option:selected").val();
	var file = opt1+"_"+opt2+".GUIDE";
	$("#include").css("opacity", "0");
	$('#submit').prop('disabled', true).delay(1000).queue(
		function(next) {
		$(this).prop('disabled', false);
		next(); 
		}); 
	$("#include").delay(200).queue(function( nxt ) {
		$(this).load("includes/"+file);
		nxt();
		});
	$("#include").delay(600);
	$("#include").animate({opacity: '1'}, "fast");
}