import Immutable from 'immutable';
import { Assertions } from '@ethical-jobs/redux';
import Payments from 'payments';

const { selectors } = Payments;

test('fetching returns correct state slice ', () => {
  expect(
    Assertions.fetchingSelector('payments', selectors.fetching)
  ).toBe(true);
});

