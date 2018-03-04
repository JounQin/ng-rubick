import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { RegisterComponent } from './register.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class RegisterRoutingModule {}
