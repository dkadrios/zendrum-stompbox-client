/* @flow */

import type { GroupName } from './Mappings'
import type { ListView } from '../types/VelocityTrimList'
import type { ProductInstance } from '../types/Registration'

export type SearchedForStompblockAction = {
  type: 'SEARCHED_FOR_STOMPBLOCK',
}

export type StompblockFoundAction = {
  type: 'STOMPBLOCK_FOUND',
}

export type StompblockMissingAction = {
  type: 'STOMPBLOCK_MISSING',
}

export type MidiInActivityAction = {
  type: 'MIDI_IN_ACTIVITY',
  payload: boolean,
}

export type MidiOutActivityAction = {
  type: 'MIDI_OUT_ACTIVITY',
  payload: boolean,
}

export type CheckedRegistrationAction = {
  type: 'CHECKED_REGISTRATION',
  payload: ProductInstance,
}

export type SearchTrimsAction = {
  type: 'SEARCH_TRIMS',
  payload: string,
}

export type SelectTrimAction = {
  type: 'SELECT_TRIM',
  payload: number,
}

export type ChangeGroupAction = {
  type: 'CHANGE_GROUP',
  payload: GroupName,
}

export type ChangeListViewAction = {
  type: 'CHANGE_LIST_VIEW',
  payload: ListView,
}

export type ReceivedVersionAction = {
  type: 'RECEIVED_VERSION',
  payload: {
    anvil: number,
    serialNumber: string,
  },
}

export type ConfirmFactoryResetAction = {
  type: 'CONFIRM_FACTORY_RESET',
  payload: boolean,
}

export type ReceivedVelocityTrimsAction = {
  type: 'RECEIVED_ALL_TRIMS',
  payload: Array<number>,
}

export type UserChangedTrimAction = {
  type: 'USER_CHANGED_TRIM',
  payload: {
    noteNum: number,
    value: number,
  },
}

export type ReceivedMuteEnabledAction = {
  type: 'RECEIVED_MUTE_ENABLED',
  payload: boolean,
}

export type ReceivedThruEnabledAction = {
  type: 'RECEIVED_THRU_ENABLED',
  payload: boolean,
}

export type ReceivedMuteGroupsEnabledAction = {
  type: 'RECEIVED_MUTE_GROUPS_ENABLED',
  payload: boolean,
}

export type ReceivedMuteGroupsAction = {
  type: 'RECEIVED_MUTE_GROUPS',
  payload: Array<number>,
}

export type SetMuteEnabledAction = {
  type: 'SET_MUTE_ENABLED',
  payload: boolean,
}

export type SetThruEnabledAction = {
  type: 'SET_THRU_ENABLED',
  payload: boolean,
}

export type SetMuteGroupsEnabledAction = {
  type: 'SET_MUTE_GROUPS_ENABLED',
  payload: boolean,
}

export type SetMuteGroupsAction = {
  type: 'SET_MUTE_GROUPS',
  payload: Array<number>,
}

export type Action =
  | SearchedForStompblockAction
  | StompblockFoundAction
  | StompblockMissingAction
  | MidiInActivityAction
  | MidiOutActivityAction
  | CheckedRegistrationAction
  | SearchTrimsAction
  | SelectTrimAction
  | ChangeGroupAction
  | ChangeListViewAction
  | ReceivedVersionAction
  | ConfirmFactoryResetAction
  | ReceivedVelocityTrimsAction
  | UserChangedTrimAction
  | ReceivedMuteEnabledAction
  | ReceivedThruEnabledAction
  | ReceivedMuteGroupsEnabledAction
  | ReceivedMuteGroupsAction
  | SetMuteEnabledAction
  | SetThruEnabledAction
  | SetMuteGroupsEnabledAction
  | SetMuteGroupsAction
