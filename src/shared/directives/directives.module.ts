import { NgModule } from '@angular/core'

import { ButtonDirective } from './button.directive'

const directives = [ButtonDirective]

@NgModule({
  declarations: directives,
  exports: directives,
})
export class DirectivesModule {}
