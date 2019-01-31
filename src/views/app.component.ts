import { Component, OnInit } from '@angular/core'

import { getLang, LANG, LOCALE_COOKIE, setCookie } from 'utils'

import { BreadCrumbService } from 'core/bread-crumb/bread-crumb.service'
import { TranslateService } from 'core/translate/translate.service'

@Component({
  selector: 'rb-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private breadCrumb: BreadCrumbService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.translate.setLocale(getLang())

    this.translate.locale$.subscribe(locale => {
      setCookie(LOCALE_COOKIE, locale, Infinity)
      document.documentElement.setAttribute(LANG, locale)
    })

    this.breadCrumb.breadCrumbs$.subscribe(breadCrumbs => {
      document.title =
        this.translate.get('alauda') +
        ' | ' +
        breadCrumbs
          .map(({ label }) => label)
          .filter(_ => _)
          .join(' - ')
    })
  }
}
