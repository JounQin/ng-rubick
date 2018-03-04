import { NgModule } from '@angular/core'

import { SharedModule, mergeTranslations } from 'shared/shared.module'
import { RegisterRoutingModule } from './register.routing.module'

import { RegisterComponent } from './register.component'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [SharedModule, RegisterRoutingModule],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
