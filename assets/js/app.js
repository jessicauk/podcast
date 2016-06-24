angular.module('podcastApp',['ui.router','main.module'])
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
						templateUrl : 'assets/templates/main.html',
						controller: 'mainController'
					},
					//
					// 'header@index' : {templateUrl: 'assets/templates/header.html',controller: 'mainController'},
					// 'footer@index' : {templateUrl: 'assets/templates/footer.html',controller: ''}
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
	.controller('mainController', ['$scope', '$rootScope', '$http', function ( $scope, $rootScope, $http ) {
		
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
