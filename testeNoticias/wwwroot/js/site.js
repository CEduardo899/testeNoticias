// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
'use strict';
var app = angular.module('noticias',[]);

// Service
app.factory('noticiasService',function($http) {
	return {
		getNoticias: function(){
			return $http.get('/api/noticia');
		},
		getNoticia: function(id){
            return $http.get('/api/noticia/'+id);
        }
	}
});

// Controller
app.controller('noticiasController', function($scope, noticiasService, $compile) {
    //$scope.noticia = {};
	$scope.getNoticias = function(){
		noticiasService.getNoticias().then(function(data){
            console.log(data);
            $scope.noticias = data.data;
            $('.loading').hide();
            $('#lista-noticias').show();
		},function(data){
            console.log(data);
            alert('Erro ao buscar noticias!');
        });
	}

	$scope.getNoticia = function(id){
        $('.loading').show();
        $('#lista-noticias').hide();
		noticiasService.getNoticia(id).then(function(data){
            console.log(data);
            $scope.noticia = data.data;
            //$scope.noticia.titulo = data.data.titulo;
            console.log($scope.noticia);
            $compile($("#exibir-noticia"))($scope);
            $('.loading').hide();
            $('#exibir-noticia').show();
        },function(data){
            console.log(data);
            alert('Erro ao buscar noticia!');
            $('.loading').hide();
            $('#lista-noticias').show();
        });
    }

    $scope.voltar = function(){
        $('#exibir-noticia').hide();
        $('#lista-noticias').show();
    }
});