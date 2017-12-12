import fetch from 'isomorphic-fetch'
import { submit } from 'redux-form'
import { PRODUCT_INSTANCE, PRODUCT_REGISTRATION } from '../endpoints'
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

export const deviceRegistered = productInstance => ({
  type: DEVICE_REGISTERED,
  productInstance,
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

export const submitRegistrationForm = () => (dispatch) => {
  dispatch(submit('userRegistrationForm'))
}

export const submitRegistration = form => (dispatch) => {
  const { serialNumber, firstName, lastName, email } = form
  const registration = { firstName, lastName, email }

  fetch(`${PRODUCT_REGISTRATION}/${serialNumber}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registration),
  })
    .then(response => response.json())
    .then(newRegistration => dispatch(deviceRegistered(newRegistration)))
    .then(() => dispatch(hideDialog()))
}

export const checkRegistration = (serialNumber, anvil) => (dispatch) => {
  fetch(`${PRODUCT_INSTANCE}/${serialNumber}?v=${anvil}`)
    .then(response => response.json())
    .then(productInstance => dispatch(checkedRegistration(productInstance)))
}
