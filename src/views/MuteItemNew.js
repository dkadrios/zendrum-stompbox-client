/* @flow */
import React, { Component } from 'react'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import stompblockMapping from '../mappings/stompblock'
import styles from '../styles/muteGroups'
import autocompleteTheme from '../styles/react-toolbox-theme/Autocomplete.scss'
import typeof { addMuteItem as AddMuteItem } from '../action-creators/sysex'

type Props = {
  +addMuteItem: AddMuteItem,
  +groupIdx: number,
  +muter: boolean,
}

class MuteItemNew extends Component {
  source = stompblockMapping.map(item => `#${item.note} - ${item.name}`)
  props: Props

  handleAdd = (value: string) => {
    const index = this.source.indexOf(value)
    this.props.addMuteItem(this.props.groupIdx, this.props.muter, index + 1)
  }

  render() {
    return (
      <div className={styles.newItemContainer}>
        <Autocomplete
          selectedPosition="none"
          label="Add note # or instrument name"
          multiple={false}
          source={this.source}
          onChange={(value: string) => this.handleAdd(value)}
          suggestionMatch="anywhere"
          theme={autocompleteTheme}
        />
      </div>
    )
  }
}

export default MuteItemNew
