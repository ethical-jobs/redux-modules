import Credits from 'credits';

const params = { foo: 'bar', bar: 'foo' };

const { actions } = Credits;

test('purchase creates correct action', () => {
  expect(actions.purchase(params)).toEqual({
    type: actions.PURCHASE,
    payload: new Promise(() => {}),
  });
});

