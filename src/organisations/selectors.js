import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetchingSelector = SelectorFactory.create('organisations', 'fetching');

export const errorSelector = SelectorFactory.create('organisations', 'error');

export const filtersSelector = SelectorFactory.createFiltersSelector('organisations');

export const resultSelector = SelectorFactory.createResultSelector('organisations');

export const resultsSelector = SelectorFactory.createResultsSelector('organisations');

export const organisationsSelector = SelectorFactory.createEntitiesSelector('organisations');

export const orderedOrgsSelector = SelectorFactory.createOrderedEntitiesSelector(organisationsSelector, resultsSelector);

export const organisationByIdSelector = SelectorFactory.createIdSelector(organisationsSelector, resultSelector);
