import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux';
import * as AuthActions from './actions';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  result: Immutable.Set(),
  entities: Immutable.Map(),
});

/**
 * Auth reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(AuthActions.LOGIN):
    case REQUEST(AuthActions.LOGOUT):
    case REQUEST(AuthActions.LOAD):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(AuthActions.LOGIN):
    case SUCCESS(AuthActions.LOAD):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case SUCCESS(AuthActions.LOGOUT):
      return initialState;

    case FAILURE(AuthActions.LOGIN):
    case FAILURE(AuthActions.LOGOUT):
    case FAILURE(AuthActions.LOAD):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
