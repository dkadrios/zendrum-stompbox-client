import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import MuiDialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import muiTheme from '../styles/muiTheme'

const Transition = props => (
  <Slide
    direction="up"
    {...props}
    timeout={{ enter: 500, exit: 300 }}
  />
)

const Dialog = props => (
  <MuiThemeProvider theme={muiTheme}>
    <MuiDialog
      {...props}
      TransitionComponent={Transition}
    />
  </MuiThemeProvider>
)

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Dialog
