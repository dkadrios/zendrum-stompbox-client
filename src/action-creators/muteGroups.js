import {
  RECEIVED_MUTE_GROUPS,
  DELETE_MUTE_GROUP,
  ADD_MUTE_GROUP,
  DELETE_MUTE_ITEM,
  ADD_MUTE_ITEM,
} from './actions'

export const receivedMuteGroups = groups => ({
  type: RECEIVED_MUTE_GROUPS,
  groups,
})

export const deleteMuteGroup = groupIdx => ({
  type: DELETE_MUTE_GROUP,
  groupIdx,
})

export const addMuteGroup = () => ({
  type: ADD_MUTE_GROUP,
})

export const deleteMuteItem = (groupIdx, muter, itemIdx) => ({
  type: DELETE_MUTE_ITEM,
  groupIdx,
  muter,
  itemIdx,
})

export const addMuteItem = (groupIdx, muter, noteNum) => ({
  type: ADD_MUTE_ITEM,
  groupIdx,
  muter,
  noteNum,
})
