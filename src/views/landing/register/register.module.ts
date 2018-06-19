import { NgModule } from '@angular/core'

import { SharedModule, TranslateService } from 'shared/shared.module'

import { RegisterComponent } from './register.component'
import { RegisterRoutingModule } from './register.routing.module'

@NgModule({
  imports: [SharedModule, RegisterRoutingModule],
  declarations: [RegisterComponent],
})
export class RegisterModule {
  constructor(private translate: TranslateService) {
    this.translate.addTranslations(require.context('.', false, I18N_REGEX))
  }
}
