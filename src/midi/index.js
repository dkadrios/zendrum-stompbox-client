import { setListeningDevices } from 'redux-midi-fork'
import {
  searchedForStompblock,
  stompblockFound,
  stompblockMissing,
} from '../action-creators/stompblock'
import { deviceStore, devicesChanged, stompblockAttached, stompblockInputId } from './devices'

export const STOMPBLOCK_DEVICE_ID = 0x6b

export const CURRENT_CLIENT_VERSION = 44

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
