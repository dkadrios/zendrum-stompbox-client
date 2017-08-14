/* @flow */
/* eslint-disable no-plusplus */

import stompblockMapping from '../mappings/stompblock'
import { createReducer } from '../utils'

import type { ReceivedMuteGroupsAction } from '../types/Action'
import type { MappingEntry } from '../types/Mappings'

type ArrayOfMappingEntries = Array<MappingEntry>

export type MuteGroup = {
  +muteables: ArrayOfMappingEntries,
  +muters: ArrayOfMappingEntries,
}

export type PseudoMuteGroup = {
  muteables: Array<number>,
  muters: Array<number>,
}

export type MuteGroupsState = {
  +muteGroups: Array<MuteGroup>,
}

const mapping: ArrayOfMappingEntries = [...stompblockMapping]

const receivedMuteGroups = (
  state: MuteGroupsState,
  { payload }: ReceivedMuteGroupsAction,
): MuteGroupsState => {
  // TODO - surely there is more functional way to disassemble the data stream
  const byteArr: Array<number> = [...payload]
  const muteGroups: Array<PseudoMuteGroup> = []
  let byteIdx = 1

  for (let groupIdx = 0; groupIdx < byteArr[0]; groupIdx++) {
    muteGroups[groupIdx] = {
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
    muteGroups: muteGroups.map((group: PseudoMuteGroup): MuteGroup => ({
      muteables: group.muteables.map((noteNum: number): any =>
        mapping.find((entry: MappingEntry) => entry.note === noteNum),
      ),
      muters: group.muters.map((noteNum: number): any =>
        mapping.find((entry: MappingEntry) => entry.note === noteNum),
      ),
    })),
  }
}

const handlers = {
  RECEIVED_MUTE_GROUPS: receivedMuteGroups,
}

const defaultState: MuteGroupsState = {
  muteGroups: [],
}

export default createReducer(defaultState, handlers)
