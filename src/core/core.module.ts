import { NgModule } from '@angular/core'

import { ServicesModule } from './services/services.module'

import { Locale } from 'utils'

import { BreadCrumbModule } from './bread-crumb/bread-crumb.module'
import { ModalModule } from './modal/modal.module'
import {
  TranslateModule,
  mergeTranslations,
} from './translate/translate.module'

@NgModule({
  imports: [
    BreadCrumbModule.forRoot(),
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      defaultLocale: Locale.EN,
      locales: [Locale.EN, Locale.ZH],
    }),
    ServicesModule,
  ],
  exports: [BreadCrumbModule, ModalModule, TranslateModule],
})
export class CoreModule {}

export { mergeTranslations }
