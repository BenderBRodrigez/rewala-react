import axios from 'axios';
import store from './store';
import {OPEN} from './reducers/notify';

class NetService {
  constructor() {
    let unsubscribe = store.subscribe(this.handleToken);
    let service = axios.create({
      baseURL: 'http://localhost:33001/api',
      params: {
        access_token: localStorage.getItem('access_token')
      }
    });
    service.interceptors.request.use(config => {
      if (!config.params) {
        config.params = {
          access_token: localStorage.getItem('access_token')
        };
      } else {
        config.params.access_token = localStorage.getItem('access_token');
      }
      return config;
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleToken = () => {
    localStorage.setItem('access_token', store.getState().auth.token);
  }

  handleSuccess = response => response;

  handleError = error => {
    store.dispatch({
      type: OPEN,
      message: error.response.data.error.message
    });
    return Promise.reject(error)
  }

  get(path) {
    return this.service.get(path);
  }

  post(path, data) {
    return this.service.post(path, data);
  }
}

export default new NetService();