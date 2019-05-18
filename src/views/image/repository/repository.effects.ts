import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ActionsUnion, ActionTypes, LoadAllSuccess } from './repository.actions'

import { EMPTY } from 'rxjs'
import { RepositoryService } from 'shared/services/repository.service'

@Injectable()
export class Effects {
  @Effect()
  repositories$ = this.actions$.pipe(
    ofType<ActionsUnion>(ActionTypes.LOAD_ALL),
    mergeMap(() =>
      this.repository.getAllRepositories().pipe(catchError(() => EMPTY)),
    ),
    map(repositories => new LoadAllSuccess(repositories)),
  )

  constructor(
    private actions$: Actions,
    private repository: RepositoryService,
  ) {}
}
