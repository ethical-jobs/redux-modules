import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Organisations from 'organisations';

const { selectors } = Organisations;

test('fetching returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('organisations', selectors.fetching)
  ).toBe(true);
});

test('filters returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('organisations', selectors.filters)
  ).toBe(true);
});

test('result selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('organisations', selectors.result)
  ).toBe(true);
});

test('organisations selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('organisations', 'organisations', selectors.organisations)
  ).toBe(true);
});

test('users selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('organisations', 'users', selectors.users)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single organisation selector
|--------------------------------------------------------------------------
*/

test('organisationByResult selector returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      organisations: {
        entities: {
          organisations: {
            55425: 'foo-bar-bam',
          },
        },
        result: 55425,
      },
    }
  });
  const result = selectors.organisationByResult(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Organisation owner selector
|--------------------------------------------------------------------------
*/

test('organisationOwner selector returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      organisations: {
        entities: {
          organisations: {
            55425: {
              owner_id: 33,
              name: 'Ethical Logs',
            },
          },
          users: {
            33: 'Andrew McLagan',
          },
        },
        result: 55425,
      },
    }
  });
  const result = selectors.organisationOwner(state);
  expect(Immutable.is('Andrew McLagan', result)).toBe(true);
});
