import React from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-toolbox/lib/switch'

const ToggleSwitch = ({ checked, feature, handler }) => (
  <Switch checked={checked} label={`Enable ${feature}`} onChange={value => handler(value)} />
)

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  feature: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
}

export default ToggleSwitch
