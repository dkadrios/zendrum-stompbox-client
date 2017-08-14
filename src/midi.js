/* @flow */
import { setListeningDevices, RECEIVE_MIDI_MESSAGE, SEND_MIDI_MESSAGE } from 'redux-midi'
import {
  searchedForStompblock,
  stompblockFound,
  stompblockMissing,
  midiInActivityChanged,
  midiOutActivityChanged,
} from './action-creators/stompblock'
import { setOutputDeviceId, checkVersion } from './action-creators/sysex'
import processMidiMessage from './sysex'

import type { Store } from './types/Store'
import type { State } from './types/State'
// import type { Action } from './types/Action'

type DeviceType = 'input' | 'output'

type Device = {
  name: string,
  type: DeviceType,
  id: number,
}

export const STOMPBLOCK_DEVICE_ID: number = 0x6b

export const CURRENT_ANVIL_VERSION: number = 23

export const CURRENT_CLIENT_VERSION: number = 13

export const CHANNEL: number = 10

export const MAX_MUTEABLES_PER_GROUP: number = 6
export const MAX_MUTERS_PER_GROUP: number = 4
export const MAX_MUTE_GROUPS: number = 4

export const SYSEX_START: number = 0xf0
export const SYSEX_END: number = 0xf7

export const SYSEX_MSG_GET_VERSION: number = 0x01
export const SYSEX_MSG_RECEIVE_VERSION: number = 0x02
export const SYSEX_MSG_GET_ALL: number = 0x03
export const SYSEX_MSG_RECEIVE_ALL: number = 0x04
export const SYSEX_MSG_SET_MUTE_ENABLED: number = 0x05
export const SYSEX_MSG_SET_THRU_ENABLED: number = 0x06
export const SYSEX_MSG_SET_MUTE_GROUPS_ENABLED: number = 0x07
export const SYSEX_MSG_PLAY_NOTE: number = 0x08
export const SYSEX_MSG_SET_ITEM: number = 0x09
export const SYSEX_MSG_RECEIVED_MUTE_ENABLED: number = 0x0a
export const SYSEX_MSG_RECEIVED_THRU_ENABLED: number = 0x0b
export const SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED: number = 0x0c
// export const SYSEX_MSG_SET_MUTE_GROUPS: number = 0x0D;
export const SYSEX_MSG_RECEIVED_MUTE_GROUPS: number = 0x0e
export const SYSEX_MSG_DELETE_MUTE_GROUP: number = 0x0f
export const SYSEX_MSG_DELETE_MUTE_ITEM: number = 0x10
export const SYSEX_MSG_ADD_MUTE_GROUP: number = 0x11
export const SYSEX_MSG_ADD_MUTE_ITEM: number = 0x12

export const SYSEX_MSG_FACTORY_RESET: number = 0x7e

export type SysexBarrier = 0xf0 | 0xf7

export type SysexMessage =
  | 0x01
  | 0x02
  | 0x03
  | 0x04
  | 0x05
  | 0x06
  | 0x07
  | 0x08
  | 0x09
  | 0x0a
  | 0x0b
  | 0x0c
  | 0x0d
  | 0x0e
  | 0x0f
  | 0x10
  | 0x11
  | 0x12
  | 0x7e

const findDevice = (devices: Array<Device>, kind: DeviceType): Device =>
  devices
    .filter(device => device.type === kind && device.name === 'Zendrum STOMPBLOCK')
    .reduce((prev, cur) => cur, undefined)

export const watchForDeviceChange = (store: Store) => {
  let devices: Array<Device> = []
  let initialDeviceCheck: boolean = true

  store.subscribe(() => {
    const state: State = store.getState()
    if (state.midi.devices && state.midi.devices !== devices) {
      // we'll enter this block whenever a device is attached or removed
      devices = state.midi.devices

      const inputDevice: Device = findDevice(devices, 'input')
      const outputDevice: Device = findDevice(devices, 'output')

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

let midiInTimer: number
let midiOutTimer: number

export const sysexMiddleware = (store: Store) => (next: Function) => (action: {
  type: string,
  payload: any,
}) => {
  const flickerTimeout: number = 200

  switch (action.type) {
    case RECEIVE_MIDI_MESSAGE:
      processMidiMessage(store.dispatch, action.payload)
      clearTimeout(midiInTimer)
      store.dispatch(midiInActivityChanged(true))
      /* istanbul ignore next */
      midiInTimer = setTimeout(() => {
        store.dispatch(midiInActivityChanged(false))
      }, flickerTimeout)
      break

    case SEND_MIDI_MESSAGE:
      clearTimeout(midiOutTimer)
      store.dispatch(midiOutActivityChanged(true))
      /* istanbul ignore next */
      midiOutTimer = setTimeout(() => {
        store.dispatch(midiOutActivityChanged(false))
      }, flickerTimeout)
      break

    case 'STOMPBLOCK_FOUND':
      store.dispatch(checkVersion())
      break

    default:
      break
  }
  return next(action)
}
