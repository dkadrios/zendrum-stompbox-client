import deepFreeze from 'deep-freeze';
import storeFactory from '../../src/store';
import { stompblockFound, stompblockMissing } from '../../src/action-creators/stompblock';

describe('stompblock actions', () => {
  let store;

  const stompblock = {
    accessGranted: false,
    found: false,
  };

  deepFreeze(stompblock);

  describe('stompblockFound', () => {
    beforeAll(() => {
      store = storeFactory({ stompblock }, false, true);
      store.dispatch(stompblockFound());
    });

    it('should report found', () => {
      expect(store.getState().stompblock.found).toBeTruthy();
    });
  });

  describe('stompblockMissing', () => {
    beforeAll(() => {
      store = storeFactory({ stompblock }, false, true);
      store.dispatch(stompblockMissing());
    });

    it('should report found', () => {
      expect(store.getState().stompblock.found).toBeFalsy();
    });
  });
});
