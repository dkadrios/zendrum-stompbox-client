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

export const midiInActivityChanged = activity => ({
  type: MIDI_IN_ACTIVITY,
  payload: activity,
})

export const midiOutActivityChanged = activity => ({
  type: MIDI_OUT_ACTIVITY,
  payload: activity,
})

export const checkedRegistration = productInstance => ({
  type: CHECKED_REGISTRATION,
  payload: productInstance,
})

export const deviceRegistered = registration => ({
  type: DEVICE_REGISTERED,
  payload: registration,
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
