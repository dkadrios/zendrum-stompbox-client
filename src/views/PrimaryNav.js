import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
// import Link from 'react-toolbox/lib/link';
import { Tab, Tabs } from 'react-toolbox';
import VelocityTrimListView from './VelocityTrimListView';
import Settings from './Settings';
import MuteGroups from './MuteGroups';
import MidiActivity from './MidiActivity';
import appTheme from '../styles/react-toolbox-theme/AppBar.scss';
import tabTheme from '../styles/react-toolbox-theme/Tabs.scss';
import ZendrumLogo from '../images/ZendrumLogo.svg';

class PrimaryNav extends React.Component {
  state = {
    index: 0,
  };

  handleTabChange = (index) => {
    this.setState({ index });
  };

  render() {
    return (
      <div>
        <AppBar title="STOMPBLOCK" leftIcon={<ZendrumLogo />} theme={appTheme}>
          <Navigation type="horizontal">
            {/* <Link href='http://' label='Inbox' icon='inbox' theme={theme} />
            <Link href='http://' active label='Profile' icon='person' theme={theme} /> */}
          </Navigation>
        </AppBar>

        <section>
          <MidiActivity />
          <Tabs index={this.state.index} onChange={this.handleTabChange} theme={tabTheme}>
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
    );
  }
}

export default PrimaryNav;
