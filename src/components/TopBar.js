import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import UserInfo from './UserInfo'
import appTheme from '../styles/react-toolbox-theme/AppBar.scss'
import ZendrumLogo from '../images/ZendrumLogo.svg.js'

const TopBar = () => (
  <AppBar title="STOMPBLOCK" leftIcon={<ZendrumLogo />} theme={appTheme}>
    <Navigation type="horizontal">
      <UserInfo />
    </Navigation>
  </AppBar>
)

export default TopBar
