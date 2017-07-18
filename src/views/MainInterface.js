import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as webMidiActions from '../action-creators/webMidi';
import NoStompblockFound from './NoStompblockFound';
import InfoPanel from './InfoPanel';
import VelocityTrimList from './VelocityTrimList';

const MainInterface = (props) => {
  const { webMidi, inputDevice, outputDevice, checkVersion, version } = props;

  const stompblockAvailable = inputDevice.found && outputDevice.found;

  const style = {
    display: webMidi.enabled && version.anvil === version.expectedAnvil
      ? 'block'
      : 'none',
  };

  if (stompblockAvailable) {
    checkVersion();
    // reloadSysEx(outputDevice.id);
    return (
      <div style={style}>
        <InfoPanel />
        <VelocityTrimList />
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
  version: PropTypes.object.isRequired,
};

const mapStateToProps = ({ webMidi, inputDevice, outputDevice, version }) =>
  ({ webMidi, inputDevice, outputDevice, version });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainInterface);
