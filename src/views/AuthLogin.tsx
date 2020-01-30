import React from 'react';
import { defineForm, FormSubmit, FormTextField } from '../elements/Form';
import Typography from '@material-ui/core/Typography';
import { LoginDto, loginMetaModel } from '../dto/LoginDto';

interface Props {
  login: LoginDto,
  onSubmit: (dto: LoginDto) => void,
}

const Form = defineForm<LoginDto>();

const AuthLogin: React.FC<Props> = ({ login, onSubmit }: Props) => {
  return (
    <Form
      form="login"
      onSubmit={onSubmit}
      initialValues={login}
    >
      <Typography component="h1" variant="h4">
        Welcome
      </Typography>
      <FormTextField
        type="email"
        name="email"
        metaField={loginMetaModel.fields.email}
      />
      <FormTextField
        type="password"
        name="password"
        metaField={loginMetaModel.fields.password}
      />
      <FormSubmit>Login</FormSubmit>
    </Form>
  );
};

export default AuthLogin;
