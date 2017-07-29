import {
  STOMPBLOCK_FOUND,
  STOMPBLOCK_MISSING,
  MIDI_IN_ACTIVITY,
  MIDI_OUT_ACTIVITY,
} from '../actions';

export const stompblockFound = () => ({
  type: STOMPBLOCK_FOUND,
});

export const stompblockMissing = () => ({
  type: STOMPBLOCK_MISSING,
});

export const midiInActivityChanged = activity => ({
  type: MIDI_IN_ACTIVITY,
  payload: activity,
});

export const midiOutActivityChanged = activity => ({
  type: MIDI_OUT_ACTIVITY,
  payload: activity,
});
