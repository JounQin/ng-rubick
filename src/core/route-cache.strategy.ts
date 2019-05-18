import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router'
import { isEqual } from 'lodash'

@Injectable()
export class RouteCacheStrategy extends RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>()

  private getRouteUrl(route: ActivatedRouteSnapshot) {
    return route['_routerState'].url
  }

  shouldDetach(route: ActivatedRouteSnapshot) {
    const { data } = route.routeConfig
    return !data || data.keepAlive !== false
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle) {
    this.storedRoutes.set(this.getRouteUrl(route), handle)
  }

  shouldAttach(route: ActivatedRouteSnapshot) {
    return this.storedRoutes.has(this.getRouteUrl(route))
  }

  retrieve(route: ActivatedRouteSnapshot) {
    return this.storedRoutes.get(this.getRouteUrl(route))
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ) {
    return (
      future.routeConfig === curr.routeConfig &&
      isEqual(future.params, curr.params) &&
      isEqual(future.queryParams, curr.queryParams)
    )
  }
}
