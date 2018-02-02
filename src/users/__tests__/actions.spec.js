import Users from 'users';

const { actions } = Users;

const params = { foo: 'bar', bar: 'foo' };

test('clear creates correct action', () => {
  expect(actions.clear()).toEqual({
    type: actions.CLEAR_ENTITIES,
  });
});

test('updateFilters creates correct action', () => {
  expect(actions.updateFilters(params)).toEqual({
    type: actions.UPDATE_FILTERS,
    payload: params,
  });
});

test('replaceFilters creates correct action', () => {
  expect(actions.replaceFilters(params)).toEqual({
    type: actions.REPLACE_FILTERS,
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

test('patch action creates correct action', () => {
  expect(actions.patch(123, params)).toEqual({
    type: actions.PATCH,
    payload: new Promise(() => {}),
  });
});

test('archive action creates correct action', () => {
  expect(actions.archive(123)).toEqual({
    type: actions.ARCHIVE,
    payload: new Promise(() => {}),
  });
});

test('restore action creates correct action', () => {
  expect(actions.restore(123)).toEqual({
    type: actions.RESTORE,
    payload: new Promise(() => {}),
  });
});
