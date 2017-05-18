import Immutable from 'immutable';
import { ImmutableUtils, Assertions } from 'ethical-jobs-redux';
import { APPROVED, PENDING, DRAFT } from 'jobs/statuses';
import Jobs from 'jobs';

const { selectors } = Jobs;

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('jobs', selectors.fetchingSelector)
  ).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  expect(
    Assertions.filtersSelector('jobs', selectors.filtersSelector)
  ).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  expect(
    Assertions.resultSelector('jobs', selectors.resultSelector)
  ).toBe(true);
});

test('jobsSelector selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('jobs', 'jobs', selectors.jobsSelector)
  ).toBe(true);
});

test('organisationsSelector selector returns correct state slice', () => {
  expect(
    Assertions.entitiesSelector('jobs', 'organisations', selectors.organisationsSelector)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single job selector
|--------------------------------------------------------------------------
*/

test('jobByIdSelector selector returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      jobs: {
        entities: {
          jobs: {
            55425: 'foo-bar-bam',
          },
        },
        result: 55425,
      },
    }
  });
  const result = selectors.jobByIdSelector(state);
  expect(Immutable.is('foo-bar-bam', result)).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

test('jobsByFiltersSelector can filter by ... filters', () => {
  const jobs = Immutable.fromJS({
    51: {
      id: 51,
      organisation_id: 15,
      status: PENDING,
      expired: true,
      categories: [10,20,30],
      locations: [10,20,30],
      workTypes: [10,20,30],
      sectors: [20,30,13,33],
    },
    52: {
      id: 52,
      organisation_id: 8,
      status: APPROVED,
      expired: true,
      categories: [10,20,30],
      locations: [10,20,30],
      workTypes: [10,20,30],
      sectors: [20,30,13],
    },
    53: { // <<-- This job should be selected
      id: 53,
      organisation_id: 15,
      status: PENDING,
      expired: true,
      categories: [10,20,30],
      locations: [10,201,30],
      workTypes: [10,20,301],
      sectors: [20,30,13],
    },
  }).toList(); // << NOTE: we are convertion to a list
  const filters = Immutable.fromJS({
    organisationId: 15,
    status: PENDING,
    expired: true,
    categories: [10,20,30,40,50],
    locations: [10,201],
    sectors: [20],
    workTypes: [301],
  });
  const result = selectors.jobsByFiltersSelector.resultFunc(jobs, filters);
  expect(result.includes(jobs.get(2))).toBe(true);
});
