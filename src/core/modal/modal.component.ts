import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

@Component({
  selector: 'rb-modal',
  templateUrl: './modal.component.pug',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input()
  componentRef: ComponentRef<any>

  @Input()
  title: string

  @Output()
  close = new EventEmitter<boolean>()

  @ViewChild('body', {
    read: ViewContainerRef,
  })
  viewContainerRef: ViewContainerRef
}
