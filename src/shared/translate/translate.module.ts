import { ModuleWithProviders, NgModule } from '@angular/core'
import { merge } from 'lodash'

import { Context } from 'types'

import { TranslatePipe } from './translate.pipe'
import {
  DefaultLocale,
  ITranslation,
  ITranslations,
  Locale,
  TranslateService,
  Translations,
} from './translate.service'

const translationStore: ITranslations = Object.create(null)

export const getTranslations = (
  context: Context<ITranslation>,
): ITranslations =>
  context.keys().reduce((modules: ITranslations, key: string) => {
    const lang = key.match(I18N_REGEX)[1]
    Object.assign(modules[lang] || (modules[lang] = {}), context(key))
    return modules
  }, {})

export const mergeTranslations = (
  translationsOrContext: ITranslations | Context<ITranslation>,
) =>
  merge(
    translationStore,
    typeof translationsOrContext === 'function'
      ? getTranslations(translationsOrContext)
      : translationsOrContext,
  )

export const translationsFactory = () => translationStore

interface TranslateOptions {
  locale?: string
  defaultLocale?: string
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
          provide: Translations,
          useFactory: translationsFactory,
        },
        {
          provide: Locale,
          useValue: options.locale,
        },
        {
          provide: DefaultLocale,
          useValue: options.defaultLocale,
        },
        TranslateService,
      ],
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
    }
  }
}
