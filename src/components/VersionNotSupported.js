import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'react-toolbox/lib/dialog'
import styles from '../styles/midiSecurity'

const VersionNotSupported = ({ version }) => {
  const formatted = value => `v${(value / 10).toFixed(1)}`

  const { checked, anvil, expectedAnvil } = version

  // SPECIAL CASE made for version 2.4 -- allow it to work with 2.5 UI
  const isVisible = () => checked && anvil !== expectedAnvil && anvil !== 24

  return (
    <Dialog active={isVisible()} title="Unsupported Version" className={styles.versionNotSupported}>
      <p>
        Your STOMPBLOCK is running an incompatible version of the{' '}
        <a href="https://zendrumstudio.com/anvil">ANVIL</a> operating system.
      </p>
      <p>
        An updated version has been released by <a href="https://nebiru.com">Nebiru Software</a>{' '}
        that likely adds some cool new feature or squashes a pesky bug.
      </p>
      <p>
        In order to continue using this application, you&apos;ll need to first update your
        STOMPBLOCK&apos;s firmware. Instructions on how to do this can be found on the{' '}
        <a href="https://zendrumstudio.com/anvil">ANVIL homepage</a>.
      </p>
      <p className={styles.version}>
        <span>Your version: {formatted(anvil)}</span>
        <span>Current version: {formatted(expectedAnvil)}</span>
      </p>
    </Dialog>
  )
}

VersionNotSupported.propTypes = {
  version: PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    anvil: PropTypes.number.isRequired,
    expectedAnvil: PropTypes.number.isRequired,
  }).isRequired,
}

const mapStateToProps = ({ version }) => ({ version })

export default connect(mapStateToProps)(VersionNotSupported)
