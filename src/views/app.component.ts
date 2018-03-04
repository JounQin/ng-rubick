import { Component, OnInit } from '@angular/core'

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
    this.breadCrumb.breadCrumbs$
      .combineLatest(
        this.translate.locale$.startWith(this.translate.getLocale()),
      )
      .subscribe(([breadCrumbs]) => {
        document.title =
          this.translate.get('alauda') +
          ' | ' +
          breadCrumbs
            .map(({ label }) => this.breadCrumb.getBreadCrumbLabel(label))
            .filter(_ => _)
            .join(' - ')
      })
  }
}
