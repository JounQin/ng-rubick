import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { ServicesModule } from 'services/services.module'
import {
  TranslateModule,
  mergeTranslations,
} from 'shared/translate/translate.module'
import { AppRoutingModule } from './app.routing.module'

import { AppComponent } from './app.component'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      locale: 'zh',
      defaultLocale: 'en',
    }),
    ServicesModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
