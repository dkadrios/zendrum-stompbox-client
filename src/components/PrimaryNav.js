import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tabs, { Tab } from 'material-ui/Tabs'
import * as settingsActions from '../action-creators/settings'
import VelocityTrimListView from './views/VelocityTrimListView'
import Settings from './views/Settings'
import MuteGroups from './views/MuteGroups'
import PolyLocks from './views/PolyLocks'
import MidiActivity from './MidiActivity'
import TopBar from '../components/TopBar'

const PrimaryNav = ({
  settings: { primaryNavTabIdx, hasSoundBankSupport },
  changePrimaryNavTab,
}) => (
  <div>
    <TopBar />

    <section>
      <MidiActivity />
      <Tabs
        indicatorColor="primary"
        value={primaryNavTabIdx}
        onChange={(e, value) => changePrimaryNavTab(value)}
      >
        <Tab label="Trims" />
        <Tab label="Mute Groups" />
        <Tab label="Polyphony" style={{ display: hasSoundBankSupport ? 'inline-flex' : 'none' }} />
        <Tab label="Settings" />
      </Tabs>
      {primaryNavTabIdx === 0 && <VelocityTrimListView />}
      {primaryNavTabIdx === 1 && <MuteGroups />}
      {primaryNavTabIdx === 2 && <PolyLocks />}
      {primaryNavTabIdx === 3 && <Settings />}
    </section>
  </div>
)

PrimaryNav.propTypes = {
  settings: PropTypes.shape({
    primaryNavTabIdx: PropTypes.number.isRequired,
  }).isRequired,
  changePrimaryNavTab: PropTypes.func.isRequired,
}

const mapStateToProps = ({ settings }) => ({ settings })
const mapDispatchToProps = dispatch => bindActionCreators(settingsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryNav)
