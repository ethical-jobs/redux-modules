import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetching = SelectorFactory.create('auth', 'fetching');

export const error = SelectorFactory.create('auth', 'error');

export const result = SelectorFactory.createResultSelector('auth');

export const results = SelectorFactory.createResultsSelector('auth');

export const users = SelectorFactory.createEntitiesSelector('auth', 'users');

export const organisations = SelectorFactory.createEntitiesSelector('auth', 'organisations');

export const authedUser = SelectorFactory.createIdSelector(users, result);

export const authedOrganisation = createSelector(
  [organisations, authedUser],
  (orgs, user) => orgs.get(user.get('organisation_id', '').toString())
);
