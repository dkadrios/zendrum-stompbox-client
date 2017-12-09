import React from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import RTTooltip from 'react-toolbox/lib/tooltip'

function Div(props) {
  const rest = omit(props, ['theme', 'tooltip', 'tooltipDelay', 'tooltipHideOnClick'])
  return <div {...rest} />
}

const Tooltip = RTTooltip(Div)

const Tooltipped = (props) => {
  const { tooltip, tooltipDelay, theme } = props
  return tooltip ? ( //
    <Tooltip tooltipDelay={tooltipDelay} theme={theme} {...props} />
  ) : (
    <Div {...props} />
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
