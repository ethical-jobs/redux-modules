import Immutable from 'immutable';
import { fromJS } from 'ethical-jobs-redux/lib/utils/immutable';
import { APPROVED, PENDING, DRAFT } from 'jobs/statuses';
import * as Assert from 'ethical-jobs-redux/lib/testing/assertions';
import Jobs from 'jobs';

const { selectors } = Jobs;

test('rootSelector returns correct state slice ', () => {
  expect(
    Assert.rootSelector('jobs', selectors.rootSelector)
  ).toBe(true);
});

test('fetchingSelector returns correct state slice', () => {
  expect(
    Assert.fetchingSelector('jobs', selectors.fetchingSelector)
  ).toBe(true);
});

test('filtersSelector returns correct state slice', () => {
  expect(
    Assert.filtersSelector('jobs', selectors.filtersSelector)
  ).toBe(true);
});

test('resultSelector selector returns correct state slice', () => {
  expect(
    Assert.resultSelector('jobs', selectors.resultSelector)
  ).toBe(true);
});

test('jobsSelector selector returns correct state slice', () => {
  expect(
    Assert.entitiesSelector('jobs', 'jobs', selectors.jobsSelector)
  ).toBe(true);
});

test('organisationsSelector selector returns correct state slice', () => {
  expect(
    Assert.entitiesSelector('jobs', 'organisations', selectors.organisationsSelector)
  ).toBe(true);
});

/*
|--------------------------------------------------------------------------
| Single job selector
|--------------------------------------------------------------------------
*/

test('jobByIdSelector selector returns correct state slice', () => {
  const state = fromJS({
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
  const jobs = fromJS({
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
    53: {
      id: 53,
      organisation_id: 15,
      status: PENDING,
      expired: true,
      categories: [10,20,30],
      locations: [10,20,30],
      workTypes: [10,20,30],
      sectors: [20,30,13],
    },
  });
  const filters = fromJS({
    organisationId: 15,
    status: PENDING,
    expired: true,
    categories: [20,30],
    locations: [20,30],
    sectors: [20,30],
    workTypes: [20,30,13],
  });
  const result = selectors.jobsByFiltersSelector.resultFunc(jobs, filters);
  expect(Immutable.is(result.keySeq(), Immutable.Seq(['51','53']))).toBe(true);
});
