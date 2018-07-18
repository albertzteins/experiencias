var tiempofinal = 0;
var fino = 0;
var segundo_cero = 0;
var url_rest = 'https://admin.experienciastelcel.com/restful';

  function formatnumbers(numero){
    formado = '0' + numero;
    return formado.slice(-2);
  }



function upTime(countTo) {
  now = new Date();
  countTo = new Date(countTo);
  difference = (now-countTo);

  tiempox=convertMS(difference);

  if(fino==0){
    jQuery('#seconds').html(formatnumbers(tiempox.s));
    jQuery('#minutes').html(formatnumbers(tiempox.m));
    jQuery('#hours').html(formatnumbers(tiempox.h));
  }
  clearTimeout(upTime.to);
  tiempofinal = formatnumbers(tiempox.h) +':'+formatnumbers(tiempox.m)+':'+formatnumbers(tiempox.s);
  upTime.to=setTimeout(function(){ upTime(countTo); },1000);
}




jQuery('.iniciar-pz').click(function(){
    var sk = angular.element(jQuery('#puzzle-canvas')).scope();
    sk.startgame=1;
    sk.$apply();
    inicia =  new Date(Date.now());

    if(userConVentaja==true){
      $('#ventaja_informa').show();
      $('#counterup').hide();
      
      setTimeout(function () {
          $('#ventaja_informa').hide();
          $('#counterup').show();
          inicia =  new Date(Date.now());
          upTime(inicia);

      }, 30000);

    }
    else{
      upTime(inicia);     
    }

    
});



(function(angular) {
    'use strict';

    var app = angular.module('puzzleApp', ['slidingPuzzle']);

    // puzzle types
    var types = [
        { id: 'sliding-puzzle', title: 'Sliding puzzle' }
       
    ];



    angular.module("puzzleApp").directive('checkVentaja', ['$http',function($http) {
      return {
        restrict: 'A',
        link: function(scope, elm, attrs) { 
        
          elm.click(function(e){
            jQuery('#iniciador').hide();
            console.log(scope);
            console.log(url_rest);
            var uri = url_rest + '/settuser/?u='+upk+'&servicios='+ventaja;
            console.log(uri);

            $http.get(uri)
            .then(function(response) {
                    userConVentaja = true;
                    jQuery('#iniciador').show();
                    console.log(response,userConVentaja);

            });


          });


        }
      };

    }]);






    /**
     * Config
     */
    app.config(function($routeProvider) {
        $routeProvider.when('/:type');
    });

    /**
     * Startup
     */
    app.run(function($rootScope, $route, $filter,$http) {
        $rootScope.types = types;
        $rootScope.type = types[0].id;
        $rootScope.finalizado = false;
        $rootScope.hiddens = true;
        $rootScope.startgame = 0;
        $rootScope.ventaja = ventaja_titulo;
        $rootScope.ventaja_slug = ventaja;






        $http.get("https://admin.experienciastelcel.com/restful/promocion/"+id_dinamica+"/")
        .then(function(response) {
            $rootScope.src= 'https://admin.experienciastelcel.com/'+response.data.promocion.preguntas[0].puzzle;
            $rootScope.dinamica = response.data.promocion;
            jQuery('#txt-html').html(response.data.promocion.inicio_juego_txt);
           
        });



        $http.get('https://admin.experienciastelcel.com/restful/participando/'+upk+'/'+id_dinamica+'/').
        then(function(response) {
            
            if(response.data.status=='finalizo'){
                $rootScope.finalizado = true;
                $rootScope.hiddens = false;

            }
            else{
                $rootScope.finalizado = false;
                $rootScope.hiddens = true;
                $rootScope.tiempo = response.data.inicioUTC;
                $rootScope.tmp_pices = new Date(Date.now());
                
            }
        });



   
        // set type on route change
        $rootScope.$on('$routeChangeSuccess', function(event, route) {
            $rootScope.type = ($filter('filter')(types, { id: route.params.type }).length ? route.params.type : types[0].id);
        });
    });




})(window.angular);



