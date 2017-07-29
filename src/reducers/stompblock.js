import { RECEIVE_DEVICE_LIST } from 'redux-midi';
import { STOMPBLOCK_FOUND, STOMPBLOCK_MISSING } from '../actions';
import { createReducer } from '../utils';

const stompblockFound = state => ({
  ...state,
  found: true,
});

const stompblockMissing = state => ({
  ...state,
  found: false,
});

const receivedDeviceList = state => ({
  ...state,
  accessGranted: true, // assume we have access if device list was received
});

const handlers = {
  [STOMPBLOCK_FOUND]: stompblockFound,
  [STOMPBLOCK_MISSING]: stompblockMissing,
  [RECEIVE_DEVICE_LIST]: receivedDeviceList,
};

export default createReducer({
  accessGranted: false,
  found: false,
}, handlers);
