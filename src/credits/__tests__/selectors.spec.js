import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Credits from 'credits';

const { selectors } = Credits;

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('credits', selectors.fetchingSelector)
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
