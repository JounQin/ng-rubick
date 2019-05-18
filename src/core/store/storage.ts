import { ActionReducer } from '@ngrx/store'
import { merge } from 'lodash'

const INIT_ACTION = '@ngrx/store/init'
const UPDATE_ACTION = '@ngrx/store/update-reducers'

const STORAGE_KEY = '@@NGRX_STORAGE_KEY@@'

function saveStorage(state: any) {
  requestAnimationFrame(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  })
}

export function storage(reducer: ActionReducer<any>): ActionReducer<any> {
  const restored = JSON.parse(localStorage.getItem(STORAGE_KEY))

  // tslint:disable-next-line: only-arrow-functions
  return function(state, action) {
    let nextState
    if (action.type === INIT_ACTION && !state) {
      nextState = reducer(state, action)
    } else {
      nextState = { ...state }
    }

    if (
      (action.type === INIT_ACTION || action.type === UPDATE_ACTION) &&
      restored
    ) {
      nextState = merge(nextState, restored)
    }

    nextState = reducer(nextState, action)

    if (action.type !== INIT_ACTION) {
      saveStorage(nextState)
    }

    return nextState
  }
}
