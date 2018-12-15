import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core'
import { MODE_EDIT } from '../midi'
import { stompblockShape } from '../reducers/stompblock'

const Transition = props => (
  <Slide
    direction="up"
    {...props}
  />
)

const InEditMode = ({ stompblock: { mode } }) => (
  <Dialog
    open={mode === MODE_EDIT}
    transition={Transition}
  >
    <DialogTitle>Unit Now In Edit Mode</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Volume knob will now edit the trim for the last selected note. Hit any trigger on your Zendrum to select a note
        to edit.
        <br />
        <br />
        Depress any button to exit this mode.
      </DialogContentText>
    </DialogContent>
  </Dialog>
)

InEditMode.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(InEditMode)
