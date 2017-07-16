import { GET_MIDI_DEVICES } from '../actions';
import { createReducer } from '../utils';

const getDevices = (state, { payload }) => ({
  ...state,
  ...payload, // Pull in the full MIDI interface

  // rename reserved word 'interface' to make object destructuring less painful
  midiInterface: payload.interface,

  // enabled: false,
});

const handlers = {
  [GET_MIDI_DEVICES]: getDevices,
};

export default createReducer({ enabled: false }, handlers);
