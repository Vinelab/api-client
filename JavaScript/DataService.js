/// <reference path="../lib/angular.d.ts" />
var DataService;
(function (DataService) {
    var DataFetcher = (function () {
        function DataFetcher($http, configUrl) {
            this.$http = $http;
            this.url = configUrl.config.url;
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
        DataFetcher.$inject = ['$http', 'configUrl'];
        return DataFetcher;
    })();
    DataService.DataFetcher = DataFetcher;
})(DataService || (DataService = {}));

var DataService;
(function (DataService) {
    var Provider = (function () {
        function Provider() {
            this.config = {
                url: ""
            };
            this.$get = getFn;
            function getFn() {
                return {
                    config: this.config
                };
            }
            ;
        }
        Provider.prototype.setUrl = function (url) {
            this.config.url = url;
        };
        return Provider;
    })();
    DataService.Provider = Provider;
})(DataService || (DataService = {}));

var DataService;
(function (DataService) {
    angular.module("DataService", []).service("dataFetcher", DataService.DataFetcher).provider('configUrl', DataService.Provider);
})(DataService || (DataService = {}));
