import { Component } from '@angular/core'

import { TranslateService } from 'core/translate/translate.service'

@Component({
  templateUrl: './landing.component.pug',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(public translate: TranslateService) {}
}
