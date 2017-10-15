import { combineReducers } from 'redux'
import { reducer as midi } from 'redux-midi'
import mapping from './mapping'
import muteGroups from './muteGroups'
import settings from './settings'
import stompblock from './stompblock'
import velocityTrim from './velocityTrim'
import version from './version'

const reducers = {
  mapping,
  midi,
  muteGroups,
  settings,
  stompblock,
  velocityTrim,
  version,
}

export default combineReducers(reducers)
