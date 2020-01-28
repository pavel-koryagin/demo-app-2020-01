import React from 'react';
import LayoutWidget from '../widgets/LayoutWidget';
import AuthNewPassword from '../views/AuthNewPassword';

const AuthNewPasswordPage: React.FC = () => {
  const { password } = { password: '123' };

  return (
    <LayoutWidget>
      <AuthNewPassword
        password={password}
      />
    </LayoutWidget>
  );
};

export default AuthNewPasswordPage;
