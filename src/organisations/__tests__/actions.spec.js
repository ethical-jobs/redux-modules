import Organisations from 'organisations';

const { actions } = Organisations;

const params = { foo: 'bar', bar: 'foo' };

test('clearOrganisations creates correct action', () => {
  expect(actions.clearOrganisations()).toEqual({
    type: actions.CLEAR_ENTITIES,
  });
});

test('updateFilters creates correct action', () => {
  expect(actions.updateFilters(params)).toEqual({
    type: actions.UPDATE_FILTERS,
    payload: params,
  });
});

test('fetchCollection creates correct action', () => {
  expect(actions.fetchCollection(params)).toEqual({
    type: actions.FETCH_COLLECTION,
    payload: new Promise(() => {}),
  });
});

test('fetchEntity creates correct action', () => {
  expect(actions.fetchEntity(123)).toEqual({
    type: actions.FETCH_ENTITY,
    payload: new Promise(() => {}),
  });
});

test('create action creates correct action', () => {
  expect(actions.create(params)).toEqual({
    type: actions.CREATE,
    payload: new Promise(() => {}),
  });
});

test('update action creates correct action', () => {
  expect(actions.update(123, params)).toEqual({
    type: actions.UPDATE,
    payload: new Promise(() => {}),
  });
});

test('archive action creates correct action', () => {
  expect(actions.archive(123)).toEqual({
    type: actions.ARCHIVE,
    payload: new Promise(() => {}),
  });
});

test('createCredits action creates correct action', () => {
  expect(actions.createCredits(123)).toEqual({
    type: actions.CREATE_CREDITS,
    payload: new Promise(() => {}),
  });
});

test('deductCredits action creates correct action', () => {
  expect(actions.deductCredits(123)).toEqual({
    type: actions.DEDUCT_CREDITS,
    payload: new Promise(() => {}),
  });
});

