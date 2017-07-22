import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as webMidiActions from '../action-creators/webMidi';
import NoStompblockFound from './NoStompblockFound';
import NotResponding from './NotResponding';
import MidiSecurity from './MidiSecurity';
import VersionNotSupported from './VersionNotSupported';
import PrimaryNav from './PrimaryNav';
import InfoPanel from './InfoPanel';

const MainInterface = (props) => {
  const { webMidi, inputDevice, outputDevice, version } = props;

  const stompblockAvailable = inputDevice.found && outputDevice.found;
  const versionMatch = version.anvil === version.expectedAnvil;
  const notResponding = stompblockAvailable && isNaN(version.anvil);

  const Renderer = () => {
    let result = <MidiSecurity />;

    if (webMidi.enabled) {
      if (stompblockAvailable) {
        if (notResponding) {
          result = <NotResponding />;
        } else if (webMidi.enabled) {
          if (versionMatch) {
            result = <div><PrimaryNav /><InfoPanel /></div>;
          } else {
            result = <VersionNotSupported />;
          }
        }
      } else {
        result = <NoStompblockFound />;
      }
    }
    return result;
  };

  return Renderer();
};

MainInterface.propTypes = {
  webMidi: PropTypes.object.isRequired,
  inputDevice: PropTypes.object.isRequired,
  outputDevice: PropTypes.object.isRequired,
  version: PropTypes.object.isRequired,
};

const mapStateToProps = ({ webMidi, inputDevice, outputDevice, version }) =>
  ({ webMidi, inputDevice, outputDevice, version });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainInterface);
