import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const rootSelector = state => state.getIn(['entities','posts']);

export const fetchingSelector = state => state.getIn(['entities','posts','fetching']);

export const errorSelector = state => state.getIn(['entities','posts','error']);

export const filtersSelector = state => state.getIn(['entities','posts','filters']);

export const resultSelector = state => state.getIn(['entities','posts','result']);

export const postsSelector = state => state.getIn(['entities','posts','entities','posts'], Immutable.Map());

export const postByIdSelector = createSelector(
  [postsSelector, resultSelector],
  (posts, result) => posts.get(result.toString())
);

