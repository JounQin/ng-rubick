import { Action } from '@ngrx/store'

export enum ActionTypes {
  LOGIN = '[User] Login',
  LOGIN_SUCCESS = '[User] Login Success',
}

export class Login implements Action {
  readonly type = ActionTypes.LOGIN
  constructor(public payload: { username: string; password: string }) {}
}

export class LoginSuccess {
  readonly type = ActionTypes.LOGIN_SUCCESS
  constructor(public payload: /* username */ string) {}
}

export type ActionsUnion = Login | LoginSuccess
