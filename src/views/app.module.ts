import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { CoreModule, mergeTranslations } from 'core/core.module'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing.module'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
