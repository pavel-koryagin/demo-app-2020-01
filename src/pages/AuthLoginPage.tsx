import React from 'react';
import LayoutWidget from '../widgets/LayoutWidget';
import AuthLogin from '../views/AuthLogin';

const AuthLoginPage: React.FC = () => {
  const { email, password } = { email: 'user@example.com', password: '123' };

  return (
    <LayoutWidget>
      <AuthLogin
        email={email}
        password={password}
      />
    </LayoutWidget>
  );
};

export default AuthLoginPage;
