import { Component } from '@angular/core'

@Component({
  templateUrl: './forget-password.component.pug',
})
export class ForgetPasswordComponent {
  verify(e: Event) {
    e.preventDefault()
  }
}
