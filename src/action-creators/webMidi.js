import WebMidi from 'webmidi';
import shortid from 'shortid';
import * as Actions from '../actions';
import * as Midi from '../midi';

let localDispatch;
let localInputDevice;
let localOutputDevice;

const sendSysex = (command, ...data) => {
  /* console.log('sending sysex', Midi.STOMPBLOCK_DEVICE_ID, [
    Midi.CURRENT_ANVIL_VERSION,
    command,
    ...data,
  ]); */

  if (localOutputDevice) {
    WebMidi.getOutputById(localOutputDevice.id).sendSysex(
      Midi.STOMPBLOCK_DEVICE_ID, [
        Midi.CURRENT_ANVIL_VERSION,
        command,
        ...data,
      ]);
  }
};

const keepLocalReferencesForLater = (dispatch) => {
  localDispatch = dispatch;

  localInputDevice = WebMidi.inputs.reduce((res, device) =>
    (device.name === 'Zendrum STOMPBLOCK' ? { ...device, found: true } : res),
    { found: false });

  localOutputDevice = WebMidi.outputs.reduce((res, device) =>
    (device.name === 'Zendrum STOMPBLOCK' ? { ...device, found: true } : res),
    { found: false });
};

const attachInputCallback = () => {
  if (localInputDevice.found) {
    // Attach primary callback
    WebMidi.getInputById(localInputDevice.id).addListener(
      'sysex',
      Midi.CHANNEL,
      sysexCallback, // eslint-disable-line
    );
  }
};

export const playNote = (noteNum, velocity) => {
  sendSysex(Midi.SYSEX_MSG_PLAY_NOTE, noteNum, velocity);
  return {
    type: Actions.PLAY_NOTE,
    payload: { noteNum, velocity },
  };
};

export const addDevices = () => ({
  type: Actions.GET_MIDI_DEVICES,
  payload: WebMidi,
});

export const webMidiErrored = message => ({
  type: Actions.WEB_MIDI_ERRORED,
  payload: message,
});

export const checkVersion = () => {
  sendSysex(Midi.SYSEX_MSG_GET_VERSION,
    // Suggested serial number, if not already registered.
    ...Array.from(shortid.generate(), char => char.charCodeAt(0)));

  return {
    type: Actions.GET_SYSEX_VERSION,
  };
};

export const getMidiDevices = () =>
  (dispatch) => {
    WebMidi.enable((err) => {
      if (err) {
        dispatch(webMidiErrored(err));
      } else {
        keepLocalReferencesForLater(dispatch);

        attachInputCallback();

        if (localInputDevice.found && localOutputDevice.found) {
          dispatch(checkVersion());
        }

        dispatch(addDevices());
      }
    }, true); // true for SysEx access
  };

export const receivedVersion = (anvil, serialNumber) => ({
  type: Actions.RECEIVED_VERSION,
  payload: { anvil, serialNumber },
});

export const confirmFactoryReset = show => ({
  type: Actions.CONFIRM_FACTORY_RESET,
  payload: show,
});

export const performFactoryReset = () => {
  sendSysex(Midi.SYSEX_MSG_FACTORY_RESET);
  return {
    type: Actions.FACTORY_RESET,
  };
};

export const reloadSysEx = () => {
  sendSysex(Midi.SYSEX_MSG_GET_ALL);
  return {
    type: Actions.RELOAD_SYSEX,
  };
};

export const receivedVelocityTrims = data => ({
  type: Actions.RECEIVED_ALL_TRIMS,
  payload: data,
});

export const userChangedTrim = (noteNum, value) => ({
  type: Actions.USED_CHANGED_TRIM,
  payload: { noteNum, value },
});

// This is the only one we send to the firmware
export const userChangedTrimEnd = (noteNum, value) => {
  sendSysex(Midi.SYSEX_MSG_SET_ITEM, noteNum, value);
  return {
    type: Actions.USED_CHANGED_TRIM_END,
    payload: { noteNum, value },
  };
};

export const setMuteEnabled = (enabled) => {
  sendSysex(Midi.SYSEX_MSG_SET_MUTE_ENABLED, Number(enabled));
  return {
    type: Actions.SET_MUTE_ENABLED,
    payload: enabled,
  };
};

export const setThruEnabled = (enabled) => {
  sendSysex(Midi.SYSEX_MSG_SET_THRU_ENABLED, Number(enabled));
  return {
    type: Actions.SET_THRU_ENABLED,
    payload: enabled,
  };
};

export const setMuteGroupsEnabled = (enabled) => {
  sendSysex(Midi.SYSEX_MSG_SET_MUTE_GROUPS_ENABLED, Number(enabled));
  return {
    type: Actions.SET_MUTE_GROUPS_ENABLED,
    payload: enabled,
  };
};

export const receivedMuteEnabled = enabled => ({
  type: Actions.RECEIVED_MUTE_ENABLED,
  payload: enabled,
});

export const receivedThruEnabled = enabled => ({
  type: Actions.RECEIVED_THRU_ENABLED,
  payload: enabled,
});

export const receivedMuteGroupsEnabled = enabled => ({
  type: Actions.RECEIVED_MUTE_GROUPS_ENABLED,
  payload: enabled,
});

const sysexCallback = ({ data }) => {
  const [, deviceId, anvilVersion, command, ...packet] = data;
  let trims;
  let serial;

  // Check that it's one of our commands
  if (
    data.length > 5
    && deviceId === Midi.STOMPBLOCK_DEVICE_ID
    && (
      anvilVersion === Midi.CURRENT_ANVIL_VERSION
      || command === Midi.SYSEX_MSG_RECEIVE_VERSION
    )
  ) {
    switch (command) {
      case Midi.SYSEX_MSG_RECEIVE_VERSION:
        // TODO: find more functional way to do this.
        // Trim SysEx header and footer
        serial = [...packet].slice(1, packet.length - 2);
        // Remove any trailing zeros (but none within!)
        while (serial.length && serial[serial.length - 1] === 0) {
          serial.pop();
        }

        localDispatch(receivedVersion(
          data[4],
          serial.reduce((val, char) => val + String.fromCharCode(char)), ''),
        );
        if (data[4] === Midi.CURRENT_ANVIL_VERSION) {
          // TODO dispatch registration check first, then chain that to reloadSysEx
          sendSysex(Midi.SYSEX_MSG_RECEIVED_MUTE_ENABLED);
          sendSysex(Midi.SYSEX_MSG_RECEIVED_THRU_ENABLED);
          sendSysex(Midi.SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED);
          localDispatch(reloadSysEx());
        }
        break;

      case Midi.SYSEX_MSG_RECEIVE_ALL:
        trims = packet.filter((item, idx) => idx < 127);
        localDispatch(receivedVelocityTrims(trims));
        break;

      case Midi.SYSEX_MSG_RECEIVED_MUTE_ENABLED:
        localDispatch(receivedMuteEnabled(packet[0]));
        break;

      case Midi.SYSEX_MSG_RECEIVED_THRU_ENABLED:
        localDispatch(receivedThruEnabled(packet[0]));
        break;

      case Midi.SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED:
        localDispatch(receivedMuteGroupsEnabled(packet[0]));
        break;

      default:
        console.log('Unknown SysEx message received: ', command); // eslint-disable-line
    }
  }
};
