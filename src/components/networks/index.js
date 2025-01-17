import axios from 'axios';

export const networks = axios.create({
  baseURL: 'https://YOUR_SERVER_DOMAIN',
});

export function setHeader(token) {
  networks.defaults.headers.common.Authorization = `Bearer ${token}`;
  console.log('Network HEADER: ', networks.defaults.headers.common);
}

export function removeHeader() {
  delete networks.defaults.headers.common.Authorization;
}
