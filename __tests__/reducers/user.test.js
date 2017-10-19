import deepFreeze from 'deep-freeze'
import user from '../../src/reducers/user'
import {
  GET_SYSEX_VERSION,
  RECEIVED_VERSION,
  CHECKED_REGISTRATION,
} from '../../src/action-creators/actions'

describe('version reducer', () => {
  const initialState = {
    checkedRegistration: true,
    serialNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    registered: false,
    dialogVisible: false,
    popoverVisible: false,
  }
  deepFreeze(initialState)

  it('checkingVersion success', () => {
    const action = {
      type: GET_SYSEX_VERSION,
    }
    expect(user(initialState, action)).toEqual({
      ...initialState,
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
    expect(user(initialState, action)).toEqual({
      ...initialState,
      firstName: '',
      lastName: '',
      email: '',
      registered: false,
      popoverVisible: true,
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
    expect(user(initialState, action)).toEqual({
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
    expect(user(initialState, action)).toEqual({
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
    expect(user(initialState, action)).toEqual({
      ...initialState,
      serialNumber: '',
      firstName: '',
      lastName: '',
      email: '',
    })
  })
})
