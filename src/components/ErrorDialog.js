import React from 'react'
import PropTypes from 'prop-types'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import Dialog from './Dialog'

const ErrorDialog = ({ errorMessage, errorVisible, dismissError }) => (
  <Dialog
    open={errorVisible}
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
