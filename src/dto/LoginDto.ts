import { MetaModel } from '../model/modelUtils';
import { required } from 'redux-form-validators';

export interface LoginDto {
  email: string,
  password: string,
}

export const loginMetaModel: MetaModel<LoginDto> = {
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
  }
}
