import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux';
import * as OrgActions from './actions';

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
 * Organisations reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OrgActions.CLEAR_ENTITIES:
      return ImmutableUtils.clearEntities(state);

    case OrgActions.UPDATE_FILTERS:
      return ImmutableUtils.updateFilters(state, action.payload);

    case REQUEST(OrgActions.SEARCH):
    case REQUEST(OrgActions.FETCH_COLLECTION):
    case REQUEST(OrgActions.FETCH_ENTITY):
    case REQUEST(OrgActions.CREATE):
    case REQUEST(OrgActions.UPDATE):
    case REQUEST(OrgActions.PATCH):
    case REQUEST(OrgActions.ARCHIVE):
    case REQUEST(OrgActions.RESTORE):
    case REQUEST(OrgActions.UPLOAD_LOGO):
    case REQUEST(OrgActions.CREATE_CREDITS):
    case REQUEST(OrgActions.DEDUCT_CREDITS):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(OrgActions.FETCH_ENTITY):
    case SUCCESS(OrgActions.CREATE):
    case SUCCESS(OrgActions.UPDATE):
    case SUCCESS(OrgActions.PATCH):
    case SUCCESS(OrgActions.ARCHIVE):
    case SUCCESS(OrgActions.RESTORE):
    case SUCCESS(OrgActions.UPLOAD_LOGO):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case SUCCESS(OrgActions.FETCH_COLLECTION):
    case SUCCESS(OrgActions.SEARCH):
      return ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case FAILURE(OrgActions.FETCH_COLLECTION):
    case FAILURE(OrgActions.FETCH_ENTITY):
    case FAILURE(OrgActions.CREATE):
    case FAILURE(OrgActions.UPDATE):
    case FAILURE(OrgActions.PATCH):
    case FAILURE(OrgActions.ARCHIVE):
    case FAILURE(OrgActions.RESTORE):
    case FAILURE(OrgActions.UPLOAD_LOGO):
    case FAILURE(OrgActions.CREATE_CREDITS):
    case FAILURE(OrgActions.DEDUCT_CREDITS):
    case FAILURE(OrgActions.SEARCH):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
