import { MetaModel } from '../model/modelUtils';
import { required } from 'redux-form-validators';
import { userMetaModel } from '../model/User.model';

export interface RegisterDto {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  confirmPassword?: string,
}

export const registerMetaModel: MetaModel<RegisterDto> = {
  fields: {
    email: {
      visualProps: {
        label: 'Email',
      },
      rules: [required()],
    },
    password: {
      visualProps: {
        label: 'Password',
      },
      rules: [required()],
    },
    confirmPassword: {
      visualProps: {
        label: 'Confirm Password',
      },
      rules: [required(), (value, values) => {
        if (value !== values?.password) {
          return 'Passwords do not match';
        }
        return undefined;
      }],
    },
    firstName: userMetaModel.fields.firstName as any,
    lastName: userMetaModel.fields.lastName as any,
  }
}
