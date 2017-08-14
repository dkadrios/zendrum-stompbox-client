/* @flow */
import React from 'react'
import VelocityTrim from './VelocityTrim'
import styles from '../styles/velocityTrim'
import type { MappingEntry } from '../types/Mappings'
import type { TrimsState } from '../reducers/velocityTrim'
import typeof {
  userChangedTrim as UserChangedTrim,
  userChangedTrimEnd as UserChangedTrimEnd,
  playNote as PlayNote,
} from '../action-creators/sysex'
import typeof { selectTrim as SelectTrim } from '../action-creators/velocityTrimListFilter'

type Props = {
  +items: Array<MappingEntry>,
  +velocityTrim: TrimsState,
  +playNote: PlayNote,
  +selectTrim: SelectTrim,
  +userChangedTrim: UserChangedTrim,
  +userChangedTrimEnd: UserChangedTrimEnd,
}

const VelocityTrimList = (props: Props) => {
  const { items, velocityTrim } = props
  const { listView, selectedNoteNum } = velocityTrim

  return (
    <ul className={styles[`${listView}View`]}>
      {items.map(item =>
        (<VelocityTrim
          key={item.note}
          item={item}
          styles={styles}
          selected={item.note === selectedNoteNum}
          {...props}
        />),
      )}
    </ul>
  )
}

export default VelocityTrimList
