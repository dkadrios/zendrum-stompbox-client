import { setListeningDevices, RECEIVE_MIDI_MESSAGE, SEND_MIDI_MESSAGE } from 'redux-midi'
import {
  searchedForStompblock,
  stompblockFound,
  stompblockMissing,
  midiInActivityChanged,
  midiOutActivityChanged,
} from './action-creators/stompblock'
import { setOutputDeviceId, checkVersion } from './action-creators/sysex'
import { STOMPBLOCK_FOUND } from './actions'
import processMidiMessage from './sysex'

export const STOMPBLOCK_DEVICE_ID = 0x6B

export const CURRENT_ANVIL_VERSION = 23

export const CURRENT_CLIENT_VERSION = 13

export const CHANNEL = 10

export const MAX_MUTEABLES_PER_GROUP = 6
export const MAX_MUTERS_PER_GROUP = 4
export const MAX_MUTE_GROUPS = 4

export const SYSEX_START = 0xF0
export const SYSEX_END = 0xF7

export const SYSEX_MSG_GET_VERSION = 0x01
export const SYSEX_MSG_RECEIVE_VERSION = 0x02
export const SYSEX_MSG_GET_ALL = 0x03
export const SYSEX_MSG_RECEIVE_ALL = 0x04
export const SYSEX_MSG_SET_MUTE_ENABLED = 0x05
export const SYSEX_MSG_SET_THRU_ENABLED = 0x06
export const SYSEX_MSG_SET_MUTE_GROUPS_ENABLED = 0x07
export const SYSEX_MSG_PLAY_NOTE = 0x08
export const SYSEX_MSG_SET_ITEM = 0x09
export const SYSEX_MSG_RECEIVED_MUTE_ENABLED = 0x0A
export const SYSEX_MSG_RECEIVED_THRU_ENABLED = 0x0B
export const SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED = 0x0C
// export const SYSEX_MSG_SET_MUTE_GROUPS = 0x0D;
export const SYSEX_MSG_RECEIVED_MUTE_GROUPS = 0x0E
export const SYSEX_MSG_DELETE_MUTE_GROUP = 0x0F
export const SYSEX_MSG_DELETE_MUTE_ITEM = 0x10
export const SYSEX_MSG_ADD_MUTE_GROUP = 0x11
export const SYSEX_MSG_ADD_MUTE_ITEM = 0x12

export const SYSEX_MSG_FACTORY_RESET = 0x7E

const findDevice = (devices, kind) => devices
  .filter(device => device.type === kind && device.name === 'Zendrum STOMPBLOCK')
  .reduce((prev, cur) => cur, 0)

export const watchForDeviceChange = (store) => {
  let devices = []
  let initialDeviceCheck = true

  store.subscribe(() => {
    const state = store.getState()
    if (state.midi.devices && state.midi.devices !== devices) {
      // we'll enter this block whenever a device is attached or removed
      devices = state.midi.devices

      const inputDevice = findDevice(devices, 'input')
      const outputDevice = findDevice(devices, 'output')

      if (inputDevice && outputDevice) {
        store.dispatch(setListeningDevices([inputDevice.id]))
        setOutputDeviceId(outputDevice.id)
        store.dispatch(stompblockFound())
      } else {
        store.dispatch(stompblockMissing())
      }

      /* istanbul ignore next */
      if (initialDeviceCheck) {
        initialDeviceCheck = false
        store.dispatch(searchedForStompblock())
      }
    }
  })
}

let midiInTimer
let midiOutTimer

export const sysexMiddleware = store => next => action => { // eslint-disable-line
  const flickerTimeout = 200

  switch (action.type) {
    case RECEIVE_MIDI_MESSAGE:
      processMidiMessage(store.dispatch, action.payload)
      clearTimeout(midiInTimer)
      /* istanbul ignore next */
      midiInTimer = setTimeout(() => {
        store.dispatch(midiInActivityChanged(false))
      }, flickerTimeout)
      break

    case SEND_MIDI_MESSAGE:
      clearTimeout(midiOutTimer)
      /* istanbul ignore next */
      midiOutTimer = setTimeout(() => {
        store.dispatch(midiOutActivityChanged(false))
      }, flickerTimeout)
      break

    case STOMPBLOCK_FOUND:
      store.dispatch(checkVersion())
      break

    default: break
  }
  return next(action)
}
