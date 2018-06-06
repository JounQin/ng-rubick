import { NgModule } from '@angular/core'

import { SharedModule, mergeTranslations } from 'shared/shared.module'

import { ConsoleComponent } from './console.component'
import { ConsoleRoutingModule } from './console.routing.module'
import { NavItemComponent } from './nav/nav-item.component'
import { NavListComponent } from './nav/nav-list.component'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [SharedModule, ConsoleRoutingModule],
  declarations: [ConsoleComponent, NavListComponent, NavItemComponent],
})
export class ConsoleModule {}
