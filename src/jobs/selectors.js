import Immutable from 'immutable';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const rootSelector = state => state.getIn(['entities','jobs']);

export const fetchingSelector = state => state.getIn(['entities','jobs','fetching']);

export const errorSelector = state => state.getIn(['entities','jobs','error']);

export const filtersSelector = state => state.getIn(['entities','jobs','filters']);

export const propFiltersSelector = (state, props) => Immutable.Map(props.filters);

export const resultSelector = state => state.getIn(['entities','jobs','result']);

export const jobsSelector = state => state.getIn(['entities','jobs','entities','jobs'], Immutable.Map());

export const organisationsSelector = state => state.getIn(['entities','jobs','entities','organisations'], Immutable.Map());

export const jobByIdSelector = createSelector(
  [jobsSelector, resultSelector],
  (jobs, result) => jobs.get(result.toString())
);

export const jobsByFiltersSelector = createSelector(
  [jobsSelector, filtersSelector],
  selectByFilters
);

export const jobsByPropFiltersSelector = createSelector(
  [jobsSelector, propFiltersSelector],
  selectByFilters
);

export const jobMediaSelector = createSelector(
  rootSelector,
  jobs => jobs.getIn(['entities','media'])
);
