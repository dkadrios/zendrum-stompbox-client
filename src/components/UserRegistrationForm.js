import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core'
import FormInput from './FormInput'
import * as userActions from '../action-creators/user'
import { fieldRequired, fieldMaxLength64, fieldEmail } from '../utils'

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '2px groove #ccc',
    borderRadius: 5,
    backgroundColor: '#f3f3f3',
    maxWidth: 480,
    margin: '15px 0 40px',
    paddingBottom: 20,
  },
}

const UserRegistrationForm = ({ error, handleSubmit, classes }) => (
  <form
    onSubmit={handleSubmit}
    className={classes.container}
  >
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
  classes: PropTypes.object.isRequired,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm(formOptions)(withStyles(styles)(UserRegistrationForm)))
