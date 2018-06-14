import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from '@ethical-jobs/redux';
import * as Activities from './actions'

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
 * Activity reducer
 *
 * @author Sebastian Sibelle <sebastian@ethicaljobs.com.au>
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case Activities.CLEAR_ENTITIES:
      return ImmutableUtils.clearEntities(state);

    case Activities.UPDATE_FILTERS:
      return ImmutableUtils.updateFilters(state, action.payload);

    case REQUEST(Activities.FETCH_COLLECTION):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(Activities.FETCH_COLLECTION):
      return ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case FAILURE(Activities.FETCH_COLLECTION):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
