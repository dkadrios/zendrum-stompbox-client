import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/velocityTrim'

const VelocityTrimTips = ({ active }) => (
  <div className={styles.tips}>
    <ul style={{ visibility: active ? 'visible' : 'hidden' }}>
      <li>&#11014; &#11015; = &#177; 1</li>
      <li>PgUp / PgDn = &#177; 5</li>
      <li>ESC = Mute</li>
      <li>Enter = Max</li>
    </ul>
  </div>
)

VelocityTrimTips.propTypes = {
  active: PropTypes.bool.isRequired,
}

export default VelocityTrimTips
