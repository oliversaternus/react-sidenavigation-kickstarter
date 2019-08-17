import React from "react";
import { render } from "react-dom";
import DataStore from './stores/DataStore';
import NotificationStore from './stores/NotificationStore';
import SizeStore from './stores/SizeStore';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';

const dataStore = new DataStore();
const notificationStore = new NotificationStore();
const sizeStore = new SizeStore();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#4676bf',
      light: '#7fa6e0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    action: {
      disabledBackground: '#09421d'
    }
  },
});

render(
  <Provider
    dataStore={dataStore}
    notificationStore={notificationStore}
    sizeStore={sizeStore}>
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("app")
);
