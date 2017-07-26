/* eslint-disable no-console */
import storeFactory from '../src/store';
import * as actions from '../src/actions';

describe('Store Factory', () => {
  beforeAll(() => {
    console.groupCollapsed = jest.fn();
    console.log = jest.fn();
    console.groupEnd = jest.fn();
  });

  afterEach(() => jest.resetAllMocks());

  describe('Logging', () => {
    let store;

    beforeEach(() => {
      store = storeFactory({});
      store.dispatch({
        type: actions.RECEIVED_VERSION,
      });
    });

    it('starts a console group', () =>
      expect(console.groupCollapsed.mock.calls.length).toBe(0),
    );

    it('logs state before action and state after', () => {
      const rows = console.log.mock.calls.map(args => args[0]);
      rows.shift();
      expect(rows)
        .toEqual([
          '%c prev state',
          '%c action    ',
          '%c next state',
        ]);
    });

    it('ends the console group', () =>
      expect(console.groupEnd.mock.calls.length).toBe(1),
    );
  });
});
