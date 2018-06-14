import Immutable from 'immutable';
import { Assertions } from '@ethical-jobs/redux';
import Subscriptions from 'subscriptions';

const { selectors } = Subscriptions;

test('fetching returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('subscriptions', selectors.fetching)
  ).toBe(true);
});

test('result selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('subscriptions', selectors.result)
  ).toBe(true);
});

test('subscriptions selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('subscriptions', 'subscriptions', selectors.subscriptions)
  ).toBe(true);
});

test('alerts selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('subscriptions', 'alerts', selectors.alerts)
  ).toBe(true);
});
