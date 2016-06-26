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
				.state('index.rss', {
					url: 'about',
					templateUrl: "<p>Hola</p>",
					controller: ''
				})
				.state('index.work', { //
					url: 'work',
					templateUrl: "<p>Que onda</p>",
					controller: ''
				})
	}])
	.controller('mainController', ['$scope', '$rootScope', '$http','podcastService', function ( $scope, $rootScope, $http, podcastService) {
		$scope.prueba2 = "Es una prueba y debe de funcionar";
		$scope.baseUrl = "https://itunes.apple.com/";
		$scope.params = new Object();

		$scope.getData = function (data) {
			console.log(angular.toJson(data));
			podcastService.getRss($scope.baseUrl, data)
				.success(function (res) {
					//var parser = new DOMParser();
					//console.log(angular.toJson(res))
					parser = new DOMParser();
    				xmlDoc = parser.parseFromString(res, "text/xml");
    				var entry = xmlDoc.getElementsByTagName("entry");
    				for(var x in entry){
    					var e = entry[x];
    					var a = e.getElementsByTagName("link");
    					
    					console.log(e, " es del dom");
    					console.log(a, " es del dom aa");
    					// console.log(d, " es del dom dd");
    				}
					
				})
				.error(function (error) {
					console.log(angular.toJson(error))

				})
		}
	}])
	.directive('directiveMenuResponsive', function () {
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
