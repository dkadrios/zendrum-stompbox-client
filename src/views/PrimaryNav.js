import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
// import Link from 'react-toolbox/lib/link';
import { Tab, Tabs } from 'react-toolbox';
import VelocityTrimList from './VelocityTrimList';
import Settings from './Settings';
import theme from '../styles/react-toolbox-theme/AppBar.scss';
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
        <AppBar title="STOMPBLOCK" leftIcon={<ZendrumLogo />} theme={theme}>
          <Navigation type="horizontal">
            {/* <Link href='http://' label='Inbox' icon='inbox' theme={theme} />
            <Link href='http://' active label='Profile' icon='person' theme={theme} /> */}
          </Navigation>
        </AppBar>

        <section>
          <Tabs index={this.state.index} onChange={this.handleTabChange}>
            <Tab label="Trims">
              <VelocityTrimList />
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
