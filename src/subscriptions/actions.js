import { createActionType } from '@ethical-jobs/redux';
import Api from '@ethical-jobs/sdk';

/**
 * API prefix for the subscriptions API
 *
 * @type {string}
 */
const prefix = '/alerts';
/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const CREATE = createActionType('SUBSCRIPTIONS/CREATE');
export const FETCH_COLLECTION = createActionType('SUBSCRIPTIONS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('SUBSCRIPTIONS/FETCH_ENTITY');
export const DELETE = createActionType('SUBSCRIPTIONS/DELETE');
export const CONFIRM = createActionType('SUBSCRIPTIONS/CONFIRM');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/
export const create = params => ({
  type: CREATE,
  payload: Api.post(prefix+'/subscriptions', params),
});

export const fetchCollection = params => ({
  type: FETCH_COLLECTION,
  payload: Api.get(prefix+'/subscriptions', params),
});

export const fetchEntity = id => ({
  type: FETCH_ENTITY,
  payload: Api.get(prefix+`/subscriptions/${id}`),
});

export const destroy = id => ({
  type: DELETE,
  payload: Api.delete(prefix+`/subscriptions/${id}`),
});

export const confirm = (id, params) => ({
  type: CONFIRM,
  payload: Api.put(prefix+`/subscriptions/${id}`, params),
});