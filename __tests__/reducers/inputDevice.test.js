import deepFreeze from 'deep-freeze';
import inputDevice from '../../src/reducers/inputDevice';
import * as actions from '../../src/actions';

describe('inputDevice reducer', () => {
  const initialState = {
    found: false,
  };
  deepFreeze(initialState);

  it('getDevices success', () => {
    let action = {
      type: actions.GET_MIDI_DEVICES,
      payload: {
        inputs: [],
      },
    };
    expect(inputDevice(initialState, action))
      .toEqual({
        found: false,
      });

    action = {
      type: actions.GET_MIDI_DEVICES,
      payload: {
        inputs: [{
          name: 'FAKE DEVICE',
        }],
      },
    };
    expect(inputDevice(initialState, action))
      .toEqual({
        found: false,
      });

    action = {
      type: actions.GET_MIDI_DEVICES,
      payload: {
        inputs: [{
          name: 'Zendrum STOMPBLOCK',
        }],
      },
    };
    expect(inputDevice(initialState, action))
      .toEqual({
        found: true,
        name: 'Zendrum STOMPBLOCK',
      });
  });
});
