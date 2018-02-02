function Include() {
		var opt1 = $("#mod option:selected").attr('class');
		var opt2 = $("#mod option:selected").val();
		var file = opt1+"_"+opt2;
		$('#fixit').prop('disabled', true).delay(1000).queue(function(next) {
			$(this).prop('disabled', false);
			next();
			});
		$("#include").load("includes/"+file); 
		$("#include").css("left", "0px");
		$("#include").css("opacity", "0");
		$("#include").delay('500');
		$("#include").animate({
			left: '+=30px',
			opacity: '1'
			}, "fast");
}