import React from 'react'
import moment from 'moment'
import SnowStorm from 'react-snowstorm'

const active = () => {
  const month = moment().get('month') + 1
  const date = moment().get('date')

  switch (month) {
    case 11:
      return date >= 24
    case 12:
      return true
    case 1:
      return date <= 4
    default:
      return false
  }
}

const Snow = () => (
  <div>
    {active() && (
      <SnowStorm
        flakesMax={15}
        snowStick={false}
        followMouse={false}
        vMaxX={1}
        vMaxY={1}
        color="#ddd"
      />
    )}
  </div>
)

export default Snow
