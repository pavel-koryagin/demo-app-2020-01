import React from 'react';
import { RegisterDto, registerMetaModel } from '../dto/RegisterDto';
import { defineForm, FormSubmit, FormTextField } from '../elements/Form';
import Typography from '@material-ui/core/Typography';

interface Props {
  register: RegisterDto,
  onSubmit: (dto: RegisterDto) => void,
}

const Form = defineForm<RegisterDto>();

const AuthRegister: React.FC<Props> = ({ register, onSubmit }: Props) => {
  return (
    <Form
      form="register"
      onSubmit={onSubmit}
      initialValues={register}
    >
      <Typography component="h1" variant="h4">
        Sign Up
      </Typography>
      <FormTextField
        type="email"
        name="email"
        metaField={registerMetaModel.fields.email}
      />
      <FormTextField
        type="password"
        name="password"
        metaField={registerMetaModel.fields.password}
      />
      <FormTextField
        type="password"
        name="confirmPassword"
        metaField={registerMetaModel.fields.confirmPassword}
      />
      <FormTextField
        name="firstName"
        metaField={registerMetaModel.fields.firstName}
      />
      <FormTextField
        name="lastName"
        metaField={registerMetaModel.fields.lastName}
      />
      <FormSubmit>Login</FormSubmit>
    </Form>
  );
};

export default AuthRegister;
