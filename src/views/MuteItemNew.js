import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import stompblockMapping from '../mappings/stompblock'
import styles from '../styles/muteGroups'
import autocompleteTheme from '../styles/react-toolbox-theme/Autocomplete.scss'


class MuteItemNew extends React.Component {
  static propTypes = {
    addMuteItem: PropTypes.func.isRequired,
    groupIdx: PropTypes.number.isRequired,
    muter: PropTypes.bool.isRequired,
  };

  source = stompblockMapping.map(item => `#${item.note} - ${item.name}`)

  handleAdd = (value, groupIdx, muter, addMuteItem) => {
    const index = this.source.indexOf(value)
    addMuteItem(groupIdx, muter, index + 1)
  }

  render() {
    const { addMuteItem, groupIdx, muter } = this.props

    return (
      <div className={styles.newItemContainer}>
        <Autocomplete
          selectedPosition="none"
          label="Add note # or instrument name"
          multiple={false}
          source={this.source}
          onChange={value => this.handleAdd(value, groupIdx, muter, addMuteItem)}
          suggestionMatch="anywhere"
          theme={autocompleteTheme}
        />
      </div>
    )
  }
}

export default MuteItemNew
