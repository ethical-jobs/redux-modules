import Immutable from 'immutable';

/**
 * Returns invoices filtered by {organisationId}
 * @param {Map} invoice entity
 * @param {Number|Collection} organisations
 * @returns {Bool}
 */
export function byOrganisations(activity, organisations) {
  if (!organisations) {
    return true; // pass through
  }
  if (Immutable.isCollection(organisations)) {
    return organisations.includes(activity.getIn(['subject', 'id']));
  }
  return activity.getIn(['subject', 'id']) === organisations;
}

/**
 * Filters invoice entities
 * @param {Map} Invoices to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered invoice state.
 */
export default function selectByFilters(activities, filters) {

  return activities
    .filter(activity => byOrganisations(activity, filters.get('organisations')));
}
