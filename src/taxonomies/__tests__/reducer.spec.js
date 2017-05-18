import Immutable from 'immutable';
import App from 'app';
import { REQUEST, SUCCESS, FAILURE, Assertions } from 'ethical-jobs-redux';
import Taxonomies from 'taxonomies';
import { initialState } from 'taxonomies/reducer';
import * as Fixtures from 'app/__tests__/_fixtures';

const Reducer = Taxonomies.reducer;

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', () => {
  const expectedState = Immutable.fromJS({
    fetching: false,
    error: false,
    taxonomies: Immutable.Map(),
  });
  expect(Assertions.initialState(Reducer, expectedState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/


test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(App.actions.FETCH_APP_DATA),
  ];
  expect(
    Assertions.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS action correctly', () => {
  const action = {
    type: SUCCESS(App.actions.FETCH_APP_DATA),
    payload: Fixtures.response,
  };
  const expectedState = initialState
    .set('fetching', false)
    .set('error', false)
    .set('taxonomies', Immutable.fromJS(Fixtures.response.data.taxonomies));
  const actual = Reducer(undefined, action);
  expect(Immutable.is(actual, expectedState)).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(App.actions.FETCH_APP_DATA),
  ];
  expect(
    Assertions.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});

