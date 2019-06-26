import { Directive, HostBinding, Input, OnInit } from '@angular/core'

@Directive({
  selector: '[rbBtn]',
})
export class ButtonDirective implements OnInit {
  @Input()
  rbBtn?: string
  @Input()
  class?: string

  @HostBinding('class')
  classes!: string

  ngOnInit() {
    this.classes =
      'btn' +
      ' btn-' +
      (this.rbBtn || 'default') +
      (this.class ? ' ' + this.class : '')
  }
}
