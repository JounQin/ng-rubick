import { Component, Input } from '@angular/core'

@Component({
  template: `
    <div>
      It is a modal!
      <br />
      <button (click)="reverseMsg()">{{ msg }}</button>
    </div>
  `,
})
export class MyModalComponent {
  @Input()
  msg!: string

  reverseMsg() {
    this.msg = this.msg
      .split('')
      .reverse()
      .join('')
  }
}
