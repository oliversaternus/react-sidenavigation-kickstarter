import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/MenuRounded';
import ReactLogo from './ReactLogo';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    position: 'absolute',
    right: '12px',
    color: '#ffffff'
  },
  homeButton: {
    marginRight: '12px',
    color: '#ffffff'
  },
  title: {
    verticalAlign: 'middle'
  },
  icon: {
    transform: 'scale(1.3)',
    fill: '#ffffff'
  },
  toolBar: {
    paddingLeft: '12px'
  }
});

function NavAppBar(props) {
  const { classes, menuClick, homeClick } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton className={classes.homeButton} onClick={homeClick}>
            <ReactLogo/>
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            {' React Kickstarter'}
          </Typography>
          <IconButton className={classes.menuButton} onClick={menuClick}>
            <Menu className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(NavAppBar);
