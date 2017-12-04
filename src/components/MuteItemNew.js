import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import styles from '../styles/muteGroups'
import autocompleteTheme from '../styles/react-toolbox-theme/Autocomplete.scss'
import { mappingShape } from '../reducers/mapping'

class MuteItemNew extends Component {
  constructor(props) {
    super(props)
    this.source = props.mapping.map(item => `#${item.note} - ${item.name}`)
  }

  handleAdd = (value) => {
    const { addMuteItem, groupIdx, muter } = this.props
    const index = this.source.indexOf(value)
    addMuteItem(groupIdx, muter, index + 1)
  }

  render() {
    return (
      <div className={styles.newItemContainer}>
        <Autocomplete
          selectedPosition="none"
          label="Add note # or instrument name"
          multiple={false}
          source={this.source}
          onChange={value => this.handleAdd(value)}
          suggestionMatch="anywhere"
          theme={autocompleteTheme}
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
}

export default MuteItemNew
