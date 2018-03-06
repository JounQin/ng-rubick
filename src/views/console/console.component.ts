import { Component } from '@angular/core'

import NAV_CONFIG from './nav/nav-config'

@Component({
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent {
  active = true
  collapsed = false

  navConfig = NAV_CONFIG
}
