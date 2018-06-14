import { SelectorFactory } from '@ethical-jobs/redux';
import { createSelector } from 'reselect';
import filterJobs from './filters';

export const fetching = SelectorFactory.create('jobs', 'fetching');

export const error = SelectorFactory.create('jobs', 'error');

export const filters = SelectorFactory.createFiltersSelector('jobs');

export const syncFilters = SelectorFactory.createSyncFiltersSelector('jobs');

export const propsFilters = SelectorFactory.createPropFiltersSelector();

export const result = SelectorFactory.createResultSelector('jobs');

export const results = SelectorFactory.createResultsSelector('jobs');

export const jobs = SelectorFactory.createEntitiesSelector('jobs');

export const orderedJobs = SelectorFactory.createOrderedEntitiesSelector(jobs, results);

export const jobByResult = SelectorFactory.createIdSelector(jobs, result);

export const organisations = SelectorFactory.createEntitiesSelector('jobs', 'organisations');

export const media = SelectorFactory.createEntitiesSelector('jobs', 'media');

export const filteredJobs = createSelector(
  [jobs, filters],
  filterJobs
);

export const orderedFilteredJobs = createSelector(
  [orderedJobs, filters],
  filterJobs
);

export const propsOrderedFilteredJobs = createSelector(
  [orderedJobs, propsFilters],
  filterJobs
);
