import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import {
  RECEIVED_VERSION,
  CHECKED_REGISTRATION,
  DEVICE_REGISTERED,
  SHOW_REGISTRATION_DLG,
  HIDE_REGISTRATION_DLG,
  SHOW_REGISTRATION_NAG,
  HIDE_REGISTRATION_NAG,
} from '../action-creators/actions'

const RESTOMP_PRODUCT_ID = 8
const RESTOMP_AFFILIATE_PRODUCT_ID = 10

const restompProductIds = [RESTOMP_PRODUCT_ID, RESTOMP_AFFILIATE_PRODUCT_ID]

const receivedVersion = (state, { serialNumber }) => ({
  ...state,
  serialNumber,
})

const toggleDialog = dialogVisible => state => ({
  ...state,
  dialogVisible,
})

const togglePopover = popoverVisible => state => ({
  ...state,
  popoverVisible,
})

const restompIsPresent = ancillaryProducts =>
  (ancillaryProducts || []).filter(({ PRODUCT_ID }) => restompProductIds.includes(PRODUCT_ID)).length > 0

const checkedRegistration = (state, { productInstance: { registrations, ancillaryProducts } }) => {
  let newState = { ...state, checkedRegistration: true }
  const A = (registrations || []).filter(entry => entry.active)

  newState.registered = A.length === 1

  if (newState.registered) {
    const { firstName, lastName, email } = A[0]
    newState = { ...newState, firstName, lastName, email, ownsRestomp: restompIsPresent(ancillaryProducts) }
    return togglePopover(false)(newState)
  }
  return togglePopover(true)(newState)
}

const handlers = {
  [RECEIVED_VERSION]: receivedVersion,
  [CHECKED_REGISTRATION]: checkedRegistration,
  [DEVICE_REGISTERED]: checkedRegistration,
  [SHOW_REGISTRATION_DLG]: toggleDialog(true),
  [HIDE_REGISTRATION_DLG]: toggleDialog(false),
  [SHOW_REGISTRATION_NAG]: togglePopover(true),
  [HIDE_REGISTRATION_NAG]: togglePopover(false),
}

const defaultState = {
  serialNumber: '',
  firstName: '',
  lastName: '',
  email: '',
  checkedRegistration: false,
  registered: false,
  dialogVisible: false,
  popoverVisible: false,
  ownsRestomp: false,
}

export const userShape = {
  serialNumber: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  checkedRegistration: PropTypes.bool,
  registered: PropTypes.bool,
  dialogVisible: PropTypes.bool,
  popoverVisible: PropTypes.bool,
  ownsRestomp: PropTypes.bool,
}

export default createReducer(defaultState, handlers)
