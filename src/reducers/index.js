import { combineReducers } from 'redux';
import webMidi from './webMidi';
import inputDevice from './inputDevice';
import outputDevice from './outputDevice';
import version from './version';

export default combineReducers({
  webMidi,
  inputDevice,
  outputDevice,
  version,
});
