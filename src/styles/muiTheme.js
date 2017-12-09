import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey800, white } from 'material-ui/styles/colors'

export default getMuiTheme({
  palette: {
    canvasColor: grey800,
    textColor: white,
  },
  appBar: {
    height: 50,
  },
})
