import React from 'react';
import AuthLogin from '../views/AuthLogin';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth.redux';
import { useHistory } from 'react-router-dom';

const AuthLoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <AuthLogin
      login={{
        email: '',
        password: '',
      }}
      onSubmit={async value => {
        await dispatch(login(value));
        history.push('/');
      }}
    />
  );
};

export default AuthLoginPage;
