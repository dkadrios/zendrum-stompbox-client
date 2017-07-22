import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Switch from 'react-toolbox/lib/switch';
import Button from 'react-toolbox/lib/button';
import * as webMidiActions from '../action-creators/webMidi';

const Settings = (props) => {
  const { settings, setMuteEnabled, setThruEnabled, setMuteGroupsEnabled, performFactoryReset } = props;

  const { muteEnabledAtStart, thruEnabledAtStart, muteGroupsEnabled } = settings;

  return (
    <div>
      <section style={{ margin: '20px 0 0 20px' }}>
        <Switch
          checked={muteEnabledAtStart}
          label="Enable MUTE when turned on"
          onChange={value => setMuteEnabled(value)}
        />

        <Switch
          checked={thruEnabledAtStart}
          label="Enable THRU when turned on"
          onChange={value => setThruEnabled(value)}
        />

        <Switch
          checked={muteGroupsEnabled}
          label="Enable mute groups (e.g. hi-hats)"
          onChange={value => setMuteGroupsEnabled(value)}
        />
      </section>

      <section style={{ margin: '100px 0 0 20px' }}>
        <Button
          icon="warning"
          label="Perform Factory Reset"
          raised
          primary
          onMouseUp={() => performFactoryReset()}
        />
      </section>
    </div>
  );
};

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setMuteEnabled: PropTypes.func.isRequired,
  setThruEnabled: PropTypes.func.isRequired,
  setMuteGroupsEnabled: PropTypes.func.isRequired,
  performFactoryReset: PropTypes.func.isRequired,
};

const mapStateToProps = ({ settings }) => ({ settings });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
