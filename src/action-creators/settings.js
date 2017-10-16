import {
  SET_MUTE_ENABLED,
  SET_THRU_ENABLED,
  SET_MUTE_GROUPS_ENABLED,
  RECEIVED_MUTE_ENABLED,
  RECEIVED_THRU_ENABLED,
  RECEIVED_MUTE_GROUPS_ENABLED,
} from './actions'

export const setMuteEnabled = muteEnabledAtStart => ({
  type: SET_MUTE_ENABLED,
  muteEnabledAtStart,
})

export const setThruEnabled = thruEnabledAtStart => ({
  type: SET_THRU_ENABLED,
  thruEnabledAtStart,
})

export const setMuteGroupsEnabled = muteGroupsEnabled => ({
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
