/// <reference path="../lib/angular.d.ts" />
module DataService {
  export class DataFetcher {
    url: string;

    static $inject = ['$http', 'config'];

    constructor(private $http: ng.IHttpService, config) {
      this.url = config.providerObj.url;
    }

    getData(uri: string, params?: Object): ng.IPromise<any> {
      return this.$http({
        method: 'GET',
        url: this.url + uri,
        data: params
      });
    }

    sendData(uri: string, params: Object): ng.IPromise<any> {
      return this.$http({
        method: 'POST',
        url: this.url + uri,
        data: params
      });
    }

    request(method: string, uri: string, params?: Object, data?: Object){
      return this.$http({
        method: method,
        url: this.url + uri,
        params: params,
        data: data
      });
    }
  }
  angular.module('DataService').service('dataFetcher', DataFetcher);
}
