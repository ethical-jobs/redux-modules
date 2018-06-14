import Immutable from 'immutable';
import { Assertions } from '@ethical-jobs/redux';
import Enumerables from 'enumerables';

const { selectors } = Enumerables;

test('fetching returns correct state slice', () => {
  expect(
    Assertions.fetchingSelector('enumerables', selectors.fetching)
  ).toBe(true);
});

test('enumerables returns correct state slice', () => {
  const state = Immutable.fromJS({
    entities: {
      enumerables: {
        enumerables: 'foo-bar-bam',
      },
    }
  });
  expect(Immutable.is(
    'foo-bar-bam',
    selectors.enumerables(state)
  )).toBe(true);
});

test("orderedEnumerable returns correct state slice", () => {
  const state = Immutable.fromJS({
    entities: {
      enumerables: {
        enumerables: {
          states: {
            NSW: "New South Wales",
            QLD: "Queensland",
            VIC: "Victoria"
          },
          countries: {
            AU: "Australia",
            NZ: "New Zealand",
            GB: "England"
          }
        }
      }
    }
  });
  expect(Immutable.is(
    state.getIn(['entities', 'enumerables', 'enumerables', 'countries']),
    selectors.orderedEnumerable(state, 'countries').toMap()
  )).toBe(true);
});

test("orderedEnumerable returns correct order", () => {
  const state = Immutable.fromJS({
    entities: {
      enumerables: {
        enumerables: {
          states: {
            NSW: "New South Wales",
            QLD: "Queensland",
            VIC: "Victoria"
          },
          countries: {
            NZ: "New Zealand",
            AU: "Australia",
            ZB: "Zimbabwe",
            GB: "England"
          }
        }
      }
    }
  });
  const shouldBe = Immutable.fromJS({
    AU: "Australia",
    GB: "England",
    NZ: "New Zealand",
    ZB: "Zimbabwe",
  });
  expect(Immutable.is(
    selectors.orderedEnumerable(state, 'countries'),
    shouldBe.toOrderedMap()
  )).toBe(true);
});
