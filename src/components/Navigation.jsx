import React from "react";
import { observer, inject } from 'mobx-react';
import { observable, action } from "mobx";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import NavAppBar from './NavAppBar';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

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

const styles = theme => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexFlow: 'column'
    },
    appBarPlace: theme.mixins.toolbar,
    linkButton: {
        color: theme.palette.primary.contrastText
    },
    dialog: {
        padding: 0,
        backgroundColor: theme.palette.primary.main,
        width: 240,
        position: 'relative'
    },
    fullScreenDialog: {
        padding: 0,
        position: 'relative',
        backgroundColor: theme.palette.primary.main
    },
    clearButton: {
        position: 'absolute',
        right: 8,
        top: 8
    },
    clearIcon: {
        fill: theme.palette.primary.contrastText
    },
    dialogPaper: {
        backgroundColor: 'transparent'
    },
    dialogInner: {
        padding: 24,
        paddingBottom: 48,
        marginTop: 8,
        width: 'calc(100% - 48px)',
        maxWidth: 320,
        margin: 'auto'
    }
});

@withStyles(styles)
@withRouter
@inject('sizeStore')
@observer
class Navigation extends React.Component {
    @observable dialogOpen = false;

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

    render() {
        const { classes, children, sizeStore } = this.props;
        const fullScreen = sizeStore.width < 800;
        return (
            <div className={classes.root}>
                <NavAppBar menuClick={this.menuButtonPress} homeClick={this.homeButtonPress} />
                <div className={classes.appBarPlace} />
                {children}
                <Dialog
                    fullScreen={fullScreen}
                    TransitionComponent={Transition}
                    keepMounted
                    open={this.dialogOpen}
                    onClose={this.hideDialog}
                    classes={{ paper: classes.dialogPaper }}
                >
                    <DialogContent className={fullScreen ? classes.fullScreenDialog : classes.dialog}>
                        <IconButton onClick={this.hideDialog} className={classes.clearButton}><ClearIcon className={classes.clearIcon} /></IconButton>
                        <div className={classes.dialogInner}>
                            {links.map((link) => {
                                return (<Button fullWidth key={link.name} className={classes.linkButton} onClick={() => this.goTo(link.location)}>{link.name}</Button>);
                            })}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default Navigation;
