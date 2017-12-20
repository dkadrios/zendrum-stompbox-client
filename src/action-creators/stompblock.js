import {
  SEARCHED_FOR_STOMPBLOCK,
  STOMPBLOCK_FOUND,
  STOMPBLOCK_MISSING,
  MIDI_IN_ACTIVITY,
  MIDI_OUT_ACTIVITY,
  CONFIRM_FACTORY_RESET,
  FACTORY_RESET,
  RELOAD_SYSEX,
  NOT_RESPONDING,
  RECEIVED_INTERNAL_STATE,
} from './actions'

export const searchedForStompblock = () => ({
  type: SEARCHED_FOR_STOMPBLOCK,
})

export const stompblockFound = () => ({
  type: STOMPBLOCK_FOUND,
})

export const stompblockMissing = () => ({
  type: STOMPBLOCK_MISSING,
})

export const notResponding = () => ({
  type: NOT_RESPONDING,
})

export const midiInActivityChanged = midiInActivity => ({
  type: MIDI_IN_ACTIVITY,
  midiInActivity,
})

export const midiOutActivityChanged = midiOutActivity => ({
  type: MIDI_OUT_ACTIVITY,
  midiOutActivity,
})

export const confirmFactoryReset = showResetDialog => ({
  type: CONFIRM_FACTORY_RESET,
  showResetDialog,
})

export const performFactoryReset = () => ({ type: FACTORY_RESET })

export const reloadSysEx = () => ({ type: RELOAD_SYSEX })

export const receivedInternalState = packet => ({
  type: RECEIVED_INTERNAL_STATE,
  packet,
})
