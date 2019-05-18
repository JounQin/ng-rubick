import { IRepository } from 'shared/services/repository.service'
import { ActionsUnion, ActionTypes } from './repository.actions'

export interface IState {
  repositories?: IRepository[]
}

export interface IRepositoryState {
  repository: IState
}

export function reducer(state: IState = {}, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.LOAD_ALL_SUCCESS: {
      return {
        ...state,
        repositories: action.payload,
      }
    }
  }
  return state
}
