import fetch from 'isomorphic-fetch'
import { PRODUCT_INSTANCE } from '../endpoints'
import {
  SEARCHED_FOR_STOMPBLOCK,
  STOMPBLOCK_FOUND,
  STOMPBLOCK_MISSING,
  MIDI_IN_ACTIVITY,
  MIDI_OUT_ACTIVITY,
  CHECKED_REGISTRATION,
  DEVICE_REGISTERED,
  CONFIRM_FACTORY_RESET,
  FACTORY_RESET,
  RELOAD_SYSEX,
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

export const midiInActivityChanged = midiInActivity => ({
  type: MIDI_IN_ACTIVITY,
  midiInActivity,
})

export const midiOutActivityChanged = midiOutActivity => ({
  type: MIDI_OUT_ACTIVITY,
  midiOutActivity,
})

export const checkedRegistration = productInstance => ({
  type: CHECKED_REGISTRATION,
  productInstance,
})

export const deviceRegistered = registration => ({
  type: DEVICE_REGISTERED,
  registration,
})

export const submitRegistration = (serialNumber, registration) => (dispatch) => {
  fetch(PRODUCT_INSTANCE + serialNumber, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registration),
  })
    .then(response => response.json())
    .then(newRegistration => dispatch(deviceRegistered(newRegistration)))
}

export const confirmFactoryReset = showResetDialog => ({
  type: CONFIRM_FACTORY_RESET,
  showResetDialog,
})

export const performFactoryReset = () => ({ type: FACTORY_RESET })

export const reloadSysEx = () => ({ type: RELOAD_SYSEX })
