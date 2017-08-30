import 'rxjs';
import {combineReducers} from 'redux';
import {combineEpics} from 'redux-observable';
import {routerReducer} from 'react-router-redux';

import * as auth from '../auth/reducers';
import * as notify from '../notify/reducers';
import * as questions from '../questions/reducers';
import * as answers from '../answers/reducers';
import * as groups from '../groups/reducers';

import {authEpics} from '../auth/epics';
import {netEpics} from '../net/epics';
import {questionsEpics} from '../questions/epics';
import {answersEpics} from '../answers/epics';
import {groupsEpics} from '../groups/epics';

export const rootReducer = combineReducers({
  routing: routerReducer,
  auth: auth.reducer,
  notify: notify.reducer,
  questions: questions.reducer,
  answers: answers.reducer,
  groups: groups.reducer,
});

export const rootEpic = combineEpics(
  ...authEpics,
  ...netEpics,
  ...questionsEpics,
  ...answersEpics,
  ...groupsEpics,
);