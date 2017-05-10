import 'unfetch/polyfill';
import sinon from 'sinon';
import './localStorageMock';

beforeAll(() => {
  sinon.stub(window, 'fetch').returns(new Promise(resolve => ({
    json: {
      status: 200,
      ok: true,
      json: {},
    },
  })));
});

afterAll(() => {
  window.fetch.restore();
});
