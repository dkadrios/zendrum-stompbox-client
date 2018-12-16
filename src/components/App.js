import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import BrowserDetection from 'react-browser-detection'
import { Titled } from 'react-titled'
import MainInterface from './views/MainInterface'
import UnsupportedBrowser from './views/UnsupportedBrowser'
import Snow from './Snow'
import styles from '../styles/app'
import muiTheme from '../styles/muiTheme'

const browserHandler = {
  chrome: () => <MainInterface />,
  'android-chrome': () => <MainInterface />,
  opera: () => <MainInterface />,
  default: () => <UnsupportedBrowser />,
  android: () => <UnsupportedBrowser />,
}

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <Titled title={() => 'Zendrum Stompblock Client Interface'} />
    <div className={styles.app}>
      {!__DEV__ && <Snow />}
      <BrowserDetection>{browserHandler}</BrowserDetection>
    </div>
  </MuiThemeProvider>
)

export default App
