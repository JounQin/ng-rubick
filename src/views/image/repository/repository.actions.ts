import { Action } from '@ngrx/store'

import { IRepository } from 'shared/services/repository.service'

export enum ActionTypes {
  LOAD_ALL = '[Repository] Load All',
  LOAD_ALL_SUCCESS = '[Repository] Load All Success',
}

export class LoadAll implements Action {
  readonly type = ActionTypes.LOAD_ALL
}

export class LoadAllSuccess implements Action {
  readonly type = ActionTypes.LOAD_ALL_SUCCESS
  constructor(public payload: IRepository[]) {}
}

export type ActionsUnion = LoadAll | LoadAllSuccess
