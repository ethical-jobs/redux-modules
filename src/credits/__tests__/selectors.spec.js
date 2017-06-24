import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Credits from 'credits';

const { selectors } = Credits;

test('fetching returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('credits', selectors.fetching)
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
  return expect(Immutable.is('foo-bar-bam', selectors.creditPacks(state))).toBe(true);
});
