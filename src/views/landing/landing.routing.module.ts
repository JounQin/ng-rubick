import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { LandingComponent } from './landing.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LandingComponent,
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
          },
          {
            path: 'login',
            loadChildren: './login/login.module#LoginModule',
          },
        ],
      },
    ]),
  ],
})
export class LandingRoutingModule {}
