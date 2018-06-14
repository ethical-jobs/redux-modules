import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE, Assertions } from '@ethical-jobs/redux';
import { initialState } from 'users/reducer';
import * as Fixtures from './_fixtures';
import Users from 'users';

const Reducer = Users.reducer;
const Actions = Users.actions;

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
| Action handling
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
| REQUEST actions
|--------------------------------------------------------------------------
*/

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(Actions.FETCH_COLLECTION),
    REQUEST(Actions.FETCH_ENTITY),
    REQUEST(Actions.CREATE),
    REQUEST(Actions.UPDATE),
    REQUEST(Actions.ARCHIVE),
    REQUEST(Actions.RESTORE),
  ];
  expect(
    Assertions.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS actions correctly', () => {
  const actionTypes = [
    SUCCESS(Actions.FETCH_ENTITY),
    SUCCESS(Actions.CREATE),
    SUCCESS(Actions.UPDATE),
    SUCCESS(Actions.PATCH),
    SUCCESS(Actions.ARCHIVE),
    SUCCESS(Actions.RESTORE),
  ];
  expect(
    Assertions.successState(Reducer, actionTypes, initialState, Fixtures.collection)
  ).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.FETCH_COLLECTION),
    FAILURE(Actions.FETCH_ENTITY),
    FAILURE(Actions.CREATE),
    FAILURE(Actions.UPDATE),
    FAILURE(Actions.PATCH),
    FAILURE(Actions.ARCHIVE),
    FAILURE(Actions.RESTORE),
  ];
  expect(
    Assertions.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});
