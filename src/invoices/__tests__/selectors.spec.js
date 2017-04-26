import Immutable from 'immutable';
import { fromJS } from 'ethical-jobs-redux/lib/utils/immutable';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import Invoices from 'invoices';

const { selectors } = Invoices;

test('rootSelector returns correct state slice ', () => {
  expect(
    Assert.rootSelector('invoices', selectors.rootSelector)
  ).toBe(true);
});

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assert.fetchingSelector('invoices', selectors.fetchingSelector)
  ).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  expect(
    Assert.filtersSelector('invoices', selectors.filtersSelector)
  ).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  expect(
    Assert.resultSelector('invoices', selectors.resultSelector)
  ).toBe(true);
});

test('invoicesSelector selector returns correct state slice', () => {
  expect(
    Assert.entitiesSelector('invoices', 'invoices', selectors.invoicesSelector)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single invoice selector
|--------------------------------------------------------------------------
*/

test('invoiceByIdSelector selector returns correct state slice', () => {
  const state = fromJS({
    entities: {
      invoices: {
        entities: {
          invoices: {
            55425: 'foo-bar-bam',
          },
        },
        result: 55425,
      },
    }
  });
  const result = selectors.invoiceByIdSelector(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});


/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

test('invoicesByFiltersSelector can filter by ... filters', () => {
  const invoices = fromJS({
    51: {
      id: 51,
      organisation_id: 15,
    },
    52: {
      id: 52,
      organisation_id: 8,
    },
    53: {
      id: 53,
      organisation_id: 15,
    },
  });
  const filters = fromJS({
    organisationId: 15,
  });
  const result = selectors.invoicesByFiltersSelector.resultFunc(invoices, filters);
  expect(Immutable.is(result.keySeq(), Immutable.Seq(['51','53']))).toBe(true);
});
