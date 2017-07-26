import deepFreeze from 'deep-freeze';
import stompblock from '../../src/stompblock';
import version from '../../src/reducers/version';
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../../src/midi';
import * as actions from '../../src/actions';

describe('version reducer', () => {
  const initialState = {
    checked: false,
    client: CURRENT_CLIENT_VERSION,
    anvil: NaN,
    expectedAnvil: CURRENT_ANVIL_VERSION,
    serialNumber: '',
    userFirstName: '',
    userLastName: '',
    userEmail: '',
  };
  deepFreeze(initialState);

  it('checkingVersion success', () => {
    const action = {
      type: actions.GET_SYSEX_VERSION,
    };
    expect(version(initialState, action))
      .toEqual({
        ...initialState,
        checked: true,
      });
  });

  it('receivedVersion success', () => {
    const action = {
      type: actions.RECEIVED_VERSION,
      payload: {
        anvil: 33,
        serialNumber: '',
        userFirstName: '',
        userLastName: '',
        userEmail: '',
      },
    };
    expect(version(initialState, action))
      .toEqual({
        ...initialState,
        anvil: 33,
        serialNumber: '',
        userFirstName: '',
        userLastName: '',
        userEmail: '',
      });
  });
});
