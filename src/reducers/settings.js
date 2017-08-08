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
} from '../actions'
import { createReducer } from '../utils'

const receivedSetting = (state, { type, payload }) => {
  let result

  switch (type) {
    case RECEIVED_MUTE_ENABLED:
      result = { ...state, muteEnabledAtStart: payload === 1 }
      break
    case RECEIVED_THRU_ENABLED:
      result = { ...state, thruEnabledAtStart: payload === 1 }
      break
    case RECEIVED_MUTE_GROUPS_ENABLED:
      result = { ...state, muteGroupsEnabled: payload === 1 }
      break
    /* istanbul ignore next */
    default:
      break
  }

  return result
}

const settingSetting = (state, { type, payload }) => {
  let result

  switch (type) {
    case SET_MUTE_ENABLED:
      result = { ...state, muteEnabledAtStart: payload }
      break
    case SET_THRU_ENABLED:
      result = { ...state, thruEnabledAtStart: payload }
      break
    case SET_MUTE_GROUPS_ENABLED:
      result = { ...state, muteGroupsEnabled: payload }
      break
    /* istanbul ignore next */
    default:
      break
  }

  return result
}

const confirmFactoryReset = (state, { payload }) =>
  ({ ...state, showResetDialog: payload })

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
  [RECEIVED_MUTE_ENABLED]: receivedSetting,
  [RECEIVED_THRU_ENABLED]: receivedSetting,
  [RECEIVED_MUTE_GROUPS_ENABLED]: receivedSetting,
  [SET_MUTE_ENABLED]: settingSetting,
  [SET_THRU_ENABLED]: settingSetting,
  [SET_MUTE_GROUPS_ENABLED]: settingSetting,
  [CONFIRM_FACTORY_RESET]: confirmFactoryReset,
  [FACTORY_RESET]: resetBeingPerformed,
  /* Instead of catching 'FACTORY_RESET', watch for the actual result
   * of the reset, which is when all the trims come back in.
   */
  [RECEIVED_ALL_TRIMS]: factoryResetPerformed,
}

export default createReducer({
  muteEnabledAtStart: false,
  thruEnabledAtStart: true,
  muteGroupsEnabled: true,
  showResetDialog: false,
  resetInProcess: false,
}, handlers)
