import { reducer as userReducer, State as UserState } from './user/reducers'

export const reducers = {
  user: userReducer,
}

export interface State {
  user: UserState
}
