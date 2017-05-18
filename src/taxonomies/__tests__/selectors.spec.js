import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Taxonomies from 'taxonomies';

const { selectors } = Taxonomies;

test('fetchingSelector returns correct state slice ', () => {
  expect(
    Assertions.fetchingSelector('taxonomies', selectors.fetchingSelector)
  ).toBe(true);
});

test('taxonomiesSelector returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      taxonomies: {
        taxonomies: 'foo-bar-bam',
      },
    }
  });
  return expect(Immutable.is('foo-bar-bam', selectors.taxonomiesSelector(state))).toBe(true);
});


