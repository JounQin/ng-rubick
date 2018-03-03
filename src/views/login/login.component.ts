import { Component } from '@angular/core'

import { TranslateService } from 'shared/translate/translate.service'

@Component({
  templateUrl: './login.component.pug',
})
export class LoginComponent {
  constructor(private translate: TranslateService) {}

  toggleLocale() {
    this.translate.setLocale(this.translate.getLocale() === 'en' ? 'zh' : 'en')
  }
}
