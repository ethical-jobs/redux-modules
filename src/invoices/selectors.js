import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetchingSelector = SelectorFactory.create('invoices', 'fetching');

export const errorSelector = SelectorFactory.create('invoices', 'error');

export const filtersSelector = SelectorFactory.createFiltersSelector('invoices');

export const resultSelector = SelectorFactory.createResultSelector('invoices');

export const resultsSelector = SelectorFactory.createResultsSelector('invoices');

export const invoicesSelector = SelectorFactory.createEntitiesSelector('invoices');

export const orderedInvoicesSelector = SelectorFactory.createOrderedEntitiesSelector(invoicesSelector, resultsSelector);

export const invoiceByIdSelector = SelectorFactory.createIdSelector(invoicesSelector, resultSelector);

export const invoicesByFiltersSelector = createSelector(
  [orderedInvoicesSelector, filtersSelector],
  selectByFilters
);
