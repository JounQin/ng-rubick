import { NgModule } from '@angular/core'

import { SharedModule } from 'shared/shared.module'

import { ImageRepositoryDetailComponent } from './detail/image-repository-detail.component'
import { ImageRepositoryRoutingModule } from './image-repository.routing.module'
import { ImageRepositoryListComponent } from './list/image-repository-list.component'

@NgModule({
  imports: [SharedModule, ImageRepositoryRoutingModule],
  declarations: [ImageRepositoryListComponent, ImageRepositoryDetailComponent],
})
export class ImageRepositoryModule {}
