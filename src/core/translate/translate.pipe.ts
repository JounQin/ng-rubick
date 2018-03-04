import { Pipe, PipeTransform } from '@angular/core'

import { TranslateService } from './translate.service'

@Pipe({
  // tslint:disable-next-line:pipe-naming
  name: 'translate',
  // tslint:disable-next-line:pipe-impure
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(key: string, params?: any) {
    return this.translateService.get(key, params)
  }
}
