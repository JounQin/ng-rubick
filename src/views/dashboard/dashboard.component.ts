import { Component, TemplateRef, ViewChild } from '@angular/core'

import { ModalService } from 'core/modal/modal.service'

import { AnotherModalComponent } from './another-modal.component'
import { MyModalComponent } from './my-modal.component'

@Component({
  templateUrl: './dashboard.component.pug',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('atModal') atModal: TemplateRef<AnotherModalComponent>

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

  showAnotherModal() {
    this.modal.open(this.atModal)
  }

  closeModal(isConfirm: boolean) {
    if (isConfirm) {
      //
    }
  }
}
