import { NgModule } from '@angular/core'

import { SharedModule, mergeTranslations } from 'shared/shared.module'
import { ForgetPasswordRoutingModule } from './forget-password.routing.module'

import { ForgetPasswordComponent } from './forget-password.component'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [SharedModule, ForgetPasswordRoutingModule],
  declarations: [ForgetPasswordComponent],
})
export class ForgetPasswordModule {}
