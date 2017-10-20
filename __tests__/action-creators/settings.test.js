import deepFreeze from 'deep-freeze'
import storeFactory from '../../src/store'
import { changePrimaryNavTab } from '../../src/action-creators/settings'

describe('settings actions', () => {
  let store

  const settings = {
    primaryNavTabIdx: 0,
    muteEnabledAtStart: false,
    thruEnabledAtStart: true,
    muteGroupsEnabled: true,
    showResetDialog: false,
    resetInProcess: false,
  }

  deepFreeze(settings)

  describe('changePrimaryNavTab', () => {
    beforeAll(() => {
      store = storeFactory({ settings }, false, true)
      store.dispatch(changePrimaryNavTab(12))
    })

    it('should succeed', () => {
      expect(store.getState().settings).toEqual({
        ...settings,
        primaryNavTabIdx: 12,
      })
    })
  })
})
