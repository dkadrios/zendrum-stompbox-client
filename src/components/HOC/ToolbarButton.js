import React from 'react'
import PropTypes from 'prop-types'
import ToolTipButton from '../HOC/ToolTipButton'

const capitalize = s => s[0].toUpperCase() + s.slice(1)

const ToolbarButton = ({ icon, view, selected, onClick }) => (
  <ToolTipButton
    icon={icon}
    variant="contained"
    mini
    tooltip={`${capitalize(view)} view`}
    color={selected ? 'primary' : 'secondary'}
    onClick={onClick}
  />
)

ToolbarButton.propTypes = {
  icon: PropTypes.string.isRequired,
  view: PropTypes.oneOf(['list', 'medium', 'wide']).isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ToolbarButton
