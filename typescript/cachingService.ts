/// <reference path="../lib/angular.d.ts" />
module DataService {
  export class DataCaching {
    dataObject: Object = {};

    constructor() {}

    setLocalStorageData(type, content) {
      try {
        localStorage.setItem(type, JSON.stringify(content));
      } catch (e) {}
    }

    getLocalStorageData(type) {
      if (localStorage.getItem(type)) {
        return JSON.parse(localStorage.getItem(type));
      } else {
        return false;
      }
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
      if (this.dataObject[dataType] && this.dataObject[dataType][slug]) {
        return this.dataObject[dataType][slug];
      }
    }
  }

  angular.module('DataService').service('dataCaching', DataCaching);
}
