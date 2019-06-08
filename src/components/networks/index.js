import axios from 'axios';
import CookieManager from 'react-native-cookies';

export const networks = axios;

export function setHeader(token) {
  // networks.defaults.headers.common.Authorization = token;
  CookieManager.clearAll();
  networks.defaults.headers.common.cookie = token;
}

export function removeHeader() {
  // delete networks.defaults.headers.common.Authorization;
  delete networks.defaults.headers.common.cookie;
}
