/// <reference path="../lib/angular.d.ts" />
module DataService {
  export class DataFetcher {
    url: string;

    static $inject = ['$http', 'config'];

    constructor(private $http: ng.IHttpService, config) {
      this.url = config.config.url;
    }

    getData(uri: string, params?: Object): ng.IPromise<DataService.Config> {
      return this.$http({
        method: "GET",
        url: this.url + uri,
        data: params 
      })
      .then((response: any) => {
        return response.data;
      });
    }
  }
  angular.module("DataService").service("dataFetcher", DataFetcher);
}
