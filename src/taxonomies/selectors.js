import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetchingSelector = SelectorFactory.create('taxonomies', 'fetching');

export const errorSelector = SelectorFactory.create('taxonomies', 'error');

export const taxonomiesPacks = SelectorFactory.createEntitiesSelector('taxonomies');
