import { GET_MIDI_DEVICES } from '../actions';
import { createReducer } from '../utils';

const getDevices = (state, { payload }) => ({
  ...payload.outputs.reduce((res, device) =>
    (device.name === 'Zendrum STOMPBLOCK' ? { ...device, found: true } : res),
    { found: false }),
});

const handlers = {
  [GET_MIDI_DEVICES]: getDevices,
};

export default createReducer({ found: false }, handlers);
