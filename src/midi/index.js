import { setListeningDevices } from 'redux-midi-fork'
import {
  searchedForStompblock,
  stompblockFound,
  stompblockMissing,
} from '../action-creators/stompblock'
import { deviceStore, devicesChanged, stompblockAttached, stompblockInputId } from './devices'
import { version } from '../../package.json'

export const STOMPBLOCK_DEVICE_ID = 0x6b

// Takes a version string in the form "4.7.0" and reduces it to 47 (format the hardware uses)
export const CURRENT_CLIENT_VERSION = version
  .split('.')
  .map(s => parseInt(s, 10))
  .slice(0, 2)
  .reverse()
  .map((v, i) => v * 10 ** i) // eslint-disable-line
  .reduce((acc, v) => acc + v, 0)

export const MASK_CHANNEL = 15 // 00001111
export const MASK_STATUS = 112 // 01110000

export const STATUS_NOTE_OFF = 8 // 1000

export const MAX_MUTEABLES_PER_GROUP = 6
export const MAX_MUTERS_PER_GROUP = 4
export const MAX_MUTE_GROUPS = 4
export const MAX_POLYLOCKS = 16

export const MODE_EDIT = 1
export const MODE_FACTORY_RESET = 2

export const watchForDeviceChange = (store) => {
  deviceStore(store)
  let initialDeviceCheck = true

  store.subscribe(() => {
    if (devicesChanged()) {
      /* istanbul ignore next */
      if (stompblockAttached()) {
        store.dispatch(setListeningDevices([stompblockInputId()]))
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
