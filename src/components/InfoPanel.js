import React from 'react'
import { connect } from 'react-redux'
import styles from '../styles/infoPanel'

const InfoPanel = ({ version }) => {
  const formatted = value =>
    Number.isNaN(value) ? 'N/A' : `v${(value / 10).toFixed(1)}`

  const year = () => new Date().getFullYear()

  const copyright = (yr = 2017) => (yr === year() ? yr : `${yr} - ${year()}`)

  const foundVersion = () =>
    version.anvil === version.expectedAnvil ? (
      formatted(version.anvil)
    ) : (
      <span className={styles.wrongVersion}>{formatted(version.anvil)}</span>
    )

  return (
    <footer className={styles.infoPanel}>
      <div className={styles.copyright}>
        &copy; Copyright <a href="https://zendrumstudio.com">Zendrum Studio</a>,{' '}
        {copyright()}
      </div>
      <div className={styles.versions}>
        {/* SERIAL: {version.serialNumber} */}
        <span className={styles.version}>
          Version : {formatted(version.client)}
        </span>
        <span className={styles.version}>
          <a href="https://zendrumstudio.com/anvil">ANVIL</a> : {foundVersion()}
        </span>
      </div>
    </footer>
  )
}

const mapStateToProps = ({ version }) => ({ version })

export default connect(mapStateToProps)(InfoPanel)
