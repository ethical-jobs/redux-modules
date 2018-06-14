import Immutable from 'immutable';
import { Assertions } from '@ethical-jobs/redux';
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

describe('orderedPosts selector', () => {
  const posts = Immutable.fromJS({
    'x8haaw264': {
      id: 51,
      title: 'Alpha',
    },
    '83n927': {
      id: 53,
      title: 'Charlie',
    },
    'ms83bs7': {
      id: 52,
      title: 'Bravo',
    },
  });
  const results = Immutable.fromJS(['ms83bs7','x8haaw264','83n927']);

  test('orderedPosts selector returns OrderedMap', () => {
    const result = selectors.orderedPosts.resultFunc(posts, results);
    expect(Immutable.OrderedMap.isOrderedMap(result)).toBe(true);
  });

  test('orderedPosts selector returns correct order', () => {
    const result = selectors.orderedPosts.resultFunc(posts, results);
    expect(result.toList().get(0).get('id')).toBe(52);
    expect(result.toList().get(1).get('id')).toBe(51);
    expect(result.toList().get(2).get('id')).toBe(53);
  });
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
