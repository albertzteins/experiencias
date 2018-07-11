/*
var context = document.getElementById('puzzle').getContext('2d');

var img = new Image();
img.src = $('#img-sample').attr('src');
console.log(img.src);
//'http://www.brucealderman.info/Images/dimetrodon.jpg';
img.addEventListener('load', drawTiles, false);

var boardSize = document.getElementById('puzzle').width;
var tileCount = 3;

var tileSize = boardSize / tileCount;

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var solved = false;

var boardParts;
setBoard();



document.getElementById('puzzle').onclick = function(e) {
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function() {alert("You solved it!");}, 500);
  }
};

function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;
    }
  }
  emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
  emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
  solved = false;
}

function drawTiles() {
  context.clearRect ( 0 , 0 , boardSize , boardSize );
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
            i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }
}

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}


*/


  myapp = angular.module('mainApp',['ngRoute','ngSanitize']);

  var npalabras = 0;
  var tiempofinal = 0;
  var totales = 0;

  function formatnumbers(numero){
    formado = '0' + numero;
    return formado.slice(-2);
  }


function upTime(countTo) {
  now = new Date();
  countTo = new Date(countTo);
  difference = (now-countTo);
  tiempox=convertMS(difference);
  jQuery('#seconds').html(formatnumbers(tiempox.s));
  jQuery('#minutes').html(formatnumbers(tiempox.m));
  jQuery('#hours').html(formatnumbers(tiempox.h));
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


var upk = null;
upk = getCookie('upk');
if(upk.length<1)
upk = 14;


angular.module("mainApp").directive('slidePuzz', ['$http',function($http) {

  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {  

      //$(elm).getContext('2d');
      consoel.log(elm);
      console.log(scope);
      var img = new Image();
	  img.src = $('#img-sample').attr('src');


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
              tmp_pices = new Date(Date.now());
              upTime(tmp_pices); 
          }
        },true);



    }
  };



}]);



myapp.controller('puzzCtr',function($scope,$http){
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
