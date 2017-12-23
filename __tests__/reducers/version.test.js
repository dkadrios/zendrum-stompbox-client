import deepFreeze from 'deep-freeze'
import version from '../../src/reducers/version'
import { CURRENT_CLIENT_VERSION } from '../../src/midi'
import {
  GET_SYSEX_VERSION,
  RECEIVED_VERSION,
  CHECKED_REGISTRATION,
} from '../../src/action-creators/actions'

describe('version reducer', () => {
  const initialState = {
    checked: false,
    checking: false,
    client: CURRENT_CLIENT_VERSION,
    anvil: NaN,
    hasVersionThreeFirmware: true,
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
    })
  })
})
