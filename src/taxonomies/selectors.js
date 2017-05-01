import Immutable from 'immutable';

export const rootSelector = state => state.getIn(['entities','taxonomies']);

export const fetchingSelector = state => state.getIn(['entities','taxonomies','fetching']);

export const taxonomiesSelector = state => state.getIn([
  'entities','taxonomies','taxonomies'
], Immutable.Map());
