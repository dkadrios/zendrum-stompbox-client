import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const BankButton = ({ bank, selectedBank, onClick }) => (
  <Button
    mini
    variant="contained"
    color={bank === selectedBank ? 'primary' : 'secondary'}
    onClick={() => onClick(bank)}
  >
    Bank {String.fromCharCode(65 + bank)}
  </Button>
)

BankButton.propTypes = {
  bank: PropTypes.number.isRequired,
  selectedBank: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default BankButton
