import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetchingSelector = SelectorFactory.create('credits', 'fetching');

export const errorSelector = SelectorFactory.create('credits', 'error');

export const creditPacks = state => state.getIn(['entities', 'credits', 'creditPacks']);
