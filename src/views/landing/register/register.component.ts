import { Component } from '@angular/core'

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  register(e: Event) {
    e.preventDefault()
  }
}
