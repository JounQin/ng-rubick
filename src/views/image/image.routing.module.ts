import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ImageComponent } from 'views/image/image.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ImageComponent,
        children: [
          {
            path: '',
            redirectTo: 'repository',
            pathMatch: 'full',
          },
          {
            path: 'repository',
            loadChildren:
              './repository/image-repository.module#ImageRepositoryModule',
          },
        ],
      },
    ]),
  ],
})
export class ImageRoutingModule {}
