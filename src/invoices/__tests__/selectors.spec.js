import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Invoices from 'invoices';

const { selectors } = Invoices;

test('fetchingSelector returns correct state slice ', () => {
  expect(
    Assertions.fetchingSelector('invoices', selectors.fetchingSelector)
  ).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('invoices', selectors.filtersSelector)
  ).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('invoices', selectors.resultSelector)
  ).toBe(true);
});

test('invoicesSelector selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('invoices', 'invoices', selectors.invoicesSelector)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single invoice selector
|--------------------------------------------------------------------------
*/

test('invoiceByIdSelector selector returns correct state slice', () => {
  const state = Immutable.fromJS({
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
  const invoices = Immutable.fromJS({
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
  const filters = Immutable.fromJS({
    organisationId: 15,
  });
  const result = selectors.invoicesByFiltersSelector.resultFunc(invoices, filters);
  expect(Immutable.is(result.keySeq(), Immutable.Seq(['51','53']))).toBe(true);
});
