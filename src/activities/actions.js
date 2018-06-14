import { createActionType } from '@ethical-jobs/redux';
import Api from '@ethical-jobs/sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/
export const FETCH_COLLECTION = createActionType('ACTIVITIES/FETCH_COLLECTION');
export const CLEAR_ENTITIES = createActionType('ACTIVITIES/CLEAR_ENTITIES');
export const UPDATE_FILTERS = createActionType('ACTIVITIES/UPDATE_FILTERS');
/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchCollection = params => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/activities', params),
});

export const clear = () => ({
  type: CLEAR_ENTITIES,
})

export const updateFilters = updateFilters => ({
  type: UPDATE_FILTERS,
  payload: updateFilters,
});;