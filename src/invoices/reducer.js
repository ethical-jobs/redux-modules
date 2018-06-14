import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from '@ethical-jobs/redux';
import * as InvoiceActions from './actions';

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
 * Invoice reducer
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case InvoiceActions.CLEAR_ENTITIES:
      return ImmutableUtils.clearEntities(state);

    case InvoiceActions.UPDATE_FILTERS:
      return ImmutableUtils.updateFilters(state, action.payload);

    case REQUEST(InvoiceActions.SEARCH):
    case REQUEST(InvoiceActions.FETCH_COLLECTION):
    case REQUEST(InvoiceActions.FETCH_ENTITY):
    case REQUEST(InvoiceActions.CREATE):
    case REQUEST(InvoiceActions.UPDATE):
    case REQUEST(InvoiceActions.ARCHIVE):
    case REQUEST(InvoiceActions.RESTORE):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(InvoiceActions.FETCH_ENTITY):
    case SUCCESS(InvoiceActions.CREATE):
    case SUCCESS(InvoiceActions.UPDATE):
    case SUCCESS(InvoiceActions.ARCHIVE):
    case SUCCESS(InvoiceActions.RESTORE):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case SUCCESS(InvoiceActions.FETCH_COLLECTION):
    case SUCCESS(InvoiceActions.SEARCH):
      return ImmutableUtils.mergeCollectionSuccess(state, action.payload);

    case FAILURE(InvoiceActions.FETCH_COLLECTION):
    case FAILURE(InvoiceActions.FETCH_ENTITY):
    case FAILURE(InvoiceActions.CREATE):
    case FAILURE(InvoiceActions.UPDATE):
    case FAILURE(InvoiceActions.ARCHIVE):
    case FAILURE(InvoiceActions.RESTORE):
    case FAILURE(InvoiceActions.SEARCH):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
