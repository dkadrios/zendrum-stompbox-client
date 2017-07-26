import deepFreeze from 'deep-freeze';
import outputDevice from '../../src/reducers/outputDevice';
import * as actions from '../../src/actions';

describe('outputDevice reducer', () => {
  const initialState = {
    found: false,
  };
  deepFreeze(initialState);

  it('getDevices success', () => {
    let action = {
      type: actions.GET_MIDI_DEVICES,
      payload: {
        outputs: [],
      },
    };
    expect(outputDevice(initialState, action))
      .toEqual({
        found: false,
      });

    action = {
      type: actions.GET_MIDI_DEVICES,
      payload: {
        outputs: [{
          name: 'FAKE DEVICE',
        }],
      },
    };
    expect(outputDevice(initialState, action))
      .toEqual({
        found: false,
      });

    action = {
      type: actions.GET_MIDI_DEVICES,
      payload: {
        outputs: [{
          name: 'Zendrum STOMPBLOCK',
        }],
      },
    };
    expect(outputDevice(initialState, action))
      .toEqual({
        found: true,
        name: 'Zendrum STOMPBLOCK',
      });
  });
});
