import {
  ComponentFactoryResolver,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core'

import { ModalComponent } from './modal.component'

export interface ModalOptions {
  options?: {
    backdrop?: boolean | 'static'
    destroy?: boolean
    title?: string
  }
  inputs?: object
}

@Injectable()
export class ModalService {
  private static viewContainerRef: ViewContainerRef

  static setViewContainerRef(viewContainerRef: ViewContainerRef) {
    ModalService.viewContainerRef = viewContainerRef
  }

  constructor(private cfr: ComponentFactoryResolver) {}

  open(Component: Type<any>, modalOptions: ModalOptions = {}) {
    const { inputs, options } = modalOptions

    const modal = this.cfr.resolveComponentFactory(ModalComponent)
    const componentFactory = this.cfr.resolveComponentFactory(Component)

    const { viewContainerRef } = ModalService

    const modalRef = modal.create(viewContainerRef.parentInjector)
    const modalViewContainerRef = modalRef.instance.viewContainerRef
    const componentRef = componentFactory.create(
      modalViewContainerRef.parentInjector,
    )

    Object.assign(modalRef.instance, {
      ...options,
      componentRef,
    })
    Object.assign(componentRef.instance, inputs)

    viewContainerRef.insert(modalRef.hostView)
    modalViewContainerRef.insert(componentRef.hostView)

    return modalRef
  }
}
