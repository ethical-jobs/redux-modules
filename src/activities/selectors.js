import {SelectorFactory} from 'ethical-jobs-redux';
import {createSelector} from 'reselect';
import selectByFilters from './filters';

export const fetching = SelectorFactory.create('activities', 'fetching');

export const error = SelectorFactory.create('activities', 'error');

export const filters = SelectorFactory.createFiltersSelector('activities');

export const result = SelectorFactory.createResultSelector('activities');

export const results = SelectorFactory.createResultsSelector('activities');

export const activities = SelectorFactory.createEntitiesSelector('activities');

export const orderedActivities= SelectorFactory.createOrderedEntitiesSelector(activities, results);

export const filteredActivities= createSelector(
  [orderedActivities, filters],
  selectByFilters
);