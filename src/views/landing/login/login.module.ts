import { NgModule } from '@angular/core'

import { SharedModule, mergeTranslations } from 'shared/shared.module'

import { LoginRoutingModule } from './login.routing.module'

import { LoginComponent } from './login.component'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
