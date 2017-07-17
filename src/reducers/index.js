import { combineReducers } from 'redux';
import webMidi from './webMidi';
import inputDevice from './inputDevice';
import outputDevice from './outputDevice';
import version from './version';
import velocityTrim from './velocityTrim';

export default combineReducers({
  webMidi,
  inputDevice,
  outputDevice,
  version,
  velocityTrim,
});
