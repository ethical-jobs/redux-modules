import Immutable from 'immutable';

/**
 * Returns jobs filtered by {organisationId}
 *
 * @param {Map} job entity
 * @param {Number} organisation id
 * @returns {Bool}
 */

export function byOrganisationId(job, organisationId) {
  return !organisationId ? true : job.get('organisation_id') === organisationId;
}

/**
 * Returns jobs filtered by {status}
 *
 * @param {Map} job entity
 * @param {String} jobs status to filter
 * @returns {Bool}
 */

export function byStatus(job, status) {
  return !status ? true : job.get('status') === status;
}

/**
 * Returns jobs filtered by {expired}
 *
 * @param {Map} job entity
 * @param {Bool} true for expired
 * @returns {Bool}
 */

export function byExpiration(job, expiration) {
  if (typeof expiration == null || typeof expiration == undefined) {
    return true;
  }
  return job.get('expired') === expiration;
}

/**
 * Returns jobs filtered by {taxonomy}
 *
 * @param {Map} job entity
 * @param {String} taxonomy key
 * @param {List} taxonomy filterTerms
 * @returns {Bool}
 */

export function byTaxonomy(job, filters, taxonomy) {
  const jobTerms = job.get(taxonomy, Immutable.List());
  if (typeof filters === 'undefined') {
    return true; // pass through
  }
  if (typeof filters === 'string' || typeof filters === 'number') {
    return jobTerms.includes(parseInt(filters, 10)); // is single term
  }
  return filters.size > jobTerms.size ? jobTerms.isSubset(filters) : filters.isSubset(jobTerms);
}

/**
 * Filters job entities
 *
 * @param {Map} Jobs to be filtered
 * @param {Map} Filters to apply
 * @returns {any} The filtered job state.
 */

export default function selectByFilters(jobs, filters) {
  return jobs
    .filter(job => byOrganisationId(job, filters.get('organisationId')))
    .filter(job => byStatus(job, filters.get('status')))
    .filter(job => byExpiration(job, filters.get('expired')))
    .filter(job => byTaxonomy(job, filters.get('categories'), 'categories'))
    .filter(job => byTaxonomy(job, filters.get('locations'), 'locations'))
    .filter(job => byTaxonomy(job, filters.get('sectors'), 'sectors'))
    .filter(job => byTaxonomy(job, filters.get('workTypes'), 'workTypes'));
}
