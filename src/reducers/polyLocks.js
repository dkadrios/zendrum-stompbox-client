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
    data: data.map(([bank, pitch]) => ({
      bank,
      pitch,
    })),
  }
}

const receivedVersion = (state, { anvil }) => ({
  ...state,
  hasSoundBankSupport: anvil >= 30,
})

const addItem = (state, { bank, pitch }) => ({
  ...state,
  data: [...state.data, { bank, pitch }],
})

const removeItem = (state, { bank, pitch }) => ({
  ...state,
  data: state.data.filter(item => !(item.bank === bank && item.pitch === pitch)),
})

const handlers = {
  [RECEIVED_POLYLOCKS]: receivedPolyLocks,
  [RECEIVED_VERSION]: receivedVersion,
  [ADD_POLYLOCK]: addItem,
  [DELETE_POLYLOCK]: removeItem,
}

const defaultState = {
  data: [],
  hasSoundBankSupport: false,
}

export const polyLockShape = {
  bank: PropTypes.number,
  pitch: PropTypes.number,
}

export const polyLocksShape = {
  data: PropTypes.arrayOf(PropTypes.shape(polyLockShape)),
  hasSoundBankSupport: PropTypes.bool,
}

export default createReducer(defaultState, handlers)
