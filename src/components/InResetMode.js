import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import { MODE_FACTORY_RESET } from '../midi'
import { stompblockShape } from '../reducers/stompblock'

const Transition = props => <Slide direction="up" {...props} />

const InResetMode = ({ stompblock: { mode } }) => (
  <Dialog open={mode === MODE_FACTORY_RESET} transition={Transition}>
    <DialogTitle>Unit Now In Factory Reset Mode</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Depress the MUTE button to confirm reset.<br />
        <br />
        Depress any other button to abort.
      </DialogContentText>
    </DialogContent>
  </Dialog>
)

InResetMode.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(InResetMode)
