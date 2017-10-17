import React from 'react'
import PropTypes from 'prop-types'
import { AppBar } from 'react-toolbox'
import MuteItem from './MuteItem'
import MuteGroupNewItem from './MuteGroupNewItem'
import { mappingShape } from '../reducers/mapping'
import styles from '../styles/muteGroups'
import SubAppBarTheme from '../styles/react-toolbox-theme/SubAppBar.scss'

const MuteGroup = (props) => {
  const { group, ordinal, deleteMuteItem, deleteMuteGroup, mapping } = props
  const { muteables, muters } = group

  const List = (list, muter) =>
    list.map((note, idx) => (
      <MuteItem
        key={idx}
        note={note}
        mapping={mapping}
        groupIdx={ordinal}
        itemIdx={idx}
        muter={muter}
        deleteMuteItem={deleteMuteItem}
      />
    ))

  return (
    <div>
      <AppBar
        theme={SubAppBarTheme}
        title={`Group #${ordinal + 1}`}
        rightIcon="delete_forever"
        onRightIconClick={() => deleteMuteGroup(ordinal)}
      />
      <div className={styles.muteGroup}>
        <section>
          <h1>These notes are muted&hellip;</h1>
          {List(muteables, false)}
        </section>

        <section>
          <h1>&hellip;whenever these notes are played</h1>
          {List(muters, true)}
        </section>

        <MuteGroupNewItem {...props} muter={false} />
        <MuteGroupNewItem {...props} muter />
      </div>
    </div>
  )
}

MuteGroup.propTypes = {
  group: PropTypes.shape({
    muteables: PropTypes.arrayOf(PropTypes.number),
    muters: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  ordinal: PropTypes.number.isRequired,
  addMuteItem: PropTypes.func.isRequired,
  deleteMuteItem: PropTypes.func.isRequired,
  deleteMuteGroup: PropTypes.func.isRequired,
  mapping: mappingShape.isRequired,
}

export default MuteGroup
