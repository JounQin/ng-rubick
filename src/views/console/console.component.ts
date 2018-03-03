import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { BreadCrumb, BreadCrumbService } from 'services/bread-crumb.service'
import { TranslateService } from 'shared/translate/translate.service'

@Component({
  templateUrl: './console.component.pug',
})
export class ConsoleComponent implements OnInit {
  breadCrumbs$: Observable<BreadCrumb[]>

  constructor(
    private breadCrumb: BreadCrumbService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.breadCrumbs$ = this.breadCrumb.breadCrumbs$.startWith(
      this.breadCrumb.getBreadCrumbs(),
    )
  }

  toggleLocale() {
    this.translate.setLocale(this.translate.getLocale() === 'en' ? 'zh' : 'en')
  }
}
