angular.module("podcastApp",["ui.router","main.module","servicesModule"]).run(["$rootScope","$http",function(e,a){e.mensaje="Angular tools",e.prueba="Es una pruueba"}]).config(["$locationProvider","$stateProvider","$urlRouterProvider",function(e,a,t){t.otherwise("/"),a.state("index",{url:"/",views:{"@":{templateUrl:"assets/templates/busqueda.html",controller:"mainController"}}}).state("index.busqueda",{url:"busca",templateUrl:"assets/templates/main.html",controller:"mainController"}).state("index.podcastList",{url:"lista",templateUrl:"assets/templates/podcast.html",controller:"mainController"})}]).controller("mainController",["$scope","$rootScope","$http","podcastService","$q","$sce",function(e,a,t,n,i,o){e.prueba2="Es una prueba y debe de funcionar",e.baseUrl="https://itunes.apple.com/",e.params=new Object,e.pais=[{name:"Argentina",value:"ar"},{name:"Australia",value:"au"},{name:"Canada",value:"ca"},{name:"China",value:"cn"},{name:"Colombia",value:"co"},{name:"Estados Unidos",value:"us"},{name:"España",value:"es"},{name:"Francia",value:"fr"},{name:"Grecia",value:"gr"},{name:"Italia",value:"it"},{name:"Japon",value:"jp"},{name:"Korea",value:"kr"},{name:"Mexico",value:"mx"},{name:"Nicaragua",value:"ni"},{name:"Nueva Zelanda",value:"nz"},{name:"Polonia",value:"pl"},{name:"Portugal",value:"pt"},{name:"Reino Unido",value:"gb"},{name:"Rusia",value:"ru"},{name:"Sudafrica",value:"za"},{name:"Suiza",value:"se"},{name:"Turquia",value:"tr"},{name:"Ucrania",value:"ua"},{name:"Uruguay",value:"uy"},{name:"Venezuela",value:"ve"},{name:"Vietnam",value:"vn"},{name:"Yemen",value:"ye"},{name:"Zimbabwe",value:"zw"}],e.genero=[{name:"Artes",value:"1301"},{name:"Artes",value:"1321"},{name:"Comedia",value:"1303"},{name:"Educación",value:"1304"},{name:"Juegos y Hobbies",value:"1323"},{name:"Gobierno y Organizaciones",value:"1325"},{name:"Salud",value:"1307"},{name:"Niños y Familia",value:"1305"},{name:"Música",value:"1310"},{name:"Noticias y Política",value:"1311"},{name:"Religión",value:"1314"},{name:"Ciencia y Medicina",value:"1315"},{name:"Sociedad y cultura",value:"1324"},{name:"Deportes y Recreación",value:"1316"},{name:"Tecnología",value:"1318"},{name:"TV y Películas",value:"1309"}],e.items=[10,25,50,100],e.obj=new Object,e.getData=function(a){e.gather=[],e.flag=!1,n.getRss(e.baseUrl,a).then(function(a){var t=a.data;e.hrefAttr;angular.element(t).find("entry").each(function(){e.hrefAttr=$(this).find("link").attr("href"),e.titulo=$(this).find("title")[0].innerHTML,e.resumen=$(this).find("summary")[0].innerHTML,e.artista=$(this).find("im\\:artist, artist").text(),e.imagen=$(this).find("im\\:image, image")[2].innerHTML,e.categoria=$(this).find("category").attr("term"),console.log(e.titulo," titulo"),e.gather.push({url:e.hrefAttr,titulo:e.titulo,artista:e.artista,imagen:e.imagen,resumen:e.resumen,categoria:e.categoria}),e.flag=!0});console.log(angular.toJson(e.gather)," si agrego todos")})},e.getPodcast=function(t){var i=t;a.podcastList=[],e.f=!1,n.getAudio(i).then(function(t){var n=t.data;angular.element(n).find("tr.podcast-episode").each(function(){e.descripcion=$(this).find("td.description").attr("sort-value"),e.descripcion=e.descripcion.replace(/[}|{]/g,""),e.album=$(this).attr("album"),e.tipo=$(this).attr("kind"),e.audio=$(this).attr("audio-preview-url"),e.audioAlbum=$(this).attr("preview-album"),e.audioArtista=$(this).attr("preview-artist"),e.audioTitulo=$(this).attr("preview-title"),e.audioDuracion=$(this).attr("preview-title"),e.fecha=$(this).find(".release-date").attr("sort-value"),a.podcastList.push({fecha:e.fecha,tipo:e.tipo,descripcion:e.descripcion,audio:e.audio,album:e.audioAlbum,artista:e.audioArtista,titulo:e.audioTitulo,duracion:e.audioDuracion})});console.log(angular.toJson(e.podcastList)," si agrego todos los audios")})},e.secureAudioUrl=function(e){return o.trustAsResourceUrl(e)},e.rscReady=function(){angular.element(document).find("audio").readyState}}]),angular.module("main.module",[]).controller("appController",function(){}),angular.module("servicesModule",[]).factory("podcastService",["$http","$q",function(e,a){return{getRss:function(a,t){return""===t.genero?e.get("https://itunes.apple.com/"+t.pais+"/rss/toppodcasts/limit="+t.numero+"/explicit="+t.contenido+"/xml"):e.get("https://itunes.apple.com/"+t.pais+"/rss/toppodcasts/limit="+t.numero+"/genre="+t.genero+"/explicit="+t.contenido+"/xml")},getAudio:function(a){var t=e.get(a).success(function(e){return e}).error(function(e){return{status:!1,message:"Recurso no disponible"}});return t}}}]);