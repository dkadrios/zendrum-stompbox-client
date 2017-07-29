import {
  SYSEX_START,
  STOMPBLOCK_DEVICE_ID,
  CURRENT_ANVIL_VERSION,
  SYSEX_MSG_RECEIVE_VERSION,
  SYSEX_MSG_RECEIVED_MUTE_ENABLED,
  SYSEX_MSG_RECEIVED_THRU_ENABLED,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED,
  SYSEX_MSG_RECEIVE_ALL,
} from './midi';

import {
  receivedVersion,
  reloadSysEx,
  receivedVelocityTrims,
  receivedMuteEnabled,
  receivedThruEnabled,
  receivedMuteGroupsEnabled,
  sysexAction,
} from './action-creators/sysex';

export default (dispatch, { data }) => {
  const [kind, deviceId, anvilVersion, command, ...packet] = data.slice(0, data.length - 1);
  // One of our packets?
  if (kind === SYSEX_START
    && deviceId === STOMPBLOCK_DEVICE_ID
    && deviceId === STOMPBLOCK_DEVICE_ID
    && (
      anvilVersion === CURRENT_ANVIL_VERSION
      || command === SYSEX_MSG_RECEIVE_VERSION
    )
  ) {
    let serial;
    let trims;

    switch (command) {
      case SYSEX_MSG_RECEIVE_VERSION:
        // TODO: find more functional way to do this.
        // Trim SysEx header and footer
        serial = [...packet].slice(1, packet.length - 2);
        // Remove any trailing zeros (but none within!)
        while (serial.length && serial[serial.length - 1] === 0) {
          serial.pop();
        }

        dispatch(receivedVersion(
          packet[0],
          serial.reduce((val, char) => val + String.fromCharCode(char)), ''),
        );
        if (packet[0] === CURRENT_ANVIL_VERSION) {
          // TODO dispatch registration check first, then chain that to reloadSysEx
          dispatch(sysexAction(SYSEX_MSG_RECEIVED_MUTE_ENABLED));
          dispatch(sysexAction(SYSEX_MSG_RECEIVED_THRU_ENABLED));
          dispatch(sysexAction(SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED));
          dispatch(reloadSysEx());
        }
        break;

      case SYSEX_MSG_RECEIVE_ALL:
        trims = packet.filter((item, idx) => idx < 127);
        dispatch(receivedVelocityTrims(trims));
        break;

      case SYSEX_MSG_RECEIVED_MUTE_ENABLED:
        dispatch(receivedMuteEnabled(packet[0]));
        break;

      case SYSEX_MSG_RECEIVED_THRU_ENABLED:
        dispatch(receivedThruEnabled(packet[0]));
        break;

      case SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED:
        dispatch(receivedMuteGroupsEnabled(packet[0]));
        break;

      default:
        console.log('Unknown SysEx message received: ', command); // eslint-disable-line
    }
  }
};
