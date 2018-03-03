import { NgModule } from '@angular/core'

import { SharedModule } from 'shared/shared.module'
import { ImageRoutingModule } from 'views/image/image.routing.module'

import { ImageComponent } from 'views/image/image.component'

@NgModule({
  imports: [SharedModule, ImageRoutingModule],
  declarations: [ImageComponent],
})
export class ImageModule {}
