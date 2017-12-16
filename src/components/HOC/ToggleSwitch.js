import React from 'react'
import PropTypes from 'prop-types'
import Switch from 'material-ui/Switch'
import { FormControlLabel, FormGroup } from 'material-ui/Form'

const ToggleSwitch = ({ checked, feature, handler }) => (
  <FormGroup>
    <FormControlLabel
      control={<Switch checked={checked} onChange={(event, value) => handler(value)} />}
      label={`Enable ${feature}`}
    />
  </FormGroup>
)

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  feature: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
}

export default ToggleSwitch
