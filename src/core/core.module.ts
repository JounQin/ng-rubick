import { NgModule } from '@angular/core'
import { ServicesModule } from 'core/services/services.module'

import { Locale } from 'utils'

import { BreadCrumbModule } from './bread-crumb/bread-crumb.module'
import {
  TranslateModule,
  mergeTranslations,
} from './translate/translate.module'

@NgModule({
  imports: [
    BreadCrumbModule.forRoot(),
    TranslateModule.forRoot({
      defaultLocale: Locale.EN,
    }),
    ServicesModule,
  ],
  exports: [BreadCrumbModule, TranslateModule],
})
export class CoreModule {}

export { BreadCrumbModule, TranslateModule, mergeTranslations }
