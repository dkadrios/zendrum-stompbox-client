import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import { stompblockShape } from '../reducers/stompblock'

const Transition = props => <Slide direction="up" {...props} />
const Bullet = () => <span>&nbsp;&nbsp;&nbsp;&#x2022; </span>

const NotResponding = ({ stompblock: { responding } }) => (
  <Dialog open={!responding} transition={Transition}>
    <DialogTitle>STOMPBLOCK Not Responding</DialogTitle>
    <DialogContent>
      <DialogContentText>
        There appears to be an available STOMPBLOCK attached to your computer, however it is not
        responding to requests.
      </DialogContentText>

      <DialogContentText>
        <br />
      </DialogContentText>

      <DialogContentText>
        <b>Troubleshooting</b>
      </DialogContentText>
      <DialogContentText>
        <Bullet />Check that no other software is utilizing your STOMPBLOCK<br />
        <Bullet />Plug directly into a USB port, if using a HUB or other USB host device<br />
        <Bullet />Try a different USB port<br />
        <Bullet />Power down the STOMPBLOCK, plug it back in, wait 5 seconds and then refresh this
        page
      </DialogContentText>
    </DialogContent>
  </Dialog>
)

NotResponding.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(NotResponding)
