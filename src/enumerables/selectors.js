import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetchingSelector = SelectorFactory.create('enumerables', 'fetching');

export const errorSelector = SelectorFactory.create('enumerables', 'error');

export const enumerablesPacks = SelectorFactory.createEntitiesSelector('enumerables');
