import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { EMPTY, from } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { ActionTypes, Login, LoginSuccess } from './actions'

@Injectable()
export class Effects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(ActionTypes.LOGIN),
    mergeMap(({ payload }) =>
      from(
        new Promise((resolve, reject) => {
          setTimeout(() => (Math.random() < 0.5 ? resolve() : reject()), 1000)
        }),
      ).pipe(
        map(() => new LoginSuccess(payload.username)),
        catchError(() => EMPTY),
      ),
    ),
  )

  constructor(private actions$: Actions) {}
}
