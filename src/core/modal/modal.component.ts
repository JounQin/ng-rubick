import {
  Component,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

@Component({
  selector: 'rb-modal',
  templateUrl: './modal.component.pug',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() componentRef: ComponentRef<any>
  @Input() title: string

  @ViewChild('body', {
    read: ViewContainerRef,
  })
  viewContainerRef: ViewContainerRef
}
