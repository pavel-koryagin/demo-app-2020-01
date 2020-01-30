import React from 'react';
import AuthNewPassword from '../views/AuthNewPassword';

const AuthNewPasswordPage: React.FC = () => {
  const { password } = { password: '123' };

  return (
    <AuthNewPassword
      password={password}
    />
  );
};

export default AuthNewPasswordPage;
