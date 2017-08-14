import deepFreeze from 'deep-freeze'
// import stompblock from '../../src/stompblock';
import version from '../../src/reducers/version'
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../../src/midi'

describe('version reducer', () => {
  const initialState = {
    checked: false,
    checking: false,
    client: CURRENT_CLIENT_VERSION,
    anvil: NaN,
    expectedAnvil: CURRENT_ANVIL_VERSION,
    serialNumber: '',
    userFirstName: '',
    userLastName: '',
    userEmail: '',
  }
  deepFreeze(initialState)

  it('checkingVersion success', () => {
    const action = {
      type: 'GET_SYSEX_VERSION',
    }
    expect(version(initialState, action)).toEqual({
      ...initialState,
      checking: true,
      checked: false,
    })
  })

  it('receivedVersion success', () => {
    const action = {
      type: 'RECEIVED_VERSION',
      payload: {
        anvil: 33,
        serialNumber: '',
        userFirstName: '',
        userLastName: '',
        userEmail: '',
      },
    }
    expect(version(initialState, action)).toEqual({
      ...initialState,
      checking: false,
      checked: true,
      anvil: 33,
      serialNumber: '',
      userFirstName: '',
      userLastName: '',
      userEmail: '',
    })
  })
})
