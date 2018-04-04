import Subscriptions from 'subscriptions';
const { actions } = Subscriptions;

const params = { foo: 'bar', bar: 'foo' };

test('create creates correct action', () => {
  expect(actions.create(params)).toEqual({
    type: actions.CREATE,
    payload: new Promise(() => {}),
  });
});

test('fetchCollection creates correct action', () => {
  expect(actions.fetchCollection(params)).toEqual({
    type: actions.FETCH_COLLECTION,
    payload: new Promise(() => {}),
  });
});


test('fetchEntity creates correct action', () => {
  expect(actions.fetchEntity(params)).toEqual({
    type: actions.FETCH_ENTITY,
    payload: new Promise(() => {}),
  });
});

test('destroy creates correct action', () => {
  expect(actions.destroy(params)).toEqual({
    type: actions.DELETE,
    payload: new Promise(() => {}),
  });
});

test('update creates correct action', () => {
  expect(actions.confirm(params)).toEqual({
    type: actions.CONFIRM,
    payload: new Promise(() => {}),
  });
});