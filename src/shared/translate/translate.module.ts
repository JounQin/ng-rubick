import { ModuleWithProviders, NgModule } from '@angular/core'
import { intersection, merge } from 'lodash'

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

const LOCALE_KEYS: { [key: string]: string[] } = {}

const translationStore: ITranslations = {}

export const getTranslations = (
  context: Context<ITranslation>,
): ITranslations =>
  context.keys().reduce((modules: ITranslations, key: string) => {
    const module = context(key)
    const lang = key.match(I18N_REGEX)[1]
    const matched = modules[lang] || (modules[lang] = {})

    if (__DEV__) {
      const keys = LOCALE_KEYS[lang] || (LOCALE_KEYS[lang] = [])
      const moduleKeys = Object.keys(module)

      const duplicates = intersection(keys, moduleKeys)

      if (duplicates.length) {
        // tslint:disable-next-line no-console
        console.warn('detect duplicate keys:', duplicates)
      }

      keys.push(...moduleKeys)
    }

    Object.assign(matched, module)

    return modules
  }, {})

export const mergeTranslations = (
  translationsOrContext: ITranslations | Context,
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
