module DataService {
	angular.module("DataService", []).service("dataFetcher", DataFetcher).provider('configUrl', Provider);
}
