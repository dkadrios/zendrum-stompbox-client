import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import {
  SEARCHED_FOR_STOMPBLOCK,
  STOMPBLOCK_FOUND,
  STOMPBLOCK_MISSING,
  MIDI_IN_ACTIVITY,
  MIDI_OUT_ACTIVITY,
  NOT_RESPONDING,
  RECEIVED_VERSION,
  RECEIVED_INTERNAL_STATE,
} from '../action-creators/actions'

const searchedForStompblock = state => ({
  ...state,
  searchedForStompblock: true,
})

const stompblockFound = state => ({
  ...state,
  found: true,
})

const stompblockMissing = state => ({
  ...state,
  found: false,
})

const notResponding = state => ({
  ...state,
  responding: false,
})

const responding = state => ({
  ...state,
  responding: true,
})

const receivedDeviceList = state => ({
  ...state,
  accessGranted: true, // assume we have access if device list was received
})

const midiInActivityChanged = (state, { midiInActivity }) => ({
  ...state,
  midiInActivity,
})

const midiOutActivityChanged = (state, { midiOutActivity }) => ({
  ...state,
  midiOutActivity,
})

const receivedState = (
  state,
  { packet: [muteState, demoState, thruState, mode, volumeSetting, velocitySetting] },
) => ({
  ...state,
  muteState: muteState === 1,
  demoState: demoState === 1,
  thruState: thruState === 1,
  mode,
  volumeSetting,
  velocitySetting,
})

const handlers = {
  [SEARCHED_FOR_STOMPBLOCK]: searchedForStompblock,
  [STOMPBLOCK_FOUND]: stompblockFound,
  [STOMPBLOCK_MISSING]: stompblockMissing,
  'redux-midi/midi/RECEIVE_DEVICE_LIST': receivedDeviceList,
  [MIDI_IN_ACTIVITY]: midiInActivityChanged,
  [MIDI_OUT_ACTIVITY]: midiOutActivityChanged,
  [NOT_RESPONDING]: notResponding,
  [RECEIVED_VERSION]: responding,
  [RECEIVED_INTERNAL_STATE]: receivedState,
}

const defaultState = {
  responding: true, // Assume responding until proven otherwise
  searchedForStompblock: false,
  accessGranted: false,
  found: false,
  midiInActivity: false,
  midiOutActivity: false,
  muteState: false,
  demoState: false,
  thruState: false,
  mode: 0,
  volumeSetting: -1,
  velocitySetting: -1,
}

export const stompblockShape = {
  responding: PropTypes.bool,
  searchedForStompblock: PropTypes.bool,
  accessGranted: PropTypes.bool,
  found: PropTypes.bool,
  midiInActivity: PropTypes.bool,
  midiOutActivity: PropTypes.bool,
  muteState: PropTypes.bool,
  demoState: PropTypes.bool,
  thruState: PropTypes.bool,
  mode: PropTypes.number,
  volumeSetting: PropTypes.number,
  velocitySetting: PropTypes.number,
}

export default createReducer(defaultState, handlers)
