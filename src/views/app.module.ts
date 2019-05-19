import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'

import { CoreModule, TranslateService } from 'core/core.module'
import { MonkeyPatchComponentFactoryResolver } from 'core/services/monkey-patch-component-factory-resolver'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing.module'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private translate: TranslateService,
    private monkeyPatch: MonkeyPatchComponentFactoryResolver,
  ) {
    this.monkeyPatch.patch()
    this.translate.addTranslations(require.context('.', false, I18N_REGEX))
  }
}
