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
	.controller('mainController', ['$scope', '$rootScope', '$http','podcastService', '$q', '$sce', function ( $scope, $rootScope, $http, podcastService, $q, $sce) {
		$scope.prueba2 = "Es una prueba y debe de funcionar";
		$scope.baseUrl = "https://itunes.apple.com/";
		$scope.params = new Object();

    	$scope.pais = [{name: "Argentina", value:"ar"}, {name: "Australia", value:"au"}, {name: "Belize", value:"bz"}, {name: "Canada", value:"ca"},
    				   {name: "China", value:"cn"}, {name: "Colombia", value:"co"},{name: "Estados Unidos", value:"us"}, {name: "España", value:"es"},
    				   {name: "Francia", value:"fr"}, {name: "Grecia", value:"gr"}, {name: "Italia", value:"it"},{name: "Japon", value:"jp"}, 
    				   {name: "Korea", value:"kr"}, {name: "Mexico", value:"mx"}, {name: "Nicaragua", value:"ni"}, {name: "Nueva Zelanda", value:"nz"},
    				   {name: "Polonia", value:"pl"}, {name: "Portugal", value:"pt"}, {name: "Reino Unido", value:"gb"},{name: "Rusia", value:"ru"}, 
    				   {name: "Sudafrica", value:"za"}, {name: "Suiza", value:"se"},{name: "Turquia", value:"tr"},{name: "Ucrania", value:"ua"}, 
    				   {name: "Uruguay", value:"uy"}, {name: "Venezuela", value:"ve"}, {name: "Vietnam", value:"vn"}, {name: "Yemen", value:"ye"},
    				   {name: "Zimbabwe", value:"zw"}];

    	$scope.genero = [{name: "Todo", value:""},{name: "Artes", value:"1301"}, {name: "Artes", value:"1321"}, {name: "Comedia", value:"1303"}, {name: "Educación", value:"1304"}, {name: "Juegos y Hobbies", value:"1323"},
    					{name: "Gobierno y Organizaciones", value:"1325"}, {name: "Salud", value:"1307"}, {name: "Niños y Familia", value:"1305"}, {name: "Música", value:"1310"},
    					{name: "Noticias y Política", value:"1311"}, {name: "Religión", value:"1314"}, {name: "Ciencia y Medicina", value:"1315"}, {name: "Sociedad y cultura", value:"1324"},
    					{name: "Deportes y Recreación", value:"1316"}, {name: "Tecnología", value:"1318"}, {name: "TV y Películas", value:"1309"}
    			];

    	$scope.items = [10,25,50,100];

   
		//Función que obtiene los datos del formulario, recibe como parametro el objeto
		$scope.obj = new Object();
		$scope.getData = function (data) {
			console.log(data, " es la informacion de data")
			$scope.gather = [];
			console.log(angular.toJson(data));
			podcastService.getRss($scope.baseUrl, data)
				.then(function (res) {
					var xmlDoc = res.data;
					$scope.hrefAttr;
					var a = angular.element(xmlDoc).find('entry').each(function () {
						$scope.hrefAttr = $(this).find('link').attr('href');
						$scope.titulo = $(this).find('title')[0].innerHTML;
						$scope.resumen = $(this).find('summary')[0].innerHTML;
						$scope.artista = $(this).find('im\\:artist, artist').text();
						$scope.imagen = $(this).find('im\\:image, image')[2].innerHTML;
						$scope.categoria = $(this).find('category').attr('term');
						console.log($scope.titulo, " titulo");

						//construye objeto para mostrar en la vista principal de la busqueda.
						$scope.gather.push({url:$scope.hrefAttr, titulo:$scope.titulo, artista:$scope.artista, imagen:$scope.imagen, resumen: $scope.resumen, categoria:$scope.categoria});
					});
					console.log(angular.toJson($scope.gather), " si agrego todos");
				})	
		}

		$scope.getPodcast = function (url) {
			var urlPassed = url;
			$rootScope.podcastList = [];
			//$scope.prueba2=[1];
			//url = "https://itunes.apple.com/us/podcast/grammar-girl-quick-dirty-tips/id173429229?mt=2&ign-mpt=uo%3D2";
			podcastService.getAudio(urlPassed).then(function(promise){
				//console.log("promesa ", promise.data);
				var table = promise.data;
				var t = angular.element(table).find('tr.podcast-episode').each(function() {
					$scope.descripcion = $(this).find("td.description").attr('sort-value');
					$scope.descripcion = $scope.descripcion.replace(/[}|{]/g, "");
					$scope.album = $(this).attr('album');
					$scope.tipo = $(this).attr('kind');
					$scope.audio = $(this).attr('audio-preview-url');
					$scope.audioAlbum = $(this).attr('preview-album');
					$scope.audioArtista = $(this).attr('preview-artist');
					$scope.audioTitulo = $(this).attr('preview-title');
					$scope.audioDuracion = $(this).attr('preview-title');
					$scope.fecha = $(this).find(".release-date").attr('sort-value');

					$rootScope.podcastList.push({fecha:$scope.fecha, descripcion:$scope.descripcion, audio:$scope.audio, album:$scope.audioAlbum, artista:$scope.audioArtista, titulo:$scope.audioTitulo, duracion:$scope.audioDuracion});
				});
				console.log(angular.toJson($scope.podcastList), " si agrego todos los audios");

			})
			
		}

		//Recurso de audio confiable https
		$scope.secureAudioUrl = function (url) {
			return $sce.trustAsResourceUrl(url);
		};

		// $scope.rscReady = function () {
		// 	var r = angular.element(document).find('audio').readyState;
		// 	(r<=2) ? return false : return true
		// 	//console.log(r, "valor de audio");
		// };
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
