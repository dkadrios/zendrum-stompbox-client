import React from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'

const styles = {
  button: {
    backgroundColor: '#444',
    borderRadius: '2px',
    width: '32px',
    height: '32px',
    marginLeft: '4px',
  },
}

const ToolTipButton = (props) => {
  const { classes, tooltip, icon } = props
  return (
    <Tooltip title={tooltip}>
      <IconButton {...omit(props, ['classes', 'tooltip', 'icon'])} className={classes.button}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

ToolTipButton.propTypes = {
  tooltip: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ToolTipButton)
