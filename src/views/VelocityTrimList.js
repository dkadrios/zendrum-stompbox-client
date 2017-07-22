import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Knob from 'react-canvas-knob';
import * as webMidiActions from '../action-creators/webMidi';
import styles from '../styles/velocityTrim';

const wheelColor = (value) => { // eslint-disable-line
  return value > 65 // eslint-disable-line
    ? '#22FF55'
    : value > 30
      ? 'orange'
      : 'yellow';
};

const VelocityTrimList = (props) => {
  const { velocityTrim, userChangedTrim, userChangedTrimEnd } = props;

  return (
    <div className={styles.listContainer}>
      <div>[SORT CONTROLS]</div>
      <ul className={styles.list}>
        {
          velocityTrim.data.map(item => (
            <li key={item.note} className={styles.listItem}>
              <div className={styles.header}>
                <div className={styles.noteNum}>{item.note}</div>
                <div className={styles.noteGroup}>{item.group}</div>
              </div>
              <div className={styles.noteName} title={item.name}>{item.name}</div>
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
            </li>
          ))
        }
      </ul>
    </div>
  );
};

VelocityTrimList.propTypes = {
  velocityTrim: PropTypes.object.isRequired,
  userChangedTrim: PropTypes.func.isRequired,
  userChangedTrimEnd: PropTypes.func.isRequired,
};

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VelocityTrimList);
