import {
  ApplicationRef,
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  Injector,
  TemplateRef,
  Type,
} from '@angular/core'
import { last } from 'lodash'

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

  open<T = any>(
    Component: Type<T> | TemplateRef<T>,
    modalOptions: ModalOptions = {},
  ) {
    const { inputs, container, ...modalInputs } = modalOptions

    const modal = this.cfr.resolveComponentFactory(ModalComponent)
    const modalRef = modal.create(this.injector)
    const modalInstance = modalRef.instance

    if (Component instanceof TemplateRef) {
      const viewRef: any = modalInstance.viewContainerRef.createEmbeddedView<T>(
        Component,
      )

      modalInstance.close.subscribe((isConfirm: boolean) => {
        const { instance: viewInstance }: any = last(viewRef._view.nodes)
        if (viewInstance && viewInstance.close instanceof EventEmitter) {
          viewInstance.close.emit(isConfirm)
        }
      })
    } else {
      const componentFactory = this.cfr.resolveComponentFactory(Component)

      const modalViewContainerRef = modalInstance.viewContainerRef
      const componentRef = componentFactory.create(
        // tslint:disable-next-line: deprecation
        modalViewContainerRef.parentInjector,
      )

      Object.assign(modalInstance, {
        ...modalInputs,
        componentRef,
      })
      Object.assign(componentRef.instance, inputs)

      modalViewContainerRef.insert(componentRef.hostView)
    }

    this.appRef.attachView(modalRef.hostView)
    this.getContainer(container)!.appendChild(modalRef.location.nativeElement)

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
