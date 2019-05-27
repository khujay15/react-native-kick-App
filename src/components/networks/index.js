import axios from 'axios';

export const networks = axios;

export function setHeader(token) {
  // networks.defaults.headers.common.Authorization = token;
  networks.defaults.headers.common.cookie = token;
  console.log('SetHeader:', networks.defaults.headers.common.cookie);
}

export function removeHeader() {
  // delete networks.defaults.headers.common.Authorization;
  delete networks.defaults.headers.common.cookie;
}
