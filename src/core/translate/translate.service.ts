import { Inject, Injectable, InjectionToken } from '@angular/core'
import { Subject } from 'rxjs'

export interface ITranslation {
  [key: string]: string
}

export interface ITranslations {
  [locale: string]: ITranslation
}

export const Translations = new InjectionToken<ITranslations>('TRANSLATIONS')
export const Locale = new InjectionToken<string>('LOCALE')
export const DefaultLocale = new InjectionToken<string>('DEFAULT_LOCALE')
export const Locales = new InjectionToken<string>('LOCALES')

@Injectable()
export class TranslateService {
  locale$ = new Subject<string>()
  defaultLocale$ = new Subject<string>()

  constructor(
    @Inject(Translations) private translations: ITranslations,
    @Inject(Locale) private locale: string,
    @Inject(DefaultLocale) private defaultLocale: string,
    @Inject(Locales) private locales: string[] = [],
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

    let value = getValue(translations[locale], key)

    if (value === undefined) {
      if (defaultLocale && defaultLocale !== locale) {
        value = getValue(translations[defaultLocale], key)
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

    return value === undefined ? key : value
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

  nextLocale() {
    const { locale, locales } = this
    const index = locales.indexOf(locale)
    if (index === -1) {
      throw new Error('`locales` not set correctly')
    }
    this.setLocale(locales[index === locales.length - 1 ? 0 : index + 1])
  }
}
