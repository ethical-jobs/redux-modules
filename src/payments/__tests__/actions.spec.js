import Payments from 'payments';
const { actions } = Payments;

const params = { foo: 'bar', bar: 'foo' };

test('purchase creates correct action', () => {
  expect(actions.purchase(params)).toEqual({
    type: actions.PURCHASE,
    payload: new Promise(() => {}),
  });
});