/* @flow */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { AppBar } from 'react-toolbox'
import MuteItem from './MuteItem'
import MuteItemNew from './MuteItemNew'
import styles from '../styles/muteGroups'
import SubAppBarTheme from '../styles/react-toolbox-theme/SubAppBar.scss'
import { MAX_MUTEABLES_PER_GROUP, MAX_MUTERS_PER_GROUP } from '../midi'
import type { MuteGroup as MuteGroupType } from '../reducers/muteGroups'
import type { MappingEntry } from '../types/Mappings'
import typeof {
  deleteMuteItem as DeleteMuteItem,
  deleteMuteGroup as DeleteMuteGroup,
  addMuteItem as AddMuteItem,
} from '../action-creators/sysex'

type Props = {
  group: MuteGroupType,
  ordinal: number,
  deleteMuteItem: DeleteMuteItem,
  deleteMuteGroup: DeleteMuteGroup,
  addMuteItem: AddMuteItem,
}

const MuteGroup = (props: Props) => {
  const { group, ordinal, deleteMuteItem, deleteMuteGroup, addMuteItem } = props
  const { muteables, muters } = group

  const List = (list, muter) =>
    list.map((item: MappingEntry, idx: number) =>
      (<MuteItem
        key={idx}
        item={item}
        groupIdx={ordinal}
        itemIdx={idx}
        muter={muter}
        deleteMuteItem={deleteMuteItem}
      />),
    )

  const NewItem = muter =>
    (<div>
      <MuteItemNew groupIdx={ordinal} muter={muter} addMuteItem={addMuteItem} />
      <small>
        {muter ? MAX_MUTERS_PER_GROUP : MAX_MUTEABLES_PER_GROUP} MAX ({muter
          ? MAX_MUTERS_PER_GROUP - muters.length
          : MAX_MUTEABLES_PER_GROUP - muteables.length}{' '}
        available)
      </small>
    </div>)

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

        {NewItem(false)}
        {NewItem(true)}
      </div>
    </div>
  )
}

export default MuteGroup
