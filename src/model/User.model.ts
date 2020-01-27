export enum UserRole {
  Regular = 'regular',
  Manager = 'manager',
  Admin = 'admin',
}

export interface User {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  role: UserRole,
  dailyTarget: number | null,
}
