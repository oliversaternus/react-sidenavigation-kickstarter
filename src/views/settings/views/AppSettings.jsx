import React from "react";
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import ReactLogo from '../../../components/ReactLogo';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        flex: '1 1 auto',
        height: '100vh',
        backgroundColor: theme.palette.secondary.main
    },
    icon: {
        fill: theme.palette.primary.light,
        height: '200px',
        width: '200px'
    },
    container: {
        width: '100%',
        height: 'calc(100vh - 58px)',
        overflow: 'auto'
    },
    content: {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: theme.palette.primary.light
    },
    header: {
        width: '100%',
        height: 56,
        backgroundColor: '#ffffff',
        borderBottom: '2px solid #dbdee0',
        paddingLeft: 12,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    headerMobile: {
        paddingLeft: 64
    },
    title: {
        fontFamily: 'sans-serif',
        fontSize: 18,
        color: '#31373d'
    }
});

@withStyles(styles)
@withRouter
@inject('dataStore', 'sizeStore')
@observer
class AppSettings extends React.Component {
    render() {
        const { classes, location, sizeStore } = this.props;
        const isMobile = sizeStore.width < 800;
        const title = location.pathname.split('/').filter( e => !!e).map(s =>
            s[0].toUpperCase() + s.slice(1)
        ).join('/');
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography className={classNames(classes.title, isMobile ? classes.headerMobile : null)}>
                        {title}
                    </Typography>
                </div>
                <div className={classes.container}>
                    <div className={classes.content}>
                        <ReactLogo height={180} width={180} fill={'#479bcf'} />
                    </div>
                </div>
            </div >
        );
    }
}
export default AppSettings;
