import { GET_SYSEX_VERSION, RECEIVED_VERSION } from '../actions';
import { createReducer } from '../utils';
import { CURRENT_ANVIL_VERSION, CURRENT_CLIENT_VERSION } from '../midi';

const checkingVersion = state => ({
  ...state,
  checked: true,
});

const receivedVersion = (state, { payload }) => ({
  ...state,
  ...payload,
});

const handlers = {
  [GET_SYSEX_VERSION]: checkingVersion,
  [RECEIVED_VERSION]: receivedVersion,
};

export default createReducer({
  checked: false,
  client: CURRENT_CLIENT_VERSION,
  anvil: NaN,
  expectedAnvil: CURRENT_ANVIL_VERSION,
  serialNumber: '',
  userFirstName: '', // TODO
  userLastName: '',
  userEmail: '',
}, handlers);
