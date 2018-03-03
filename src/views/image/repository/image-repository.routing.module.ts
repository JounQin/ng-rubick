import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ImageRepositoryDetailComponent } from './detail/image-repository-detail.component'
import { ImageRepositoryListComponent } from './list/image-repository-list.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ImageRepositoryListComponent,
        pathMatch: 'full',
      },
      {
        path: 'detail/:repositoryName',
        component: ImageRepositoryDetailComponent,
      },
    ]),
  ],
})
export class ImageRepositoryRoutingModule {}
