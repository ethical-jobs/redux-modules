import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Users from 'users';

const { selectors } = Users;

test('fetching returns correct state slice ', () => {
  expect(
    Assertions.fetchingSelector('users', selectors.fetching)
  ).toBe(true);
});

test('filters returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('users', selectors.filters)
  ).toBe(true);
});

test('result selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('users', selectors.result)
  ).toBe(true);
});

test('users selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('users', 'users', selectors.users)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single user selector
|--------------------------------------------------------------------------
*/

test('userByResult selector returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      users: {
        entities: {
          users: {
            55425: 'foo-bar-bam',
          },
        },
        result: 55425,
      },
    }
  });
  const result = selectors.userByResult(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});


/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

test('filteredUsers can filter by ... filters', () => {
  const users = Immutable.fromJS({
    51: {
      id: 51,
      roles: ['admin','relations-team'],
    },
    52: {
      id: 52,
      roles: ['staff-member','relations-team'],
    },
    53: {
      id: 53,
      roles: ['staff-member','customer-service-team'],
    },
  });
  const filters = Immutable.fromJS({
    roles: ['staff-member'],
  });
  const result = selectors.filteredUsers.resultFunc(users, filters);
  expect(Immutable.is(result.keySeq(), Immutable.Seq(['52','53']))).toBe(true);
});
