import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  email: string,
}

const AuthNewPassword: React.FC<Props> = ({ email }: Props) => {
  return (
    <form noValidate>
      <TextField
        label="New Password"
        fullWidth
      />
      <TextField
        label="Confirm Password"
        fullWidth
      />
    </form>
  );
};

export default AuthNewPassword;
