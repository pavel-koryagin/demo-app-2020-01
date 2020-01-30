import React from 'react';
import AuthRegister from '../views/AuthRegister';

const AuthRegisterPage: React.FC = () => {
  const { email, password } = { email: 'user@example.com', password: '123' };

  return (
    <AuthRegister
      email={email}
      password={password}
    />
  );
};

export default AuthRegisterPage;
