/* @flow */

import { createReducer } from '../utils'
import type {
  ReceivedMuteEnabledAction,
  ReceivedThruEnabledAction,
  ReceivedMuteGroupsEnabledAction,
  SetMuteEnabledAction,
  SetThruEnabledAction,
  SetMuteGroupsEnabledAction,
  ConfirmFactoryResetAction,
} from '../types/Action'

export type SettingsState = {
  +muteEnabledAtStart: boolean,
  +thruEnabledAtStart: boolean,
  +muteGroupsEnabled: boolean,
  +showResetDialog: boolean,
  +resetInProcess: boolean,
}

const receivedMuteEnabled = (
  state: SettingsState,
  { payload }: ReceivedMuteEnabledAction,
): SettingsState => ({
  ...state,
  muteEnabledAtStart: payload,
})

const receivedThruEnabled = (
  state: SettingsState,
  { payload }: ReceivedThruEnabledAction,
): SettingsState => ({
  ...state,
  thruEnabledAtStart: payload,
})

const receivedMuteGroupsEnabled = (
  state: SettingsState,
  { payload }: ReceivedMuteGroupsEnabledAction,
): SettingsState => ({
  ...state,
  muteGroupsEnabled: payload,
})

const setMuteEnabled = (
  state: SettingsState,
  { payload }: SetMuteEnabledAction,
): SettingsState => ({
  ...state,
  muteEnabledAtStart: payload,
})

const setThruEnabled = (
  state: SettingsState,
  { payload }: SetThruEnabledAction,
): SettingsState => ({
  ...state,
  thruEnabledAtStart: payload,
})

const setMuteGroupsEnabled = (
  state: SettingsState,
  { payload }: SetMuteGroupsEnabledAction,
): SettingsState => ({
  ...state,
  muteGroupsEnabled: payload,
})

const confirmFactoryReset = (
  state: SettingsState,
  { payload }: ConfirmFactoryResetAction,
): SettingsState => ({
  ...state,
  showResetDialog: payload,
})

const resetBeingPerformed = (state: SettingsState): SettingsState => ({
  ...state,
  showResetDialog: false,
  resetInProcess: true,
})

const factoryResetPerformed = (state: SettingsState): SettingsState => ({
  ...state,
  showResetDialog: false,
  resetInProcess: false,
})

const handlers = {
  RECEIVED_MUTE_ENABLED: receivedMuteEnabled,
  RECEIVED_THRU_ENABLED: receivedThruEnabled,
  RECEIVED_MUTE_GROUPS_ENABLED: receivedMuteGroupsEnabled,
  SET_MUTE_ENABLED: setMuteEnabled,
  SET_THRU_ENABLED: setThruEnabled,
  SET_MUTE_GROUPS_ENABLED: setMuteGroupsEnabled,
  CONFIRM_FACTORY_RESET: confirmFactoryReset,
  FACTORY_RESET: resetBeingPerformed,
  /* Instead of catching 'FACTORY_RESET', watch for the actual result
   * of the reset, which is when all the trims come back in.
   */
  RECEIVED_ALL_TRIMS: factoryResetPerformed,
}

const defaultState: SettingsState = {
  muteEnabledAtStart: false,
  thruEnabledAtStart: true,
  muteGroupsEnabled: true,
  showResetDialog: false,
  resetInProcess: false,
}

export default createReducer(defaultState, handlers)
