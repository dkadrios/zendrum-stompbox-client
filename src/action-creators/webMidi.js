import WebMidi from 'webmidi';
import * as Actions from '../actions';
import * as Midi from '../midi';

let dispatcher;

const sendSysex = (deviceId, command) => {
  WebMidi.getOutputById(deviceId).sendSysex(
    Midi.STOMPBOX_DEVICE_ID, [
      Midi.CURRENT_VERSION,
      0, // Dummy byte (high bits for first 7 bytes but we only send one)
      command,
    ]);
};

const attachInputCallback = (dispatch, inputDevice) => {
  if (inputDevice.found) {
    // Attach primary callback
    dispatcher = dispatch;
    WebMidi.getInputById(inputDevice.id).addListener('sysex', Midi.CHANNEL, sysexCallback);
  }
};

export const addDevices = devices => ({
  type: Actions.GET_MIDI_DEVICES,
  payload: devices,
});

export const webMidiErrored = message => ({
  type: Actions.WEB_MIDI_ERRORED,
  payload: message,
});

export const getMidiDevices = () =>
  (dispatch) => {
    WebMidi.enable((err) => {
      if (err) {
        dispatch(webMidiErrored(err));
      } else {
        attachInputCallback(dispatch,
          WebMidi.inputs.reduce((res, device) =>
            (device.name === 'Zendrum STOMPBOX' ? { ...device, found: true } : res),
            { found: false }),
        );

        dispatch(addDevices(WebMidi));
      }
    }, true); // true for SysEx access
  };

export const checkVersion = (inputDevice, outputDevice) => {
  sendSysex(outputDevice.id, Midi.SYSEX_MSG_GET_VERSION);

  return {
    type: Actions.GET_SYSEX_VERSION,
    payload: outputDevice.id,
  };
};

export const receivedVersion = version => ({
  type: Actions.RECEIVED_VERSION,
  payload: version,
});

export const reloadSysEx = (outputDeviceId) => {
  sendSysex(outputDeviceId, Midi.SYSEX_MSG_GET_ALL);

  return {
    type: Actions.RELOAD_SYSEX,
    payload: outputDeviceId,
  };
};

const sysexCallback = ({ data }) => {
  // Check that it's one of our commands
  if (data.length > 5 && data[1] === Midi.STOMPBOX_DEVICE_ID) {
    switch (data[2]) {
      case Midi.SYSEX_MSG_RECEIVE_VERSION:
        dispatcher(receivedVersion(data[4]));
        break;
      default:
        console.log('Unknown SysEx message received: ', data[2]);
    }
  }
};
