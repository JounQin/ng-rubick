import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Type,
} from '@angular/core'

@Injectable()
export class MonkeyPatchComponentFactoryResolver
  implements ComponentFactoryResolver {
  private rcf!: <T>(component: Type<T>) => ComponentFactory<T>

  private resolvers = new Set<ComponentFactoryResolver>()

  private calling!: boolean

  constructor(private rootCfr: ComponentFactoryResolver) {}

  patch() {
    this.rcf = this.rootCfr.resolveComponentFactory.bind(this.rootCfr)
    this.rootCfr.resolveComponentFactory = this.resolveComponentFactory.bind(
      this,
    )
  }

  register(cfr: ComponentFactoryResolver) {
    this.resolvers.add(cfr)
  }

  unregister(cfr: ComponentFactoryResolver) {
    this.resolvers.delete(cfr)
  }

  resolveComponentFactory<T>(Component: Type<T>): ComponentFactory<T> {
    if (this.calling) {
      return null!
    }

    this.calling = true

    for (const resolver of Array.from(this.resolvers)) {
      try {
        const factory = resolver.resolveComponentFactory(Component)
        if (factory) {
          this.calling = false
          return factory
        }
      } catch {}
    }

    try {
      return this.rcf(Component)
    } finally {
      this.calling = false
    }
  }
}
