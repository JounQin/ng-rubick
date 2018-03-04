import { Component } from '@angular/core'

import { TranslateService } from 'core/translate/translate.service'

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(private translate: TranslateService) {}

  toggleLocale() {
    this.translate.setLocale(this.translate.getLocale() === 'en' ? 'zh' : 'en')
  }
}
