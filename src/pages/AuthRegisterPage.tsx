import React from 'react';
import LayoutWidget from '../widgets/LayoutWidget';
import AuthRegister from '../views/AuthRegister';

const AuthRegisterPage: React.FC = () => {
  const { email, password } = { email: 'user@example.com', password: '123' };

  return (
    <LayoutWidget>
      <AuthRegister
        email={email}
        password={password}
      />
    </LayoutWidget>
  );
};

export default AuthRegisterPage;
