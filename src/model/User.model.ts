import { UserRole } from './UserRole';

export interface User {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  role: UserRole,
  dailyTarget: number | null,
}
