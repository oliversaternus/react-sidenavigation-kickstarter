import React from "react";
import { observer, inject } from 'mobx-react';
import { observable, action } from "mobx";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import ReactLogo from './ReactLogo';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';

const links = {
    home: [
        {
            name: 'Start',
            location: '/'
        },
        {
            name: 'Home 1',
            location: '/home1'
        },
        {
            name: 'Home 2',
            location: '/home2'
        }
    ],
    settings: [
        {
            name: 'Account',
            location: '/settings/account'
        },
        {
            name: 'Company',
            location: '/settings/company'
        },
        {
            name: 'App',
            location: '/settings/app'
        }
    ]
};

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100vh',
        position: 'relative',
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
        width: drawerWidth,
        backgroundColor: 'transparent'
    },
    drawerContent: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    closeButton: {
        position: 'absolute',
        top: 4,
        right: 4
    },
    clearIcon: {
        fill: '#ffffff'
    },
    navigationContainer: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    navigationMenu: {
        width: 56,
        height: '100%',
        backgroundColor: '#202020',
        position: 'absolute',
        top: 0,
        left: 0
    },
    navMenuLogo: {
        width: '100%',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navMenuItem: {
        width: '100%',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.175s linear',
        '&:hover': {
            backgroundColor: '#303030'
        }
    },
    navMenuIcon: {
        fill: '#707070',
        height: 28,
        width: 28,
        transition: 'fill 0.1s linear'
    },
    navigationSubMenu: {
        width: 184,
        height: '100%',
        backgroundColor: '#404040',
        position: 'absolute',
        top: 0,
        left: 56
    },
    navSubMenuTitle: {
        width: 'calc(100% - 24px)',
        height: 56,
        borderBottom: '2px solid #202020',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: '#b0b0b0',
        fontFamily: 'sans-serif',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 24
    },
    navSubMenuItem: {
        width: 'calc(100% - 24px)',
        color: '#b0b0b0',
        fontFamily: 'sans-serif',
        fontSize: 16,
        paddingLeft: 24,
        paddingTop: 16,
        paddingBottom: 16,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#4b4b4b'
        }
    },
    menuButton: {
        position: 'fixed',
        top: 8,
        left: 8
    },
    menuIcon: {
        fill: '#202020'
    },
    selected: {
        fill: '#ffffff',
        color: '#ffffff'
    }
});

@withStyles(styles)
@withRouter
@inject('sizeStore')
@observer
class SideNavigation extends React.Component {
    @observable dialogOpen = false;
    @observable selectedTab;

    @action setDialogOpen = (value) => this.dialogOpen = value;
    @action setSelectedTab = (value) => this.selectedTab = value;

    constructor(props) {
        super(props);
        let tab = props.location.pathname.split('/')[1];
        if (!links[tab]) {
            tab = 'home';
        }
        this.selectedTab = tab;
    }

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

    renderDrawerContent = () => {
        const { classes, sizeStore, location } = this.props;
        const isMobile = sizeStore.width < 800;
        return (
            <div className={classes.drawerContent}>
                <div className={classes.navigationMenu}>
                    <div className={classes.navMenuLogo}>
                        <ReactLogo height={36} width={36} fill={'#4676bf'} />
                    </div>
                    <div className={classes.navMenuItem} onClick={() => this.setSelectedTab('home')}>
                        <HomeIcon className={classNames(classes.navMenuIcon,
                            this.selectedTab === 'home' ? classes.selected : null)} />
                    </div>
                    <div className={classes.navMenuItem} onClick={() => this.setSelectedTab('settings')}>
                        <SettingsIcon className={classNames(classes.navMenuIcon,
                            this.selectedTab === 'settings' ? classes.selected : null)} />
                    </div>
                </div>
                <div className={classes.navigationSubMenu}>
                    <div className={classes.navSubMenuTitle}>
                        {this.selectedTab.toUpperCase()}
                    </div>
                    {links[this.selectedTab].map(link => {
                        const isSelected = location.pathname === link.location;
                        return (
                            <div className={classNames(
                                classes.navSubMenuItem, isSelected ?
                                    classes.selected :
                                    null)}
                                onClick={() => this.goTo(link.location)}
                                key={link.name}
                                style={isSelected ? { backgroundColor: '#565656' } : null}>
                                {link.name}
                            </div>
                        );
                    })}
                </div>
                {isMobile &&
                    <IconButton className={classes.closeButton} onClick={() => this.setDialogOpen(false)}>
                        <ClearIcon className={classes.clearIcon} />
                    </IconButton>}
            </div>
        );
    };

    render() {
        const { classes, children, sizeStore } = this.props;
        const isMobile = sizeStore.width < 800;
        return (
            <div className={classes.root}>
                {isMobile &&
                    <IconButton className={classes.menuButton}>
                        <MenuIcon className={classes.menuIcon} onClick={() => this.setDialogOpen(true)} />
                    </IconButton>}
                <Drawer
                    className={classes.drawer}
                    variant={isMobile ? null : "persistent"}
                    anchor="left"
                    open={isMobile ? !!this.dialogOpen : true}
                    onClose={isMobile ? () => this.setDialogOpen(false) : null}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {this.renderDrawerContent()}
                </Drawer>
                <div className={!isMobile ? classes.shift : classes.content}>
                    {children}
                </div>
            </div>
        );
    }
}

export default SideNavigation;
