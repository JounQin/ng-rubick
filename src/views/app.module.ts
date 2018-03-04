import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { CoreModule, mergeTranslations } from 'core/core.module'
import { AppRoutingModule } from './app.routing.module'

import { AppComponent } from './app.component'

mergeTranslations(require.context('.', false, I18N_REGEX))

@NgModule({
  imports: [BrowserModule, RouterModule, AppRoutingModule, CoreModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
