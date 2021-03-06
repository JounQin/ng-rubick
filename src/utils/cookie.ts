import { INFINITY_DATE } from './constants'

export const getCookie = (name: string) =>
  decodeURIComponent(
    document.cookie.replace(
      new RegExp(
        '(?:(?:^|.*;)\\s*' +
          encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') +
          '\\s*\\=\\s*([^;]*).*$)|^.*$',
      ),
      '$1',
    ),
  ) || null

interface CookieOptions {
  name: string
  value: string
  end?: number | string | Date
  path?: string
  domain?: string
  secure?: boolean
}

function setCookie(options: CookieOptions): boolean
function setCookie(
  name: string,
  value: string,
  end?: number | string | Date,
  path?: string,
  domain?: string,
  secure?: boolean,
): boolean
function setCookie(
  nameOrOptions: string | CookieOptions,
  value?: string,
  end?: number | string | Date,
  path?: string,
  domain?: string,
  secure?: boolean,
) {
  if (typeof nameOrOptions === 'object') {
    value = nameOrOptions.name
    end = nameOrOptions.end
    path = nameOrOptions.path
    domain = nameOrOptions.domain
    secure = nameOrOptions.secure
    nameOrOptions = nameOrOptions.name
  }
  if (
    !nameOrOptions ||
    /^(?:expires|max\-age|path|domain|secure)$/i.test(nameOrOptions)
  ) {
    return false
  }
  let sExpires = ''
  if (end) {
    switch (end.constructor) {
      case Number:
        sExpires =
          end === Infinity ? `; expires=${INFINITY_DATE}` : '; max-age=' + end
        break
      case String:
        sExpires = '; expires=' + end
        break
      case Date:
        sExpires = '; expires=' + (end as Date).toUTCString()
        break
    }
  }
  document.cookie =
    encodeURIComponent(nameOrOptions) +
    '=' +
    // tslint:disable-next-line: strict-type-predicates
    encodeURIComponent(value == null ? '' : value) +
    sExpires +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '') +
    (secure ? '; secure' : '')
  return true
}

export { setCookie }
