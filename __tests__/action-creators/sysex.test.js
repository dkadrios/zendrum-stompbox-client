import deepFreeze from 'deep-freeze'
import storeFactory from '../../src/store'
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../../src/midi'
import {
  setMuteEnabled,
  setThruEnabled,
  setMuteGroupsEnabled,
  receivedMuteEnabled,
  receivedThruEnabled,
  receivedMuteGroupsEnabled,
} from '../../src/action-creators/settings'
import {
  receivedMuteGroups,
  deleteMuteGroup,
  addMuteGroup,
  deleteMuteItem,
  addMuteItem,
} from '../../src/action-creators/muteGroups'
import { receivedVersion, checkVersion } from '../../src/action-creators/version'
import {
  receivedVelocityTrims,
  userChangedTrim,
  playNote,
  userChangedTrimEnd,
} from '../../src/action-creators/velocityTrim'
import {
  confirmFactoryReset,
  performFactoryReset,
  reloadSysEx,
} from '../../src/action-creators/stompblock'

describe('sysex actions', () => {
  let store

  const settings = {
    muteEnabledAtStart: false,
    thruEnabledAtStart: true,
    muteGroupsEnabled: true,
    showResetDialog: false,
    resetInProcess: false,
    muteGroups: [],
  }

  const version = {
    checking: false,
    checked: false,
    client: CURRENT_CLIENT_VERSION,
    anvil: NaN,
    expectedAnvil: CURRENT_ANVIL_VERSION,
    serialNumber: '',
    userFirstName: '', // TODO
    userLastName: '',
    userEmail: '',
  }

  const velocityTrim = {
    sortBy: 'idx',
    showNames: true,
    search: '',
    group: 'all',
    listView: 'medium',
    data: [{ note: 1, trim: 127 }, { note: 2, trim: 127 }],
  }

  const muteGroups = {
    muteGroups: [
      {
        muteables: [
          {
            group: 'Kicks',
            name: 'Funk Kick',
            note: 25,
            trim: 0,
          },
          {
            group: 'Kicks',
            name: 'Jazz Kick',
            note: 26,
            trim: 0,
          },
        ],
        muters: [
          {
            group: 'Snares',
            name: 'Reggae Snare Drag',
            note: 35,
            trim: 0,
          },
          {
            group: 'Snares',
            name: 'Reggae Snare Off',
            note: 36,
            trim: 0,
          },
        ],
      },
    ],
  }

  deepFreeze(settings)
  deepFreeze(version)
  deepFreeze(velocityTrim)
  deepFreeze(muteGroups)

  describe('confirmFactoryReset', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(confirmFactoryReset(true))
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        showResetDialog: true,
      })
    })
  })

  describe('performFactoryReset', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(performFactoryReset())
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        resetInProcess: true,
      })
    })
  })

  describe('setMuteEnabled', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(setMuteEnabled(true))
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        muteEnabledAtStart: true,
      })
    })
  })

  describe('setThruEnabled', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(setThruEnabled(false))
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        thruEnabledAtStart: false,
      })
    })
  })

  describe('setMuteGroupsEnabled', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(setMuteGroupsEnabled(false))
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        muteGroupsEnabled: false,
      })
    })
  })

  describe('receivedVersion', () => {
    beforeAll(() => {
      store = storeFactory({ version }, false, true)
      store.dispatch(receivedVersion(20, 'TEST_SERIAL'))
    })

    it('should succeed', () => {
      expect(store.getState().version).toEqual({
        ...version,
        checked: true,
        anvil: 20,
        serialNumber: 'TEST_SERIAL',
      })
    })
  })

  describe('checkVersion', () => {
    beforeAll(() => {
      store = storeFactory({ version }, false, true)
      store.dispatch(checkVersion())
    })

    it('should succeed', () => {
      expect(store.getState().version).toEqual({
        ...version,
        checking: true,
      })
    })
  })

  describe('reloadSysEx', () => {
    beforeAll(() => {
      store = storeFactory({ version }, false, true)
      store.dispatch(reloadSysEx())
    })

    it('should succeed', () => {
      expect(store.getState().version).toEqual({
        ...version,
        checked: false,
      })
    })
  })

  describe('userChangedTrim', () => {
    beforeAll(() => {
      store = storeFactory({ velocityTrim }, false, true)
      store.dispatch(userChangedTrim(1, 5))
    })

    it('should succeed', () => {
      expect(store.getState().velocityTrim).toEqual({
        ...velocityTrim,
        data: [{ note: 1, trim: 5 }, { note: 2, trim: 127 }],
      })
    })
  })

  describe('userChangedTrimEnd', () => {
    beforeAll(() => {
      store = storeFactory({ velocityTrim }, false, true)
      store.dispatch(userChangedTrimEnd(2, 15))
    })

    it('should succeed', () => {
      expect(store.getState().velocityTrim).toEqual({
        ...velocityTrim,
        data: [{ note: 1, trim: 127 }, { note: 2, trim: 15 }],
      })
    })
  })

  describe('playNote', () => {
    beforeAll(() => {
      store = storeFactory({ velocityTrim }, false, true)
      store.dispatch(playNote(2, 15))
    })

    it('should succeed', () => {
      expect(store.getState().velocityTrim).toEqual({
        ...velocityTrim,
      })
    })
  })

  describe('receivedVelocityTrims', () => {
    beforeAll(() => {
      store = storeFactory({ velocityTrim }, false, true)
      // first item is tossed to account for zero index
      store.dispatch(receivedVelocityTrims([0, 31, 32]))
    })

    it('should succeed', () => {
      expect(store.getState().velocityTrim).toEqual({
        ...velocityTrim,
        data: [{ note: 1, trim: 31 }, { note: 2, trim: 32 }],
      })
    })
  })

  describe('receivedMuteEnabled', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(receivedMuteEnabled(true))
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        muteEnabledAtStart: true,
      })
    })
  })

  describe('receivedThruEnabled', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(receivedThruEnabled(false))
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        thruEnabledAtStart: false,
      })
    })
  })

  describe('receivedMuteGroupsEnabled', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(receivedMuteGroupsEnabled(false))
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        muteGroupsEnabled: false,
      })
    })
  })

  describe('receivedMuteGroups', () => {
    beforeAll(() => {
      store = storeFactory({ muteGroups }, false, true)
      store.dispatch(receivedMuteGroups([1, 1, 1, 25, 26]))
    })

    it('should succeed', () => {
      expect(store.getState().muteGroups).toEqual({
        ...muteGroups,
        data: [
          {
            muteables: [25],
            muters: [26],
          },
        ],
      })
    })
  })

  describe('deleteMuteGroup', () => {
    beforeAll(() => {
      store = storeFactory({ muteGroups }, false, true)
      store.dispatch(deleteMuteGroup(0))
    })

    it('should succeed', () => {
      expect(store.getState().muteGroups).toEqual({
        ...muteGroups, // muteGroups are not directly changed
      })
    })
  })

  describe('addMuteGroup', () => {
    beforeAll(() => {
      store = storeFactory({ muteGroups }, false, true)
      store.dispatch(addMuteGroup())
    })

    it('should succeed', () => {
      expect(store.getState().muteGroups).toEqual({
        ...muteGroups, // muteGroups are not directly changed
      })
    })
  })

  describe('deleteMuteItem', () => {
    beforeAll(() => {
      store = storeFactory({ muteGroups }, false, true)
      store.dispatch(deleteMuteItem(1, true, 2))
    })

    it('should succeed', () => {
      expect(store.getState().muteGroups).toEqual({
        ...muteGroups, // muteGroups are not directly changed
      })
    })
  })

  describe('addMuteItem', () => {
    beforeAll(() => {
      store = storeFactory({ muteGroups }, false, true)
      store.dispatch(addMuteItem(1, false, 25))
    })

    it('should succeed', () => {
      expect(store.getState().muteGroups).toEqual({
        ...muteGroups, // muteGroups are not directly changed
      })
    })
  })
})
