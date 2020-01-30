import React from 'react';
import AuthRestorePassword from '../views/AuthRestorePassword';

const AuthRestorePasswordPage: React.FC = () => {
  const { email } = { email: 'user@example.com' };

  return (
    <AuthRestorePassword
      email={email}
    />
  );
};

export default AuthRestorePasswordPage;
