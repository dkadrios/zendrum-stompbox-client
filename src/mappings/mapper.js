/* @flow */

import type { MappingEntry } from '../types/Mappings'

export default (raw: Array<string>): Array<MappingEntry> =>
  raw.map((item: string): MappingEntry => {
    const props: Array<*> = /(\d+):([\w\s]+)\|([\w\s/]+)/.exec(item)

    return {
      note: parseInt(props[1], 10),
      group: props[2],
      name: props[3],
      trim: 0,
    }
  })
