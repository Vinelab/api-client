/// <reference path="../lib/angular.d.ts" />
module DataService {
  export class DataFetcher {
    url: string;

    static $inject = ['$http', '$q', 'config'];

    constructor(public $http: ng.IHttpService, public $q, config) {
      this.url = config.providerObj.url;
    }

    getData(uri: string, params?: Object): ng.IPromise<any> {
      return this.$q((resolve, reject) => {
            this.$http({
                method: 'GET',
                url: this.url + uri,
                params: params
            }).then((response) => {
                resolve(response.data);
            }, (reason) => {
                reject(reason);
            });
          });
    }

    sendData(uri: string, data: Object): ng.IPromise<any> {

        return this.$q((resolve, reject) => {
            this.$http({
                method: 'POST',
                url: this.url + uri,
                data: data
            }).then((response) => {
                resolve(response.data);
            }, (reason) => {
                reject(reason);
            });
        });
    }

    request(method: string, uri: string, params?: Object, data?: Object): ng.IPromise<any> {

        return this.$q((resolve, reject) => {
            this.$http({
                method: method,
                url: this.url + uri,
                params: params,
                data: data
            }).then((response) => {
                resolve(response.data);
            }, (reason) => {
                reject(reason);
            });
        });

    }
  }
  angular.module('DataService').service('dataFetcher', DataFetcher);
}
