import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-rangeslider'
import ChannelPicker from '../pickers/ChannelPicker'
import ToggleSwitch from '../HOC/ToggleSwitch'
import Tooltipped from '../HOC/Tooltipped'
import { settingsShape } from '../../reducers/settings'
import styles from '../../styles/settings'
import { rangeSlider } from '../../styles/third-party/react-rangeslider'

const varianceLabels = {
  0: 'OFF',
  1: '1',
  2: '2',
  3: '3',
  4: 'MAX',
}
const volumeLabels = {
  1: 'Cliff',
  2: '2',
  3: '3',
  4: 'Flat',
  5: '5',
  6: 'Compressed',
}

const MidiSettings = ({
  settings: { channelA, channelB, velocityVariance, roundRobinEnabled, volumeCurve, hasSoundBankSupport },
  changeChannelA,
  changeChannelB,
  changeVelocityVariance,
  changeRoundRobinEnabled,
  changeVolumeCurve,
}) => (
  <div className={styles.midiCont}>
    <h2>MIDI</h2>

    <section>
      {hasSoundBankSupport ? (
        <div className={styles.bank}>
          <article>
            <summary>Bank A</summary>
            <ChannelPicker
              channel={channelA}
              onChange={changeChannelA}
            />
          </article>
          <article>
            <summary>Bank B</summary>
            <ChannelPicker
              channel={channelB}
              onChange={changeChannelB}
            />
          </article>
        </div>
      ) : (
        <article>
          <summary>Channel</summary>
          <ChannelPicker
            channel={channelA}
            onChange={changeChannelA}
          />
        </article>
      )}

      <div className={styles.sliderCont}>
        <Tooltipped tooltip="Controls how steeply volume drops off at lower velocities">
          <p>Volume Curve (default is Flat)</p>
          <Slider
            className={rangeSlider}
            step={1}
            value={volumeCurve}
            min={1}
            max={6}
            labels={volumeLabels}
            onChange={changeVolumeCurve}
          />
        </Tooltipped>
      </div>
      <div className={styles.sliderCont}>
        <Tooltipped tooltip="Introduces an amount of randomness into your velocity performance">
          <p>Velocity variance (default is OFF)</p>
          <Slider
            className={rangeSlider}
            step={1}
            value={velocityVariance}
            min={0}
            max={4}
            labels={varianceLabels}
            onChange={changeVelocityVariance}
          />
        </Tooltipped>
      </div>
      <div>
        <Tooltipped tooltip="Cycles through adjacent sample layers to introduce variation">
          <ToggleSwitch
            checked={roundRobinEnabled}
            feature="anti-machine gunning"
            handler={changeRoundRobinEnabled}
          />
        </Tooltipped>
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
  changeVolumeCurve: PropTypes.func.isRequired,
}

export default MidiSettings
