import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE, Assertions } from 'ethical-jobs-redux';
import { initialState } from 'auth/reducer';
import * as Fixtures from './_fixtures';
import Auth from 'auth';

const Reducer = Auth.reducer;
const Actions = Auth.actions;

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', () => {
  const expectedState = Immutable.fromJS({
    fetching: false,
    error: false,
    entities: {},
    results: Immutable.Set(),
    result: false,
  });
  expect(Assertions.initialState(Reducer, expectedState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Async action handling
|--------------------------------------------------------------------------
*/

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(Actions.LOGIN),
    REQUEST(Actions.LOGOUT),
    REQUEST(Actions.LOAD),
  ];
  expect(
    Assertions.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS actions correctly', () => {
  const actionTypes = [
    SUCCESS(Actions.LOGIN),
    SUCCESS(Actions.LOAD),
  ];
  expect(
    Assertions.successState(Reducer, actionTypes, initialState, Fixtures.single)
  ).toBe(true);
});

test('should handle LOGOUT_SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(Actions.LOGOUT),
  };
  const actual = Reducer(undefined, action);
  expect(Immutable.is(actual, initialState)).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.LOGIN),
    FAILURE(Actions.LOGOUT),
    FAILURE(Actions.LOAD),
  ];
  expect(
    Assertions.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});
