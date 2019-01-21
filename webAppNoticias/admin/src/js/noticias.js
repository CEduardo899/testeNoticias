var App = angular.module('App',['ngRoute']);
// Route
App.config(function ($routeProvider) {
    $routeProvider.when('/noticia',{
        templateUrl: 'Views/noticia.html',
        controller: 'noticiaCtrl'
    }).when('/categoria',{
        templateUrl: 'Views/categoria.html',
        controller: 'categoriaCtrl'
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
        },
        cadastra: function(data){
			return $http.post('https://localhost:5001/api/noticia/', data);
		},
        edita: function(data){
            var id = data.id;
			return $http.put('https://localhost:5001/api/noticia/'+id, data);
		},
		exclui: function(id){
			return $http.delete('https://localhost:5001/api/noticia/'+id)
        },
        getCategorias: function(){
			return $http.get('https://localhost:5001/api/categoria');
		}
	}
});

App.factory('categoriaService',function($http) {
	return {
        getCategorias: function(){
			return $http.get('https://localhost:5001/api/categoria');
        },
        cadastra: function(data){
			return $http.post('https://localhost:5001/api/categoria/', data);
		},
        edita: function(data){
            var id = data.id;
			return $http.put('https://localhost:5001/api/categoria/'+id, data);
		},
		exclui: function(id){
			return $http.delete('https://localhost:5001/api/categoria/'+id)
        },
	}
});

// Controller
App.controller('noticiaCtrl',function($scope,noticiaService){
    $scope.getCategorias = function(){
		noticiaService.getCategorias().then(function(data){
            $scope.categorias = data.data;
            // $scope.categorias.unshift({'id':'', 'nome':''});
            console.log(data.data);
		},function(data){
            console.log(data);
            alert('Erro ao buscar categorias!');
        });
    }
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
    
    $scope.editar = function(data){
        $scope.noticia = data;
		$('#noticiaModal').modal('show');
    }

	$scope.salvar = function(){
        // if(typeof $scope.img !== 'undefined' && $scope.img )
        // {
        //     $scope.noticia.img = $scope.img;
        // }
        // console.log($scope.noticia);
		if($scope.noticia.id){
			noticiaService.edita($scope.noticia).then(function(data){
                $scope.getNoticias();
                alert('Noticia atualizada com sucesso!');
			},function(data){
                console.log(data);
                alert('Erro ao editar noticia!');
			});
		}else{
			noticiaService.cadastra($scope.noticia).then(function(data){
                $scope.getNoticias();
                alert('Noticia cadastrada com sucesso!');
			},function(data){
                console.log(data)
                alert('Erro ao cadastar noticia!');
			});
        }
        $('#noticiaModal').modal('hide');
        $scope.noticia = {};
	}

	$scope.excluir = function(data){
		if(confirm("Tem certeza que deseja excluir?")){
			noticiaService.exclui(data.id).then(function(data){
                $scope.getNoticias();
            },function(data){
                alert('Error ao exluir noticia');
            });


		}
    }

    $scope.uploadImg = function(files){
        console.log(files);
		if(files && files[0]){
            $scope.img = files[0];
        }
    }
    $scope.getCategorias();
});

App.controller('categoriaCtrl',function($scope,categoriaService){
    $scope.getCategorias = function(){
		categoriaService.getCategorias().then(function(data){
            $scope.categorias = data.data;
            $('.loading').hide();
            $('#lista-categorias').show();
		},function(data){
            console.log(data);
            alert('Erro ao buscar categorias!');
        });
    }

    $scope.editar = function(data){
        $scope.categoria = data;
		$('#categoriaModal').modal('show');
    }

	$scope.salvar = function(){
		if($scope.categoria.id){
			categoriaService.edita($scope.categoria).then(function(data){
                $scope.getCategorias();
                alert('Categoria atualizada com sucesso!');
			},function(data){
                console.log(data);
                alert('Error ao atualizada categoria!');
			});
		}else{
			categoriaService.cadastra($scope.categoria).then(function(data){
                $scope.getCategorias();
                alert('Categoria cadastrada com sucesso!');
			},function(data){
                console.log(data);
                alert('Error ao cadastrar categoria!');
			});
        }
        $('#categoriaModal').modal('hide');
        $scope.categoria = {};
        
	}

	$scope.excluir = function(data){
		if(confirm("Tem certeza que deseja excluir?")){
			categoriaService.exclui(data.id).then(function(data){
                $scope.getCategorias();
            },function(data){
                console.log(data);
                alert('Error ao exluir categoria!');
            });


		}
    }
    $scope.getCategorias();
});