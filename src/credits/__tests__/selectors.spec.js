import Immutable from 'immutable';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import Credits from 'credits';

const { selectors } = Credits;

test('rootSelector returns correct state slice ', () => {
  expect(
    Assert.rootSelector('credits', selectors.rootSelector)
  ).toBe(true);
});

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assert.fetchingSelector('credits', selectors.fetchingSelector)
  ).toBe(true);
});

test('creditPacks returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      credits: {
        creditPacks: 'foo-bar-bam',
      },
    }
  });
  return expect(Immutable.is('foo-bar-bam', selectors.creditPacksSelector(state))).toBe(true);
});
