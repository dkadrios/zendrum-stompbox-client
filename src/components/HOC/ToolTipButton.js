import React from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import { withStyles, IconButton, Icon, Tooltip } from '@material-ui/core'

const buttonBase = {
  borderRadius: '2px',
  width: '32px',
  height: '32px',
  marginLeft: '4px',
}

const styles = theme => ({
  button: {
    ...buttonBase,
    color: theme.palette.action.active,
    backgroundColor: '#666',
  },
  selectedButton: {
    ...buttonBase,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary[500],
  },
})

const ToolTipButton = (props) => {
  const { classes, tooltip, icon, selected } = props
  return (
    <Tooltip title={tooltip}>
      <IconButton
        {...omit(props, ['classes', 'tooltip', 'icon'])}
        className={selected ? classes.selectedButton : classes.button}
      >
        <Icon>{icon}</Icon>
      </IconButton>
    </Tooltip>
  )
}

ToolTipButton.propTypes = {
  tooltip: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default withStyles(styles)(ToolTipButton)
