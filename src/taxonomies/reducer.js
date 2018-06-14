import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from '@ethical-jobs/redux';
import * as AppActions from '../app/actions';


// Initial state
export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  taxonomies: {},
});

/**
 * Taxonomies reducer
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(AppActions.FETCH_APP_DATA):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(AppActions.FETCH_APP_DATA):
      return state
        .set('fetching', false)
        .set('error', false)
        .set('taxonomies', Immutable.fromJS(action.payload.data.taxonomies));

    case FAILURE(AppActions.FETCH_APP_DATA):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
