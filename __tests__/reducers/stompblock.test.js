import deepFreeze from 'deep-freeze';
import { RECEIVE_DEVICE_LIST } from 'redux-midi';
import { STOMPBLOCK_FOUND, STOMPBLOCK_MISSING } from '../../src/actions';
import stompblock from '../../src/reducers/stompblock';

describe('stompblock reducer', () => {
  const initialState = {
    accessGranted: false,
    found: false,
  };
  deepFreeze(initialState);

  it('stompblockFound success', () => {
    const action = {
      type: STOMPBLOCK_FOUND,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        found: true,
      });
  });

  it('stompblockMissing success', () => {
    const action = {
      type: STOMPBLOCK_MISSING,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        found: false,
      });
  });

  it('receivedDeviceList success', () => {
    const action = {
      type: RECEIVE_DEVICE_LIST,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        accessGranted: true,
      });
  });
});
