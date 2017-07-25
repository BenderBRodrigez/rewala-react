import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {createEpicMiddleware} from 'redux-observable';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import rootEpic from './epics';

export const history = createHistory();

const initialState = {};
const middleware = [
  createEpicMiddleware(rootEpic),
  routerMiddleware(history)
];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;