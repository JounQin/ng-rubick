import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { BreadCrumbModule } from 'core/bread-crumb/bread-crumb.module'
import { ModalModule } from 'core/modal/modal.module'
import {
  TranslateModule,
  mergeTranslations,
} from 'core/translate/translate.module'
import { DirectivesModule } from './directives/directives.module'
import { PipesModule } from './pipes/pipes.module'

const SharedModules = [DirectivesModule, PipesModule]

@NgModule({
  imports: [
    BreadCrumbModule.forChild(),
    ModalModule.forRoot(),
    TranslateModule.forChild(),
    ...SharedModules,
  ],
  exports: [
    CommonModule,
    RouterModule,
    BreadCrumbModule,
    ModalModule,
    TranslateModule,
    ...SharedModules,
  ],
})
export class SharedModule {}

export { mergeTranslations }
