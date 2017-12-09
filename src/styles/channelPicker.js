/**
 * Here we extend the inline styling of selectField.
 *
 * Note that there is also a channelPicker.scss file that changes
 * aspects that we can't control through inline style alone.
 */

import selectField from './selectField'

export default {
  ...selectField,

  listStyle: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
  },

  menuItemStyle: {
    minWidth: 40,
    maxWidth: 40,
    textAlign: 'center',
    padding: '0px !important',
  },
}
