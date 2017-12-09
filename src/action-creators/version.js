import shortid from 'shortid'
import { checkRegistration } from './user'
import { GET_SYSEX_VERSION, RECEIVED_VERSION } from './actions'

export const checkVersion = () => ({
  type: GET_SYSEX_VERSION,
  serialNumber: shortid.generate(),
})

export const receivedVersion = (anvil, serialNumber) => (dispatch) => {
  dispatch({
    type: RECEIVED_VERSION,
    anvil,
    serialNumber,
  })

  dispatch(checkRegistration(serialNumber, anvil))
}
