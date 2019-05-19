import { ComponentFactoryResolver, NgModule } from '@angular/core'

import { MonkeyPatchComponentFactoryResolver } from 'core/services/monkey-patch-component-factory-resolver'
import { SharedModule } from 'shared/shared.module'

import { DashboardRoutingModule } from './dashboard.routing.module'

import { AnotherModalComponent } from './another-modal.component'
import { DashboardComponent } from './dashboard.component'
import { MyModalComponent } from './my-modal.component'

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [AnotherModalComponent, DashboardComponent, MyModalComponent],
  entryComponents: [MyModalComponent],
})
export class DashboardModule {
  constructor(
    private cfr: ComponentFactoryResolver,
    private monkeyPatch: MonkeyPatchComponentFactoryResolver,
  ) {
    this.monkeyPatch.register(this.cfr)
  }
}
