var App = angular.module('AppFront',['ngRoute']);
// Route
App.config(function ($routeProvider) {
    $routeProvider.when('/',{
        templateUrl: 'Views/lista-noticias.html',
        controller: 'noticiasCtrl'
    }).when('/noticia/:id',{
        templateUrl: 'Views/detalhe-noticia.html',
        controller: 'detalheNoticiaCtrl'
    });
});

// Service
App.factory('noticiaService',function($http) {
	return {
		getNoticias: function(){
			return $http.get('https://localhost:5001/api/noticia');
		},
		getNoticia: function(id){
            return $http.get('https://localhost:5001/api/noticia/'+id);
        }
	}
});

// Controller
App.controller('noticiasCtrl',function($scope,noticiaService){    
    $scope.getNoticias = function(){
		noticiaService.getNoticias().then(function(data){
            console.log(data);
            $scope.noticias = data.data;
            $('.loading').hide();
            $('#lista-noticias').show();
		},function(data){
            console.log(data);
            alert('Erro ao buscar noticias!');
        });
    }
    $scope.getNoticias();
});

App.controller('detalheNoticiaCtrl',function($scope,noticiaService,$routeParams){
    var id = $routeParams.id;
    $scope.getNoticia = function(){
		noticiaService.getNoticia(id).then(function(data){
            $scope.noticia = data.data;
            $('.loading').hide();
            $('#lista-categorias').show();
		},function(data){
            console.log(data);
            alert('Erro ao buscar categorias!');
        });
    }

    $scope.voltar = function(){
        window.location.href = '/';	
    }
    $scope.getNoticia();
});