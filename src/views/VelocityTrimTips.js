/* @flow */
import React from 'react'
import styles from '../styles/velocityTrim'

const VelocityTrimTips = (props: { active: boolean }) => {
  const { active } = props

  return (
    <ul className={styles.tips} style={{ visibility: active ? 'visible' : 'hidden' }}>
      <li>&#11014; &#11015; = &#177; 1</li>
      <li>PgUp / PgDn = &#177; 5</li>
      <li>ESC = Mute</li>
      <li>Enter = Max</li>
    </ul>
  )
}

export default VelocityTrimTips
