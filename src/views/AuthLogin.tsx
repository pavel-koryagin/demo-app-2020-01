import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  email: string,
  password: string,
}

const AuthLogin: React.FC<Props> = ({ email, password }: Props) => {
  return (
    <form noValidate>
      <TextField
        label="Email"
        fullWidth
      />
      <TextField
        label="Password"
        fullWidth
      />
    </form>
  );
};

export default AuthLogin;
