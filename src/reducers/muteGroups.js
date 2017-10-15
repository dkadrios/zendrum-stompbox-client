/* eslint-disable no-plusplus */
import { createReducer } from '../utils'

const receivedMuteGroups = (state, { payload }) => {
  // TODO - surely there is more functional way to disassemble the data stream
  const byteArr = [...payload]
  const data = []
  let byteIdx = 1

  for (let groupIdx = 0; groupIdx < byteArr[0]; groupIdx++) {
    data[groupIdx] = {
      muteables: byteArr.slice(byteIdx + 2, byteIdx + 2 + byteArr[byteIdx]),
      muters: byteArr.slice(
        byteIdx + 2 + byteArr[byteIdx],
        byteIdx + 2 + byteArr[byteIdx] + byteArr[byteIdx + 1],
      ),
    }
    byteIdx += 2 + byteArr[byteIdx] + byteArr[byteIdx + 1]
  }

  return {
    ...state,
    data: data.map(group => ({
      muteables: [...group.muteables],
      muters: [...group.muters],
    })),
  }
}

const handlers = {
  RECEIVED_MUTE_GROUPS: receivedMuteGroups,
}

const defaultState = {
  data: [],
}

export default createReducer(defaultState, handlers)
