(function(){
  angular.module('testApp', ['ngRoute', 'DataService'])
    .config(configFn)
    .controller('homeController', homeController)
    .controller('detailsController', detailsController);

  function configFn (configProvider, $routeProvider, $locationProvider){
    // console.log(configProvider);
    configProvider.setUrl('http://dev.trellis.tv/-/');

    // $locationProvider.html5Mode(true);

    $routeProvider
      .when('/',{
        template: ' <div ng-repeat="article in homeCtrl.data"><a href="#/article/{{article.id}}">{{article.id}}</a></div>',
        controller: 'homeController',
        controllerAs: 'homeCtrl'
      })
      .when('/article/:id', {
        template: '<div>{{detailsCtrl.article}}</div>',
        controller: 'detailsController',
        controllerAs: 'detailsCtrl'
      });

  }


  function detailsController($route, dataFetcher, dataCaching) {
    var vm = this;

    dataCaching.getMemoryCachedData('articles', $route.current.params.id)
      .then(function(response) {
        console.log(response);
        vm.article = response;
      }, function(reason) {
        console.log(reason);
        dataFetcher.getData('articles/' + $route.current.params.id)
          .then(function(response){
            console.log(response);
            vm.article = response.data;
          }, function(reason){
            console.log(reason);
          });
      });
  }

  function homeController(dataFetcher, dataCaching){

    var vm = this;

    dataCaching.getLocalStorageData('articles')
      .then(function(response) {
        console.log(response)
        vm.data = response;
        dataCaching.setMemoryCache('articles', response, 'id');
      }, function(reason) {
        console.log(reason);
        dataFetcher.getData('articles?limit=5')
          .then(function(response){

            console.log(response);
            vm.data = response.data;

            dataCaching.setLocalStorageData('articles', response.data);
            dataCaching.setMemoryCache('articles', response.data, 'id');
          });
      });
  }
})();
