import Immutable from 'immutable';
import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetching = SelectorFactory.create('taxonomies', 'fetching');

export const error = SelectorFactory.create('taxonomies', 'error');

export const taxonomies = state => state.getIn(['entities', 'taxonomies', 'taxonomies']);

export const orderedTaxonomy = (state, taxonomy) => {
  return taxonomies(state)
  .get(taxonomy, Immutable.Map())
  .sort((a, b) => a.get('title').localeCompare(b.get('title')))
};
