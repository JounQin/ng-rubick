import { NgModule } from '@angular/core'

import { SharedModule, TranslateService } from 'shared/shared.module'

import { LandingComponent } from './landing.component'
import { LandingRoutingModule } from './landing.routing.module'

@NgModule({
  imports: [SharedModule, LandingRoutingModule],
  declarations: [LandingComponent],
})
export class LandingModule {
  constructor(private translate: TranslateService) {
    this.translate.addTranslations(require.context('.', false, I18N_REGEX))
  }
}
