import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { LoadAll } from '../repository.actions'
import { IRepositoryState } from '../repository.reducer'
import { selectRepositories } from '../repository.selector'

@Component({
  templateUrl: './image-repository-list.component.pug',
  styleUrls: ['./image-repository-list.component.scss'],
})
export class ImageRepositoryListComponent implements OnInit {
  repositories$ = this.store$.select(selectRepositories)

  constructor(private store$: Store<IRepositoryState>) {}

  ngOnInit() {
    this.store$.dispatch(new LoadAll())
  }
}
