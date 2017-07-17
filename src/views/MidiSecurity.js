import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../styles/midiSecurity';
import * as webMidiActions from '../action-creators/webMidi';

const MidiSecurity = (props) => {
  const { /* midiInterface = {}, */ enabled = false } = props.webMidi;

  const style = {
    display: enabled ? 'none' : 'block',
  };

  return (
    <div className={styles.midiSecurity} style={style}>
      <h1>Connect Instructions</h1>
      <p>
        This application requires special permissions before it can use
        SysEx and connect to your Zendrum STOMPBOX.
      </p>
      <p>
        Please select &#8216;Allow&#8217; when prompted.
      </p>
    </div>
  );
};

MidiSecurity.propTypes = {
  webMidi: PropTypes.object.isRequired,
};

const mapStateToProps = ({ webMidi }) => ({ webMidi });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MidiSecurity);
