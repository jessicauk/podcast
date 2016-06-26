angular.module('servicesModule',[])
	.factory('podcastService',['$http', function ($http) {
		return {
			getRss : function (url, data) {
				return $http.get("https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1304/explicit=true/xml"); 
				//return $http.get("https://itunes.apple.com/"+data.pais+"/rss/toppodcasts/limit="+data.numero+"/genre="+data.genero+"/explicit="+data.contenido+"/xml"); 
			},
		};
	}])