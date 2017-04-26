import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux';
import App from '../app';

// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  enumerables: {},
});

/**
 * Enumerables reducer
 *
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(App.actions.FETCH_APP_DATA):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(App.actions.FETCH_APP_DATA):
      return state
        .set('fetching', false)
        .set('error', false)
        .set('enumerables', Immutable.fromJS(action.payload.data.enumerables));

    case FAILURE(App.actions.FETCH_APP_DATA):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
