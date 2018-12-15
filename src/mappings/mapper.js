import { arraySequence } from '../utils'

export default (raw) => {
  const availableNotes = raw.map((item) => {
    const props = /(\d+):([\w\s-]+)\|(.*)/.exec(item)

    return {
      note: parseInt(props[1], 10),
      group: String(props[2]).trim(),
      name: String(props[3]).trim(),
    }
  })

  // We may not have a complete set of 128 notes, so fill in the blanks
  return arraySequence(128)
    .map(n => n + 1)
    .map(n => availableNotes.find(({ note }) => n === note) || {
      note: n,
      group: '',
      name: '',
    })
}
