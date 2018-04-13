import { Assertions } from 'ethical-jobs-redux';
import Immutable from 'immutable';
import Activities from 'activities';

const { selectors } = Activities;

test('fetching returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('activities', selectors.fetching)
  ).toBe(true);
});

test('filters returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('activities', selectors.filters)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

test('filteredActivity can filter by ... filters', () => {
  const activities = Immutable.fromJS({
    51: {
      id: 51,
      subject_id: 15,
    },
    52: {
      id: 52,
      subject_id: 8,
    },
    53: {
      id: 53,
      subject_id: 15,
    },
  });
  const filters = Immutable.fromJS({
    organisations: 15,
  });

  const result = selectors.filteredActivities.resultFunc(activities, filters);
  expect(Immutable.is(result.keySeq(), Immutable.Seq(['51','53']))).toBe(true);
});