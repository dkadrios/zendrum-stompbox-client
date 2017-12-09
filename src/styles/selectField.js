/**
 * material-ui components use inline styling.
 *
 * Merge these props into instances of SelectField to apply our
 * custom look.
 */

export default {
  style: {
    width: '179px',
    backgroundColor: '#eee',
    borderRadius: '5px',
    padding: 0,
    height: '25px',
    marginBottom: '8px',
  },

  selectedMenuItemStyle: {
    backgroundColor: '#b10000',
    color: 'white',
    fontWeight: 'bold',
  },

  menuStyle: {
    // border: '1px solid black',
  },

  labelStyle: {
    color: 'black',
    height: '25px',
    lineHeight: '25px',
    paddingTop: '5px',
    paddingLeft: '5px',
  },

  underlineStyle: {
    display: 'none',
  },

  dropDownMenuProps: {
    iconStyle: {
      top: -12,
      right: -10,
    },
  },
}
