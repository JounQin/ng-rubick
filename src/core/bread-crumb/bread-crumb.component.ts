import { Component } from '@angular/core'

import { BreadCrumbService } from './bread-crumb.service'

@Component({
  selector: 'rb-bread-crumb',
  templateUrl: './bread-crumb.component.pug',
  styleUrls: ['./bread-crumb.component.scss'],
})
export class BreadCrumbComponent {
  constructor(public breadCrumb: BreadCrumbService) {}
}
