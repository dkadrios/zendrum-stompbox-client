import { RECEIVE_DEVICE_LIST } from 'redux-midi'
import {
  SEARCHED_FOR_STOMPBLOCK,
  STOMPBLOCK_FOUND,
  STOMPBLOCK_MISSING,
  MIDI_IN_ACTIVITY,
  MIDI_OUT_ACTIVITY,
} from '../actions'
import { createReducer } from '../utils'

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
  [RECEIVE_DEVICE_LIST]: receivedDeviceList,
  [MIDI_IN_ACTIVITY]: midiInActivityChanged,
  [MIDI_OUT_ACTIVITY]: midiOutActivityChanged,
}

export default createReducer({
  searchedForStompblock: false,
  accessGranted: false,
  found: false,
  midiInActivity: false,
  midiOutActivity: false,
}, handlers)
