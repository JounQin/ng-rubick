import { NgModule } from '@angular/core'

import { SharedModule, mergeTranslations } from 'shared/shared.module'

import { LandingComponent } from './landing.component'
import { LandingRoutingModule } from './landing.routing.module'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [SharedModule, LandingRoutingModule],
  declarations: [LandingComponent],
})
export class LandingModule {}
