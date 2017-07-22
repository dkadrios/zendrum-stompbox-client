import { combineReducers } from 'redux';
import webMidi from './webMidi';
import inputDevice from './inputDevice';
import outputDevice from './outputDevice';
import settings from './settings';
import version from './version';
import velocityTrim from './velocityTrim';

export default combineReducers({
  webMidi,
  inputDevice,
  outputDevice,
  settings,
  version,
  velocityTrim,
});
