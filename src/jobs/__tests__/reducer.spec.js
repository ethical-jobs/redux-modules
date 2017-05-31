import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE, Assertions } from 'ethical-jobs-redux';
import { initialState } from 'jobs/reducer';
import * as Fixtures from './_fixtures';
import Jobs from 'jobs';

const Reducer = Jobs.reducer;
const Actions = Jobs.actions;

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
    results: Immutable.Set(),
    result: false,
  });
  expect(Assertions.initialState(Reducer, expectedState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Sync action handling
|--------------------------------------------------------------------------
*/

test('should handle clearJobs action correctly', () => {
  expect(
    Assertions.clearedEntities(Reducer, Actions.clearJobs(), initialState)
  ).toBe(true);
});

test('should handle updateFilters action correctly', () => {
  expect(
    Assertions.updatedFilters(Reducer, Actions.updateFilters, initialState)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Async action handling
|--------------------------------------------------------------------------
*/

test('should handle SEARCH_REQUEST action correctly', () => {
  expect(
    Assertions.searchRequestState(Reducer, Actions.SEARCH, initialState)
  ).toBe(true);
});

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(Actions.FETCH_COLLECTION),
    REQUEST(Actions.FETCH_ENTITY),
    REQUEST(Actions.CREATE),
    REQUEST(Actions.UPDATE),
    REQUEST(Actions.ARCHIVE),
    REQUEST(Actions.APPROVE),
    REQUEST(Actions.RESTORE),
    REQUEST(Actions.EXPIRE),
    REQUEST(Actions.ATTACH),
    REQUEST(Actions.DETACH),
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
    SUCCESS(Actions.ARCHIVE),
    SUCCESS(Actions.RESTORE),
    SUCCESS(Actions.APPROVE),
    SUCCESS(Actions.EXPIRE),
    SUCCESS(Actions.ATTACH),
    SUCCESS(Actions.DETACH),
  ];
  expect(
    Assertions.successState(Reducer, actionTypes, initialState, Fixtures.collection)
  ).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.FETCH_COLLECTION),
    FAILURE(Actions.FETCH_ENTITY),
    FAILURE(Actions.SEARCH),
    FAILURE(Actions.CREATE),
    FAILURE(Actions.UPDATE),
    FAILURE(Actions.ARCHIVE),
    FAILURE(Actions.RESTORE),
    FAILURE(Actions.APPROVE),
    FAILURE(Actions.EXPIRE),
    FAILURE(Actions.ATTACH),
    FAILURE(Actions.DETACH),
  ];
  expect(
    Assertions.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});
