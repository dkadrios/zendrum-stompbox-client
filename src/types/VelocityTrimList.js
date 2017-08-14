/* @flow */
import type { MappingEntry } from '../types/Mappings'

import typeof {
  userChangedTrim as UserChangedTrim,
  userChangedTrimEnd as UserChangedTrimEnd,
  playNote as PlayNote,
} from '../action-creators/sysex'
import typeof { selectTrim as SelectTrim } from '../action-creators/velocityTrimListFilter'

export type Styles = {
  selected: string,
  header: string,
  noteName: string,
  trimContainer: string,
  buttons: string,
}

export type ListView = 'narrow' | 'medium' | 'wide'

export type TrimListItemProps = {
  +item: MappingEntry,
  +styles: Styles,
  +selected: boolean,
  +playNote: PlayNote,
  +selectTrim: SelectTrim,
  +userChangedTrim: UserChangedTrim,
  +userChangedTrimEnd: UserChangedTrimEnd,
}
