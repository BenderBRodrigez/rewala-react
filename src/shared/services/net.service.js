import {ActionTypes} from '../../redux/net/actions';

class NetService {
  constructor() {
    this.baseUrl = 'http://localhost:33001/api';
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
      type: ActionTypes.GET,
      options
    }
  }
}

export const netService = new NetService();
