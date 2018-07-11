var categoria;
var categoriaTitulo;
var timerdinamicasfiltromainheader;
var desplegados_Over;
var id_dinamica, upk, servicioUser;
var userConVentaja = false; 

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    //alert(ca);
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

// alert( window.location.href );
// alert( getUrlVars()["u"])

$(document).ready(function() {
	upk = getUrlVars()["u"]

	

	var query = window.location.search;
	//alert(query)
	urls = 'https://admin.experienciastelcel.com/restful/reguser/'+query; 

	$.get(urls,function(data,status){
	    
	    document.cookie="upk="+data.userpk; // aquí se genera la acookie
	    //alert(data);
	    // upk = data.userpk;
	    //alert(upk);
	    servicioUser = data.servicios;

	});

	// var likesJson = $.getJSON( "https://admin.experienciastelcel.com/restful/getprofileuser/?upk="+upk, function( data ) {

	var userJson = $.getJSON( "https://admin.experienciastelcel.com/restful/getuser/?upk="+upk , function( data ) {
		
		//alert( data.usuario.servicios );
		//alert( data.usuario.ventaja );
		if ( data.usuario.ventaja == 1 ) {
			userConVentaja = true;
			// alert( "usuario con ventaja " + userConVentaja)
		};
		
	})

	// alert( $("body").children().length );
	$("#menufiltros").hide();
	$("#menufiltrosmobile").hide();
	$("#menumobile").hide();
	// $("#main-header nav").hide();
	$('html, body').scrollTop(0);


	var id_timerSalidaDesplegados;
	var tiemposalida = 2000;

	function timerSalidaDesplegados() {
		// $(".desplegados").addClass("novisible");
	}

	var promocionesJson = $.getJSON( "https://admin.experienciastelcel.com/restful/categorias/", function( datacat ) {
		var categoriasHTML = '';
		for(var i=0; i<datacat.categorias.length; i++) {
			categoriasHTML += '<div class="no-seleccionable" data-categoria="'+datacat.categorias[i].catslug+'" >'+datacat.categorias[i].catname+'</div>'
			// console.log(datacat.categorias[i].catname)
			// console.log(datacat.categorias[i].catslug)
		}
		$("#menufiltros").append(categoriasHTML);
		$("#menufiltrosmobile").append(categoriasHTML);

		$(".desplegados div").click ( function() {
			clearTimeout(timerdinamicasfiltromainheader);
			$(".desplegados").hide();
			$("#menudesktop #experiencias").find(".fa").removeClass("fa-times"); 
			$("#menudesktop #experiencias").find(".fa").addClass("fa-caret-down");
			$(".desplegados div").removeClass("cyanHover");
			$(".desplegados div").removeClass("grisSelected");

			categoria = $(this).data("categoria");
			categoriaTitulo = $(this).text();
			// alert(categoria)
			cargaContenido("categoria.html");

			
		})

		$(".desplegados").mouseover (function() {
			clearTimeout(timerdinamicasfiltromainheader);
			desplegados_Over = true;
		});

		$(".desplegados").mouseleave (function() {
			$(".desplegados").hide();
			desplegados_Over = false;
			$("#menudesktop #experiencias").find(".fa").removeClass("fa-times"); 
			$("#menudesktop #experiencias").find(".fa").addClass("fa-caret-down");

			$("#main-header .icon-menu").removeClass("fa-times");
			$("#main-header .icon-menu").addClass("fa-bars");
		});
	})

	/************* menu filtrado dinamicas carrusel *********/

		$("#main-header #experiencias").mouseleave( function() {
			timerdinamicasfiltromainheader = setTimeout( function() {
				if ( !desplegados_Over ) { 
					$(".desplegados").hide() 
					$("#main-header #experiencias").find(".fa").removeClass("fa-times"); 
					$("#main-header #experiencias").find(".fa").addClass("fa-caret-down");
					$(".desplegados div").removeClass("cyanHover");
					$(".desplegados div").removeClass("grisSelected");
				} else {
					desplegados_Over = false;
				};
			 }, 500)
		});

		$("#menudesktop #experiencias").click ( function() {
			// alert( $("#menufiltros").is(":visible") )
			clearTimeout(timerdinamicasfiltromainheader);

			if ( $("#menufiltros").is(":visible") ) {
				$("#menufiltros").hide();
				$(this).find(".fa").removeClass("fa-times"); 
				$(this).find(".fa").addClass("fa-caret-down");
			} else {
				$(".desplegados").hide();
				$("#menufiltros").show();
				$(this).find(".fa").removeClass("fa-caret-down"); 
				$(this).find(".fa").addClass("fa-times");
			}
		})


		

		/************* fin menu filtrado dinamicas carrusel *********/

		/**************** main menu mobile ***************/

		$("#menumobile #experiencias").click( function() {
			clearTimeout(timerdinamicasfiltromainheader);
			$("#menumobile").hide();
			$("#menufiltrosmobile").show();
		});

		/*************************************************/

	/**** even menu principal desktop *****/

	$("#main-header #experiencias__").click(function() {
		// alert(1);
		$('.desplegados').not("#menufiltros").addClass('novisible');
		$(".desplegados div").removeClass("cyanHover");
		$(".desplegados div").removeClass("grisSelected");
		
		$("#menufiltros").toggleClass("novisible");
	})


	$("#main-header .icon-menu").click ( function() {
		// clearTimeout(timerdinamicasfiltro);

		if ( $("#main-header #menumobile").is(":visible") || $("#main-header #menufiltrosmobile").is(":visible") ) {
			$("#main-header #menumobile").hide();
			$("#main-header #menufiltrosmobile").hide();
			$(this).removeClass("fa-times");
			$(this).addClass("fa-bars");
		} else {
			// $(".desplegadosD").hide();
			$("#main-header #menumobile").show();
			$(this).removeClass("fa-bars");
			$(this).addClass("fa-times");
		}
	})



	/**************** carga de secciones *******************/

	$("#main-header .brand").click(function() {
		cargaContenido( "inicio.html" )
	})

	$("#main-header #noticias").click(function() {
		cargaContenido( "noticias.html" )
	})

	$("#main-header #ganadores").click(function() {
		cargaContenido( "ganadores.html" )
	})

	$("#main-header #comofunciona").click(function() {
		cargaContenido( "comofunciona.html" )
	})

	$("#main-header #perfil").click(function() {	
		cargaContenido( "perfil.html" );
		event.stopPropagation();
	})

	
	/*************** servicios *****************/

	$(".editarservicios .serviciosdeclarados .servicio").click( function() {
		$(this).find(".checkbox").toggleClass("fa-check-square");
	})

	/*******************************************/



	/******************************************************/


	// conducta menu catetgorias a subcategorias

	

	/***************** js breakpoint *******************/
	$(window).resetBreakpoints()
	$(window).setBreakpoints();

	$(window).bind('exitBreakpoint960',function() {
		// $("#main-header nav").hide();
		$("#experiencias .fa").removeClass("fa-caret-down");
		$("#experiencias .fa").addClass("fa-caret-right");

		$(".desplegados").unbind('mouseleave');
		$(".desplegados").unbind('mouseenter');
		$(".desplegados div").unbind('mouseover');
		$(".desplegados div").unbind('mouseleave');
		console.log("mobile")
		
	});
	
	$(window).bind('enterBreakpoint960',function() {
		// $("#main-header nav").show();
		$("#experiencias .fa").removeClass("fa-caret-right");
		$("#experiencias .fa").addClass("fa-caret-down");
		console.log("desktop")
		// $(".desplegados").bind('mouseenter', function() {
		// 	clearTimeout( id_timerSalidaDesplegados );
		// })

		$(".desplegados div").bind('mouseover', function() {
			if ( !$( this ).hasClass( "grisSelected" ) ) {
				$(".desplegados div").removeClass("cyanHover");
				$(this).addClass("cyanHover");
			}
			
		})

		$(".desplegados div").bind('mouseleave',function() {
			$(".desplegados div").removeClass("cyanHover");
		})


		

		$(".desplegados").bind('mouseleave',function() {
			clearTimeout( id_timerSalidaDesplegados );
			id_timerSalidaDesplegados = setTimeout( timerSalidaDesplegados, 1500);
		})

	});

	/***************************************************/
	// solo funciona 1 vez, no es dinamica, sirve al crgar la pagina
	// max-width
	// if (window.matchMedia("(min-width: 980px)").matches) {
	//   /* the viewport is at least 400 pixels wide */
	//   alert("mayor a 980")
	// } else {
	//   /* the viewport is less than 400 pixels wide */
	//   alert("menor a 980")
	// }

		// $(".editarservicios .cancelar, .editarservicios .continuar").click( function() {
		// 	$(".editarservicios").hide();
		// })
	if ("ontouchstart" in document.documentElement) {
	  // Es un dispositivo táctil.
	  // alert("tactil")
	  // $("#main-header nav").hide();
	} else {
	  // No es un dispositivo táctil.
	  // alert("no tactil")
	}

	/******************** likes ***********************/

	$( "body" ).undelegate(  ".likes", "click").delegate( ".likes", "click", function( event) {
		id_dinamica = $(this).data("id");
		event.stopPropagation();
		var likesJson = $.getJSON( "https://admin.experienciastelcel.com/restful/addlikes/?upk="+upk+"&ppk="+id_dinamica, function( data ) {
			console.log( "likes = "+data.likes )
			$( "[data-id='"+id_dinamica+"']" ).find( ".totallikes" ).text( data.likes);
			$( ".ladinamica .socialdata .likes .totallikes" ).text( data.likes); // para la pagina de la dinamica
		});
	});

	$( "body" ).undelegate(  ".likes", "mouseover").delegate( ".likes", "mouseover", function( event) {
		$(this).find(".fa").removeClass("fa-heart-o");
		$(this).find(".fa").addClass("fa-heart");
		
	});
	
	$( "body" ).undelegate(  ".likes", "mouseleave").delegate( ".likes", "mouseleave", function( event) {
		$(this).find(".fa").removeClass("fa-heart");
		$(this).find(".fa").addClass("fa-heart-o");
		
	});

	/**************************************************/

})

function cargaContenido( seccion ) {
	$("#main-wrapper").fadeTo(400,0.0, function() {
			$('html, body').scrollTop(0);
			var randomNum = Math.random()*1000;
			$("#main-wrapper").load("secciones/"+seccion, function() {
				$("#main-wrapper").fadeTo(400,1.0);
			});
	})
}