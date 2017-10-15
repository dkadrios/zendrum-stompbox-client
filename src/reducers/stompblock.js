import { createReducer } from '../utils'
import {
  SEARCHED_FOR_STOMPBLOCK,
  STOMPBLOCK_FOUND,
  STOMPBLOCK_MISSING,
  MIDI_IN_ACTIVITY,
  MIDI_OUT_ACTIVITY,
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

const receivedDeviceList = state => ({
  ...state,
  accessGranted: true, // assume we have access if device list was received
})

const midiInActivityChanged = (state, { payload }) => ({
  ...state,
  midiInActivity: payload,
})

const midiOutActivityChanged = (state, { payload }) => ({
  ...state,
  midiOutActivity: payload,
})

const handlers = {
  [SEARCHED_FOR_STOMPBLOCK]: searchedForStompblock,
  [STOMPBLOCK_FOUND]: stompblockFound,
  [STOMPBLOCK_MISSING]: stompblockMissing,
  'redux-midi/midi/RECEIVE_DEVICE_LIST': receivedDeviceList,
  [MIDI_IN_ACTIVITY]: midiInActivityChanged,
  [MIDI_OUT_ACTIVITY]: midiOutActivityChanged,
}

const defaultState = {
  searchedForStompblock: false,
  accessGranted: false,
  found: false,
  midiInActivity: false,
  midiOutActivity: false,
}

export default createReducer(defaultState, handlers)
