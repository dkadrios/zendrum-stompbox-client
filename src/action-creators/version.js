import shortid from 'shortid'
import { checkRegistration } from './user'
import { GET_SYSEX_VERSION, RECEIVED_VERSION } from './actions'

const generateSerial = () => (__DEV__ || __TEST__ ? 'DARIN__25' : shortid.generate())

export const checkVersion = () => ({
  type: GET_SYSEX_VERSION,
  serialNumber: generateSerial(),
})

export const receivedVersion = (anvil, serialNumber) => (dispatch) => {
  dispatch({
    type: RECEIVED_VERSION,
    anvil,
    serialNumber,
  })

  dispatch(checkRegistration(serialNumber, anvil))
}
