import { GET_MIDI_DEVICES } from '../actions';
import { createReducer } from '../utils';

const getDevices = (state, { payload }) => ({ ...state, ...payload });

const handlers = {
  [GET_MIDI_DEVICES]: getDevices,
};

export default createReducer({}, handlers);
