angular.module('servicesModule',[])
	.factory('podcastService',['$http','$q', function ($http, $q) {
		return {
			getRss : function (url, data) {
				//return $http.get("https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1304/explicit=true/xml"); 
				return $http.get("https://itunes.apple.com/"+data.pais+"/rss/toppodcasts/limit="+data.numero+"/genre="+data.genero+"/explicit="+data.contenido+"/xml"); 
			},
			getAudio : function (url) {
				var promise =  $http.get(url)
					.success(function (data){
						return data;
					})
					.error(function (error) {
						return {"status": false, "message": "Recurso no disponible"};
					})
				return promise;
			}
		};
	}])