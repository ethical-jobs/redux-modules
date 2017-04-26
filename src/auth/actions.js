import { createActionType } from 'ethical-jobs-redux';
import Api from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const LOGIN = createActionType('AUTH/LOGIN');
export const LOGOUT = createActionType('AUTH/LOGOUT');
export const LOAD = createActionType('AUTH/LOAD');
export const RECOVER = createActionType('AUTH/RECOVER');
export const RESET = createActionType('AUTH/RESET');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const login = (params) => ({
  type: LOGIN,
  payload: Api.auth.login(params),
});

export const logout = () => ({
  type: LOGOUT,
  payload: Api.auth.logout(),
});

export const load = () => ({
  type: LOAD,
  payload: Api.auth.load(),
});

export const recover = (params) => ({
  type: RECOVER,
  payload: Api.auth.recoverPassword(params),
});

export const reset = (params) => ({
  type: RESET,
  payload: Api.auth.resetPassword(params),
});
