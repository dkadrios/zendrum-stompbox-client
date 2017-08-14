/* @flow */

import { combineReducers } from 'redux'
import { reducer } from 'redux-midi'
import stompblock from './stompblock'
import settings from './settings'
import version from './version'
import velocityTrim from './velocityTrim'
import muteGroups from './muteGroups'

type midiReducer = typeof reducer
const midi: midiReducer = reducer

const reducers = {
  midi,
  stompblock,
  settings,
  version,
  velocityTrim,
  muteGroups,
}

export type Reducers = typeof reducers

export default combineReducers(reducers)
