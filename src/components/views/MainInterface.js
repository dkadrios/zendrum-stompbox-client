import React from 'react'
import NoStompblockFound from '../NoStompblockFound'
import NotResponding from '../NotResponding'
import MidiSecurity from '../MidiSecurity'
import PrimaryNav from '../PrimaryNav'
import InfoPanel from '../InfoPanel'

const MainInterface = props => (
  <div>
    <PrimaryNav {...props} />
    <MidiSecurity />
    <NotResponding />
    <NoStompblockFound />
    <InfoPanel />
  </div>
)

export default MainInterface
