import UnexpectedCaseException from '../errors/UnexpectedCaseException';

export enum UserRole {
  Regular = 'regular',
  Manager = 'manager',
  Admin = 'admin',
}

export function getUserRoleTitle(role: UserRole): string {
  switch (role) {
    case UserRole.Admin: return 'Admin';
    case UserRole.Manager: return 'Manager';
    case UserRole.Regular: return 'Regular User';
    default: throw new UnexpectedCaseException();
  }
}
