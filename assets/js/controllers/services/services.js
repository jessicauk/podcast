angular.module('servicesModule',[])
	.factory('podcastService',['$http','$q', function ($http, $q) {
		return {
			getRss : function (url, data) {
				if(data.genero === ""){
					return $http.get("https://itunes.apple.com/"+data.pais+"/rss/toppodcasts/limit="+data.numero+"/explicit="+data.contenido+"/xml"); 
				} else {
					
					return $http.get("https://itunes.apple.com/"+data.pais+"/rss/toppodcasts/limit="+data.numero+"/genre="+data.genero+"/explicit="+data.contenido+"/xml"); 
				}
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