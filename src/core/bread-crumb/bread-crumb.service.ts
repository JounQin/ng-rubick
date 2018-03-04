import { Injectable } from '@angular/core'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { TranslateService } from 'core/translate/translate.service'

export interface BreadCrumb {
  label: string
  url: string
}

@Injectable()
export class BreadCrumbService {
  breadCrumbs$: Observable<BreadCrumb[]>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) {
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

    let path
    let breadCrumb

    if (routeConfig) {
      path = routeConfig.path
      const data = routeConfig.data
      breadCrumb = data && data.breadCrumb
    }

    if (breadCrumb || (path && path !== 'console')) {
      prefix = [prefix].concat(url.map(({ path: p }) => p)).join('/')
      breadCrumbs.push({
        label: breadCrumb || path.replace(/\/\:(\w+-?)*\w+/g, ''),
        url: prefix,
      })
    }

    if (firstChild) {
      return this.getBreadCrumbs(firstChild, breadCrumbs, prefix)
    }

    return breadCrumbs
  }

  getBreadCrumbLabel(label: string) {
    const navLabel = 'nav_' + label
    const translated = this.translate.get(navLabel, null, true)
    return navLabel === translated ? this.translate.get(label) : translated
  }
}
