/* eslint-disable no-plusplus */
import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import { RECEIVED_MUTE_GROUPS } from '../action-creators/actions'

const receivedMuteGroups = (state, { groups }) => {
  // TODO - surely there is more functional way to disassemble the data stream
  const byteArr = [...groups]
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
  [RECEIVED_MUTE_GROUPS]: receivedMuteGroups,
}

const defaultState = {
  data: [],
}

export const muteGroupShape = {
  muteables: PropTypes.arrayOf(PropTypes.number),
  muters: PropTypes.arrayOf(PropTypes.number),
}

export const muteGroupsShape = {
  data: PropTypes.arrayOf(PropTypes.shape(muteGroupShape)),
}

export default createReducer(defaultState, handlers)
