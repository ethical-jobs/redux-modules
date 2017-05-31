import App from 'app';

test('fetchAppData creates correct async action', () => {
  expect(App.actions.fetchAppData()).toEqual({
    type: App.actions.FETCH_APP_DATA,
    payload: new Promise(() => {}),
  });
});

test('uploadMedia creates correct async action', () => {
  expect(App.actions.uploadMedia()).toEqual({
    type: App.actions.UPLOAD_MEDIA,
    payload: new Promise(() => {}),
  });
});
