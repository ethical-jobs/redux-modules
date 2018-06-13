import { Map } from 'immutable';
import { SelectorFactory } from 'ethical-jobs-redux';

export const fetching = SelectorFactory.create('enumerables', 'fetching');

export const error = SelectorFactory.create('enumerables', 'error');

export const enumerables = state => state.getIn(['entities', 'enumerables', 'enumerables']);

export const orderedEnumerable = (state, enumerableKey) => state
  .getIn(["entities", "enumerables", "enumerables", enumerableKey], Map())
  .sortBy((value, key) => value);
