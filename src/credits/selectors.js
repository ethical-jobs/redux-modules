import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetchingSelector = SelectorFactory.create('credits', 'fetching');

export const errorSelector = SelectorFactory.create('credits', 'error');

export const creditPacks = SelectorFactory.createEntitiesSelector('credits', 'creditPacks');
