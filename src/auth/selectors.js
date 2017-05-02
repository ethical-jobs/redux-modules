import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetchingSelector = SelectorFactory.create('auth', 'fetching');

export const errorSelector = SelectorFactory.create('auth', 'error');

export const resultSelector = SelectorFactory.createResultSelector('auth');

export const resultsSelector = SelectorFactory.createResultsSelector('auth');

export const usersSelector = SelectorFactory.createEntitiesSelector('auth');

export const orgsSelector = SelectorFactory.createEntitiesSelector('auth', 'organisations');

export const authedUserSelector = SelectorFactory.createIdSelector(usersSelector, resultSelector);

export const authedOrgSelector = createSelector(
  [orgsSelector, authedUserSelector],
  (orgs, user) => orgs.get(user.get('organisation_id', '').toString())
);
