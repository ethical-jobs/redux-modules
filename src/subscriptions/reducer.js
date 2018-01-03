import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux';
import * as Subscriptions from './actions';

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
 * subscriptions reducer
 *
 * @author Sebastian Sibelle <sebastian@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case REQUEST(Subscriptions.CREATE):
    case REQUEST(Subscriptions.FETCH_COLLECTION):
    case REQUEST(Subscriptions.FETCH_ENTITY):
    case REQUEST(Subscriptions.DELETE):
    case REQUEST(Subscriptions.CONFIRM):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(Subscriptions.CREATE):
    case SUCCESS(Subscriptions.FETCH_ENTITY):
    case SUCCESS(Subscriptions.DELETE):
    case SUCCESS(Subscriptions.CONFIRM):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case SUCCESS(Subscriptions.FETCH_COLLECTION):
      return ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case FAILURE(Subscriptions.CREATE):
    case FAILURE(Subscriptions.FETCH_ENTITY):
    case FAILURE(Subscriptions.FETCH_COLLECTION):
    case FAILURE(Subscriptions.DELETE):
    case FAILURE(Subscriptions.CONFIRM):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
