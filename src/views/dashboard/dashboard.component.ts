import { Component } from '@angular/core'

import { ModalService } from 'core/modal/modal.service'

import { MyModalComponent } from './my-modal.component'

@Component({
  templateUrl: './dashboard.component.pug',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private modal: ModalService) {}

  showModal() {
    const modalRef = this.modal.open(MyModalComponent, {
      title: 'Dashboard Modal Header',
      inputs: {
        msg: 'Dashboard Modal!',
      },
    })

    setTimeout(() => {
      modalRef.destroy()
    }, 5000)
  }
}
