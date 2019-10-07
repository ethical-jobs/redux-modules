import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from '@ethical-jobs/redux';
import * as PostsActions from './actions';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false,
});

/**
 * Posts reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case PostsActions.CLEAR_ENTITIES:
      return ImmutableUtils.clearEntities(state);

    case PostsActions.UPDATE_FILTERS:
      return ImmutableUtils.updateFilters(state, action.payload);

    case REQUEST(PostsActions.FETCH_COLLECTION):
    case REQUEST(PostsActions.FETCH_ENTITY):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(PostsActions.FETCH_ENTITY):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case SUCCESS(PostsActions.FETCH_COLLECTION):
      return ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case FAILURE(PostsActions.FETCH_COLLECTION):
    case FAILURE(PostsActions.FETCH_ENTITY):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
