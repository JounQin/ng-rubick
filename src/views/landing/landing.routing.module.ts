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
          {
            path: 'register',
            loadChildren: './register/register.module#RegisterModule',
          },
          {
            path: 'forget-password',
            loadChildren:
              './forget-password/forget-password.module#ForgetPasswordModule',
          },
        ],
      },
    ]),
  ],
})
export class LandingRoutingModule {}
