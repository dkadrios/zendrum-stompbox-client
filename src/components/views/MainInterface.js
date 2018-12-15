import React from 'react'
import NoStompblockFound from '../NoStompblockFound'
import NotResponding from '../NotResponding'
import MidiSecurity from '../MidiSecurity'
import PrimaryNav from '../PrimaryNav'
import InfoPanel from '../InfoPanel'

const MainInterface = () => (
  <>
    <PrimaryNav />
    <MidiSecurity />
    <NotResponding />
    <NoStompblockFound />
    <InfoPanel />
  </>
)

export default MainInterface
