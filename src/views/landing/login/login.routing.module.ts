import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { LoginComponent } from './login.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        data: {
          breadCrumb: 'user_login',
        },
      },
      {
        path: 'account',
        component: LoginComponent,
        data: {
          breadCrumb: 'account_login',
        },
      },
    ]),
  ],
})
export class LoginRoutingModule {}
