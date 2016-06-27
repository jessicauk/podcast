angular.module('podcastApp',['ui.router','main.module', 'servicesModule'])
	.run(['$rootScope', '$http', function ( $rootScope, $http ) {
		$rootScope.mensaje = "Angular tools";
		$rootScope.prueba = "Es una pruueba";
	}])
	.config( [ '$locationProvider', '$stateProvider', '$urlRouterProvider', function ( $locationProvider, $stateProvider, $urlRouterProvider ) {
		$urlRouterProvider.otherwise("/")
		$stateProvider
			.state('index', {
				url : '/',
				views : {
					'@': {
						templateUrl : 'assets/templates/busqueda.html',
						controller: 'mainController'
					},
				}
			})
				.state('index.busqueda', {
					url: 'busca',
					templateUrl: "assets/templates/main.html",
					controller: 'mainController'
				})
				.state('index.podcastList', { //
					url: 'lista',
					templateUrl: "assets/templates/podcast.html",
					controller: 'mainController'
				})
	}])
	.controller('mainController', ['$scope', '$rootScope', '$http','podcastService', '$q', function ( $scope, $rootScope, $http, podcastService, $q) {
		$scope.prueba2 = "Es una prueba y debe de funcionar";
		$scope.baseUrl = "https://itunes.apple.com/";
		$scope.params = new Object();

    
		//Función que obtiene los datos del formulario, recibe como parametro el objeto
		$scope.obj = new Object();
		$scope.getData = function (data) {
			$scope.gather = [];
			console.log(angular.toJson(data));
			podcastService.getRss($scope.baseUrl, data)
				.then(function (res) {
					var xmlDoc = res.data;
					$scope.hrefAttr;
					var a = angular.element(xmlDoc).find('entry').each(function () {
						$scope.hrefAttr = $(this).find('link').attr('href');
						$scope.titulo = $(this).find('summary');
						$scope.artista = $(this).find('im\\:artist, artist').text();
						$scope.imagen = $(this).find('im\\:image, image')[2].innerHTML;
						$scope.categoria = $(this).find('category').attr('term');

						//construye objeto para mostrar en la vista principal de la busqueda.
						$scope.gather.push({url:$scope.hrefAttr, titulo:$scope.titulo, artista:$scope.artista, imagen:$scope.imagen, categoria:$scope.categoria});
					});
					console.log(angular.toJson($scope.gather), " si agrego todos");
				})	
		}

		$scope.getPodcast = function (url) {
			var urlPassed = url;
			$scope.podcastList = [];
			//url = "https://itunes.apple.com/us/podcast/grammar-girl-quick-dirty-tips/id173429229?mt=2&ign-mpt=uo%3D2";
			podcastService.getAudio(urlPassed).then(function(promise){
				//console.log("promesa ", promise.data);
				var table = promise.data;
				var t = angular.element(table).find('tr.podcast-episode').each(function() {
					$scope.descripcion = $(this).children(".release-date").attr('sort-value');
					$scope.album = $(this).attr('album');
					$scope.tipo = $(this).attr('kind');
					$scope.audio = $(this).attr('audio-preview-url');
					$scope.audioAlbum = $(this).attr('preview-album');
					$scope.audioArtista = $(this).attr('preview-artist');
					$scope.audioTitulo = $(this).attr('preview-title');
					$scope.audioDuracion = $(this).attr('preview-title');
					$scope.podcastList.push({descripcion:$scope.descripcion, album:$scope.audioAlbum, artista:$scope.audioArtista, titulo:$scope.audioTitulo, duracion:$scope.audioDuracion});
				})
				console.log(angular.toJson($scope.podcastList), " si agrego todos los audios");

			})
			
		}
	}])
	.directive('directiveDescargaXml', function () {
		return {  
			restrict:'A',
			link: function (scope, element, attrs) {
				$(element).on('click', function () {
					$lista = $('#list-items');
					$mresponsive = $('#menu-adapt');	
					if($mresponsive.hasClass('menu-transform')){
						$mresponsive.removeClass('menu-transform');
					}else{
						$mresponsive.addClass('menu-transform');
					}

					if($('.text-menu').hasClass('show')) {
						$('.text-menu').removeClass('show').addClass('hide');
					}else{
						setTimeout ( function () {
							$('.text-menu').removeClass('hide').addClass('show');	
						}, 500);
					}
					$lista.slideToggle('slow', function () {
						$('#list-items li').on('click', function () {
							$lista.hide(function () {
								if($mresponsive.hasClass('menu-transform')){
									$mresponsive.removeClass('menu-transform')
								}
							});
						});
					});
				});
			}
		}
	});
