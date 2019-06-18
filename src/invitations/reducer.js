import Immutable from 'immutable';
import { ImmutableUtils, REQUEST, SUCCESS, FAILURE } from '@ethical-jobs/redux';

import * as InvitationActions from './actions';

export const initialState = Immutable.fromJS({
  fetching: false,
  error: false,
  filters: {},
  entities: {},
  results: [],
  result: false,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST(InvitationActions.CREATE):
      return ImmutableUtils.mergeRequest(state);

    case SUCCESS(InvitationActions.CREATE):
      return ImmutableUtils.mergeSuccess(state, action.payload);

    case FAILURE(InvitationActions.CREATE):
      return ImmutableUtils.mergeFailure(state, action.payload);

    default:
      return state;
  }
}
