import Immutable from 'immutable';
import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetchingSelector = SelectorFactory.create('organisations', 'fetching');

export const errorSelector = SelectorFactory.create('organisations', 'error');

export const filtersSelector = SelectorFactory.createFiltersSelector('organisations');

export const resultSelector = SelectorFactory.createResultSelector('organisations');

export const resultsSelector = SelectorFactory.createResultsSelector('organisations');

export const organisationsSelector = SelectorFactory.createEntitiesSelector('organisations');

export const usersSelector = SelectorFactory.createEntitiesSelector('organisations', 'users');

export const orderedOrgsSelector = SelectorFactory.createOrderedEntitiesSelector(organisationsSelector, resultsSelector);

export const organisationByIdSelector = SelectorFactory.createIdSelector(organisationsSelector, resultSelector);

export const organisationOwner = createSelector(
  [organisationByIdSelector, usersSelector],
  (org, users) => users.get(org.get('owner_id','').toString(), Immutable.Map())
);
