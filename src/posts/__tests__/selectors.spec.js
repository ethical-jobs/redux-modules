import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Posts from 'posts';

const { selectors } = Posts;

test('fetching returns correct state slice ', () => {
  expect(
    Assertions.fetchingSelector('posts', selectors.fetching)
  ).toBe(true);
});

test('filters returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('posts', selectors.filters)
  ).toBe(true);
});

test('result selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('posts', selectors.result)
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

test('postByResult selector returns correct state slice', () => {
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
  const result = selectors.postByResult(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});
