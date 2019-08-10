import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Tab } from '@material-ui/core'
import * as settingsActions from '../action-creators/settings'
import VelocityTrimListView from './views/VelocityTrimListView'
import Settings from './views/Settings'
import MuteGroups from './views/MuteGroups'
import PolyLocks from './views/PolyLocks'
import MidiActivity from './MidiActivity'
import InternalState from './InternalState'
import InResetMode from './InResetMode'
import InEditMode from './InEditMode'
import TopBar from './TopBar'
import ErrorDialog from './ErrorDialog'

const PrimaryNav = ({
  settings: { primaryNavTabIdx, hasVersionThreeFirmware, errorMessage, errorVisible },
  changePrimaryNavTab,
  dismissError,
  ...rest
}) => (
  <div>
    <TopBar />

    <section>
      {hasVersionThreeFirmware && <InternalState />}
      <MidiActivity />
      <Tabs
        indicatorColor="primary"
        value={primaryNavTabIdx}
        onChange={(e, value) => changePrimaryNavTab(value)}
      >
        <Tab label="Trims" />
        <Tab label="Mute Groups" />
        <Tab
          label="Polyphony"
          style={{ display: hasVersionThreeFirmware ? 'inline-flex' : 'none' }}
        />
        <Tab label="Settings" />
      </Tabs>
      {primaryNavTabIdx === 0 && <VelocityTrimListView {...rest} />}
      {primaryNavTabIdx === 1 && <MuteGroups />}
      {primaryNavTabIdx === 2 && <PolyLocks />}
      {primaryNavTabIdx === 3 && <Settings />}
      <InResetMode />
      <InEditMode />
      <ErrorDialog
        errorMessage={errorMessage}
        errorVisible={errorVisible}
        dismissError={dismissError}
      />
    </section>
  </div>
)

PrimaryNav.propTypes = {
  settings: PropTypes.shape({
    primaryNavTabIdx: PropTypes.number.isRequired,
  }).isRequired,
  changePrimaryNavTab: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired,
}

const mapStateToProps = ({ settings }) => ({ settings })
const mapDispatchToProps = dispatch => bindActionCreators(settingsActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimaryNav)
