import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux';
import * as JobActions from './actions';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  filters: {},
  syncFilters: {},
  entities: {},
  results: [],
  result: false,
});

/**
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case JobActions.CLEAR_ENTITIES:
      return ImmutableUtils.clearEntities(state);

    case JobActions.UPDATE_FILTERS:
      return ImmutableUtils.updateFilters(state, action.payload);

    case JobActions.CLEAR_FILTERS:
      return ImmutableUtils.clearFilters(state);

    case JobActions.UPDATE_SYNC_FILTERS:
      return ImmutableUtils.updateSyncFilters(state, action.payload);

    case REQUEST(JobActions.SEARCH):
      return ImmutableUtils.mergeSearchRequest(state);

    case REQUEST(JobActions.FETCH_COLLECTION):
    case REQUEST(JobActions.FETCH_ENTITY):
    case REQUEST(JobActions.CREATE):
    case REQUEST(JobActions.UPDATE):
    case REQUEST(JobActions.ARCHIVE):
    case REQUEST(JobActions.RESTORE):
    case REQUEST(JobActions.APPROVE):
    case REQUEST(JobActions.EXPIRE):
    case REQUEST(JobActions.ATTACH):
    case REQUEST(JobActions.DETACH):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(JobActions.FETCH_ENTITY):
    case SUCCESS(JobActions.CREATE):
    case SUCCESS(JobActions.UPDATE):
    case SUCCESS(JobActions.ARCHIVE):
    case SUCCESS(JobActions.RESTORE):
    case SUCCESS(JobActions.APPROVE):
    case SUCCESS(JobActions.EXPIRE):
    case SUCCESS(JobActions.ATTACH):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case SUCCESS(JobActions.DETACH):
      return ImmutableUtils.mergeDeleteSuccess(state, action.payload, 'media');

    case SUCCESS(JobActions.FETCH_COLLECTION):
    case SUCCESS(JobActions.SEARCH):
      return ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case FAILURE(JobActions.FETCH_COLLECTION):
    case FAILURE(JobActions.FETCH_ENTITY):
    case FAILURE(JobActions.CREATE):
    case FAILURE(JobActions.UPDATE):
    case FAILURE(JobActions.ARCHIVE):
    case FAILURE(JobActions.RESTORE):
    case FAILURE(JobActions.APPROVE):
    case FAILURE(JobActions.EXPIRE):
    case FAILURE(JobActions.ATTACH):
    case FAILURE(JobActions.DETACH):
    case FAILURE(JobActions.SEARCH):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
