import { SelectorFactory } from 'ethical-jobs-redux';
import { createSelector } from 'reselect';

export const fetchingSelector = SelectorFactory.create('posts', 'fetching');

export const errorSelector = SelectorFactory.create('posts', 'error');

export const filtersSelector = SelectorFactory.createFiltersSelector('posts');

export const resultSelector = SelectorFactory.createResultSelector('posts');

export const resultsSelector = SelectorFactory.createResultsSelector('posts');

export const postsSelector = SelectorFactory.createEntitiesSelector('posts');

export const orderedPostsSelector = SelectorFactory.createOrderedEntitiesSelector(postsSelector, resultsSelector);

export const postByIdSelector = SelectorFactory.createIdSelector(postsSelector, resultSelector);
