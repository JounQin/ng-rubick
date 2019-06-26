import { Action, createReducer, on } from '@ngrx/store'

import { loginSuccess } from './actions'

export interface State {
  username?: string
}

export const userReducer = createReducer<State>(
  {},
  on(loginSuccess, (state, action) => ({
    ...state,
    username: action.username,
  })),
)

export function reducer(state: State, action: Action) {
  return userReducer(state, action)
}
