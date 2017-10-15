/* @flow */

import { combineReducers } from 'redux'
import { reducer } from 'redux-midi'
import mapping from './mapping'
import muteGroups from './muteGroups'
import settings from './settings'
import stompblock from './stompblock'
import velocityTrim from './velocityTrim'
import version from './version'

type midiReducer = typeof reducer
const midi: midiReducer = reducer

const reducers = {
  mapping,
  midi,
  muteGroups,
  settings,
  stompblock,
  velocityTrim,
  version,
}

export type Reducers = typeof reducers

export default combineReducers(reducers)
