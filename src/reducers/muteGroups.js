/* @flow */
/* eslint-disable no-plusplus */

import { createReducer } from '../utils'

import type { ReceivedMuteGroupsAction } from '../types/Action'

export type MuteGroup = {
  +muteables: ArrayOfMappingEntries,
  +muters: ArrayOfMappingEntries,
}

export type PseudoMuteGroup = {
  muteables: Array<number>,
  muters: Array<number>,
}

export type MuteGroupsState = {
  +data: Array<MuteGroup>,
}

const receivedMuteGroups = (
  state: MuteGroupsState,
  { payload }: ReceivedMuteGroupsAction,
): MuteGroupsState => {
  // TODO - surely there is more functional way to disassemble the data stream
  const byteArr: Array<number> = [...payload]
  const data: Array<PseudoMuteGroup> = []
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
    data: data.map((group: PseudoMuteGroup): MuteGroup => ({
      muteables: [...group.muteables],
      muters: [...group.muters],
    })),
  }
}

const handlers = {
  RECEIVED_MUTE_GROUPS: receivedMuteGroups,
}

const defaultState: MuteGroupsState = {
  data: [],
}

export default createReducer(defaultState, handlers)
