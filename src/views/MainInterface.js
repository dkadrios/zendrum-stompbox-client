import React from 'react'
import NoStompblockFound from './NoStompblockFound'
import NotResponding from './NotResponding'
import MidiSecurity from './MidiSecurity'
import VersionNotSupported from './VersionNotSupported'
import PrimaryNav from './PrimaryNav'
import InfoPanel from './InfoPanel'

const MainInterface = () => (
  <div>
    <PrimaryNav />
    <MidiSecurity />
    <NotResponding />
    <VersionNotSupported />
    <NoStompblockFound />
    <InfoPanel />
  </div>
)

export default MainInterface
