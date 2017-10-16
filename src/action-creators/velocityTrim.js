import { RECEIVED_ALL_TRIMS, USER_CHANGED_TRIM, USER_CHANGED_TRIM_END, PLAY_NOTE } from './actions'

export const receivedVelocityTrims = incomingTrims => ({
  type: RECEIVED_ALL_TRIMS,
  incomingTrims,
})

export const userChangedTrim = (noteNum, value) => ({
  type: USER_CHANGED_TRIM,
  noteNum,
  value,
})

// This is the only one we send to the firmware
export const userChangedTrimEnd = (noteNum, value) => ({
  type: USER_CHANGED_TRIM_END,
  noteNum,
  value,
})

export const playNote = (noteNum, velocity) => ({
  type: PLAY_NOTE,
  noteNum,
  velocity,
})
