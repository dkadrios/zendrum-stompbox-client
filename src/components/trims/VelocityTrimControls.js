import React from 'react'
import PropTypes from 'prop-types'
import Knob from '../../components/thirdParty/Knob'
import styles from '../../styles/velocityTrim'
import { trimShape } from '../../reducers/velocityTrim'

const wheelColor = value => (value > 65 ? '#11ff00' : value > 30 ? 'orange' : 'yellow')

const VelocityTrimControls = ({ item, bank, userChangedTrim, userChangedTrimEnd, mobile }) => (
  <div className={styles.trimContainer}>
    <div>
      <Knob
        mobile={mobile}
        width={35}
        height={35}
        min={0}
        max={100}
        step={1}
        thickness={0.45}
        bgColor="#888888"
        fgColor={wheelColor(item.trim)}
        lineCap="butt"
        disableTextInput
        displayInput={false}
        value={item.trim}
        onChange={newVal => userChangedTrim(item.note, newVal, bank)}
        onChangeEnd={newVal => userChangedTrimEnd(item.note, newVal, bank)}
      />
    </div>
    <div>{item.trim}</div>
    <div className={styles.buttons}>
      <dd>
        <button onClick={() => userChangedTrimEnd(item.note, item.trim + 1, bank)}>+</button>
        <button onClick={() => userChangedTrimEnd(item.note, item.trim - 1, bank)}>-</button>
      </dd>
      <div>
        <button onClick={() => userChangedTrimEnd(item.note, 100, bank)}>MAX</button>
        <button onClick={() => userChangedTrimEnd(item.note, 0, bank)}>MUTE</button>
      </div>
    </div>
  </div>
)

VelocityTrimControls.defaultProps = {
  item: {},
  mobile: false,
}
VelocityTrimControls.propTypes = {
  item: trimShape,
  userChangedTrim: PropTypes.func.isRequired,
  userChangedTrimEnd: PropTypes.func.isRequired,
  bank: PropTypes.number.isRequired,
  mobile: PropTypes.bool,
}

export default VelocityTrimControls
