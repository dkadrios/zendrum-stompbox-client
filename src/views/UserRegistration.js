import React, { Component } from 'react'
import { autobind } from 'core-decorators'
import Input from 'react-toolbox/lib/input'
import Dialog from 'react-toolbox/lib/dialog'
import styles from '../styles/registration'
import GravatarIcon from '../images/Gravatar.svg'

const fieldLabels = { firstName: 'First Name', lastName: 'Last Name', email: 'Email' }

class UserRegistration extends Component {
  constructor(props) {
    super(props)
    const { version: { firstName, lastName, email } } = props
    this.state = {
      firstName,
      lastName,
      email,
      errors: { firstName: '', lastName: '', email: '' },
    }
    this.changed = false
  }

  componentWillReceiveProps(newProps) {
    const { version: { firstName, lastName, email } } = newProps
    if (
      // TODO - find easier way to do partial equality
      this.state.firstName !== firstName ||
      this.state.lastName !== lastName ||
      this.state.email !== email
    ) {
      this.setState({ ...this.state, firstName, lastName, email })
    }
  }

  @autobind
  close() {
    this.props.showDialog(false)
  }

  @autobind
  submitForm() {
    const val = field => this.state[field].trim().length > 0 && this.state.errors[field] === ''
    if (val('firstName') && val('lastName') && val('email')) {
      if (this.changed) {
        const { firstName, lastName, email } = this.state
        this.props.submitForm({ firstName, lastName, email })
      }
      // Either way, close the dlg
      this.close()
    }
  }

  @autobind
  handleChange(value, event) {
    if ([event.target.name] !== value) {
      this.setState({
        [event.target.name]: value,
      })
      this.changed = true
    }
  }

  @autobind
  validateFormField(event) {
    const { name, value } = event.target
    const errors = { ...this.state.errors }
    const label = fieldLabels[name]

    errors[name] = ''
    switch (name) {
      case 'email':
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          errors[name] = 'Invalid email address'
        }
        break
      default:
        if (value.trim() === '') {
          errors[name] = `${label} is required`
        }
    }

    this.setState({
      errors,
    })
  }

  render() {
    const HOCInput = name =>
      (<Input
        type="text"
        label={fieldLabels[name]}
        name={name}
        error={this.state.errors[name]}
        value={this.state[name]}
        onChange={this.handleChange}
        onBlur={this.validateFormField}
        maxLength={64}
      />)

    this.actions = [
      { label: 'Cancel', onClick: this.close },
      { label: 'Submit', onClick: this.submitForm, raised: true, primary: true },
    ]
    return (
      <Dialog
        actions={this.actions}
        active={this.props.active}
        onEscKeyDown={this.close}
        onOverlayClick={this.close}
        title="STOMPBLOCK Registration"
      >
        <p>
          Register yourself as the owner of this STOMPBLOCK<br />
          Serial number:<strong> {this.props.version.serialNumber}</strong>
        </p>
        <section>
          {HOCInput('firstName')}
          {HOCInput('lastName')}
          {HOCInput('email')}
        </section>
        <div className={styles.gravatarNotice}>
          <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">
            <GravatarIcon />
          </a>
          <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">
            We use Gravatar for displaying profile images
          </a>
        </div>
      </Dialog>
    )
  }
}

export default UserRegistration
