import { createActionType } from 'ethical-jobs-redux';
import Api from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('INVOICES/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('INVOICES/FETCH_ENTITY');
export const SEARCH = createActionType('INVOICES/SEARCH');
export const CREATE = createActionType('INVOICES/CREATE');
export const UPDATE = createActionType('INVOICES/UPDATE');
export const ARCHIVE = createActionType('INVOICES/ARCHIVE');
export const CLEAR_ENTITIES = createActionType('INVOICES/CLEAR_ENTITIES');
export const UPDATE_FILTERS = createActionType('INVOICES/UPDATE_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchCollection = params => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/invoices', params),
});

export const fetchEntity = id => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/invoices/${id}`),
});

export const search = params => ({
  type: SEARCH,
  payload: Api.search('invoices', params),
});

export const create = params => ({
  type: CREATE,
  payload: Api.post('/invoices', params),
});

export const update = params => ({
  type: UPDATE,
  payload: Api.put('/invoices', params),
});

export const archive = id => ({
  type: ARCHIVE,
  payload: Api.delete(`/invoices/${id}`),
});

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

export const clearInvoices = () => ({
  type: CLEAR_ENTITIES,
});

export const updateFilters = filter => ({
  type: UPDATE_FILTERS,
  payload: filter,
});
