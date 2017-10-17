import fetch from 'isomorphic-fetch'
import { PRODUCT_INSTANCE } from '../endpoints'
import {
  SHOW_REGISTRATION_DLG,
  HIDE_REGISTRATION_DLG,
  SHOW_REGISTRATION_NAG,
  HIDE_REGISTRATION_NAG,
  CHECKED_REGISTRATION,
  DEVICE_REGISTERED,
} from './actions'

export const checkedRegistration = productInstance => ({
  type: CHECKED_REGISTRATION,
  productInstance,
})

export const deviceRegistered = registration => ({
  type: DEVICE_REGISTERED,
  registration,
})

export const showDialog = () => ({
  type: SHOW_REGISTRATION_DLG,
})

export const hideDialog = () => ({
  type: HIDE_REGISTRATION_DLG,
})

export const showPopover = () => ({
  type: SHOW_REGISTRATION_NAG,
})

export const hidePopover = () => ({
  type: HIDE_REGISTRATION_NAG,
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

export const checkRegistration = serialNumber => (dispatch) => {
  fetch(PRODUCT_INSTANCE + serialNumber)
    .then(response => response.json())
    .then(productInstance => dispatch(checkedRegistration(productInstance)))
}
