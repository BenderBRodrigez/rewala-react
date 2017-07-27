import 'rxjs';
import {combineReducers} from 'redux';
import {combineEpics} from 'redux-observable';
import {routerReducer} from 'react-router-redux';

import * as auth from '../auth/reducers';
import * as notify from '../notify/reducers';
import * as questions from '../questions/reducers';

import {signinEpic, signupEpic, redirectEpic, failEpic} from '../auth/epics';
import {getEpic} from '../../shared/services/net.service';

export const rootReducer = combineReducers({
  routing: routerReducer,
  auth: auth.reducer,
  notify: notify.reducer,
  questions: questions.reducer,
});

export const rootEpic = combineEpics(
  getEpic,
  signinEpic,
  signupEpic,
  redirectEpic,
  failEpic,
);