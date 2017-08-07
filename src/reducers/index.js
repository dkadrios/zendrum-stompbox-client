import { combineReducers } from 'redux';
import { reducer } from 'redux-midi';
import stompblock from './stompblock';
import settings from './settings';
import version from './version';
import velocityTrim from './velocityTrim';
import muteGroups from './muteGroups';

export default combineReducers({
  midi: reducer,
  stompblock,
  settings,
  version,
  velocityTrim,
  muteGroups,
});
