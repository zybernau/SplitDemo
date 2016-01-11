
import {inject} from 'aurelia-framework';
import HttpClientConfig from 'paulvanbladel/aurelia-auth/app.httpClient.config';

// Using Aurelia's dependency injection, we inject Aurelia's router,
// the aurelia-auth http client config, and our own router config
// with the @inject decorator.
@inject(HttpClientConfig)

export class App {
  
  constructor(httpClientConfig) {
    this.httpClientConfig = httpClientConfig;
  }
  
  configureRouter(config, router) {
    config.title = 'Split EASE';
    config.map([
      { route: [''],    name: 'NewEntry',          moduleId: 'NewEntry',     nav: true, title:  "new entry" },
      { route: ['-', 'Report'],    name: 'Report',          moduleId: 'Report',     nav: true, title:  "Report"},
      { route: ['returnPage', 'rp'], moduleId: "NewEntry",  name: 'redirectNew',nav: true }
    ]);
    config.options.pushState = true;

    this.router = router;
  }
  
  activate() {
    // configure the / initiate http client configurations.
    
    this.httpClientConfig.configure();
  }
}
