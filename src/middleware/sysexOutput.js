import {
  GET_SYSEX_VERSION,
  SET_MUTE_ENABLED,
  SET_THRU_ENABLED,
  SET_MUTE_GROUPS_ENABLED,
  SET_POLYLOCKS_ENABLED,
  PLAY_NOTE,
  FACTORY_RESET,
  RELOAD_SYSEX,
  DELETE_MUTE_GROUP,
  ADD_MUTE_GROUP,
  DELETE_MUTE_ITEM,
  ADD_MUTE_ITEM,
  USER_CHANGED_TRIM_END,
  SET_CHANNEL_A,
  SET_CHANNEL_B,
  SET_VELOCITY_VARIANCE,
  SET_ROUND_ROBIN_ENABLED,
  SET_VOLUME_CURVE,
  ADD_POLYLOCK,
  DELETE_POLYLOCK,
  SET_MUTE_GROUP_BANK,
} from '../action-creators/actions'
import {
  SYSEX_MSG_SET_MUTE_ENABLED,
  SYSEX_MSG_SET_THRU_ENABLED,
  SYSEX_MSG_SET_MUTE_GROUPS_ENABLED,
  SYSEX_MSG_SET_POLYLOCKS_ENABLED,
} from '../midi/sysex'
import {
  askForVersion,
  setBooleanValue,
  playNote,
  performFactoryReset,
  reloadSysEx,
  deleteMuteGroup,
  addMuteGroup,
  deleteMuteItem,
  addMuteItem,
  changeTrim,
  setChannelA,
  setChannelB,
  setVelocityVariance,
  setRoundRobinEnabled,
  setVolumeCurve,
  deletePolyLock,
  addPolyLock,
  setMuteGroupBank,
} from '../midi/sysexOutput'

export default store => next => (action) => {
  // Allow the reducers to process the command first
  const result = next(action)

  // For legacy units, blank out bank if not available
  const act = store.getState().settings.hasVersionThreeFirmware
    ? { ...action }
    : { ...action, bank: -1 }

  // If it's an action that affects the hardware device, process it
  switch (act.type) {
    case GET_SYSEX_VERSION:
      askForVersion(store.dispatch, act.serialNumber)
      break

    case SET_MUTE_ENABLED:
      setBooleanValue(store.dispatch, SYSEX_MSG_SET_MUTE_ENABLED, act.muteEnabledAtStart)
      break

    case SET_THRU_ENABLED:
      setBooleanValue(store.dispatch, SYSEX_MSG_SET_THRU_ENABLED, act.thruEnabledAtStart)
      break

    case SET_MUTE_GROUPS_ENABLED:
      setBooleanValue(store.dispatch, SYSEX_MSG_SET_MUTE_GROUPS_ENABLED, act.muteGroupsEnabled)
      break

    case SET_POLYLOCKS_ENABLED:
      setBooleanValue(store.dispatch, SYSEX_MSG_SET_POLYLOCKS_ENABLED, act.polyLocksEnabled)
      break

    case PLAY_NOTE:
      /*
        NOTE!!  There is a error in the firmware for this command.
        There, it assumes bank #1 is 'A', instead of #0.
        We're inverting the banks here to compensate.
        If we ever fix this in the firmware, we'll need to change this
        behavior based on version number.
      */
      playNote(store.dispatch, 1 - act.bank, act.noteNum, act.velocity)
      break

    case FACTORY_RESET:
      performFactoryReset(store.dispatch)
      break

    case RELOAD_SYSEX:
      reloadSysEx(store.dispatch)
      break

    case DELETE_MUTE_GROUP:
      deleteMuteGroup(store.dispatch, act.groupIdx)
      break

    case ADD_MUTE_GROUP:
      addMuteGroup(store.dispatch)
      break

    case DELETE_MUTE_ITEM:
      deleteMuteItem(store.dispatch, act.groupIdx, act.muter, act.itemIdx)
      break

    case ADD_MUTE_ITEM:
      addMuteItem(store.dispatch, act.groupIdx, act.muter, act.noteNum)
      break

    case SET_MUTE_GROUP_BANK:
      setMuteGroupBank(store.dispatch, act.groupIdx, act.bank)
      break

    case USER_CHANGED_TRIM_END:
      changeTrim(store.dispatch, act.bank, act.noteNum, act.value)
      break

    case SET_CHANNEL_A:
      setChannelA(store.dispatch, act.channelA)
      break
    case SET_CHANNEL_B:
      setChannelB(store.dispatch, act.channelB)
      break
    case SET_VELOCITY_VARIANCE:
      setVelocityVariance(store.dispatch, act.velocityVariance)
      break
    case SET_ROUND_ROBIN_ENABLED:
      setRoundRobinEnabled(store.dispatch, act.roundRobinEnabled)
      break
    case SET_VOLUME_CURVE:
      setVolumeCurve(store.dispatch, act.volumeCurve)
      break

    case ADD_POLYLOCK:
      addPolyLock(store.dispatch, act.bank, act.pitch)
      break

    case DELETE_POLYLOCK:
      deletePolyLock(store.dispatch, act.idx)
      break

    default:
      break
  }

  // No matter what, return the updated store state
  return result
}
