import globalAxios, { Method } from 'axios';

let jwt: string | null = null;

// TODO: Remove this when auth is implemented
jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgwMzcxMjA3fQ.Ho9cooSP3iET4ZLMnuwMSzjggNQo-HFDvDbgoL4-YIU';

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
