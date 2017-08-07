import stompblock from '../../src/mappings/stompblock';

describe('stompblock mapping', () => {
  it('should be fully populated', () => {
    expect(stompblock.length).toEqual(126);
  });

  it('should pass the smell test', () => {
    expect(stompblock[24]).toEqual({
      group: 'Kicks',
      name: 'Funk Kick',
      note: 25,
      trim: 0,
    });
  });
});
