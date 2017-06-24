import Immutable from 'immutable';
import { APPROVED, PENDING, DRAFT } from 'jobs/statuses';
import { Assertions } from 'ethical-jobs-redux';
import Auth from 'auth';

const { selectors } = Auth;

test('fetching returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('auth', selectors.fetching)
  ).toBe(true);
});

test('result returns correct state slice', () => {
  expect(
    Assertions.resultSelector('auth', selectors.result)
  ).toBe(true);
});

test('users returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('auth', 'users', selectors.users)
  ).toBe(true);
});

test('organisations returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('auth', 'organisations', selectors.organisations)
  ).toBe(true);
});

test('authedUser returns correct state slice', () => {
  const users = Immutable.fromJS({
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
  const result = selectors.authedUser.resultFunc(users, 15);
  expect(result.get('first_name')).toBe('Andrew');
});

test('authedOrganisationSelector returns correct state slice', () => {
  const organisations = Immutable.fromJS({
    15: {
      id: 15,
      title: 'Red Cross Australia',
    },
    20: {
      id: 20,
      title: 'Mission Australia',
    },
  });
  const user = Immutable.fromJS({
    id: 15,
    organisation_id: 20,
    first_name: 'Andrew',
  });
  const result = selectors.authedOrganisation.resultFunc(organisations, user);
  expect(result.get('title')).toBe('Mission Australia');
});