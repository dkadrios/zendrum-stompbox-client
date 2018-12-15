import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import BrowserDetection from 'react-browser-detection'
import MainInterface from './views/MainInterface'
import UnsupportedBrowser from './views/UnsupportedBrowser'
import Snow from './Snow'
import muiTheme from '../styles/muiTheme'
import '../styles/fonts.css'

const browserHandler = {
  chrome: () => <MainInterface />,
  'android-chrome': () => <MainInterface />,
  opera: () => <MainInterface />,
  default: () => <UnsupportedBrowser />,
  android: () => <UnsupportedBrowser />,
}

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <CssBaseline />
    {!__DEV__ && <Snow />}
    <BrowserDetection>{browserHandler}</BrowserDetection>
  </MuiThemeProvider>
)

export default App
