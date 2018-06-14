import { createActionType } from '@ethical-jobs/redux';
import Api from '@ethical-jobs/sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('USERS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('USERS/FETCH_ENTITY');
export const CREATE = createActionType('USERS/CREATE');
export const UPDATE = createActionType('USERS/UPDATE');
export const PATCH = createActionType('USERS/PATCH');
export const ARCHIVE = createActionType('USERS/ARCHIVE');
export const RESTORE = createActionType('USERS/RESTORE');
export const CLEAR_ENTITIES = createActionType('USERS/CLEAR_ENTITIES');
export const UPDATE_FILTERS = createActionType('USERS/UPDATE_FILTERS');
export const REPLACE_FILTERS = createActionType('USERS/REPLACE_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/


export const fetchCollection = params => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/users', params),
});

export const fetchEntity = id => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/users/${id}`),
});

export const create = params => ({
  type: CREATE,
  payload: Api.post('/users', params),
});

export const update = (id, params) => ({
  type: UPDATE,
  payload: Api.put(`/users/${id}`, params),
});

export const patch = (id, params) => ({
  type: PATCH,
  payload: Api.patch(`/users/${id}`, params),
});

export const archive = id => ({
  type: ARCHIVE,
  payload: Api.archive('users', id),
});

export const restore = id => ({
  type: RESTORE,
  payload: Api.restore('users', id),
});


/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

export const clear = () => ({
  type: CLEAR_ENTITIES,
});

export const updateFilters = filters => ({
  type: UPDATE_FILTERS,
  payload: filters,
});

export const replaceFilters = filters => ({
  type: REPLACE_FILTERS,
  payload: filters,
});
