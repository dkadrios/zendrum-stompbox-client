import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, AppBar, Toolbar, SvgIcon, Typography } from '@material-ui/core'
import UserInfo from './UserInfo'
import ZendrumLogo from '../images/ZendrumLogo.svg'
import AdImage from '../images/try-restomp.png'

const styles = {
  title: {
    flex: 1,
    fontFamily: 'Armalite-Rifle',
    fontSize: '42px',
    fontWeight: 'normal',
    marginLeft: '4px',
  },
  icon: {
    width: 45,
    height: 45,
  },
  toolbar: {
    paddingLeft: '8px',
    background: 'black',
  },
}

const TopBar = ({ classes }) => (
  <AppBar position="static">
    <Toolbar className={classes.toolbar}>
      <SvgIcon className={classes.icon}>
        <ZendrumLogo />
      </SvgIcon>
      <Typography
        type="title"
        className={classes.title}
      >
        STOMPBLOCK
      </Typography>
      <div style={{ marginRight: 60 }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://zendrumstudio.com/restomp"
        >
          <img
            src={AdImage}
            alt="Try Restomp today!"
            width="260"
            height="44"
          />
        </a>
      </div>
      <div>
        <UserInfo />
      </div>
    </Toolbar>
  </AppBar>
)

TopBar.propTypes = { classes: PropTypes.object.isRequired }

export default withStyles(styles)(TopBar)
