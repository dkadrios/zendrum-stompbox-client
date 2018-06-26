import React from 'react'
import styles from '../../styles/unsupportedBrowser'
import ChromeIcon from '../../images/Chrome.svg.js'
import OperaIcon from '../../images/Opera.svg.js'

const UnsupportedBrowser = () => (
  <div className={styles.outer}>
    <div className={styles.main}>
      <header>
        <a href="https://zendrumstudio.com">zendrumstudio.com</a>
        <a href="https://zendrumstudio.com/contact-us/">Contact Us</a>
      </header>
      <h1>Unsupported browser</h1>
      {navigator.userAgent}
      <p>
        This application makes use of bleeding edge web technologies in order to communicate with
        your Stompblock over MIDI and USB.
      </p>
      <p>At this time, only these browsers support this emerging web technology.</p>

      <footer>
        <section>
          <a href="https://www.google.com/chrome/browser/">
            <ChromeIcon width="50%" />
          </a>
          <a href="https://www.google.com/chrome/browser/">Google Chrome</a>
          <aside>Version 43+</aside>
        </section>
        <section>
          <a href="https://www.opera.com/download">
            <OperaIcon width="50%" viewBox="10 10 100 100" />
          </a>
          <a href="https://www.opera.com/download">Opera</a>
          <aside>Version 33+</aside>
        </section>
      </footer>
    </div>
  </div>
)

export default UnsupportedBrowser
