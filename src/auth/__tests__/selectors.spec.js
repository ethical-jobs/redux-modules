import Immutable from 'immutable';
import { fromJS } from 'ethical-jobs-redux/lib/utils/immutable';
import { APPROVED, PENDING, DRAFT } from 'jobs/statuses';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import Auth from 'auth';

const { selectors } = Auth;

test('rootSelector returns correct state slice ', () => {
  expect(
    Assert.rootSelector('auth', selectors.rootSelector)
  ).toBe(true);
});

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assert.fetchingSelector('auth', selectors.fetchingSelector)
  ).toBe(true);
});

test('resultSelector returns correct state slice', () => {
  expect(
    Assert.resultSelector('auth', selectors.resultSelector)
  ).toBe(true);
});

test('usersSelector returns correct state slice', () => {
  expect(
    Assert.entitiesSelector('auth', 'users', selectors.usersSelector)
  ).toBe(true);
});

test('orgsSelector returns correct state slice', () => {
  expect(
    Assert.entitiesSelector('auth', 'organisations', selectors.orgsSelector)
  ).toBe(true);
});

test('authedUserSelector returns correct state slice', () => {
  const users = fromJS({
    15: {
      id: 15,
      organisation_id: 20,
      first_name: 'Andrew',
    },
    20: {
      id: 20,
      organisation_id: 15,
      first_name: 'Bob',
    },
  });
  const result = selectors.authedUserSelector.resultFunc(users, 15);
  expect(result.get('first_name')).toBe('Andrew');
});

test('authedOrganisationSelector returns correct state slice', () => {
  const organisations = fromJS({
    15: {
      id: 15,
      title: 'Red Cross Australia',
    },
    20: {
      id: 20,
      title: 'Mission Australia',
    },
  });
  const user = fromJS({
    id: 15,
    organisation_id: 20,
    first_name: 'Andrew',
  });
  const result = selectors.authedOrganisationSelector.resultFunc(organisations, user);
  expect(result.get('title')).toBe('Mission Australia');
});