import { Component } from '@angular/core'

import { TranslateService } from 'core/translate/translate.service'

@Component({
  templateUrl: './console.component.html',
})
export class ConsoleComponent {
  constructor(private translate: TranslateService) {}

  toggleLocale() {
    this.translate.setLocale(this.translate.getLocale() === 'en' ? 'zh' : 'en')
  }
}
