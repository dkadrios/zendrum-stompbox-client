import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as webMidiActions from '../action-creators/webMidi';
import NoStompblockFound from './NoStompblockFound';
import InfoPanel from './InfoPanel';
// import styles from '../styles/midiDevices';

const MainInterface = (props) => {
  const { webMidi, inputDevice, outputDevice, checkVersion } = props;

  const stompblockAvailable = inputDevice.found && outputDevice.found;

  const style = {
    display: webMidi.enabled ? 'block' : 'none',
  };

  if (stompblockAvailable) {
    checkVersion();
    // reloadSysEx(outputDevice.id);
    return (
      <div style={style}>
        <InfoPanel />

      </div>
    );

  } else { // eslint-disable-line
    return (
      <div style={style}>
        <NoStompblockFound />
      </div>
    );
  }
};

MainInterface.propTypes = {
  webMidi: PropTypes.object.isRequired,
  inputDevice: PropTypes.object.isRequired,
  outputDevice: PropTypes.object.isRequired,
  checkVersion: PropTypes.func.isRequired,
};

const mapStateToProps = ({ webMidi, inputDevice, outputDevice }) =>
  ({ webMidi, inputDevice, outputDevice });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainInterface);
