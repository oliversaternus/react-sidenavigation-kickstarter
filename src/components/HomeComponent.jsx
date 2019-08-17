import React from "react";
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Home from '@material-ui/icons/HomeRounded';

const styles = theme => ({
    root: {
        flex: '1 1 auto',
        backgroundColor: theme.palette.secondary.main
    },
    icon: {
        fill: theme.palette.primary.light,
        height: '200px',
        width: '200px'
    },
    iconContainer:{
        width: '200px',
        margin: 'auto'
    },
    text:{
        color: theme.palette.primary.light
    }
});

@withStyles(styles)
@withRouter
@inject('dataStore', 'notificationStore')
@observer
class HomeComponent extends React.Component {
    render() {
        const { classes, notificationStore } = this.props;
        return (
            <div className={classes.root}>
                <div style={{ width: '100%', height: '60px' }}></div>
                <div className={classes.iconContainer}>
                    <Home className={classes.icon} onClick={() => notificationStore.openNotification('info', 'It\'s alright')}/>
                </div>
                <Typography className={classes.text} variant="h5" align="center">Home</Typography>
            </div>
        );
    }
}
export default HomeComponent;
