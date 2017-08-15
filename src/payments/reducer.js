import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux';
import * as PaymentActions from './actions';

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
 * Purchase reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(PaymentActions.PURCHASE):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(PaymentActions.PURCHASE):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case FAILURE(PaymentActions.PURCHASE):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
