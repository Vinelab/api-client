module DataService {
  export class Config {
    config: any = {
      url: ""
    };

    $get: Function;

    constructor() {
      this.$get = getFn;

      function getFn(): Object {
        return {
          providerObj: this.config
        }
      }
    }

    setUrl(url: string): void {
      this.config.url = url;
    }
  }
  angular.module("DataService").provider('config', Config);
}