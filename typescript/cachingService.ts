/// <reference path="../lib/angular.d.ts" />
module DataService {
  export class DataCaching {
    dataObject: Object = {};

    static $inject = ['$q'];

    constructor(public $q) {}

    setLocalStorageData(type, content) {
      try {
        localStorage.setItem(type, JSON.stringify(content));
      } catch (e) {}
    }

    getLocalStorageData(type) {

      return this.$q((resolve, reject) => {
        if (localStorage.getItem(type)) {
            resolve(JSON.parse(localStorage.getItem(type)));
          } else {
            reject('no data of the type ' + type + ' in the localstorage');
          }
      });
    }

    setMemoryCache(dataType, data, usedKey) {
      if (!this.dataObject[dataType]) {
        this.dataObject[dataType] = {};
      }

      angular.forEach(data, (value, key) => {
        this.dataObject[dataType][value[usedKey]] = value;
      }, data);

    }

    getMemoryCachedData(dataType, slug) {
      return this.$q((resolve, reject) => {
        if (this.dataObject[dataType] && this.dataObject[dataType][slug]) {
          resolve(this.dataObject[dataType][slug]);
        } else {
          reject('no article available in the cache');
        }
      });
    }
  }

  angular.module('DataService').service('dataCaching', DataCaching);
}
