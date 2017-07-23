import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import Switch from 'react-toolbox/lib/switch';
import styles from '../styles/settings';
import * as webMidiActions from '../action-creators/webMidi';

const Settings = (props) => {
  const {
    settings,
    setMuteEnabled,
    setThruEnabled,
    setMuteGroupsEnabled,
    confirmFactoryReset,
    performFactoryReset,
  } = props;

  const {
    muteEnabledAtStart,
    thruEnabledAtStart,
    muteGroupsEnabled,
    showResetDialog,
    resetInProcess,
  } = settings;

  const actions = [
    { label: 'Cancel', onClick: () => confirmFactoryReset(false) },
    { label: 'Perform Reset', onClick: performFactoryReset },
  ];

  return (
    <div className={styles.settings}>
      <p>
        These settings directly affect the behavior of your STOMPBLOCK.
      </p>
      <section>
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

      <section>
        <Button
          icon="warning"
          label="Perform Factory Reset"
          raised
          primary
          onMouseUp={() => confirmFactoryReset(true)}
        />
      </section>

      <Dialog
        actions={actions}
        active={showResetDialog}
        onEscKeyDown={() => confirmFactoryReset(false)}
        onOverlayClick={() => confirmFactoryReset(false)}
        title="Confirm Factory Reset"
      >
        <div className={styles.warningHeader}>
          <FontIcon>warning</FontIcon>
          <p>Sure to perform reset?</p>
        </div>
        <p>This will return all settings and trim values to their factory defaults.</p>
      </Dialog>

      <Dialog
        active={resetInProcess}
        title="Factory Reset In Progress"
      >
        <p>Please wait...</p>
        <ProgressBar mode="indeterminate" />
      </Dialog>
    </div>
  );
};

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setMuteEnabled: PropTypes.func.isRequired,
  setThruEnabled: PropTypes.func.isRequired,
  setMuteGroupsEnabled: PropTypes.func.isRequired,
  confirmFactoryReset: PropTypes.func.isRequired,
  performFactoryReset: PropTypes.func.isRequired,
};

const mapStateToProps = ({ settings }) => ({ settings });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
