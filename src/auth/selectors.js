import { createSelector } from 'reselect';
import Immutable from 'immutable';

export const rootSelector = state => state.getIn(['entities','auth']);

export const fetchingSelector = state => state.getIn(['entities','auth','fetching']);

export const resultSelector = state => state.getIn(['entities','auth','result']);

export const usersSelector = state => state.getIn(['entities','auth','entities','users'], Immutable.Map());

export const orgsSelector = state => state.getIn(['entities','auth','entities','organisations'], Immutable.Map());

export const authedUserSelector = createSelector(
  [usersSelector, resultSelector],
  (users, result) => users.get(result.toString())
);

export const authedOrganisationSelector = createSelector(
  [orgsSelector, authedUserSelector],
  (orgs, user) => orgs.get(user.get('organisation_id', '').toString())
);
