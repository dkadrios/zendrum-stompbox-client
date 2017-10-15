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
} from '../action-creators/actions'

const receivedMuteEnabled = (state, { payload }) => ({
  ...state,
  muteEnabledAtStart: payload,
})

const receivedThruEnabled = (state, { payload }) => ({
  ...state,
  thruEnabledAtStart: payload,
})

const receivedMuteGroupsEnabled = (state, { payload }) => ({
  ...state,
  muteGroupsEnabled: payload,
})

const setMuteEnabled = (state, { payload }) => ({
  ...state,
  muteEnabledAtStart: payload,
})

const setThruEnabled = (state, { payload }) => ({
  ...state,
  thruEnabledAtStart: payload,
})

const setMuteGroupsEnabled = (state, { payload }) => ({
  ...state,
  muteGroupsEnabled: payload,
})

const confirmFactoryReset = (state, { payload }) => ({
  ...state,
  showResetDialog: payload,
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

const handlers = {
  [RECEIVED_MUTE_ENABLED]: receivedMuteEnabled,
  [RECEIVED_THRU_ENABLED]: receivedThruEnabled,
  [RECEIVED_MUTE_GROUPS_ENABLED]: receivedMuteGroupsEnabled,
  [SET_MUTE_ENABLED]: setMuteEnabled,
  [SET_THRU_ENABLED]: setThruEnabled,
  [SET_MUTE_GROUPS_ENABLED]: setMuteGroupsEnabled,
  [CONFIRM_FACTORY_RESET]: confirmFactoryReset,
  [FACTORY_RESET]: resetBeingPerformed,
  /* Instead of catching 'FACTORY_RESET', watch for the actual result
   * of the reset, which is when all the trims come back in.
   */
  [RECEIVED_ALL_TRIMS]: factoryResetPerformed,
}

const defaultState = {
  muteEnabledAtStart: false,
  thruEnabledAtStart: true,
  muteGroupsEnabled: true,
  showResetDialog: false,
  resetInProcess: false,
}

export default createReducer(defaultState, handlers)
