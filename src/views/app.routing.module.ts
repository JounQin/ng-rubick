import { APP_BASE_HREF } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: ROUTE_BASE,
    },
  ],
})
export class AppRoutingModule {}
