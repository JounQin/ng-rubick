import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ConsoleComponent } from './console.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ConsoleComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadChildren: '../dashboard/dashboard.module#DashboardModule',
          },
          {
            path: 'image',
            loadChildren: '../image/image.module#ImageModule',
          },
        ],
      },
    ]),
  ],
})
export class ConsoleRoutingModule {}
