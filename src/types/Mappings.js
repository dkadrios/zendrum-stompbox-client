/* @flow */
export type GroupName = 'Cymbals' | 'Hats' | 'Kicks' | 'Perc' | 'Rides' | 'Snares' | 'Toms'

export type MappingEntry = {
  +note: number,
  +name: string,
  +group: GroupName,
  +trim: number,
}

export type ArrayOfMappingEntries = Array<MappingEntry>
