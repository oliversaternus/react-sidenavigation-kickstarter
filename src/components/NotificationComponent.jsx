import React from "react";
import { inject, observer } from 'mobx-react';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        width: '100%'
    }
});

const styles1 = theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  });

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            message={
                <span className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

const SnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

@withStyles(styles)
@inject('notificationStore')
@observer
class NotificationComponent extends React.Component {

    handleClose = () => {
        const { notificationStore } = this.props;
        notificationStore.closeNotification();
    };

    render() {
        const { classes, children, notificationStore } = this.props;
        return (
            <div className={classes.root}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={notificationStore.isOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <SnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={notificationStore.variant}
                        message={notificationStore.message}
                    />
                </Snackbar>
                {children}
            </div>
        );
    }
}

export default NotificationComponent;