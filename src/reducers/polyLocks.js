import PropTypes from 'prop-types'
import { createReducer, partitionArray } from '../utils'
import {
  RECEIVED_POLYLOCKS,
  RECEIVED_VERSION,
  ADD_POLYLOCK,
  DELETE_POLYLOCK,
} from '../action-creators/actions'

const receivedPolyLocks = (state, { locks }) => {
  const [, ...rest] = locks
  const data = partitionArray(rest, 2)

  return {
    ...state,
    data: data.map(([bank, pitch], idx) => ({
      bank,
      pitch,
      idx,
    })),
  }
}

const receivedVersion = (state, { anvil /* serialNumber */ }) => ({
  ...state,
  hasVersionThreeFirmware: anvil >= 30,
  hasSoundBankSupport: anvil >= 30,
})

const addItem = (state, { bank, pitch }) => ({
  ...state,
  data: [...state.data, { bank, pitch }].map((item, idx) => ({ ...item, idx })),
})

const removeItem = (state, { bank, pitch }) => ({
  ...state,
  data: state.data
    .filter(item => !(item.bank === bank && item.pitch === pitch))
    .map((item, idx) => ({ ...item, idx })),
})

const handlers = {
  [RECEIVED_POLYLOCKS]: receivedPolyLocks,
  [RECEIVED_VERSION]: receivedVersion,
  [ADD_POLYLOCK]: addItem,
  [DELETE_POLYLOCK]: removeItem,
}

const defaultState = {
  data: [],
  hasVersionThreeFirmware: false,
  hasSoundBankSupport: false,
}

export const polyLockShape = {
  idx: PropTypes.number,
  bank: PropTypes.number,
  pitch: PropTypes.number,
}

export const polyLocksShape = {
  data: PropTypes.arrayOf(PropTypes.shape(polyLockShape)),
  hasVersionThreeFirmware: PropTypes.bool,
  hasSoundBankSupport: PropTypes.bool,
}

export default createReducer(defaultState, handlers)
