import { combineReducers } from 'redux'
import { reducer as midi } from 'redux-midi'
import { reducer as form } from 'redux-form'
import mapping from './mapping'
import muteGroups from './muteGroups'
import polyLocks from './polyLocks'
import settings from './settings'
import stompblock from './stompblock'
import user from './user'
import velocityTrim from './velocityTrim'
import version from './version'

const reducers = {
  form,
  mapping,
  midi,
  muteGroups,
  polyLocks,
  settings,
  stompblock,
  user,
  velocityTrim,
  version,
}

export default combineReducers(reducers)
