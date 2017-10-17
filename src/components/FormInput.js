import React from 'react'
import Input from 'react-toolbox/lib/input'

const FormInput = (props) => {
  const { input, label, type, meta: { touched, error, warning } } = props
  console.log(props)
  return <Input {...input} type={type} label={label} error={error || warning} />
}

export default FormInput
