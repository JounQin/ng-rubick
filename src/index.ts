import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './views/app.module'

if (!__DEV__) {
  enableProdMode()
} else {
  Error['stackTraceLimit'] = Infinity
  // tslint:disable-next-line:no-var-requires
  require('zone.js/dist/long-stack-trace-zone')
}

platformBrowserDynamic().bootstrapModule(AppModule)

if (module.hot) {
  module.hot.accept()
}
