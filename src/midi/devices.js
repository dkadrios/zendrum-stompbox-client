/*
We can't start with an empty device list because if the computer has no
attached devices, we'll never trigger an initial 'devicesChanged' action.
So we'll start with a non-existent device to compare against.
*/
const initialNullDevice = { id: -1 }

let storeInstance
let prevDevices = [initialNullDevice]

const findDevice = (devices, kind) =>
  devices
    .filter(({ type, name, state }) =>
      type === kind && name === 'Zendrum STOMPBLOCK' && state === 'connected')
    .reduce((prev, cur) => cur, undefined)

const idHash = devices => JSON.stringify(devices.map(({ id }) => id))

const deviceId = device => (device ? device.id : -1)

export const deviceStore = (store) => {
  storeInstance = store
}

export const devicesChanged = () => {
  const { midi: { devices } } = storeInstance.getState()
  const result = idHash(devices) !== idHash(prevDevices)
  if (result) {
    prevDevices = [...devices]
  }

  return result
}

export const stompblockAttached = () => {
  const { midi: { devices } } = storeInstance.getState()
  return findDevice(devices, 'input') && findDevice(devices, 'output')
}

export const stompblockInputId = () => deviceId(findDevice(prevDevices, 'input'))

export const stompblockOutputId = () => deviceId(findDevice(prevDevices, 'output'))
