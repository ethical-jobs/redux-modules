import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Organisations from 'organisations';

const { selectors } = Organisations;

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('organisations', selectors.fetchingSelector)
  ).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('organisations', selectors.filtersSelector)
  ).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('organisations', selectors.resultSelector)
  ).toBe(true);
});

test('organisationsSelector selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('organisations', 'organisations', selectors.organisationsSelector)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single organisation selector
|--------------------------------------------------------------------------
*/

test('organisationByIdSelector selector returns correct state slice', () => {
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
  const result = selectors.organisationByIdSelector(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});
