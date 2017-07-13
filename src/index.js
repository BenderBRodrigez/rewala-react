import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store, {history} from './store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

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
