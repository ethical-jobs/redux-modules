import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const rootSelector = state => state.getIn(['entities','posts']);

export const fetchingSelector = state => state.getIn(['entities','posts','fetching']);

export const errorSelector = state => state.getIn(['entities','posts','error']);

export const filtersSelector = state => state.getIn([
  'entities','posts','filters'
], Immutable.Map());

export const resultsSelector = state => state.getIn([
  'entities','posts','results'
], Immutable.List());

export const resultSelector = state => state.getIn([
  'entities','posts','result'
], false);

export const postsSelector = state => state.getIn([
  'entities','posts','entities','posts'
], Immutable.Map());

export const orderedPostsSelector = createSelector(
  [postsSelector, resultsSelector],
  (posts, results) => results.map(id => posts.get(id.toString()))
);

export const postByIdSelector = createSelector(
  [postsSelector, resultSelector],
  (posts, result) => posts.get(result.toString())
);

