import { NgModule } from '@angular/core'

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
export class DashboardModule {}
