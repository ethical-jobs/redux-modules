import { createActionType } from 'ethical-jobs-redux';
import Api from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_APP_DATA = createActionType('APP/FETCH_DATA');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchAppData = () => ({
  type: FETCH_APP_DATA,
  payload: Api.get('/'),
});
