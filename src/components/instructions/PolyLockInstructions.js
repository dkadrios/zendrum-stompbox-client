/* eslint-disable react/no-unescaped-entities */

import React from 'react'
import Instructions from './Instructions'

const header =
  'Here you can define which notes if any should not be recycled by the polyphonic engine...'
const body = () => (
  <div>
    <p>Your STOMPBLOCK has a maximum polyphony of 14 voices.</p>
    <p>
      Once polyphony has maxed out, it will begin to recycle slots by muting individual notes based
      on an internal algorithm. This typically works well enough for basic drums and percussion,
      however samples with long tails, such as cymbals, can sound 'chopped off' and unrealistic.
    </p>
    <p>
      You can prevent this by marking up to 16 instruments that should never be cut short due to
      polyphony. This should be used strategically and sparingly since the overall polyphony level
      drops during the time these samples are playing. Good candidates for this feature are crash
      cymbals and open hi-hats.
    </p>
  </div>
)

const PolyLockInstructions = () => <div />
// <Instructions header={header} body={body()} />

export default PolyLockInstructions
