import { createActionType } from 'ethical-jobs-redux';
import Api from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const PURCHASE = createActionType('PAYMENTS/PURCHASE');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/
export const purchase = params => ({
  type: PURCHASE,
  payload: Api.post('/payments', params),
});