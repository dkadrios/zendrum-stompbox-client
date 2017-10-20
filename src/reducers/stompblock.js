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

const handlers = {
  [SEARCHED_FOR_STOMPBLOCK]: searchedForStompblock,
  [STOMPBLOCK_FOUND]: stompblockFound,
  [STOMPBLOCK_MISSING]: stompblockMissing,
  'redux-midi/midi/RECEIVE_DEVICE_LIST': receivedDeviceList,
  [MIDI_IN_ACTIVITY]: midiInActivityChanged,
  [MIDI_OUT_ACTIVITY]: midiOutActivityChanged,
  [NOT_RESPONDING]: notResponding,
  [RECEIVED_VERSION]: responding,
}

const defaultState = {
  responding: true, // Assume responding until proven otherwise
  searchedForStompblock: false,
  accessGranted: false,
  found: false,
  midiInActivity: false,
  midiOutActivity: false,
}

export const stompblockShape = {
  responding: PropTypes.bool,
  searchedForStompblock: PropTypes.bool,
  accessGranted: PropTypes.bool,
  found: PropTypes.bool,
  midiInActivity: PropTypes.bool,
  midiOutActivity: PropTypes.bool,
}

export default createReducer(defaultState, handlers)
