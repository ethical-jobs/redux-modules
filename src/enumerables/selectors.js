import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetching = SelectorFactory.create('enumerables', 'fetching');

export const error = SelectorFactory.create('enumerables', 'error');

export const enumerables = state => state.getIn(['entities', 'enumerables', 'enumerables']);
