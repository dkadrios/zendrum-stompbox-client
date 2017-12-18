import { RECEIVED_POLYLOCKS, DELETE_POLYLOCK, ADD_POLYLOCK } from './actions'

export const receivedPolyLocks = locks => ({
  type: RECEIVED_POLYLOCKS,
  locks,
})

export const deletePolyLock = idx => ({
  type: DELETE_POLYLOCK,
  idx,
})

export const addPolyLock = (bank, pitch) => ({
  type: ADD_POLYLOCK,
  bank,
  pitch,
})
