import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles, IconButton, Icon, Tooltip } from '@material-ui/core'

const styles = theme => ({
  button: {
    borderRadius: '2px',
    width: '32px',
    height: '32px',
    marginLeft: '4px',
    color: theme.palette.action.active,
    backgroundColor: '#666',
    padding: 0,
  },
  selectedButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary[500],
  },
})

const ToolTipButton = (props) => {
  const { classes, tooltip, icon, selected, ...rest } = props
  const className = classNames({
    [classes.button]: true,
    [classes.selectedButton]: selected,
  })
  return (
    <Tooltip title={tooltip}>
      <IconButton {...rest} className={className}>
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
