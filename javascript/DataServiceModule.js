var DataService;
(function (DataService) {
    angular.module("DataService", []);
})(DataService || (DataService = {}));

/// <reference path="../lib/angular.d.ts" />
var DataService;
(function (DataService) {
    var DataCaching = (function () {
        function DataCaching() {
            this.dataObject = {};
        }
        DataCaching.prototype.setLocalStorageData = function (type, content) {
            try {
                localStorage.setItem(type, JSON.stringify(content));
            }
            catch (e) { }
        };
        DataCaching.prototype.getLocalStorageData = function (type) {
            if (localStorage.getItem(type)) {
                return JSON.parse(localStorage.getItem(type));
            }
            else {
                return false;
            }
        };
        DataCaching.prototype.setMemoryCache = function (dataType, data, usedKey) {
            var _this = this;
            if (!this.dataObject[dataType]) {
                this.dataObject[dataType] = {};
            }
            angular.forEach(data, function (value, key) {
                _this.dataObject[dataType][value[usedKey]] = value;
            }, data);
        };
        DataCaching.prototype.getMemoryCachedData = function (dataType, slug) {
            if (this.dataObject[dataType] && this.dataObject[dataType][slug]) {
                return this.dataObject[dataType][slug];
            }
        };
        return DataCaching;
    })();
    DataService.DataCaching = DataCaching;
    angular.module('DataService').service('dataCaching', DataCaching);
})(DataService || (DataService = {}));

var DataService;
(function (DataService) {
    var Config = (function () {
        function Config() {
            this.config = {
                url: ""
            };
            this.$get = this.getFn;
        }
        Config.prototype.getFn = function () {
            return {
                providerObj: this.config
            };
        };
        Config.prototype.setUrl = function (url) {
            this.config.url = url;
        };
        return Config;
    })();
    DataService.Config = Config;
    angular.module("DataService").provider('config', Config);
})(DataService || (DataService = {}));

/// <reference path="../lib/angular.d.ts" />
var DataService;
(function (DataService) {
    var DataFetcher = (function () {
        function DataFetcher($http, config) {
            this.$http = $http;
            this.url = config.providerObj.url;
        }
        DataFetcher.prototype.getData = function (uri, params) {
            return this.$http({
                method: 'GET',
                url: this.url + uri,
                data: params
            }).then(function (response) {
                return response.data;
            }, function (reason) {
                return reason;
            });
        };
        DataFetcher.prototype.sendData = function (uri, params) {
            return this.$http({
                method: 'POST',
                url: this.url + uri,
                data: params
            }).then(function (response) {
                return response.data;
            }, function (reason) {
                return reason;
            });
        };
        DataFetcher.prototype.request = function (method, uri, params, data) {
            return this.$http({
                method: method,
                url: this.url + uri,
                params: params,
                data: data
            }).then(function (response) {
                return response.data;
            }, function (reason) {
                return reason;
            });
        };
        DataFetcher.$inject = ['$http', 'config'];
        return DataFetcher;
    })();
    DataService.DataFetcher = DataFetcher;
    angular.module('DataService').service('dataFetcher', DataFetcher);
})(DataService || (DataService = {}));
