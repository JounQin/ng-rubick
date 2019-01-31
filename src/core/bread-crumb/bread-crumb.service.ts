import { Injectable } from '@angular/core'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router'
import { snakeCase } from 'lodash'
import { combineLatest, Observable } from 'rxjs'
import { distinctUntilChanged, filter, map, shareReplay } from 'rxjs/operators'

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
    this.breadCrumbs$ = combineLatest(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(() => this.getBreadCrumbs()),
      ),
      this.translate.locale$,
    ).pipe(
      map(([breadCrumbs]) =>
        // do not display first level breadCrumb - landing/console
        breadCrumbs.slice(1).map(({ label, url }) => ({
          label: this.getBreadCrumbLabel(label),
          url,
        })),
      ),
      shareReplay(),
    )
  }

  getBreadCrumbs(
    route: ActivatedRouteSnapshot = this.route.snapshot,
    breadCrumbs: BreadCrumb[] = [],
    prefix = '',
  ): BreadCrumb[] {
    const { firstChild, routeConfig, url } = route

    let path: string
    let breadCrumb: string

    if (routeConfig) {
      path = routeConfig.path
      const data = routeConfig.data
      breadCrumb = data && data.breadCrumb
    }

    if (breadCrumb || path) {
      prefix = [prefix, ...url.map(({ path: p }) => p)].join('/')
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

  private getBreadCrumbLabel(label: string) {
    label = snakeCase(label)
    const navLabel = 'nav_' + label
    const translated = this.translate.get(navLabel, null, true)
    return navLabel === translated ? this.translate.get(label) : translated
  }
}
