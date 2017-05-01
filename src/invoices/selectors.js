import Immutable from 'immutable';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const rootSelector = state => state.getIn(['entities','invoices']);

export const fetchingSelector = state => state.getIn(['entities','invoices','fetching']);

export const filtersSelector = state => state.getIn([
  'entities','invoices','filters'
], Immutable.Map());

export const resultsSelector = state => state.getIn([
  'entities','invoices','results'
], Immutable.List());

export const resultSelector = state => state.getIn([
  'entities','invoices','result'
], false);

export const invoicesSelector = state => state.getIn([
  'entities','invoices','entities','invoices'
], Immutable.Map());

export const invoiceByIdSelector = createSelector(
  [invoicesSelector, resultSelector],
  (invoices, result) => invoices.get(result.toString())
);

export const invoicesByFiltersSelector = createSelector(
  [invoicesSelector, filtersSelector],
  (invoices, filters) => selectByFilters(invoices, filters)
);
