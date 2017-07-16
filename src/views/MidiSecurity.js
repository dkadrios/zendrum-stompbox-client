import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../styles/midiSecurity';
import * as midiDeviceActions from '../action-creators/midiDevices';

const MidiSecurity = (props) => {
  const { midiInterface = {}, enabled = false } = props.midiDevices;

  const style = {
    display: enabled ? 'none' : 'block',
  };

  return (
    <div className={styles.midiSecurity} style={style}>
      <h1>Connect Instructions</h1>
      <p>
        This application requires special permission before it can use
        SysEx.
      </p>
      <p>
        Please select &#8216;Allow&#8217; when prompted.
      </p>
    </div>
  );
};

MidiSecurity.propTypes = {
  midiDevices: PropTypes.object,
};

const mapStateToProps = ({ midiDevices }) => ({ midiDevices });
const mapDispatchToProps = dispatch => bindActionCreators(midiDeviceActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidiSecurity);
