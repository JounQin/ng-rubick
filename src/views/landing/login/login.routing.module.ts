import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { LoginComponent } from './login.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
        data: {
          breadCrumb: 'user_login',
        },
      },
      {
        path: 'account',
        component: LoginComponent,
        pathMatch: 'full',
        data: {
          breadCrumb: 'account_login',
        },
      },
    ]),
  ],
})
export class LoginRoutingModule {}
