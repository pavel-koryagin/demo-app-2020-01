import globalAxios, { Method } from 'axios';

let jwt: string | null = null;

export const axios = globalAxios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  timeout: Number(process.env.REACT_APP_NETWORK_TIMEOUT) || 5000,
  headers: {
    ...(jwt ? { Authorization: 'JWT ' + jwt } : {}),
  },
});

export async function requestBackend(method: Method, url: string, data?: {} | null) {
  const response = await axios({
    method,
    url,
    data,
  });
  return response.data;
}

export function setJwt(value: string | null) {
  jwt = value;
}
