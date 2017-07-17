import { GET_MIDI_DEVICES } from '../actions';
import { createReducer } from '../utils';

const getDevices = (state, { payload }) => ({
  ...payload.inputs.reduce((res, device) =>
    (device.name === 'Zendrum STOMPBOX' ? { ...device, found: true } : res),
    { found: false }),
});

const handlers = {
  [GET_MIDI_DEVICES]: getDevices,
};

export default createReducer({ found: false }, handlers);
