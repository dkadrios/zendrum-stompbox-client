import WebMidi from 'webmidi';
import { GET_MIDI_DEVICES } from '../actions';

export const addDevices = devices => ({
  type: GET_MIDI_DEVICES,
  payload: devices,
});

export const getMidiDevices = () =>
  (dispatch) => {
    WebMidi.enable((err) => {
      if (err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        dispatch(addDevices(WebMidi));
      }
    }, false); // true for SysEx access
  };
