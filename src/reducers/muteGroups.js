/* eslint-disable no-plusplus */
import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import {
  RECEIVED_MUTE_GROUPS,
  RECEIVED_VERSION,
  SET_MUTE_GROUP_BANK,
} from '../action-creators/actions'

const receivedMuteGroups = (state, { groups: packet }) => {
  const [numGroups, ...raw] = packet
  const groups = []

  let byteIdx = 0
  let bank
  let numMuteables
  let numMuters
  let muteables
  let muters

  for (let groupIdx = 0; groupIdx < numGroups; groupIdx++) {
    if (state.hasVersionThreeFirmware) {
      bank = raw[byteIdx++]
    } else {
      bank = 0
    }
    numMuteables = raw[byteIdx++]
    numMuters = raw[byteIdx++]

    muteables = raw.slice(byteIdx, byteIdx + numMuteables)
    byteIdx += numMuteables

    muters = raw.slice(byteIdx, byteIdx + numMuters)
    byteIdx += numMuters

    groups[groupIdx] = {
      bank,
      muteables,
      muters,
    }
  }

  return {
    ...state,
    data: groups.map(group => ({
      bank: group.bank,
      muteables: [...group.muteables],
      muters: [...group.muters],
    })),
  }
}

const receivedVersion = (state, { anvil /* , serialNumber */ }) => ({
  ...state,
  hasVersionThreeFirmware: anvil >= 30,
  hasSoundBankSupport: anvil >= 30,
})

const setBank = (state, { groupIdx, bank }) => ({
  ...state,
  data: state.data.map((
    group,
    idx, //
  ) => ({ ...group, bank: idx === groupIdx ? bank : group.bank })),
})

const handlers = {
  [RECEIVED_MUTE_GROUPS]: receivedMuteGroups,
  [RECEIVED_VERSION]: receivedVersion,
  [SET_MUTE_GROUP_BANK]: setBank,
}

const defaultState = {
  data: [],
  hasVersionThreeFirmware: false,
  hasSoundBankSupport: false,
}

export const muteGroupShape = {
  bank: PropTypes.number,
  muteables: PropTypes.arrayOf(PropTypes.number),
  muters: PropTypes.arrayOf(PropTypes.number),
}

export const muteGroupsShape = {
  data: PropTypes.arrayOf(PropTypes.shape(muteGroupShape)),
  hasVersionThreeFirmware: PropTypes.bool,
  hasSoundBankSupport: PropTypes.bool,
}

export default createReducer(defaultState, handlers)
