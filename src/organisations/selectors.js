import Immutable from 'immutable';
import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetching = SelectorFactory.create('organisations', 'fetching');

export const error = SelectorFactory.create('organisations', 'error');

export const filters = SelectorFactory.createFiltersSelector('organisations');

export const result = SelectorFactory.createResultSelector('organisations');

export const results = SelectorFactory.createResultsSelector('organisations');

export const organisations = SelectorFactory.createEntitiesSelector('organisations');

export const orderedOrganisations = SelectorFactory.createOrderedEntitiesSelector(organisations, results);

export const organisationByResult = SelectorFactory.createIdSelector(organisations, result);

export const users = SelectorFactory.createEntitiesSelector('organisations', 'users');

export const organisationOwner = createSelector(
  [organisationByResult, users],
  (org, users) => users.get(org.get('owner_id','').toString(), Immutable.Map())
);
