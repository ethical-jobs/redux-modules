import Immutable from 'immutable';
import { Assertions } from 'ethical-jobs-redux';
import Taxonomies from 'taxonomies';

const { selectors } = Taxonomies;

test('fetching returns correct state slice ', () => {
  expect(
    Assertions.fetchingSelector('taxonomies', selectors.fetching)
  ).toBe(true);
});

test('taxonomies returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      taxonomies: {
        taxonomies: 'foo-bar-bam',
      },
    }
  });
  return expect(Immutable.is('foo-bar-bam', selectors.taxonomies(state))).toBe(true);
});

describe('orderedTaxonomy selector', () => {

  const state = Immutable.fromJS({
    entities: {
      taxonomies: {
        taxonomies: {
          "categories": {
            "ksi8": {
              "id": 2,
              "slug": "bravo",
              "title": "bravo"
            },
            "3k8s": {
              "id": 1,
              "slug": "zulu",
              "title": "zulu"
            },
            "mkd9": {
              "id": 4,
              "slug": "yankee",
              "title": "yankee"
            },
            "ls93": {
              "id": 3,
              "slug": "alpha",
              "title": "alpha"
            },
          },
          "locations": {
            "1": { "id": 1, "slug": "VIC", "title": "Melbourne" },
          },
          "sectors": {
            "1": { "id": 1, "slug": "Business and Private Sector", "title": "Business/Private Sector" },
          },
          "workTypes": {
            "1": { "id": 1, "slug": "CASUAL", "title": "Casual" },
          },
        },
      },
    }
  });

  test('orderedTaxonomy ALWAYS returns an OrderedMap', () => {
    const actual = selectors.orderedTaxonomy(state, 'categories');
    expect(Immutable.isOrdered(actual)).toBe(true);
    expect(Immutable.OrderedMap.isOrderedMap(actual)).toBe(true);
  });

  test('orderedTaxonomy returns correct state slice', () => {
    const expected = state.getIn(['entities','taxonomies','taxonomies','categories']);
    const actual = selectors.orderedTaxonomy(state, 'categories');
    expect(Immutable.isOrdered(actual)).toBe(true);
  });

  test('orderedTaxonomy returns taxonomy ordered by title by default', () => {
    const expected = Immutable.OrderedMap({
      'ls93': 'alpha',
      'ksi8': 'bravo',
      'mkd9': 'yankee',
      '3k8s': 'zulu',
    });
    const actualTitles = selectors
      .orderedTaxonomy(state, 'categories', undefined)
      .map(term => term.get('title'));
    expect(Immutable.is(expected, actualTitles)).toBe(true);
  });

  test('orderedTaxonomy can order by numeric properties', () => {
    const expectedIds = Immutable.OrderedMap({
      '3k8s': 1,
      'ksi8': 2,
      'ls93': 3,
      'mkd9': 4,
    });
    const actualIds = selectors.orderedTaxonomy(state, 'categories', 'id')
      .map(term => term.get('id'));
    expect(Immutable.is(expectedIds, actualIds)).toBe(true);
  });
});


describe('orderedTaxonomyWithJobs selector', () => {

  const state = Immutable.fromJS({
    entities: {
      taxonomies: {
        taxonomies: {
          "categories": {
            "ksi8": {
              "id": 2,
              "slug": "bravo",
              "title": "bravo",
              "job_count": 100,
            },
            "3k8s": {
              "id": 1,
              "slug": "zulu",
              "title": "zulu",
              "job_count": 0,
            },
            "mkd9": {
              "id": 4,
              "slug": "yankee",
              "title": "yankee",
              "job_count": 1,
            },
            "ls93": {
              "id": 3,
              "slug": "alpha",
              "title": "alpha",
              "job_count": 0,
            },
          },
        },
      },
    }
  });

  test('orderedTaxonomyWithJobs ALWAYS returns an OrderedMap', () => {
    const actual = selectors.orderedTaxonomyWithJobs(state, 'categories');
    expect(Immutable.isOrdered(actual)).toBe(true);
    expect(Immutable.OrderedMap.isOrderedMap(actual)).toBe(true);
  });

  test('orderedTaxonomyWithJobs returns correct state slice', () => {
    const expected = state.getIn(['entities','taxonomies','taxonomies','categories']);
    const actual = selectors.orderedTaxonomyWithJobs(state, 'categories');
    expect(Immutable.isOrdered(actual)).toBe(true);
  });

  test('orderedTaxonomyWithJobs only includes terms with jobs', () => {
    const expectedCount = Immutable.OrderedMap({
      'ksi8': 100,
      'mkd9': 1,
    });
    const actualIds = selectors.orderedTaxonomyWithJobs(state, 'categories')
      .map(term => term.get('job_count'));
    expect(Immutable.is(expectedCount, actualIds)).toBe(true);
  });
});

