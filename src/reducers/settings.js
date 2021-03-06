import PropTypes from 'prop-types'
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
  RECEIVED_MIDI_SETTINGS,
  SET_CHANNEL_A,
  SET_CHANNEL_B,
  SET_VELOCITY_VARIANCE,
  SET_ROUND_ROBIN_ENABLED,
  RECEIVED_VERSION,
  SET_VOLUME_CURVE,
  SET_POLYLOCKS_ENABLED,
  RECEIVED_POLYLOCKS_ENABLED,
  REPORT_ERROR,
  DISMISS_ERROR,
} from '../action-creators/actions'

const receivedVersion = (state, { anvil /* serialNumber */ }) => ({
  ...state,
  hasVersionThreeFirmware: anvil >= 30,
  hasSoundBankSupport: anvil >= 30,
})

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

const receivedPolyLocksEnabled = (state, { polyLocksEnabled }) => ({
  ...state,
  polyLocksEnabled,
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

const receivedMidiSettings = (state, { channelA, channelB, velocityVariance, roundRobinEnabled, volumeCurve }) => ({
  ...state,
  channelA,
  channelB,
  velocityVariance,
  roundRobinEnabled,
  volumeCurve,
})

const changeChannelA = (state, { channelA }) => ({
  ...state,
  channelA,
})

const changeChannelB = (state, { channelB }) => ({
  ...state,
  channelB,
})

const changeVelocityVariance = (state, { velocityVariance }) => ({
  ...state,
  velocityVariance,
})

const changeRoundRobinEnabled = (state, { roundRobinEnabled }) => ({
  ...state,
  roundRobinEnabled,
})

const changeVolumeCurve = (state, { volumeCurve }) => ({
  ...state,
  volumeCurve,
})

const errorReported = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  errorVisible: true,
})

const dismissError = state => ({
  ...state,
  errorVisible: false,
})

const handlers = {
  [RECEIVED_VERSION]: receivedVersion,
  [RECEIVED_MUTE_ENABLED]: receivedMuteEnabled,
  [RECEIVED_THRU_ENABLED]: receivedThruEnabled,
  [RECEIVED_MUTE_GROUPS_ENABLED]: receivedMuteGroupsEnabled,
  [RECEIVED_POLYLOCKS_ENABLED]: receivedPolyLocksEnabled,
  [SET_MUTE_ENABLED]: receivedMuteEnabled,
  [SET_THRU_ENABLED]: receivedThruEnabled,
  [SET_MUTE_GROUPS_ENABLED]: receivedMuteGroupsEnabled,
  [SET_POLYLOCKS_ENABLED]: receivedPolyLocksEnabled,
  [CONFIRM_FACTORY_RESET]: confirmFactoryReset,
  [FACTORY_RESET]: resetBeingPerformed,
  /* Instead of catching 'FACTORY_RESET', watch for the actual result
   * of the reset, which is when all the trims come back in.
   */
  [RECEIVED_ALL_TRIMS]: factoryResetPerformed,
  [CHANGE_PRIMARY_NAV_TAB]: changeTabIndex,
  [RECEIVED_MIDI_SETTINGS]: receivedMidiSettings,
  [SET_CHANNEL_A]: changeChannelA,
  [SET_CHANNEL_B]: changeChannelB,
  [SET_VELOCITY_VARIANCE]: changeVelocityVariance,
  [SET_ROUND_ROBIN_ENABLED]: changeRoundRobinEnabled,
  [SET_VOLUME_CURVE]: changeVolumeCurve,
  [REPORT_ERROR]: errorReported,
  [DISMISS_ERROR]: dismissError,
}

const defaultState = {
  primaryNavTabIdx: 0,
  muteEnabledAtStart: false,
  thruEnabledAtStart: true,
  muteGroupsEnabled: true,
  polyLocksEnabled: false,
  showResetDialog: false,
  resetInProcess: false,
  channelA: 10,
  channelB: 11,
  velocityVariance: 0,
  roundRobinEnabled: false,
  volumeCurve: 0,
  hasVersionThreeFirmware: false,
  hasSoundBankSupport: false,
  errorMessage: '',
  errorVisible: false,
}

export const settingsShape = {
  primaryNavTabIdx: PropTypes.number,
  muteEnabledAtStart: PropTypes.bool,
  thruEnabledAtStart: PropTypes.bool,
  muteGroupsEnabled: PropTypes.bool,
  polyLocksEnabled: PropTypes.bool,
  showResetDialog: PropTypes.bool,
  resetInProcess: PropTypes.bool,
  channelA: PropTypes.number,
  channelB: PropTypes.number,
  velocityVariance: PropTypes.number,
  roundRobinEnabled: PropTypes.bool,
  volumeCurve: PropTypes.number,
  hasVersionThreeFirmware: PropTypes.bool,
  hasSoundBankSupport: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorVisible: PropTypes.bool,
}

export default createReducer(defaultState, handlers)
