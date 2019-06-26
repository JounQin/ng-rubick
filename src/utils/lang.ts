import { Locale, LOCALE_COOKIE, LOCALES } from './constants'
import { getCookie } from './cookie'

export const getBrowserLang = (): string => {
  const { navigator } = window

  let browserLang: string = navigator.languages && navigator.languages[0]

  browserLang =
    browserLang ||
    navigator.language ||
    (navigator as any).browserLanguage ||
    (navigator as any).userLanguage

  if (browserLang.indexOf('-') !== -1) {
    browserLang = browserLang.split('-')[0]
  }

  if (browserLang.indexOf('_') !== -1) {
    browserLang = browserLang.split('_')[0]
  }

  return browserLang
}

export const getLang = (): string | undefined => {
  if (
    // tslint:disable-next-line: strict-type-predicates
    typeof window === 'undefined' ||
    // tslint:disable-next-line: strict-type-predicates
    typeof window.navigator === 'undefined'
  ) {
    return undefined
  }

  const lang = (getCookie(LOCALE_COOKIE) || getBrowserLang()) as Locale

  return LOCALES.includes(lang) ? lang : LOCALES[0]
}
