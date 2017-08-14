/* @flow */
import { createReducer } from '../utils'
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../midi'
import type { ReceivedVersionAction } from '../types/Action'

export type VersionState = {
  +checking: boolean,
  +checked: boolean,
  +client: number,
  +anvil: number,
  +expectedAnvil: number,
  +serialNumber: string,
  +userFirstName: string,
  +userLastName: string,
  +userEmail: string,
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

const stompblockMissing = (state: VersionState): VersionState => ({
  ...state,
  checking: false,
  checked: false,
  serialNumber: '',
  userFirstName: '',
  userLastName: '',
  userEmail: '',
})

const handlers = {
  GET_SYSEX_VERSION: checkingVersion,
  RECEIVED_VERSION: receivedVersion,
  STOMPBLOCK_MISSING: stompblockMissing,
}

const defaultState: VersionState = {
  checking: false,
  checked: false,
  client: CURRENT_CLIENT_VERSION,
  anvil: NaN,
  expectedAnvil: CURRENT_ANVIL_VERSION,
  serialNumber: '',
  userFirstName: '', // TODO
  userLastName: '',
  userEmail: '',
}

export default createReducer(defaultState, handlers)
