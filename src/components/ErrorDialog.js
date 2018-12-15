import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core'

const Transition = props => (
  <Slide
    direction="up"
    {...props}
  />
)

const ErrorDialog = ({ errorMessage, errorVisible, dismissError }) => (
  <Dialog
    open={errorVisible}
    transition={Transition}
    onClose={dismissError}
  >
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <DialogContentText>{errorMessage}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={dismissError}
        variant="contained"
        color="primary"
        autoFocus
      >
        OK
      </Button>
    </DialogActions>
  </Dialog>
)

ErrorDialog.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  errorVisible: PropTypes.bool.isRequired,
  dismissError: PropTypes.func.isRequired,
}

export default ErrorDialog
