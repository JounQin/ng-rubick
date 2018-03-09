import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { TranslateModule } from 'core/translate/translate.module'

import { BreadCrumbComponent } from './bread-crumb.component'
import { BreadCrumbService } from './bread-crumb.service'

@NgModule({
  imports: [CommonModule, RouterModule, TranslateModule],
  declarations: [BreadCrumbComponent],
  exports: [BreadCrumbComponent],
})
export class BreadCrumbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BreadCrumbModule,
      providers: [BreadCrumbService],
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: BreadCrumbModule,
    }
  }
}
