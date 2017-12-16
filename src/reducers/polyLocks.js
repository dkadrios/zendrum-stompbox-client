import PropTypes from 'prop-types'
import { createReducer, partitionArray } from '../utils'
import { RECEIVED_POLYLOCKS } from '../action-creators/actions'

const receivedPolyLocks = (state, { locks }) => {
  const [, ...rest] = locks
  const data = partitionArray(rest, 2)

  return {
    ...state,
    data: data.map(([channel, pitch]) => ({
      channel,
      pitch,
    })),
  }
}

const handlers = {
  [RECEIVED_POLYLOCKS]: receivedPolyLocks,
}

const defaultState = {
  data: [],
}

export const polyLockShape = {
  channel: PropTypes.number,
  pitch: PropTypes.number,
}

export const polyLocksShape = {
  data: PropTypes.arrayOf(PropTypes.shape(polyLockShape)),
}

export default createReducer(defaultState, handlers)
