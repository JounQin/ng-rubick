import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import {
  BreadCrumbModule,
  TranslateModule,
  mergeTranslations,
} from 'core/core.module'
import { DirectivesModule } from './directives/directives.module'
import { PipesModule } from './pipes/pipes.module'

const SharedModules = [DirectivesModule, PipesModule]

@NgModule({
  imports: [
    BreadCrumbModule.forChild(),
    TranslateModule.forChild(),
    ...SharedModules,
  ],
  exports: [
    CommonModule,
    RouterModule,
    BreadCrumbModule,
    TranslateModule,
    ...SharedModules,
  ],
})
export class SharedModule {}

export { mergeTranslations }
