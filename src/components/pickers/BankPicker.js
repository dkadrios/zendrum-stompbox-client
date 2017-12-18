import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControl, FormControlLabel } from 'material-ui/Form'

const styles = theme => ({
  formControl: {
    margin: 0,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    display: 'flex',
    flexFlow: 'row noWrap',
  },
})

const BankPicker = ({ value, onChange, classes, disabled }) => (
  <div>
    <FormControl component="fieldset" required className={classes.formControl}>
      <RadioGroup
        aria-label="bank"
        name="bank"
        className={classes.group}
        value={String(value)}
        onChange={(event, val) => onChange(Number(val))}
      >
        <FormControlLabel value="0" control={<Radio disabled={disabled} />} label="Bank A" />
        <FormControlLabel value="1" control={<Radio disabled={disabled} />} label="Bank B" />
      </RadioGroup>
    </FormControl>
  </div>
)

BankPicker.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default withStyles(styles)(BankPicker)
