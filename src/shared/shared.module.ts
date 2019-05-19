import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { BreadCrumbModule } from 'core/bread-crumb/bread-crumb.module'
import { ModalModule } from 'core/modal/modal.module'
import {
  TranslateModule,
  TranslateService,
} from 'core/translate/translate.module'

import { DirectivesModule } from './directives/directives.module'
import { PipesModule } from './pipes/pipes.module'
import { ServicesModule } from './services/services.module'

const BuiltInModules = [FormsModule]
const SharedModules = [DirectivesModule, PipesModule, ServicesModule]

@NgModule({
  imports: [
    ...BuiltInModules,
    BreadCrumbModule,
    ModalModule.forChild(),
    TranslateModule,
    ...SharedModules,
  ],
  exports: [
    ...BuiltInModules,
    CommonModule,
    RouterModule,
    BreadCrumbModule,
    ModalModule,
    TranslateModule,
    ...SharedModules,
  ],
})
export class SharedModule {}

export { TranslateService }
