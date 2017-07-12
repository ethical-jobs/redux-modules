import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Invoices from 'invoices';

const { selectors } = Invoices;

test('fetching returns correct state slice ', () => {
  expect(
    Assertions.fetchingSelector('invoices', selectors.fetching)
  ).toBe(true);
});

test('filters returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('invoices', selectors.filters)
  ).toBe(true);
});

test('result selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('invoices', selectors.result)
  ).toBe(true);
});

test('invoices selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('invoices', 'invoices', selectors.invoices)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single invoice selector
|--------------------------------------------------------------------------
*/

test('invoiceByResult selector returns correct state slice', () => {
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
  const result = selectors.invoiceByResult(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});


/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

test('filteredInvoices can filter by ... filters', () => {
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
    organisations: 15,
  });
  const result = selectors.filteredInvoices.resultFunc(invoices, filters);
  expect(Immutable.is(result.keySeq(), Immutable.Seq(['51','53']))).toBe(true);
});
