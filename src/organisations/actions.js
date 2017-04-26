import { createActionType } from 'ethical-jobs-redux';
import Api from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('ORGANISATIONS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('ORGANISATIONS/FETCH_ENTITY');
export const SEARCH = createActionType('ORGANISATIONS/SEARCH');
export const CREATE = createActionType('ORGANISATIONS/CREATE');
export const UPDATE = createActionType('ORGANISATIONS/UPDATE');
export const ARCHIVE = createActionType('ORGANISATIONS/ARCHIVE');
export const CLEAR_ENTITIES = createActionType('ORGANISATIONS/CLEAR_ENTITIES');
export const UPDATE_FILTERS = createActionType('ORGANISATIONS/UPDATE_FILTERS');
export const CREATE_CREDITS = createActionType('ORGANISATIONS/CREATE_CREDITS');
export const DEDUCT_CREDITS = createActionType('ORGANISATIONS/DEDUCT_CREDITS');

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
  payload: Api.get(`/organisation/${id}`),
});

export const search = params => ({
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

export const archive = id => ({
  type: ARCHIVE,
  payload: Api.delete(`/organisations/${id}`),
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

export const clearOrganisations = () => ({
  type: CLEAR_ENTITIES,
});

export const updateFilters = filter => ({
  type: UPDATE_FILTERS,
  payload: filter,
});

