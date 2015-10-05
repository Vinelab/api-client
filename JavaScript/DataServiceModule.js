var DataService;
(function (DataService) {
    angular.module("DataService", []);
})(DataService || (DataService = {}));

/// <reference path="../lib/angular.d.ts" />
var DataService;
(function (DataService) {
    var DataFetcher = (function () {
        function DataFetcher($http, config) {
            this.$http = $http;
            this.url = config.config.url;
        }
        DataFetcher.prototype.getData = function (uri, params) {
            return this.$http({
                method: "GET",
                url: this.url + uri,
                data: params
            })
                .then(function (response) {
                return response.data;
            });
        };
        DataFetcher.$inject = ['$http', 'config'];
        return DataFetcher;
    })();
    DataService.DataFetcher = DataFetcher;
    angular.module("DataService").service("dataFetcher", DataFetcher);
})(DataService || (DataService = {}));

var DataService;
(function (DataService) {
    var Config = (function () {
        function Config() {
            this.config = {
                url: ""
            };
            this.$get = getFn;
            function getFn() {
                return {
                    config: this.config
                };
            }
        }
        Config.prototype.setUrl = function (url) {
            this.config.url = url;
        };
        return Config;
    })();
    DataService.Config = Config;
    angular.module("DataService").provider('config', Config);
})(DataService || (DataService = {}));
