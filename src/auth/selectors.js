import { createSelector } from 'reselect';
import Immutable from 'immutable';

export const rootSelector = state => state.getIn(['entities','auth']);

export const fetchingSelector = state => state.getIn(['entities','auth','fetching']);

export const resultsSelector = state => state.getIn([
  'entities','auth','results'
], Immutable.List());

export const resultSelector = state => state.getIn([
  'entities','auth','result'
], false);

export const usersSelector = state => state.getIn([
  'entities','auth','entities','users'
], Immutable.Map());

export const orgsSelector = state => state.getIn([
  'entities','auth','entities','organisations'
], Immutable.Map());

export const authedUserSelector = createSelector(
  [usersSelector, resultSelector],
  (users, result) => users.get(result.toString())
);

export const authedOrganisationSelector = createSelector(
  [orgsSelector, authedUserSelector],
  (orgs, user) => orgs.get(user.get('organisation_id', '').toString())
);
