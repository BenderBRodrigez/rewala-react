import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store, {history} from './store';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

injectTapEventPlugin();

const handleToken = () => {
  if (localStorage.getItem('access_token')) {
    store.getState().auth.token = localStorage.getItem('access_token');
    return;
  }
  if (store.getState().auth.token) {
    localStorage.setItem('access_token', store.getState().auth.token);
    return;
  }
}

let unsubscribe = store.subscribe(handleToken);

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root')
);

registerServiceWorker();
