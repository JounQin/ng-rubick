import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'rb-at-modal',
  template: `
    {{ msg }}
  `,
})
export class AnotherModalComponent implements OnInit {
  @Input()
  msg?: number

  @Output()
  close = new EventEmitter<boolean>()

  ngOnInit() {
    if (this.msg) {
      return
    }

    this.msg = Math.random()

    setInterval(() => this.reset(), 500)
  }

  reset() {
    this.msg = Math.random()
  }
}
