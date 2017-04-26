import Immutable from 'immutable';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import Taxonomies from 'taxonomies';

const { selectors } = Taxonomies;


test('rootSelector returns correct state slice ', () => {
  expect(
    Assert.rootSelector('taxonomies', selectors.rootSelector)
  ).toBe(true);
});

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assert.fetchingSelector('taxonomies', selectors.fetchingSelector)
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


