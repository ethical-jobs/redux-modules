import Immutable from 'immutable';

export const rootSelector = (state) => state.getIn(['entities','credits']);

export const fetchingSelector = (state) => state.getIn(['entities','credits','fetching']);

export const creditPacksSelector = (state) => state.getIn([
  'entities','credits','creditPacks'
], Immutable.List());
