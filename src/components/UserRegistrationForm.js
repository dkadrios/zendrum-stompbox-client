import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import FormInput from './FormInput'
import * as userActions from '../action-creators/user'

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength64 = maxLength(64)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const UserRegistrationForm = ({ onSubmit, submitting }) => (
  // const { handleSubmit, /* pristine, reset */ submitting } = props
  <form onSubmit={onSubmit}>
    <Field
      name="firstName"
      type="text"
      component={FormInput}
      label="First Name"
      validate={[required, maxLength64]}
    />
    <Field
      name="lastName"
      type="text"
      component={FormInput}
      label="Last Name"
      validate={[required, maxLength64]}
    />
    <Field
      name="email"
      type="email"
      component={FormInput}
      label="Email"
      validate={[required, email]}
    />
    <div>
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </div>
  </form>
)

const mapStateToProps = ({ user }) => ({ initialValues: user })

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)
const formOptions = { form: 'userRegistrationForm', enableReinitialize: true }

/* eslint-disable */
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(formOptions)(UserRegistrationForm),
)
