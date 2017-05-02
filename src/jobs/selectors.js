import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetchingSelector = SelectorFactory.create('jobs', 'fetching');

export const errorSelector = SelectorFactory.create('jobs', 'error');

export const filtersSelector = SelectorFactory.createFiltersSelector('jobs');

export const propFiltersSelector = SelectorFactory.createPropFiltersSelector();

export const resultSelector = SelectorFactory.createResultSelector('jobs');

export const resultsSelector = SelectorFactory.createResultsSelector('jobs');

export const jobsSelector = SelectorFactory.createEntitiesSelector('jobs');

export const organisationsSelector = SelectorFactory.createEntitiesSelector('jobs', 'organisations');

export const jobMediaSelector = SelectorFactory.createEntitiesSelector('jobs', 'media');

export const orderedJobsSelector = SelectorFactory.createOrderedEntitiesSelector(jobsSelector, resultsSelector);

export const jobByIdSelector = SelectorFactory.createIdSelector(jobsSelector, resultSelector);

export const jobsByFiltersSelector = createSelector(
  [orderedJobsSelector, filtersSelector],
  selectByFilters
);

export const jobsByPropFiltersSelector = createSelector(
  [orderedJobsSelector, propFiltersSelector],
  selectByFilters
);
