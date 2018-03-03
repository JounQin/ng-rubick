import { Component, OnInit } from '@angular/core'

import { BreadCrumbService } from 'services/bread-crumb.service'
import { TranslateService } from 'shared/translate/translate.service'

@Component({
  selector: '#app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private breadCrumb: BreadCrumbService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.breadCrumb.breadCrumbs$
      .combineLatest(
        this.translate.locale$.startWith(this.translate.getLocale()),
      )
      .subscribe(([breadCrumbs]) => {
        document.title =
          this.translate.get('alauda') +
          ' | ' +
          breadCrumbs
            .map(({ label }) => this.translate.get('nav_' + label))
            .join(' - ')
      })
  }
}
