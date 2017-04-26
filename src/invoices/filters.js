
/**
 * Returns invoices filtered by {organisationId}
 *
 * @param {Map} invoice entity
 * @param {Number} organisation id
 * @returns {Bool}
 */

export function byOrganisationId(invoice, organisationId) {
  return !organisationId ? true : invoice.get('organisation_id') === organisationId;
}

/**
 * Filters invoice entities
 *
 * @param {Map} Invoices to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered invoice state.
 */

export default function selectByFilters(invoices, filters) {
  return invoices
    .filter(invoice => byOrganisationId(invoice, filters.get('organisationId')));
}
