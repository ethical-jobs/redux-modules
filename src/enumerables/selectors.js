import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetchingSelector = SelectorFactory.create('enumerables', 'fetching');

export const errorSelector = SelectorFactory.create('enumerables', 'error');

export const enumerablesSelector = state => state.getIn(['entities', 'enumerables', 'enumerables']);
