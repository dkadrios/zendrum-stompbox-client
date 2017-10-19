import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import FormInput from './FormInput'
import * as userActions from '../action-creators/user'
import styles from '../styles/registration'
import { fieldRequired, fieldMaxLength64, fieldEmail } from '../utils'

const UserRegistrationForm = ({ error, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className={styles.nameFields}>
      <Field
        name="firstName"
        type="text"
        component={FormInput}
        label="First Name"
        validate={[fieldRequired, fieldMaxLength64]}
      />
      <Field
        name="lastName"
        type="text"
        component={FormInput}
        label="Last Name"
        validate={[fieldRequired, fieldMaxLength64]}
      />
    </div>
    <Field
      name="email"
      type="email"
      component={FormInput}
      label="Email"
      validate={[fieldRequired, fieldEmail]}
    />
    {error && <strong>{error}</strong>}
  </form>
)

UserRegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
}
UserRegistrationForm.defaultProps = { error: '' }

const mapStateToProps = ({ user }) => ({ initialValues: user })

const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)
const formOptions = {
  form: 'userRegistrationForm',
  enableReinitialize: true,
  onSubmit: (values, dispatch) => dispatch(userActions.submitRegistration(values)),
}

/* eslint-disable */
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(formOptions)(UserRegistrationForm),
)
