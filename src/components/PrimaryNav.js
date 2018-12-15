import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Tab, Grid } from '@material-ui/core'
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

const tabContent = [<VelocityTrimListView />, <MuteGroups />, <PolyLocks />, <Settings />]

const PrimaryNav = ({
  settings: { primaryNavTabIdx, hasVersionThreeFirmware, errorMessage, errorVisible },
  changePrimaryNavTab,
  dismissError,
}) => (
  <>
    <TopBar />

    <Grid
      container
      justify="space-between"
    >
      <Grid item>
        <Tabs
          indicatorColor="primary"
          textColor="secondary"
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
      </Grid>

      <Grid item>
        <Grid container>
          <Grid item>{hasVersionThreeFirmware && <InternalState />}</Grid>

          <Grid item>
            <MidiActivity />
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    {tabContent[primaryNavTabIdx]}

    <InResetMode />
    <InEditMode />
    <ErrorDialog
      errorMessage={errorMessage}
      errorVisible={errorVisible}
      dismissError={dismissError}
    />
  </>
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
