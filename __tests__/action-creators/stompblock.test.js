import deepFreeze from 'deep-freeze'
import storeFactory from '../../src/store'
import {
  searchedForStompblock,
  stompblockFound,
  stompblockMissing,
  midiInActivityChanged,
  midiOutActivityChanged,
} from '../../src/action-creators/stompblock'

import { checkedRegistration } from '../../src/action-creators/user'

describe('stompblock actions', () => {
  let store

  const stompblock = {
    searchedForStompblock: false,
    accessGranted: false,
    found: false,
    midiInActivity: false,
    midiOutActivity: false,
  }

  deepFreeze(stompblock)

  describe('searchedForStompblock', () => {
    beforeAll(() => {
      store = storeFactory({ stompblock }, false, true)
      store.dispatch(searchedForStompblock())
    })

    it('should report found', () => {
      expect(store.getState().stompblock.searchedForStompblock).toBeTruthy()
    })
  })

  describe('stompblockFound', () => {
    beforeAll(() => {
      store = storeFactory({ stompblock }, false, true)
      store.dispatch(stompblockFound())
    })

    it('should report found', () => {
      expect(store.getState().stompblock.found).toBeTruthy()
    })
  })

  describe('stompblockMissing', () => {
    beforeAll(() => {
      store = storeFactory({ stompblock }, false, true)
      store.dispatch(stompblockMissing())
    })

    it('should report found', () => {
      expect(store.getState().stompblock.found).toBeFalsy()
    })
  })

  describe('midiInActivityChanged', () => {
    beforeAll(() => {
      store = storeFactory({ stompblock }, false, true)
      store.dispatch(midiInActivityChanged(true))
    })

    it('should report activity', () => {
      expect(store.getState().stompblock.midiInActivity).toBeTruthy()
    })
  })

  describe('midiOutActivityChanged', () => {
    beforeAll(() => {
      store = storeFactory({ stompblock }, false, true)
      store.dispatch(midiOutActivityChanged(true))
    })

    it('should report activity', () => {
      expect(store.getState().stompblock.midiOutActivity).toBeTruthy()
    })
  })

  describe('checkedRegistration', () => {
    beforeAll(() => {
      store = storeFactory({ stompblock }, false, true)
      store.dispatch(checkedRegistration({
        serial: 'JIBBER_JABBER',
        lastSeen: new Date(),
        product: 'STOMPBLOCK',
        registrations: [{ active: true }],
      }))
    })

    it('should report registered', () => {
      expect(store.getState().user.registered).toBeTruthy()
    })
  })
})
