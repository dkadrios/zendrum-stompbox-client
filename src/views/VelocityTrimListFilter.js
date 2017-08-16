/* @flow */
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
import type { TrimsState } from '../reducers/velocityTrim'
import type { Dispatch } from '../types/Store'
import typeof {
  searchTrims as SearchTrims,
  changeGroup as ChangeGroup,
  changeListView as ChangeListView,
} from '../action-creators/velocityTrimListFilter'
import type { GroupName } from '../types/Mappings'
import type { ListView } from '../types/VelocityTrimList'

type Props = {
  +velocityTrim: TrimsState,
  +searchTrims: SearchTrims,
  +changeGroup: ChangeGroup,
  +changeListView: ChangeListView,
}

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

const ToolTipButton = Tooltip(props => <Button {...props} />)

const VelocityTrimListFilter = (props: Props) => {
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

  const Btn = ({ icon, view, selected }: { icon: string, view: ListView, selected: boolean }) =>
    (<ToolTipButton
      theme={buttonTheme}
      icon={icon}
      primary={listView === view}
      raised
      tooltip={capitalize(view)}
      className={selected ? styles.selected : ''}
      onClick={() => changeListView(view)}
    />)

  return (
    <div className={styles.filters}>
      <DebounceInput
        type="search"
        value={search}
        placeholder="Filter by name"
        debounceTimeout={200}
        onChange={(e: KeyboardEventHandler) => searchTrims(e.target.value)}
      />

      <Dropdown
        theme={dropdownTheme}
        className={styles.groups}
        auto
        onChange={(value: GroupName) => changeGroup(value)}
        source={groups}
        value={group}
      />

      <div className={styles.buttonGroup}>
        <Btn icon="view_stream" view="narrow" selected={listView === 'narrow'} />
        <Btn icon="view_module" view="medium" selected={listView === 'medium'} />
        <Btn icon="view_comfy" view="wide" selected={listView === 'wide'} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ velocityTrim }: { velocityTrim: TrimsState }) => ({ velocityTrim })
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(filterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VelocityTrimListFilter)
