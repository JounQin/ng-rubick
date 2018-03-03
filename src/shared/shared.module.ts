import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import {
  TranslateModule,
  mergeTranslations,
} from './translate/translate.module'

@NgModule({
  imports: [TranslateModule.forChild()],
  exports: [CommonModule, RouterModule, TranslateModule],
})
export class SharedModule {}

export { mergeTranslations }
