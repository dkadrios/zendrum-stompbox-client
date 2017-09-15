import React, { Component } from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import { Tab, Tabs } from 'react-toolbox'
import UserInfo from './UserInfo'
import VelocityTrimListView from './views/VelocityTrimListView'
import Settings from './views/Settings'
import MuteGroups from './views/MuteGroups'
import MidiActivity from './MidiActivity'
import appTheme from '../styles/react-toolbox-theme/AppBar.scss'
import tabsTheme from '../styles/react-toolbox-theme/Tabs.scss'
import ZendrumLogo from '../images/ZendrumLogo.svg.js'

class PrimaryNav extends Component<Object> {
  constructor() {
    super()
    this.state = { index: 0 }
  }

  handleTabChange = (index) => {
    this.setState({ index })
  }

  render() {
    return (
      <div>
        <AppBar title="STOMPBLOCK" leftIcon={<ZendrumLogo />} theme={appTheme}>
          <Navigation type="horizontal">
            <UserInfo />
          </Navigation>
        </AppBar>

        <section>
          <MidiActivity />
          <Tabs index={this.state.index} onChange={this.handleTabChange} theme={tabsTheme}>
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
  }
}

export default PrimaryNav
