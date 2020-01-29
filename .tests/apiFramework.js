import httpMocks from 'node-mocks-http';
import { assembleServer } from '../backend/assembleServer';

const app = assembleServer();

export const JWT_GUEST = null;

export function internalRequest(jwt, method, url, body) {
  return new Promise((resolve, reject) => {
    const req = httpMocks.createRequest({
      method,
      url,
      body,
      headers: {
        ...(jwt ? { Authorization: 'JWT ' + jwt } : {}),
      },
    });
    const res = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter
    });
    res.on('end', () => {
      resolve(res);
    });
    app(req, res, () => {
      reject(new Error('Route has not been triggered'));
    });
  });
}
