import { NgModule } from '@angular/core'

import { SharedModule, mergeTranslations } from 'shared/shared.module'
import { LandingRoutingModule } from './landing.routing.module'

import { LandingComponent } from './landing.component'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [SharedModule, LandingRoutingModule],
  declarations: [LandingComponent],
})
export class LandingModule {}
