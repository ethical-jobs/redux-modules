import { createActionType } from 'ethical-jobs-redux';
import Api from 'ethical-jobs-sdk';

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

export const FETCH_COLLECTION = createActionType('POSTS/FETCH_COLLECTION');
export const FETCH_ENTITY = createActionType('POSTS/FETCH_ENTITY');
export const CLEAR_ENTITIES = createActionType('POSTS/CLEAR_ENTITIES');
export const UPDATE_FILTERS = createActionType('POSTS/UPDATE_FILTERS');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchCollection = params => ({
  type: FETCH_COLLECTION,
  payload: Api.get('/content/posts', params),
});

export const fetchEntity = id => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/content/posts/${id}`),
});

export const fetchBySlug = slug => ({
  type: FETCH_ENTITY,
  payload: Api.get(`/content/posts?slug=${slug}`),
});

/*
|--------------------------------------------------------------------------
| Sync Actions
|--------------------------------------------------------------------------
*/

export const clearPosts = () => ({
  type: CLEAR_ENTITIES,
});

export const updateFilters = filter => ({
  type: UPDATE_FILTERS,
  payload: filter,
});
