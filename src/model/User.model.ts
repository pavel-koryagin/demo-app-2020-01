import { UserRole } from './UserRole';
import { MetaModel } from './modelUtils';
import { date, email, numericality, required } from 'redux-form-validators';

export interface User {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  role: UserRole,
  dailyTarget: number | null,
}

export const userMetaModel: MetaModel<User> = {
  fields: {
    email: {
      visualProps: {
        label: 'Email',
      },
      rules: [required(), email()],
    },
    firstName: {
      visualProps: {
        label: 'First Name',
      },
      rules: [required()],
    },
    lastName: {
      visualProps: {
        label: 'Last Name',
      },
      rules: [required()],
    },
    password: {
      visualProps: {
        label: 'Password',
      },
      rules: [],
    },
    role: {
      visualProps: {
        label: 'Role',
      },
      rules: [required()],
    },
    dailyTarget: {
      visualProps: {
        label: 'Daily Calorie Target',
      },
      rules: [required(), numericality({ int: true })],
    },
  }
}
