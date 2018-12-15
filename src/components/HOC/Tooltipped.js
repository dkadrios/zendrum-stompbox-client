import React from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import { Tooltip } from '@material-ui/core'

const MuiTooltip = (props) => {
  const rest = omit(props, ['title', 'tooltip', 'tooltipDelay'])
  return (
    <Tooltip title={props.tooltip}>
      <div {...rest} />
    </Tooltip>
  )
}
MuiTooltip.propTypes = {
  tooltip: PropTypes.string.isRequired,
}

const Tooltipped = (props) => {
  const { tooltip } = props
  return tooltip ? ( //
    <MuiTooltip
      title={tooltip}
      {...props}
    />
  ) : (
    <div {...props} />
  )
}
Tooltipped.propTypes = {
  tooltip: PropTypes.string.isRequired,
  tooltipDelay: PropTypes.number,
  theme: PropTypes.object, // eslint-disable-line
}

Tooltipped.defaultProps = {
  tooltipDelay: 250,
}

export default Tooltipped
