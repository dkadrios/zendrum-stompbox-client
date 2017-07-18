import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Knob from 'react-canvas-knob';
import * as webMidiActions from '../action-creators/webMidi';
import styles from '../styles/velocityTrim';

const VelocityTrimList = (props) => {
  const { velocityTrim, userChangedTrim, userChangedTrimEnd } = props;

  return (
    <div className={styles.listContainer}>
      <h1>Trims</h1>
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
                {item.trim}<br />
                <Knob
                  width={30}
                  min={0}
                  max={100}
                  step={1}
                  title="Trim"
                  disableTextInput={!false}
                  displayInput={false}
                  value={item.trim}
                  onChange={newVal => userChangedTrim(item.note, newVal)}
                  onChangeEnd={newVal => userChangedTrimEnd(item.note, newVal)}
                />
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