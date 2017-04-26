import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux/lib/utils/asyncTypes';
import { initialState } from 'posts/reducer';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import * as Fixtures from './_fixtures';
import Posts from 'posts';

const Reducer = Posts.reducer;
const Actions = Posts.actions;

/*
|--------------------------------------------------------------------------
| Initial state
|--------------------------------------------------------------------------
*/

test('should return correct initial state', () => {
  const expectedState = Immutable.fromJS({
    fetching: false,
    error: false,
    filters: Immutable.Map(),
    result: Immutable.Set(),
    entities: Immutable.Map(),
  });
  expect(Assert.initialState(Reducer, expectedState)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Sync action handling
|--------------------------------------------------------------------------
*/

test('should handle clearPosts action correctly', () => {
  expect(
    Assert.clearedEntities(Reducer, Actions.clearPosts(), initialState)
  ).toBe(true);
});

test('should handle updateFilters action correctly', () => {
  expect(
    Assert.updatedFilters(Reducer, Actions.updateFilters, initialState)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Async action handling
|--------------------------------------------------------------------------
*/

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(Actions.FETCH_COLLECTION),
    REQUEST(Actions.FETCH_ENTITY),
  ];
  expect(
    Assert.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS actions correctly', () => {
  const actionTypes = [
    SUCCESS(Actions.FETCH_COLLECTION),
    SUCCESS(Actions.FETCH_ENTITY),
  ];
  expect(
    Assert.successState(Reducer, actionTypes, initialState, Fixtures.collection)
  ).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.FETCH_COLLECTION),
    FAILURE(Actions.FETCH_ENTITY),
  ];
  expect(
    Assert.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});
