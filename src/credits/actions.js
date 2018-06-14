import { createActionType } from '@ethical-jobs/redux';
import Api from '@ethical-jobs/sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const PURCHASE = createActionType('CREDITS/PURCHASE');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const purchase = params => ({
  type: PURCHASE,
  payload: Api.post('/credits/purchase', params),
});
