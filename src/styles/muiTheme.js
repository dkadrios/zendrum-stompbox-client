import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      light: '#ad5555',
      main: '#ad0000',
      dark: '#ad5555',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#5a5a5a',
      dark: '#784141',
      contrastText: '#fff',
    },
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
