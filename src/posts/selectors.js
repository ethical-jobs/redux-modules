import { SelectorFactory } from '@ethical-jobs/redux';
import { createSelector } from 'reselect';
import Immutable from 'immutable';

export const fetching = SelectorFactory.create('posts', 'fetching');

export const error = SelectorFactory.create('posts', 'error');

export const filters = SelectorFactory.createFiltersSelector('posts');

export const result = SelectorFactory.createResultSelector('posts');

export const results = SelectorFactory.createResultsSelector('posts');

export const postsSelector = SelectorFactory.createEntitiesSelector('posts');

// export const orderedPosts = SelectorFactory.createOrderedEntitiesSelector(postsSelector, results);

export const orderedPosts = createSelector(
  [postsSelector, results],
  (posts, results) => {
    return Immutable.OrderedMap(results.map(result => [result.toString(), posts.get(result.toString())]));
  }
);

export const postByResult = SelectorFactory.createIdSelector(postsSelector, result);
