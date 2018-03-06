import { NgModule } from '@angular/core'

import { SnakeCasePipe } from './snake-case.pipe'

const pipes = [SnakeCasePipe]

@NgModule({
  declarations: pipes,
  exports: pipes,
})
export class PipesModule {}
