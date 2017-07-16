import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MidiDevice from './MidiDevice';
import * as midiDeviceActions from '../action-creators/midiDevices';
import styles from '../styles/midiDevices';

const MidiDevices = (props) => {
  const { /* midiInterface = {}, */ inputs = [], outputs = [], enabled } = props.midiDevices;

  const style = {
    display: enabled ? 'block' : 'none',
  };

  return (
    <div style={style}>
      <ul className={styles.devicesContainer}>

        <li className={styles.deviceContainer}>
          <h2>Inputs</h2>
          <ul>
            {
              inputs.map(device => <MidiDevice key={device.name} kind="input" {...device} />)
            }
          </ul>
        </li>

        <li className={styles.deviceContainer}>
          <h2>Outputs</h2>
          <ul>
            {
              outputs.map(device => <MidiDevice key={device.name} kind="input" {...device} />)
            }
          </ul>
        </li>

      </ul>
    </div>
  );
};

MidiDevices.propTypes = {
  midiDevices: PropTypes.object.isRequired,
};

const mapStateToProps = ({ midiDevices }) => ({ midiDevices });
const mapDispatchToProps = dispatch => bindActionCreators(midiDeviceActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidiDevices);
