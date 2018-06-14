import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE, Assertions } from '@ethical-jobs/redux';
import { initialState } from 'subscriptions/reducer';
import * as Fixtures from './_fixtures';
import Subscriptions from 'subscriptions';

const Reducer = Subscriptions.reducer;
const Actions = Subscriptions.actions;

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state ', () => {
  const expectedState = Immutable.fromJS({
    fetching: false,
    error: false,
    filters: {},
    entities: {},
    results: [],
    result: false,
  });
  expect(Assertions.initialState(Reducer, expectedState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| REQUEST actions
|--------------------------------------------------------------------------
*/

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(Actions.CREATE),
    REQUEST(Actions.FETCH_COLLECTION),
    REQUEST(Actions.FETCH_ENTITY),
    REQUEST(Actions.DELETE),
    REQUEST(Actions.CONFIRM),
  ];
  expect(
    Assertions.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS actions correctly', () => {
  const actionTypes = [
    SUCCESS(Actions.CREATE),
    SUCCESS(Actions.FETCH_ENTITY),
    SUCCESS(Actions.DELETE),
    SUCCESS(Actions.CONFIRM),
  ];
  expect(
    Assertions.successState(Reducer, actionTypes, initialState, Fixtures.success)
  ).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.CREATE),
    FAILURE(Actions.FETCH_COLLECTION),
    FAILURE(Actions.FETCH_ENTITY),
    FAILURE(Actions.DELETE),
    FAILURE(Actions.CONFIRM),
  ];
  expect(
    Assertions.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});
