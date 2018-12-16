import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/internalState'
import { stompblockShape } from '../reducers/stompblock'

const percent = value => (value === 1 ? 0 : value === 127 ? 100 : Math.round(value / 1.27))

const formatPercent = value => (value === -1 ? '-- ' : percent(value))

const InternalState = ({ stompblock }) => {
  const { volumeSetting, velocitySetting, muteState, demoState, thruState } = stompblock

  return (
    <div className={styles.internalState}>
      <section>
        Vol <strong>{formatPercent(volumeSetting)}%</strong>
      </section>
      <section>
        Sens <strong>{formatPercent(velocitySetting)}%</strong>
      </section>

      <div className={styles.leds}>
        <div className={muteState ? styles.ledRedBlink : styles.ledRed} />
        <div className={demoState ? styles.ledYellowBlink : styles.ledYellow} />
        <div className={thruState ? styles.ledGreenBlink : styles.ledGreen} />
      </div>
    </div>
  )
}

InternalState.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(InternalState)
