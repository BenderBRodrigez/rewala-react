import * as net from '../../redux/net/actions';
import * as notify from '../../redux/notify/actions';
import * as questions from '../../redux/questions/actions';
import store from '../../store';
import * as io from "socket.io-client";

class NetService {
  constructor() {
    this.baseUrl = 'http://localhost:33001/api';
    this.socketUrl = 'http://localhost:33001';
    this.socket = null;
  }

  setToken(url) {
    const token = localStorage.getItem('access_token');
    if (!token) return url;

    const tokenParam = `access_token=${token}`;
    url = url.indexOf('?') + 1 ? `${url}&${tokenParam}` : `${url}?${tokenParam}`;
    return url;
  }

  ajaxGet(options) {
    return {
      type: net.ActionTypes.GET,
      options
    }
  }

  setSocketOpen() {
    const token = store.getState().auth.token;
    if (!this.socket) {
      this.socket = io(
        this.socketUrl,
        {
          transports: ['websocket'],
          upgrade: false,
          forceNew: true
        }
      ).connect();
      this.socket.on('connect', () => {
        this.socket.emit('authentication', {token});
        this.socket.on('authenticated', value => {
          if (!value) return;
        });
      });
    }
  }

  subscribeTo(event) {
    this.setSocketOpen();
    return this.socket.on(event, data => {
      let message = '';

      switch(event) {
        case 'create': {
          message = 'New question created and awaiting your vote';
          if (store.getState().questions.list_type === 'AwaitingYourAnswerQuestions') {
            store.dispatch(this.ajaxGet({
              url: '/clients/get-awaiting-questions',
              dispatch_type: questions.ActionTypes.GET_LIST,
              list_type: store.getState().questions.list_type
            }))
          }
          break;
        }
        case 'delete': {
          message = `Question was deleted: ${data.text}`;
          store.dispatch({
            type: questions.ActionTypes.DELETE,
            id: data.id,
          });
          break;
        }
        case 'deadline': {
          message = `Voting is completed: ${data.text}`;
          if (store.getState().questions.list_type === 'QuestionResults') {
            store.dispatch(this.ajaxGet({
              url: '/clients/get-completed-questions',
              dispatch_type: questions.ActionTypes.GET_LIST,
              list_type: store.getState().questions.list_type
            }))
          } else {
            store.dispatch({
              type: questions.ActionTypes.FINISH,
              id: data.id,
            })
          }
          break;
        }
        default: {
          break;
        }
      }
      store.dispatch({
        type: notify.ActionTypes.OPEN,
        message
      })

    });
  }

  setSocketClose() {
    this.socket.emit('close');
    this.socket = null;
  }
}

export const netService = new NetService();
