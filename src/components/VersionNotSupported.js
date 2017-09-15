/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'react-toolbox/lib/dialog'
import styles from '../styles/midiSecurity'
import type { VersionState } from '../reducers/version'

const VersionNotSupported = (props: { version: VersionState }) => {
  const { version } = props

  const formatted = value => `v${(value / 10).toFixed(1)}`

  // SPECIAL CASE made for version 2.4 -- allow it to work with 2.5 UI
  const isVisible = () =>
    version.checked && version.anvil !== version.expectedAnvil && version.anvil !== 24

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
        <span>Your version: {formatted(version.anvil)}</span>
        <span>Current version: {formatted(version.expectedAnvil)}</span>
      </p>
    </Dialog>
  )
}

const mapStateToProps = ({ version }: { version: VersionState }) => ({ version })

export default connect(mapStateToProps)(VersionNotSupported)
