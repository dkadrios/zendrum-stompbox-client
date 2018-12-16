import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { stompblockShape } from '../reducers/stompblock'
import Dialog from './Dialog'

const NotResponding = ({ stompblock: { responding } }) => (
  <Dialog open={!responding}>
    <DialogTitle>STOMPBLOCK Not Responding</DialogTitle>
    <DialogContent>
      <DialogContentText>
        There appears to be an available STOMPBLOCK attached to your computer, however it is not responding to requests.
        <br />
        <br />
        <b>Troubleshooting</b>
      </DialogContentText>
      <ul>
        <li>Check that no other software is utilizing your STOMPBLOCK</li>
        <li>Plug directly into a USB port, if using a HUB or other USB host device</li>
        <li>Try a different USB port</li>
        <li>Power down the STOMPBLOCK, plug it back in, wait 5 seconds and then refresh this page</li>
      </ul>
    </DialogContent>
  </Dialog>
)

NotResponding.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(NotResponding)
