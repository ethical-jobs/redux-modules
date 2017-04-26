import Immutable from 'immutable';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import Enumerables from 'enumerables';

const { selectors } = Enumerables;

test('rootSelector returns correct state slice ', () => {
  expect(
    Assert.rootSelector('enumerables', selectors.rootSelector)
  ).toBe(true);
});

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assert.fetchingSelector('enumerables', selectors.fetchingSelector)
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
