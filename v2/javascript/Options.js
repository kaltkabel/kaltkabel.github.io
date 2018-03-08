$(window).on('load', function() {
	$('#dev').on('change', function () {
		var selected = $(this).val().toLowerCase();
		if (selected != '0') {
			$('#mod').show();
			$('#mod option').hide();  //hide all options initially
			$('#mod option:eq(0)').show();  //show the first option
			$('#mod option.' + selected).show();  //show options with the right class        
		} else {
			$('#mod').hide();     
			$('#mod option').hide();        
		}
	});
});
function unhide() {
	document.getElementById("mod").disabled = false;
	document.getElementById("submit").disabled = true;
	document.getElementById("mod").value=0;
}
function unhide2() {
	document.getElementById("submit").disabled = false;
}