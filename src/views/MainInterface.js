import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as webMidiActions from '../action-creators/webMidi';
import NoStompblockFound from './NoStompblockFound';
import NotResponding from './NotResponding';
import InfoPanel from './InfoPanel';
import VersionNotSupported from './VersionNotSupported';
import VelocityTrimList from './VelocityTrimList';

const MainInterface = (props) => {
  const { webMidi, inputDevice, outputDevice, version } = props;

  const stompblockAvailable = inputDevice.found && outputDevice.found;
  const versionMatch = webMidi.enabled && version.anvil === version.expectedAnvil;
  const notResponding = stompblockAvailable && isNaN(version.anvil);

  const InfoPanelRenderer = () => <InfoPanel />;
  const VelocityTrimListRenderer = () => <VelocityTrimList />;
  const NoStompblockFoundRenderer = () => <NoStompblockFound />;
  const NotRespondingRenderer = () => <NotResponding />;

  const Renderer = () => {
    let result = <div />;

    if (stompblockAvailable) {
      if (notResponding) {
        result = <NotRespondingRenderer />;
      } else if (webMidi.enabled) {
        if (versionMatch) {
          result = (<div>
            <InfoPanelRenderer />
            <VelocityTrimListRenderer />
          </div>);
        } else {
          result = <VersionNotSupported />;
        }
      }
    } else {
      result = <NoStompblockFoundRenderer />;
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
