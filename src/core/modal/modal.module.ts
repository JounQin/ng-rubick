import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { ModalComponent } from './modal.component'
import { ModalService } from './modal.service'

@NgModule({
  imports: [CommonModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
  entryComponents: [ModalComponent],
})
export class ModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [ModalService],
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
    }
  }
}
