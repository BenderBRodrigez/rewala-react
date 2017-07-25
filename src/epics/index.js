import 'rxjs';
import {combineEpics} from 'redux-observable';
import {netEpic} from './net';

export default combineEpics(
  netEpic,
);