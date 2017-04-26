import { createActionType } from 'ethical-jobs-redux';
import Api from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const UPDATE = createActionType('USERS/UPDATE');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const update = (id, params) => ({
  type: UPDATE,
  payload: Api.put(`users/${id}`, params),
});
