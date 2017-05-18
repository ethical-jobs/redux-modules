import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetchingSelector = SelectorFactory.create('credits', 'fetching');

export const errorSelector = SelectorFactory.create('credits', 'error');

export const creditPacksSelector = state => state.getIn(['entities', 'credits', 'creditPacks']);
