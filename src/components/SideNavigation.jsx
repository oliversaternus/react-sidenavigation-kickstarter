import React from "react";
import { observer, inject } from 'mobx-react';
import { observable, action } from "mobx";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import classNames from 'classnames';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const links = [
    {
        name: 'Home',
        location: '/'
    },
    {
        name: 'page1',
        location: '/page1'
    },
    {
        name: 'page2',
        location: '/page2'
    }
];

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
    },
    content: {
        width: '100%',
        height: '100%',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0
    },
    shift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#404040'
    },
    clearIcon: {
        fill: '#ffffff'
    }
});

@withStyles(styles)
@withRouter
@inject('sizeStore')
@observer
class SideNavigation extends React.Component {
    @observable dialogOpen = true;

    @action setDialogOpen = (value) => this.dialogOpen = value;

    menuButtonPress = () => {
        this.setDialogOpen(!this.dialogOpen);
    }

    hideDialog = async () => {
        this.setDialogOpen(false);
    }

    homeButtonPress = () => {
        this.goTo('/');
    }

    goTo(path) {
        const { history, location } = this.props;
        this.hideDialog();
        if (location.pathname !== path) {
            history.push(path);
        }
    }

    renderMobileNavigation = () => {
        const { classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={!!this.dialogOpen}
                onClose={() => this.setDialogOpen(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContent}>
                    <IconButton onClick={() => this.setDialogOpen(false)}>
                        <ClearIcon className={classes.clearIcon} />
                    </IconButton>
                </div>
            </Drawer>
        );
    };

    renderSideNavigation = () => {
        const { classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={true}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContent}>

                </div>
            </Drawer>
        );
    };

    render() {
        const { classes, children, sizeStore } = this.props;
        const isMobile = sizeStore.width < 800;
        return (
            <div className={classes.root}>
                {isMobile ? this.renderMobileNavigation() : this.renderSideNavigation()}
                <div className={!isMobile ? classes.shift : classes.content}>
                    {children}
                </div>
            </div>
        );
    }
}

export default SideNavigation;
