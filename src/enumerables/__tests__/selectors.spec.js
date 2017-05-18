import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Enumerables from 'enumerables';

const { selectors } = Enumerables;

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('enumerables', selectors.fetchingSelector)
  ).toBe(true);
});

test('enumerablesSelector returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      enumerables: {
        enumerables: 'foo-bar-bam',
      },
    }
  });
  return expect(Immutable.is('foo-bar-bam', selectors.enumerablesSelector(state))).toBe(true);
});
