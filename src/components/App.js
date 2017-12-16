import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import MainInterface from './views/MainInterface'
import Snow from './Snow'
import styles from '../styles/app'
import muiTheme from '../styles/muiTheme'

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <div className={styles.app}>
      {!__DEV__ && <Snow />}
      <MainInterface />
    </div>
  </MuiThemeProvider>
)

export default App
