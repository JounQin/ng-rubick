import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import {
  TranslateModule,
  mergeTranslations,
} from './translate/translate.module'

@NgModule({
  imports: [TranslateModule.forChild()],
  exports: [CommonModule, TranslateModule],
})
export class SharedModule {}

export { mergeTranslations }
