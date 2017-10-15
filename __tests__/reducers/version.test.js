import deepFreeze from 'deep-freeze'
// import stompblock from '../../src/stompblock';
import version from '../../src/reducers/version'
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../../src/midi'
import {
  GET_SYSEX_VERSION,
  RECEIVED_VERSION,
  CHECKED_REGISTRATION,
} from '../../src/action-creators/actions'

describe('version reducer', () => {
  const initialState = {
    checked: false,
    checkedRegistration: true,
    checking: false,
    client: CURRENT_CLIENT_VERSION,
    anvil: NaN,
    expectedAnvil: CURRENT_ANVIL_VERSION,
    serialNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    registered: false,
  }
  deepFreeze(initialState)

  it('checkingVersion success', () => {
    const action = {
      type: GET_SYSEX_VERSION,
    }
    expect(version(initialState, action)).toEqual({
      ...initialState,
      checking: true,
      checked: false,
    })
  })

  it('checkedRegistration success, not registered', () => {
    const action = {
      type: CHECKED_REGISTRATION,
      productInstance: {
        serial: 'JIBBER_JABBER',
        lastSeen: new Date(),
        product: 'STOMPBLOCK',
        registrations: [],
      },
    }
    expect(version(initialState, action)).toEqual({
      ...initialState,
      firstName: '',
      lastName: '',
      email: '',
      registered: false,
    })
  })

  it('checkedRegistration success, single registration', () => {
    const action = {
      type: CHECKED_REGISTRATION,
      productInstance: {
        serial: 'JIBBER_JABBER',
        lastSeen: new Date(),
        product: 'STOMPBLOCK',
        registrations: [
          {
            registered: new Date(),
            firstName: 'Mr.',
            lastName: 'User',
            email: 'email@email.com',
            active: true,
          },
        ],
      },
    }
    expect(version(initialState, action)).toEqual({
      ...initialState,
      firstName: 'Mr.',
      lastName: 'User',
      email: 'email@email.com',
      registered: true,
    })
  })

  it('checkedRegistration success, previously owned', () => {
    const action = {
      type: CHECKED_REGISTRATION,
      productInstance: {
        serial: 'JIBBER_JABBER',
        lastSeen: new Date(),
        product: 'STOMPBLOCK',
        registrations: [
          {
            registered: new Date(),
            firstName: 'Previous',
            lastName: 'Owner',
            email: 'owner@email.com',
            active: false,
          },
          {
            registered: new Date(),
            firstName: 'Mr.',
            lastName: 'User',
            email: 'email@email.com',
            active: true,
          },
        ],
      },
    }
    expect(version(initialState, action)).toEqual({
      ...initialState,
      firstName: 'Mr.',
      lastName: 'User',
      email: 'email@email.com',
      registered: true,
    })
  })

  it('receivedVersion success', () => {
    const action = {
      type: RECEIVED_VERSION,
      anvil: 33,
      serialNumber: '',
    }
    expect(version(initialState, action)).toEqual({
      ...initialState,
      checking: false,
      checked: true,
      anvil: 33,
      serialNumber: '',
      firstName: '',
      lastName: '',
      email: '',
    })
  })
})
