import deepFreeze from 'deep-freeze';
import { RECEIVE_DEVICE_LIST } from 'redux-midi';
import {
  SEARCHED_FOR_STOMPBLOCK,
  STOMPBLOCK_FOUND,
  STOMPBLOCK_MISSING,
  MIDI_IN_ACTIVITY,
  MIDI_OUT_ACTIVITY,
} from '../../src/actions';
import stompblock from '../../src/reducers/stompblock';

describe('stompblock reducer', () => {
  const initialState = {
    searchedForStompblock: false,
    accessGranted: false,
    found: false,
    midiInActivity: false,
    midiOutActivity: false,
  };
  deepFreeze(initialState);

  it('searchedForStompblock success', () => {
    const action = {
      type: SEARCHED_FOR_STOMPBLOCK,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        searchedForStompblock: true,
      });
  });

  it('stompblockFound success', () => {
    const action = {
      type: STOMPBLOCK_FOUND,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        found: true,
      });
  });

  it('stompblockMissing success', () => {
    const action = {
      type: STOMPBLOCK_MISSING,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        found: false,
      });
  });

  it('receivedDeviceList success', () => {
    const action = {
      type: RECEIVE_DEVICE_LIST,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        accessGranted: true,
      });
  });

  it('midiInActivityChanged success', () => {
    const action = {
      type: MIDI_IN_ACTIVITY,
      payload: true,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        midiInActivity: true,
      });
  });
  it('midiOutActivityChanged success', () => {
    const action = {
      type: MIDI_OUT_ACTIVITY,
      payload: true,
    };
    expect(stompblock(initialState, action))
      .toEqual({
        ...initialState,
        midiOutActivity: true,
      });
  });
});
