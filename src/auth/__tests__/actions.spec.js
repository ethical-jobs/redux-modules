import Auth from 'auth';

const params = { foo: 'bar', bar: 'foo' };

const { actions } = Auth;

test('login creates correct action', () => {
  expect(actions.login(params)).toEqual({
    type: actions.LOGIN,
    payload: new Promise(() => {}),
  });
});

test('logout creates correct action', () => {
  expect(actions.logout(params)).toEqual({
    type: actions.LOGOUT,
    payload: new Promise(() => {}),
  });
});

test('load action creates correct action', () => {
  localStorage.setItem('_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3NzU2MDQ3YTBjZDA5OWYyNTBmOGQzOWEzMzdkYmFkYWE2NzNjMWMyMzY5OGI5MTBkMzFmMWI3Y2YzNmU3ZmE1ZmE4MWIwYjBiODM1N2FiIn0.eyJhdWQiOiIyIiwianRpIjoiMzc3NTYwNDdhMGNkMDk5ZjI1MGY4ZDM5YTMzN2RiYWRhYTY3M2MxYzIzNjk4YjkxMGQzMWYxYjdjZjM2ZTdmYTVmYTgxYjBiMGI4MzU3YWIiLCJpYXQiOjE1MTgxMDk1NjcsIm5iZiI6MTUxODEwOTU2NywiZXhwIjoxNTQ5NjQ1NTY3LCJzdWIiOiI1MTUxIiwic2NvcGVzIjpbXX0.GfRzS-TEpKF6TSKjIb5fZvBEZyt9wM4cRp_GzkOrtUxghIBWj_xytZdy5L2RW3BGTCV5g4VnjuUZb6RWptmaR0gv26JQ67Lb92kFuPdT983jR9vfMbumJ7NjjKa_y99jFSBNnyLmpTglDq2luk1vAFE_v5U0gzZi_MfuAbXj7ciGUx_oJH9p3gJumdOzkA2s7hxUow6Oi7_v9lYLW4qW8f9Qvg-GBaiCE3TgMQafnZ3IZVLI1wfw0lPc_S3ZTz9dsc8zrfmJ67PPGWL7N3iKCfJp1UbsLCFKihgh9aTVZqOqb1_orVhHrI_hu2EAxFsitofCHDpRjMgWSgL8eqlPXLVhspATu6oN1GiWD8z7p2e6txEnGsSMGeBHxA5t9qgMevPB3R9YI7YwjLo-DuOizY1XuOOADxP5fKARR8YAjwAXDz_M9iRMWesHjtRTPtGy63WVlM08dUiS9dHtOKpP_rVfvsthxch7yUE1AFTf551iXtP0XOIKVQXeD90axq__9hnWqYsM9G6ZysmAyR935O-3b9CYqcXC4-OB0u3PDq7hquhLxjCWUcrgm0YpZF3UNEg-u4CRZuptjHiZetD85TII9N9K26F_fYVPBbtG7eCD874tcz-n3ebSiWAraqdCAz6J39SYD0wCWH9w-9HP1-K_RpAldwUaAoW_5yjlx5Y');
  expect(actions.load(params)).toEqual({
    type: actions.LOAD,
    payload: new Promise(() => {}),
  });
});

test('recover action creates correct action', () => {
  expect(actions.recover(params)).toEqual({
    type: actions.RECOVER,
    payload: new Promise(() => {}),
  });
});

test('reset action creates correct action', () => {
  expect(actions.reset(params)).toEqual({
    type: actions.RESET,
    payload: new Promise(() => {}),
  });
});
