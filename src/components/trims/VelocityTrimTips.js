import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/velocityTrim'

const VelocityTrimTips = ({ active, mappingName }) => (
  <div className={styles.tips}>
    <div>
      <b>Mapping:</b> {mappingName}
    </div>
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
  mappingName: PropTypes.string,
}

VelocityTrimTips.defaultProps = {
  mappingName: '',
}

export default VelocityTrimTips
