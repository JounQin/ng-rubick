import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './views/app.module'

if (!__DEV__) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)

if (module.hot) {
  module.hot.accept()
}
