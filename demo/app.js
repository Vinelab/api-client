(function(){
  angular.module('testApp', ['DataService'])
    .config(configFn)
    .controller('testController', testController);


  function configFn (configProvider){
    console.log(configProvider);
    configProvider.setUrl('http://52.30.108.12/');
  }

  function testController(dataFetcher){
    dataFetcher.getData('articles')
      .then(function(response){
        console.log(response);
      });

    var data = {
      cover: undefined,
      title: 'this is a title',
      slug: 'and this is the slug',
      is_promoted: false,
      is_trending: false,
      content: undefined
    };

    dataFetcher.sendData('articles', data)
      .then(function(response){
        console.log(response);
      }, function(reason){
        console.log(reason);
      });

  }
})();
