import httpMocks from 'node-mocks-http';
import { assembleServer } from '../backend/assembleServer';
import Auth from '../backend/utils/Auth';
import {
  aliceAdminUserSample,
  bobManagerUserSample,
  carolRegularUserSample,
} from '../src/qa/samples/User.samples';

const app = assembleServer();

export const JWT_GUEST = null;
export const JWT_ALICE_ADMIN = Auth.getAuthLoginPayload(aliceAdminUserSample).token;
export const JWT_BOB_MANAGER = Auth.getAuthLoginPayload(bobManagerUserSample).token;
export const JWT_CAROL_REGULAR_USER = Auth.getAuthLoginPayload(carolRegularUserSample).token;

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
      resolve({
        status: res._getStatusCode(),
        data: JSON.parse(res._getData()),
        redirect: res._getRedirectUrl(),
      });
    });
    app(req, res, () => {
      reject(new Error('Route has not been triggered'));
    });
  });
}

export function extendedWithCreatedUpdated(record) {
  return {
    ...record,
    createdAt: expect.stringMatching(/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/),
    updatedAt: expect.stringMatching(/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/),
  }
}
