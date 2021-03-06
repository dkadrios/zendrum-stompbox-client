/* eslint-disable no-bitwise */

import { STOMPBLOCK_DEVICE_ID } from '.'

import { MASK_STATUS, MASK_CHANNEL, STATUS_NOTE_OFF } from '.'

import {
  SYSEX_START,
  SYSEX_MSG_RECEIVE_VERSION,
  SYSEX_MSG_RECEIVED_MUTE_ENABLED,
  SYSEX_MSG_RECEIVED_THRU_ENABLED,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED,
  SYSEX_MSG_RECEIVED_POLYLOCKS_ENABLED,
  SYSEX_MSG_RECEIVE_ALL,
  SYSEX_MSG_RECEIVED_SECOND_BANK,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS,
  SYSEX_MSG_RECEIVED_MIDI_SETTINGS,
  SYSEX_MSG_RECEIVED_POLYLOCKS,
  SYSEX_MSG_STATE_CHANGED,
} from './sysex'

import { receivedVelocityTrims, notePlayed } from '../action-creators/velocityTrim'
import { receivedVersion } from '../action-creators/version'
import { receivedMuteGroups } from '../action-creators/muteGroups'
import {
  receivedMuteEnabled,
  receivedThruEnabled,
  receivedMuteGroupsEnabled,
  receivedMidiSettings,
  receivedPolyLocksEnabled,
} from '../action-creators/settings'

import { loadMapping } from '../action-creators/mapping'

import { askForFullData } from './sysexOutput'
import { receivedPolyLocks } from '../action-creators/polyLocks'
import { receivedInternalState } from '../action-creators/stompblock'

const processMidiMessage = (store, { data }) => {
  const { getState, dispatch } = store
  const [kind, deviceId, , command, ...packet] = data.slice(0, data.length - 1)

  // One of our packets?
  if (kind === SYSEX_START && deviceId === STOMPBLOCK_DEVICE_ID) {
    let serial
    let trims
    switch (command) {
      case SYSEX_MSG_RECEIVE_VERSION:
        // TODO: find more functional way to do this.
        // Trim SysEx header and footer
        serial = [...packet].slice(1, packet.length - 2)
        // Remove any trailing zeros (but none within!)
        while (serial.length && serial[serial.length - 1] === 0) {
          serial.pop()
        }

        dispatch(receivedVersion(
          packet[0], // version
          serial.reduce((val, char) => val + String.fromCharCode(char), ''),
        ))

        askForFullData(dispatch)
        dispatch(loadMapping(0))
        dispatch(loadMapping(1))
        break

      case SYSEX_MSG_RECEIVE_ALL:
        trims = packet.filter((item, idx) => idx < 128)
        dispatch(receivedVelocityTrims(trims, 0))
        break

      case SYSEX_MSG_RECEIVED_SECOND_BANK:
        trims = packet.filter((item, idx) => idx < 128)
        dispatch(receivedVelocityTrims(trims, 1))
        break

      case SYSEX_MSG_RECEIVED_MUTE_ENABLED:
        dispatch(receivedMuteEnabled(!!packet[0]))
        break

      case SYSEX_MSG_RECEIVED_THRU_ENABLED:
        dispatch(receivedThruEnabled(!!packet[0]))
        break

      case SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED:
        dispatch(receivedMuteGroupsEnabled(!!packet[0]))
        break

      case SYSEX_MSG_RECEIVED_POLYLOCKS_ENABLED:
        dispatch(receivedPolyLocksEnabled(!!packet[0]))
        break

      case SYSEX_MSG_RECEIVED_MUTE_GROUPS:
        dispatch(receivedMuteGroups(packet))
        break

      case SYSEX_MSG_RECEIVED_MIDI_SETTINGS:
        dispatch(receivedMidiSettings(packet))
        break

      case SYSEX_MSG_RECEIVED_POLYLOCKS:
        dispatch(receivedPolyLocks(packet))
        break

      case SYSEX_MSG_STATE_CHANGED:
        dispatch(receivedInternalState(packet))
        break

      default:
        console.log('Unknown SysEx message received: ', command) // eslint-disable-line
    }
  } else {
    const status = ((kind & MASK_STATUS) >> 4) | 8
    const channel = (kind & MASK_CHANNEL) + 1
    const { settings: { channelA, channelB } } = getState()
    if (status === STATUS_NOTE_OFF && (channel === channelA || channel === channelB)) {
      dispatch(notePlayed(data[1], channel === channelA ? 0 : 1))
    }
  }
}

export default processMidiMessage
