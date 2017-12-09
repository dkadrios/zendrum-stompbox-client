/* eslint-disable no-bitwise */
import { sendMidiMessage } from 'redux-midi'
import now from 'performance-now'
import { stompblockOutputId } from './devices'
import { STOMPBLOCK_DEVICE_ID, CURRENT_CLIENT_VERSION } from './'

import {
  SYSEX_START,
  SYSEX_END,
  SYSEX_MSG_GET_VERSION,
  SYSEX_MSG_RECEIVED_MUTE_ENABLED,
  SYSEX_MSG_RECEIVED_THRU_ENABLED,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS,
  SYSEX_MSG_GET_ALL,
  SYSEX_MSG_PLAY_NOTE,
  SYSEX_MSG_FACTORY_RESET,
  SYSEX_MSG_DELETE_MUTE_GROUP,
  SYSEX_MSG_ADD_MUTE_GROUP,
  SYSEX_MSG_DELETE_MUTE_ITEM,
  SYSEX_MSG_ADD_MUTE_ITEM,
  SYSEX_MSG_SET_ITEM,
  SYSEX_MSG_GET_MIDI_SETTINGS,
  SYSEX_MSG_SET_CHANNEL_A,
  SYSEX_MSG_SET_CHANNEL_B,
  SYSEX_MSG_SET_VELOCITY_VARIANCE,
  SYSEX_MSG_SET_ROUND_ROBIN,
} from './sysex'

const transmitAction = (command, data = []) =>
  sendMidiMessage({
    data: [SYSEX_START, STOMPBLOCK_DEVICE_ID, CURRENT_CLIENT_VERSION, command, ...data, SYSEX_END],
    timestamp: now(),
    device: stompblockOutputId(),
  })

export const askForVersion = (dispatch, serialNumber) => {
  dispatch(transmitAction(
    //
    SYSEX_MSG_GET_VERSION,
    Array.from(serialNumber, char => char.charCodeAt(0)),
  ))
}

export const reloadSysEx = dispatch => dispatch(transmitAction(SYSEX_MSG_GET_ALL))

export const askForFullData = (dispatch) => {
  dispatch(transmitAction(SYSEX_MSG_RECEIVED_MUTE_ENABLED))
  dispatch(transmitAction(SYSEX_MSG_RECEIVED_THRU_ENABLED))
  dispatch(transmitAction(SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED))
  dispatch(transmitAction(SYSEX_MSG_RECEIVED_MUTE_GROUPS))
  dispatch(transmitAction(SYSEX_MSG_GET_MIDI_SETTINGS))
  /* istanbul ignore next */
  if (!__TEST__) {
    reloadSysEx(dispatch)
  }
}

export const setBooleanValue = (dispatch, command, value) =>
  dispatch(transmitAction(command, [value]))

export const playNote = (dispatch, bank, noteNum, velocity) =>
  dispatch(transmitAction(SYSEX_MSG_PLAY_NOTE, [noteNum, velocity, bank]))

export const performFactoryReset = dispatch => dispatch(transmitAction(SYSEX_MSG_FACTORY_RESET))

export const deleteMuteGroup = (dispatch, groupIdx) =>
  dispatch(transmitAction(SYSEX_MSG_DELETE_MUTE_GROUP, [groupIdx]))

export const addMuteGroup = dispatch => dispatch(transmitAction(SYSEX_MSG_ADD_MUTE_GROUP))

export const deleteMuteItem = (dispatch, groupIdx, muter, itemIdx) =>
  dispatch(transmitAction(SYSEX_MSG_DELETE_MUTE_ITEM, [groupIdx, Number(muter), itemIdx]))

export const addMuteItem = (dispatch, groupIdx, muter, noteNum) =>
  dispatch(transmitAction(SYSEX_MSG_ADD_MUTE_ITEM, [groupIdx, Number(muter), noteNum]))

export const changeTrim = (dispatch, bank, noteNum, value) =>
  dispatch(transmitAction(SYSEX_MSG_SET_ITEM, [noteNum, value, bank]))

export const setChannelA = (dispatch, channelA) =>
  dispatch(transmitAction(SYSEX_MSG_SET_CHANNEL_A, [channelA]))

export const setChannelB = (dispatch, channelB) =>
  dispatch(transmitAction(SYSEX_MSG_SET_CHANNEL_B, [channelB]))

export const setVelocityVariance = (dispatch, velocityVariance) =>
  dispatch(transmitAction(SYSEX_MSG_SET_VELOCITY_VARIANCE, [velocityVariance]))

export const setRoundRobinEnabled = (dispatch, roundRobinEnabled) =>
  dispatch(transmitAction(SYSEX_MSG_SET_ROUND_ROBIN, [roundRobinEnabled]))