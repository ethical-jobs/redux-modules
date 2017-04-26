import Immutable from 'immutable';
import { fromJS } from 'ethical-jobs-redux/lib/utils/immutable';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import Organisations from 'organisations';

const { selectors } = Organisations;

test('rootSelector returns correct state slice ', () => {
  expect(
    Assert.rootSelector('organisations', selectors.rootSelector)
  ).toBe(true);
});

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assert.fetchingSelector('organisations', selectors.fetchingSelector)
  ).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  expect(
    Assert.filtersSelector('organisations', selectors.filtersSelector)
  ).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  expect(
    Assert.resultSelector('organisations', selectors.resultSelector)
  ).toBe(true);
});

test('organisationsSelector selector returns correct state slice', () => {
  expect(
    Assert.entitiesSelector('organisations', 'organisations', selectors.organisationsSelector)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single organisation selector
|--------------------------------------------------------------------------
*/

test('organisationByIdSelector selector returns correct state slice', () => {
  const state = fromJS({
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
