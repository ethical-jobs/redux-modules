import { createActionType } from '@ethical-jobs/redux';
import Api from '@ethical-jobs/sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('JOBS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('JOBS/FETCH_ENTITY');
export const SEARCH = createActionType('JOBS/SEARCH');
export const CREATE = createActionType('JOBS/CREATE');
export const UPDATE = createActionType('JOBS/UPDATE');
export const ARCHIVE = createActionType('JOBS/ARCHIVE');
export const RESTORE = createActionType('JOBS/RESTORE');
export const APPROVE = createActionType('JOBS/APPROVE');
export const EXPIRE = createActionType('JOBS/EXPIRE');
export const ATTACH = createActionType('JOBS/ATTACH');
export const DETACH = createActionType('JOBS/DETACH');
export const LOCK = createActionType('JOBS/LOCK');
export const UNLOCK = createActionType('JOBS/UNLOCK');
export const CLEAR_ENTITIES = createActionType('JOBS/CLEAR_ENTITIES');
export const UPDATE_FILTERS = createActionType('JOBS/UPDATE_FILTERS');
export const REPLACE_FILTERS = createActionType('JOBS/REPLACE_FILTERS');
export const CLEAR_FILTERS = createActionType('JOBS/CLEAR_FILTERS');
export const UPDATE_SYNC_FILTERS = createActionType('JOBS/UPDATE_SYNC_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchCollection = params => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/jobs', params),
});

export const searchCollection = params => ({
  type: SEARCH,
  payload: Api.search('jobs', params),
});

export const fetchEntity = id => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/jobs/${id}`),
});

export const create = params => ({
  type: CREATE,
  payload: Api.post('/jobs', params),
});

export const draft = params => ({
  type: CREATE,
  payload: Api.post('/jobs/drafts', params),
});

export const update = (id, params) => ({
  type: UPDATE,
  payload: Api.put(`/jobs/${id}`, params),
});

export const archive = id => ({
  type: ARCHIVE,
  payload: Api.archive('jobs', id),
});

export const restore = id => ({
  type: RESTORE,
  payload: Api.restore('jobs', id),
});

export const approve = id => ({
  type: APPROVE,
  payload: Api.jobs.approve(id),
});

export const expire = id => ({
  type: EXPIRE,
  payload: Api.jobs.expire(id),
});

export const attachMedia = (id, file) => ({
  type: ATTACH,
  payload: Api.media.attach(file, 'jobs', id),
});

export const detachMedia = (id) => ({
  type: DETACH,
  payload: Api.media.detach(id, 'jobs'),
});

export const lock = (params) => ({
  type: LOCK,
  payload: Api.post('/jobs/users', params),
});

export const unlock = (params) => ({
  type: UNLOCK,
  payload: Api.delete('/jobs/users', params),
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

export const clearFilters = filters => ({
  type: CLEAR_FILTERS,
  payload: filters,
});

export const updateSyncFilters = filters => ({
  type: UPDATE_SYNC_FILTERS,
  payload: filters,
});
