import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import {
  TranslateModule,
  getTranslations,
  mergeTranslations,
} from 'shared/translate/translate.module'
import { AppRoutingModule } from './app.routing.module'

import { AppComponent } from './app.component'

mergeTranslations(
  getTranslations(
    require.context('.', false, /core.([\w-]*[\w]+)\.i18n\.json$/),
  ),
)

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      locale: 'zh',
      defaultLocale: 'en',
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
