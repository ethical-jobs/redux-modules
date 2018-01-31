import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetching = SelectorFactory.create('users', 'fetching');

export const error = SelectorFactory.create('users', 'error');

export const filters = SelectorFactory.createFiltersSelector('users');

export const result = SelectorFactory.createResultSelector('users');

export const results = SelectorFactory.createResultsSelector('users');

export const users = SelectorFactory.createEntitiesSelector('users');

export const orderedUsers = SelectorFactory.createOrderedEntitiesSelector(users, results);

export const userByResult = SelectorFactory.createIdSelector(users, result);

export const filteredUsers = createSelector(
  [orderedUsers, filters],
  selectByFilters
);
