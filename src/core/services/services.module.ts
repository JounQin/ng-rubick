import { NgModule } from '@angular/core'
import { MonkeyPatchComponentFactoryResolver } from './monkey-patch-component-factory-resolver'

@NgModule({
  providers: [MonkeyPatchComponentFactoryResolver],
})
export class ServicesModule {}
