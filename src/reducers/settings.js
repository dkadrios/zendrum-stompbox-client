import { createReducer } from '../utils'
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
} from '../action-creators/actions'

const receivedMuteEnabled = (state, { muteEnabledAtStart }) => ({
  ...state,
  muteEnabledAtStart,
})

const receivedThruEnabled = (state, { thruEnabledAtStart }) => ({
  ...state,
  thruEnabledAtStart,
})

const receivedMuteGroupsEnabled = (state, { muteGroupsEnabled }) => ({
  ...state,
  muteGroupsEnabled,
})

const confirmFactoryReset = (state, { showResetDialog }) => ({
  ...state,
  showResetDialog,
})

const resetBeingPerformed = state => ({
  ...state,
  showResetDialog: false,
  resetInProcess: true,
})

const factoryResetPerformed = state => ({
  ...state,
  showResetDialog: false,
  resetInProcess: false,
})

const changeTabIndex = (state, { primaryNavTabIdx }) => ({
  ...state,
  primaryNavTabIdx,
})

const handlers = {
  [RECEIVED_MUTE_ENABLED]: receivedMuteEnabled,
  [RECEIVED_THRU_ENABLED]: receivedThruEnabled,
  [RECEIVED_MUTE_GROUPS_ENABLED]: receivedMuteGroupsEnabled,
  [SET_MUTE_ENABLED]: receivedMuteEnabled,
  [SET_THRU_ENABLED]: receivedThruEnabled,
  [SET_MUTE_GROUPS_ENABLED]: receivedMuteGroupsEnabled,
  [CONFIRM_FACTORY_RESET]: confirmFactoryReset,
  [FACTORY_RESET]: resetBeingPerformed,
  /* Instead of catching 'FACTORY_RESET', watch for the actual result
   * of the reset, which is when all the trims come back in.
   */
  [RECEIVED_ALL_TRIMS]: factoryResetPerformed,
  [CHANGE_PRIMARY_NAV_TAB]: changeTabIndex,
}

const defaultState = {
  primaryNavTabIdx: 0,
  muteEnabledAtStart: false,
  thruEnabledAtStart: true,
  muteGroupsEnabled: true,
  showResetDialog: false,
  resetInProcess: false,
}

export default createReducer(defaultState, handlers)
