import {
  RECEIVED_ALL_TRIMS,
  USER_CHANGED_TRIM,
  USER_CHANGED_TRIM_END,
  PLAY_NOTE,
  NOTE_PLAYED,
} from './actions'

export const receivedVelocityTrims = (incomingTrims, bank) => ({
  type: RECEIVED_ALL_TRIMS,
  incomingTrims,
  bank,
})

export const userChangedTrim = (noteNum, value, bank) => ({
  type: USER_CHANGED_TRIM,
  noteNum,
  value,
  bank,
})

// This is the only one we send to the firmware
export const userChangedTrimEnd = (noteNum, value, bank) => ({
  type: USER_CHANGED_TRIM_END,
  noteNum,
  value,
  bank,
})

export const playNote = (noteNum, velocity, bank) => ({
  type: PLAY_NOTE,
  noteNum,
  velocity,
  bank,
})

export const notePlayed = (noteNum, bank) => ({
  type: NOTE_PLAYED,
  noteNum,
  bank,
})
