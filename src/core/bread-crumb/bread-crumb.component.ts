import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { BreadCrumb, BreadCrumbService } from './bread-crumb.service'

@Component({
  selector: 'rb-bread-crumb',
  templateUrl: './bread-crumb.component.pug',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent implements OnInit {
  breadCrumbs$: Observable<BreadCrumb[]>

  constructor(private breadCrumb: BreadCrumbService) {}

  ngOnInit() {
    this.breadCrumbs$ = this.breadCrumb.breadCrumbs$
  }
}
