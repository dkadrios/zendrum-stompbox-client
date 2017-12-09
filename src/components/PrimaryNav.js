import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Tab, Tabs } from 'react-toolbox'
import * as settingsActions from '../action-creators/settings'
import VelocityTrimListView from './views/VelocityTrimListView'
import Settings from './views/Settings'
import MuteGroups from './views/MuteGroups'
import MidiActivity from './MidiActivity'
import TopBar from '../components/TopBar'

const PrimaryNav = ({ settings: { primaryNavTabIdx }, changePrimaryNavTab }) => (
  <div>
    <TopBar />

    <section>
      <MidiActivity />
      <Tabs index={primaryNavTabIdx} onChange={changePrimaryNavTab}>
        <Tab label="Trims">
          <VelocityTrimListView />
        </Tab>
        <Tab label="Mute Groups">
          <MuteGroups />
        </Tab>
        <Tab label="Settings">
          <Settings />
        </Tab>
      </Tabs>
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
