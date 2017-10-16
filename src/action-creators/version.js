import shortid from 'shortid'
import { checkedRegistration } from './stompblock'
import { PRODUCT_INSTANCE } from '../endpoints'
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

  fetch(PRODUCT_INSTANCE + serialNumber)
    .then(response => response.json())
    .then(productInstance => dispatch(checkedRegistration(productInstance)))
}
