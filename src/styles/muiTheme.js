import { createMuiTheme } from '@material-ui/core/styles'
// import grey from 'material-ui/colors/grey'
import zendrumRed from './zendrumRed'

export default createMuiTheme({
  palette: {
    primary: zendrumRed,
    secondary: zendrumRed,
  },

  typography: {
    useNextVariants: true,
  },

  overrides: {
    MuiAppBar: {
      root: {
        background: 'linear-gradient(45deg, #000 30%, #000 90%)',
      },
    },
    MuiButton: {
      root: {},
      disabled: {
        background: 'linear-gradient(180deg, #aaa 30%, #aaa 90%)',
        color: '#555',
      },
      raisedSecondary: {
        backgroundColor: '#666',
        color: '#2f2f2f',
      },
    },
    MuiDialogContent: {
      root: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1rem',
      },
    },
    MuiExpansionPanel: {
      root: {
        backgroundColor: '#444',
        color: 'white',
        marginTop: 4,
      },
      expanded: {
        marginTop: '4px !important',
      },
    },
    MuiExpansionPanelSummary: {
      expandIcon: {
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
      tooltip: {
        fontSize: 14,
      },
    },
  },
})
