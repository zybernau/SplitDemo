
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
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: ['+', 'NewEntry'],    name: 'NewEntry',          moduleId: 'NewEntry',     nav: true, title:  "new entry" },
      { route: ['-', 'Report'],    name: 'Report',          moduleId: 'Report',     nav: true, title:  "Report"}
      /*,
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }*/
    ]);

    this.router = router;
  }
  
  activate() {
    // configure the / initiate http client configurations.
    
    this.httpClientConfig.configure();
  }
}
