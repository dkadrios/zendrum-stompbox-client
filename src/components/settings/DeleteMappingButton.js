import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import styles from '../../styles/mapping'

const Transition = props => <Slide direction="up" {...props} />

class DeleteMappingButton extends Component {
  static propTypes = {
    deleteMapping: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }

  state = {
    dialogVisible: false,
  }

  handleOk = () => {
    const { name, deleteMapping } = this.props
    this.setState({ dialogVisible: false })
    deleteMapping(name)
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false })
  }

  handleDeleteClicked = ({ nativeEvent }) => {
    nativeEvent.stopPropagation()
    this.setState({ dialogVisible: true })
  }

  render() {
    const { dialogVisible } = this.state
    const { name } = this.props
    return (
      <div className={styles.removeIcon}>
        <IconButton onClick={this.handleDeleteClicked}>
          <DeleteIcon />
        </IconButton>

        <Dialog open={dialogVisible} transition={Transition} onClose={this.handleCancel}>
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ minWidth: 300 }}
            >{`Sure to delete '${name}'?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOk}>Ok</Button>
            <Button onClick={this.handleCancel} variant="raised" color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default DeleteMappingButton
