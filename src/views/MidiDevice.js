import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as midiDeviceActions from '../action-creators/midiDevices';
import styles from '../styles/midiDevices';

const MidiDevice = (props) => {
  const { kind, name } = props;

  return (
    <li className={styles.device}>
      {name}
    </li>
  );
};

MidiDevice.propTypes = {
  midiDevices: PropTypes.object,
};

const mapStateToProps = ({ midiDevices }) => ({ midiDevices });
const mapDispatchToProps = dispatch => bindActionCreators(midiDeviceActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidiDevice);
