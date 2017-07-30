import { setListeningDevices, RECEIVE_MIDI_MESSAGE, SEND_MIDI_MESSAGE } from 'redux-midi';
import {
  searchedForStompblock,
  stompblockFound,
  stompblockMissing,
  midiInActivityChanged,
  midiOutActivityChanged,
} from './action-creators/stompblock';
import { setOutputDeviceId, checkVersion } from './action-creators/sysex';
import { STOMPBLOCK_FOUND } from './actions';
import processMidiMessage from './sysex';

export const STOMPBLOCK_DEVICE_ID = 0x6B;

export const CURRENT_ANVIL_VERSION = 22;

export const CURRENT_CLIENT_VERSION = 11;

export const CHANNEL = 10;

export const SYSEX_START = 0xF0;
export const SYSEX_END = 0xF7;

export const SYSEX_MSG_GET_VERSION = 0x01;
export const SYSEX_MSG_RECEIVE_VERSION = 0x02;
export const SYSEX_MSG_GET_ALL = 0x03;
export const SYSEX_MSG_RECEIVE_ALL = 0x04;
export const SYSEX_MSG_SET_MUTE_ENABLED = 0x05;
export const SYSEX_MSG_SET_THRU_ENABLED = 0x06;
export const SYSEX_MSG_SET_MUTE_GROUPS_ENABLED = 0x07;
export const SYSEX_MSG_PLAY_NOTE = 0x08;
export const SYSEX_MSG_SET_ITEM = 0x09;
export const SYSEX_MSG_RECEIVED_MUTE_ENABLED = 0x0A;
export const SYSEX_MSG_RECEIVED_THRU_ENABLED = 0x0B;
export const SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED = 0x0C;
export const SYSEX_MSG_FACTORY_RESET = 0x7E;

const findDevice = (devices, kind) => devices
  .filter(device => device.type === kind && device.name === 'Zendrum STOMPBLOCK')
  .reduce((prev, cur) => cur, 0);

export const watchForDeviceChange = (store) => {
  let devices = [];
  let initialDeviceCheck = true;

  store.subscribe(() => {
    const state = store.getState();
    if (state.midi.devices && state.midi.devices !== devices) {
      // we'll enter this block whenever a device is attached or removed
      devices = state.midi.devices;

      const inputDevice = findDevice(devices, 'input');
      const outputDevice = findDevice(devices, 'output');

      if (inputDevice && outputDevice) {
        store.dispatch(setListeningDevices([inputDevice.id]));
        setOutputDeviceId(outputDevice.id);
        store.dispatch(stompblockFound());
      } else {
        store.dispatch(stompblockMissing());
      }

      if (initialDeviceCheck) {
        initialDeviceCheck = false;
        store.dispatch(searchedForStompblock());
      }
    }
  });
};

export const sysexMiddleware = store => next => action => { // eslint-disable-line
  let cancelMidiInTimer = f => f;
  let cancelMidiOutTimer = f => f;

  switch (action.type) {
    case RECEIVE_MIDI_MESSAGE:
      processMidiMessage(store.dispatch, action.payload);
      cancelMidiInTimer();
      store.dispatch(midiInActivityChanged(true));
      cancelMidiInTimer = setTimeout(() => {
        store.dispatch(midiInActivityChanged(false));
      }, 200);
      break;

    case SEND_MIDI_MESSAGE:
      cancelMidiOutTimer();
      store.dispatch(midiOutActivityChanged(true));
      cancelMidiOutTimer = setTimeout(() => {
        store.dispatch(midiOutActivityChanged(false));
      }, 200);
      break;

    case STOMPBLOCK_FOUND:
      store.dispatch(checkVersion());
      break;

    default: break;
  }
  return next(action);
};
