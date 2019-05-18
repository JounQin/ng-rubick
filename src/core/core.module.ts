import { NgModule } from '@angular/core'
import { RouteReuseStrategy } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { Locale } from 'utils'

import { BreadCrumbModule } from './bread-crumb/bread-crumb.module'
import { ModalModule } from './modal/modal.module'
import { ServicesModule } from './services/services.module'
import { Effects } from './store/effects'
import { reducers } from './store/reducers'
import { storage } from './store/storage'
import { TranslateModule, TranslateService } from './translate/translate.module'

import { RouteCacheStrategy } from './route-cache.strategy'

@NgModule({
  imports: [
    BreadCrumbModule.forRoot(),
    EffectsModule.forRoot(Effects),
    ModalModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers: [storage],
    }),
    StoreDevtoolsModule.instrument({
      logOnly: process.env.NODE_ENV === 'production',
    }),
    TranslateModule.forRoot({
      defaultLocale: Locale.EN,
      locales: [Locale.EN, Locale.ZH],
    }),
    ServicesModule,
  ],
  exports: [BreadCrumbModule, ModalModule, TranslateModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteCacheStrategy,
    },
  ],
})
export class CoreModule {}

export { TranslateService }
