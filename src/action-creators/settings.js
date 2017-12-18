import {
  SET_MUTE_ENABLED,
  SET_THRU_ENABLED,
  SET_MUTE_GROUPS_ENABLED,
  RECEIVED_MUTE_ENABLED,
  RECEIVED_THRU_ENABLED,
  RECEIVED_MUTE_GROUPS_ENABLED,
  CHANGE_PRIMARY_NAV_TAB,
  RECEIVED_MIDI_SETTINGS,
  SET_CHANNEL_A,
  SET_CHANNEL_B,
  SET_VELOCITY_VARIANCE,
  SET_ROUND_ROBIN_ENABLED,
  SET_VOLUME_CURVE,
  RECEIVED_POLYLOCKS_ENABLED,
  SET_POLYLOCKS_ENABLED,
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

export const setPolyLocksEnabled = polyLocksEnabled => ({
  type: SET_POLYLOCKS_ENABLED,
  polyLocksEnabled,
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

export const receivedPolyLocksEnabled = polyLocksEnabled => ({
  type: RECEIVED_POLYLOCKS_ENABLED,
  polyLocksEnabled,
})

export const changePrimaryNavTab = primaryNavTabIdx => ({
  type: CHANGE_PRIMARY_NAV_TAB,
  primaryNavTabIdx,
})

export const receivedMidiSettings = ([
  //
  channelA,
  channelB,
  velocityVariance,
  roundRobinEnabled,
  volumeCurve,
]) => ({
  type: RECEIVED_MIDI_SETTINGS,
  channelA,
  channelB,
  velocityVariance,
  roundRobinEnabled: roundRobinEnabled === 1,
  volumeCurve,
})

export const changeChannelA = channelA => ({
  type: SET_CHANNEL_A,
  channelA,
})

export const changeChannelB = channelB => ({
  type: SET_CHANNEL_B,
  channelB,
})

export const changeVelocityVariance = velocityVariance => ({
  type: SET_VELOCITY_VARIANCE,
  velocityVariance,
})

export const changeRoundRobinEnabled = roundRobinEnabled => ({
  type: SET_ROUND_ROBIN_ENABLED,
  roundRobinEnabled,
})

export const changeVolumeCurve = volumeCurve => ({
  type: SET_VOLUME_CURVE,
  volumeCurve,
})
