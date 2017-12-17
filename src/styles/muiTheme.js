import { createMuiTheme } from 'material-ui/styles'
// import grey from 'material-ui/colors/grey'
import zendrumRed from './zendrumRed'

export default createMuiTheme({
  palette: {
    primary: zendrumRed,
    accent: zendrumRed[400],
  },

  overrides: {
    MuiAppBar: {
      root: {
        background: 'linear-gradient(45deg, #000 30%, #000 90%)',
      },
    },
    MuiButton: {
      root: {},
      raisedAccent: {
        background: 'linear-gradient(180deg, #333 30%, #000 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
      },
    },
    MuiFormControlLabel: {
      label: {
        color: 'white',
      },
    },
    MuiSelect: {
      root: {
        backgroundColor: 'white',
        borderRadius: 5,
        border: '1px solid #ccc',
        height: 30,
        paddingLeft: 5,
      },
    },
    MuiToolbar: {
      root: {
        color: 'white',
      },
    },
    MuiTooltip: {
      tooltipBottom: {
        fontSize: 14,
      },
    },
  },
})
