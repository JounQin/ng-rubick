import { NgModule } from '@angular/core'

import { SharedModule, TranslateService } from 'shared/shared.module'

import { ForgetPasswordComponent } from './forget-password.component'
import { ForgetPasswordRoutingModule } from './forget-password.routing.module'

@NgModule({
  imports: [SharedModule, ForgetPasswordRoutingModule],
  declarations: [ForgetPasswordComponent],
})
export class ForgetPasswordModule {
  constructor(private translate: TranslateService) {
    this.translate.addTranslations(require.context('.', false, I18N_REGEX))
  }
}
