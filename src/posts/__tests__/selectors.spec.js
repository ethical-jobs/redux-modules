import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Posts from 'posts';

const { selectors } = Posts;

test('fetchingSelector returns correct state slice ', () => {
  expect(
    Assertions.fetchingSelector('posts', selectors.fetchingSelector)
  ).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('posts', selectors.filtersSelector)
  ).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('posts', selectors.resultSelector)
  ).toBe(true);
});

test('postsSelector selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('posts', 'posts', selectors.postsSelector)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single post selector
|--------------------------------------------------------------------------
*/

test('postByIdSelector selector returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      posts: {
        entities: {
          posts: {
            554: 'foo-bar-bam',
          },
        },
        result: 554,
      },
    }
  });
  const result = selectors.postByIdSelector(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});
