import { NgModule } from '@angular/core'

import { SharedModule, TranslateService } from 'shared/shared.module'

import { LoginRoutingModule } from './login.routing.module'

import { LoginComponent } from './login.component'

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  declarations: [LoginComponent],
})
export class LoginModule {
  constructor(private translate: TranslateService) {
    this.translate.addTranslations(require.context('.', false, I18N_REGEX))
  }
}
