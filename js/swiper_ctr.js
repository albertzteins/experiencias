var id_dinamica = 63;

(function(angular) {
    'use strict';

    var app = angular.module('puzzleApp',['ngRoute','ngSanitize']); 


    angular.module("puzzleApp").directive('swiperOn', ['$http',function($http) {
      return {
        restrict: 'A',
        link: function(scope, elm, attrs) {  
            var elemento = elm[0];
            var hammertime = new Hammer(elemento);
            hammertime.on('swipeleft', function(ev) {
               $(elemento).animate({'left': "-=500",'top': "+=200"}, 190,function(){
                $(elemento).remove();
               }); 
            });
            hammertime.on('swiperight', function(ev) {
               $(elemento).animate({'left': "+=500",'top': "-=200"}, 190,function(){
                $(elemento).remove();
               }); 
            });
        }
      };

    }]);

 
    app.controller('swiperCtr',function($scope,$http){
        $scope.sopa = {};
        $scope.lista = {};
        $scope.palabras = [];
        $scope.junta = [];
        $scope.contador = [];
        $scope.dinamica = null;
        $scope.respuestas = [];
        $scope.status = null;
        $scope.startgame = 1;
        $scope.tiempofinal = 0;
        $scope.path_site = 'http://adm.experienciastelcel.com/';
        $scope.iniciar = function(){
          $scope.startgame = 1;
        }

        $http.get($scope.path_site+'restful/promocion/'+id_dinamica+"/")
        .then(function(response) {
          $scope.dinamica = response.data.promocion;
        });
    });

})(window.angular);

