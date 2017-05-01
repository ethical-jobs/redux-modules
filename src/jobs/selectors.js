import Immutable from 'immutable';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const rootSelector = state => state.getIn(['entities','jobs']);

export const fetchingSelector = state => state.getIn(['entities','jobs','fetching']);

export const errorSelector = state => state.getIn(['entities','jobs','error']);

export const filtersSelector = state => state.getIn([
  'entities','jobs','filters'
], Immutable.Map());

export const propFiltersSelector = (state, props) => Immutable.Map(props.filters, Immutable.Map());

export const resultSelector = state => state.getIn([
  'entities','jobs','result'
], false);

export const resultsSelector = state => state.getIn([
  'entities','jobs','results'
], Immutable.List());

export const jobsSelector = state => state.getIn([
  'entities','jobs','entities','jobs'
], Immutable.Map());

export const organisationsSelector = state => state.getIn([
  'entities','jobs','entities','organisations'
], Immutable.Map());

export const orderedJobsSelector = createSelector(
  [jobsSelector, resultsSelector],
  (jobs, results) => results.map(id => jobs.get(id.toString()))
);

export const jobByIdSelector = createSelector(
  [jobsSelector, resultSelector],
  (jobs, result) => jobs.get(result.toString())
);

export const jobsByFiltersSelector = createSelector(
  [orderedJobsSelector, filtersSelector],
  selectByFilters
);

export const jobsByPropFiltersSelector = createSelector(
  [orderedJobsSelector, propFiltersSelector],
  selectByFilters
);

export const jobMediaSelector = createSelector(
  rootSelector,
  jobs => jobs.getIn(['entities','media'])
);
