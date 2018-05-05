import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import BrowserDetection from 'react-browser-detection'
import MainInterface from './views/MainInterface'
import UnsupportedBrowser from './views/UnsupportedBrowser'
import Snow from './Snow'
import styles from '../styles/app'
import muiTheme from '../styles/muiTheme'

const browserHandler = {
  chrome: () => <MainInterface />,
  opera: () => <MainInterface />,
  default: () => <UnsupportedBrowser />,
}

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <div className={styles.app}>
      {!__DEV__ && <Snow />}
      <BrowserDetection>{browserHandler}</BrowserDetection>
    </div>
  </MuiThemeProvider>
)

export default App
