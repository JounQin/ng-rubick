import { ModuleWithProviders, NgModule } from '@angular/core'

import { TranslatePipe } from './translate.pipe'
import {
  DefaultLocale,
  Locale,
  Locales,
  TranslateService,
} from './translate.service'

interface TranslateOptions {
  locale?: string
  defaultLocale?: string
  locales?: string[]
}

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
})
export class TranslateModule {
  static forRoot(options: TranslateOptions = {}): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [
        {
          provide: Locale,
          useValue: options.locale,
        },
        {
          provide: DefaultLocale,
          useValue: options.defaultLocale,
        },
        {
          provide: Locales,
          useValue: options.locales,
        },
        TranslateService,
      ],
    }
  }
}

export { TranslateService }
