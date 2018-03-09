import {
  Component,
  ComponentRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

@Component({
  selector: 'rb-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() componentRef: ComponentRef<any>

  @ViewChild('body', {
    read: ViewContainerRef,
  })
  viewContainerRef: ViewContainerRef
}
