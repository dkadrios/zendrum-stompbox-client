/* @flow */
import { createReducer } from '../utils'
import type { MidiInActivityAction, MidiOutActivityAction } from '../types/Action'

export type StompblockState = {
  +searchedForStompblock: boolean,
  +accessGranted: boolean,
  +found: boolean,
  +midiInActivity: boolean,
  +midiOutActivity: boolean,
}

const searchedForStompblock = (state: StompblockState): StompblockState => ({
  ...state,
  searchedForStompblock: true,
})

const stompblockFound = (state: StompblockState): StompblockState => ({
  ...state,
  found: true,
})

const stompblockMissing = (state: StompblockState): StompblockState => ({
  ...state,
  found: false,
})

const receivedDeviceList = (state: StompblockState): StompblockState => ({
  ...state,
  accessGranted: true, // assume we have access if device list was received
})

const midiInActivityChanged = (
  state: StompblockState,
  { payload }: MidiInActivityAction,
): StompblockState => ({
  ...state,
  midiInActivity: payload,
})

const midiOutActivityChanged = (
  state: StompblockState,
  { payload }: MidiOutActivityAction,
): StompblockState => ({
  ...state,
  midiOutActivity: payload,
})

const handlers = {
  SEARCHED_FOR_STOMPBLOCK: searchedForStompblock,
  STOMPBLOCK_FOUND: stompblockFound,
  STOMPBLOCK_MISSING: stompblockMissing,
  'redux-midi/midi/RECEIVE_DEVICE_LIST': receivedDeviceList,
  MIDI_IN_ACTIVITY: midiInActivityChanged,
  MIDI_OUT_ACTIVITY: midiOutActivityChanged,
}

const defaultState: StompblockState = {
  searchedForStompblock: false,
  accessGranted: false,
  found: false,
  midiInActivity: false,
  midiOutActivity: false,
}

export default createReducer(defaultState, handlers)
