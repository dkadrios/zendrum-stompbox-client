import { RECEIVED_POLYLOCKS, DELETE_POLYLOCK, ADD_POLYLOCK } from './actions'

export const receivedPolyLocks = locks => ({
  type: RECEIVED_POLYLOCKS,
  locks,
})

export const deletePolyLock = lockIdx => ({
  type: DELETE_POLYLOCK,
  lockIdx,
})

export const addPolyLock = (channel, pitch) => ({
  type: ADD_POLYLOCK,
  channel,
  pitch,
})
