import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { TranslateModule } from '../translate/translate.module'

import { ModalComponent } from './modal.component'
import { ModalService } from './modal.service'

@NgModule({
  imports: [CommonModule, TranslateModule],
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
