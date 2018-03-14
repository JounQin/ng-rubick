import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type,
} from '@angular/core'

import { ModalComponent } from './modal.component'

export type ModalContainer = string | Element

export interface ModalOptions {
  backdrop?: boolean | 'static'
  container?: string | Element
  destroy?: boolean
  title?: string
  inputs?: object
}

@Injectable()
export class ModalService {
  constructor(
    private appRef: ApplicationRef,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
  ) {}

  open(Component: Type<any>, modalOptions: ModalOptions = {}) {
    const { inputs, container, ...modalInputs } = modalOptions

    const modal = this.cfr.resolveComponentFactory(ModalComponent)
    const componentFactory = this.cfr.resolveComponentFactory(Component)

    const modalRef = modal.create(this.injector)
    const modalViewContainerRef = modalRef.instance.viewContainerRef
    const componentRef = componentFactory.create(
      modalViewContainerRef.parentInjector,
    )

    Object.assign(modalRef.instance, {
      ...modalInputs,
      componentRef,
    })
    Object.assign(componentRef.instance, inputs)

    this.appRef.attachView(modalRef.hostView)
    this.getContainer(container).appendChild(modalRef.location.nativeElement)
    modalViewContainerRef.insert(componentRef.hostView)

    return modalRef
  }

  private getContainer(container?: ModalContainer) {
    if (!container) {
      return document.body
    }

    if (typeof container === 'string') {
      return document.querySelector(container)
    }

    return container
  }
}
