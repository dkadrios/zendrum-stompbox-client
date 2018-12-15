import React from 'react'
// import SnowStorm from 'react-snowstorm'
import { getMonth, getDate } from 'date-fns'

const active = () => {
  const month = getMonth(new Date()) + 1
  const date = getDate(new Date())

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
    {/* {active() && (
    <SnowStorm
      flakesMax={15}
      snowStick={false}
      followMouse={false}
      vMaxX={1}
      vMaxY={1}
      color="#ddd"
    />
    )} */}
  </div>
)

export default Snow
