import React from 'react';
import LayoutWidget from '../widgets/LayoutWidget';
import AuthRestorePassword from '../views/AuthRestorePassword';

const AuthRestorePasswordPage: React.FC = () => {
  const { email } = { email: 'user@example.com' };

  return (
    <LayoutWidget>
      <AuthRestorePassword
        email={email}
      />
    </LayoutWidget>
  );
};

export default AuthRestorePasswordPage;
