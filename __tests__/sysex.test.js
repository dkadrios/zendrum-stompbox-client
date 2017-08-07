import configureStore from 'redux-mock-store'; // eslint-disable-line
import processMidiMessage from '../src/sysex';
import {
  SYSEX_START,
  SYSEX_END,
  STOMPBLOCK_DEVICE_ID,
  CURRENT_ANVIL_VERSION,
  SYSEX_MSG_RECEIVE_VERSION,
  SYSEX_MSG_RECEIVED_MUTE_ENABLED,
  SYSEX_MSG_RECEIVED_THRU_ENABLED,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED,
  SYSEX_MSG_RECEIVE_ALL,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS,
} from '../src/midi';

describe('sysex processing', () => {
  let store;
  let data;
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const initialState = {};
  const deviceId = STOMPBLOCK_DEVICE_ID;
  const anvilVersion = CURRENT_ANVIL_VERSION;

  const msg = (msgType, ...packet) => [
    SYSEX_START, deviceId, anvilVersion, msgType, ...packet, SYSEX_END,
  ];

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should return current version if not a match', () => {
    const serialNumber = [...Array(11)].map(() => 49);
    data = [
      SYSEX_START, deviceId, 1, SYSEX_MSG_RECEIVE_VERSION,
      anvilVersion, 0, ...serialNumber, 0, 0, 0, SYSEX_END,
    ];
    processMidiMessage(store.dispatch, { data });
    const actions = store.getActions();
    expect(actions.length).toBe(5);
    /* expect(actions[0]).toEqual({
      type: 'RECEIVED_VERSION',
      payload: { anvil: 23, serialNumber: '11111111111' },
    }); */
  });

  it('should fail gracefully if not a match', () => {
    const serialNumber = [...Array(11)].map(() => 49);
    data = [
      SYSEX_START, deviceId, anvilVersion, SYSEX_MSG_RECEIVE_VERSION,
      1, 0, ...serialNumber, 0, 0, 0, SYSEX_END,
    ];
    processMidiMessage(store.dispatch, { data });
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    /* expect(actions[0]).toEqual({
      type: 'RECEIVED_VERSION',
      payload: { anvil: 1, serialNumber: '11111111111' },
    }); */
  });

  it('should test SYSEX_MSG_RECEIVE_VERSION', () => {
    /*
     * serial numbers are up to 14 chars long
     * they may be padded with zeros at the end, which are later trimmed
     */
    const serialNumber = [...Array(11)].map(() => 49);
    data = msg(SYSEX_MSG_RECEIVE_VERSION, anvilVersion, 0, ...serialNumber, 0, 0, 0);

    processMidiMessage(store.dispatch, { data });

    const actions = store.getActions();
    expect(actions.length).toBe(5);
    /* expect(actions[0]).toEqual({
      type: 'RECEIVED_VERSION',
      payload: { anvil: 23, serialNumber: '11111111111' },
    }); */
    expect(actions[1].type).toEqual('redux-midi/midi/SEND_MIDI_MESSAGE');
    expect(actions[2].type).toEqual('redux-midi/midi/SEND_MIDI_MESSAGE');
    expect(actions[3].type).toEqual('redux-midi/midi/SEND_MIDI_MESSAGE');
    expect(actions[4].type).toEqual('redux-midi/midi/SEND_MIDI_MESSAGE');
  });

  it('should test SYSEX_MSG_RECEIVE_ALL', () => {
    data = msg(SYSEX_MSG_RECEIVE_ALL, 0);
    processMidiMessage(store.dispatch, { data });
    expect(store.getActions()).toEqual([{ type: 'RECEIVED_ALL_TRIMS', payload: [0] }]);
  });

  it('should test SYSEX_MSG_RECEIVED_MUTE_ENABLED', () => {
    data = msg(SYSEX_MSG_RECEIVED_MUTE_ENABLED, 0);
    processMidiMessage(store.dispatch, { data });
    expect(store.getActions()).toEqual([{ type: 'RECEIVED_MUTE_ENABLED', payload: 0 }]);
  });

  it('should test SYSEX_MSG_RECEIVED_THRU_ENABLED', () => {
    data = msg(SYSEX_MSG_RECEIVED_THRU_ENABLED, 1);
    processMidiMessage(store.dispatch, { data });
    expect(store.getActions()).toEqual([{ type: 'RECEIVED_THRU_ENABLED', payload: 1 }]);
  });

  it('should test SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED', () => {
    data = msg(SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED, 1);
    processMidiMessage(store.dispatch, { data });
    expect(store.getActions()).toEqual([{ type: 'RECEIVED_MUTE_GROUPS_ENABLED', payload: 1 }]);
  });

  it('should test SYSEX_MSG_RECEIVED_MUTE_GROUPS', () => {
    data = msg(SYSEX_MSG_RECEIVED_MUTE_GROUPS, 'groups');
    processMidiMessage(store.dispatch, { data });
    expect(store.getActions()).toEqual([{ type: 'RECEIVED_MUTE_GROUPS', payload: ['groups'] }]);
  });

  it('should fail gracefully for unknown msg types', () => {
    data = msg('???');
    processMidiMessage(store.dispatch, { data });
    expect(store.getActions()).toEqual([]);
  });
});
