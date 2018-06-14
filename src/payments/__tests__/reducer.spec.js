import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE, Assertions } from '@ethical-jobs/redux';
import { initialState } from 'payments/reducer';
import * as Fixtures from './_fixtures';
import Payments from 'payments';

const Reducer = Payments.reducer;
const Actions = Payments.actions;

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
    REQUEST(Actions.PURCHASE),
  ];
  expect(
    Assertions.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS actions correctly', () => {
  const actionTypes = [
    SUCCESS(Actions.PURCHASE),
  ];
  expect(
    Assertions.successState(Reducer, actionTypes, initialState, Fixtures.success)
  ).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.PURCHASE),
  ];
  expect(
    Assertions.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});
