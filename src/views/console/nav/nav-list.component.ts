import { Component, Input } from '@angular/core'

import { NavCategory } from 'types'

@Component({
  selector: 'rb-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
})
export class NavListComponent {
  @Input() navConfig: NavCategory[]

  activeItem: string = null
  activeSubItem: string = null
}
