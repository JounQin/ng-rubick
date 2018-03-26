import { Component } from '@angular/core'

@Component({
  templateUrl: './register.component.pug',
})
export class RegisterComponent {
  register(e: Event) {
    e.preventDefault()
  }
}
