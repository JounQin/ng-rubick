import { createFeatureSelector, createSelector } from '@ngrx/store'

import { IState } from './repository.reducer'

export const selectRepository = createFeatureSelector<IState>('repository')

export const selectRepositories = createSelector(
  selectRepository,
  state => state.repositories,
)
