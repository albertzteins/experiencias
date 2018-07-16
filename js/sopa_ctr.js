



  myapp = angular.module('mainApp',['ngRoute','ngSanitize']);

    angular.module("mainApp").directive('checkVentaja', ['$http',function($http) {
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





  var npalabras = 0;
  var tiempofinal = 0;
  var totales = 0;
  var fino = 0;

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
  tiempofinal = formatnumbers(tiempox.h) + ':' +  formatnumbers(tiempox.m) + ':' + formatnumbers(tiempox.s);
  upTime.to=setTimeout(function(){ upTime(countTo); },1000);
}



function downTime(countTo) {
  now = new Date();
  countTo = new Date(countTo);
  difference = (countTo-now);
  tiempox=convertMS(difference);
  jQuery('#seconds').html(tiempox.s);
  jQuery('#minutes').html(tiempox.m);
  jQuery('#hours').html(tiempox.h);
  jQuery('#days').html(tiempox.d);
  clearTimeout(upTime.to);
  upTime.to=setTimeout(function(){ upTime(countTo); },1000);
}




angular.module("mainApp").directive('playIng', ['$http',function($http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {  

        clicks = 0;
        elm.click(function(e){
            sopa = scope.$parent.$parent.sopa;
            respuestas = scope.$parent.$parent.respuestas;
            totales = scope.$parent.$parent.palabras.length;

            y = scope.$parent.$index;
            x = scope.$index;
            lista = scope.$parent.$parent.junta;
            pos = scope.$parent.$parent.lista;
            clicks++;
            lista.push(x,y);
            $(elm).addClass('preselect');
            if(clicks==2){

                clicks=0;
                pox = lista.join('');
                inx = pos.indexOf(pox);
                if(inx>-1){
                    jQuery('.preselect').removeClass('preselect');
                    x1 = lista[0];
                    y1 = lista[1];
                    x2 = lista[2];
                    y2 = lista[3];
                    respuestas.push(pox);
                    npalabras++;

                    if(x1==x2){
                        constante = x1;
                        if(y1>y2){
                            inicio=y2;
                            final=y1;
                        }
                        else{
                            inicio = y1;
                            final=y2;
                        }

                        for(x=inicio;x<=final;x++){
                            cadena = '.row_'+x+'>.col_'+constante;
                            jQuery(cadena).addClass('upercaser');

                        }
                    }
                    else{
                        constante = y1;
                        if(x1>x2){
                            inicio = x2;
                            final = x1;
                        }
                        else{
                            inicio = x1;
                            final = x2;
                        }

                        for(x=inicio;x<=final;x++){
                            cadena = '.row_'+constante+'>.col_'+x;
                            jQuery(cadena).addClass('upercaser');

                        }
                    }
                }
                else{
                  //jQuery('.preselect').removeClass('preselect');
                  //alert('ups, esa no es la palabra.');
                  $(elm).addClass('errselect');

                  setTimeout(function() {
                          $('.errselect').removeClass('errselect');
                          $('.preselect').removeClass('preselect');
                      }, 500)

                }
                scope.$parent.$parent.junta = [];
                scope.$apply();
            }

            
        });        

    }
  };

}]);




angular.module("mainApp").directive('finalizarJuego', ['$http',function($http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {  
        elm.click(function(e){
            preguntas = scope.lista.length;
            respuestas = scope.respuestas.length;
            fino = 1;
            uri = 'https://admin.experienciastelcel.com/restful/finalsopa/'+upk+'/'+id_dinamica+'/';
            data = {'respuestas':npalabras,'tiempo':tiempofinal};
            params = {'url':uri,'method':'GET','params':data};
            $http(params).then(function(response) {

               scope.startgame = 2; 
               scope.tiempofinal = tiempofinal; 
               scope.totales = totales;
               scope.npalabras = npalabras;             
            });

        });        

    }
  };

}]);



angular.module("mainApp").directive('contadorJuego', ['$http',function($http) {

  /*
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {  
        //convertMS(response.tiempoUTC);
        
        uri = 'https://admin.experienciastelcel.com/restful/participando/'+upk+'/'+id_dinamica+'/';

        $http.get(uri).then(function(response) {
            scope.status = response.data.status;
            tiempo = response.data.inicioUTC;
            tmp_pices = new Date(Date.now());
            console.log(scope);
            upTime(tmp_pices); 
        });
    }
  };
  */
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {

        scope.$watch('startgame',function(x){
          if(scope.startgame==1){

              /*
              console.log(userConVentaja);

              tmp_pices = new Date(Date.now());
              upTime(tmp_pices); 
            */

              inicia = new Date(Date.now());
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



          }
        },true);



    }
  };



}]);



myapp.controller('sopaCtr',function($scope,$http){
    $scope.sopa = {};
    $scope.lista = {};
    $scope.palabras = [];
    $scope.junta = [];
    $scope.contador = [];
    $scope.dinamica = null;
    $scope.respuestas = [];
    $scope.status = null;
    $scope.startgame = 0;
    $scope.tiempofinal = tiempofinal;
    $scope.ventaja = ventaja_titulo;
    $scope.ventaja_slug = ventaja;



    $scope.iniciar = function(){
      $scope.startgame = 1;
    }


    $http.get("https://admin.experienciastelcel.com/restful/promocion/"+id_dinamica+"/")
    .then(function(response) {
      $scope.dinamica = response.data.promocion;
      $scope.sopa = response.data.promocion.preguntas.tablero;
      $scope.lista = response.data.promocion.preguntas.lista; 
      $scope.palabras = response.data.promocion.preguntas.palabras; 
    });
   


});
