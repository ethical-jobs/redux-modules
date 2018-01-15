import { createActionType } from 'ethical-jobs-redux';
import Api from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('ORGANISATIONS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('ORGANISATIONS/FETCH_ENTITY');
export const CLEAR_ENTITIES = createActionType('ORGANISATIONS/CLEAR_ENTITIES');
export const SEARCH = createActionType('ORGANISATIONS/SEARCH');
export const CREATE = createActionType('ORGANISATIONS/CREATE');
export const UPDATE = createActionType('ORGANISATIONS/UPDATE');
export const PATCH = createActionType('ORGANISATIONS/PATCH');
export const ARCHIVE = createActionType('ORGANISATIONS/ARCHIVE');
export const RESTORE = createActionType('ORGANISATIONS/RESTORE');
export const UPLOAD_LOGO = createActionType('ORGANISATIONS/UPLOAD_LOGO');
export const CREATE_CREDITS = createActionType('ORGANISATIONS/CREATE_CREDITS');
export const DEDUCT_CREDITS = createActionType('ORGANISATIONS/DEDUCT_CREDITS');
export const UPDATE_FILTERS = createActionType('ORGANISATIONS/UPDATE_FILTERS');
export const REPLACE_FILTERS = createActionType('ORGANISATIONS/REPLACE_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchCollection = params => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/organisations', params),
});

export const fetchEntity = id => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/organisations/${id}`),
});

export const searchCollection = params => ({
  type: SEARCH,
  payload: Api.search('organisations', params),
});

export const create = params => ({
  type: CREATE,
  payload: Api.post('/organisations', params),
});

export const update = (id, params) => ({
  type: UPDATE,
  payload: Api.put(`/organisations/${id}`, params),
});

export const patch = (id, params) => ({
  type: PATCH,
  payload: Api.patch(`/organisations/${id}`, params),
});

export const archive = id => ({
  type: ARCHIVE,
  payload: Api.archive('organisations', id),
});

export const restore = id => ({
  type: RESTORE,
  payload: Api.restore('organisations', id),
});

export const uploadLogo = (file, id) => ({
  type: UPLOAD_LOGO,
  payload: Api.media.attach(file, 'organisations', id),
});

export const createCredits = params => ({
  type: CREATE_CREDITS,
  payload: Api.post('/credits', params),
});

export const deductCredits = params => ({
  type: DEDUCT_CREDITS,
  payload: Api.delete('/credits', params),
});

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

export const clear = () => ({
  type: CLEAR_ENTITIES,
});

export const updateFilters = updateFilters => ({
  type: UPDATE_FILTERS,
  payload: updateFilters,
});

export const replaceFilters = updateFilters => ({
  type: REPLACE_FILTERS,
  payload: updateFilters,
});

