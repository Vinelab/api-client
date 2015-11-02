#api-client

#About this Project

This project helps you fetch data from a certain API.

# How it Works

The service is configured by a provider. The provider's URL is configured by creating a function that sets the URL of the provider, once the application starts. 
By calling the service's "GET" function from the controller, you'll able to issue an HTTP request to your desired API.

#Prerequisites
	
	Nodejs, you can get it from http://nodejs.org/.

	Bower, you can get it from http://bower.io/.

#Getting Started

##Inject the module "DataService" in your App module
	module App {
		angular.module("App", ["DataService]);
	}

##Create a config function, on your App module, that sets the URL of the provider
	angular.module("App").config(() => {
		[provider name][Provider].setUrl(url to api);
	});
	
##Inject the service "dataFetcher" in your App controller and call the "getData" method
	angular.module("App").controller("myController", ("dataFetcher") => {
		dataFetcher.getData(specific uri).then(
			(response: any) => {
				//response success code 
			}, 
			(response: any) => {
				//response error code 
			}
		);
	});
