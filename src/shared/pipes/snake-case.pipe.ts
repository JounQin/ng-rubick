import { Pipe, PipeTransform } from '@angular/core'
import { snakeCase } from 'lodash'

@Pipe({
  name: 'snakeCase',
})
export class SnakeCasePipe implements PipeTransform {
  transform = snakeCase
}
