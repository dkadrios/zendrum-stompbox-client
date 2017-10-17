import { createReducer } from '../utils'
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../midi/'
import { GET_SYSEX_VERSION, RECEIVED_VERSION, STOMPBLOCK_MISSING } from '../action-creators/actions'

const checkingVersion = state => ({
  ...state,
  checking: true,
  checked: false,
})

const receivedVersion = (state, { anvil }) => ({
  ...state,
  anvil,
  checking: false,
  checked: true,
})

const stompblockMissing = state => ({
  ...state,
  checking: false,
  checked: false,
})

const handlers = {
  [GET_SYSEX_VERSION]: checkingVersion,
  [RECEIVED_VERSION]: receivedVersion,
  [STOMPBLOCK_MISSING]: stompblockMissing,
}

const defaultState = {
  checking: false,
  checked: false,
  client: CURRENT_CLIENT_VERSION,
  anvil: NaN,
  expectedAnvil: CURRENT_ANVIL_VERSION,
}

export default createReducer(defaultState, handlers)
