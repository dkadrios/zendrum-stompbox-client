import { createMuiTheme } from 'material-ui/styles'
import grey from 'material-ui/colors/grey'
import red from 'material-ui/colors/red'

export default createMuiTheme({
  palette: {
    primary: grey,
    accent: red,
  },

  overrides: {
    MuiAppBar: {
      root: {
        background: 'linear-gradient(45deg, #000 30%, #000 90%)',
      },
    },
    /* MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    }, */
    MuiToolbar: {
      root: {
        color: 'white',
      },
    },
  },
})
