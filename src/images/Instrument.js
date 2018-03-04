import Aux from './Aux.svg'
import Cymbals from './Cymbals.svg.js'
import Hats from './Hats.svg.js'
import Kicks from './Kicks.svg.js'
import Perc from './Perc.svg.js'
import Rides from './Rides.svg.js'
import Snares from './Snares.svg.js'
import Toms from './Toms.svg.js'
import Unknown from './Unknown.svg'

export default (name) => {
  let result
  switch (name) {
    case 'Aux':
      result = Aux
      break
    case 'Cymbal':
    case 'Cymbals':
      result = Cymbals
      break
    case 'Hi-hat':
    case 'Hats':
      result = Hats
      break
    case 'Kick':
    case 'Kicks':
      result = Kicks
      break
    case 'Percussion':
    case 'Perc':
      result = Perc
      break
    case 'Ride':
    case 'Rides':
      result = Rides
      break
    case 'Snare':
    case 'Snares':
      result = Snares
      break
    case 'Tom':
    case 'Toms':
      result = Toms
      break
    default:
      result = Unknown
      break
  }

  return result()
}
