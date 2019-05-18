import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { SharedModule } from 'shared/shared.module'

import { ImageRepositoryDetailComponent } from './detail/image-repository-detail.component'
import { ImageRepositoryRoutingModule } from './image-repository.routing.module'
import { ImageRepositoryListComponent } from './list/image-repository-list.component'
import { Effects } from './repository.effects'
import { reducer } from './repository.reducer'

@NgModule({
  imports: [
    SharedModule,
    ImageRepositoryRoutingModule,
    StoreModule.forFeature('repository', reducer),
    EffectsModule.forFeature([Effects]),
  ],
  declarations: [ImageRepositoryListComponent, ImageRepositoryDetailComponent],
})
export class ImageRepositoryModule {}
