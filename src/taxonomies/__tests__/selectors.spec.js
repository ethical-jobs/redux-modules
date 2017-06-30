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
            "2": {
              "id": 2,
              "slug": "bravo",
              "title": "bravo"
            },
            "1": {
              "id": 1,
              "slug": "zulu",
              "title": "zulu"
            },
            "3": {
              "id": 3,
              "slug": "alpha",
              "title": "alpha"
            },
            "4": {
              "id": 4,
              "slug": "yankee",
              "title": "yankee"
            },
          },
          "locations": {
            "1": {
              "id": 1,
              "slug": "VIC",
              "title": "Melbourne"
            },
          },
          "sectors": {
            "1": {
              "id": 1,
              "slug": "Business and Private Sector",
              "title": "Business/Private Sector"
            },
          },
          "workTypes": {
            "1": {
              "id": 1,
              "slug": "CASUAL",
              "title": "Casual"
            },
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
    const expected = Immutable.OrderedMap([
      ['3', 'alpha'],
      ['2', 'bravo'],
      ['4', 'yankee'],
      ['1', 'zulu'],
    ]);
    const actualTitles = selectors
      .orderedTaxonomy(state, 'categories', undefined)
      .map(term => term.get('title'));
    expect(Immutable.is(expected, actualTitles)).toBe(true);
  });

  test('orderedTaxonomy returns taxonomy ordered by {orderBy} param', () => {
    const expected = Immutable.OrderedMap([
      ['1', 1],
      ['2', 2],
      ['3', 3],
      ['4', 4],
    ]);
    const actualIds = selectors
      .orderedTaxonomy(state, 'categories', 'id')
      .map(term => term.get('id'));
    expect(Immutable.is(expected, actualIds)).toBe(true);
  });
});


