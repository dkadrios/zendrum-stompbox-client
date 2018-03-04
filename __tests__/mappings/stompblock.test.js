import stompblock from '../../src/mappings/stompblock'

describe('stompblock mapping', () => {
  it('should be fully populated', () => {
    expect(stompblock.length).toEqual(128)
  })

  it('should pass the smell test', () => {
    expect(stompblock[24]).toEqual({
      group: 'Kick',
      name: 'Funk Kick',
      note: 25,
    })
  })
})
