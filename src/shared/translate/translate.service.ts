import { Inject, Injectable, InjectionToken } from '@angular/core'
import { Subject } from 'rxjs/Subject'

export interface ITranslations {
  [locale: string]: {
    [key: string]: string
  }
}

export const Translations = new InjectionToken<ITranslations>('TRANSLATIONS')
export const Locale = new InjectionToken<string>('LOCALE')
export const DefaultLocale = new InjectionToken<string>('DEFAULT_LOCALE')

@Injectable()
export class TranslateService {
  locale$ = new Subject()
  defaultLocale$ = new Subject()

  constructor(
    @Inject(Translations) private translations: ITranslations,
    @Inject(Locale) private locale: string,
    @Inject(DefaultLocale) private defaultLocale: string,
  ) {}

  private getValue = (input: any, key: string): string => {
    key = key.replace(/\[(\d+)\]/g, '.$1')
    let value = input

    key.split('.').some(k => {
      if (!value || typeof value !== 'object') {
        return true
      }

      value = value[k]
    })

    if (typeof value === 'object') {
      if (process.env.NODE_ENV === 'development' && value !== null) {
        console.warn('you are trying to get non-literal value')
      }
      return value && value.toString()
    }

    return value
  }

  get(key: string, params?: any, ignoreNonExist?: boolean) {
    const { defaultLocale, getValue, locale, translations } = this
    const translation = translations[locale]

    let value = getValue(translation, key)

    if (value === undefined) {
      if (defaultLocale && defaultLocale !== locale) {
        const defaultTranslation = translations[defaultLocale]
        value = getValue(defaultTranslation, key)
      }

      if (
        process.env.NODE_ENV === 'development' &&
        value === undefined &&
        !ignoreNonExist
      ) {
        console.warn(
          `your are trying to get nonexistent key \`${key}\` without default locale fallback`,
        )
      }
    }

    value =
      value &&
      value.replace(/{([^{}]+)}/g, (_matched, $0) =>
        getValue(params, $0.trim()),
      )

    return value == null ? key : value
  }

  getLocale() {
    return this.locale
  }

  setLocale(locale: string) {
    this.locale = locale
    this.locale$.next(locale)
  }

  setDefaultLocale(defaultLocale: string) {
    this.defaultLocale = defaultLocale
    this.defaultLocale$.next(defaultLocale)
  }
}
