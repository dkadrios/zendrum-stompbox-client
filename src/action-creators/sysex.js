import fetch from 'isomorphic-fetch'
import shortid from 'shortid'
import now from 'performance-now'
import { sendMidiMessage } from 'redux-midi'
import { checkedRegistration } from './stompblock'
import { PRODUCT_INSTANCE } from '../endpoints'
import {
  SYSEX_START,
  SYSEX_END,
  STOMPBLOCK_DEVICE_ID,
  CURRENT_ANVIL_VERSION,
  SYSEX_MSG_GET_VERSION,
  SYSEX_MSG_GET_ALL,
  SYSEX_MSG_SET_ITEM,
  SYSEX_MSG_SET_MUTE_ENABLED,
  SYSEX_MSG_SET_THRU_ENABLED,
  SYSEX_MSG_SET_MUTE_GROUPS_ENABLED,
  SYSEX_MSG_PLAY_NOTE,
  SYSEX_MSG_FACTORY_RESET,
  SYSEX_MSG_DELETE_MUTE_GROUP,
  SYSEX_MSG_DELETE_MUTE_ITEM,
  SYSEX_MSG_ADD_MUTE_GROUP,
  SYSEX_MSG_ADD_MUTE_ITEM,
} from '../midi'

let deviceId = ''

const thunkTogether = (action1, action2) => (dispatch) => {
  dispatch(action2)
  dispatch(action1)
}

export const sysexAction = (command, ...data) =>
  sendMidiMessage({
    data: [
      SYSEX_START,
      STOMPBLOCK_DEVICE_ID,
      CURRENT_ANVIL_VERSION,
      command,
      ...data,
      SYSEX_END,
    ],
    timestamp: now(),
    device: deviceId,
  })

export const setOutputDeviceId = (id) => {
  deviceId = id
}

export const playNote = (noteNum, velocity) =>
  thunkTogether(sysexAction(SYSEX_MSG_PLAY_NOTE, noteNum, velocity), {
    type: 'PLAY_NOTE',
    payload: { noteNum, velocity },
  })

export const checkVersion = () =>
  thunkTogether(
    sysexAction(
      SYSEX_MSG_GET_VERSION,
      // Suggested serial number, if not already registered.
      ...Array.from(shortid.generate(), char => char.charCodeAt(0)),
    ),
    { type: 'GET_SYSEX_VERSION' },
  )

export const receivedVersion = (anvil, serialNumber) => (dispatch) => {
  dispatch({
    type: 'RECEIVED_VERSION',
    payload: { anvil, serialNumber },
  })

  fetch(PRODUCT_INSTANCE + serialNumber)
    .then(response => response.json())
    .then(productInstance => dispatch(checkedRegistration(productInstance)))
}

export const confirmFactoryReset = show => ({
  type: 'CONFIRM_FACTORY_RESET',
  payload: show,
})

export const performFactoryReset = () =>
  thunkTogether(sysexAction(SYSEX_MSG_FACTORY_RESET), { type: 'FACTORY_RESET' })

export const reloadSysEx = () =>
  thunkTogether(sysexAction(SYSEX_MSG_GET_ALL), { type: 'RELOAD_SYSEX' })

export const receivedVelocityTrims = data => ({
  type: 'RECEIVED_ALL_TRIMS',
  payload: data,
})

export const userChangedTrim = (noteNum, value) => ({
  type: 'USER_CHANGED_TRIM',
  payload: { noteNum, value },
})

// This is the only one we send to the firmware
export const userChangedTrimEnd = (noteNum, value) =>
  thunkTogether(sysexAction(SYSEX_MSG_SET_ITEM, noteNum, value), {
    type: 'USER_CHANGED_TRIM_END',
    payload: { noteNum, value },
  })

export const setMuteEnabled = enabled =>
  thunkTogether(sysexAction(SYSEX_MSG_SET_MUTE_ENABLED, Number(enabled)), {
    type: 'SET_MUTE_ENABLED',
    payload: enabled,
  })

export const setThruEnabled = enabled =>
  thunkTogether(sysexAction(SYSEX_MSG_SET_THRU_ENABLED, Number(enabled)), {
    type: 'SET_THRU_ENABLED',
    payload: enabled,
  })

export const setMuteGroupsEnabled = enabled =>
  thunkTogether(
    sysexAction(SYSEX_MSG_SET_MUTE_GROUPS_ENABLED, Number(enabled)),
    {
      type: 'SET_MUTE_GROUPS_ENABLED',
      payload: enabled,
    },
  )

export const receivedMuteEnabled = enabled => ({
  type: 'RECEIVED_MUTE_ENABLED',
  payload: enabled,
})

export const receivedThruEnabled = enabled => ({
  type: 'RECEIVED_THRU_ENABLED',
  payload: enabled,
})

export const receivedMuteGroupsEnabled = enabled => ({
  type: 'RECEIVED_MUTE_GROUPS_ENABLED',
  payload: enabled,
})

export const receivedMuteGroups = payload => ({
  type: 'RECEIVED_MUTE_GROUPS',
  payload,
})

export const deleteMuteGroup = groupIdx =>
  thunkTogether(sysexAction(SYSEX_MSG_DELETE_MUTE_GROUP, groupIdx), {
    type: 'DELETE_MUTE_GROUP',
    payload: groupIdx,
  })

export const addMuteGroup = () =>
  thunkTogether(sysexAction(SYSEX_MSG_ADD_MUTE_GROUP), {
    type: 'ADD_MUTE_GROUP',
  })

export const deleteMuteItem = (groupIdx, muter, itemIdx) =>
  thunkTogether(
    sysexAction(SYSEX_MSG_DELETE_MUTE_ITEM, groupIdx, Number(muter), itemIdx),
    {
      type: 'DELETE_MUTE_ITEM',
      payload: { groupIdx, muter, itemIdx },
    },
  )

export const addMuteItem = (groupIdx, muter, noteNum) =>
  thunkTogether(
    sysexAction(SYSEX_MSG_ADD_MUTE_ITEM, groupIdx, Number(muter), noteNum),
    {
      type: 'ADD_MUTE_ITEM',
      payload: { groupIdx, muter, noteNum },
    },
  )
