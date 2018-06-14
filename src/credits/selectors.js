import { SelectorFactory } from '@ethical-jobs/redux';
import { createSelector } from 'reselect';

export const fetching = SelectorFactory.create('credits', 'fetching');

export const error = SelectorFactory.create('credits', 'error');

export const creditPacks = state => state.getIn(['entities', 'credits', 'creditPacks']);
