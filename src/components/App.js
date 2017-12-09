import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ThemeProvider } from 'react-css-themr'
import MainInterface from './views/MainInterface'
import Snow from './Snow'
import styles from '../styles/app'
import muiTheme from '../styles/muiTheme'
import theme from '../styles/react-toolbox-theme'

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <Snow />
        <MainInterface />
      </div>
    </ThemeProvider>
  </MuiThemeProvider>
)

export default App
