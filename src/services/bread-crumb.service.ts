import { Injectable } from '@angular/core'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router'
import { Observable } from 'rxjs/Observable'

export interface BreadCrumb {
  label: string
  url: string
}

@Injectable()
export class BreadCrumbService {
  breadCrumbs$: Observable<BreadCrumb[]>

  constructor(private route: ActivatedRoute, private router: Router) {
    this.breadCrumbs$ = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .distinctUntilChanged()
      .map(() => this.getBreadCrumbs())
  }

  getBreadCrumbs(
    route: ActivatedRouteSnapshot = this.route.snapshot,
    breadCrumbs: BreadCrumb[] = [],
    prefix = '/console',
  ): BreadCrumb[] {
    const { firstChild, routeConfig, url } = route

    const path = routeConfig && routeConfig.path

    if (path && path !== 'console') {
      prefix = [prefix].concat(url.map(({ path: p }) => p)).join('/')
      breadCrumbs.push({
        label: path.replace(/\/\:(\w+-?)*\w+/g, ''),
        url: prefix,
      })
    }

    if (firstChild) {
      return this.getBreadCrumbs(firstChild, breadCrumbs, prefix)
    }

    return breadCrumbs
  }
}
