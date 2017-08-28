/* @flow */
import fetch from 'isomorphic-fetch'
import { PRODUCT_INSTANCE } from '../endpoints'
import type { Dispatch } from '../types/Store'
import type { Action } from '../types/Action'
import type { ProductInstance, Registration } from '../types/Registration'

export const searchedForStompblock = (): Action => ({
  type: 'SEARCHED_FOR_STOMPBLOCK',
})

export const stompblockFound = (): Action => ({
  type: 'STOMPBLOCK_FOUND',
})

export const stompblockMissing = (): Action => ({
  type: 'STOMPBLOCK_MISSING',
})

export const midiInActivityChanged = (activity: boolean): Action => ({
  type: 'MIDI_IN_ACTIVITY',
  payload: activity,
})

export const midiOutActivityChanged = (activity: boolean): Action => ({
  type: 'MIDI_OUT_ACTIVITY',
  payload: activity,
})

export const checkedRegistration = (productInstance: ProductInstance): Action => ({
  type: 'CHECKED_REGISTRATION',
  payload: productInstance,
})

export const deviceRegistered = (registration: Registration): Action => ({
  type: 'DEVICE_REGISTERED',
  payload: registration,
})

export const submitRegistration = (serialNumber: string, registration: Registration) => (
  dispatch: Dispatch,
) => {
  fetch(PRODUCT_INSTANCE + serialNumber, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registration),
  })
    .then(response => response.json())
    .then(newRegistration => dispatch(deviceRegistered(newRegistration)))
}
