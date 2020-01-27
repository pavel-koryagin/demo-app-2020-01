import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  email: string,
}

const AuthRestorePassword: React.FC<Props> = ({ email }: Props) => {
  return (
    <form noValidate>
      <TextField
        label="Email"
        fullWidth
      />
    </form>
  );
};

export default AuthRestorePassword;
