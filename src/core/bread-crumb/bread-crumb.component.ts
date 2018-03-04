import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { TranslateService } from 'core/translate/translate.service'
import { BreadCrumb, BreadCrumbService } from './bread-crumb.service'

@Component({
  selector: 'rb-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit {
  breadCrumbs$: Observable<BreadCrumb[]>

  constructor(
    private breadCrumb: BreadCrumbService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.breadCrumbs$ = this.breadCrumb.breadCrumbs$
      .startWith(this.breadCrumb.getBreadCrumbs())
      .combineLatest(this.translate.locale$.startWith(null))
      .map(([breadCrumbs]) =>
        breadCrumbs.slice(1).map(breadCrumb => ({
          ...breadCrumb,
          label: this.breadCrumb.getBreadCrumbLabel(breadCrumb.label),
        })),
      )
  }
}
