import { APP_BASE_HREF } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

// tslint:disable-next-line: no-console
console.log(HASH_MODE)

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: '/console/dashboard',
          pathMatch: 'full',
        },
        {
          path: 'console',
          loadChildren: './console/console.module#ConsoleModule',
        },
        {
          path: 'landing',
          loadChildren: './landing/landing.module#LandingModule',
        },
      ],
      {
        useHash: HASH_MODE,
        // useHash: true,
      },
    ),
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
