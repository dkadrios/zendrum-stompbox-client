import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-rangeslider'
import ChannelPicker from '../pickers/ChannelPicker'
import TS from '../HOC/ToggleSwitch'
import { settingsShape } from '../../reducers/settings'
import styles from '../../styles/settings'
import { rangeSlider } from '../../styles/third-party/react-rangeslider'

const labels = { 0: 'OFF', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: 'MAX' }

const MidiSettings = ({
  settings: { channelA, channelB, velocityVariance, roundRobinEnabled },
  changeChannelA,
  changeChannelB,
  changeVelocityVariance,
  changeRoundRobinEnabled,
}) => (
  <div className={styles.midiCont}>
    <h2>MIDI</h2>
    <section>
      <article>
        <summary>Bank A</summary>
        <ChannelPicker channel={channelA} onChange={changeChannelA} />
      </article>
      <article>
        <summary>Bank B</summary>
        <ChannelPicker channel={channelB} onChange={changeChannelB} />
      </article>
      <div className={styles.sliderCont}>
        <p>Velocity variance</p>
        <Slider
          className={rangeSlider}
          step={1}
          value={velocityVariance}
          min={0}
          max={8}
          labels={labels}
          onChange={changeVelocityVariance}
        />
      </div>
      <div>
        <TS
          checked={roundRobinEnabled}
          feature="anti-machine gunning"
          handler={changeRoundRobinEnabled}
        />
      </div>
    </section>
  </div>
)

MidiSettings.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
  changeChannelA: PropTypes.func.isRequired,
  changeChannelB: PropTypes.func.isRequired,
  changeVelocityVariance: PropTypes.func.isRequired,
  changeRoundRobinEnabled: PropTypes.func.isRequired,
}

export default MidiSettings
