import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

const FormInput = (props) => {
  const { input, label, type, meta: { touched, error, warning }, classes } = props
  const errored = touched && (error || warning)

  return (
    <TextField
      {...input}
      type={type}
      label={label}
      error={!!errored}
      className={classes.textField}
      helperText={touched ? error || warning : null}
    />
  )
}
FormInput.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.error,
    warning: PropTypes.string,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormInput)
