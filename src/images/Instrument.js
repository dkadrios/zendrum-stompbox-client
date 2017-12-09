import Cymbals from './Cymbals.svg.js'
import Hats from './Hats.svg.js'
import Kicks from './Kicks.svg.js'
import Perc from './Perc.svg.js'
import Rides from './Rides.svg.js'
import Snares from './Snares.svg.js'
import Toms from './Toms.svg.js'

export default (name) => {
  let result
  switch (name) {
    case 'Cymbal':
      result = Cymbals
      break
    case 'Hi-hat':
      result = Hats
      break
    case 'Kick':
      result = Kicks
      break
    case 'Percussion':
      result = Perc
      break
    case 'Ride':
      result = Rides
      break
    case 'Snare':
      result = Snares
      break
    case 'Tom':
      result = Toms
      break
    default:
      result = null
      break
  }
  return result ? result() : null
}
