module DataService {
  export class Provider {
    config: any = {
      url: ""
    };

    $get: Function;

    constructor() {
      this.$get = getFn;

      function getFn(): Object {
        return {
          config: this.config
        }
      };
    }

    setUrl(url: string): void {
      this.config.url = url;
    }
  }
}