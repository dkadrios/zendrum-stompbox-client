import Cymbals from './Cymbals.svg';
import Hats from './Hats.svg';
import Kicks from './Kicks.svg';
import Perc from './Perc.svg';
import Rides from './Rides.svg';
import Snares from './Snares.svg';
import Toms from './Toms.svg';

export default (name) => {
  let result;
  switch (name) {
    case 'Cymbals': result = Cymbals; break;
    case 'Hats': result = Hats; break;
    case 'Kicks': result = Kicks; break;
    case 'Perc': result = Perc; break;
    case 'Rides': result = Rides; break;
    case 'Snares': result = Snares; break;
    case 'Toms': result = Toms; break;
    default: result = null; break;
  }
  return result ? result() : null;
};
