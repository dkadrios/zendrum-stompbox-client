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
import {
  PLAY_NOTE,
  GET_SYSEX_VERSION,
  RECEIVED_VERSION,
  CONFIRM_FACTORY_RESET,
  FACTORY_RESET,
  RELOAD_SYSEX,
  RECEIVED_ALL_TRIMS,
  USER_CHANGED_TRIM,
  USER_CHANGED_TRIM_END,
  SET_MUTE_ENABLED,
  SET_THRU_ENABLED,
  SET_MUTE_GROUPS_ENABLED,
  RECEIVED_MUTE_ENABLED,
  RECEIVED_THRU_ENABLED,
  RECEIVED_MUTE_GROUPS_ENABLED,
  RECEIVED_MUTE_GROUPS,
  DELETE_MUTE_GROUP,
  ADD_MUTE_GROUP,
  DELETE_MUTE_ITEM,
  ADD_MUTE_ITEM,
} from './actions'

let deviceId = ''

const thunkTogether = (action1, action2) => (dispatch) => {
  dispatch(action2)
  dispatch(action1)
}

export const sysexAction = (command, ...data) =>
  sendMidiMessage({
    data: [SYSEX_START, STOMPBLOCK_DEVICE_ID, CURRENT_ANVIL_VERSION, command, ...data, SYSEX_END],
    timestamp: now(),
    device: deviceId,
  })

export const setOutputDeviceId = (id) => {
  deviceId = id
}

export const playNote = (noteNum, velocity) =>
  thunkTogether(sysexAction(SYSEX_MSG_PLAY_NOTE, noteNum, velocity), {
    type: PLAY_NOTE,
    noteNum,
    velocity,
  })

export const checkVersion = () =>
  thunkTogether(
    sysexAction(
      SYSEX_MSG_GET_VERSION,
      // Suggested serial number, if not already registered.
      ...Array.from(shortid.generate(), char => char.charCodeAt(0)),
    ),
    { type: GET_SYSEX_VERSION },
  )

export const receivedVersion = (anvil, serialNumber) => (dispatch) => {
  dispatch({
    type: RECEIVED_VERSION,
    anvil,
    serialNumber,
  })

  fetch(PRODUCT_INSTANCE + serialNumber)
    .then(response => response.json())
    .then(productInstance => dispatch(checkedRegistration(productInstance)))
}

export const confirmFactoryReset = showResetDialog => ({
  type: CONFIRM_FACTORY_RESET,
  showResetDialog,
})

export const performFactoryReset = () =>
  thunkTogether(sysexAction(SYSEX_MSG_FACTORY_RESET), { type: FACTORY_RESET })

export const reloadSysEx = () =>
  thunkTogether(sysexAction(SYSEX_MSG_GET_ALL), { type: RELOAD_SYSEX })

export const receivedVelocityTrims = incomingTrims => ({
  type: RECEIVED_ALL_TRIMS,
  incomingTrims,
})

export const userChangedTrim = (noteNum, value) => ({
  type: USER_CHANGED_TRIM,
  noteNum,
  value,
})

// This is the only one we send to the firmware
export const userChangedTrimEnd = (noteNum, value) =>
  thunkTogether(sysexAction(SYSEX_MSG_SET_ITEM, noteNum, value), {
    type: USER_CHANGED_TRIM_END,
    noteNum,
    value,
  })

export const setMuteEnabled = muteEnabledAtStart =>
  thunkTogether(sysexAction(SYSEX_MSG_SET_MUTE_ENABLED, Number(muteEnabledAtStart)), {
    type: SET_MUTE_ENABLED,
    muteEnabledAtStart,
  })

export const setThruEnabled = thruEnabledAtStart =>
  thunkTogether(sysexAction(SYSEX_MSG_SET_THRU_ENABLED, Number(thruEnabledAtStart)), {
    type: SET_THRU_ENABLED,
    thruEnabledAtStart,
  })

export const setMuteGroupsEnabled = muteGroupsEnabled =>
  thunkTogether(sysexAction(SYSEX_MSG_SET_MUTE_GROUPS_ENABLED, Number(muteGroupsEnabled)), {
    type: SET_MUTE_GROUPS_ENABLED,
    muteGroupsEnabled,
  })

export const receivedMuteEnabled = muteEnabledAtStart => ({
  type: RECEIVED_MUTE_ENABLED,
  muteEnabledAtStart,
})

export const receivedThruEnabled = thruEnabledAtStart => ({
  type: RECEIVED_THRU_ENABLED,
  thruEnabledAtStart,
})

export const receivedMuteGroupsEnabled = muteGroupsEnabled => ({
  type: RECEIVED_MUTE_GROUPS_ENABLED,
  muteGroupsEnabled,
})

export const receivedMuteGroups = groups => ({
  type: RECEIVED_MUTE_GROUPS,
  groups,
})

export const deleteMuteGroup = groupIdx =>
  thunkTogether(sysexAction(SYSEX_MSG_DELETE_MUTE_GROUP, groupIdx), {
    type: DELETE_MUTE_GROUP,
    groupIdx,
  })

export const addMuteGroup = () =>
  thunkTogether(sysexAction(SYSEX_MSG_ADD_MUTE_GROUP), {
    type: ADD_MUTE_GROUP,
  })

export const deleteMuteItem = (groupIdx, muter, itemIdx) =>
  thunkTogether(sysexAction(SYSEX_MSG_DELETE_MUTE_ITEM, groupIdx, Number(muter), itemIdx), {
    type: DELETE_MUTE_ITEM,
    groupIdx,
    muter,
    itemIdx,
  })

export const addMuteItem = (groupIdx, muter, noteNum) =>
  thunkTogether(sysexAction(SYSEX_MSG_ADD_MUTE_ITEM, groupIdx, Number(muter), noteNum), {
    type: ADD_MUTE_ITEM,
    groupIdx,
    muter,
    noteNum,
  })
