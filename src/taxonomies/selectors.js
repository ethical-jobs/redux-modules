import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetchingSelector = SelectorFactory.create('taxonomies', 'fetching');

export const errorSelector = SelectorFactory.create('taxonomies', 'error');

export const taxonomiesSelector = state => state.getIn(['entities', 'taxonomies', 'taxonomies']);
