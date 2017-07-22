import {
  RECEIVED_MUTE_ENABLED,
  RECEIVED_THRU_ENABLED,
  RECEIVED_MUTE_GROUPS_ENABLED,
  SET_MUTE_ENABLED,
  SET_THRU_ENABLED,
  SET_MUTE_GROUPS_ENABLED,
} from '../actions';
import { createReducer } from '../utils';

const receivedSetting = (state, { type, payload }) => {
  let result;

  switch (type) {
    case RECEIVED_MUTE_ENABLED:
      result = { ...state, muteEnabledAtStart: payload === 1 };
      break;
    case RECEIVED_THRU_ENABLED:
      result = { ...state, thruEnabledAtStart: payload === 1 };
      break;
    case RECEIVED_MUTE_GROUPS_ENABLED:
      result = { ...state, muteGroupsEnabled: payload === 1 };
      break;
    default:
      break;
  }

  return result;
};

const settingSetting = (state, { type, payload }) => {
  let result;

  switch (type) {
    case SET_MUTE_ENABLED:
      result = { ...state, muteEnabledAtStart: payload };
      break;
    case SET_THRU_ENABLED:
      result = { ...state, thruEnabledAtStart: payload };
      break;
    case SET_MUTE_GROUPS_ENABLED:
      result = { ...state, muteGroupsEnabled: payload };
      break;
    default:
      break;
  }

  return result;
};

const handlers = {
  [RECEIVED_MUTE_ENABLED]: receivedSetting,
  [RECEIVED_THRU_ENABLED]: receivedSetting,
  [RECEIVED_MUTE_GROUPS_ENABLED]: receivedSetting,
  [SET_MUTE_ENABLED]: settingSetting,
  [SET_THRU_ENABLED]: settingSetting,
  [SET_MUTE_GROUPS_ENABLED]: settingSetting,
};

export default createReducer({
  muteEnabledAtStart: false,
  thruEnabledAtStart: true,
  muteGroupsEnabled: true,
}, handlers);
