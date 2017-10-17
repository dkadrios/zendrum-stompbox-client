import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/infoPanel'

const InfoPanel = ({ version }) => {
  const { expectedAnvil, anvil, client } = version
  const formatted = value => (Number.isNaN(value) ? 'N/A' : `v${(value / 10).toFixed(1)}`)

  const year = () => new Date().getFullYear()
  const copyright = (yr = 2017) => (yr === year() ? yr : `${yr} - ${year()}`)

  const foundVersion = () =>
    anvil === expectedAnvil ? (
      formatted(anvil)
    ) : (
      <span className={styles.wrongVersion}>{formatted(anvil)}</span>
    )

  return (
    <footer className={styles.infoPanel}>
      <div className={styles.copyright}>
        &copy; Copyright <a href="https://zendrumstudio.com">Zendrum Studio</a>, {copyright()}
      </div>
      <div className={styles.versions}>
        {/* SERIAL: {serialNumber} */}
        <span className={styles.version}>Version : {formatted(client)}</span>
        <span className={styles.version}>
          <a href="https://zendrumstudio.com/anvil">ANVIL</a> : {foundVersion()}
        </span>
      </div>
    </footer>
  )
}

InfoPanel.propTypes = {
  version: PropTypes.shape({
    expectedAnvil: PropTypes.number,
    anvil: PropTypes.number,
    client: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = ({ version }) => ({ version })

export default connect(mapStateToProps)(InfoPanel)
