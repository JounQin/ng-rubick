import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { EMPTY, from } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { login, loginSuccess } from './actions'

@Injectable()
export class Effects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(login),
    mergeMap(({ username }) =>
      from(
        new Promise((resolve, reject) => {
          setTimeout(() => (Math.random() < 0.5 ? resolve() : reject()), 1000)
        }),
      ).pipe(
        map(() => loginSuccess({ username })),
        catchError(() => EMPTY),
      ),
    ),
  )

  constructor(private actions$: Actions) {}
}
