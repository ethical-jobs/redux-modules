import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE } from 'ethical-jobs-redux/lib/utils/asyncTypes';
import { initialState } from 'invoices/reducer';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import * as Fixtures from './_fixtures';
import Invoices from 'invoices';

const Reducer = Invoices.reducer;
const Actions = Invoices.actions;

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
| Action handling
|--------------------------------------------------------------------------
*/

test('should handle clearInvoices action correctly', () => {
  expect(
    Assert.clearedEntities(Reducer, Actions.clearInvoices(), initialState)
  ).toBe(true);
});

test('should handle updateFilters action correctly', () => {
  expect(
    Assert.updatedFilters(Reducer, Actions.updateFilters, initialState)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| REQUEST actions
|--------------------------------------------------------------------------
*/


test('should handle SEARCH_REQUEST action correctly', () => {
  expect(
    Assert.searchRequestState(Reducer, Actions.SEARCH, initialState)
  ).toBe(true);
});

test('should handle REQUEST actions correctly', () => {
  const actionTypes = [
    REQUEST(Actions.FETCH_COLLECTION),
    REQUEST(Actions.FETCH_ENTITY),
    REQUEST(Actions.CREATE),
    REQUEST(Actions.UPDATE),
    REQUEST(Actions.ARCHIVE),
  ];
  expect(
    Assert.requestState(Reducer, actionTypes, initialState)
  ).toBe(true);
});

test('should handle SUCCESS actions correctly', () => {
  const actionTypes = [
    SUCCESS(Actions.FETCH_COLLECTION),
    SUCCESS(Actions.FETCH_ENTITY),
    SUCCESS(Actions.CREATE),
    SUCCESS(Actions.UPDATE),
    SUCCESS(Actions.ARCHIVE),
  ];
  expect(
    Assert.successState(Reducer, actionTypes, initialState, Fixtures.collection)
  ).toBe(true);
});

test('should handle FAILURE actions correctly', () => {
  const actionTypes = [
    FAILURE(Actions.FETCH_COLLECTION),
    FAILURE(Actions.FETCH_ENTITY),
    FAILURE(Actions.CREATE),
    FAILURE(Actions.UPDATE),
    FAILURE(Actions.ARCHIVE),
  ];
  expect(
    Assert.failureState(Reducer, actionTypes, initialState, Fixtures.error)
  ).toBe(true);
});
