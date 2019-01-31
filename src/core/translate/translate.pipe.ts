import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core'
import { isEqual } from 'lodash'
import { merge, Subscription } from 'rxjs'

import { TranslateService } from './translate.service'

@Pipe({
  name: 'translate',
  // tslint:disable-next-line:pipe-impure
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  value: string
  lastKey: string
  lastParams: any

  onChange: Subscription

  constructor(
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  private dispose() {
    if (this.onChange) {
      this.onChange.unsubscribe()
      this.onChange = null
    }
  }

  updateValue(key: string, params?: any, ignoreNonExist?: boolean) {
    const value = this.translate.get(key, params, ignoreNonExist)
    this.value = value
    this.lastKey = key
    this.cdr.markForCheck()
  }

  transform(key: string, params?: any, ignoreNonExist?: boolean) {
    if (isEqual(key, this.lastKey) && isEqual(params, this.lastParams)) {
      return this.value
    }

    this.lastParams = params
    this.updateValue(key, params, ignoreNonExist)

    this.dispose()

    this.onChange = merge(
      this.translate.locale$,
      this.translate.defaultLocale$,
    ).subscribe(() => {
      if (this.lastKey) {
        this.lastKey = null
        this.updateValue(key, params, ignoreNonExist)
      }
    })

    return this.value
  }

  ngOnDestroy() {
    this.dispose()
  }
}
