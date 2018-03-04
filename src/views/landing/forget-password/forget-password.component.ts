import { Component } from '@angular/core'

@Component({
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent {
  verify(e: Event) {
    e.preventDefault()
  }
}
