import deepFreeze from 'deep-freeze'
import settings from '../../src/reducers/settings'
import {
  RECEIVED_MUTE_ENABLED,
  RECEIVED_THRU_ENABLED,
  RECEIVED_MUTE_GROUPS_ENABLED,
  SET_MUTE_ENABLED,
  SET_THRU_ENABLED,
  SET_MUTE_GROUPS_ENABLED,
  CONFIRM_FACTORY_RESET,
  FACTORY_RESET,
  RECEIVED_ALL_TRIMS,
  CHANGE_PRIMARY_NAV_TAB,
  RECEIVED_VERSION,
} from '../../src/action-creators/actions'

describe('settings reducer', () => {
  const initialState = {
    primaryNavTabIdx: 0,
    muteEnabledAtStart: false,
    thruEnabledAtStart: true,
    muteGroupsEnabled: true,
    showResetDialog: false,
    resetInProcess: false,
    hasVersionThreeFirmware: false,
    hasSoundBankSupport: false,
  }
  deepFreeze(initialState)

  it('receivedSetting success', () => {
    let action = {
      type: RECEIVED_MUTE_ENABLED,
      muteEnabledAtStart: true,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      muteEnabledAtStart: true,
    })

    action = {
      type: RECEIVED_THRU_ENABLED,
      thruEnabledAtStart: false,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      thruEnabledAtStart: false,
    })

    action = {
      type: RECEIVED_MUTE_GROUPS_ENABLED,
      muteGroupsEnabled: false,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      muteGroupsEnabled: false,
    })
  })

  it('settingSetting success', () => {
    let action = {
      type: SET_MUTE_ENABLED,
      muteEnabledAtStart: true,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      muteEnabledAtStart: true,
    })

    action = {
      type: SET_THRU_ENABLED,
      thruEnabledAtStart: false,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      thruEnabledAtStart: false,
    })

    action = {
      type: SET_MUTE_GROUPS_ENABLED,
      muteGroupsEnabled: false,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      muteGroupsEnabled: false,
    })
  })

  it('confirmFactoryReset success', () => {
    let action = {
      type: CONFIRM_FACTORY_RESET,
      showResetDialog: true,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      showResetDialog: true,
      resetInProcess: false,
    })

    action = {
      type: CONFIRM_FACTORY_RESET,
      showResetDialog: false,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      showResetDialog: false,
      resetInProcess: false,
    })
  })

  it('resetBeingPerformed success', () => {
    const action = {
      type: FACTORY_RESET,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      showResetDialog: false,
      resetInProcess: true,
    })
  })

  it('factoryResetPerformed success', () => {
    const action = {
      type: RECEIVED_ALL_TRIMS,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      showResetDialog: false,
      resetInProcess: false,
    })
  })

  it('changeTabIdx success', () => {
    const action = {
      type: CHANGE_PRIMARY_NAV_TAB,
      primaryNavTabIdx: 8,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      primaryNavTabIdx: 8,
    })
  })

  it('hasVersionThreeFirmware success', () => {
    const action = {
      type: RECEIVED_VERSION,
      checked: true,
      anvil: 40,
    }
    expect(settings(initialState, action)).toEqual({
      ...initialState,
      hasVersionThreeFirmware: true,
      hasSoundBankSupport: true,
    })

    expect(settings(initialState, { ...action, anvil: 25 })).toEqual({
      ...initialState,
      hasVersionThreeFirmware: false,
      hasSoundBankSupport: false,
    })
  })
})
