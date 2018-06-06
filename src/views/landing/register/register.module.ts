import { NgModule } from '@angular/core'

import { SharedModule, mergeTranslations } from 'shared/shared.module'

import { RegisterComponent } from './register.component'
import { RegisterRoutingModule } from './register.routing.module'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [SharedModule, RegisterRoutingModule],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
