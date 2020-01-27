import { User } from '../../model/User.model';
import { UserRole } from '../../model/UserRole';

const genericUser = {
  id: null,
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Smith',
  role: UserRole.Regular,
  dailyTarget: null,

  // Backend only
  // password: '',
  // salt: '',
  // restoreToken: null,
};

export const aliceAdminUserSample: User = {
  ...genericUser,
  id: 1,
  email: 'alice@example.com',
  firstName: 'Alice',
  lastName: 'Admin',
  role: UserRole.Admin,
};

export const bobManagerUserSample: User = {
  ...genericUser,
  id: 2,
  email: 'bob@example.com',
  firstName: 'Bob',
  lastName: 'Manager',
  role: UserRole.Manager,
};

export const carolRegularUserSample: User = {
  ...genericUser,
  id: 3,
  email: 'carol@example.com',
  firstName: 'Carol',
  lastName: 'User',
  dailyTarget: 2000,
};

export const usersSample = [
  aliceAdminUserSample,
  bobManagerUserSample,
  carolRegularUserSample,
];
