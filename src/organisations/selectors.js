import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const rootSelector = (state) => state.getIn(['entities','organisations']);

export const fetchingSelector = (state) => state.getIn(['entities','organisations','fetching']);

export const filtersSelector = (state) => state.getIn([
  'entities','organisations','filters'
], Immutable.Map());

export const resultsSelector = (state) => state.getIn([
  'entities','organisations','results'
], Immutable.List());

export const resultSelector = (state) => state.getIn([
  'entities','organisations','result'
], false);

export const organisationsSelector = (state) => state.getIn([
  'entities','organisations','entities','organisations'
], Immutable.Map());

export const organisationByIdSelector = createSelector(
  [organisationsSelector, resultSelector],
  (organisations, result) => organisations.get(result.toString())
);
