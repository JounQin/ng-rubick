import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { distinctUntilChanged, filter, map, startWith } from 'rxjs/operators'

import { TranslateService } from 'core/translate/translate.service'

import { NavItem } from 'types'

@Component({
  selector: 'rb-nav-item',
  templateUrl: './nav-item.component.pug',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements OnInit, OnDestroy {
  @Input() item: NavItem

  prefix = '/console/'

  expanded: boolean = null

  active$: Observable<boolean>
  activeSub: Subscription

  constructor(private router: Router, public translate: TranslateService) {}

  ngOnInit() {
    this.active$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.router.url),
      distinctUntilChanged(),
      map(url =>
        new RegExp(`^${this.prefix}${this.item.link || this.item.text}/?`).test(
          url,
        ),
      ),
    )

    this.activeSub = this.active$.subscribe(active => {
      this.expanded = active
    })
  }

  ngOnDestroy() {
    this.activeSub.unsubscribe()
  }
}
