import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, AppBar, Toolbar, SvgIcon, Typography } from '@material-ui/core'
import UserInfo from './UserInfo'
import ZendrumLogo from '../images/ZendrumLogo.svg.js'
import RestompAd from './RestompAd'

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
        color="inherit"
        className={classes.title}
      >
        STOMPBLOCK
      </Typography>
      <RestompAd />
      <div>
        <UserInfo />
      </div>
    </Toolbar>
  </AppBar>
)

TopBar.propTypes = { classes: PropTypes.object.isRequired }

export default withStyles(styles)(TopBar)
