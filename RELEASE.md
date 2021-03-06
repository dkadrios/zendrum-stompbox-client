# STOMPBLOCK Client Interface

| Date       | Version | Notes                                                                                                                                                          |
| ---------- | :-----: | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2019-08-10 |   5.7   | Adding +/- trim buttons<br>Mute groups report correct number used<br>Polylocks screen could not scroll                                                         |
| 2019-08-09 |   5.6   | Touch events for knobs were setting trim values to zero                                                                                                        |
| 2018-12-15 |   5.5   | Correcting issues that appeared in Chrome 71                                                                                                                   |
| 2018-05-04 |   5.4   | Warning user if the browser does not support Web MIDI                                                                                                          |
| 2018-04-29 |   5.3   | Chrome 66 chokes when timestamps are provided for MIDI Events<br>Reconciling the different group names used by ZenEdit and Restomp                             |
| 2018-04-16 |   5.2   | Cross promoting Restomp                                                                                                                                        |
| 2018-04-04 |   5.1   | Corrected verbiage when in reset mode                                                                                                                          |
| 2018-04-01 |   5.0   | Corrected issue when importing mappings with unnamed instruments                                                                                               |
| 2018-03-14 |   4.9   | Added bank BETA tester                                                                                                                                         |
| 2018-03-04 |   4.8   | Support for importing ZenEdit mappings<br>Fixing issue where note labels that contained symbols were being truncated                                           |
| 2018-01-09 |   4.7   | MIDI Chase was utilizing old bank indexes. Making LEDs darker when off so they stand out better when on                                                        |
| 2017-12-29 |   4.6   | Clicking the note title would play the sample from the opposite bank                                                                                           |
| 2017-12-27 |   4.5   | Updating packages -- there were some breaking changes in the material-ui beta that was causing a problem in production                                         |
| 2017-12-27 |   4.4   | Changes to mute group bank were not being applied to hardware                                                                                                  |
| 2017-12-22 |   4.3   | Rolling out bank feature to BETA testers                                                                                                                       |
| 2017-12-19 |   4.2   | Upgraded core MIDI library. Displaying STOMPBLOCK's internal state                                                                                             |
| 2017-12-18 |   4.1   | Major overhaul and feature dump in preparation for the rollout of our version 3.0 firmware                                                                     |
| 2017-12-08 |   3.4   | Group filter still had the old map values<br>Legacy units cannot accept the extra bank byte                                                                    |
| 2017-12-08 |   3.3   | Start recording firmware version in preparation of the 3.x rollout                                                                                             |
| 2017-12-08 |   3.2   | Toolbar settings persist in session<br>Support for second sound bank<br>Support for new hardware features (channels, vel. variance, etc)<br>MIDI chase feature |
| 2017-12-03 |   3.1   | Settings page would not show scrollbar                                                                                                                         |
| 2017-10-20 |   3.0   | Major overhaul; Support 3rd party cards                                                                                                                        |
| 2017-09-11 |   2.4   | Allowing ANVIL 2.4 to connect                                                                                                                                  |
| 2017-09-08 |   2.3   | UI tweaks                                                                                                                                                      |
| 2017-08-28 |   2.2   | Enabling user registration                                                                                                                                     |
| 2017-08-22 |   2.1   | Capture device serial numbers                                                                                                                                  |
| 2017-08-15 |   2.0   | Completely new skin                                                                                                                                            |
| 2017-08-15 |   1.6   | Sticky header and footer                                                                                                                                       |
| 2017-08-15 |   1.5   | Support ANVIL 2.4 (SysEx dumps)                                                                                                                                |
| 2017-08-13 |   1.4   | Adopting FLOW                                                                                                                                                  |
| 2017-08-06 |   1.3   | Configurable mute groups                                                                                                                                       |
| 2017-07-30 |   1.2   | Keyboard editing support                                                                                                                                       |
| 2017-07-29 |   1.1   | Added MIDI activity lights                                                                                                                                     |
| 2017-07-24 |   1.0   | Initial public release                                                                                                                                         |
