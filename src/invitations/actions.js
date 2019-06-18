import Api from '@ethical-jobs/sdk';
import { createActionType } from '@ethical-jobs/redux';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const CREATE = createActionType('INVITATIONS/CREATE');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const create = params => ({
  type: CREATE,
  payload: Api.post('/invitations', params),
});
