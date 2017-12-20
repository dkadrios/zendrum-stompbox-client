import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import { stompblockShape } from '../reducers/stompblock'

const Transition = props => <Slide direction="up" {...props} />

const NoStompblockFound = ({ stompblock: { searchedForStompblock, found } }) => (
  <Dialog open={searchedForStompblock && !found} transition={Transition}>
    <DialogTitle>STOMPBLOCK Not Found</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Sorry, I cannot not find an available STOMPBLOCK attached to your device<br />
        <br />
        <b>Troubleshooting</b>
      </DialogContentText>
      <ul>
        <li>Check that your STOMPBLOCK is connected via USB</li>
        <li>Check that no other software is utilizing your STOMPBLOCK</li>
        <li>If connecting through a USB Host device, try connecting directly instead</li>
      </ul>
    </DialogContent>
  </Dialog>
)

NoStompblockFound.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(NoStompblockFound)
