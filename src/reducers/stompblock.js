import { RECEIVE_DEVICE_LIST } from 'redux-midi';
import {
  STOMPBLOCK_FOUND,
  STOMPBLOCK_MISSING,
  MIDI_IN_ACTIVITY,
  MIDI_OUT_ACTIVITY,
} from '../actions';
import { createReducer } from '../utils';

const stompblockFound = state => ({
  ...state,
  found: true,
});

const stompblockMissing = state => ({
  ...state,
  found: false,
});

const receivedDeviceList = state => ({
  ...state,
  accessGranted: true, // assume we have access if device list was received
});

const midiInActivityChanged = (state, { payload }) => ({
  ...state,
  midiInActivity: payload,
});

const midiOutActivityChanged = (state, { payload }) => ({
  ...state,
  midiOutActivity: payload,
});

const handlers = {
  [STOMPBLOCK_FOUND]: stompblockFound,
  [STOMPBLOCK_MISSING]: stompblockMissing,
  [RECEIVE_DEVICE_LIST]: receivedDeviceList,
  [MIDI_IN_ACTIVITY]: midiInActivityChanged,
  [MIDI_OUT_ACTIVITY]: midiOutActivityChanged,
};

export default createReducer({
  accessGranted: false,
  found: false,
  midiInActivity: false,
  midiOutActivity: false,
}, handlers);
