import 'core-js/fn/number/is-integer';
import Immutable from 'immutable';
import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetching = SelectorFactory.create('taxonomies', 'fetching');

export const error = SelectorFactory.create('taxonomies', 'error');

export const taxonomies = state => state.getIn(['entities', 'taxonomies', 'taxonomies']);

export const orderedTaxonomy = (state, taxonomy, orderBy = 'title') => {
  return taxonomies(state)
    .get(taxonomy, Immutable.Map())
    .toOrderedMap()
    .sort((a, b) => {
      if (Number.isInteger(a.get(orderBy))) {
        return a.get('id') - b.get('id');
      } else {
        return a.get(orderBy).localeCompare(b.get(orderBy));
      }
    });
};

export const orderedTaxonomyWithJobs = (state, taxonomy, orderBy = 'title') => {
  return orderedTaxonomy(state, taxonomy, orderBy)
    .filter(term => term.has('job_count') && term.get('job_count') > 0);
};
