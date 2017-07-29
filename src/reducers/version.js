import { GET_SYSEX_VERSION, RECEIVED_VERSION, STOMPBLOCK_MISSING } from '../actions';
import { createReducer } from '../utils';
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../midi';

const checkingVersion = state => ({
  ...state,
  checking: true,
  checked: false,
});

const receivedVersion = (state, { payload }) => ({
  ...state,
  ...payload,
  checking: false,
  checked: true,
});

const stompblockMissing = state => ({
  ...state,
  checking: false,
  checked: false,
  serialNumber: '',
  userFirstName: '',
  userLastName: '',
  userEmail: '',
});

const handlers = {
  [GET_SYSEX_VERSION]: checkingVersion,
  [RECEIVED_VERSION]: receivedVersion,
  [STOMPBLOCK_MISSING]: stompblockMissing,
};

export default createReducer({
  checking: false,
  checked: false,
  client: CURRENT_CLIENT_VERSION,
  anvil: NaN,
  expectedAnvil: CURRENT_ANVIL_VERSION,
  serialNumber: '',
  userFirstName: '', // TODO
  userLastName: '',
  userEmail: '',
}, handlers);
