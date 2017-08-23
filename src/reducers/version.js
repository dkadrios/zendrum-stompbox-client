/* @flow */
import { createReducer } from '../utils'
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../midi'
import type { ReceivedVersionAction, CheckedRegistrationAction } from '../types/Action'

export type VersionState = {
  +checking: boolean,
  +checked: boolean,
  +client: number,
  +anvil: number,
  +expectedAnvil: number,
  +serialNumber: string,
  +firstName: string,
  +lastName: string,
  +email: string,
  +registered: boolean,
}

const checkingVersion = (state: VersionState): VersionState => ({
  ...state,
  checking: true,
  checked: false,
})

const receivedVersion = (
  state: VersionState,
  { payload }: ReceivedVersionAction,
): VersionState => ({
  ...state,
  ...payload,
  checking: false,
  checked: true,
})

const checkedRegistration = (state: VersionState, { payload }: CheckedRegistrationAction) => {
  const newState = { ...state }
  const A = payload.registrations.filter(entry => entry.active)

  newState.registered = A.length === 1

  if (newState.registered) {
    const { firstName, lastName, email } = A[0]
    return { ...newState, firstName, lastName, email }
  }

  return newState
}

const stompblockMissing = (state: VersionState): VersionState => ({
  ...state,
  checking: false,
  checked: false,
  serialNumber: '',
  firstName: '',
  lastName: '',
  email: '',
  registered: false,
})

const handlers = {
  GET_SYSEX_VERSION: checkingVersion,
  RECEIVED_VERSION: receivedVersion,
  STOMPBLOCK_MISSING: stompblockMissing,
  CHECKED_REGISTRATION: checkedRegistration,
}

const defaultState: VersionState = {
  checking: false,
  checked: false,
  client: CURRENT_CLIENT_VERSION,
  anvil: NaN,
  expectedAnvil: CURRENT_ANVIL_VERSION,
  serialNumber: '',
  firstName: '', // TODO
  lastName: '',
  email: '',
  registered: false,
}

export default createReducer(defaultState, handlers)
