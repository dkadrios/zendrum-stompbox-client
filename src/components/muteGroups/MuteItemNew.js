import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NotePicker from '../pickers/NotePicker'
import styles from '../../styles/muteGroups'
import { mappingShape } from '../../reducers/mapping'

class MuteItemNew extends Component {
  constructor(props) {
    super(props)
    this.source = props.mapping.map(item => `#${item.note} - ${item.name}`)
  }

  handleAdd = (value) => {
    const { addMuteItem, groupIdx, muter } = this.props
    const index = this.source.indexOf(value)
    if (index > -1 && index < 128) {
      addMuteItem(groupIdx, muter, index + 1)
    }
  }

  render() {
    return (
      <div className={styles.newItemContainer}>
        <NotePicker
          mapping={this.props.mapping}
          onChange={this.handleAdd}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

MuteItemNew.propTypes = {
  addMuteItem: PropTypes.func.isRequired,
  groupIdx: PropTypes.number.isRequired,
  muter: PropTypes.bool.isRequired,
  mapping: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default MuteItemNew
