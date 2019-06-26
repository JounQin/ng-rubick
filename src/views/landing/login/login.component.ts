import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { State } from 'core/store/reducers'
import { Login } from 'core/store/user/actions'

@Component({
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isAccount!: boolean

  username$ = this.store.pipe(select(state => state.user.username))

  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.isAccount = !!url.length
    })
  }

  login(e: Event) {
    e.preventDefault()
    this.store.dispatch(new Login({ username: 'JounQin', password: '' }))
  }
}
