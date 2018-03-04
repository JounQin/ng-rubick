import { Component, OnInit } from '@angular/core'

import { LANG, LOCALE_COOKIE, getLang, setCookie } from 'utils'

import { BreadCrumbService } from 'core/bread-crumb/bread-crumb.service'
import { TranslateService } from 'core/translate/translate.service'

@Component({
  // tslint:disable-next-line:component-selector
  selector: '#app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private breadCrumb: BreadCrumbService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    const { locale$ } = this.translate

    locale$.subscribe(locale => {
      setCookie(LOCALE_COOKIE, locale, Infinity)
      document.documentElement.setAttribute(LANG, locale)
    })

    this.breadCrumb.breadCrumbs$
      .combineLatest(locale$)
      .subscribe(([breadCrumbs]) => {
        document.title =
          this.translate.get('alauda') +
          ' | ' +
          breadCrumbs
            .map(({ label }) => this.breadCrumb.getBreadCrumbLabel(label))
            .filter(_ => _)
            .join(' - ')
      })

    this.translate.setLocale(getLang())
  }
}
