import 'rxjs';
import {combineEpics} from 'redux-observable';
import {getEpic, postEpic, signinEpic, redirectEpic} from './net';

export default combineEpics(
  getEpic,
  postEpic,
  signinEpic,
  redirectEpic,
);