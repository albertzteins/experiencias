$(document).ready( function() {
	$(".editarservicios").hide();
	
	$("#main-wrapper").load("secciones/iniciotelcel.html", function() {
		$('html, body').scrollTop(0);
	});
	
})