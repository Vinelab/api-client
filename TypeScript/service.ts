/// <reference path="../lib/angular.d.ts" />
module DataService {
  export class DataFetcher {
    url: string;

    static $inject = ['$http', 'configUrl'];

    constructor(private $http: ng.IHttpService, configUrl) {
      this.url = configUrl.config.url;
    }

    getData(uri: string, params?: Object): ng.IPromise<Provider> {
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
}
