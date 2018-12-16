import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Tooltip, Button } from '@material-ui/core'

const ToolTipButton = (props) => {
  const { tooltip, icon, ...rest } = props

  return (
    <Tooltip title={tooltip}>
      <Button {...rest}>
        <Icon>{icon}</Icon>
      </Button>
    </Tooltip>
  )
}

ToolTipButton.propTypes = {
  tooltip: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}

export default (ToolTipButton)
