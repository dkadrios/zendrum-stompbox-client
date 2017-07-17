import { RECEIVED_VERSION } from '../actions';
import { createReducer } from '../utils';
import { CURRENT_VERSION } from '../midi';

const receivedVersion = (state, action) => ({
  ...state,
  anvil: action.payload,
});

const handlers = {
  [RECEIVED_VERSION]: receivedVersion,
};

export default createReducer({
  client: 1,
  anvil: undefined,
  expectedAnvil: CURRENT_VERSION,
}, handlers);
