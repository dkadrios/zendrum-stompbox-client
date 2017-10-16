let storeInstance
let prevDevices = []

const findDevice = (devices, kind) =>
  devices
    .filter(({ type, name, state }) =>
      type === kind && name === 'Zendrum STOMPBLOCK' && state === 'connected')
    .reduce((prev, cur) => cur, undefined)

const idHash = devices => JSON.stringify(devices.map(({ id }) => id))

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

export const stompblockInputId = () => findDevice(prevDevices, 'input').id

export const stompblockOutputId = () => findDevice(prevDevices, 'output').id
