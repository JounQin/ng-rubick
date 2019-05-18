import { ActionsUnion, ActionTypes } from './actions'

export interface State {
  username?: string
}

export function reducer(state: State = {}, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        username: action.payload,
      }
    }
  }
  return state
}
