import Immutable from 'immutable';

/**
 * Returns invoices filtered by {organisationId}
 * @param {Map} invoice entity
 * @param {Number|Collection} organisations
 * @returns {Bool}
 */
export function byOrganisations(invoice, organisations) {
  if (!organisations) {
    return true; // pass through
  }
  if (Immutable.isCollection(organisations)) {
    return organisations.includes(invoice.get('organisation_id'));
  }
  return invoice.get('organisation_id') === organisations;
}

/**
 * Filters invoice entities
 * @param {Map} Invoices to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered invoice state.
 */
export default function selectByFilters(invoices, filters) {
  return invoices
    .filter(invoice => byOrganisations(invoice, filters.get('organisations')));
}
