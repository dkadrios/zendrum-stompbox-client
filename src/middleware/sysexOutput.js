import {
  GET_SYSEX_VERSION,
  SET_MUTE_ENABLED,
  SET_THRU_ENABLED,
  SET_MUTE_GROUPS_ENABLED,
  PLAY_NOTE,
  FACTORY_RESET,
  RELOAD_SYSEX,
  DELETE_MUTE_GROUP,
  ADD_MUTE_GROUP,
  DELETE_MUTE_ITEM,
  ADD_MUTE_ITEM,
  USER_CHANGED_TRIM_END,
} from '../action-creators/actions'
import {
  SYSEX_MSG_SET_MUTE_ENABLED,
  SYSEX_MSG_SET_THRU_ENABLED,
  SYSEX_MSG_SET_MUTE_GROUPS_ENABLED,
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
} from '../midi/sysexOutput'

export default store => next => (action) => {
  // Allow the reducers to process the command first
  const result = next(action)

  // If it's an action that affects the hardware device, process it
  switch (action.type) {
    case GET_SYSEX_VERSION:
      askForVersion(store.dispatch, action.serialNumber)
      break

    case SET_MUTE_ENABLED:
      setBooleanValue(store.dispatch, SYSEX_MSG_SET_MUTE_ENABLED, action.muteEnabledAtStart)
      break

    case SET_THRU_ENABLED:
      setBooleanValue(store.dispatch, SYSEX_MSG_SET_THRU_ENABLED, action.thruEnabledAtStart)
      break

    case SET_MUTE_GROUPS_ENABLED:
      setBooleanValue(store.dispatch, SYSEX_MSG_SET_MUTE_GROUPS_ENABLED, action.muteGroupsEnabled)
      break

    case PLAY_NOTE:
      playNote(store.dispatch, action.noteNum, action.velocity)
      break

    case FACTORY_RESET:
      performFactoryReset(store.dispatch)
      break

    case RELOAD_SYSEX:
      reloadSysEx(store.dispatch)
      break

    case DELETE_MUTE_GROUP:
      deleteMuteGroup(store.dispatch, action.groupIdx)
      break

    case ADD_MUTE_GROUP:
      addMuteGroup(store.dispatch)
      break

    case DELETE_MUTE_ITEM:
      deleteMuteItem(store.dispatch, action.groupIdx, action.muter, action.itemIdx)
      break

    case ADD_MUTE_ITEM:
      addMuteItem(store.dispatch, action.groupIdx, action.muter, action.noteNum)
      break

    case USER_CHANGED_TRIM_END:
      changeTrim(store.dispatch, action.noteNum, action.value)
      break

    default:
      break
  }

  // No matter what, return the updated store state
  return result
}
