/* eslint-disable no-plusplus */
import stompblockMapping from '../mappings/stompblock'
import {
  RECEIVED_MUTE_GROUPS,
} from '../actions'
import { createReducer } from '../utils'

const receivedMuteGroups = (state, { payload }) => {
  // TODO - surely there is more functional way to disassemble the data stream
  const byteArr = [...payload]
  const muteGroups = []
  let byteIdx = 1

  for (let groupIdx = 0; groupIdx < byteArr[0]; groupIdx++) {
    muteGroups[groupIdx] = {
      muteables: byteArr.slice(
        byteIdx + 2,
        byteIdx + 2 + byteArr[byteIdx],
      ),
      muters: byteArr.slice(
        byteIdx + 2 + byteArr[byteIdx],
        byteIdx + 2 + byteArr[byteIdx] + byteArr[byteIdx + 1],
      ),
    }
    byteIdx += 2 + byteArr[byteIdx] + byteArr[byteIdx + 1]
  }

  return {
    ...state,
    muteGroups: muteGroups.map(group => ({
      muteables: group.muteables.map(noteNum =>
        stompblockMapping.find(entry => entry.note === noteNum)),
      muters: group.muters.map(noteNum =>
        stompblockMapping.find(entry => entry.note === noteNum)),
    })),
  }
}

const handlers = {
  [RECEIVED_MUTE_GROUPS]: receivedMuteGroups,
}

export default createReducer({
  muteGroups: [],
}, handlers)
