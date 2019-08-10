import React from 'react'
import PropTypes from 'prop-types'
import { Switch, FormControlLabel, FormGroup } from '@material-ui/core'

const ToggleSwitch = ({ checked, feature, handler }) => (
  <FormGroup>
    <FormControlLabel
      control={<Switch
        color="primary"
        checked={checked}
        onChange={(event, value) => handler(value)}
      />}
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
