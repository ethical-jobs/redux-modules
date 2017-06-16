import Immutable from 'immutable';
import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetchingSelector = SelectorFactory.create('taxonomies', 'fetching');

export const errorSelector = SelectorFactory.create('taxonomies', 'error');

export const taxonomiesSelector = state => state.getIn(['entities', 'taxonomies', 'taxonomies']);

export const orderedTaxonomySelector = (state, taxonomy) => {
  return taxonomiesSelector(state)
  .get(taxonomy, Immutable.Map())
  .sort((a, b) => a.get('title').localeCompare(b.get('title')))
};
