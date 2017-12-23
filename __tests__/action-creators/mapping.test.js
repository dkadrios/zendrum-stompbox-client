import deepFreeze from 'deep-freeze'
import 'jest-localstorage-mock'
import storeFactory from '../../src/store'
import { selectMapping } from '../../src/action-creators/mapping'

describe('mapping actions', () => {
  let store

  const mapping = {
    banks: {
      0: {
        name: '',
        entries: [],
      },
      1: {
        name: '',
        entries: [],
      },
    },
    available: [
      { name: 'stompblock', label: 'STOMPBLOCK' },
      { name: 'emrichNumber1', label: 'John Emrich - Articulations #1' },
    ],
  }

  deepFreeze(mapping)

  describe('loadMapping 1', () => {
    beforeAll(() => {
      store = storeFactory({ mapping }, false, true)
      store.dispatch(selectMapping('emrichNumber1', 1))
    })

    it('should succeed', () => {
      expect(store.getState().mapping).toEqual({
        ...mapping,
        banks: {
          0: {
            name: '',
            entries: [],
          },
          1: {
            name: 'emrichNumber1',
            entries: [
              { group: 'Percussion', name: 'Tumba Thump', note: 1 },
              { group: 'Percussion', name: 'Tumba Open', note: 2 },
              { group: 'Percussion', name: 'Quinto Slap', note: 3 },
              { group: 'Percussion', name: 'Quinto Open Trio ', note: 4 },
              { group: 'Percussion', name: 'Cajon 10 Open', note: 5 },
              { group: 'Percussion', name: 'Cajon 10 Open', note: 6 },
              { group: 'Percussion', name: 'Cajon 12 Open', note: 7 },
              { group: 'Percussion', name: 'Cajon 12 Open', note: 8 },
              { group: 'Percussion', name: 'Clave', note: 9 },
              { group: 'Percussion', name: 'Djembe 1 Open', note: 10 },
              { group: 'Percussion', name: 'Djembe 2 Mute', note: 11 },
              { group: 'Percussion', name: 'Djembe Slap', note: 12 },
              { group: 'Percussion', name: 'Bongo High Open', note: 13 },
              { group: 'Percussion', name: 'Bongo Low Open', note: 14 },
              { group: 'Percussion', name: 'Darbuka Center', note: 15 },
              { group: 'Percussion', name: 'Darbuka Rim', note: 16 },
              { group: 'Percussion', name: 'DS Tambourine', note: 17 },
              { group: 'Percussion', name: 'Udu Strike', note: 18 },
              { group: 'Percussion', name: 'Udu Scoop', note: 19 },
              { group: 'Percussion', name: 'Doumbek Center', note: 20 },
              { group: 'Percussion', name: 'Doumbek Rim', note: 21 },
              { group: 'Kick', name: 'Bop Kick', note: 22 },
              { group: 'Kick', name: 'General Kick', note: 23 },
              { group: 'Kick', name: 'Sleishman 20', note: 24 },
              { group: 'Kick', name: 'Tonal 1', note: 25 },
              { group: 'Kick', name: 'Ti BD 26 ', note: 26 },
              { group: 'Kick', name: 'Remo 18 Djembe ', note: 27 },
              { group: 'Snare', name: 'Sleishman Maple Snare Hit', note: 28 },
              { group: 'Snare', name: 'Sleishman Maple Snare Alt', note: 29 },
              { group: 'Snare', name: 'Sleishman Maple Snare Drag', note: 30 },
              { group: 'Snare', name: 'Sleishman Maple Snare RimSHot', note: 31 },
              { group: 'Snare', name: 'Sleishman Maple Snare XStick', note: 32 },
              { group: 'Snare', name: 'Sleishman Acrylic Snare Hit', note: 33 },
              { group: 'Snare', name: 'Sleishman Acrylic Snare Alt', note: 34 },
              { group: 'Snare', name: 'Sleishman Acrylic Snare RimShot', note: 35 },
              { group: 'Snare', name: 'Sleishman Acrylic Snare Drag', note: 36 },
              { group: 'Snare', name: 'Sleishman Acrylic Snare XStick', note: 37 },
              { group: 'Snare', name: 'Yamaha Bamboo ', note: 38 },
              { group: 'Snare', name: 'Yamaha Bamboo ', note: 39 },
              { group: 'Snare', name: 'Yamaha Bamboo ', note: 40 },
              { group: 'Snare', name: 'Ti Snare ', note: 41 },
              { group: 'Snare', name: 'Ti Snare ', note: 42 },
              { group: 'Snare', name: 'Ti Snare ', note: 43 },
              { group: 'Snare', name: 'Ti Snare ', note: 44 },
              { group: 'Snare', name: 'Ti Snare ', note: 45 },
              { group: 'Snare', name: 'Armstrong Concert Snare RimClick', note: 46 },
              { group: 'Snare', name: 'Armstrong Concert Snare Hit', note: 47 },
              { group: 'Snare', name: 'Armstrong Concert Snare Drag', note: 48 },
              { group: 'Snare', name: 'Armstrong Concert Snare RimShot', note: 49 },
              { group: 'Snare', name: 'Armstrong Concert Snare XStick', note: 50 },
              { group: 'Snare', name: 'Haynes Sig', note: 51 },
              { group: 'Snare', name: 'Haynes Sig', note: 52 },
              { group: 'Snare', name: 'Haynes Sig', note: 53 },
              { group: 'Snare', name: 'Haynes Sig', note: 54 },
              { group: 'Snare', name: 'Haynes Sig', note: 55 },
              { group: 'Snare', name: 'Haynes Sig', note: 56 },
              { group: 'Snare', name: 'Haynes Sig', note: 57 },
              { group: 'Snare', name: 'Haynes Sig', note: 58 },
              { group: 'Snare', name: 'Haynes Sig', note: 59 },
              { group: 'Snare', name: 'Haynes Sig', note: 60 },
              { group: 'Tom', name: 'Birch 10 Tom Hit', note: 61 },
              { group: 'Tom', name: 'Birch 10 Tom RimShot', note: 62 },
              { group: 'Tom', name: 'Birch 10 Tom RimClick', note: 63 },
              { group: 'Tom', name: 'Birch 12 Tom Hit', note: 64 },
              { group: 'Tom', name: 'Birch 12 Tom RimShot', note: 65 },
              { group: 'Tom', name: 'Birch 12 Tom RimClick', note: 66 },
              { group: 'Tom', name: 'Birch 16 Tom Hit', note: 67 },
              { group: 'Tom', name: 'Birch 16 Tom RimShot', note: 68 },
              { group: 'Tom', name: 'Birch 16 Tom RimClick', note: 69 },
              { group: 'Tom', name: 'Maple 10 Tom Hit', note: 70 },
              { group: 'Tom', name: 'Maple 10 Tom RimShot', note: 71 },
              { group: 'Tom', name: 'Maple 10 Tom RimClick', note: 72 },
              { group: 'Tom', name: 'Maple 12 Tom Hit', note: 73 },
              { group: 'Tom', name: 'Maple 12 Tom RimShot', note: 74 },
              { group: 'Tom', name: 'Maple 12 Tom RimClick', note: 75 },
              { group: 'Tom', name: 'Maple 14 Tom Hit', note: 76 },
              { group: 'Tom', name: 'Maple 14 Tom RimShot', note: 77 },
              { group: 'Tom', name: 'Maple 14 Tom RimClick', note: 78 },
              { group: 'Tom', name: 'Maple 16 Tom Hit', note: 79 },
              { group: 'Tom', name: 'Maple 16 Tom RimShot', note: 80 },
              { group: 'Tom', name: 'Maple 16 Tom RimClick', note: 81 },
              { group: 'Hi-hat', name: 'Dark Jazz HH Pedal', note: 82 },
              { group: 'Hi-hat', name: 'Dark Jazz HH Closed Tip', note: 83 },
              { group: 'Hi-hat', name: 'Dark Jazz HH Quarter Shoulder', note: 84 },
              { group: 'Hi-hat', name: 'Dark Jazz HH Half Shoulder', note: 85 },
              { group: 'Hi-hat', name: 'Dark Jazz HH 3Quarter Shoulder', note: 86 },
              { group: 'Hi-hat', name: 'Dark Jazz HH Open Shoulder', note: 87 },
              { group: 'Hi-hat', name: 'Bright HH Pedal', note: 88 },
              { group: 'Hi-hat', name: 'Bright HH Closed Tip', note: 89 },
              { group: 'Hi-hat', name: 'Bright HH Quarter Shoulder', note: 90 },
              { group: 'Hi-hat', name: 'Bright HH Half Shoulder', note: 91 },
              { group: 'Hi-hat', name: 'Bright HH 3Quarter Shoulder', note: 92 },
              { group: 'Hi-hat', name: 'Bright HH Open Shoulder', note: 93 },
              { group: 'Ride', name: 'TurkishJazz Ride 22 Sizzle Bell', note: 94 },
              { group: 'Ride', name: 'TurkishJazz Ride 22 Sizzle Bow', note: 95 },
              { group: 'Ride', name: 'TurkishJazz Ride 22 Sizzle Edge', note: 96 },
              { group: 'Ride', name: 'TurkishWide Ride 20 Bell', note: 97 },
              { group: 'Ride', name: 'TurkishWide Ride 20 Bow', note: 98 },
              { group: 'Ride', name: 'TurkishWide Ride 20 Edge', note: 99 },
              { group: 'Ride', name: 'TurkishMaster Vintage Ride 22 Bell', note: 100 },
              { group: 'Ride', name: 'TurkishMaster Vintage Ride 22 Bow', note: 101 },
              { group: 'Ride', name: 'TurkishMaster Vintage Ride 22 Edge', note: 102 },
              { group: 'Cymbal', name: 'TurkishTraditional Crash Ride 18 Bell', note: 103 },
              { group: 'Cymbal', name: 'TurkishTraditional Crash Ride 18 Bow', note: 104 },
              { group: 'Cymbal', name: 'TurkishTraditional Crash Ride 18 Edge', note: 105 },
              { group: 'Cymbal', name: 'TurkishClassic Crash 16 Bow', note: 106 },
              { group: 'Cymbal', name: 'TurkishClassic Crash 16 Edge', note: 107 },
              { group: 'Cymbal', name: 'TurkishSplash 10 Edge', note: 108 },
              { group: 'Cymbal', name: 'Orchestral 20 Sus', note: 109 },
              { group: 'Cymbal', name: 'Old Wuhan 20 Bell', note: 110 },
              { group: 'Cymbal', name: 'Old Wuhan 20 Bow', note: 111 },
              { group: 'Cymbal', name: 'Old Wuhan 20 Edge', note: 112 },
              { group: 'Percussion', name: 'Timbale High Head', note: 113 },
              { group: 'Percussion', name: 'Timbale Low Head', note: 114 },
              { group: 'Percussion', name: 'Wood Block_1 High', note: 115 },
              { group: 'Percussion', name: 'Wood Block_2 Low', note: 116 },
              { group: 'Percussion', name: 'Egg Shaker', note: 117 },
              { group: 'Percussion', name: 'Can Shaker', note: 118 },
              { group: 'Percussion', name: 'LP Cowbell Tip', note: 119 },
              { group: 'Percussion', name: 'LP Cowbell Shoulder', note: 120 },
              { group: 'Percussion', name: 'Agogo High', note: 121 },
              { group: 'Percussion', name: 'Agogo Low', note: 122 },
              { group: 'Percussion', name: 'Finger Snap', note: 123 },
              { group: 'Percussion', name: 'Finger Snaps', note: 124 },
              { group: 'Percussion', name: 'Finger Cymbal', note: 125 },
              { group: 'Percussion', name: 'Gong', note: 126 },
            ],
          },
        },
      })
    })
  })

  describe('loadMapping 2', () => {
    beforeAll(() => {
      store = storeFactory({ mapping }, false, true)
      store.dispatch(selectMapping('stompblock', 0))
    })

    it('should succeed', () => {
      expect(store.getState().mapping).toEqual({
        ...mapping,
        banks: {
          0: {
            name: 'stompblock',
            entries: [
              { group: 'Percussion', name: 'Tumba Thump', note: 1 },
              { group: 'Percussion', name: 'Tumba Open', note: 2 },
              { group: 'Percussion', name: 'Quinto Slap', note: 3 },
              { group: 'Percussion', name: 'Quinto Hit', note: 4 },
              { group: 'Percussion', name: 'Cajon High', note: 5 },
              { group: 'Percussion', name: 'Cajon High Slap', note: 6 },
              { group: 'Percussion', name: 'Cajon Mid', note: 7 },
              { group: 'Percussion', name: 'Cajon Low', note: 8 },
              { group: 'Percussion', name: 'Clave', note: 9 },
              { group: 'Percussion', name: 'Djembe Open', note: 10 },
              { group: 'Percussion', name: 'Djembe Mute', note: 11 },
              { group: 'Percussion', name: 'Djembe Slap', note: 12 },
              { group: 'Percussion', name: 'Dynamic Bongo High', note: 13 },
              { group: 'Percussion', name: 'Dynamic Bongo Low', note: 14 },
              { group: 'Percussion', name: 'Darbuka Center', note: 15 },
              { group: 'Percussion', name: 'Darbuka Rim', note: 16 },
              { group: 'Percussion', name: 'Tambourine with Stick', note: 17 },
              { group: 'Percussion', name: 'Udu Strike', note: 18 },
              { group: 'Percussion', name: 'Udu Scoop', note: 19 },
              { group: 'Percussion', name: 'Doumbek Center', note: 20 },
              { group: 'Percussion', name: 'Doumbek Rim', note: 21 },
              { group: 'Kick', name: 'Bop Kick', note: 22 },
              { group: 'Kick', name: 'General Kick', note: 23 },
              { group: 'Kick', name: 'EKick', note: 24 },
              { group: 'Kick', name: 'Funk Kick', note: 25 },
              { group: 'Kick', name: 'Jazz Kick', note: 26 },
              { group: 'Kick', name: 'Metal Kick', note: 27 },
              { group: 'Kick', name: 'Rock Kick', note: 28 },
              { group: 'Kick', name: 'Thor Kick', note: 29 },
              { group: 'Snare', name: 'Thor Snare Head', note: 30 },
              { group: 'Snare', name: 'Thor Snare X', note: 31 },
              { group: 'Snare', name: 'Thor Snare Drag', note: 32 },
              { group: 'Snare', name: 'Reggae Snare Head', note: 33 },
              { group: 'Snare', name: 'Reggae Snare X', note: 34 },
              { group: 'Snare', name: 'Reggae Snare Drag', note: 35 },
              { group: 'Snare', name: 'Reggae Snare Off', note: 36 },
              { group: 'Snare', name: 'Modern Snare Head', note: 37 },
              { group: 'Snare', name: 'Modern Snare Drag', note: 38 },
              { group: 'Snare', name: 'ESnare', note: 39 },
              { group: 'Snare', name: 'Clap', note: 40 },
              { group: 'Snare', name: 'Group Claps', note: 41 },
              { group: 'Snare', name: 'Blues Snare Head', note: 42 },
              { group: 'Snare', name: 'Blues Snare X', note: 43 },
              { group: 'Snare', name: 'Blues Snare Drag', note: 44 },
              { group: 'Snare', name: 'Latin Snare Head', note: 45 },
              { group: 'Snare', name: 'Latin Snare X', note: 46 },
              { group: 'Snare', name: 'Latin Snare Drag', note: 47 },
              { group: 'Snare', name: 'Soul Snare Head', note: 48 },
              { group: 'Snare', name: 'Soul Snare X', note: 49 },
              { group: 'Snare', name: 'Soul Drag', note: 50 },
              { group: 'Snare', name: 'Brush Snare Head', note: 51 },
              { group: 'Snare', name: 'Brush Snare Tap', note: 52 },
              { group: 'Snare', name: 'Brush Snare Swirl', note: 53 },
              { group: 'Snare', name: 'HD Snare Head', note: 54 },
              { group: 'Snare', name: 'HD Snare Alt', note: 55 },
              { group: 'Snare', name: 'HD Snare Rimshot', note: 56 },
              { group: 'Snare', name: 'HD Snare X', note: 57 },
              { group: 'Snare', name: 'HD Snare Off', note: 58 },
              { group: 'Snare', name: 'HD Snare Off Rimshot', note: 59 },
              { group: 'Tom', name: 'Jazz Tom 1', note: 60 },
              { group: 'Tom', name: 'Jazz Tom 2', note: 61 },
              { group: 'Tom', name: 'Jazz Tom 3', note: 62 },
              { group: 'Tom', name: 'Jazz Tom 4', note: 63 },
              { group: 'Tom', name: 'Gated Tom 1', note: 64 },
              { group: 'Tom', name: 'Gated Tom 2', note: 65 },
              { group: 'Tom', name: 'Gated Tom 3', note: 66 },
              { group: 'Tom', name: 'Gated Tom 4', note: 67 },
              { group: 'Tom', name: '80s Tom High', note: 68 },
              { group: 'Tom', name: '80s Tom Low', note: 69 },
              { group: 'Tom', name: 'Rock Tom 1', note: 70 },
              { group: 'Tom', name: 'Rock Tom 2', note: 71 },
              { group: 'Tom', name: 'Rock Tom 3', note: 72 },
              { group: 'Tom', name: 'Rock Tom 4', note: 73 },
              { group: 'Tom', name: 'ETom High', note: 74 },
              { group: 'Tom', name: 'ETom Low', note: 75 },
              { group: 'Tom', name: '70s Tom 1', note: 76 },
              { group: 'Tom', name: '70s Tom 2', note: 77 },
              { group: 'Tom', name: '70s Tom 3', note: 78 },
              { group: 'Tom', name: 'Brush Tom 1', note: 79 },
              { group: 'Tom', name: 'Brush Tom 2', note: 80 },
              { group: 'Hi-hat', name: 'EHat', note: 81 },
              { group: 'Hi-hat', name: 'Dark Hat Pedal', note: 82 },
              { group: 'Hi-hat', name: 'Dark Hat Closed', note: 83 },
              { group: 'Hi-hat', name: 'Dark Hat 1/4', note: 84 },
              { group: 'Hi-hat', name: 'Dark Hat 1/2', note: 85 },
              { group: 'Hi-hat', name: 'Dark Hat 3/4', note: 86 },
              { group: 'Hi-hat', name: 'Dark Hat Open', note: 87 },
              { group: 'Hi-hat', name: 'Bright Hat Pedal', note: 88 },
              { group: 'Hi-hat', name: 'Bright Hat Closed', note: 89 },
              { group: 'Hi-hat', name: 'Bright Hat 1/4', note: 90 },
              { group: 'Hi-hat', name: 'Bright Hat 1/2', note: 91 },
              { group: 'Hi-hat', name: 'Bright Hat 3/4', note: 92 },
              { group: 'Hi-hat', name: 'Bright Hat Open', note: 93 },
              { group: 'Ride', name: 'Sizzle Ride Bell', note: 94 },
              { group: 'Ride', name: 'Sizzle Ride Bow', note: 95 },
              { group: 'Ride', name: 'Sizzle Ride Edge', note: 96 },
              { group: 'Ride', name: 'Jazz Ride Bow', note: 97 },
              { group: 'Ride', name: 'Jazz Ride Bell', note: 98 },
              { group: 'Ride', name: 'Mega Ride Bow', note: 99 },
              { group: 'Ride', name: 'Mega Ride Bell', note: 100 },
              { group: 'Cymbal', name: '16 Crash Choke', note: 101 },
              { group: 'Cymbal', name: '11 Splash', note: 102 },
              { group: 'Cymbal', name: '12 Splash', note: 103 },
              { group: 'Cymbal', name: '16 Crash', note: 104 },
              { group: 'Cymbal', name: '18 Crash', note: 105 },
              { group: 'Cymbal', name: 'Bright China', note: 106 },
              { group: 'Cymbal', name: 'China Edge', note: 107 },
              { group: 'Cymbal', name: 'Brush Ride', note: 108 },
              { group: 'Cymbal', name: '18 Brush Sizzle', note: 109 },
              { group: 'Cymbal', name: '16 Brush', note: 110 },
              { group: 'Cymbal', name: '18 Dark Choke', note: 111 },
              { group: 'Cymbal', name: '16 Dark Choke', note: 112 },
              { group: 'Percussion', name: 'Dynamic Timbale High', note: 113 },
              { group: 'Percussion', name: 'Dynamic Timbale Low', note: 114 },
              { group: 'Percussion', name: 'Block 1', note: 115 },
              { group: 'Percussion', name: 'Block 2', note: 116 },
              { group: 'Percussion', name: 'Short Shaker', note: 117 },
              { group: 'Percussion', name: 'Long Shaker', note: 118 },
              { group: 'Percussion', name: 'Dynamic Cowbell 1', note: 119 },
              { group: 'Percussion', name: 'Dynamic Cowbell 2', note: 120 },
              { group: 'Percussion', name: 'Agogo High', note: 121 },
              { group: 'Percussion', name: 'Agogo Low', note: 122 },
              { group: 'Percussion', name: 'Finger Snap', note: 123 },
              { group: 'Percussion', name: 'Finger Snaps', note: 124 },
              { group: 'Percussion', name: 'Finger Cymbal', note: 125 },
              { group: 'Percussion', name: 'Gong', note: 126 },
            ],
          },
          1: {
            name: '',
            entries: [],
          },
        },
      })
    })
  })
})
