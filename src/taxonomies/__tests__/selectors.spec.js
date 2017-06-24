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

test('orderedTaxonomy returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      taxonomies: {
        taxonomies: {
          "categories": {
            "1": {
              "id": 1,
              "slug": "zulu",
              "title": "zulu"
            },
            "2": {
              "id": 2,
              "slug": "bravo",
              "title": "bravo"
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
  const expected = state.getIn(['entities','taxonomies','taxonomies','categories']);
  const actual = selectors.orderedTaxonomy(state, 'categories');
  expect(Immutable.isOrdered(actual)).toBe(true);
  const asList = actual.toList();
  expect(asList.get(0).get('title')).toBe('alpha');
  expect(asList.get(1).get('title')).toBe('bravo');
  expect(asList.get(2).get('title')).toBe('yankee');
  expect(asList.get(3).get('title')).toBe('zulu');
});



