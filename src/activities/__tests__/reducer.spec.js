import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE, Assertions } from 'ethical-jobs-redux';
import { initialState } from 'activities/reducer';
import * as Fixtures from './_fixtures';
import Activities from 'activities';

const Reducer = Activities.reducer;
const Actions = Activities.actions;
/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', () => {
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
| Sync action handling
|--------------------------------------------------------------------------
*/

test('should handle clear action correctly', () => {
  expect(
    Assertions.clearedEntities(Reducer, Actions.clear(), initialState)
  ).toBe(true);
});

test('should handle updateFilters action correctly', () => {
  expect(
    Assertions.updatedFilters(Reducer, Actions.updateFilters, initialState)
  ).toBe(true);
});


/*
|--------------------------------------------------------------------------
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(Actions.FETCH_COLLECTION),
  ];
  expect(
    Assertions.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

// test('should handle SUCCESS actions correctly', () => {
//   const actionTypes = [
//   ];
//   expect(
//     Assertions.successState(Reducer, actionTypes, initialState, Fixtures.success)
//   ).toBe(true);
// });

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.FETCH_COLLECTION),
  ];
  expect(
    Assertions.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});