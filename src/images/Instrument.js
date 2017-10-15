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
    case 'Cymbals':
      result = Cymbals
      break
    case 'Hats':
      result = Hats
      break
    case 'Kicks':
      result = Kicks
      break
    case 'Perc':
      result = Perc
      break
    case 'Rides':
      result = Rides
      break
    case 'Snares':
      result = Snares
      break
    case 'Toms':
      result = Toms
      break
    default:
      result = null
      break
  }
  return result ? result() : null
}
