import React from 'react'
import PropTypes from 'prop-types'
import Input from 'react-toolbox/lib/input'

const FormInput = (props) => {
  const { input, label, type, meta: { touched, error, warning } } = props
  return <Input {...input} type={type} label={label} error={touched ? error || warning : null} />
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
}

export default FormInput
