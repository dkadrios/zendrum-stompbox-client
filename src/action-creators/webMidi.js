import WebMidi from 'webmidi';
import shortid from 'shortid';
import * as Actions from '../actions';
import * as Midi from '../midi';

let localDispatch;
let localInputDevice;
let localOutputDevice;

const sendSysex = (command, ...data) => {
  console.log('sending sysex', Midi.STOMPBOX_DEVICE_ID, [
    Midi.CURRENT_ANVIL_VERSION,
    command,
    ...data,
  ]);

  if (localOutputDevice) {
    WebMidi.getOutputById(localOutputDevice.id).sendSysex(
      Midi.STOMPBOX_DEVICE_ID, [
        Midi.CURRENT_ANVIL_VERSION,
        command,
        ...data,
      ]);
  }
};

const keepLocalReferencesForLater = (dispatch) => {
  localDispatch = dispatch;

  localInputDevice = WebMidi.inputs.reduce((res, device) =>
    (device.name === 'Zendrum STOMPBOX' ? { ...device, found: true } : res),
    { found: false });

  localOutputDevice = WebMidi.outputs.reduce((res, device) =>
    (device.name === 'Zendrum STOMPBOX' ? { ...device, found: true } : res),
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

export const receivedVersion = version => ({
  type: Actions.RECEIVED_VERSION,
  payload: version,
});

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
  sendSysex(Midi.SYSEX_MSG_SET_ITEM, noteNum - 1, value);

  return {
    type: Actions.USED_CHANGED_TRIM_END,
    payload: { noteNum, value },
  };
};

const sysexCallback = ({ data }) => {
  let trims;
console.log('REC', data)
  // Check that it's one of our commands
  if (data.length > 5
    && data[1] === Midi.STOMPBOX_DEVICE_ID
    && (
      data[2] === Midi.CURRENT_ANVIL_VERSION
      || data[3] === Midi.SYSEX_MSG_RECEIVE_VERSION
    )
  ) {
    // console.log('Received SysEx', data.length, data[3]);

    switch (data[3]) {
      case Midi.SYSEX_MSG_RECEIVE_VERSION:
        localDispatch(receivedVersion(data[4]));
        if (data[4] === Midi.CURRENT_ANVIL_VERSION) {
          localDispatch(reloadSysEx());
        }
        break;

      case Midi.SYSEX_MSG_RECEIVE_ALL:
        // Remove SysEx START and STOP byte, etc...
        trims = data.filter((item, idx) => idx > 3 && idx < 130);
        localDispatch(receivedVelocityTrims(trims));
        break;

      default:
        console.log('Unknown SysEx message received: ', data[3]); // eslint-disable-line
    }
  }
};
