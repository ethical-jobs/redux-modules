import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';
import selectByFilters from './filters';

export const fetching = SelectorFactory.create('invoices', 'fetching');

export const error = SelectorFactory.create('invoices', 'error');

export const filters = SelectorFactory.createFiltersSelector('invoices');

export const result = SelectorFactory.createResultSelector('invoices');

export const results = SelectorFactory.createResultsSelector('invoices');

export const invoices = SelectorFactory.createEntitiesSelector('invoices');

export const orderedInvoices = SelectorFactory.createOrderedEntitiesSelector(invoices, results);

export const invoiceByResult = SelectorFactory.createIdSelector(invoices, result);

export const invoicesByFiltersSelector = createSelector(
  [orderedInvoices, filters],
  selectByFilters
);
