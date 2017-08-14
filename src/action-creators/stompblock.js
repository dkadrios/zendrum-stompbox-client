/* @flow */

import type { Action } from '../types/Action'

export const searchedForStompblock = (): Action => ({
  type: 'SEARCHED_FOR_STOMPBLOCK',
})

export const stompblockFound = (): Action => ({
  type: 'STOMPBLOCK_FOUND',
})

export const stompblockMissing = (): Action => ({
  type: 'STOMPBLOCK_MISSING',
})

export const midiInActivityChanged = (activity: boolean): Action => ({
  type: 'MIDI_IN_ACTIVITY',
  payload: activity,
})

export const midiOutActivityChanged = (activity: boolean): Action => ({
  type: 'MIDI_OUT_ACTIVITY',
  payload: activity,
})
