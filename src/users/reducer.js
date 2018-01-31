import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux';
import * as UserActions from './actions';

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
 * User reducer
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UserActions.CLEAR_ENTITIES:
      return ImmutableUtils.clearEntities(state);

    case UserActions.UPDATE_FILTERS:
      return ImmutableUtils.updateFilters(state, action.payload);

    case REQUEST(UserActions.FETCH_COLLECTION):
    case REQUEST(UserActions.FETCH_ENTITY):
    case REQUEST(UserActions.CREATE):
    case REQUEST(UserActions.UPDATE):
    case REQUEST(UserActions.ARCHIVE):
    case REQUEST(UserActions.RESTORE):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(UserActions.FETCH_ENTITY):
    case SUCCESS(UserActions.CREATE):
    case SUCCESS(UserActions.UPDATE):
    case SUCCESS(UserActions.ARCHIVE):
    case SUCCESS(UserActions.RESTORE):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case SUCCESS(UserActions.FETCH_COLLECTION):
      return ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case FAILURE(UserActions.FETCH_COLLECTION):
    case FAILURE(UserActions.FETCH_ENTITY):
    case FAILURE(UserActions.CREATE):
    case FAILURE(UserActions.UPDATE):
    case FAILURE(UserActions.ARCHIVE):
    case FAILURE(UserActions.RESTORE):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
