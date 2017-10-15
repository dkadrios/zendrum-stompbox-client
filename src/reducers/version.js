import { createReducer } from '../utils'
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../midi'
import {
  GET_SYSEX_VERSION,
  RECEIVED_VERSION,
  STOMPBLOCK_MISSING,
  CHECKED_REGISTRATION,
  DEVICE_REGISTERED,
} from '../action-creators/actions'

const checkingVersion = state => ({
  ...state,
  checking: true,
  checked: false,
})

const receivedVersion = (state, { payload }) => ({
  ...state,
  ...payload,
  checking: false,
  checked: true,
})

const checkedRegistration = (state, { payload }) => {
  let newState = { ...state, checkedRegistration: true }
  const A = payload.registrations.filter(entry => entry.active)

  newState.registered = A.length === 1

  if (newState.registered) {
    const { firstName, lastName, email } = A[0]
    newState = { ...newState, firstName, lastName, email }
  }
  return newState
}

const stompblockMissing = state => ({
  ...state,
  checking: false,
  checked: false,
  serialNumber: '',
  firstName: '',
  lastName: '',
  email: '',
  checkedRegistration: false,
  registered: false,
})

const handlers = {
  [GET_SYSEX_VERSION]: checkingVersion,
  [RECEIVED_VERSION]: receivedVersion,
  [STOMPBLOCK_MISSING]: stompblockMissing,
  [CHECKED_REGISTRATION]: checkedRegistration,
  [DEVICE_REGISTERED]: checkedRegistration,
}

const defaultState = {
  checking: false,
  checked: false,
  client: CURRENT_CLIENT_VERSION,
  anvil: NaN,
  expectedAnvil: CURRENT_ANVIL_VERSION,
  serialNumber: '',
  firstName: '',
  lastName: '',
  email: '',
  checkedRegistration: false,
  registered: false,
}

export default createReducer(defaultState, handlers)
