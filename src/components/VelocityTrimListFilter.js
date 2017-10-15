import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DebounceInput from 'react-debounce-input'
import Dropdown from 'react-toolbox/lib/dropdown'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button'
import * as filterActions from '../action-creators/velocityTrimListFilter'
import styles from '../styles/velocityTrimListFilter'
import dropdownTheme from '../styles/react-toolbox-theme/Dropdown.scss'
import buttonTheme from '../styles/react-toolbox-theme/ToolButton.scss'

const capitalize = s => s[0].toUpperCase() + s.slice(1)

const ToolTipButton = Tooltip(props => <Button {...props} />)

const VelocityTrimListFilter = (props) => {
  const { velocityTrim, searchTrims, changeGroup, changeListView } = props

  const { search, group, listView } = velocityTrim

  const groups = [
    { value: 'all', label: 'All groups' },
    { value: 'Cymbals', label: 'Cymbals' },
    { value: 'Hats', label: 'Hats' },
    { value: 'Kicks', label: 'Kicks' },
    { value: 'Perc', label: 'Perc' },
    { value: 'Rides', label: 'Rides' },
    { value: 'Snares', label: 'Snares' },
    { value: 'Toms', label: 'Toms' },
  ]

  const Btn = ({ icon, view, selected }) => (
    <ToolTipButton
      theme={buttonTheme}
      icon={icon}
      primary={listView === view}
      raised
      tooltip={`${capitalize(view)} view`}
      className={selected ? styles.selected : ''}
      onClick={() => changeListView(view)}
    />
  )

  return (
    <div className={styles.filters}>
      <DebounceInput
        type="search"
        value={search}
        placeholder="Filter by name or #"
        debounceTimeout={200}
        onChange={e => searchTrims(e.target.value)}
      />

      <Dropdown
        theme={dropdownTheme}
        className={styles.groups}
        auto
        onChange={value => changeGroup(value)}
        source={groups}
        value={group}
      />

      <div className={styles.buttonGroup}>
        <Btn
          icon="view_stream"
          view="narrow"
          selected={listView === 'narrow'}
        />
        <Btn
          icon="view_module"
          view="medium"
          selected={listView === 'medium'}
        />
        <Btn icon="view_comfy" view="wide" selected={listView === 'wide'} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim })
const mapDispatchToProps = dispatch =>
  bindActionCreators(filterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VelocityTrimListFilter)
