import globalAxios, { Method } from 'axios';

let jwt: string | null = null;

// TODO: Remove this when auth is implemented
jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTgwMzk2OTM0fQ.4T6D2XOEWc-yifDcVDIaz5SQFL1RM4K6-Rlg6tSmeC4';

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
