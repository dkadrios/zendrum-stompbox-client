import React from 'react';
import PropTypes from 'prop-types';
import Knob from 'react-canvas-knob';

const wheelColor = (value) => { // eslint-disable-line
  return value > 65 // eslint-disable-line
    ? '#22FF55'
    : value > 30
      ? 'orange'
      : 'yellow';
};

const VelocityTrimControls = ({
  item,
  styles,
  userChangedTrim,
  userChangedTrimEnd,
}) => (
  <div className={styles.trimContainer}>
    <div>
      <Knob
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
        onChange={newVal => userChangedTrim(item.note, newVal)}
        onChangeEnd={newVal => userChangedTrimEnd(item.note, newVal)}
      />
    </div>
    <div>{item.trim}</div>
    <div className={styles.buttons}>
      <button type="button" onClick={() => userChangedTrimEnd(item.note, 100)}>MAX</button>
      <button type="button" onClick={() => userChangedTrimEnd(item.note, 0)}>MUTE</button>
    </div>
  </div>
);

VelocityTrimControls.propTypes = {
  item: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  userChangedTrim: PropTypes.func.isRequired,
  userChangedTrimEnd: PropTypes.func.isRequired,
};

export default VelocityTrimControls;
