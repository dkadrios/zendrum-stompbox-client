import deepFreeze from 'deep-freeze';
import webMidi from '../../src/reducers/webMidi';
import * as actions from '../../src/actions';

describe('webMidi reducer', () => {
  const initialState = {
    enabled: false,
  };
  deepFreeze(initialState);

  it('getDevices success', () => {
    const action = {
      type: actions.GET_MIDI_DEVICES,
      payload: {
        interface: 'GETS_RENAMED',
      },
    };
    expect(webMidi(initialState, action))
      .toEqual({
        ...initialState,
        interface: 'GETS_RENAMED',
        midiInterface: 'GETS_RENAMED',
      });
  });
});
